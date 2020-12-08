import {useState} from 'react';
export default function LogsForm({setUserLog}) {
  const [userId, setUserId] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const API_URL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4747/api/exercise/log?'
        : '/api/exercise/log?';
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

    fetch(API_URL + params.toString(), {
      mode: 'cors',
    })
      .then((res) => {
        if (res.status === 404) {
          setUserLog(null);
          throw new Error('User not found');
        }
        return res.json();
      })
      .then((data) => setUserLog(data))
      .catch((err) => {
        setError(err.message);
      });
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
    <form className="mt-4 bg-gray-100 p-2 rounded" onSubmit={handleSubmit}>
      <h3 className="font-semibold">Log user's exercises</h3>
      <div className="flex flex-wrap">
        <div className="flex mt-2 items-center flex-grow mr-2">
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
        <div className="flex mt-2 items-center flex-grow mr-2">
          <label htmlFor="from" className="flex-shrink-0">
            From:
          </label>
          <input
            type="text"
            id="from"
            name="from"
            className="p-1 rounded ml-2 w-full"
            onChange={handleFromChange}
            value={from}
            placeholder="yyyy-mm-dd"
          />
        </div>
        <div className="flex mt-2 items-center flex-grow mr-2">
          <label htmlFor="to" className="flex-shrink-0">
            To:
          </label>
          <input
            type="text"
            id="to"
            name="to"
            className="p-1 rounded ml-2 w-full"
            onChange={handleToChange}
            value={to}
            placeholder="yyyy-mm-dd"
          />
        </div>
        <div className="flex mt-2 items-center flex-grow mr-2">
          <label htmlFor="limit" className="flex-shrink-0">
            Limit:
          </label>
          <input
            type="number"
            id="limit"
            name="date"
            className="p-1 rounded ml-2 w-full"
            onChange={handleLimitChange}
            value={limit}
          />
        </div>
      </div>
      <button
        type="submit"
        className="rounded border border-black py-1 px-2 mt-4 hover:bg-gray-800 hover:text-white"
      >
        Submit
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </form>
  );
}
