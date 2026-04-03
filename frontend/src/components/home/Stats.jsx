import React from "react";
import Container from "../common/Container";
import { motion } from "framer-motion";

const G = "#22c55e";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function StatItem({ num, sup, label }) {
  return (
    <motion.div variants={itemVariants} className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
        {num}
        <span style={{ color: G }} className="ml-1">
          {sup}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
    </motion.div>
  );
}

function Stats() {
  return (
    <section className="py-14 border-t border-b border-gray-100">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <StatItem num="10" sup="K+" label="Resumes Analyzed" />
          <StatItem num="94" sup="%" label="Interview Rate" />
          <StatItem num="4.9" sup="★" label="Average Rating" />
          <StatItem num="30" sup="s" label="Analysis Time" />
        </motion.div>
      </Container>
    </section>
  );
}

export default Stats;
