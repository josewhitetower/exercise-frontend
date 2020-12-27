export default function ActionsCell({onEdit, log, isEditing}) {
  const handleClick = () => {
    onEdit(log, !isEditing);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEdit(log, !isEditing);
    }
  };
  return (
    <td className="border-gray-300 border p-1">
      <div className="flex place-content-center">
        <div
          className="mr-2 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {isEditing ? '💾' : '📝'}
        </div>
        <div tabIndex={0} className="mr-2 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer">⛔</div>
      </div>
    </td>
  );
}
