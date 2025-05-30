const OmEdukasi = () => {
  return (
    <div className="min-h-screen bg-[#F1F3F5] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Om Edukasi</h1>
          <p className="text-lg text-gray-600">
            Platform edukasi kesehatan terpercaya dengan konten berkualitas
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Kategori Edukasi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏃‍♂️</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Gaya Hidup Sehat</h3>
                <p className="text-gray-600">Tips diet, olahraga, dan pola hidup sehat</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🧠</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Kesehatan Mental</h3>
                <p className="text-gray-600">Panduan mengelola stress dan kesehatan mental</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">👶</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Kesehatan Anak</h3>
                <p className="text-gray-600">Panduan kesehatan untuk bayi dan anak-anak</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">👵</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Kesehatan Lansia</h3>
                <p className="text-gray-600">Perawatan kesehatan untuk usia lanjut</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🦠</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Pencegahan Penyakit</h3>
                <p className="text-gray-600">Informasi pencegahan berbagai penyakit</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">💊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Obat & Suplemen</h3>
                <p className="text-gray-600">Panduan penggunaan obat dan suplemen yang tepat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Artikel Terbaru</h2>
          <div className="space-y-6">
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-20 h-20 bg-[#228BE6] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl">📖</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">5 Tips Menjaga Kesehatan Jantung</h3>
                <p className="text-gray-600 text-sm mb-2">Pelajari cara menjaga kesehatan jantung dengan langkah-langkah sederhana...</p>
                <p className="text-[#228BE6] text-sm">Dr. Sarah Wijaya • 2 hari yang lalu</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-20 h-20 bg-[#228BE6] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl">🥗</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">Menu Diet Sehat untuk Turunkan Berat Badan</h3>
                <p className="text-gray-600 text-sm mb-2">Rekomendasi menu diet yang sehat dan efektif untuk menurunkan berat badan...</p>
                <p className="text-[#228BE6] text-sm">Dr. Ahmad Nutritionist • 3 hari yang lalu</p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-20 h-20 bg-[#228BE6] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl">😴</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-2">Pentingnya Tidur Berkualitas untuk Kesehatan</h3>
                <p className="text-gray-600 text-sm mb-2">Mengapa tidur yang cukup dan berkualitas sangat penting untuk kesehatan...</p>
                <p className="text-[#228BE6] text-sm">Dr. Budi Sleep Specialist • 5 hari yang lalu</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Video Edukasi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="w-full h-40 bg-[#228BE6] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-4xl">▶️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Cara Cuci Tangan yang Benar</h3>
              <p className="text-gray-600 text-sm">Durasi: 3 menit</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <div className="w-full h-40 bg-[#228BE6] rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-4xl">▶️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Senam Pagi untuk Pemula</h3>
              <p className="text-gray-600 text-sm">Durasi: 15 menit</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-[#228BE6] hover:bg-[#228BE6]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 mr-4">
            Lihat Semua Artikel
          </button>
          <button className="border border-[#228BE6] text-[#228BE6] hover:bg-[#228BE6] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            Berlangganan Newsletter
          </button>
        </div>
      </div>
    </div>
  );
};

export default OmEdukasi;
