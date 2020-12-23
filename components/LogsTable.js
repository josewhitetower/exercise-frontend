import EditableCell from './EditableCell'
import ActionsCell from './ActionsCell'
export default function LogsTable({user}) {
  return (
    <table className="w-full mt-4">
      <caption className="mb-2 font-semibold text-white mb-6">{user.username}'s Logs</caption>
      <thead>
        <tr className="bg-green-500 border text-white border-gray-300">
          <th className="p-1">Description</th>
          <th className="p-1">Duration</th>
          <th className="p-1">Date</th>
          <th className="p-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {user.log && user.log.map((log) => {
          return (
            <tr className="border-gray-300 border text-white" key={log._id}>
              <EditableCell isEditing={false} value={log.description}/>
              <EditableCell isEditing={false} value={log.duration}/>
              <EditableCell isEditing={false} value={log.date}/>
              <ActionsCell/>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
