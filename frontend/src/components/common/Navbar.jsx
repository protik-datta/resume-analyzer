import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import userIcon from "../../assets/user_icon.svg";
import { useAuth } from "../../context/AuthContext";
import Button from "./Button";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Container from "./Container";

const Navbar = ({ scrolled }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "Features", "Testimonials"];

  if (user) {
    navItems.push("History");
  }

  const toggleMenu = () => setIsOpen(!isOpen);

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
        {navItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors ${
                  isActive ? "text-black" : "text-[#374151] hover:text-black"
                }`
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Auth Section & Mobile Toggle */}
      <div className="flex items-center gap-4 relative z-[110]">
        <div className="hidden md:block">
          {user ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-2 text-sm font-medium text-[#374151] hover:text-black transition-colors"
            >
              <img src={userIcon} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-cover bg-gray-100" />
              <span>Hi, {user?.name?.split(' ')[0] || user?.username}</span>
            </Link>
          ) : (
            <Link to="/login">
              <Button children={"Login"} classname="text-[15px] font-medium" />
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
        className={`fixed -top-30 right-0 w-full h-screen bg-white z-105 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-8 mt-16">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-xl font-medium transition-colors ${
                  isActive ? "text-black" : "text-[#374151] hover:text-black"
                }`
              }
            >
              {item}
            </NavLink>
          ))}

          {user ? (
            <Link 
              to="/profile" 
              onClick={() => setIsOpen(false)} 
              className="flex items-center gap-3 mt-4 text-lg font-medium text-[#374151] hover:text-black transition-colors"
            >
              <img src={userIcon} alt="Profile" className="w-10 h-10 rounded-full border border-gray-200 object-cover bg-gray-100" />
              <span>Hi, {user?.name?.split(' ')[0] || user?.username}</span>
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="mt-4">
              <Button
                children={"Login"}
                classname="text-[16px] font-medium px-8 py-3"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
