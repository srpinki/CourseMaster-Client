export default function CourseFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onSelectCategory(e.target.value)}
      className="border px-3 py-2 rounded"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}
