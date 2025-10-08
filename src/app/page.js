"use client";
import React from "react";
import BottomNavBar from "@/components/navigation/BottomNavbar";
import Hero from "@/components/sections/Hero";
import AboutMe from "@/components/sections/AboutMe";
import PortfolioMarquee from "@/components/sections/PortfolioMarquee";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Achievements from "@/components/sections/Achievements";
import WorkExperience from "@/components/sections/WorkExperience";
import LatestProjects from "@/components/sections/LatestProjects";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* <BgParticles /> */}
      <Hero />
      <AboutMe />
      <PortfolioMarquee />
      <Skills />
      <Education />
      <Achievements />
      <WorkExperience />
      <LatestProjects />
      <Footer />
      <BottomNavBar />
    </div>
  );
}
