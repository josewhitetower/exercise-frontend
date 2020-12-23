import {useState} from 'react';
export default function NewUserForm() {
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsProcessing(true);
      e.preventDefault();
      if (newUserName) {
        // create new User
        const API_URL =
          'https://jt-exercise-tracker-mic.herokuapp.com/api/exercise/new-user';
        const res = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify({username: newUserName}),
        });

        if (res.status === 409) {
          throw new Error('Username is already taken');
        }

        const data = await res.json();
        setSuccess(`User added successfully, ID: ${data._id}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setNewUserName('');
      setIsProcessing(false);
    }
  };

  const handleChange = (e) => {
    error && setError('');
    success && setSuccess('');
    setNewUserName(e.target.value);
  };

  return (
    <form
      className="mt-4 p-2 md:flex-grow md:justify-between md:self-start flex flex-col"
      onSubmit={handleSubmit}
    >
      <h3 className="font-semibold text-white">Create a new user</h3>
      <div className="flex mt-2 items-center">
        <label htmlFor="username" className="text-gray-300">Username*:</label>
        <input
          type="text"
          required
          id="username"
          name="username"
          className="p-2 ml-2 w-full bg-indigo-900 border-b border-green-500 text-gray-300 cursor-pointer focus:cursor-text focus:border-green-200 focus:outline-none"
          onChange={handleChange}
          value={newUserName}
        />
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
