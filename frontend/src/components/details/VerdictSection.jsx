import React from "react";
import { Award, Briefcase, Globe } from "lucide-react";
import { motion } from "framer-motion";

const VerdictSection = ({ criticalVerdict, experienceLevel, country }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Verdict Card */}
      <motion.div
        variants={itemVariants}
        className="lg:col-span-2 bg-white border border-gray-100 rounded-[40px] p-8 sm:p-12 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Award size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-black tracking-tight">
              Professional Verdict
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
              Executive Summary
            </p>
          </div>
        </div>
        <p className="text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed italic">
          "{criticalVerdict}"
        </p>
      </motion.div>

      {/* Metadata Cards */}
      <div className="space-y-6">
        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex items-center gap-6"
        >
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Level
            </p>
            <p className="text-lg font-black text-black">{experienceLevel}</p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex items-center gap-6"
        >
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Country
            </p>
            <p className="text-lg font-black text-black">{country}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VerdictSection;
