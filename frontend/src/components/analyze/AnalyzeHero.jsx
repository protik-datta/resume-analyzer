import React from "react";
import Container from "../common/Container";

const AnalyzeHero = () => {
  return (
    <div className="pt-20 pb-10 text-center">
      <Container>
        <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4">
          ✦ AI Analyzer
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4">
          Analyze Your Resume
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
          Get instant, AI-powered feedback on your resume. See how well it
          matches your target role and industry to land your dream job.
        </p>
      </Container>
    </div>
  );
};

export default AnalyzeHero;
