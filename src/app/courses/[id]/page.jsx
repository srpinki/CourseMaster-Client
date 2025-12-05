"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "@/app/redux/slice/courseSlice";
import Image from "next/image";
import { FiClock, FiUser, FiStar } from "react-icons/fi";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { course, status } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [id, dispatch]);

  if (status === "loading")
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin h-12 w-12 border-4 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    );

  if (!course) return <p className="text-gray-500 p-6">Course not found.</p>;

const handleEnroll = async () => {
  if (!user) {
    router.push("/auth/login");
    return;
  }

  if (!course || !course._id) {
    alert("Course information is missing!");
    return;
  }

  try {
    const payload = {
      courseId: course._id,
      userId: user.id,
      courseTitle: course.title,
      price: course.price,
      email: user.email,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/create-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Checkout error:", data, "Status:", res.status);
      alert(data.error || "Payment failed, try again.");
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Payment failed, try again.");
  }
};



  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* Top Hero Section */}
      <div className="relative w-full h-[320px] md:h-[420px]">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover brightness-50"
          unoptimized
        />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            {course.title}
          </h1>

          <p className="text-lg md:text-xl max-w-2xl opacity-90">
            {course.description}
          </p>

          <div className="flex items-center gap-4 mt-4 text-sm md:text-base">
            <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              <FiUser /> {course.instructor}
            </span>
            <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              <FiClock /> {course.duration || "6h 30m"}
            </span>
            <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur">
              <FiStar /> {course.rating || "4.8"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">

          {/* Video Player */}
          <div className="bg-white p-5 rounded-xl shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">🎥 Course Preview</h2>

            {/* Detect YouTube/Vimeo embed URLs */}
            {course.videoUrl?.includes("youtube") ||
            course.videoUrl?.includes("vimeo") ? (
              <iframe
                src={course.videoUrl}
                className="w-full h-64 md:h-96 rounded-xl"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={course.videoUrl}
                controls
                className="w-full h-64 md:h-96 rounded-xl"
              />
            )}
          </div>

          {/* Syllabus */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">📘 Course Syllabus</h2>

            <div className="space-y-4">
              {course.syllabus?.map((item, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-xl border flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
                    {index + 1}
                  </div>
                  <p className="font-medium text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">

          <div className="bg-white shadow-md p-6 rounded-2xl border sticky top-10">

            <p className="text-3xl font-bold text-blue-600 mb-4">
              ${course.price}
            </p>

            <button
              onClick={handleEnroll}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition cursor-pointer"
            >
              Enroll Now 🚀
            </button>

            <hr className="my-6" />

            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              This course includes:
            </h3>

            <ul className="space-y-2 text-gray-700">
              <li>✔ Full lifetime access</li>
              <li>✔ Certificate after completion</li>
              <li>✔ Access on mobile & desktop</li>
              <li>✔ Assignments & quizzes</li>
              <li>✔ High-quality video lessons</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
