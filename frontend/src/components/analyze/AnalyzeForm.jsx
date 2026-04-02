import React from "react";
import { Briefcase, Building, FileText } from "lucide-react";

const AnalyzeForm = ({ formData, setFormData, isPending, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Role */}
        <div className="relative">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Target Role
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Briefcase size={18} />
            </span>
            <input
              type="text"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Target Industry */}
        <div className="relative">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Target Industry
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Building size={18} />
            </span>
            <input
              type="text"
              name="targetIndustry"
              value={formData.targetIndustry}
              onChange={handleChange}
              placeholder="e.g. Technology"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="relative">
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Job Description
        </label>
        <div className="relative">
          <span className="absolute left-3 top-4 text-gray-400">
            <FileText size={18} />
          </span>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            placeholder="Paste the job description here..."
            required
            rows={6}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all shadow-sm resize-none"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="w-full bg-[#22c55e] text-white py-4 rounded-2xl text-base font-bold shadow-lg shadow-green-200 hover:bg-green-600 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none mt-10"
      >
        {isPending ? "Analyzing Your Resume..." : "Analyze Now ✦"}
      </button>
    </div>
  );
};

export default AnalyzeForm;
