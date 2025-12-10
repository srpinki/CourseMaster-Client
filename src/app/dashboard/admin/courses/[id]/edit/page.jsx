"use client";

import React, { useEffect, useState, startTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminCourseById,
  updateAdminCourse,
  clearSingleCourse,
} from "@/app/redux/slice/adminCourseSlice";
import Swal from "sweetalert2";

export default function EditCourse() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { single, singleStatus, updateStatus } = useSelector(
    (state) => state.adminCourses
  );

  const defaultForm = {
    title: "",
    description: "",
    instructor: "",
    price: 0,
    category: "",
    thumbnail: "",
    videoUrl: "",
    syllabus: [""],
    tags: [""],
    batches: [{ name: "", startDate: "", endDate: "" }],
    modules: [{ title: "", lessons: [{ title: "", duration: "", videoUrl: "" }] }],
  };

  const [form, setForm] = useState(defaultForm);

  // =========================
  // Fetch Course from Redux
  // =========================
  useEffect(() => {
    if (id) dispatch(fetchAdminCourseById(id));

    return () => dispatch(clearSingleCourse());
  }, [id, dispatch]);

  // =========================
  // Auto Fill Form (No ESLint warning)
  // =========================
  useEffect(() => {
    if (singleStatus === "success" && single) {
      startTransition(() => {
        setForm({
          ...defaultForm,
          ...single,
          price: single.price || 0,
          syllabus: single.syllabus?.length ? single.syllabus : [""],
          tags: single.tags?.length ? single.tags : [""],
          batches:
            single.batches?.length > 0
              ? single.batches
              : [{ name: "", startDate: "", endDate: "" }],
          modules:
            single.modules?.length > 0
              ? single.modules
              : [
                  {
                    title: "",
                    lessons: [{ title: "", duration: "", videoUrl: "" }],
                  },
                ],
        });
      });
    }
  }, [single, singleStatus]);

  // =========================
  // Handle Input Changes
  // =========================
  const handleChange = (e, field, index, subIndex, type) => {
    const value = e.target.value;
    const copy = structuredClone(form);

    switch (type) {
      case "syllabus":
        copy.syllabus[index] = value;
        break;
      case "tags":
        copy.tags[index] = value;
        break;
      case "batches":
        copy.batches[index][field] = value;
        break;
      case "modules":
        copy.modules[index][field] = value;
        break;
      case "lessons":
        copy.modules[index].lessons[subIndex][field] = value;
        break;
      default:
        copy[field] = value;
    }
    setForm(copy);
  };

  // =========================
  // Add Dynamic Field
  // =========================
  const addField = (type, index) => {
    const copy = structuredClone(form);

    switch (type) {
      case "syllabus":
        copy.syllabus.push("");
        break;
      case "tags":
        copy.tags.push("");
        break;
      case "batches":
        copy.batches.push({ name: "", startDate: "", endDate: "" });
        break;
      case "modules":
        copy.modules.push({
          title: "",
          lessons: [{ title: "", duration: "", videoUrl: "" }],
        });
        break;
      case "lessons":
        copy.modules[index].lessons.push({
          title: "",
          duration: "",
          videoUrl: "",
        });
        break;
    }

    setForm(copy);
  };

  // =========================
  // Remove Field with Confirmation
  // =========================
  const removeField = async (type, index, subIndex) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete a ${type}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const copy = structuredClone(form);

    switch (type) {
      case "syllabus":
        copy.syllabus.splice(index, 1);
        break;
      case "tags":
        copy.tags.splice(index, 1);
        break;
      case "batches":
        copy.batches.splice(index, 1);
        break;
      case "modules":
        copy.modules.splice(index, 1);
        break;
      case "lessons":
        copy.modules[index].lessons.splice(subIndex, 1);
        break;
    }

    setForm(copy);
  };

  // =========================
  // Submit Update
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Update Course?",
      text: "Are you sure you want to update this course?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    });

    if (!result.isConfirmed) return;

    const res = await dispatch(updateAdminCourse({ id, data: form }));

    if (res.meta.requestStatus === "fulfilled") {
      Swal.fire("Success", "Course updated successfully!", "success");
      router.push("/dashboard/admin/courses");
    } else {
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  // =========================
  // Loading State
  // =========================
  if (singleStatus === "loading")
    return (
      <div className="p-6 text-center text-gray-600">Loading course...</div>
    );

  return (
    <div className="p-6 bg-[#f0f6ff] min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">✏ Edit Course</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      >
        {/* Basic Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange(e, "title")}
            className="border rounded px-3 py-2 w-full"
            required
          />

          <input
            type="text"
            placeholder="Instructor"
            value={form.instructor}
            onChange={(e) => handleChange(e, "instructor")}
            className="border rounded px-3 py-2 w-full"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => handleChange(e, "price")}
            className="border rounded px-3 py-2 w-full"
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => handleChange(e, "category")}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <input
          type="text"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={(e) => handleChange(e, "thumbnail")}
          className="border rounded px-3 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Video URL"
          value={form.videoUrl}
          onChange={(e) => handleChange(e, "videoUrl")}
          className="border rounded px-3 py-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleChange(e, "description")}
          className="border rounded px-3 py-2 w-full"
          rows={4}
        />

        {/* Dynamic Components */}
        <DynamicField
          title="Syllabus"
          items={form.syllabus}
          type="syllabus"
          handleChange={handleChange}
          addField={addField}
          removeField={removeField}
        />

        <DynamicField
          title="Tags"
          items={form.tags}
          type="tags"
          handleChange={handleChange}
          addField={addField}
          removeField={removeField}
        />

        <BatchesField
          batches={form.batches}
          handleChange={handleChange}
          addField={addField}
          removeField={removeField}
        />

        <ModulesField
          modules={form.modules}
          handleChange={handleChange}
          addField={addField}
          removeField={removeField}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateStatus === "loading"}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
          >
            {updateStatus === "loading" ? "Updating..." : "Update Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------------------
   DYNAMIC FIELD COMPONENTS
---------------------- */

const DynamicField = ({ title, items, type, handleChange, addField, removeField }) => (
  <div>
    <h3 className="font-semibold text-blue-600 mb-2">{title}</h3>

    {items.map((item, index) => (
      <div key={index} className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder={title.slice(0, -1)}
          value={item}
          onChange={(e) => handleChange(e, null, index, null, type)}
          className="border rounded px-3 py-2 flex-1"
        />

        <button
          type="button"
          onClick={() => removeField(type, index)}
          className="px-3 py-2 bg-red-500 text-white rounded"
        >
          -
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={() => addField(type)}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      + Add {title.slice(0, -1)}
    </button>
  </div>
);

const BatchesField = ({ batches, handleChange, addField, removeField }) => (
  <div className="mt-4">
    <h3 className="font-semibold text-blue-600 mb-2">Batches</h3>

    {batches.map((batch, index) => (
      <div key={index} className="flex gap-2 mb-2 flex-wrap">
        <input
          type="text"
          placeholder="Batch Name"
          value={batch.name}
          onChange={(e) => handleChange(e, "name", index, null, "batches")}
          className="border rounded px-3 py-2 flex-1"
        />

        <input
          type="date"
          value={batch.startDate?.slice(0, 10)}
          onChange={(e) => handleChange(e, "startDate", index, null, "batches")}
          className="border rounded px-3 py-2"
        />

        <input
          type="date"
          value={batch.endDate?.slice(0, 10)}
          onChange={(e) => handleChange(e, "endDate", index, null, "batches")}
          className="border rounded px-3 py-2"
        />

        <button
          type="button"
          onClick={() => removeField("batches", index)}
          className="px-3 py-2 bg-red-500 text-white rounded"
        >
          -
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={() => addField("batches")}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      + Add Batch
    </button>
  </div>
);

const ModulesField = ({ modules, handleChange, addField, removeField }) => (
  <div className="mt-4">
    <h3 className="font-semibold text-blue-600 mb-2">Modules</h3>

    {modules.map((module, mIndex) => (
      <div key={mIndex} className="border p-3 rounded mb-4">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            placeholder="Module Title"
            value={module.title}
            onChange={(e) => handleChange(e, "title", mIndex, null, "modules")}
            className="border rounded px-3 py-2 flex-1"
          />

          <button
            type="button"
            onClick={() => removeField("modules", mIndex)}
            className="px-3 py-2 bg-red-500 text-white rounded"
          >
            -
          </button>
        </div>

        <h4 className="font-medium text-blue-500 mb-1">Lessons</h4>

        {module.lessons.map((lesson, lIndex) => (
          <div key={lIndex} className="flex gap-2 mb-2 flex-wrap">
            <input
              type="text"
              placeholder="Lesson Title"
              value={lesson.title}
              onChange={(e) => handleChange(e, "title", mIndex, lIndex, "lessons")}
              className="border rounded px-3 py-2 flex-1"
            />

            <input
              type="text"
              placeholder="Duration"
              value={lesson.duration}
              onChange={(e) =>
                handleChange(e, "duration", mIndex, lIndex, "lessons")
              }
              className="border rounded px-3 py-2"
            />

            <input
              type="text"
              placeholder="Video URL"
              value={lesson.videoUrl}
              onChange={(e) =>
                handleChange(e, "videoUrl", mIndex, lIndex, "lessons")
              }
              className="border rounded px-3 py-2 flex-1"
            />

            <button
              type="button"
              onClick={() => removeField("lessons", mIndex, lIndex)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              -
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => addField("lessons", mIndex)}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
        >
          + Add Lesson
        </button>
      </div>
    ))}

    <button
      type="button"
      onClick={() => addField("modules")}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      + Add Module
    </button>
  </div>
);
