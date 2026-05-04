import React from "react";
import users from "../../assets/user_group.png";
import Container from "../common/Container";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <section className="relative text-center pt-20 pb-16 overflow-hidden">
      <Container>
        {/* Background Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.18, 0.1],
            scale: [1, 1.1, 1],
            x: "-50%",
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-25 left-1/2 -translate-x-1/2 w-225 h-175 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.05) 50%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[32px] sm:text-[48px] md:text-[64px] font-extrabold leading-tight text-black mb-5 tracking-tight"
          >
            Land your dream job with <br />
            <motion.span
              initial={{ color: "#000" }}
              animate={{ color: "#22c55e" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="italic"
            >
              AI-powered
            </motion.span>{" "}
            resumes.
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-[18px] text-[#6b7280] max-w-xl mx-auto mb-10"
          >
            Create, edit and download professional resumes with AI-powered
            assistance.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="bg-[#22c55e] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-green-600 transition"
              onClick={() => navigate("/analyze")}
            >
              Get started →
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition"
            >
              <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">
                ▶
              </span>
              Try demo
            </motion.a>
          </motion.div>
        </div>

        {/* user */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row justify-center items-center mt-12 sm:mt-16 gap-3 sm:gap-5"
        >
          <img
            src={users}
            alt="user group"
            className="w-28 sm:w-32.5 h-auto object-contain"
          />
          <p className="text-[#626262] text-[15px] sm:text-[16px] font-medium">
            Trusted by 10k+ people
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default Banner;
