export default function EditableCell({isEditing, value}) {
  return !isEditing ? (
    <td className="border-gray-300 border p-1">{value}</td>
  ) : (
    <input
      type="text"
      className="text-indigo-900"
      defaultValue={value}
    />
  );
}
