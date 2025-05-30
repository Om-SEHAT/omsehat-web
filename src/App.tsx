import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SplashScreen from '@/components/SplashScreen'
import ScrollToTop from '@/components/ScrollToTop'
import PageTransition from '@/components/PageTransition'
import SkipLink from '@/components/SkipLink'
import NotificationContainer from '@/components/NotificationSystem'
import Home from '@/pages/Home'
import OmSapa from '@/pages/OmSapa'
import OmCurhat from '@/pages/OmCurhat'
import OmBayarin from '@/pages/OmBayarin'
import OmEdukasi from '@/pages/OmEdukasi'
import OmPantau from '@/pages/OmPantau'
import About from '@/pages/About'
import Demo from '@/pages/Demo'
import NotFound from '@/pages/NotFound'
import { useNotifications } from './hooks/useNotifications'

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { notifications, dismissNotification } = useNotifications();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="app-container">
      <SkipLink />
      <Header />
      <main id="main-content" className="main-content">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/om-sapa/*" element={<OmSapa />} />
            <Route path="/om-curhat" element={<OmCurhat />} />
            <Route path="/om-bayarin" element={<OmBayarin />} />
            <Route path="/om-edukasi" element={<OmEdukasi />} />
            <Route path="/om-pantau" element={<OmPantau />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <ScrollToTop />
      <NotificationContainer 
        notifications={notifications} 
        onDismiss={dismissNotification} 
        position="top-right"
      />
    </div>
  )
}

export default App
