import React from "react";
import uploadArea from "../../assets/upload_area.svg";
import { FileText, X } from "lucide-react";

const UploadZone = ({ file, setFile }) => {
  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => setFile(null);

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all duration-300 ${
          file
            ? "border-green-500 bg-green-50"
            : "border-gray-200 bg-white hover:border-green-400 hover:bg-gray-50"
        }`}
      >
        <input
          type="file"
          id="resumeUpload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={onFileChange}
          accept=".pdf"
        />

        {!file ? (
          <div className="text-center">
            <img
              src={uploadArea}
              alt="upload area"
              className="w-16 h-16 mx-auto mb-4 opacity-70"
            />
            <p className="text-base font-semibold text-black mb-1">
              Click or drag to upload your resume
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-4 w-full bg-white p-4 rounded-2xl shadow-sm border border-green-100">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <FileText size={24} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-black truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeFile();
              }}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;
