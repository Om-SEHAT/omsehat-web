const About = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Tentang Om SEHAT</h1>
          <p className="page-subtitle">
            Sistem Kesehatan Integrasi #1 di Indonesia
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">Visi & Misi</h2>
          
          <div className="subsection">
            <h3 className="subsection-title">Visi</h3>
            <p className="about-text">
              Menjadi platform kesehatan digital terdepan di Indonesia yang memberikan akses 
              layanan kesehatan berkualitas untuk semua lapisan masyarakat.
            </p>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Misi</h3>
            <ul className="bullet-list">
              <li className="bullet-item">
                <span className="bullet-marker"></span>
                Menyediakan layanan kesehatan digital yang mudah diakses dan terpercaya
              </li>
              <li className="bullet-item">
                <span className="bullet-marker"></span>
                Menghubungkan pasien dengan tenaga kesehatan profesional
              </li>
              <li className="bullet-item">
                <span className="bullet-marker"></span>
                Meningkatkan literasi kesehatan masyarakat Indonesia
              </li>
              <li className="bullet-item">
                <span className="bullet-marker"></span>
                Mengintegrasikan teknologi untuk pelayanan kesehatan yang lebih baik
              </li>
            </ul>
          </div>

          <div>
            <h3 className="subsection-title">Mengapa Om SEHAT?</h3>
            <p className="about-text">
              "Om Tolong Om! Om Siap Menolong!" - Motto kami mencerminkan komitmen untuk 
              selalu siap membantu masyarakat Indonesia dalam mengakses layanan kesehatan 
              yang berkualitas. Dengan teknologi terdepan dan tim medis berpengalaman, 
              kami hadir sebagai solusi kesehatan digital yang dapat diandalkan.
            </p>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-text">🏥</span>
            </div>
            <h3 className="feature-card-title">Terintegrasi</h3>
            <p className="feature-card-description">Layanan kesehatan menyeluruh dalam satu platform</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-text">👨‍⚕️</span>
            </div>
            <h3 className="feature-card-title">Profesional</h3>
            <p className="feature-card-description">Tenaga medis bersertifikat dan berpengalaman</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-text">📱</span>
            </div>
            <h3 className="feature-card-title">Modern</h3>
            <p className="feature-card-description">Teknologi terkini untuk pengalaman terbaik</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
