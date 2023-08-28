"use client"
import ECommerce from "@/components/Dashboard/Dashboard";
import Navbar from "@/iComponents/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    
        <Navbar/>
        
      <div className="h-80vh flex">
        <div>
          <h2>Huge Cost Savings
Access wholesale prices
Affordable Medicines</h2>
        </div>
        <div>
          {/* <Image src={} /> */}
        </div>
      </div>
    </>
  );
}
