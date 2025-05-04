// components/LoginModal.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/LoginModal.module.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAgreeChange = () => {
    setAgreeToTerms(prev => !prev);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={stopPropagation}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className={styles.modalContent}>
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Welcome Back</h2>
            <p className={styles.formSubtitle}>Sign in to continue your experience</p>
            
            <div className={styles.signupForm}>
              <div className={styles.rulesContainer}>
                <div className={styles.ruleItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>You must be 18+ to use this website</span>
                </div>
                
                <div className={styles.ruleItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>You can't use photos of people without their permission</span>
                </div>
                
                <div className={styles.ruleItem}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>You are responsible for the content you generate</span>
                </div>
              </div>
              
              <div className={styles.agreeTerms}>
                <p>By signing in I agree to the <a href="/terms" className={styles.termsLink}>Terms Of Service</a> & <a href="/privacy" className={styles.termsLink}>Privacy Policy</a></p>
              </div>
              
              <div className={styles.authButtonsContainer}>
                <button className={styles.googleButton}>
                  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                      s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                      s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"/>
                    <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"/>
                    <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"/>
                    <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"/>
                  </svg>
                  <span>Sign in with Google</span>
                  <div className={styles.buttonHighlight}></div>
                </button>
                
                <button className={styles.appleButton}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.498 2.503c1.437 0 2.839 0.965 3.751 2.191-3.29 1.75-2.768 6.316 0.617 7.549-0.498 1.516-0.739 2.241-1.384 3.599-0.876 1.823-2.146 4.103-3.712 4.126-1.383 0.022-1.737-0.905-3.622-0.895-1.884 0.010-2.273 0.916-3.656 0.894-1.566-0.022-2.765-2.076-3.642-3.898-2.482-5.153-2.745-11.182 1.961-14.387 1.745-1.189 3.779-0.659 5.272 0.115 0.893 0.463 1.695 0.707 2.716 0.707 0.999 0 1.809-0.243 2.699-1z" fill="currentColor"/>
                    <path d="M12.75 2c0.128 1.309-0.392 2.617-1.181 3.525-0.832 0.955-2.24 1.687-3.583 1.589-0.148-1.264 0.387-2.576 1.153-3.472s2.235-1.68 3.611-1.643z" fill="currentColor"/>
                  </svg>
                  <span>Sign in with Apple</span>
                  <div className={styles.buttonHighlight}></div>
                </button>
                
                <div className={styles.orDivider}>
                  <span>or</span>
                </div>
                
                <button className={styles.emailButton}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Sign in with Email</span>
                  <div className={styles.buttonHighlight}></div>
                </button>
              </div>
              
              <button onClick={onClose} className={styles.closeModalButton}>
                <span>Continue as guest</span>
              </button>
              
              <div className={styles.loginPrompt}>
                Don't have an account? <a href="/signup" className={styles.signupLink}>Sign Up</a>
              </div>
            </div>
          </div>
          
          <div className={styles.imageSection}>
            <div className={styles.imageBrand}>
              <span>Simon Sayys</span>
            </div>
            
            <div className={styles.imageContainer}>
              <Image 
                src="/model.jpg" 
                alt="Simon Sayys" 
                fill
                className={styles.modelImage}
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.imageText}>
                  <h3>Experience Live Connections</h3>
                  <p>Connect with partners worldwide in real-time video calls</p>
                  
                  <div className={styles.features}>
                    <div className={styles.featureItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>High-quality video streaming</span>
                    </div>
                    
                    <div className={styles.featureItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Secure and private connections</span>
                    </div>
                    
                    <div className={styles.featureItem}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>24/7 global availability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;