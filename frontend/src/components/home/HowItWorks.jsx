import Container from "../common/Container";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 12,
    },
  },
};

function StepItem({ num, title, desc }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center text-center gap-3 px-4 relative z-10 min-w-40"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-14 h-14 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-base font-bold text-green-600 shadow-sm"
      >
        {num}
      </motion.div>

      <h4 className="text-sm sm:text-base font-semibold text-black">{title}</h4>

      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 text-center">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4">
            ✦ Process
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4">
            How it works
          </h2>

          <p className="text-sm sm:text-base text-gray-500">
            Three simple steps to analyze, improve, and optimize your resume.
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Line (Desktop only) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            style={{ originX: 0 }}
            className="hidden md:block absolute top-7 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-green-500 via-green-400 to-green-500 z-0"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0"
          >
            <StepItem
              num={1}
              title="Upload Resume"
              desc="Upload your PDF file. We extract and structure your resume instantly."
            />

            <StepItem
              num={2}
              title="AI Analysis"
              desc="Our AI evaluates ATS score, overall rating, job fit, and identifies gaps."
            />

            <StepItem
              num={3}
              title="Get Insights"
              desc="Receive detailed feedback with clear suggestions to improve your resume."
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
