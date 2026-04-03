import React from "react";
import Container from "../common/Container";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const HistoryHero = ({ onClearAll, hasHistory, isPending }) => {
  return (
    <div className="pt-20 pb-10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4">
              ✦ Activity
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4">
              Analysis History
            </h1>
            <p className="text-sm sm:text-base text-gray-500">
              Track your resume's progress over time. View past analyses, see
              how your scores have improved, and keep your career journey
              organized.
            </p>
          </motion.div>

          {hasHistory && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearAll}
              disabled={isPending}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 hover:bg-red-100 transition-all disabled:opacity-50"
            >
              <Trash2 size={18} />
              {isPending ? "Clearing..." : "Clear History"}
            </motion.button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HistoryHero;
