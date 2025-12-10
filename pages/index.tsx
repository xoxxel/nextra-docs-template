import Head from 'next/head'
import { useEffect } from 'react'

export default function LandingPage() {
  useEffect(() => {
    // Force trigger animation initialization after component mounts
    const event = new Event('DOMContentLoaded', { bubbles: true, cancelable: false });
    document.dispatchEvent(event);
  }, []);

  return (
    <>
      <Head>
        <title>BrowserLess - استخراج داده از وب بدون مرورگر</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header */}
      <header className="header">
        <div className="header__container">
          <a href="/" className="header__logo">
            <svg width="32" height="32" viewBox="0 0 410 410" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M359.5 79.5L205 359.5L50.5 79.5M205 0.5L50.5 205L205 359.5L359.5 205L205 0.5Z" stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>BrowserLess</span>
          </a>
          
          <nav className="header__nav">
            <a href="/docs" className="header__link">مستندات</a>
            <a href="/docs/about" className="header__link">درباره ما</a>
            <a href="https://github.com/browserless" target="_blank" rel="noopener noreferrer" className="header__link">
              GitHub
            </a>
            <a href="/docs" className="header__cta">شروع کنید</a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="header__mobile-toggle" id="mobile-toggle" aria-label="Toggle Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="header__mobile-menu" id="mobile-menu">
          <a href="/docs" className="header__mobile-link">مستندات</a>
          <a href="/docs/about" className="header__mobile-link">درباره ما</a>
          <a href="https://github.com/browserless" target="_blank" rel="noopener noreferrer" className="header__mobile-link">
            GitHub
          </a>
          <a href="/docs" className="header__mobile-cta">شروع کنید</a>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          {/* Pill Badge */}
          <a href="https://github.com/browserless" className="hero__pill" target="_blank" rel="noopener noreferrer">
            <span>🎉 BrowserLess API</span>
          </a>

          {/* Heading */}
          <h1 className="hero__title">استخراج داده<br />بدون مرورگر</h1>
          
          {/* Tagline */}
          <h3 className="hero__tagline">
            BrowserLess ابزاری قدرتمند برای استخراج و اتوماسیون داده از وب‌سایت‌ها
            بدون نیاز به مدیریت مرورگر headless
          </h3>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <a href="/docs" className="btn btn--primary">شروع کنید</a>
            <a href="https://github.com/browserless" target="_blank" rel="noopener noreferrer" className="btn btn--outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Animated Diagram */}
        <div className="hero__diagram" id="hero-diagram">
          {/* Input Lines SVG */}
          <svg id="input-svg" xmlns="http://www.w3.org/2000/svg" width="844" height="644" viewBox="0 0 844 644" fill="none" className="input-lines">
            <defs>
              <linearGradient id="base_gradient" x1="88.1032" y1="324.167" x2="843.505" y2="324.167" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#c6caff" stopOpacity="0" />
                <stop offset="0.2" stopColor="#c6caff" stopOpacity="0.1" />
                <stop offset="0.4" stopColor="white" stopOpacity="0.4" />
                <stop offset="0.6" stopColor="#c6caff" stopOpacity="0.2" />
                <stop offset="0.8" stopColor="#c6caff" stopOpacity="0.2" />
                <stop offset="0.9" stopColor="#c6caff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Output Line SVG */}
          <svg id="output-svg" xmlns="http://www.w3.org/2000/svg" width="844" height="80" viewBox="0 0 844 40" fill="none" className="output-line">
            <path d="M843.463 1.3315L245.316 5.47507L0.633077 4.69725" stroke="url(#output_gradient)" strokeWidth="1.2" opacity="0.8" />
            <defs>
              <linearGradient id="output_gradient" gradientUnits="userSpaceOnUse">
                <stop offset="0.1" stopColor="#E0C8FF" stopOpacity="0" />
                <stop offset="0.4" stopColor="#E0C8FF" stopOpacity="0.4" />
                <stop offset="1" stopColor="#E0C8FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Vite Chip */}
          <div id="vite-chip" className="vite-chip">
            <div className="vite-chip__background">
              <div className="vite-chip__border"></div>
              <div className="vite-chip__edge"></div>
            </div>
            <div className="vite-chip__filter"></div>
            <svg className="vite-chip__logo" width="65" height="65" viewBox="0 0 410 410" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="410" height="410" fill="#000" opacity="0" />
              <path d="M359.5 79.5L205 359.5L50.5 79.5M205 0.5L50.5 205L205 359.5L359.5 205L205 0.5Z" stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="hero__background" id="hero-background"></div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__logo">
              <svg width="24" height="24" viewBox="0 0 410 410" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M359.5 79.5L205 359.5L50.5 79.5M205 0.5L50.5 205L205 359.5L359.5 205L205 0.5Z" stroke="currentColor" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>BrowserLess</span>
            </div>
            <p className="footer__copy">© 2025 BrowserLess. تمامی حقوق محفوظ است.</p>
          </div>
          <div className="footer__links">
            <a href="/docs">مستندات</a>
            <a href="https://github.com/browserless" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="/docs/about">درباره ما</a>
          </div>
        </div>
      </footer>
    </>
  )
}

// Disable Nextra theme for this page
LandingPage.theme = 'raw'
