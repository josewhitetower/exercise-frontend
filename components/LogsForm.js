import {useState} from 'react';
export default function LogsForm({setUserLog}) {
  const [userId, setUserId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsProcessing(true);
      e.preventDefault();
      const API_URL =
        'https://jt-exercise-tracker-mic.herokuapp.com/api/exercise/log?';
      const params = new URLSearchParams();
      if (userId) {
        params.append('userId', userId);
      }
      if (from) {
        params.append('from', from);
      }
      if (to) {
        params.append('to', to);
      }
      if (limit) {
        params.append('limit', limit);
      }

      const res = await fetch(API_URL + params.toString(), {
        mode: 'cors',
      });

      if (res.status === 404) {
        setUserLog(null);
        throw new Error('User not found');
      }

      const data = await res.json();
      setUserLog(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsProcessing(false);
      setError('')
    }
  };

  const handleUserIdChange = (e) => {
    error && setError('');
    setUserId(e.target.value);
  };

  const handleFromChange = (e) => {
    error && setError('');
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    error && setError('');
    setTo(e.target.value);
  };

  const handleLimitChange = (e) => {
    error && setError('');
    setLimit(e.target.value);
  };

  return (
    <form className="mt-4 p-2 flex flex-col" onSubmit={handleSubmit}>
      <h3 className="font-semibold text-white">Log user's exercises</h3>
      <div className="flex flex-wrap">
        <div className="flex mt-2 items-center flex-grow mr-2">
          <label htmlFor="userId" className="flex-shrink-0 text-gray-300">
            User ID*:
          </label>
          <input
            type="text"
            required
            id="userId"
            name="userId"
            className="p-2 ml-2 bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
            onChange={handleUserIdChange}
            value={userId}
          />
        </div>
        <div className="flex mt-2 items-center flex-grow mr-2">
          <label htmlFor="from" className="flex-shrink-0 text-gray-300">
            From:
          </label>
          <input
            type="text"
            id="from"
            name="from"
            className="p-2 ml-2 bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
            onChange={handleFromChange}
            value={from}
            placeholder="yyyy-mm-dd"
          />
        </div>
        <div className="flex mt-2 items-center flex-grow mr-2">
          <label htmlFor="to" className="flex-shrink-0 text-gray-300">
            To:
          </label>
          <input
            type="text"
            id="to"
            name="to"
            className="p-2 ml-2 bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
            onChange={handleToChange}
            value={to}
            placeholder="yyyy-mm-dd"
          />
        </div>
        <div className="flex mt-2 items-center flex-grow mr-2">
          <label htmlFor="limit" className="flex-shrink-0 text-gray-300">
            Limit:
          </label>
          <input
            type="number"
            id="limit"
            name="date"
            className="p-2 ml-2 bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
            onChange={handleLimitChange}
            value={limit}
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded-full py-2 px-4 mt-6 bg-green-500 text-white font-semibold self-end hover:bg-green-400"
      >
        {isProcessing ? 'Processing...' : 'Submit'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </form>
  );
}
