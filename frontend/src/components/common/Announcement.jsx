import React from "react";
import Container from "./Container";

const Announcement = () => {
  return (
    <div className="hidden md:block bg-linear-to-r from-[#22c55e] to-gray-50 text-white">
      <Container className="flex items-center justify-center gap-2 md:gap-4 flex-wrap text-center text-xs md:text-sm font-semibold py-3 md:py-4">
        <span className="bg-white text-[#16a34a] text-[11px] md:text-xs font-bold px-3 md:px-5 py-1 md:py-2 rounded-full uppercase">
        New
      </span>
      <span className="text-center leading-snug">
        AI Feature Added — ATS Score + Country Detection now live
      </span>
      </Container>
    </div>
  );
};

export default Announcement;
