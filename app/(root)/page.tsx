// app/page.jsx
'use client'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useInView, useAnimation } from 'framer-motion'
import styles from '@/app/styles/Home.module.css'

export default function Home() {
  const controls = useAnimation();
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const howItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Handle parallax scroll effect for hero
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Run animations when elements come into view
  useEffect(() => {
    if (featuresInView) {
      controls.start('visible');
    }
  }, [controls, featuresInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SimonSayys | Private Live Video Sessions</title>
        <meta name="description" content="Connect securely with performers for premium one-on-one video sessions" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.mainContent}>
        {/* Hero Section with Parallax Effect */}
        <section className={styles.hero}>
          <div 
            className={styles.heroBg} 
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          ></div>
          <div className={styles.heroOverlay}></div>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              Private Live Video Connections With Real People
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            >
              Connect securely with performers for premium one-on-one video sessions. 
              Experience genuine interactions in a safe, private environment.
            </motion.p>
            <motion.div 
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
            >
              <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>
                <span>Start Now - It&apos;s Free</span>
                <div className={styles.btnGlow}></div>
              </Link>
              <Link href="#how-it-works" className={`${styles.btn} ${styles.btnOutline}`}>
                Learn More
              </Link>
            </motion.div>
            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>🔒</div>
                <span>End-to-End Encrypted</span>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>⭐</div>
                <span>4.9/5 User Rating</span>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>👥</div>
                <span>10,000+ Performers</span>
              </div>
            </div>
          </motion.div>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollDot}></div>
          </div>
        </section>

        {/* Features Section */}
        <motion.section 
          className={styles.features} 
          id="features"
          ref={featuresRef}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className={styles.sectionTitle} variants={fadeInVariants}>
            <h2>Premium Features</h2>
            <div className={styles.titleUnderline}></div>
            <p>Discover why thousands of users trust our platform for their intimate connections</p>
          </motion.div>
          <div className={styles.featuresGrid}>
            <FeatureCard 
              icon="🔒"
              title="Complete Privacy"
              description="End-to-end encrypted video calls ensure your conversations stay completely private. No recordings or monitoring."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="📅"
              title="Easy Scheduling"
              description="Browse profiles, check availability and book sessions with your favorite performers in just a few clicks."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="💰"
              title="Secure Payments"
              description="Transparent pricing with secure payment processing. No hidden fees or complicated subscription models."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="👤"
              title="Verified Profiles"
              description="All performers are verified to ensure authenticity and maintain our high-quality standards."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="🎥"
              title="HD Video Quality"
              description="Crystal clear HD video and audio for an immersive connection experience every time."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="🌐"
              title="Global Community"
              description="Connect with performers from around the world, available 24/7 to fit your schedule."
              variants={itemVariants}
            />
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className={styles.howItWorks} 
          id="how-it-works"
          ref={howItWorksRef}
          initial="hidden"
          animate={howItWorksInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className={styles.sectionTitle} variants={fadeInVariants}>
            <h2>How It Works</h2>
            <div className={styles.titleUnderline}></div>
            <p>Start connecting in minutes with these simple steps</p>
          </motion.div>
          <div className={styles.stepsContainer}>
            <Step number="1" title="Create Account" description="Sign up for free in seconds. Only an email is required to get started." variants={itemVariants} />
            <Step number="2" title="Browse Performers" description="Explore profiles and find performers who match your preferences." variants={itemVariants} />
            <Step number="3" title="Schedule Session" description="Book a time that works for both of you and complete secure payment." variants={itemVariants} />
            <Step number="4" title="Connect Privately" description="Enjoy your private encrypted video session at the scheduled time." variants={itemVariants} />
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section 
          className={styles.testimonials} 
          id="testimonials"
          ref={testimonialsRef}
          initial="hidden"
          animate={testimonialsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className={styles.sectionTitle} variants={fadeInVariants}>
            <h2>What Our Users Say</h2>
            <div className={styles.titleUnderline}></div>
            <p>Hear from real members of our community</p>
          </motion.div>
          <div className={styles.testimonialsGrid}>
            <Testimonial 
              text="The scheduling system makes everything so easy. I can find performers who match my interests and book sessions that fit my busy schedule."
              name="Alex M."
              role="Member since 2024"
              avatarSrc="/images/avatar1.jpg"
              variants={scaleUpVariants}
            />
            <Testimonial 
              text="As a performer, this platform has given me complete control over my schedule and rates. The payment system is reliable and I always get paid on time."
              name="Sophia K."
              role="Verified Performer"
              avatarSrc="/images/avatar2.jpg"
              variants={scaleUpVariants}
            />
            <Testimonial 
              text="The privacy features are what sold me. I feel completely secure knowing my sessions are encrypted and the platform takes security seriously."
              name="James T."
              role="Member since 2023"
              avatarSrc="/images/avatar3.jpg"
              variants={scaleUpVariants}
            />
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className={styles.cta}
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeInVariants}
        >
          <div className={styles.ctaGlow}></div>
          <motion.h2 variants={itemVariants}>Ready to Experience Real Connections?</motion.h2>
          <motion.p variants={itemVariants}>Join thousands of satisfied users already on our platform. Sign up takes less than a minute.</motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/signup" className={`${styles.btn} ${styles.btnLight}`}>
              Create Free Account
              <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1L15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <div className={styles.logoGlow}></div>
            <span className={styles.logoName}>
              <span className={styles.logoPrimary}>Intimate</span>
              <span className={styles.logoSecondary}>Connect</span>
            </span>
          </div>
          <div className={styles.footerTagline}>
            Secure, private connections on your schedule
          </div>
        </div>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3>IntimateConnect</h3>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/press">Press</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>For Users</h3>
            <ul>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/safety">Safety Tips</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/support">Contact Support</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>For Performers</h3>
            <ul>
              <li><Link href="/join-as-performer">Join as Performer</Link></li>
              <li><Link href="/guidelines">Performer Guidelines</Link></li>
              <li><Link href="/earnings">Earnings & Payouts</Link></li>
              <li><Link href="/tips">Success Tips</Link></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Legal</h3>
            <ul>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/cookies">Cookie Policy</Link></li>
              <li><Link href="/content-guidelines">Content Guidelines</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com/intimateconnect" aria-label="Twitter" className={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4.01C21 4.5 20.02 4.69 19 4.82C20.05 4.27 20.82 3.27 21.17 2.1C20.15 2.67 19.02 3.1 17.84 3.31C16.89 2.32 15.55 1.71 14.12 1.71C11.27 1.71 9.09 3.9 9.74 6.74C5.09 6.55 2.73 4.73 1.11 2.1C0.25 3.68 0.65 5.83 2.13 6.96C1.59 6.94 1.08 6.8 0.64 6.57C0.6 8.2 1.78 9.73 3.45 10.13C2.98 10.25 2.47 10.29 1.95 10.16C2.41 11.56 3.73 12.57 5.27 12.61C3.79 13.75 1.95 14.25 0 14.03C1.54 15.03 3.38 15.57 5.35 15.57C14.18 15.57 18.46 8.13 18.18 1.54C19.2 0.9 20.1 0.1 22 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://instagram.com/intimateconnect" aria-label="Instagram" className={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="18" cy="6" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a href="https://facebook.com/intimateconnect" aria-label="Facebook" className={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://tiktok.com/@intimateconnect" aria-label="TikTok" className={styles.socialIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 12C8.34315 12 7 13.3431 7 15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V9C13.3333 10 14.6 12 17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} IntimateConnect. All rights reserved. 18+ Only.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component for Feature Cards
function FeatureCard({ icon, title, description, variants }) {
  return (
    <motion.div className={styles.featureCard} variants={variants}>
      <div className={styles.featureIconWrapper}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className={styles.iconGlow}></div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

// Component for How It Works Steps
function Step({ number, title, description, variants }) {
  return (
    <motion.div className={styles.step} variants={variants}>
      <div className={styles.stepNumberWrapper}>
        <div className={styles.stepNumber}>{number}</div>
        <div className={styles.stepGlow}></div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

// Component for Testimonials
function Testimonial({ text, name, role, avatarSrc, variants }) {
  return (
    <motion.div className={styles.testimonialCard} variants={variants}>
      <div className={styles.quoteIcon}>❝</div>
      <p className={styles.testimonialText}>{text}</p>
      <div className={styles.testimonialAuthor}>
        <div className={styles.testimonialAvatar}>
          <Image
            src={avatarSrc}
            alt={`${name} avatar`}
            width={50}
            height={50}
            className={styles.avatar}
          />
          <div className={styles.avatarGlow}></div>
        </div>
        <div className={styles.testimonialInfo}>
          <h4>{name}</h4>
          <p>{role}</p>
        </div>
      </div>
    </motion.div>
  )
}