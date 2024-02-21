"use client";
import Image from "next/image";
import Spline from "@splinetool/react-spline";

export default function Home() {
  return (
    <>
      <section className="flex min-h-screen flex-row items-center justify-between p-10">
        <div className="w-full m-2 ">
          <div className="text-6xl text-blue-800 ruslan-display-regular flex flex-col justify-center items-center gap-2">
            <span className="tracking-[5px] ">Tourism</span>
            <span className="tracking-[5px] ">renaissance</span>
          </div>
        </div>
        <div className="max-h-full aspect-square w-full m-2">
          {/* <Spline scene="https://prod.spline.design/GqRpJxbl-st4nmFK/scene.splinecode" /> */}
        </div>
      </section>
      <div className="min-h-screen flex justify-center items-center p-24">
        
      </div>
    </>
  );
}
