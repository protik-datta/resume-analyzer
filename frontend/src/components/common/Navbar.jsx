import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo.svg";
import userIcon from "../../assets/user_icon.svg";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import Container from "./Container";
import { useUserLogout } from "../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "../../utils/toast";

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
    navItems.push("Analyze")
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
      }
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
          <img src={logo} alt="logo" className="h-[28px] sm:h-8" />
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
                    `text-[14px] font-medium transition-colors ${
                      isActive && !isScrollItem
                        ? "text-black"
                        : "text-[#374151] hover:text-black"
                    }`
                  }
                >
                  {item}
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
                <button
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
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-black/5 py-2 z-[120] animate-in fade-in zoom-in duration-200">
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
                  </div>
                )}
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
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 right-0 w-full h-screen bg-white z-[105] flex flex-col pt-20 px-6 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          {navItems.map((item, index) => {
            const isScrollItem = item === "Features" || item === "Testimonials";
            const target =
              item === "Home"
                ? "/"
                : isScrollItem
                ? `/#${item.toLowerCase()}`
                : `/${item.toLowerCase()}`;
            return (
              <NavLink
                key={index}
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
            );
          })}

          <div className="pt-6 border-t border-gray-100 mt-2">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
