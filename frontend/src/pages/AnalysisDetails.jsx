import React, { useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Container from "../components/common/Container";
import Loader from "../utils/Loader";
import { useGetAnalysisDetails } from "../api/api";
import ScoreGrid from "../components/details/ScoreGrid";
import VerdictSection from "../components/details/VerdictSection";
import SectionBreakdown from "../components/details/SectionBreakdown";
import AtsIssues from "../components/details/AtsIssues";
import { CheckCircle2, AlertCircle, Info, ChevronLeft, RefreshCcw, Download } from "lucide-react";

// ActionPoints Component (Strengths, Weaknesses, Suggestions)
const ActionPoints = ({ strengths, weaknesses, suggestions }) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-xl font-bold text-black tracking-tight">Key Strengths</h4>
          </div>
          <ul className="space-y-4">
            {strengths?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed font-medium">
                <span className="mt-2 w-2 h-2 rounded-full bg-green-500 flex-shrink-0 shadow-sm shadow-green-200" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <h4 className="text-xl font-bold text-black tracking-tight">Focus Areas</h4>
          </div>
          <ul className="space-y-4">
            {weaknesses?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed font-medium">
                <span className="mt-2 w-2 h-2 rounded-full bg-red-400 flex-shrink-0 shadow-sm shadow-red-200" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-[40px] p-8 sm:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-8 text-indigo-600">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm">
            <Info size={24} />
          </div>
          <h4 className="text-2xl font-extrabold text-black tracking-tight tracking-tight">Strategic Recommendations</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions?.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-indigo-50 shadow-sm hover:shadow-md transition-shadow">
               <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
                 "{item}"
               </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnalysisDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAnalysisDetails(id);

  const analysis = data?.analysis;

  console.log(analysis)

  if (isLoading) return <Loader fullScreen />;

  if (isError || !analysis) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Container className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-black mb-4">Oops! Data not found</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-10">
            We couldn’t retrieve the analysis details for this record. It might have been deleted or doesn’t exist.
          </p>
          <button
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition-all"
          >
            <ChevronLeft size={20} />
            Back to History
          </button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 pt-8 pb-12 shadow-sm">
          <Container>
            <button
              onClick={() => navigate("/history")}
              className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8 text-sm font-semibold tracking-wide uppercase group"
            >
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-all">
                <ChevronLeft size={20} />
              </div>
              Back to History
            </button>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                   <span className="px-4 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 shadow-sm uppercase tracking-widest">
                     ✦ Analysis Complete
                   </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-black mb-3 tracking-tight">
                  {analysis.targetRole}
                </h1>
                <p className="text-lg text-gray-500 font-medium italic">
                  {analysis.targetIndustry} Excellence Report
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                   onClick={() => navigate("/analyze")}
                   className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                >
                  <RefreshCcw size={18} />
                  Analyze Again
                </button>
                <button
                   className="hidden sm:flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all"
                >
                  <Download size={18} />
                  Export PDF
                </button>
              </div>
            </div>

            <ScoreGrid overallScore={analysis.overallScore} atsScore={analysis.atsScore} />
          </Container>
        </div>

        {/* Dynamic Sections */}
        <div className="py-16 space-y-20">
          <Container className="space-y-20">
            <VerdictSection
              criticalVerdict={analysis.criticalVerdict}
              experienceLevel={analysis.experienceLevel}
              country={analysis.country}
            />

            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                 <h2 className="text-2xl font-black text-black tracking-tight italic">Structural Evaluation</h2>
                 <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">Deep Dive Analytics</div>
              </div>
              <SectionBreakdown sections={analysis.sections} />
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-black text-black tracking-tight italic">ATS & Optimization</h2>
                  <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">Keyword matching</div>
               </div>
               <AtsIssues
                 ats_issues={analysis.ats_issues}
                 top_missing_keywords={analysis.top_missing_keywords}
               />
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-black text-black tracking-tight italic">Actionable Insights</h2>
                  <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">Strategic Path</div>
               </div>
               <ActionPoints
                 strengths={analysis.strengths}
                 weaknesses={analysis.weaknesses}
                 suggestions={analysis.suggestions}
               />
            </div>
          </Container>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnalysisDetails;
