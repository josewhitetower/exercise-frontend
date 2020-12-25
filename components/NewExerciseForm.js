import {useState} from 'react';
import Calendar from 'react-calendar';
export default function NewExerciseForm() {
  const [userId, setUserId] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsProcessing(true);
      e.preventDefault();
      const data = {
        user_id: Number(userId),
        description,
        duration: Number(duration),
        date: date.toISOString().slice(0, 10),
      };
      if (data.user_id && data.description && data.duration) {
        // create new Exercise
        const API_URL =
          'https://jt-exercise-tracker-mic.herokuapp.com/api/exercise/add';
        await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(data),
        });
        setSuccess(`Exercise added successfully`);
      }
    } catch (error) {
      setError('Internal Error');
    } finally {
      setUserId('');
      setDescription('');
      setDuration('');
      setDate('');
      setIsProcessing(false);
    }
  };

  const formattedDate = (date) => {
    const pad = (n) => {
      return n < 10 ? '0' + n : n;
    };
    return (
      date.getUTCFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate())
    );
  };

  const handleUserIdChange = (e) => {
    error && setError('');
    success && setSuccess('');
    setUserId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    error && setError('');
    success && setSuccess('');
    setDescription(e.target.value);
  };

  const handleDurationChange = (e) => {
    error && setError('');
    success && setSuccess('');
    setDuration(e.target.value);
  };

  const handleDateChange = (value) => {
    error && setError('');
    success && setSuccess('');
    setDate(value);
    setShowCalendar(false);
  };

  const handleTileClassName = (tile) => {
    if (formattedDate(tile.date) === formattedDate(date)) {
      return 'bg-indigo-900 rounded';
    }
  };
  return (
    <form
      className="mt-4 p-2 md:flex-grow md:ml-4 flex flex-col"
      onSubmit={handleSubmit}
    >
      <h3 className="font-semibold text-white">Add exercises</h3>
      <div className="flex mt-2 items-center">
        <label htmlFor="userId" className="flex-shrink-0 text-gray-300">
          User ID*:
        </label>
        <input
          type="text"
          required
          id="userId"
          name="userId"
          className="p-2 ml-2 w-full bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
          onChange={handleUserIdChange}
          value={userId}
        />
      </div>
      <div className="flex mt-2 items-center">
        <label htmlFor="description" className="flex-shrink-0 text-gray-300">
          Description*:
        </label>
        <input
          type="text"
          required
          id="description"
          name="description"
          className="p-2 ml-2 w-full bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
          onChange={handleDescriptionChange}
          value={description}
        />
      </div>
      <div className="flex mt-2 items-center">
        <label htmlFor="duration" className="flex-shrink-0 text-gray-300">
          Duration*:
        </label>
        <input
          type="number"
          required
          id="duration"
          name="duration"
          className="p-2 ml-2 w-full bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
          onChange={handleDurationChange}
          value={duration}
          placeholder="mins"
        />
      </div>
      <div className="flex mt-2 items-center">
        <label htmlFor="date" className="flex-shrink-0 text-gray-300">
          Date:
        </label>
        <div className="relative">
          <input
            type="text"
            id="date"
            name="date"
            autoComplete="off"
            readOnly={true}
            className="p-2 ml-2 w-full bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
            onFocus={() => setShowCalendar(true)}
            value={formattedDate(date)}
            placeholder="yyyy-mm-dd"
          />
          {showCalendar && (
            <Calendar
              className={`absolute ml-2 bg-green-500 rounded p-1 text-white`}
              value={date}
              onChange={handleDateChange}
              tileClassName={handleTileClassName}
            />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="rounded-full py-2 px-4 mt-6 bg-green-500 text-white font-semibold self-end hover:bg-green-400"
      >
        {isProcessing ? 'Processing...' : 'Submit'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
    </form>
  );
}
