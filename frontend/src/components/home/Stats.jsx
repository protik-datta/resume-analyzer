import React from "react";
import Container from "../common/Container";

const G = "#22c55e";

function StatItem({ num, sup, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
        {num}
        <span style={{ color: G }} className="ml-1">
          {sup}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="py-14 border-t border-b border-gray-100">
      <Container>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <StatItem num="10" sup="K+" label="Resumes Analyzed" />
        <StatItem num="94" sup="%" label="Interview Rate" />
        <StatItem num="4.9" sup="★" label="Average Rating" />
        <StatItem num="30" sup="s" label="Analysis Time" />
      </div>
      </Container>
    </section>
  );
}

export default Stats;
