import React from "react";
import PDFReport from "../components/details/PDFReport";
import { PDFDownloadLink } from "@react-pdf/renderer";
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
import {
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronLeft,
  RefreshCcw,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

// ActionPoints Component (Strengths, Weaknesses, Suggestions)
const ActionPoints = ({ strengths, weaknesses, suggestions }) => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strengths */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="text-xl font-bold text-black tracking-tight">
              Key Strengths
            </h4>
          </div>
          <ul className="space-y-4">
            {strengths?.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed font-medium"
              >
                <span className="mt-2 w-2 h-2 rounded-full bg-green-500 flex-shrink-0 shadow-sm shadow-green-200" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <h4 className="text-xl font-bold text-black tracking-tight">
              Focus Areas
            </h4>
          </div>
          <ul className="space-y-4">
            {weaknesses?.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed font-medium"
              >
                <span className="mt-2 w-2 h-2 rounded-full bg-red-400 flex-shrink-0 shadow-sm shadow-red-200" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Suggestions */}
      <motion.div
        variants={itemVariants}
        className="bg-indigo-50 border border-indigo-100 rounded-[40px] p-8 sm:p-12 shadow-sm"
      >
        <div className="flex items-center gap-4 mb-8 text-indigo-600">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-indigo-100 shadow-sm">
            <Info size={24} />
          </div>
          <h4 className="text-2xl font-extrabold text-black tracking-tight">
            Strategic Recommendations
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions?.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 border border-indigo-50 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
                "{item}"
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnalysisDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAnalysisDetails(id);

  const analysis = data?.analysis;

  if (isLoading) return <Loader fullScreen />;

  if (isError || !analysis) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Container className="flex-1 flex flex-col items-center justify-center py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm"
          >
            <AlertCircle size={40} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-black mb-4"
          >
            Oops! Data not found
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 max-w-md mx-auto mb-10"
          >
            We couldn’t retrieve the analysis details for this record. It might
            have been deleted or doesn’t exist.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/history")}
            className="flex items-center gap-2 px-8 py-3.5 bg-black text-white rounded-2xl font-bold shadow-lg hover:bg-gray-800 transition-all"
          >
            <ChevronLeft size={20} />
            Back to History
          </motion.button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden"
    >
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 pt-8 pb-12 shadow-sm">
          <Container>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/history")}
              className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8 text-sm font-semibold tracking-wide uppercase group"
            >
              <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-50 transition-all">
                <ChevronLeft size={20} />
              </div>
              Back to History
            </motion.button>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="px-4 py-1.5 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100 shadow-sm uppercase tracking-widest"
                  >
                    ✦ Analysis Complete
                  </motion.span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-black text-black mb-3 tracking-tight">
                  {analysis.targetRole}
                </h1>
                <p className="text-lg text-gray-500 font-medium italic">
                  {analysis.targetIndustry} Excellence Report
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/analyze")}
                  className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-100 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                >
                  <RefreshCcw size={18} />
                  Analyze Again
                </motion.button>

                <PDFDownloadLink
                  document={<PDFReport analysis={analysis} />}
                  fileName={`Resume-Analysis-${analysis.targetRole.replace(
                    /\s+/g,
                    "-"
                  )}.pdf`}
                >
                  {({ loading }) => (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loading}
                      className="hidden sm:flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:bg-gray-800 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <RefreshCcw size={18} className="animate-spin" />
                      ) : (
                        <Download size={18} />
                      )}
                      {loading ? "Generating..." : "Export PDF"}
                    </motion.button>
                  )}
                </PDFDownloadLink>
              </motion.div>
            </div>

            <ScoreGrid
              overallScore={analysis.overallScore}
              atsScore={analysis.atsScore}
            />
          </Container>
        </div>

        {/* Dynamic Sections */}
        <div className="py-16 space-y-20">
          <Container className="space-y-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <VerdictSection
                criticalVerdict={analysis.criticalVerdict}
                experienceLevel={analysis.experienceLevel}
                country={analysis.country}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-black text-black tracking-tight italic">
                  Structural Evaluation
                </h2>
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                  Deep Dive Analytics
                </div>
              </div>
              <SectionBreakdown sections={analysis.sections} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-black text-black tracking-tight italic">
                  ATS & Optimization
                </h2>
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                  Keyword matching
                </div>
              </div>
              <AtsIssues
                ats_issues={analysis.ats_issues}
                top_missing_keywords={analysis.top_missing_keywords}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-black text-black tracking-tight italic">
                  Actionable Insights
                </h2>
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                  Strategic Path
                </div>
              </div>
              <ActionPoints
                strengths={analysis.strengths}
                weaknesses={analysis.weaknesses}
                suggestions={analysis.suggestions}
              />
            </motion.div>
          </Container>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default AnalysisDetails;
