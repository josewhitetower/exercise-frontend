import {useState} from 'react';
export default function NewExerciseForm() {
  const [userId, setUserId] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    setIsProcessing(true);
    e.preventDefault();
    const data = {
      user_id: Number(userId),
      description,
      duration: Number(duration),
      date,
    };
    if (data.user_id && data.description && data.duration) {
      // create new Exercise
      const API_URL =
        'https://jt-exercise-tracker-mic.herokuapp.com/api/exercise/add';
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setSuccess(`Exercise added successfully`);
        })
        .catch((e) => {
          setError('Internal Error');
        })
        .finally(() => {
          setUserId('');
          setDescription('');
          setDuration('');
          setDate('');
          setIsProcessing(false);
        });
    }
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

  const handleDateChange = (e) => {
    error && setError('');
    success && setSuccess('');
    setDate(e.target.value);
  };

  return (
    <form
      className="mt-4 bg-gray-100 p-2 rounded md:flex-grow md:ml-4"
      onSubmit={handleSubmit}
    >
      <h3 className="font-semibold">Add exercises</h3>
      <div className="flex mt-2 items-center">
        <label htmlFor="userId" className="flex-shrink-0">
          User ID*:
        </label>
        <input
          type="text"
          required
          id="userId"
          name="userId"
          className="p-1 rounded ml-2 w-full"
          onChange={handleUserIdChange}
          value={userId}
        />
      </div>
      <div className="flex mt-2 items-center">
        <label htmlFor="description" className="flex-shrink-0">
          Description*:
        </label>
        <input
          type="text"
          required
          id="description"
          name="description"
          className="p-1 rounded ml-2 w-full"
          onChange={handleDescriptionChange}
          value={description}
        />
      </div>
      <div className="flex mt-2 items-center">
        <label htmlFor="duration" className="flex-shrink-0">
          Duration*:
        </label>
        <input
          type="number"
          required
          id="duration"
          name="duration"
          className="p-1 rounded ml-2 w-full"
          onChange={handleDurationChange}
          value={duration}
          placeholder="mins"
        />
      </div>
      <div className="flex mt-2 items-center">
        <label htmlFor="date" className="flex-shrink-0">
          Date:
        </label>
        <input
          type="text"
          id="date"
          name="date"
          className="p-1 rounded ml-2 w-full"
          onChange={handleDateChange}
          value={date}
          placeholder="yyyy-mm-dd"
        />
      </div>
      <button
        type="submit"
        className="rounded border border-gray-300 py-1 w-full mt-4 hover:bg-gray-800 hover:text-white font-semibold"
      >
        {isProcessing ? 'Processing...' : 'Submit'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
    </form>
  );
}
