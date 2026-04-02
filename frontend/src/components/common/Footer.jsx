import Container from "./Container";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from '../../assets/logo.svg'

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
function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">
        {title}
      </h4>

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function SocialLink({icon: Icon, href }) {
  return (
    <a
      href={href}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
    >
      <Icon size={16} />
    </a>
  );
}

// footer
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <Container>
        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xl font-extrabold text-white mb-4"
            >
              <img src={logo} alt="" className="h-8 w-auto" />
            </a>

            <p className="text-sm text-gray-400 leading-relaxed mb-5 max-w-xs">
              AI-powered resume analysis with actionable insights to improve
              your chances of getting hired faster.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((item, index) => (
                <SocialLink key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Columns */}
          {footerLinks.map((col) => (
            <FooterColumn key={col.title} {...col} />
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Resume. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-5">
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
