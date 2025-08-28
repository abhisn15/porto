"use client";
import React, { useState, useRef } from "react";
import BottomNavBar from "@/components/navigation/BottomNavbar";
import Hero from "@/components/sections/Hero";
import BgParticles from "@/components/particles/BgParticles";
import AboutMe from "@/components/sections/AboutMe";

export default function RootLayout({ children }) {
  return (
    <div>
      <BgParticles />
      <Hero />
      <AboutMe />
      <BottomNavBar />
    </div>
  );
}
