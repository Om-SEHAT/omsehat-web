import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const features = [
    {
      id: 2,
      image: "/feature-2.png",
      title: "Om Sapa",
      description: "Komunikasi dengan tenaga kesehatan",
      link: "/om-sapa",
      position: { x: 200, y: 150 },
      size: { width: 280, height: 280 }
    },
    {
      id: 3,
      image: "/feature-3.png",
      title: "Om Curhat",
      description: "Konsultasi kesehatan online",
      link: "/om-curhat",
      position: { x: 500, y: 150 },
      size: { width: 280, height: 280 }
    },
    {
      id: 4,
      image: "/feature-4.png",
      title: "Om Edukasi",
      description: "Edukasi kesehatan terpercaya",
      link: "/om-edukasi",
      position: { x: 800, y: 150 },
      size: { width: 280, height: 280 }
    },
    {
      id: 5,
      image: "/feature-5.png",
      title: "Om Bayarin",
      description: "Sistem pembayaran terintegrasi",
      link: "/om-bayarin",
      position: { x: 350, y: 400 },
      size: { width: 280, height: 280 }
    },
    {
      id: 6,
      image: "/feature-6.png",
      title: "Om Pantau",
      description: "Monitoring kesehatan berkelanjutan",
      link: "/om-pantau",
      position: { x: 650, y: 400 },
      size: { width: 280, height: 280 }
    }
  ];

  // Set document title when component mounts
  useEffect(() => {
    document.title = "Om SEHAT - Sistem Kesehatan Integrasi #1 di Indonesia";
  }, []);

  return (
    <main className="page-container">
      {/* Hero Section */}
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">
            Selamat Datang di Om SEHAT
          </h1>
          <p className="page-subtitle">
            Sistem Kesehatan Integrasi #1 di Indonesia
          </p>
          <p className="page-tagline">
            Om Tolong Om! Om Siap Menolong!
          </p>
        </div>

        {/* Features Section - Desktop Layout (matches Figma) */}
        <div className="features-grid-desktop" role="region" aria-label="Fitur Om SEHAT">
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.link}
              className="feature-item"
              style={{
                left: `${Math.max(0, feature.position.x)}px`,
                top: `${feature.position.y}px`,
                width: `${feature.size.width}px`,
                height: `${feature.size.height}px`,
              }}
              aria-label={`${feature.title} - ${feature.description}`}
            >
              <div className="feature-container">
                <img
                  src={feature.image}
                  alt={`Ilustrasi ${feature.title}`}
                  className="feature-image"
                  loading="lazy"
                />
                <div className="feature-overlay">
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section - Mobile/Tablet Layout */}
        <div className="features-grid-mobile" role="region" aria-label="Fitur Om SEHAT">
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.link}
              className="feature-link"
              aria-label={`${feature.title} - ${feature.description}`}
            >
              <div className="feature-mobile-container">
                <img
                  src={feature.image}
                  alt={`Ilustrasi ${feature.title}`}
                  className="feature-image"
                  loading="lazy"
                />
                <div className="feature-overlay">
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="call-to-action">
          <p className="cta-text">
            Bergabunglah dengan ribuan pengguna yang telah merasakan kemudahan layanan Om SEHAT
          </p>
          <Link 
            to="/about"
            className="btn btn-primary cta-button"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
