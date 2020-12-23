export default function EditableCell({isEditing, value, onChange, field}) {
  const handleChange = (e) => {
    onChange(field, e.target.innerText);
  };
  return (
    <td
      className={`border p-1 ${
        isEditing ? 'text-white bg-green-500 cursor-text' : 'border-gray-300'
      }`}
      contentEditable={isEditing}
      tabIndex={isEditing ? 0 : -1}
      onInput={handleChange}
      suppressContentEditableWarning={true} // https://stackoverflow.com/a/49639256
    >
      {value}
    </td>
  );
}
