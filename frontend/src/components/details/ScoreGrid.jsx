import React from "react";
import { motion } from "framer-motion";

const ScoreGrid = ({ overallScore, atsScore }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const ScoreCard = ({ title, score, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex-1"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          {title}
        </h3>
        <span className={`text-4xl font-black ${getTextColor(score)}`}>
          {score}
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: delay + 0.3, duration: 1.2, ease: "easeOut" }}
          className={`h-full ${getScoreColor(score)}`}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-12">
      <ScoreCard title="Overall Score" score={overallScore} delay={0.4} />
      <ScoreCard title="ATS Compatibility" score={atsScore} delay={0.5} />
    </div>
  );
};

export default ScoreGrid;
