import React from "react";
import { Award, Code, GraduationCap } from "lucide-react";

const Section = (props) => {
  const { icon: Icon, title, score, feedback, color = "green" } = props;
  const colors = {
    green: "bg-green-50 text-green-600 border-green-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5">
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
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color === "green" ? "bg-green-500" : color === "indigo" ? "bg-indigo-500" : "bg-amber-500"}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

const SectionBreakdown = ({ sections }) => {
  if (!sections) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Section
        icon={Award}
        title="Experience"
        score={sections.experience.score}
        feedback={sections.experience.feedback}
        color="green"
      />
      <Section
        icon={Code}
        title="Skills"
        score={sections.skills.score}
        feedback={sections.skills.feedback}
        color="indigo"
      />
      <Section
        icon={GraduationCap}
        title="Education"
        score={sections.education.score}
        feedback={sections.education.feedback}
        color="amber"
      />
    </div>
  );
};

export default SectionBreakdown;
