import React from "react";
import {
  Calendar,
  Users,
  Heart,
  Star,
  ArrowRight,
  ShieldCheck,
  HardDriveUpload,
  FileBadge,
  CloudCheck,
  Brain,
  ArrowBigUpDash,
} from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../assets/style/LandingPage.css";
import { IMAGES } from "../utils/constants";


export const LandingPage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="landing-page-container">
      <header className="landing-page-header">
        <div className="landing-page-header-inner">
          <div className="landing-page-logo">
            <div className="landing-page-logo-icon icon">
              <img src={IMAGES.SiteLogo} alt="" />
            </div>
            <span className="landing-page-logo-text">Medio Driver</span>
          </div>

          <div className="landing-page-header-actions">
            <button
              onClick={toggleTheme}
              className="landing-page-icon-btn icon"
            >
              {theme === "dark" ? (
                <Sun className="landing-page-icon" />
              ) : (
                <Moon className="landing-page-icon" />
              )}
            </button>
            <button
              onClick={() => navigate("/signIn")}
              className="landing-page-btn landing-page-btn-ghost"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signUp")}
              className="landing-page-btn landing-page-btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
      <section className="landing-page-hero">
        <div className="landing-page-hero-inner">
          <div className="landing-page-hero-badge">
            <Heart color="var(--primary)" className="landing-page-icon-small" />
            Trusted by 20,000+ users
          </div>

          <h1 className="landing-page-hero-title">
            Your Media,{" "}
            <span className="landing-page-text-primary">
              Always Within Reach
            </span>{" "}
            for Your Journey
          </h1>
          <p className="landing-page-hero-subtitle">
            Securely store, manage, and access your files, images, and media
            anytime, anywhere — all in one place.
          </p>

          <div className="landing-page-hero-cta">
            <a href="#features">
              <button className="landing-page-btn landing-page-btn-primary">
                <ShieldCheck className="landing-page-icon-small icon" />
                Explore Features
              </button>
            </a>

            <button
              onClick={() => navigate("/signIn")}
              className="landing-page-btn landing-page-btn-outline"
            >
              <HardDriveUpload className="landing-page-icon-small icon" />
              Go to Storage
            </button>
          </div>
        </div>
      </section>

      <section className="landing-page-stats">
        <div className="landing-page-section-header">
          <h2 className="landing-page-section-title">
            Your Storage at a Glance
          </h2>
          <p className="landing-page-section-subtitle">
            Powerful, secure, and built to handle all your digital content.
          </p>
        </div>
        <div className="landing-page-stats-inner">
          <div className="landing-page-stat">
            <div className="landing-page-stat-icon-wrapper">
              <FileBadge className="landing-page-icon-stat icon" />
            </div>
            <div>
              <p className="landing-page-stat-value">1M+</p>
              <p className="landing-page-stat-label">Files Stored</p>
            </div>
          </div>

          <div className="landing-page-stat">
            <div className="landing-page-stat-icon-wrapper">
              <Users className="landing-page-icon-stat icon" />
            </div>
            <div>
              <p className="landing-page-stat-value">50K+</p>
              <p className="landing-page-stat-label">Active Users</p>
            </div>
          </div>

          <div className="landing-page-stat">
            <div className="landing-page-stat-icon-wrapper">
              <Calendar className="landing-page-icon-stat icon" />
            </div>
            <div>
              <p className="landing-page-stat-value">99.9%</p>
              <p className="landing-page-stat-label">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="landing-page-features">
        <div className="landing-page-features-inner">
          <div className="landing-page-section-header">
            <h2 className="landing-page-section-title">
              Why Choose Medio Driver?
            </h2>
            <p className="landing-page-section-subtitle">
              A smarter way to store, manage, and access your digital world.
            </p>
          </div>

          <div className="landing-page-features-grid">
            <div className="landing-page-feature-card">
              <div className="landing-page-feature-icon-wrapper">
                <ShieldCheck className="landing-page-icon-feature icon" />
              </div>
              <h3 className="landing-page-feature-title">Secure Storage</h3>
              <p className="landing-page-feature-desc">
                Your files and media are encrypted and safely stored with
                advanced security.
              </p>
            </div>

            <div className="landing-page-feature-card">
              <div className="landing-page-feature-icon-wrapper">
                <CloudCheck className="landing-page-icon-feature icon" />
              </div>
              <h3 className="landing-page-feature-title">Easy Access</h3>
              <p className="landing-page-feature-desc">
                Access your files anytime, anywhere from any device instantly.
              </p>
            </div>

            <div className="landing-page-feature-card">
              <div className="landing-page-feature-icon-wrapper">
                <Brain className="landing-page-icon-feature icon" />
              </div>
              <h3 className="landing-page-feature-title">Smart Organization</h3>
              <p className="landing-page-feature-desc">
                Organize files, images, and media with folders and powerful
                search.
              </p>
            </div>

            <div className="landing-page-feature-card">
              <div className="landing-page-feature-icon-wrapper">
                <ArrowBigUpDash className="landing-page-icon-feature icon" />
              </div>
              <h3 className="landing-page-feature-title">Fast Uploads</h3>
              <p className="landing-page-feature-desc">
                Upload and share files quickly with high-speed performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-page-testimonials">
        <div className="landing-page-testimonials-inner">
          <div className="landing-page-section-header">
            <h2 className="landing-page-section-title">What Our Users Say</h2>
            <p className="landing-page-section-subtitle">
              Trusted by thousands to securely manage their digital content.
            </p>
          </div>

          <div className="landing-page-testimonials-grid">
            <div className="landing-page-testimonial-card">
              <div className="landing-page-testimonial-rating">
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
              </div>
              <p className="landing-page-testimonial-content">
                "This platform made sharing and storing media incredibly easy."
              </p>
              <p className="landing-page-testimonial-name">Sarah Johnson</p>
              <p className="landing-page-testimonial-role">Patient</p>
            </div>

            <div className="landing-page-testimonial-card">
              <div className="landing-page-testimonial-rating">
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
              </div>
              <p className="landing-page-testimonial-content">
                "Medio Driver keeps all my files organized and accessible
                anytime!"
              </p>
              <p className="landing-page-testimonial-name">Dr. Michael Chen</p>
              <p className="landing-page-testimonial-role">Cardiologist</p>
            </div>

            <div className="landing-page-testimonial-card">
              <div className="landing-page-testimonial-rating">
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
                <Star className="landing-page-icon-star icon" />
              </div>
              <p className="landing-page-testimonial-content">
                "I love how सुरक्षित my data feels and how fast everything
                works."
              </p>
              <p className="landing-page-testimonial-name">Emily Davis</p>
              <p className="landing-page-testimonial-role">Patient</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-page-cta">
        <div className="landing-page-cta-inner">
          <h2 className="landing-page-cta-title">
            Ready to Store Your Digital World?
          </h2>
          <p className="landing-page-cta-subtitle">
            Join thousands of users who trust Medio Driver for secure file
            storage.
          </p>
          <button
            onClick={() => navigate("/signUp")}
            className="landing-page-btn landing-page-btn-secondary landing-page-cta-btn"
          >
            Get Started Free
            <ArrowRight className="landing-page-icon-small icon" />
          </button>
        </div>
      </section>
      <footer className="landing-page-footer">
        © {new Date().getFullYear()} Medio Driver. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
