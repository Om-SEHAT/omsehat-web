import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  
  const features = [
    {
      id: 2,
      image: "/feature-2.png",
      title: "Om Sapa",
      description: "Komunikasi dengan tenaga kesehatan",
      link: "/om-sapa",
      position: { x: 500, y: 150 },
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

  // Handle feature click
  const handleFeatureClick = (feature: typeof features[0], e: React.MouseEvent) => {
    if (feature.title === "Om Pantau") {
      e.preventDefault();
      setSelectedFeature(feature.title);
      setShowModal(true);
    }
    // For other features, the Link component will handle navigation
  };

  // Handle confirmation
  const handleConfirm = () => {
    if (selectedFeature) {
      const feature = features.find(f => f.title === selectedFeature);
      if (feature) {
        navigate(feature.link);
      }
    }
    setShowModal(false);
  };

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
              onClick={(e) => handleFeatureClick(feature, e)}
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
              onClick={(e) => handleFeatureClick(feature, e)}
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
      </div>

      <ConfirmationModal
        isOpen={showModal}
        title={`${selectedFeature} - Konfirmasi Akses`}
        message={`${selectedFeature} hanya tersedia untuk pengguna instansi/bisnis. Apakah Anda ingin melanjutkan?`}
        confirmLabel="Lanjutkan"
        cancelLabel="Kembali"
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </main>
  );
};

export default Home;
