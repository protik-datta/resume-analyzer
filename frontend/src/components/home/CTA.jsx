import React from "react";
import Container from "../common/Container";
import { useAuth } from "../../context/AuthContext";
import { toast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAnalyzeClick = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login first!");
      navigate("/");
    } else {
      navigate("/analyze");
    }
  };

  return (
    <Container>
      <section
        id="contact"
        className="relative text-center px-[5%] py-20 overflow-hidden"
      >
        {/* Background Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(34,197,94,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Tag */}
          <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4">
            ✦ Get Started
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Ready to land your{" "}
            <span className="italic text-green-500">dream job?</span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-500 mb-10">
            Analyze your resume with AI, improve your ATS score, and get
            job-ready insights in seconds.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleAnalyzeClick}
              className="bg-green-500 text-white px-7 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-green-600 transition"
            >
              Analyze my resume →
            </button>

            <a
              href="#"
              className="border border-gray-300 text-gray-700 px-7 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition"
            >
              See a demo
            </a>
          </div>

          {/* Footer note */}
          <p className="text-xs text-gray-500 mt-5">
            No credit card required · Free plan available · Results in seconds
          </p>
        </div>
      </section>
    </Container>
  );
};

export default CTA;
