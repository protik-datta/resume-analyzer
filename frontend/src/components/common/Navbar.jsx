import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo.svg";
import userIcon from "../../assets/user_icon.svg";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import Container from "./Container";
import { useUserLogout } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "../../utils/toast";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ scrolled }) => {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();
  const { mutate: logout } = useUserLogout();

  const navItems = ["Home", "Features", "Testimonials"];

  if (user) {
    navItems.push("History");
    navItems.push("Analyze");
  }

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        setUser(null);
        queryClient.invalidateQueries(["me"]);
        toast.success("Logged out successfully");
        setShowDropdown(false);
        setIsOpen(false);
      },
      onError: () => {
        toast.error("Logout failed");
      },
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-[100] w-full bg-white/90 backdrop-blur-lg border-b border-black/10 transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : "shadow-none"
      }`}
    >
      <Container className="flex items-center justify-between h-16 w-full">
        {/* Logo */}
        <Link
          to="/"
          className="relative z-[110] flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src={logo}
            alt="logo"
            className="h-[28px] sm:h-8"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => {
            const isScrollItem = item === "Features" || item === "Testimonials";
            const target =
              item === "Home"
                ? "/"
                : isScrollItem
                ? `/#${item.toLowerCase()}`
                : `/${item.toLowerCase()}`;
            return (
              <li key={index}>
                <NavLink
                  to={target}
                  onClick={(e) => {
                    if (isScrollItem && location.pathname === "/") {
                      e.preventDefault();
                      document
                        .getElementById(item.toLowerCase())
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={({ isActive }) =>
                    `text-[14px] font-medium transition-colors relative group ${
                      isActive && !isScrollItem
                        ? "text-black"
                        : "text-[#374151] hover:text-black"
                    }`
                  }
                >
                  {item}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"
                    initial={false}
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Auth Section & Mobile Toggle */}
        <div className="flex items-center gap-4 relative z-[110]">
          <div className="hidden md:block">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-sm font-medium text-[#374151] hover:text-black transition-colors focus:outline-none"
                >
                  <img
                    src={userIcon}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover bg-gray-100"
                  />
                  <span>Hi, {user?.name?.split(" ")[0] || user?.username}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-black/5 py-2 z-[120]"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 mb-1">
                        <p className="text-sm font-semibold text-black truncate">
                          {user?.name || user?.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user?.email}
                        </p>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login">
                <Button classname="text-[15px] font-medium">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#374151] p-1 cursor-pointer focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full h-screen bg-white z-[105] flex flex-col pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => {
                const isScrollItem =
                  item === "Features" || item === "Testimonials";
                const target =
                  item === "Home"
                    ? "/"
                    : isScrollItem
                    ? `/#${item.toLowerCase()}`
                    : `/${item.toLowerCase()}`;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink
                      to={target}
                      onClick={(e) => {
                        if (isScrollItem && location.pathname === "/") {
                          e.preventDefault();
                          document
                            .getElementById(item.toLowerCase())
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                        setIsOpen(false);
                      }}
                      className={({ isActive }) =>
                        `text-lg font-medium transition-colors ${
                          isActive && !isScrollItem
                            ? "text-black"
                            : "text-[#374151] hover:text-black"
                        }`
                      }
                    >
                      {item}
                    </NavLink>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-6 border-t border-gray-100 mt-2"
              >
                {user ? (
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={userIcon}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border border-gray-200 object-cover bg-gray-100"
                      />
                      <div>
                        <p className="text-base font-bold text-black">
                          {user?.name || user?.username}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-lg font-semibold text-red-600 w-full"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button classname="text-[16px] font-medium w-full py-3">
                      Login
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
