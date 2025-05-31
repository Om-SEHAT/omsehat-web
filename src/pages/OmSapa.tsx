import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientForm from '../components/PatientForm';
import Chat from '../components/Chat';
import '../styles/vital-signs.css';
import type { PatientFormData } from '../components/PatientForm';

const OmSapaHome = () => {
  const [showForm, setShowForm] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  
  const handleFormSubmit = (data: PatientFormData) => {
    console.log('Form submitted:', data);
    setSubmissionSuccess(true);
  };

  return (
    <div className="feature-page-container">
      <div className="feature-page-content">
        <div className="feature-page-header">
          <h1 className="feature-page-title">Om Sapa</h1>
          <p className="feature-page-subtitle">
            Layanan komunikasi langsung dengan tenaga kesehatan profesional
          </p>
        </div>

        {!showForm && !submissionSuccess && (
          <>
            <div className="feature-section">
              <h2 className="feature-section-title">Fitur Utama</h2>
              <div className="feature-items-grid">
                <div className="feature-item-card">
                  <div className="feature-item-icon">
                    <span className="feature-item-icon-text">📞</span>
                  </div>
                  <div className="feature-item-content">
                    <h3 className="feature-item-title">Konsultasi Real-time</h3>
                    <p className="feature-item-description">Berkomunikasi langsung dengan dokter dan tenaga medis</p>
                  </div>
                </div>

                <div className="feature-item-card">
                  <div className="feature-item-icon">
                    <span className="feature-item-icon-text">💬</span>
                  </div>
                  <div className="feature-item-content">
                    <h3 className="feature-item-title">Chat Interaktif</h3>
                    <p className="feature-item-description">Fitur chat dengan respons cepat dari tenaga kesehatan</p>
                  </div>
                </div>

                <div className="feature-item-card">
                  <div className="feature-item-icon">
                    <span className="feature-item-icon-text">🔒</span>
                  </div>
                  <div className="feature-item-content">
                    <h3 className="feature-item-title">Privasi Terjamin</h3>
                    <p className="feature-item-description">Data dan komunikasi Anda aman dengan enkripsi end-to-end</p>
                  </div>
                </div>

                <div className="feature-item-card">
                  <div className="feature-item-icon">
                    <span className="feature-item-icon-text">⏰</span>
                  </div>
                  <div className="feature-item-content">
                    <h3 className="feature-item-title">24/7 Available</h3>
                    <p className="feature-item-description">Layanan tersedia kapan saja sesuai kebutuhan Anda</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="call-to-action mt-8">
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Mulai Konsultasi
              </button>
            </div>
          </>
        )}
        
        {showForm && !submissionSuccess && (
          <div className="patient-registration-section">
            <div className="section-header">
              <h2 className="section-title" id="form-title">Selamat Datang di Om Sapa</h2>
              <p className="section-description">Mohon isi data diri Anda</p>
            </div>
            <PatientForm 
              onSubmit={handleFormSubmit} 
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {submissionSuccess && (
          <div className="success-message-container">
            <div className="success-message">
              <div className="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="success-title">Pendaftaran Berhasil</h2>
              <p className="success-text">
                Terima kasih telah mendaftar. Data Anda telah kami terima dan proses verifikasi OTP sedang berlangsung.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main OmSapa component with routing
const OmSapa = () => {
  return (
    <Routes>
      <Route path="/" element={<OmSapaHome />} />
      <Route path="/chat/:sessionId" element={<Chat />} />
    </Routes>
  );
};

export default OmSapa;
