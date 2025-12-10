"use client";

import api from "@/app/lib/axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function CreateCourse() {
const defaultForm = {
  title: "",
  description: "",
  instructor: "",
  price: "",
  category: "",
  thumbnail: "",
  videoUrl: "",
  syllabus: [""],
  tags: [""],
  batches: [{ name: "", startDate: "", endDate: "" }],
  modules: [
    { title: "", lessons: [{ title: "", duration: "", videoUrl: "" }] },
  ],
};

const [form, setForm] = useState(JSON.parse(JSON.stringify(defaultForm)));

  const update = (field, value) => setForm({ ...form, [field]: value });

  const updateListItem = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    update(field, updated);
  };

  const updateBatch = (index, field, value) => {
    const updated = [...form.batches];
    updated[index][field] = value;
    update("batches", updated);
  };

  const addToList = (field) => update(field, [...form[field], ""]);

  const addBatch = () =>
    update("batches", [...form.batches, { name: "", startDate: "", endDate: "" }]);

  const deleteBatch = (index) => {
    const updated = form.batches.filter((_, i) => i !== index);
    update("batches", updated);
  };

  const addModule = () =>
    update("modules", [
      ...form.modules,
      { title: "", lessons: [{ title: "", duration: "", videoUrl: "" }] },
    ]);

  const deleteModule = (index) =>
    update("modules", form.modules.filter((_, i) => i !== index));

  const addLesson = (mIdx) => {
    const updated = [...form.modules];
    updated[mIdx].lessons.push({ title: "", duration: "", videoUrl: "" });
    update("modules", updated);
  };

  const updateModuleTitle = (mIdx, value) => {
    const updated = [...form.modules];
    updated[mIdx].title = value;
    update("modules", updated);
  };

  const updateLesson = (mIdx, lIdx, field, value) => {
    const updated = [...form.modules];
    updated[mIdx].lessons[lIdx][field] = value;
    update("modules", updated);
  };

  const deleteLesson = (mIdx, lIdx) => {
    const updated = [...form.modules];
    updated[mIdx].lessons = updated[mIdx].lessons.filter((_, i) => i !== lIdx);
    update("modules", updated);
  };

  const accessToken = useSelector((state) => state.auth.accessToken); // ✅ top-level

