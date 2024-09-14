import React from "react";
import "./home.css";
export default function home() {
  return (
    <>
      <div className="App">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Farm Easy</h1>
            <p>Your Go-To Solution for Plant Disease Prediction</p>
            <a href="#get-started" className="cta-button">
              Get Started
            </a>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="what-we-do">
          <div className="half">
            <h2>What We Do</h2>
          </div>
          <div className="divider"></div>
          <div className="half">
            <p>
              Farm Easy uses advanced AI-ML technology to help farmers diagnose and
              manage plant diseases efficiently. By analyzing images of your
              plants, we provide accurate disease predictions and actionable
              treatment recommendations.
            </p>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="features">
          <h2>Why Choose Farm Easy?</h2>
          <ul>
            <li>
              <strong>AI-Powered Detection:</strong> Accurate and fast disease
              prediction using advanced AI.
            </li>
            <li>
              <strong>User-Friendly Interface:</strong> Easy to navigate and
              use.
            </li>
            <li>
              <strong>Comprehensive Database:</strong> Extensive knowledge base
              of plant diseases and treatments.
            </li>
          </ul>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <p>
              "Farm Easy has been a game changer for my farm. The predictions
              are accurate and the recommendations are spot on!"
            </p>
            <p>
              <strong>Jane Doe</strong>
            </p>
          </div>
          {/* Add more testimonials as needed */}
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 Farm Easy. All rights reserved.</p>
          <a href="#privacy-policy">Privacy Policy</a> |{" "}
          <a href="#terms-of-service">Terms of Service</a>
        </footer>
      </div>
    </>
  );
}
