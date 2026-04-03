import React from "react";
import { Award, Code, GraduationCap, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

const Section = ({ icon: Icon, title, score, feedback, color = "green", delay }) => {
  const colors = {
    green: "bg-green-50 text-green-600 border-green-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  const progressColors = {
    green: "bg-green-500",
    indigo: "bg-indigo-500",
    amber: "bg-amber-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-2xl ${colors[color]} border flex items-center justify-center`}>
          {Icon && <Icon size={22} />}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-black">{score}%</span>
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Scored</span>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-extrabold text-black mb-2 capitalize">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed italic">
          "{feedback}"
        </p>
      </div>

      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full rounded-full ${progressColors[color]}`}
        />
      </div>
    </motion.div>
  );
};

const SectionBreakdown = ({ sections }) => {
  if (!sections) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Section
        icon={Award}
        title="Experience"
        score={sections.experience?.score || 0}
        feedback={sections.experience?.feedback || "No feedback available"}
        color="green"
        delay={0.1}
      />
      <Section
        icon={Code}
        title="Skills"
        score={sections.skills?.score || 0}
        feedback={sections.skills?.feedback || "No feedback available"}
        color="indigo"
        delay={0.2}
      />
      <Section
        icon={GraduationCap}
        title="Education"
        score={sections.education?.score || 0}
        feedback={sections.education?.feedback || "No feedback available"}
        color="amber"
        delay={0.3}
      />
    </div>
  );
};

export default SectionBreakdown;
