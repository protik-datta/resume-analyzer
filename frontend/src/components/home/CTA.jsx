import React from "react";
import Container from "../common/Container";
import { useAuth } from "../../context/AuthContext";
import { toast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center px-[5%] py-20 overflow-hidden"
      >
        {/* Background Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(34,197,94,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Tag */}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4"
          >
            ✦ Get Started
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight"
          >
            Ready to land your{" "}
            <span className="italic text-green-500">dream job?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm sm:text-base text-gray-500 mb-10"
          >
            Analyze your resume with AI, improve your ATS score, and get
            job-ready insights in seconds.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyzeClick}
              className="bg-green-500 text-white px-7 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-green-600 transition"
            >
              Analyze my resume →
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="border border-gray-300 text-gray-700 px-7 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition"
            >
              See a demo
            </motion.a>
          </motion.div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-gray-500 mt-5"
          >
            No credit card required · Free plan available · Results in seconds
          </motion.p>
        </div>
      </motion.section>
    </Container>
  );
};

export default CTA;
