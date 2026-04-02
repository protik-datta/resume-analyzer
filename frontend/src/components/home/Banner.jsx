import React from "react";
import users from "../../assets/user_group.png";
import Container from "../common/Container";

const Banner = () => {
  return (
    <section className="relative text-center pt-20 pb-16 overflow-hidden">
      <Container>
      {/* Background Glow */}
      <div
        className="absolute -top-25 left-1/2 -translate-x-1/2 w-225 h-175 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.05) 50%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Heading */}
        <h1 className="text-[32px] sm:text-[48px] md:text-[64px] font-extrabold leading-tight text-black mb-5 tracking-tight">
          Land your dream job with <br />
          <span className="italic text-[#22c55e]">AI-powered</span> resumes.
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-[18px] text-[#6b7280] max-w-xl mx-auto mb-10">
          Create, edit and download professional resumes with AI-powered
          assistance.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#"
            className="bg-[#22c55e] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-green-600 transition"
          >
            Get started →
          </a>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 transition"
          >
            <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">
              ▶
            </span>
            Try demo
          </a>
        </div>
      </div>

      {/* user */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-12 sm:mt-16 gap-3 sm:gap-5">
        <img
          src={users}
          alt="user group"
          className="w-28 sm:w-32.5 h-auto object-contain"
        />
        <p className="text-[#626262] text-[15px] sm:text-[16px] font-medium">
          Trusted by 10k+ people
        </p>
      </div>
      </Container>
    </section>
  );
};

export default Banner;
