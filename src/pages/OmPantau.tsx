import { useState, useEffect, useRef } from 'react';
import DoctorDetailModal from '../components/DoctorDetailModal';
import '../styles/otp-dialog.css';
import '../styles/pin-dialog.css';
import '../styles/z-index-fix.css';
import '../styles/doctor-dashboard.css';

interface Doctor {
  id: string;
  name: string;
  specialty: string; // Changed from speciality to specialty to match API response
  roomno: string;
  avatar?: string;
  email?: string;
}

const PinDialog = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pin, setPin] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const correctPin = '151203';

  // Handle focus trap within the dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = dialog.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus first input when dialog opens
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle PIN input changes
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasted, distribute characters across inputs
      const pastedValue = value.split('').slice(0, 6);
      
      const newPin = [...pin];
      pastedValue.forEach((char, i) => {
        if (index + i < 6 && /^\d*$/.test(char)) {
          newPin[index + i] = char;
        }
      });
      
      setPin(newPin);
      
      // Focus next empty input or last input
      const nextIndex = Math.min(index + pastedValue.length, 5);
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex]?.focus();
      }
    } else {
      // Single character input
      if (value && !/^\d*$/.test(value)) return;
      
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
      
      // Auto-focus next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle keydown events (backspace, arrow keys)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const newPin = [...pin];
      newPin[index - 1] = '';
      setPin(newPin);
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Handle PIN submission
  const handleSubmit = async () => {
    const pinValue = pin.join('');
    if (pinValue.length !== 6) {
      setError('Silakan masukkan 6 digit PIN');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call with setTimeout
    setTimeout(() => {
      if (pinValue === correctPin) {
        onSuccess();
      } else {
        setError('PIN tidak valid. Silakan coba lagi.');
        setPin(Array(6).fill(''));
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div 
      className="otp-dialog-overlay" 
      style={{ 
        zIndex: 9999999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 10, 30, 0.6)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        className="otp-dialog-container pin-dialog-container" 
        onClick={e => e.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        aria-labelledby="pin-dialog-title"
        aria-describedby="pin-dialog-description"
        style={{ position: 'relative', zIndex: 10000000 }}
      >
        <div className="otp-dialog-header pin-dialog-header">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-300/10 rounded-full"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-300/10 rounded-full"></div>
          
          <div className="pin-dialog-logo">
            <div className="pin-logo-circle">
              <span>OP</span>
            </div>
          </div>
          <h2 id="pin-dialog-title" className="otp-dialog-title pin-dialog-title">Om Pantau</h2>
        </div>
        
        <div className="otp-dialog-content">
          <p id="pin-dialog-description" className="otp-description" style={{ 
            fontSize: '1.1rem', 
            color: '#4b5563', 
            fontWeight: 500,
            maxWidth: '320px',
            margin: '24px auto 8px',
            textAlign: 'center',
            lineHeight: 1.5
          }}>
            Masukkan PIN untuk mengakses informasi dokter
          </p>
          
          <div className="otp-input-container pin-input-container">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="password"
                maxLength={6}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                className={`otp-input pin-input ${digit ? 'filled' : ''} ${error ? 'error' : ''}`}
                aria-label={`PIN digit ${index + 1}`}
                pattern="[0-9]*"
                inputMode="numeric"
                autoComplete={index === 0 ? "off" : "off"}
              />
            ))}
          </div>
          
          {error && (
            <div className="otp-error-message pin-error-message">
              <svg className="error-icon pin-error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <div className="otp-actions">
            <button 
              className="pin-info-button" 
              type="button" 
              onClick={() => alert('PIN untuk demo: 151203')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>Bantuan PIN</span>
            </button>
            
            <button 
              className="otp-submit-button pin-submit-button"
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="button-content-with-loader pin-spinner-container">
                  <svg className="spinner-icon pin-spinner-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" stroke="currentColor" strokeDasharray="30" strokeDashoffset="10" />
                  </svg>
                  <span>Verifikasi...</span>
                </span>
              ) : (
                <>
                  <span>Verifikasi PIN</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className="doctor-card group"
      >
        <div className="card-decoration card-decoration-1"></div>
        <div className="card-decoration card-decoration-2"></div>
        <div className="card-top-gradient"></div>

        <div className="p-6 relative">
          <div className="flex items-center space-x-5">
            <div className="doctor-avatar">
              {doctor.avatar ? (
                <img 
                  src={doctor.avatar} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center relative z-20">
                  <span className="text-2xl font-bold text-white drop-shadow-lg">
                    {doctor.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            </div>

            <div className="doctor-info">
              <h3 className="doctor-name">
                {doctor.name}
                {isModalOpen && <span className="active-badge">Active</span>}
              </h3>
              <div className="flex items-center mt-2">
                <span className="doctor-specialty-badge">
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" 
                       stroke="currentColor" strokeWidth="2">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  {doctor.specialty}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-100/50 pt-4">
            <div className="room-info">
              <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" 
                   stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18"/>
                <path d="M9 21V9"/>
              </svg>
              <span className="room-number">Ruang {doctor.roomno}</span>
            </div>

            <button
              onClick={openModal}
              className="detail-button"
              aria-label={`Lihat detail dokter ${doctor.name}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg 
                  className={`w-4 h-4 ${isModalOpen ? 'animate-pulse' : 'group-hover:rotate-180 transition-transform duration-500'}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
                <span>{isModalOpen ? 'Terbuka' : 'Lihat Detail'}</span>
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </div>
        </div>
      </div>

      <DoctorDetailModal 
        id={doctor.id} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  );
};

const DoctorDashboard = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api-omsehat.sportsnow.app/doctors');
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      
      const data = await response.json();
      
      // Check if the response has a doctors array property
      if (data && data.doctors && Array.isArray(data.doctors)) {
        setDoctors(data.doctors);
        setError(null);
      } else if (Array.isArray(data)) {
        // Fallback if the API returns the array directly
        setDoctors(data);
        setError(null);
      } else {
        console.error('API did not return a valid doctor array:', data);
        setDoctors([]);
        setError('Format data dokter tidak valid. Silakan coba lagi nanti.');
      }
    } catch (err) {
      setError('Gagal memuat data dokter. Silakan coba lagi nanti.');
      console.error('Error fetching doctors:', err);
      // Ensure doctors is reset to empty array on error
      setDoctors([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDoctors();
  };

  // Ensure doctors is an array before filtering
  const filteredDoctors = Array.isArray(doctors) 
    ? doctors.filter(doctor => {
        // Ensure doctor properties exist and are strings before using toLowerCase
        const name = typeof doctor?.name === 'string' ? doctor.name.toLowerCase() : '';
        const specialty = typeof doctor?.specialty === 'string' ? doctor.specialty.toLowerCase() : '';
        const roomno = typeof doctor?.roomno === 'string' ? doctor.roomno.toLowerCase() : '';
        const term = searchTerm.toLowerCase();
        
        return name.includes(term) || specialty.includes(term) || roomno.includes(term);
      })
    : [];

  return (
    <div className="doctor-dashboard">
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                       from-blue-600 via-blue-500 to-indigo-600 mb-6 animate-gradient">
          Daftar Dokter
        </h1>
        
        <div className="search-container">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 
                          rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <input
            type="text"
            placeholder="Cari nama dokter, spesialisasi, atau nomor ruangan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 rounded-xl p-6 text-center max-w-lg mx-auto">
            <svg
              className="mx-auto h-12 w-12 text-red-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 
                       transition-colors duration-300 inline-flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            {/* Doctor grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            
            {/* No results message */}
            {filteredDoctors.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-xl p-8 max-w-lg mx-auto">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tidak Ada Hasil
                  </h3>
                  <p className="text-gray-600">
                    Tidak ada dokter yang sesuai dengan pencarian Anda
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-12 text-center">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="refresh-button"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          <span className="relative">
            {isRefreshing ? 'Memperbarui...' : 'Perbarui Data'}
          </span>
          {!isRefreshing && (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/25 to-white/0 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
        </button>
      </footer>
    </div>
  );
};

const OmPantau = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const handlePinSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <>
      {!authenticated ? (
        <div 
          className="pin-dialog-wrapper" 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            zIndex: 9999999,
            isolation: 'isolate',
            backgroundColor: 'rgba(0, 10, 30, 0.6)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <PinDialog onSuccess={handlePinSuccess} />
        </div>
      ) : (
        <DoctorDashboard />
      )}
    </>
  );
};

export default OmPantau;
