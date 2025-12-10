"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FiGrid, FiList } from "react-icons/fi";
import { fetchAdminCourses, deleteAdminCourse } from "@/app/redux/slice/adminCourseSlice";

export default function AdminCoursesPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { list, status } = useSelector((state) => state.adminCourses);
  const [view, setView] = useState("grid");

  useEffect(() => {
    dispatch(fetchAdminCourses());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });

    if (confirm.isConfirmed) {
      await dispatch(deleteAdminCourse(id));
      Swal.fire("Deleted!", "The course has been removed.", "success");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">📚 All Courses</h2>

      {/* GRID / LIST Switch */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setView("grid")}
          className={`p-2 rounded-lg border ${view === "grid" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
        >
          <FiGrid size={20} />
        </button>
        <button
          onClick={() => setView("list")}
          className={`p-2 rounded-lg border ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-blue-600"}`}
        >
          <FiList size={20} />
        </button>
      </div>

      {status === "loading" && (
        <p className="text-gray-500">Loading...</p>
      )}

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((course) => (
            <div key={course._id} className="bg-white shadow-md rounded-xl p-5">
              <img
                src={course.thumbnail || "https://via.placeholder.com/400"}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{course.description}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => router.push(`/dashboard/admin/courses/${course._id}/edit`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="space-y-4">
          {list.map((course) => (
            <div key={course._id} className="bg-white p-4 rounded-xl shadow-md flex justify-between">
              <div className="flex gap-4">
                <img
                  src={course.thumbnail || "https://via.placeholder.com/80"}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-gray-600">{course.description.slice(0, 50)}...</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/dashboard/admin/courses/${course._id}/edit`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => handleDelete(course._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
