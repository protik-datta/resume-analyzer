import React from "react";
import Container from "../common/Container";
import { motion } from "framer-motion";

function TestimonialCard({ text, init, bg, name, role }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="w-[300px] sm:w-[340px] md:w-[360px] shrink-0 bg-white rounded-2xl p-6 border border-black/5 shadow-sm text-left flex flex-col justify-between"
    >
      <div>
        <div className="text-green-500 text-sm mb-3">★★★★★</div>

        <p className="text-sm text-gray-700 leading-relaxed mb-5 italic line-clamp-4">
          {text}
        </p>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
          style={{ background: bg }}
        >
          {init}
        </div>

        <div>
          <div className="text-sm font-semibold text-black">{name}</div>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const cards = [
    {
      text: `"The ATS score and keyword gap analysis helped me understand exactly why my resume was getting rejected. After following the suggestions, I started getting interview calls."`,
      init: "SR",
      bg: "#3b82f6",
      name: "Sabbir Rahman",
      role: "Frontend Developer, Dhaka",
    },
    {
      text: `"The job fit analysis was extremely accurate. It clearly showed where my resume was lacking for UK roles and what I needed to improve."`,
      init: "PK",
      bg: "#ec4899",
      name: "Priya Kumar",
      role: "Data Analyst, London",
    },
    {
      text: `"I liked how it pointed out weaknesses I didn’t notice before. The structured feedback and improvement suggestions made my resume much stronger."`,
      init: "MA",
      bg: "#f59e0b",
      name: "Michael Adebayo",
      role: "Product Manager, Lagos",
    },
    {
      text: `"The overall resume rating gave me a clear benchmark. I could track improvements after each revision and see measurable progress."`,
      init: "TA",
      bg: "#22c55e",
      name: "Tanvir Ahmed",
      role: "Backend Developer, Dhaka",
    },
    {
      text: `"I used the analyzer with multiple job descriptions and it helped me tailor my resume for each role. The keyword suggestions were spot on."`,
      init: "NK",
      bg: "#6366f1",
      name: "Nadia Khan",
      role: "Software Engineer, Karachi",
    },
    {
      text: `"Simple, fast, and very practical. The AI feedback highlighted formatting issues and missing sections that I never paid attention to before."`,
      init: "JR",
      bg: "#ef4444",
      name: "John Roberts",
      role: "IT Consultant, Toronto",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gray-100 text-center overflow-hidden"
    >
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4"
          >
            ✦ Testimonials
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4"
          >
            Loved by job seekers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base text-gray-500"
          >
            Real results from real people who landed their dream jobs.
          </motion.p>
        </motion.div>
      </Container>

      {/* Slider */}
      <div className="w-full overflow-hidden relative">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4">
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex gap-4">
              {cards.map((c, i) => (
                <TestimonialCard key={`${groupIndex}-${i}`} {...c} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
