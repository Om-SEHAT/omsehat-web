import { useState, useEffect } from 'react';
import DoctorDetailModal from '../components/DoctorDetailModal';
import '../styles/doctor-dashboard.css';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  roomno: string;
  avatar?: string;
  email?: string;
}

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
      
      if (data && data.doctors && Array.isArray(data.doctors)) {
        setDoctors(data.doctors);
        setError(null);
      } else if (Array.isArray(data)) {
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

  const filteredDoctors = Array.isArray(doctors) 
    ? doctors.filter(doctor => {
        const name = typeof doctor?.name === 'string' ? doctor.name.toLowerCase() : '';
        const specialty = typeof doctor?.specialty === 'string' ? doctor.specialty.toLowerCase() : '';
        const roomno = typeof doctor?.roomno === 'string' ? doctor.roomno.toLowerCase() : '';
        const term = searchTerm.toLowerCase();
        
        return name.includes(term) || specialty.includes(term) || roomno.includes(term);
      })
    : [];

  return (
    <div className="dashboard-container min-h-screen bg-gradient-to-b from-[#f0f9ff] via-[#f5f7fa] to-[#e0f2fe] pt-20 pb-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-blue-100/30 to-transparent"></div>
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200/20 to-blue-300/10 blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-200/20 to-blue-300/10 blur-2xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Dashboard Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-blue-300/30 rounded-full opacity-70 filter blur-2xl animate-pulse-gentle"></div>
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 rotate-45 w-24 h-24 bg-blue-400/20 rounded-full opacity-50 filter blur-xl"></div>
          
          <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 mb-4 tracking-tight relative z-10">
            Daftar Dokter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto relative mt-6">
            <span className="inline-block px-4 py-2 bg-blue-50 rounded-xl relative shadow-sm">
              <span className="relative z-10 font-medium">Informasi lengkap dokter dan ruangan di rumah sakit</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-200/50 rounded-xl transform -rotate-1 scale-105"></span>
            </span>
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari dokter, spesialisasi, atau ruangan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-4 px-6 pl-14 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-blue-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-50 transition-all duration-500">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="mt-4 text-gray-600">Memuat data dokter...</div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Coba Lagi
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isRefreshing ? 'Memperbarui...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Doctor Card Component
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div 
        className={`bg-white rounded-xl p-6 transition-all duration-300 ${
          isModalOpen 
            ? 'ring-2 ring-blue-400 shadow-lg' 
            : 'hover:shadow-xl border border-gray-100'
        }`}
      >
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
            {doctor.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
            <div className="flex items-center">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {doctor.specialty}
              </span>
            </div>
          </div>
        </div>          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="doctor-room">
              <span className="text-sm text-gray-500">Ruangan</span>
              <p className="font-semibold text-gray-800">{doctor.roomno}</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="refresh-button px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
            >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>Detail</span>
          </button>
        </div>
      </div>

      <DoctorDetailModal
        id={doctor.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DoctorDashboard;
