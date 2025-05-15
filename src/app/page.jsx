import Image from "next/image";
import Price from "./components/Price/Page"
import SliderMain from "./components/SliderMain/Page"
import MainText from "./components/MainText/Page"
import DentalServices from "./components/DentalServices/Page"
import Doctors from "./components/Doctors/Page"
import Packageprices from "./components/PackagePrices/page"

export default function Home() {
  return (
    <div>

      <SliderMain />
      <MainText />
      <DentalServices />
      {/* <Packageprices />  */}
      {/* <Price /> */}
      <Doctors />



      {/* <iframe
        className="w-96"
        src="https://www.youtube.com/embed/0jgrCKhxE1s?autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe> */}

    </div>
  );
}
