export default function ActionsCell({onEdit, id, isEditing}) {
  const handleClick = () => {
    onEdit(id, !isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEdit(id, !isEditing);
    }
  };
  return (
    <td className="border-gray-300 border p-1">
      <div className="flex place-content-center">
        <div
          className="mr-2"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {isEditing ? '💾' : '📝'}
        </div>
        <div tabIndex={0}>⛔</div>
      </div>
    </td>
  );
}
