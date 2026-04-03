import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogin } from "../api/api";
import { KeyRound, Mail } from "lucide-react";
import Loader from "../utils/Loader";
import { toast } from "../utils/toast";
import { motion } from "framer-motion";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useUserLogin();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(form, {
      onSuccess: () => {
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Invalid credentials ❌");
      },
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
    >
      {/* Fullscreen Loader */}
      {isPending && <Loader fullScreen />}

      {/* Card */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-black/5 p-8"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-black"
          >
            Welcome back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-gray-500 mt-2"
          >
            Login to analyze your resume
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <motion.div variants={itemVariants} className="relative">
            <label className="text-sm font-medium text-gray-700">Email</label>

            <Mail className="absolute left-3 top-[38px] w-4 h-4 text-gray-400" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants} className="relative">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <KeyRound className="absolute left-3 top-[38px] w-4 h-4 text-gray-400" />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </motion.div>

          {/* Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            className="w-full bg-green-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition disabled:opacity-60"
          >
            {isPending ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs text-gray-500 text-center mt-5"
        >
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