const submit = async () => {
  if (!accessToken) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first!",
    });
    return;
  }

  const payload = { ...form, price: Number(form.price) };

  try {
    await api.post("/admin/courses", payload, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    Swal.fire({
      icon: "success",
      title: "Course Created!",
      timer: 1500,
      showConfirmButton: false,
    });

    setForm(JSON.parse(JSON.stringify(defaultForm))); // Reset form

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Create Failed",
      text: error.response?.data?.message || "Something went wrong",
    });
  }
};





  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>

      <div className="grid grid-cols-2 gap-6 bg-white shadow p-8 rounded-xl">
        {/* Title */}
        <div className="col-span-2">
          <label className="font-semibold">Course Title</label>
          <input
            className="w-full p-3 border rounded mt-1"
            placeholder="Full Stack Web Development"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full p-3 border rounded mt-1"
            rows="4"
            placeholder="Detailed description..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        {/* Instructor */}
        <div>
          <label className="font-semibold">Instructor</label>
          <input
            className="w-full p-3 border rounded mt-1"
            placeholder="Instructor Name"
            value={form.instructor}
            onChange={(e) => update("instructor", e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price</label>
          <input
            type="number"
            className="w-full p-3 border rounded mt-1"
            placeholder="0 for free"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <input
            className="w-full p-3 border rounded mt-1"
            placeholder="Web Development"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="font-semibold">Thumbnail URL</label>
          <input
            className="w-full p-3 border rounded mt-1"
            placeholder="https://example.com/image.jpg"
            value={form.thumbnail}
            onChange={(e) => update("thumbnail", e.target.value)}
          />
        </div>

        {/* Intro Video */}
        <div className="col-span-2">
          <label className="font-semibold">Intro Video URL</label>
          <input
            className="w-full p-3 border rounded mt-1"
            placeholder="https://youtube.com/..."
            value={form.videoUrl}
            onChange={(e) => update("videoUrl", e.target.value)}
          />
        </div>

        {/* Syllabus */}
        <div className="col-span-2">
          <label className="font-semibold text-lg">Syllabus Topics</label>
          {form.syllabus.map((item, i) => (
            <input
              key={i}
              className="w-full p-3 border rounded mt-2"
              placeholder={`Topic ${i + 1}`}
              value={item}
              onChange={(e) => updateListItem("syllabus", i, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="mt-2 bg-gray-200 px-4 py-2 rounded"
            onClick={() => addToList("syllabus")}
          >
            + Add Topic
          </button>
        </div>

        {/* Tags */}
        <div className="col-span-2">
          <label className="font-semibold text-lg">Tags</label>
          {form.tags.map((item, i) => (
            <input
              key={i}
              className="w-full p-3 border rounded mt-2"
              placeholder={`Tag ${i + 1}`}
              value={item}
              onChange={(e) => updateListItem("tags", i, e.target.value)}
            />
          ))}
          <button
            type="button"
            className="mt-2 bg-gray-200 px-4 py-2 rounded"
            onClick={() => addToList("tags")}
          >
            + Add Tag
          </button>
        </div>

        {/* Batches */}
        <div className="col-span-2 mt-4">
          <h2 className="font-semibold mb-2">Batches</h2>
          {form.batches.map((batch, i) => (
            <div key={i} className="border p-3 rounded mb-2 bg-gray-50 grid grid-cols-3 gap-2">
              <input
                className="p-2 border rounded"
                placeholder="Batch Name"
                value={batch.name}
                onChange={(e) => updateBatch(i, "name", e.target.value)}
              />
              <input
                type="date"
                className="p-2 border rounded"
                value={batch.startDate}
                onChange={(e) => updateBatch(i, "startDate", e.target.value)}
              />
              <input
                type="date"
                className="p-2 border rounded"
                value={batch.endDate}
                onChange={(e) => updateBatch(i, "endDate", e.target.value)}
              />
              <button
                type="button"
                className="col-span-3 mt-1 text-red-600"
                onClick={() => deleteBatch(i)}
              >
                Delete Batch
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addBatch}
          >
            + Add Batch
          </button>
        </div>

        {/* Modules & Lessons */}
        <div className="col-span-2 mt-6">
          <h2 className="font-semibold mb-2">Modules & Lessons</h2>
          {form.modules.map((mod, mIdx) => (
            <div key={mIdx} className="border p-3 rounded mb-2 bg-white">
              <div className="flex justify-between items-center gap-2">
                <input
                  className="flex-1 p-2 border rounded"
                  placeholder={`Module ${mIdx + 1} title`}
                  value={mod.title}
                  onChange={(e) => updateModuleTitle(mIdx, e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-1 bg-red-100 text-red-600 rounded"
                  onClick={() => deleteModule(mIdx)}
                >
                  Delete Module
                </button>
              </div>

              {/* Lessons */}
              {mod.lessons.map((lesson, lIdx) => (
                <div key={lIdx} className="border p-2 mt-2 rounded bg-gray-50 flex flex-col md:flex-row gap-2 items-start md:items-center">
                  <input
                    className="flex-1 p-2 border rounded"
                    placeholder="Lesson Title"
                    value={lesson.title}
                    onChange={(e) => updateLesson(mIdx, lIdx, "title", e.target.value)}
                  />
                  <input
                    className="flex-1 p-2 border rounded"
                    placeholder="Duration mm:ss"
                    value={lesson.duration}
                    onChange={(e) => updateLesson(mIdx, lIdx, "duration", e.target.value)}
                  />
                  <input
                    className="flex-1 p-2 border rounded"
                    placeholder="Video URL"
                    value={lesson.videoUrl}
                    onChange={(e) => updateLesson(mIdx, lIdx, "videoUrl", e.target.value)}
                  />
                  <button
                    type="button"
                    className="px-2 py-1 bg-red-100 text-red-600 rounded mt-1 md:mt-0"
                    onClick={() => deleteLesson(mIdx, lIdx)}
                  >
                    Delete Lesson
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="mt-2 px-3 py-1 bg-green-100 rounded"
                onClick={() => addLesson(mIdx)}
              >
                + Add Lesson
              </button>
            </div>
          ))}

          <button
            type="button"
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
            onClick={addModule}
          >
            + Add Module
          </button>
        </div>

        {/* Submit */}
        <div className="col-span-2 mt-6">
          <button
            type="button"
            className="w-full py-3 bg-green-600 text-white rounded-lg"
            onClick={submit}
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}
