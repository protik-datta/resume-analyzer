import React from "react";
import { FileText, MapPin, Building, Eye, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const HistoryCard = ({ analysis, onView, onDelete, isDeleting }) => {
  const { _id, targetRole, targetIndustry, overallScore, createdAt } = analysis;

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500 bg-green-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-500 bg-red-50";
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      variants={itemVariants}
      layout
      whileHover={{ y: -5 }}
      className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
          <FileText size={24} />
        </div>
        <div
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl font-bold ${getScoreColor(
            overallScore
          )}`}
        >
          <span className="text-lg leading-none">{overallScore}</span>
          <span className="text-[10px] uppercase font-bold mt-1">Score</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-extrabold text-black mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {targetRole}
        </h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
            <Building size={12} />
            {targetIndustry}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            {date}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onView(_id)}
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all"
        >
          <Eye size={14} />
          View Result
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fee2e2", color: "#ef4444" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(_id)}
          disabled={isDeleting}
          className="p-2.5 text-gray-400 bg-gray-50 rounded-xl hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
          title="Delete Analysis"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HistoryCard;
