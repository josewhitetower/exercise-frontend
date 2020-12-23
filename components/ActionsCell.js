
export default function ActionsCell({onEdit, id, isEditing}) {

    const handleClick = () => {
        onEdit(id, !isEditing)
    }
    return (<td className="border-gray-300 border p-1">
        <div className="flex place-content-center">
            <div className="mr-2" onClick={handleClick}>{isEditing ? "💾" : "📝" }</div>
            <div>⛔</div>
        </div>
    </td>)
}