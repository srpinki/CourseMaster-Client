"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "@/app/redux/slice/courseSlice";


export default function CourseDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { course, status } = useSelector((state) => state.courses);

  useEffect(() => {
    if (id) dispatch(fetchCourseById(id));
  }, [id, dispatch]);

  if (status === "loading") return <p className="text-gray-500">Loading...</p>;
  if (!course) return <p className="text-gray-500">Course not found.</p>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-700">{course.title}</h1>
      <p className="mb-2 text-gray-600">{course.description}</p>
      <p className="mb-2 text-gray-700 font-medium">Instructor: {course.instructor}</p>
      <p className="mb-2 text-gray-700 font-medium">Price: ${course.price}</p>

      <h2 className="text-xl font-semibold mt-4 mb-2 text-gray-700">Syllabus</h2>
      <ul className="list-disc ml-5 text-gray-600">
        {course.syllabus.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
