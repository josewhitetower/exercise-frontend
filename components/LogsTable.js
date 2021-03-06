import {useState} from 'react';
import EditableCell from './EditableCell';
import ActionsCell from './ActionsCell';
export default function LogsTable({user}) {
  const [editableRow, setEditableRow] = useState(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState(user.log);

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

      updateRow(updatedRow);
    }
  };

  const onDelete = (id) => {
    const confirm = window.confirm('Are you sure');

    if (confirm) {
      deleteRow(id);
    }
  };

  const deleteRow = async (id) => {
    try {
      setError('');
      setIsProcessing(true);
      const data = {
        _id: id,
      };
      // create new Exercise
      const API_URL =
        'https://jt-exercise-tracker-mic.herokuapp.com/api/exercise/delete';
      const res = await fetch(API_URL, {
        method: 'POST', // it should be PUT though
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const newLogs = logs.filter((log) => log._id !== id);
      setLogs(newLogs);
    } catch (error) {
      setIsProcessing(false);
      setError('Error deleting row, please reload page');
    } finally {
      setEditableRow(null);
    }
  };

  const updateRow = async (row) => {
    try {
      setIsProcessing(true);

      const data = {
        _id: Number(row._id),
        description: row.description,
        duration: Number(row.duration),
        date: row.date,
      };
      // create new Exercise
      const API_URL =
        'https://jt-exercise-tracker-mic.herokuapp.com/api/exercise/edit';
      const res = await fetch(API_URL, {
        method: 'POST', // it should be PUT though
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      setIsProcessing(false);
    } finally {
      setEditableRow(null);
      setIsProcessing(false);
      setDescription('');
      setDate('');
      setDuration('');
    }
  };
  return (
    <table className="w-full mt-4 border-collapse">
      <caption className="font-semibold text-white mb-6">
        {user.username}'s Logs
        {error && <p className="text-red-500">{error}</p>}
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
        {logs &&
          logs.map((log) => {
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
                  onDelete={onDelete}
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
