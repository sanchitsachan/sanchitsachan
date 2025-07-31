import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Pages
import HomePage from '@/pages/HomePage';
import BrokersPage from '@/pages/BrokersPage';
import BrokerDetailPage from '@/pages/BrokerDetailPage';
import ComparePage from '@/pages/ComparePage';
import ReviewsPage from '@/pages/ReviewsPage';
import RankingsPage from '@/pages/RankingsPage';
import ArticlesPage from '@/pages/ArticlesPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ProfilePage from '@/pages/auth/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';

// Protected route wrapper
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/brokers" element={<BrokersPage />} />
          <Route path="/brokers/:slug" element={<BrokerDetailPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;