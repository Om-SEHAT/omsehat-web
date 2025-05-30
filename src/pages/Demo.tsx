import { useState } from 'react';
import ContactForm, { type ContactFormData } from '@/components/ContactForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Play, Zap, Users, Shield, Heart } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const Demo = () => {
  const notifications = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const handleContactSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    notifications.showSuccess('Pesan berhasil dikirim!', 'Tim kami akan menghubungi Anda segera.');
  };

  const handleTestNotification = (type: 'success' | 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'success':
        notifications.showSuccess('Berhasil!', 'Operasi berhasil dilakukan.');
        break;
      case 'error':
        notifications.showError('Terjadi Kesalahan', 'Silakan coba lagi nanti.');
        break;
      case 'warning':
        notifications.showWarning('Peringatan', 'Harap periksa data Anda.');
        break;
      case 'info':
        notifications.showInfo('Informasi', 'Fitur ini sedang dalam pengembangan.');
        break;
    }
  };

  const handleLoadingDemo = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    notifications.showSuccess('Loading selesai!', 'Data berhasil dimuat.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Om SEHAT Demo Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcase fitur-fitur terbaru yang telah diimplementasi dalam aplikasi Om SEHAT.
            Coba berbagai komponen dan interaksi yang telah dikembangkan.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-yellow-600" />}
            title="Page Transitions"
            description="Smooth loading animations saat navigasi antar halaman"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-green-600" />}
            title="Form Validation"
            description="Validasi form real-time dengan pesan error yang jelas"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-blue-600" />}
            title="Accessibility"
            description="Support keyboard navigation dan screen reader"
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8 text-red-600" />}
            title="Notifications"
            description="Sistem notifikasi dengan berbagai tipe dan animasi"
          />
          <FeatureCard
            icon={<Play className="h-8 w-8 text-purple-600" />}
            title="Search Overlay"
            description="Pencarian interaktif dengan debouncing dan filtering"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-indigo-600" />}
            title="Micro-interactions"
            description="Animasi halus untuk meningkatkan user experience"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demo Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Demo Kontrol</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Test Notifications</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleTestNotification('success')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Success
                  </button>
                  <button
                    onClick={() => handleTestNotification('error')}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Error
                  </button>
                  <button
                    onClick={() => handleTestNotification('warning')}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Warning
                  </button>
                  <button
                    onClick={() => handleTestNotification('info')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Info
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Loading Demo</h3>
                <button
                  onClick={handleLoadingDemo}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-[#228BE6] text-white rounded-lg hover:bg-[#1976D2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Loading...
                    </>
                  ) : (
                    'Start Loading Demo'
                  )}
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Animation Classes</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="animate-fadeIn bg-gray-100 p-2 rounded">fadeIn</div>
                  <div className="animate-slideInUp bg-gray-100 p-2 rounded">slideInUp</div>
                  <div className="animate-slideInDown bg-gray-100 p-2 rounded">slideInDown</div>
                  <div className="animate-pulse-soft bg-gray-100 p-2 rounded">pulse-soft</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Demo */}
          <ContactForm
            title="Demo Contact Form"
            subtitle="Form dengan validasi lengkap dan UX yang optimal"
            onSubmit={handleContactSubmit}
          />
        </div>

        {/* Features Summary */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fitur yang Telah Diimplementasi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">✅ Completed Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Page transition loading dengan animasi smooth</li>
                <li>• Form validation real-time dengan error handling</li>
                <li>• Search overlay dengan debouncing dan keyboard navigation</li>
                <li>• Notification system dengan multiple types</li>
                <li>• Accessibility improvements (ARIA labels, focus trap)</li>
                <li>• Responsive design untuk semua screen sizes</li>
                <li>• Loading spinners untuk berbagai ukuran</li>
                <li>• Smooth animations dan micro-interactions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🚀 Next Steps</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• User authentication system</li>
                <li>• Backend integration untuk dynamic content</li>
                <li>• Unit dan integration testing</li>
                <li>• Performance optimization</li>
                <li>• PWA capabilities</li>
                <li>• Advanced error boundaries</li>
                <li>• Image optimization</li>
                <li>• Production deployment setup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center gap-3 mb-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Demo;
