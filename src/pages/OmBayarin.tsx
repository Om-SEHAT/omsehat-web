const OmBayarin = () => {
  return (
    <div className="min-h-screen bg-[#F1F3F5] pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Om Bayarin</h1>
          <p className="text-lg text-gray-600">
            Sistem pembayaran terintegrasi untuk semua kebutuhan kesehatan
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Metode Pembayaran</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">💳</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Kartu Kredit/Debit</h3>
                <p className="text-gray-600">Pembayaran menggunakan Visa, Mastercard, dan kartu lokal</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">📱</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">E-Wallet</h3>
                <p className="text-gray-600">GoPay, OVO, DANA, LinkAja, dan e-wallet lainnya</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏦</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Transfer Bank</h3>
                <p className="text-gray-600">Transfer melalui ATM, internet banking, atau mobile banking</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#228BE6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🏪</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Indomaret & Alfamart</h3>
                <p className="text-gray-600">Bayar di counter Indomaret, Alfamart, dan minimarket lainnya</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Keunggulan Om Bayarin</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#228BE6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔐</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-600">Transaksi dilindungi dengan enkripsi tingkat bank</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#228BE6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Proses Cepat</h3>
              <p className="text-gray-600">Pembayaran diproses dalam hitungan detik</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#228BE6] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Cashback & Promo</h3>
              <p className="text-gray-600">Nikmati cashback dan promo menarik setiap transaksi</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Riwayat Transaksi</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Konsultasi Dr. Ahmad</h4>
                <p className="text-sm text-gray-600">15 Januari 2025, 14:30</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">Rp 150.000</p>
                <p className="text-sm text-green-600">Berhasil</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Obat Paracetamol</h4>
                <p className="text-sm text-gray-600">14 Januari 2025, 09:15</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">Rp 25.000</p>
                <p className="text-sm text-green-600">Berhasil</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Medical Check-up</h4>
                <p className="text-sm text-gray-600">12 Januari 2025, 08:00</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">Rp 500.000</p>
                <p className="text-sm text-green-600">Berhasil</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-[#228BE6] hover:bg-[#228BE6]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 mr-4">
            Top Up Saldo
          </button>
          <button className="border border-[#228BE6] text-[#228BE6] hover:bg-[#228BE6] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
            Lihat Semua Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};

export default OmBayarin;
