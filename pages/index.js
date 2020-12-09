import Head from 'next/head';
import {useState} from 'react';
import NewUserForm from '../components/NewUserForm';
import NewExerciseForm from '../components/NewExerciseForm';
import LogsForm from '../components/LogsForm';
import LogsTable from '../components/LogsTable';

export default function Home() {
  const [userLog, setUserLog] = useState(null);
  return (
    <>
      <Head>
        <title>Exercise Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-2 mt-8 text-gray-800">
        <h1 className="text-center text-xl font-bold uppercase">
          Exercise Tracker
        </h1>
        <section className="md:flex border-gray-400 p-2 rounded-sm mt-2 border">
          <NewUserForm />
          <NewExerciseForm />
        </section>
        <section className="border-gray-400 p-2 rounded-sm mt-2 border">
          <LogsForm setUserLog={setUserLog} />
          {userLog && <LogsTable user={userLog} />}
        </section>
      </main>
      <footer className="text-center py-4 text-base">
        by{' '}
        <a
          href="http://github.com/josewhitetower"
          className="text-gray-400 hover:text-gray-800"
        >
          josewhitetower
        </a>
      </footer>
    </>
  );
}
