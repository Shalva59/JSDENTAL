
"use client";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { doctors } from "../../js/doctors"
import { Montserrat, Poppins, Kanit, Tektur } from "next/font/google";


console.log(tektur);
console.log(kanit);

const tektur = Tektur({ subsets: ["latin"], weight: ["500"], variable: "--font-tektur" });


const kanit = Kanit({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

// Montserrat ფონტი
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

// Poppins ფონტი
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "600"] });



const Page = () => {




  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-center text-2xl ponomar-regular font-bold mb-6 tracking-[.25em]">
        ექიმები
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true} // უწყვეტი ციკლი
        autoplay={{
          delay: 3000, // 3 წამი თითო სლაიდზე
          disableOnInteraction: false, // მომხმარებლის ინტერაქციის შემდეგაც გააგრძელოს
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        className="flex items-center justify-center p-[41px] h-[438px]"
      >
        {doctors.map((doctor, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col justify-center items-center" style={{ display: "flex" }}
          >
            {/* ახალი div კონტეინერი, რომელიც არ დაუშვებს გამოსახულების გასვლას */}
            <div className="w-60 h-60 rounded-full overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full cursor-pointer object-cover transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </div>

            <div className="testMode mt-4">
              <h3 className="text-lg text-center font-semibold tracking-[1.7px]">{doctor.name}</h3>
              <p className="text-sm text-center text-gray-600 tracking-[1.4px]">{doctor.specialty}</p>
              {/* <p className="text-xl font-kanit">ეს არის  gabriel janashvili  ფონტი</p>
              <p className="text-lg font-tektur">ეს არის gabriel janashvili ფონტი</p> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );


}

export default Page
