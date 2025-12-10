"use client";

import { useState } from "react";

export default function CourseCreateForm() {
  const [modules, setModules] = useState([
    {
      title: "",
      lessons: [{ title: "", duration: "", videoUrl: "" }]
    }
  ]);

  const addModule = () => {
    setModules([...modules, { title: "", lessons: [{ title: "", duration: "", videoUrl: "" }] }]);
  };

  const addLesson = (moduleIndex) => {
    const updated = [...modules];
    updated[moduleIndex].lessons.push({ title: "", duration: "", videoUrl: "" });
    setModules(updated);
  };

  const removeModule = (moduleIndex) => {
    setModules(modules.filter((_, idx) => idx !== moduleIndex));
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updated = [...modules];
    updated[moduleIndex].lessons = updated[moduleIndex].lessons.filter((_, idx) => idx !== lessonIndex);
    setModules(updated);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-4">Create New Course</h1>

      {/* Course Basic Info */}
      <div className="border rounded-2xl shadow p-6 space-y-4 bg-white">
        <input type="text" placeholder="Course Title" className="w-full p-3 border rounded-xl" />
        <input type="text" placeholder="Slug (auto or manual)" className="w-full p-3 border rounded-xl" />

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Category" className="p-3 border rounded-xl" />
          <input type="text" placeholder="Level (Beginner / Intermediate / Expert)" className="p-3 border rounded-xl" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Language" className="p-3 border rounded-xl" />
          <input type="text" placeholder="Thumbnail URL" className="p-3 border rounded-xl" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Price" className="p-3 border rounded-xl" />
          <input type="number" placeholder="Discount Price" className="p-3 border rounded-xl" />
        </div>

        <textarea placeholder="Course Description" className="w-full p-3 border rounded-xl h-32" />

        <textarea placeholder="What You Will Learn (one per line)" className="w-full p-3 border rounded-xl h-24" />
        <textarea placeholder="Requirements (one per line)" className="w-full p-3 border rounded-xl h-24" />
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Modules</h2>
          <button onClick={addModule} className="px-4 py-2 bg-blue-600 text-white rounded-xl">+ Add Module</button>
        </div>

        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border rounded-2xl shadow p-6 bg-white space-y-4">

            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Module Title"
                className="flex-1 p-3 border rounded-xl mr-4"
                value={module.title}
                onChange={(e) => {
                  const updated = [...modules];
                  updated[moduleIndex].title = e.target.value;
                  setModules(updated);
                }}
              />

              <button onClick={() => removeModule(moduleIndex)} className="px-3 py-2 bg-red-600 text-white rounded-xl">Delete</button>
            </div>

            {/* Lessons */}
            {module.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="border p-4 rounded-xl bg-gray-50 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Lesson {lessonIndex + 1}</h3>
                  <button onClick={() => removeLesson(moduleIndex, lessonIndex)} className="text-red-600">Delete</button>
                </div>

                <input
                  type="text"
                  placeholder="Lesson Title"
                  className="w-full p-3 border rounded-xl"
                  value={lesson.title}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[moduleIndex].lessons[lessonIndex].title = e.target.value;
                    setModules(updated);
                  }}
                />

                <input
                  type="text"
                  placeholder="Duration (e.g., 05:30)"
                  className="w-full p-3 border rounded-xl"
                  value={lesson.duration}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[moduleIndex].lessons[lessonIndex].duration = e.target.value;
                    setModules(updated);
                  }}
                />

                <input
                  type="text"
                  placeholder="Video URL"
                  className="w-full p-3 border rounded-xl"
                  value={lesson.videoUrl}
                  onChange={(e) => {
                    const updated = [...modules];
                    updated[moduleIndex].lessons[lessonIndex].videoUrl = e.target.value;
                    setModules(updated);
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => addLesson(moduleIndex)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl"
            >+ Add Lesson</button>
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-blue-700 text-white rounded-xl text-lg font-semibold">
        Submit Course
      </button>
    </div>
  );
}
