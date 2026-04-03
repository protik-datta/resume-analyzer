import React from "react";
import { AlertTriangle, Key, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const AtsIssues = ({ ats_issues, top_missing_keywords }) => {
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ATS Issues */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-red-50 border border-red-100 rounded-[32px] p-8"
      >
        <div className="flex items-center gap-3 mb-6 text-red-600">
          <AlertTriangle size={24} />
          <h4 className="text-lg font-bold text-black">Critical ATS Issues</h4>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {ats_issues?.map((issue, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex gap-3 bg-white p-4 rounded-2xl border border-red-50 shadow-sm transition-transform hover:scale-[1.01]"
            >
              <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {issue}
              </p>
            </motion.div>
          ))}
          {(!ats_issues || ats_issues.length === 0) && (
            <p className="text-sm text-gray-500 italic">
              No critical ATS issues detected.
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Missing Keywords */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-indigo-50 border border-indigo-100 rounded-[32px] p-8"
      >
        <div className="flex items-center gap-3 mb-6 text-indigo-600">
          <Key size={24} />
          <h4 className="text-lg font-bold text-black">Top Missing Keywords</h4>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {top_missing_keywords?.map((keyword, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "#4f46e5", color: "#fff" }}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-indigo-100 shadow-sm text-sm font-semibold text-indigo-700 transition-all cursor-default"
            >
              <span>{keyword}</span>
              <ChevronRight size={14} className="opacity-40" />
            </motion.div>
          ))}
          {(!top_missing_keywords || top_missing_keywords.length === 0) && (
            <p className="text-sm text-gray-500 italic">
              No missing critical keywords found.
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AtsIssues;
