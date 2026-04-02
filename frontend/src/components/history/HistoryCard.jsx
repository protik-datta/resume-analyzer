import React from "react";
import { Calendar, Briefcase, ChevronRight, Trash2, Globe } from "lucide-react";

const HistoryCard = ({ analysis, onView, onDelete, isDeleting }) => {
  const date = new Date(analysis.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const scoreColor = (score) => {
    if (score >= 70) return "text-green-600 bg-green-50";
    if (score >= 50) return "text-yellow-600 bg-yellow-50";
    return "text-red-500 bg-red-50";
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
          <Briefcase size={22} />
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full">
          <Calendar size={14} />
          {date}
        </div>
      </div>

      {/* Role & Country */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-black truncate mb-1">
          {analysis.targetRole}
        </h3>
        <div className="flex items-center gap-1.5 text-sm text-gray-400">
          <Globe size={13} />
          <span>{analysis.country}</span>
        </div>
      </div>

      {/* Scores */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`flex-1 text-center py-2 rounded-2xl text-sm font-bold ${scoreColor(analysis.overallScore)}`}
        >
          <div className="text-lg font-extrabold">{analysis.overallScore}</div>
          <div className="text-xs opacity-70">Overall</div>
        </div>
        <div
          className={`flex-1 text-center py-2 rounded-2xl text-sm font-bold ${scoreColor(analysis.atsScore)}`}
        >
          <div className="text-lg font-extrabold">{analysis.atsScore}</div>
          <div className="text-xs opacity-70">ATS</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onView(analysis._id)}
          className="flex-1 flex items-center justify-center gap-2 bg-black text-white text-sm font-bold py-3 rounded-2xl hover:bg-green-600 transition-colors duration-300"
        >
          View Analysis
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => onDelete(analysis._id)}
          disabled={isDeleting}
          className="w-12 h-12 flex items-center justify-center rounded-2xl border border-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 disabled:opacity-50"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
