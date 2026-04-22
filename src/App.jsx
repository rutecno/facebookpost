import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import Login from './components/Login';
import ProfileHeader from "./components/profileHeader"
import PostCreator from "./components/postCreator"
import PhotosSection from "./components/photosSection"
import PostsSection from "./components/postsSection"
import './App.css';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <PostProvider>
          <div className="main-container">
            <ProfileHeader />
            <PostCreator />
            <PhotosSection />
            <PostsSection />
          </div>
        </PostProvider>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;