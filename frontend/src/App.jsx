import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
import Analysis from './pages/Analysis';
import AnalysisDetails from './pages/AnalysisDetails';
import History from './pages/History';
import Toaster from './utils/Toaster';
import ProtectedRoute from './routes/ProtectedRoute';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/analyze" element={<Analysis />} />
          <Route path="/analysis/:id" element={<AnalysisDetails />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
