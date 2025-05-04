// components/Header.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/Header.module.css";
import heart from "@/public/sim.png";
import SignupModal from "@/app/components/SignupModal"; // Import the SignupModal component
import LoginModal from "@/app/components/LoginModal"; // Import the LoginModal component

// Define menu item types
interface MenuItem {
  label: string;
  href: string;
  isButton?: boolean;
}

interface DropdownItem extends MenuItem {
  items?: MenuItem[];
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false); // State for login modal
  const [signupModalOpen, setSignupModalOpen] = useState<boolean>(false); // State for signup modal
  const pathname = usePathname();

  // Navigation items
  const navigationItems: DropdownItem[] = [
    { label: "Features", href: "#features" },
    {
      label: "Models",
      href: "/models",
      items: [
        { label: "Most Popular", href: "/models/popular" },
        { label: "New Faces", href: "/models/new" },
        { label: "Categories", href: "/models/categories" },
      ],
    },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ];

  // Auth buttons
  const authButtons: MenuItem[] = [
    { label: "Login", href: "/login", isButton: true },
    { label: "Sign Up Free", href: "/signup", isButton: true },
  ];

  // Handle scroll effects for header
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu with body scroll lock
  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "";
  };

  // Open signup modal
  const openSignupModal = (e: React.MouseEvent): void => {
    e.preventDefault();
    setSignupModalOpen(true);
  };

  // Close signup modal
  const closeSignupModal = (): void => {
    setSignupModalOpen(false);
  };

  // Open login modal
  const openLoginModal = (e: React.MouseEvent): void => {
    e.preventDefault();
    setLoginModalOpen(true);
  };

  // Close login modal
  const closeLoginModal = (): void => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.headerInner}>
          {/* Logo */}
          <div className={styles.logoArea}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoGlow}></div>
              <span className={styles.logoName}>
                <span className={styles.logoPrimary}>Simon</span>
                <span className={styles.logoSecondary}>Sayys</span>
                <span>
                  <Image src={heart} width={40} height={40} alt="Logo" />
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.mainNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navigationItems.map((item, index) => (
                <li key={index} className={styles.navItem}>
                  {item.items ? (
                    <div className={styles.dropdownContainer}>
                      <button className={styles.dropdownTrigger}>
                        {item.label}
                        <svg
                          className={styles.dropdownIcon}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div className={styles.dropdownMenu}>
                        {item.items.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={styles.dropdownItem}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${
                        pathname === item.href ? styles.active : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className={styles.authControls}>
            <a
              href="#"
              onClick={openLoginModal}
              className={styles.LoginButton}
            >
              <span>Login</span>
              <div className={styles.buttonHighlight}></div>
            </a>
            {/* Modified to open modal instead of navigating */}
            <a
              href="#"
              onClick={openSignupModal}
              className={styles.signupButton}
            >
              <span>Get Started</span>
              <div className={styles.buttonHighlight}></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div
              className={`${styles.hamburger} ${
                mobileMenuOpen ? styles.active : ""
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${styles.mobileNavigation} ${
            mobileMenuOpen ? styles.open : ""
          }`}
        >
          <div className={styles.mobileNavInner}>
            <ul className={styles.mobileNavList}>
              {navigationItems.map((item, index) => (
                <li key={index} className={styles.mobileNavItem}>
                  {item.items ? (
                    <>
                      <div className={styles.mobileNavHeader}>{item.label}</div>
                      <ul className={styles.mobileSubNav}>
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href}
                              className={styles.mobileNavLink}
                              onClick={toggleMobileMenu}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={styles.mobileNavLink}
                      onClick={toggleMobileMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className={styles.mobileAuthButtons}>
              {/* Modified to open modal instead of navigation */}
              <a
                href="#"
                className={styles.mobileLogin}
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu();
                  setLoginModalOpen(true);
                }}
              >
                Log In
              </a>
              {/* Modified to open modal */}
              <a
                href="#"
                className={styles.mobileSignup}
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileMenu();
                  setSignupModalOpen(true);
                }}
              >
                Sign Up Now
              </a>
            </div>

            {/* Become a model CTA */}
            <div className={styles.modelPromoCta}>
              <h3>Become a Model</h3>
              <p>Earn on your own schedule</p>
              <Link
                href="/apply"
                className={styles.modelApplyButton}
                onClick={toggleMobileMenu}
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Signup Modal */}
      <SignupModal isOpen={signupModalOpen} onClose={closeSignupModal} />
      
      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Header;