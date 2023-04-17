import navBar from "../components/navBar"
import Image from "next/image"
import WSBImg from "../assets/images/wsb.jpeg"


export default function Home() {

  
  return (
    <>
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
