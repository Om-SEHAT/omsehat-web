import React from 'react';
import '../styles/doctor-modal.css';

interface DoctorDetailProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

interface DoctorDetailData {
  doctor: {
    id: string;
    name: string;
    email: string;
    specialty: string;
    roomno: string;
  };
  appointment_count_daily: number;
  appointment_count_all_time: number;
  current_queue?: {
    number: number;
  };
}

const DoctorDetailModal: React.FC<DoctorDetailProps> = ({ id, isOpen, onClose }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [doctorData, setDoctorData] = React.useState<DoctorDetailData | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Handle click outside to close
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Close on escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      fetchDoctorDetails();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = ''; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, id]);

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add a small delay to show the loading spinner (better UX)
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const response = await fetch(`https://api-omsehat.sportsnow.app/doctor/${id}`);
      
      if (!response.ok) {
        const errorCode = response.status;
        
        // Handle specific HTTP error codes
        if (errorCode === 404) {
          throw new Error('Data dokter tidak ditemukan');
        } else if (errorCode === 401 || errorCode === 403) {
          throw new Error('Tidak memiliki akses ke data dokter');
        } else if (errorCode >= 500) {
          throw new Error('Terjadi kesalahan pada server');
        } else {
          throw new Error(`Gagal memuat data dokter (${errorCode})`);
        }
      }
      
      const data = await response.json();
      console.log('Doctor data fetched:', data);
      setDoctorData(data);
    } catch (err) {
      console.error('Error fetching doctor details:', err);
      setError(err instanceof Error ? err.message : 'Gagal memuat data dokter. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="doctor-modal-overlay">
      <div 
        className="doctor-modal-container" 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="doctor-detail-title"
      >
        {/* Modal header with close button */}
        <div className="doctor-modal-header">
          <div className="doctor-modal-header-decor"></div>
          <div className="doctor-modal-header-decor-2"></div>
          <h2 id="doctor-detail-title" className="doctor-modal-title">
            Detail Dokter
          </h2>
          <button
            className="doctor-modal-close"
            onClick={onClose}
            aria-label="Tutup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="doctor-modal-content">
          {loading ? (
            <div className="doctor-modal-loading">
              <div className="doctor-modal-spinner">
                <div className="doctor-spinner-ring"></div>
                <div className="doctor-spinner-ring"></div>
                <div className="doctor-spinner-ring"></div>
              </div>
              <p className="animate-pulse">Memuat data dokter...</p>
              <span className="text-xs text-blue-400 mt-2">ID: {id}</span>
            </div>
          ) : error ? (
            <div className="doctor-modal-error">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>{error}</p>
              <button 
                className="doctor-modal-retry" 
                onClick={fetchDoctorDetails}
              >
                Coba Lagi
              </button>
            </div>
          ) : doctorData ? (
            <div className="doctor-detail-container">
              <div className="doctor-profile">
                <div className="doctor-avatar">
                  <span>{doctorData.doctor.name.charAt(0)}</span>
                </div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctorData.doctor.name}</h3>
                  <div className="doctor-specialty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    <span>{doctorData.doctor.specialty}</span>
                  </div>
                </div>
              </div>
              
              <div className="doctor-stats">
                <div className="stat-container">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <div className="stat-label">Ruangan</div>
                      <div className="stat-value">{doctorData.doctor.roomno}</div>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <div className="stat-label">Pasien Hari Ini</div>
                      <div className="stat-value">{doctorData.appointment_count_daily}</div>
                    </div>
                  </div>
                  
                  <div className="stat-item">
                    <div className="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="stat-content">
                      <div className="stat-label">Total Pasien</div>
                      <div className="stat-value">{doctorData.appointment_count_all_time}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="doctor-contact">
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="contact-value">
                  <a href={`mailto:${doctorData.doctor.email}`}>{doctorData.doctor.email}</a>
                </div>
              </div>
              
              {doctorData.current_queue && (
                <div className="queue-info">
                  <div className="queue-label">Nomor Antrian Saat Ini</div>
                  <div className="queue-number animate-pulse-gentle">{doctorData.current_queue.number}</div>
                  <div className="queue-time-label mt-2 text-xs text-white/80">
                    Diperbarui terakhir:
                    <span className="ml-1 font-medium">{new Date().toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="doctor-modal-error">
              <p>Tidak ada data yang tersedia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailModal;
