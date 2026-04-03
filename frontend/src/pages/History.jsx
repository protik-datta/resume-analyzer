import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Container from "../components/common/Container";
import HistoryHero from "../components/history/HistoryHero";
import HistoryCard from "../components/history/HistoryCard";
import Loader from "../utils/Loader";
import {
  useGetHistory,
  useDeleteAnalysis,
  useClearHistory,
} from "../api/api";
import { toast } from "../utils/toast";
import { History as HistoryIcon, Search, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const History = () => {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetHistory();
  const { mutate: deleteAnalysis, isPending: isDeleting } = useDeleteAnalysis();
  const { mutate: clearHistory, isPending: isClearing } = useClearHistory();

  const historyItems = Array.isArray(data?.data) ? data.data : [];

  const filteredHistory = historyItems.filter(
    (item) =>
      item.targetRole.toLowerCase().includes(search.toLowerCase()) ||
      item.targetIndustry.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this analysis?")) {
      deleteAnalysis(id, {
        onSuccess: () => {
          toast.success("Analysis deleted");
          queryClient.invalidateQueries(["history"]);
        },
        onError: () => toast.error("Delete failed"),
      });
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "WARNING: This will permanently delete your entire history. Proceed?"
      )
    ) {
      clearHistory(null, {
        onSuccess: () => {
          toast.success("History cleared ✦");
          queryClient.invalidateQueries(["history"]);
        },
        onError: () => toast.error("Clear failed"),
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 flex flex-col"
    >
      {(isClearing || isLoading) && <Loader fullScreen />}
      <Navbar />

      <main className="flex-1 pb-20">
        <HistoryHero
          onClearAll={handleClearAll}
          hasHistory={historyItems.length > 0}
          isPending={isClearing}
        />

        <Container>
          {/* Search & Stats */}
          {historyItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
            >
              <div className="relative w-full max-w-md">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by role or industry..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm transition-all"
                />
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                Total scans: {historyItems.length}
              </div>
            </motion.div>
          )}

          {/* List Content */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-3xl" />
              ))}
            </div>
          ) : isError ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-[40px] border border-red-50 shadow-sm px-6"
            >
              <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">
                Error loading history
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                We encountered an issue while retrieving your data. Please check
                your connection or try again later.
              </p>
            </motion.div>
          ) : historyItems.length === 0 || data?.success === false ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white rounded-[40px] border border-gray-100 shadow-sm px-6"
            >
              <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <HistoryIcon size={36} />
              </div>
              <h3 className="text-2xl font-extrabold text-black mb-3">
                {data?.message || "No analysis history found"}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto mb-8">
                You haven’t performed any resume analyses yet. Start now and
                take your first step toward your dream career!
              </p>
              <a
                href="/analyze"
                className="inline-flex items-center gap-2 bg-[#22c55e] text-white px-8 py-3.5 rounded-2xl text-base font-bold shadow-lg shadow-green-100 hover:bg-green-600 transition-all duration-300"
              >
                Analyze Now ✦
              </a>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredHistory.map((item) => (
                  <HistoryCard
                    key={item._id}
                    analysis={item}
                    onView={(id) => navigate(`/analysis/${id}`)}
                    onDelete={handleDelete}
                    isDeleting={isDeleting}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Search Result Empty State */}
          {historyItems.length > 0 && filteredHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 font-medium italic">
                No matches found for "{search}"
              </p>
            </motion.div>
          )}
        </Container>
      </main>

      <Footer />
    </motion.div>
  );
};

export default History;
