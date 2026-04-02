import React from "react";

const CircularScore = ({ score, label, color = "green" }) => {
  const colors = {
    green: { bg: "text-green-100", stroke: "text-green-500", text: "text-green-700" },
    indigo: { bg: "text-indigo-100", stroke: "text-indigo-500", text: "text-indigo-700" },
    amber: { bg: "text-amber-100", stroke: "text-amber-500", text: "text-amber-700" },
  };
  const theme = colors[color];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className={theme.bg}
          />
          <circle
            cx="64"
            cy="64"
            r="58"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={364.42}
            strokeDashoffset={364.42 * (1 - score / 100)}
            strokeLinecap="round"
            className={`${theme.stroke} transition-all duration-1000 ease-out`}
          />
        </svg>
        <span className={`absolute text-3xl font-black ${theme.text}`}>
          {score}%
        </span>
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};

const ScoreGrid = ({ overallScore, atsScore }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-wrap items-center justify-around gap-8">
      <CircularScore score={overallScore} label="Overall Match" color="green" />
      <div className="hidden sm:block w-px h-20 bg-gray-100" />
      <CircularScore score={atsScore} label="ATS Compatibility" color="indigo" />
    </div>
  );
};

export default ScoreGrid;
