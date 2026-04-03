import React from "react";
import Container from "../common/Container";
import { motion } from "framer-motion";

const AnalyzeHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="pt-20 pb-10 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container>
        <motion.span
          variants={itemVariants}
          className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4"
        >
          ✦ AI Analyzer
        </motion.span>
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4"
        >
          Analyze Your Resume
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto"
        >
          Get instant, AI-powered feedback on your resume. See how well it
          matches your target role and industry to land your dream job.
        </motion.p>
      </Container>
    </motion.div>
  );
};

export default AnalyzeHero;
