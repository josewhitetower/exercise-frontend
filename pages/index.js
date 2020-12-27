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
      <main className="container mx-auto mt-8 text-gray-800 bg-indigo-900 md:p-6 rounded-2xl">
        <h1 className="text-xl font-bold text-white mb-6 p-4">
          Exercise Tracker
        </h1>
        <section className="md:flex border-indigo-800 p-2 rounded-sm mt-2 border-t">
          <NewUserForm />
          <NewExerciseForm />
        </section>
        <section className="border-indigo-800 p-2 rounded-sm mt-2 border-t">
          <LogsForm setUserLog={setUserLog} />
          {userLog && <LogsTable user={userLog} key={userLog.log}/>}
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
