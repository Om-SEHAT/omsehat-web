const OmPantau = () => {
  return (
    <div className="min-h-screen bg-[#F1F3F5] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Om Pantau</h1>
          <p className="text-lg text-gray-600">
            Monitoring kesehatan berkelanjutan untuk hidup yang lebih sehat
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fitur Monitoring</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">❤️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Monitor Jantung</h3>
                <p className="text-gray-600">Pantau detak jantung dan tekanan darah secara real-time</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🩸</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Gula Darah</h3>
                <p className="text-gray-600">Tracking kadar gula darah untuk diabetesi</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">⚖️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Berat Badan</h3>
                <p className="text-gray-600">Monitor perubahan berat badan dan BMI</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">💊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Jadwal Obat</h3>
                <p className="text-gray-600">Reminder minum obat dan suplemen</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏃‍♂️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Aktivitas Fisik</h3>
                <p className="text-gray-600">Catat langkah kaki dan aktivitas olahraga</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">😴</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Kualitas Tidur</h3>
                <p className="text-gray-600">Monitor pola dan kualitas tidur harian</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Kesehatan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Statistik Hari Ini</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Langkah Kaki</span>
                  <span className="font-semibold text-[#228BE6]">8,342</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kalori Terbakar</span>
                  <span className="font-semibold text-[#228BE6]">450 kcal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Jam Tidur</span>
                  <span className="font-semibold text-[#228BE6]">7.5 jam</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Konsumsi Air</span>
                  <span className="font-semibold text-[#228BE6]">1.8 L</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Reminder</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-600">⏰</span>
                  <div>
                    <p className="text-sm font-medium">Minum Obat</p>
                    <p className="text-xs text-gray-600">Metformin - 30 menit lagi</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600">💧</span>
                  <div>
                    <p className="text-sm font-medium">Minum Air</p>
                    <p className="text-xs text-gray-600">Target harian belum tercapai</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600">🏃‍♂️</span>
                  <div>
                    <p className="text-sm font-medium">Olahraga</p>
                    <p className="text-xs text-gray-600">Jalan kaki 30 menit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Pemeriksaan</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Pemeriksaan Rutin</h4>
                <p className="text-sm text-gray-600">Tekanan Darah: 120/80 mmHg</p>
                <p className="text-sm text-gray-600">15 Januari 2025</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Normal</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Cek Gula Darah</h4>
                <p className="text-sm text-gray-600">Gula Darah Puasa: 95 mg/dL</p>
                <p className="text-sm text-gray-600">12 Januari 2025</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Normal</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Medical Check-up</h4>
                <p className="text-sm text-gray-600">Pemeriksaan lengkap tahunan</p>
                <p className="text-sm text-gray-600">8 Januari 2025</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Sehat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-[#228BE6] hover:bg-[#228BE6]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 mr-4">
            Tambah Data Kesehatan
          </button>
          <button className="border border-[#228BE6] text-[#228BE6] hover:bg-[#228BE6] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            Lihat Laporan Lengkap
          </button>
        </div>
      </div>
    </div>
  );
};

export default OmPantau;
