import { useRouter } from "next/router"

export default function Home() {

  const router = useRouter()
  return (
    <>
      <h1>Super mega stock trader league</h1>
      <h2>The leauge for you and your friends</h2>
      <button onClick={() => router.push('/register')}>TEST</button>
      
    </>
  )

  
}
