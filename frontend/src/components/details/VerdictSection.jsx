import React from "react";
import { Quote, UserCheck, Globe } from "lucide-react";

const VerdictSection = ({ criticalVerdict, experienceLevel, country }) => {
  return (
    <div className="bg-indigo-900 text-white rounded-[40px] p-8 sm:p-12 shadow-xl relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-700 rounded-full translate-y-1/2 -translate-x-1/4 opacity-20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4 text-indigo-200">
            <Quote size={24} className="opacity-60" fill="currentColor" />
            <h3 className="text-xs font-bold uppercase tracking-widest">The Verdict</h3>
          </div>
          <p className="text-xl sm:text-2xl font-semibold leading-relaxed italic">
            "{criticalVerdict}"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-4 min-w-[200px]">
          <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <UserCheck size={20} className="text-indigo-200" />
            <div>
              <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Level</p>
              <p className="text-sm font-bold capitalize">{experienceLevel}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <Globe size={20} className="text-indigo-200" />
            <div>
              <p className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Country</p>
              <p className="text-sm font-bold capitalize">{country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerdictSection;
