import navBar from "../components/navBar"
import Image from "next/image"
import WSBImg from "../assets/images/wsb.jpeg"


export default function Home() {

  
  return (
    <>

      <h1>Super mega stock trader league</h1>
      <h2>The leauge for you and your friends</h2>
      <button onClick={() => router.push('/register')}>Register Page</button>
      <button onClick={() => router.push('/login')}>Login Page</button>

      {navBar()}
        <div className="imageContainer">
          <Image
            src={WSBImg}
            alt="WallStreetBets"
            width={500}
            height={500}
            style={{margin: 'auto', display: 'block', marginTop: '100px'}}
            />
        </div>

    </>
  );
};
