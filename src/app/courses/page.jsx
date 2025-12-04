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

  const categories = ["Web Development", "Data Science", "Design"];

  // Fetch courses whenever filters or page changes
  useEffect(() => {
    dispatch(fetchCourses({ ...filters, page }));
  }, [filters, page, dispatch]);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className=" max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-700">All Courses</h1>
          <p className="text-gray-600 mt-1">
            Discover and enroll in courses that match your interests
          </p>
        </div>

        {/* Filters & Search Section */}
        <div className="w-full backdrop-blur-lg bg-white/70 shadow-lg rounded-2xl p-5 mb-8 border border-blue-200/40">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Search Bar */}
            <div className="flex items-center px-4 py-3 rounded-xl border border-blue-200 bg-white text-gray-700 flex-1 min-w-[250px] shadow-sm transition-all duration-200 focus-within:shadow-md focus-within:border-blue-500">
              <span className="text-blue-500 text-lg mr-2">🔍</span>
              <input
                type="text"
                placeholder="Search courses..."
                value={filters.search}
                onChange={(e) =>
                  dispatch(setFilters({ search: e.target.value }))
                }
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Category Filter */}
            <div className="min-w-[200px]">
              <CourseFilter
                categories={categories}
                selectedCategory={filters.category}
                onSelectCategory={(cat) =>
                  dispatch(setFilters({ category: cat }))
                }
                className="shadow-sm hover:shadow-md transition rounded-xl"
              />
            </div>

            {/* Sort Filter */}
            <div className=" min-w-[200px]">
              <CourseSort
                sort={filters.sort}
                onSortChange={(sort) => dispatch(setFilters({ sort }))}
                className="shadow-sm hover:shadow-md transition rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Courses Section */}
        {status === "loading" ? (
          <div className="text-center text-gray-500 py-10">
            <div className="animate-spin h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-3"></div>
            Loading courses...
          </div>
        ) : list?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {list.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              No courses found
            </h2>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>

            <button
              onClick={() =>
                dispatch(
                  setFilters({ search: "", category: "", sort: "price_asc" })
                )
              }
              className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={(p) => dispatch(setPage(p))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
