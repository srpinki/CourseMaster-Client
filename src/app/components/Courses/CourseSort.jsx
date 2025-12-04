export default function CourseSort({ sort, onSortChange }) {
  return (
    <select
      value={sort}
      onChange={(e) => onSortChange(e.target.value)}
      className="border px-3 py-2 rounded"
    >
      <option value="price_asc">Price: Low → High</option>
      <option value="price_desc">Price: High → Low</option>
    </select>
  );
}
