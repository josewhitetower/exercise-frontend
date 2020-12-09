import {useState} from 'react';
export default function NewUserForm() {
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUserName) {
      // create new User
      const API_URL ='https://jt-exercise-tracker-mic.herokuapp.com/api/exercise/new-user';
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({username: newUserName}),
      })
        .then((res) => {
          if (res.status === 409) {
            throw new Error('Username is already taken');
          }
          return res.json();
        })
        .then((data) => {
          setSuccess(`User added successfully, ID: ${data._id}`);
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setNewUserName('');
        });
    }
  };

  const handleChange = (e) => {
    error && setError('');
    success && setSuccess('');
    setNewUserName(e.target.value);
  };

  return (
    <form
      className="mt-4 bg-gray-100 p-2 rounded md:flex-grow md:justify-between md:self-start"
      onSubmit={handleSubmit}
    >
      <h3 className="font-semibold">Create a new user</h3>
      <div className="flex mt-2 items-center">
        <label htmlFor="username">Username*:</label>
        <input
          type="text"
          required
          id="username"
          name="username"
          className="p-1 rounded ml-2 w-full"
          onChange={handleChange}
          value={newUserName}
        />
      </div>
      <button
        type="submit"
        className="rounded border border-black py-1 w-full mt-4 hover:bg-gray-800 hover:text-white"
      >
        Submit
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
    </form>
  );
}
