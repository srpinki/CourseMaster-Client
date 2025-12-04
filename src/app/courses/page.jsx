"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "../components/Courses/CourseCard";
import CourseFilter from "../components/Courses/CourseFilter";
import CourseSort from "../components/Courses/CourseSort";
import Pagination from "../components/Courses/Pagination";
import { fetchCourses, setFilters, setPage } from "../redux/slice/courseSlice";

export default function CoursesPage() {
  const dispatch = useDispatch();
  const { list, page, totalPages, filters, status } = useSelector(
    (state) => state.courses
  );

  const categories = ["Web Development", "Data Science", "Design"]; // example categories

  // Fetch courses whenever filters or page changes
  useEffect(() => {
    dispatch(fetchCourses({ ...filters, page }));
  }, [filters, page, dispatch]);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-700">All Courses</h1>
        <p className="text-gray-600 mt-1">
          Discover and enroll in courses that match your interests
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex gap-4 mb-6 flex-wrap items-center">
        <CourseFilter
          categories={categories}
          selectedCategory={filters.category}
          onSelectCategory={(cat) => dispatch(setFilters({ category: cat }))}
          className="flex-1 min-w-[180px] border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent text-gray-700"
        />

        <CourseSort
          sort={filters.sort}
          onSortChange={(sort) => dispatch(setFilters({ sort }))}
          className="min-w-[180px] border border-gray-300 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent text-gray-700"
        />
      </div>

      {/* Course Grid */}
      {status === "loading" ? (
        <p className="text-gray-500">Loading courses...</p>
      ) : list?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No courses found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => dispatch(setPage(p))}
        />
      )}
    </div>
  );
}
