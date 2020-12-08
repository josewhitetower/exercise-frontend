import Head from 'next/head';
import NewUserForm from '../components/NewUserForm';
import NewExerciseForm from '../components/NewExerciseForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Exercise Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-2 mt-8 text-gray-800">
        <h1 className="text-center text-xl font-bold uppercase">Exercise Tracker</h1>
        <section className="md:flex border-gray-400 p-2 rounded-sm mt-2 border">
          <NewUserForm />
          <NewExerciseForm />
        </section>
      </main>
    </>
  );
}
