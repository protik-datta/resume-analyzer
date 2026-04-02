import React from "react";
import { X, CheckCircle2, AlertCircle, Info, Star } from "lucide-react";

const AnalysisModal = ({ analysis, onClose, isLoading }) => {
  if (!analysis && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black mb-1">
              Analysis Results
            </h2>
            <p className="text-sm text-gray-500">
              Personalized feedback for {analysis?.targetRole}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-160px)] custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-100 border-t-green-500 rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-medium text-gray-400 italic">
                Loading AI evaluation...
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Overall Score */}
              <div className="flex flex-col sm:flex-row items-center gap-8 bg-green-50 rounded-3xl p-8 border border-green-100">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-green-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={364.42}
                      strokeDashoffset={364.42 * (1 - analysis?.score / 100)}
                      strokeLinecap="round"
                      className="text-green-500 transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <span className="absolute text-3xl font-black text-green-700">
                    {analysis?.score}%
                  </span>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                    <Star className="text-yellow-500 fill-yellow-500" size={18} />
                    <span className="text-sm font-bold text-green-800 uppercase tracking-wider">
                      Overall Rating
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-black mb-2">
                    {analysis?.score > 80 ? "Excellent Match!" : analysis?.score > 60 ? "Strong Potential" : "Needs Improvement"}
                  </h3>
                  <p className="text-sm text-green-700 leading-relaxed max-w-md">
                    Your resume has high compatibility with the {analysis?.targetRole} role in the {analysis?.targetIndustry} industry.
                  </p>
                </div>
              </div>

              {/* Grid of Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    <h4 className="font-bold text-black">Key Strengths</h4>
                  </div>
                  <ul className="space-y-3">
                    {analysis?.strengths?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                      <AlertCircle size={20} />
                    </div>
                    <h4 className="font-bold text-black">Improvement Areas</h4>
                  </div>
                  <ul className="space-y-3">
                    {analysis?.weaknesses?.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 mb-4">
                <div className="flex items-center gap-3 mb-5 text-indigo-600">
                  <Info size={22} />
                  <h4 className="text-lg font-bold text-black">Strategic Suggestions</h4>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {analysis?.suggestions?.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
                       <p className="text-sm text-gray-700 leading-relaxed">
                         {item}
                       </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 bg-gray-50 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-0">
            Powered by Advanced Resume Analysis AI ✦
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;
