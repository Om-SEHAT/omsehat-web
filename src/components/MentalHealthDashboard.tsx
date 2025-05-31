import { useState, useEffect } from 'react';
import { getMentalHealthSummary } from '../utils/therapyApi';
import type { MentalHealthSummary } from '../utils/therapyApi';

const TrendIndicator = ({ trend }: { trend: 'improving' | 'worsening' | 'stable' }) => {
  const getColor = () => {
    switch (trend) {
      case 'improving': return 'text-green-500';
      case 'worsening': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getIcon = () => {
    switch (trend) {
      case 'improving':
        return '↑';
      case 'worsening':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <span className={`${getColor()} font-bold`}>
      {getIcon()}
    </span>
  );
};

const MetricCard = ({ 
  title, 
  value, 
  trend, 
  description 
}: { 
  title: string;
  value: number;
  trend: 'improving' | 'worsening' | 'stable';
  description: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <div className="flex items-baseline space-x-2">
      <span className="text-3xl font-bold text-purple-600">{value.toFixed(1)}</span>
      <TrendIndicator trend={trend} />
    </div>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
  </div>
);

const MentalHealthDashboard = () => {
  const [summary, setSummary] = useState<MentalHealthSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getMentalHealthSummary();
        setSummary(data);
      } catch (error) {
        console.error('Error fetching mental health summary:', error);
        setError('Gagal memuat ringkasan kesehatan mental. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-6 rounded-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Ringkasan Kesehatan Mental
        </h2>
        <p className="text-gray-600">
          Berdasarkan {summary.total_sessions} sesi terapi • 
          Terakhir update: {new Date(summary.last_session_date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Tingkat Stres"
          value={summary.avg_stress_level}
          trend={summary.stress_trend}
          description="Rata-rata tingkat stres dari semua sesi"
        />
        <MetricCard
          title="Suasana Hati"
          value={summary.avg_mood_rating}
          trend={summary.mood_trend}
          description="Rata-rata rating suasana hati"
        />
        <MetricCard
          title="Kualitas Tidur"
          value={summary.avg_sleep_quality}
          trend={summary.sleep_trend}
          description="Rata-rata kualitas tidur"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Informasi Tambahan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span>{' '}
              {summary.healthcare_worker ? 'Tenaga Kesehatan' : 'Umum'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Total Sesi:</span>{' '}
              {summary.total_sessions}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Sesi Selesai:</span>{' '}
              {summary.completed_sessions}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Tingkat Penyelesaian:</span>{' '}
              {((summary.completed_sessions / summary.total_sessions) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthDashboard;