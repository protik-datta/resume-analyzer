import Container from '../common/Container';

function StepItem({ num, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 px-4 relative z-10 min-w-40">
      <div className="w-14 h-14 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-base font-bold text-green-600">
        {num}
      </div>

      <h4 className="text-sm sm:text-base font-semibold text-black">{title}</h4>

      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 text-center">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold text-green-600 bg-green-100 px-4 py-1 rounded-full mb-4">
            ✦ Process
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4">
            How it works
          </h2>

          <p className="text-sm sm:text-base text-gray-500">
            Three simple steps to analyze, improve, and optimize your resume.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
          {/* Line (Desktop only) */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-green-500 via-green-400 to-green-500 z-0" />

          <StepItem
            num={1}
            title="Upload Resume"
            desc="Upload your PDF file. We extract and structure your resume instantly."
          />

          <StepItem
            num={2}
            title="AI Analysis"
            desc="Our AI evaluates ATS score, overall rating, job fit, and identifies gaps."
          />

          <StepItem
            num={3}
            title="Get Insights"
            desc="Receive detailed feedback with clear suggestions to improve your resume."
          />
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
