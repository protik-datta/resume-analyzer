import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AnalyzeHero from "../components/analyze/AnalyzeHero";
import UploadZone from "../components/analyze/UploadZone";
import AnalyzeForm from "../components/analyze/AnalyzeForm";
import { useAnalyzeResume } from "../api/api";
import { toast } from "../utils/toast";
import Loader from "../utils/Loader";
import { useNavigate } from "react-router-dom";

const Analysis = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    targetRole: "",
    targetIndustry: "",
    jobDescription: "",
  });

  const { mutate, isPending } = useAnalyzeResume();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload your resume first!");
      return;
    }

    if (!formData.targetRole || !formData.targetIndustry || !formData.jobDescription) {
      toast.error("Please fill in all the required fields!");
      return;
    }

    const data = new FormData();
    data.append("resume", file);
    data.append("targetRole", formData.targetRole);
    data.append("targetIndustry", formData.targetIndustry);
    data.append("jobDescription", formData.jobDescription);

    mutate(data, {
      onSuccess: (res) => {
        toast.success("Analysis complete! Redirecting... 🚀");
        const analysisId = res.data?.data?._id;
        setTimeout(() => {
          if (analysisId) {
            navigate(`/analysis/${analysisId}`);
          } else {
            navigate("/history");
          }
        }, 2000);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Analysis failed, please try again ❌");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isPending && <Loader fullScreen />}
      <Navbar />

      <main className="flex-1 pb-20">
        <AnalyzeHero />

        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-gray-200 border border-gray-100">
            <UploadZone file={file} setFile={setFile} />
            <AnalyzeForm
              formData={formData}
              setFormData={setFormData}
              isPending={isPending}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analysis;
