"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "@/app/redux/slice/courseSlice";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { course, status } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth); // Logged-in check

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

  // Enroll Button Logic
  const handleEnroll = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    router.push(`/checkout/${course._id}`);
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-blue-100">
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {course.title}
          </h1>

          {/* Instructor + Price */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              👨‍🏫 Instructor: {course.instructor}
            </span>

            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full">
              💰 Price: ${course.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-6">
            {course.description}
          </p>

          {/* Syllabus Section */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📘 Course Syllabus
          </h2>

          <div className="space-y-3">
            {course.syllabus.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-gray-700 shadow-sm"
              >
                <span className="font-medium mr-2">{index + 1}.</span>
                {item}
              </div>
            ))}
          </div>

          {/* Enroll Button */}
          <div className="mt-8">
            <button
              onClick={handleEnroll}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-lg rounded-xl shadow-md hover:bg-blue-700 transition-all duration-200"
            >
              Enroll Now 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
