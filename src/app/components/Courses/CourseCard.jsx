import Link from "next/link";
import Image from "next/image";
import { FiUser, FiClock, FiStar } from "react-icons/fi";

// Function to generate slug if no _id exists
const getCourseSlug = (course) => {
  if (course._id) return course._id;
  return course.title.toLowerCase().replace(/\s+/g, "-");
};

export default function CourseCard({ course }) {
  const slug = getCourseSlug(course);

  return (
    <Link href={`/courses/${slug}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition border overflow-hidden flex flex-col h-[450px] cursor-pointer">

        {/* Thumbnail */}
        <div className="relative h-44 w-full flex-shrink-0">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
            unoptimized
          />
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
            {course.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">

          <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {course.title}
          </h2>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {course.description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2 text-gray-700 text-sm mb-3">
            <FiUser />
            <span className="font-medium">{course.instructor}</span>
          </div>

          {/* Stats with fallbacks */}
          <div className="flex items-center gap-5 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <FiClock className="text-blue-600" />
              {course.duration || "5h"}
            </span>

            <span className="flex items-center gap-1">
              <FiStar className="text-yellow-500" />
              {course.rating || "4.8"}
            </span>

            <span>{course.students || "200"}+ students</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-auto flex items-center justify-between">
            <p className="text-xl font-semibold text-blue-600">
              ${course.price}
            </p>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer">
              Enroll Now
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
}
