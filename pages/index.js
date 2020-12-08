import Head from 'next/head'
import NewUserForm from '../components/NewUserForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Exercise Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-2 mt-8 text-gray-800">
        <h1>Exercise Tracker</h1>
        <NewUserForm/>
      </main>
    </>
  )
}
