import Container from "./Container";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { motion } from "framer-motion";

// data
const footerLinks = [
  {
    title: "Product",
    items: ["Resume Analyzer", "ATS Checker", "Interview Prep", "Pricing"],
  },
  {
    title: "Resources",
    items: ["Blog", "Resume Tips", "Job Guide", "API Docs"],
  },
  {
    title: "Company",
    items: ["About", "Careers", "Contact", "Privacy Policy"],
  },
];

const legalLinks = ["Privacy", "Terms", "Cookies"];

const socialLinks = [
  { icon: FaTwitter, href: "#" },
  { icon: FaLinkedin, href: "#" },
  { icon: FaFacebook, href: "#" },
  { icon: FaGithub, href: "#" },
];

// components
function FooterColumn({ title, items, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">
        {title}
      </h4>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <motion.a
              whileHover={{ x: 5, color: "#fff" }}
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors block"
            >
              {item}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// eslint-disable-next-line no-unused-vars
function SocialLink({ icon: Icon, href, delay }) {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.1, borderColor: "#9ca3af", color: "#fff" }}
      whileTap={{ scale: 0.9 }}
      href={href}
      className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all shadow-sm"
    >
      <Icon size={18} />
    </motion.a>
  );
}

// footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <Container>
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xl font-extrabold text-white mb-6"
            >
              <img src={logo} alt="" className="h-9 w-auto" />
            </a>

            <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-xs font-medium">
              AI-powered resume analysis with actionable insights to improve
              your chances of getting hired faster.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((item, index) => (
                <SocialLink key={index} {...item} delay={0.1 + index * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Columns */}
          {footerLinks.map((col, index) => (
            <FooterColumn key={col.title} {...col} delay={0.2 + index * 0.1} />
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Resume. All rights reserved. Made with{" "}
            <span className="text-red-500">♥</span> for job seekers.
          </p>

          {/* Legal Links */}
          <div className="flex gap-8">
            {legalLinks.map((item) => (
              <motion.a
                key={item}
                whileHover={{ color: "#fff" }}
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
