import {useState} from 'react';
import EditableCell from './EditableCell';
import ActionsCell from './ActionsCell';
export default function LogsTable({user}) {
  const [editableRow, setEditableRow] = useState(null);

  const onEdit = (id, value) => {
    if (value) {
      setEditableRow(id);
    } else {
      setEditableRow(null);
    }

  };
  return (
    <table className="w-full mt-4 border-collapse">
      <caption className="mb-2 font-semibold text-white mb-6">
        {user.username}'s Logs
      </caption>
      <thead>
        <tr className="bg-green-500 border text-white border-gray-300">
          <th className="p-1">Description</th>
          <th className="p-1">Duration</th>
          <th className="p-1">Date</th>
          <th className="p-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {user.log &&
          user.log.map((log) => {
            return (
              <tr className="border-gray-300 border text-white" key={log._id}>
                <EditableCell
                  isEditing={log._id === editableRow}
                  value={log.description}
                />
                <EditableCell
                  isEditing={log._id === editableRow}
                  value={log.duration}
                />
                <EditableCell
                  isEditing={log._id === editableRow}
                  value={log.date.split('T')[0]} // from 2020-12-08T13:17:54Z to 2020-12-08
                />
                <ActionsCell
                  onEdit={onEdit}
                  id={log._id}
                  isEditing={log._id === editableRow}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
