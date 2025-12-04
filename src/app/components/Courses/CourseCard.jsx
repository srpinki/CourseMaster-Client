import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course._id}`}>
      <div className="border rounded-xl shadow-sm hover:shadow-lg transition p-3 cursor-pointer bg-white">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="rounded-xl w-full h-40 object-cover mb-3"
          />
          {/* Optional play icon if video */}
          {course.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-500 bg-opacity-70 rounded-full flex items-center justify-center">
                ▶
              </div>
            </div>
          )}
        </div>
        <h2 className="text-gray-700 font-semibold text-lg mb-1">{course.title}</h2>
        <p className="text-gray-500 text-sm mb-2">By {course.instructor}</p>
        <p className="text-blue-600 font-medium">${course.price}</p>
      </div>
    </Link>
  );
}
