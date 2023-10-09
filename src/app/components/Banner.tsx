"use client";
import { motion } from "framer-motion";
import lightSrc from "@images/developer.svg";
import darkSrc from "@images/developer-dark.svg";
import { ThemedImage } from "@components/ThemedImage";

export function Banner(): ReturnType<React.FC> {
  return (
    <section className="flex flex-col items-stretch mt-5 sm:flex-row sm:items-center sm:justify-between md:mt-2">
      <div className="flex-1 sm:text-left text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: 0.1,
          }}
          className="text-primary text-3xl font-semibold uppercase"
        >
          HI, I&apos;M GIL
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            delay: 1,
          }}
          className="text-secondary text-xl"
        >
          I build things for the web
        </motion.p>
      </div>
      <div className="flex-[2]">
        <ThemedImage
          lightSrc={lightSrc}
          darkSrc={darkSrc}
          priority
          alt="Developer"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </section>
  );
}
