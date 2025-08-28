import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Variants untuk stagger animation pada teks
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const nameVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
  },
};

export default function Hero() {
  return (
    <motion.div
      className="flex flex-col-reverse lg:flex-row justify-between items-center px-6 sm:px-10 lg:px-20 xl:px-32 py-16 gap-12 lg:gap-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Bagian Teks */}
      <motion.div className="flex-1 text-center lg:text-left" variants={containerVariants}>
        <motion.h4
          className="font-baloo-2-medium text-lg sm:text-xl"
          variants={childVariants}
        >
          Hi There 👋🏻
        </motion.h4>

        <motion.div
          className="font-hero flex flex-row justify-center lg:justify-start items-center gap-3 sm:gap-4 mt-2"
          variants={childVariants}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl"
            variants={childVariants}
          >
            I&apos;m
          </motion.h1>
          <div className="flex flex-col items-center">
            <motion.h1
              className="text-[#99F4FF] text-2xl sm:text-3xl md:text-4xl relative z-10"
              variants={nameVariants}
            >
              Abhi Surya Nugroho
            </motion.h1>
            <motion.div
              className="w-full relative z-0 bottom-2 h-[1px] bg-white origin-left"
              variants={underlineVariants}
            ></motion.div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-row justify-center lg:justify-start items-center gap-2 mt-3"
          variants={childVariants}
        >
          <motion.div
            className="h-[1px] bg-white w-12 sm:w-20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          ></motion.div>
          <motion.h6
            className="font-baloo-2-medium text-sm sm:text-base"
            variants={childVariants}
          >
            Fullstack Developer
          </motion.h6>
        </motion.div>

        <motion.h6
          className="font-baloo-2-medium text-sm sm:text-base mt-2"
          variants={childVariants}
        >
          Code With intention. Design with compassion
        </motion.h6>

        <motion.h6
          className="font-baloo-2-medium text-white/80 text-xs sm:text-sm mt-4"
          variants={childVariants}
        >
          React JS · React Native · MySQL · SQL Server
        </motion.h6>

        {/* Tombol */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mt-6"
          variants={childVariants}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(107, 190, 200, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="font-sans tracking-widest bg-[#6BBEC8] rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md px-6 sm:px-8 py-2 border-b-2 border-r-2 border-[#DDDDDD] text-sm sm:text-base transition-all duration-300 ease-out hover:bg-[#5AAEB9] hover:border-[#CCCCCC]"
          >
            CV Review
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(79, 145, 201, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="font-sans tracking-widest bg-[#4F91C9] rounded-bl-3xl rounded-tr-3xl rounded-br-md rounded-tl-md px-6 sm:px-8 py-2 border-b-2 border-r-2 border-[#DDDDDD] text-sm sm:text-base transition-all duration-300 ease-out hover:bg-[#3E80B5] hover:border-[#CCCCCC]"
          >
            Explore My Projects
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Bagian Gambar */}
      <div className="flex-1 flex justify-center items-center relative">
        <Image
          src="/assets/hero/profile.jpg"
          alt="Profile Hero Image"
          width={350}
          height={350}
          className="rounded-b-[60px] sm:rounded-b-[80px] object-cover relative sm:bottom-20 z-10"
        />
        <Image
          src="/assets/hero/awan.gif"
          alt="Awan"
          width={200}
          height={200}
          className="absolute -bottom-6 sm:bottom-4 -left-10 sm:left-10 z-10"
        />
        <Image
          src="/assets/hero/matahari.png"
          alt="Matahari"
          width={150}
          height={150}
          className="absolute -bottom-6 sm:-top-10 -left-10 sm:left-90 z-10"
        />
      </div>
    </motion.div>
  );
}
