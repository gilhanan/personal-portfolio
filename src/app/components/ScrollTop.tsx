"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";

const minScrollToShow = 400;

export function ScrollTop(): ReturnType<React.FC> {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", calcShowScroll);

    return () => window.removeEventListener("scroll", calcShowScroll);
  }, []);

  function calcShowScroll() {
    setShowScroll(window.scrollY > minScrollToShow);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    showScroll && (
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
        className="fixed bottom-[25px] sm:bottom-[50px] right-[25px] sm:right-[50px] p-1 text-white text-[40px] cursor-pointer rounded-[50%] bg-green-700 hover:bg-green-600 dark:bg-green-800 dark:hover:bg-green-900"
        aria-label="Scroll to top"
        onClick={scrollToTop}
      >
        <FiChevronUp />
      </motion.button>
    )
  );
}
