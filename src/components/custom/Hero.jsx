import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const styles = {
    container: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 50%, #fef2f2 100%)',
      overflow: 'hidden',
    },
    backgroundElements: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    },
    floatingIcon: {
      position: 'absolute',
      opacity: 0.6,
      animation: 'float 6s ease-in-out infinite',
    },
    floatingIconDelayed: {
      position: 'absolute',
      opacity: 0.6,
      animation: 'float 6s ease-in-out infinite',
      animationDelay: '2s',
    },
    bouncingIcon: {
      position: 'absolute',
      opacity: 0.5,
      animation: 'bounce 3s infinite',
    },
    pulsingDot: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#f87171',
      opacity: 0.4,
      animation: 'pulse 2s infinite',
    },
    smallDot: {
      position: 'absolute',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#fb923c',
      opacity: 0.5,
      animation: 'float 6s ease-in-out infinite',
    },
    mainContent: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1024px',
      margin: '0 auto',
    },
    heading: {
      fontSize: 'clamp(2rem, 5vw, 3.75rem)',
      fontWeight: '800',
      lineHeight: '1.2',
      marginBottom: '24px',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    highlightText: {
      background: 'linear-gradient(45deg, #ef4444, #f97316, #ef4444)',
      backgroundSize: '300%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      animation: 'gradient 3s ease infinite',
      display: 'inline-block',
    },
    normalText: {
      color: '#1f2937',
      marginTop: '8px',
      display: 'inline-block',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.3s',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
      color: '#6b7280',
      marginBottom: '32px',
      maxWidth: '512px',
      margin: '0 auto 32px',
      lineHeight: '1.6',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.6s',
    },
    buttonContainer: {
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.9s',
    },
    button: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '16px 32px',
      background: 'linear-gradient(45deg, #ef4444, #f97316)',
      color: 'white',
      fontWeight: '600',
      fontSize: '18px',
      borderRadius: '12px',
      border: 'none',
      cursor: 'pointer',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      boxShadow: isHovered 
        ? '0 25px 50px -12px rgba(239, 68, 68, 0.25)' 
        : '0 10px 25px -5px rgba(239, 68, 68, 0.2)',
      transition: 'all 0.3s ease-out',
      overflow: 'hidden',
      textDecoration: 'none',
    },
    buttonShine: {
      position: 'absolute',
      inset: 0,
      borderRadius: '12px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
      transition: 'transform 1s ease',
      skewX: '-12deg',
    },
    buttonText: {
      position: 'relative',
      zIndex: 10,
    },
    planeIcon: {
      position: 'relative',
      zIndex: 10,
      width: '20px',
      height: '20px',
      transform: isHovered ? 'translateX(4px) rotate(12deg)' : 'translateX(0) rotate(0)',
      transition: 'transform 0.3s ease',
    },
    featuresGrid: {
      marginTop: '64px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 1.2s',
    },
    featureCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    featureCardHover: {
      background: 'rgba(255, 255, 255, 0.8)',
      transform: 'scale(1.05)',
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #ef4444, #f97316)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
    },
    featureTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px',
    },
    featureDescription: {
      fontSize: '14px',
      color: '#6b7280',
      textAlign: 'center',
    },
  };

  const PlaneIcon = () => (
    <svg style={styles.planeIcon} fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  );

  const MapPinIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  return (
    <div style={styles.container}>
      {/* Animated background elements */}
      <div style={styles.backgroundElements}>
        <div style={{...styles.floatingIcon, top: '80px', left: '40px', color: '#fb923c'}}>
          <PlaneIcon />
        </div>
        <div style={{...styles.floatingIconDelayed, top: '160px', right: '80px', color: '#f87171'}}>
          <MapPinIcon />
        </div>
        <div style={{...styles.bouncingIcon, bottom: '160px', left: '80px', color: '#fb923c'}}>
          <StarIcon />
        </div>
        <div style={{...styles.pulsingDot, top: '240px', right: '160px'}}></div>
        <div style={{...styles.smallDot, bottom: '240px', right: '40px'}}></div>
      </div>

      {/* Main content */}
      <div style={styles.mainContent}>
        <h1 style={styles.heading}>
          <span style={styles.highlightText}>
            Discover Your Next Adventure with AI:
          </span>
          <br />
          <span style={styles.normalText}>
            Personalized Itineraries at Your Fingertips
          </span>
        </h1>

        <p style={styles.subtitle}>
          Your personal trip planner and travel curator — creating custom itineraries tailored to your interests and budget.
        </p>

        <div style={styles.buttonContainer}>
          <Link to="/create-trip" style={{textDecoration: 'none'}}>
            <button
              style={styles.button}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div style={styles.buttonShine}></div>
              <span style={styles.buttonText}>Get Started — It's Free</span>
              <PlaneIcon />
            </button>
          </Link>
        </div>

        {/* Feature highlights */}
        <div style={styles.featuresGrid}>
          <FeatureCard
            icon={<StarIcon />}
            title="AI-Powered"
            description="Smart recommendations based on your preferences"
            styles={styles}
          />
          <FeatureCard
            icon={<MapPinIcon />}
            title="Custom Routes"
            description="Personalized itineraries for every destination"
            styles={styles}
          />
          <FeatureCard
            icon={<PlaneIcon />}
            title="Easy Planning"
            description="Plan your perfect trip in just a few clicks"
            styles={styles}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-30px);
          }
          70% {
            transform: translateY(-15px);
          }
          90% {
            transform: translateY(-4px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description, styles }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        ...styles.featureCard,
        ...(isHovered ? styles.featureCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.featureIcon}>
        <div style={{color: 'white'}}>
          {icon}
        </div>
      </div>
      <h3 style={styles.featureTitle}>{title}</h3>
      <p style={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default Hero;