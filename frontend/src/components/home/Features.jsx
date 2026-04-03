import React from "react";
import Container from "../common/Container";
import {
  ShieldCheck,
  BarChart3,
  Briefcase,
  Search,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// feature card
function FeatureCard({ icon, title, desc }) {
  const Icon = icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(34, 197, 94, 0.2)",
      }}
      className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm transition-colors duration-300"
    >
      <motion.div
        whileHover={{ rotate: 10, scale: 1.1 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#22c55e] text-white"
      >
        <Icon size={20} />
      </motion.div>

      <h3 className="text-base sm:text-lg font-semibold text-black mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

// feature section

function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "ATS Compatibility Score",
      desc: "Instantly check how well your resume performs against ATS filters and keyword matching systems used by recruiters.",
    },
    {
      icon: BarChart3,
      title: "Overall Resume Rating",
      desc: "Get a comprehensive AI-driven score that reflects the overall quality, structure, and effectiveness of your resume.",
    },
    {
      icon: Briefcase,
      title: "Job Fit Analysis",
      desc: "Understand how well your resume aligns with a specific job role and whether you're a strong match for the position.",
    },
    {
      icon: Search,
      title: "Skill & Keyword Gap Detection",
      desc: "Identify missing skills and keywords compared to job descriptions to improve your chances of getting shortlisted.",
    },
    {
      icon: AlertTriangle,
      title: "Weakness Identification",
      desc: "Detect structural issues, missing sections, and content problems that may reduce your resume’s impact.",
    },
    {
      icon: Lightbulb,
      title: "Improvement Suggestions",
      desc: "Receive clear, actionable recommendations to enhance formatting, wording, and content for better results.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-100">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4">
            ✦ Features
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4">
            Powerful AI Insights for Your Resume
          </h2>

          <p className="text-sm sm:text-base text-gray-500">
            Analyze your resume with ATS scoring, job fit evaluation, and
            intelligent feedback to understand exactly what to improve and
            increase your chances of getting hired.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Features;
