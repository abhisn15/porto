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
import { useRefreshTriggersAfterLoad } from "@/hooks/useRevealOnScroll";

// Dua lapis, dan urutannya penting. Lapis luar selebar layar TANPA scrollbar dan
// memotong apa pun yang menyembul; lapis dalam yang membatasi isi di 1920. Dengan
// begitu pita PORTOFOLIO boleh menembus 1920 sampai menyentuh kedua tepi layar,
// sementara kelebihannya tidak bisa digeser ke samping.
export default function Page() {
  // Foto kolase dan gambar proyek dimuat belakangan dan mengubah tinggi halaman.
  // Tanpa perhitungan ulang, bagian bawah bisa terlewat ambangnya dan tidak pernah muncul.
  useRefreshTriggersAfterLoad();

  return (
    <div className="overflow-x-clip">
      <div className="min-h-screen mx-auto max-w-[1920px]">
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
    </div>
  );
}
