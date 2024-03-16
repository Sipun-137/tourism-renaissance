"use client";
import Image from "next/image";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <>
      <section className="flex flex-row items-center justify-between p-10">
        <div className="w-full m-2">
          <div className="text-6xl text-blue-800 ruslan-display-regular flex flex-col justify-center items-center gap-2">
            <span className="tracking-[5px] ">Tourism</span>
            <span className="tracking-[5px] ">renaissance</span>
            
          </div>

          <p className="flex flex-1 justify-center items-center">
          <span className="text-xl font-mono italic font-bold text-[#0B1623] tracking-wider">A Holistic Digital Ecosystem for Industry Recovery</span>
          </p>
        </div>
        <div className="w-[60%] m-2 aspect-square">
          <Spline scene="https://prod.spline.design/GqRpJxbl-st4nmFK/scene.splinecode" className="w-fit" />
        </div>
      </section>
      <section className="min-h-screen flex justify-center items-center p-24 bg-[#]">
        
      </section>
    </>
  );
}
