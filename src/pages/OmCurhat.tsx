const OmCurhat = () => {
  return (
    <div className="min-h-screen bg-[#F1F3F5] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Om Curhat</h1>
          <p className="text-lg text-gray-600">
            Konsultasi kesehatan online dengan dokter berpengalaman
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Layanan Konsultasi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">👨‍⚕️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Dokter Umum</h3>
                <p className="text-gray-600">Konsultasi untuk keluhan umum dan pemeriksaan rutin</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Dokter Spesialis</h3>
                <p className="text-gray-600">Konsultasi dengan dokter spesialis sesuai kebutuhan</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🩺</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Pemeriksaan Online</h3>
                <p className="text-gray-600">Diagnosa awal melalui video call dengan dokter</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">💊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Resep Digital</h3>
                <p className="text-gray-600">Dapatkan resep obat langsung dari dokter</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cara Kerja</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#228BE6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Pilih Dokter</h3>
              <p className="text-gray-600">Pilih dokter sesuai dengan keluhan Anda</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#228BE6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Konsultasi</h3>
              <p className="text-gray-600">Lakukan konsultasi via chat atau video call</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#228BE6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Dapatkan Solusi</h3>
              <p className="text-gray-600">Terima diagnosa dan resep dari dokter</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-[#228BE6] hover:bg-[#228BE6]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            Mulai Konsultasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default OmCurhat;
