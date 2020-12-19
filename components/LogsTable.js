export default function LogsTable({user}) {
  return (
    <table className="w-full mt-4">
      <caption className="mb-2 font-semibold">{user.username}'s Logs</caption>
      <thead>
        <tr className="bg-gray-200 border border-gray-300">
          <th>Description</th>
          <th>Duration</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {user.log && user.log.map((log) => {
          return (
            <tr className="border-gray-300 border" key={log.date}>
              <td className="border-gray-300 border text-right">{log.description}</td>
              <td className="border-gray-300 border text-right">{log.duration}</td>
              <td className="border-gray-300 border text-right">{new Date(log.date).toDateString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
