import {useState} from 'react';
import EditableCell from './EditableCell';
import ActionsCell from './ActionsCell';
export default function LogsTable({user}) {
  const [editableRow, setEditableRow] = useState(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onChange = (field, value) => {
    switch (field) {
      case 'description':
        setDescription(value);
        break;
      case 'duration':
        setDuration(value);
        break;
      case 'date':
        setDate(value);
        break;
    }
  };

  const onEdit = (log, value) => {
    let updatedRow;
    if (value) {
      if (!editableRow) {
        setEditableRow(log._id);
      }
    } else {
      if (description) {
        updatedRow = {...log, description};
      }
      if (date) {
        updatedRow = {...log, date};
      }
      if (duration) {
        updatedRow = {...log, duration};
      }
      setDescription('');
      setDate('');
      setDuration('');
      updateRow(updatedRow);
    }
  };

  const updateRow = async (row) => {
    try {
      setIsProcessing(true);
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Access-Control-Allow-Origin', '*');

      const data = {
        _id: Number(row._id),
        description: row.description,
        duration: Number(row.duration),
        date: row.date,
      };
      // create new Exercise
      await fetch(API_URL, {
        method: 'POST', // it should be PUT though
        body: JSON.stringify(data),
      });
    } catch (error) {
      setIsProcessing(false);
    } finally {
      setEditableRow(null);
      setIsProcessing(false);
    }

  };
  return (
    <table className="w-full mt-4 border-collapse">
      <caption className="font-semibold text-white mb-6">
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
              <tr
                className={`border-gray-300 border text-white ${
                  log._id === editableRow && isProcessing ? 'animate-pulse' : ''
                }`}
                key={log._id}
              >
                <EditableCell
                  isEditing={log._id === editableRow}
                  onChange={onChange}
                  value={log.description}
                  field="description"
                />
                <EditableCell
                  isEditing={log._id === editableRow}
                  onChange={onChange}
                  value={log.duration}
                  field="duration"
                />
                <EditableCell
                  isEditing={log._id === editableRow}
                  onChange={onChange}
                  value={log.date.split('T')[0]} // from 2020-12-08T13:17:54Z to 2020-12-08
                  field="date"
                />
                <ActionsCell
                  onEdit={onEdit}
                  log={log}
                  isEditing={log._id === editableRow}
                />
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
