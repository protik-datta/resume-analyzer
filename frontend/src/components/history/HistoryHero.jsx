import React from "react";
import Container from "../common/Container";
import { Trash2, History } from "lucide-react";

const HistoryHero = ({ onClearAll, hasHistory, isPending }) => {
  return (
    <div className="pt-20 pb-10">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4">
              ✦ Your Activity
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">
              Analysis History
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-xl">
              Track your journey and review previous resume insights. Keep your
              profile clean by managing or clearing your history.
            </p>
          </div>

          {hasHistory && (
            <button
              onClick={onClearAll}
              disabled={isPending}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-100 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              <Trash2 size={16} className="group-hover:scale-110 transition-transform" />
              Clear All History
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default HistoryHero;
