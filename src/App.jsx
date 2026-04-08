import ProfileHeader from "./components/profileHeader"
import PostCreator from "./components/postCreator"
import PhotosSection from "./components/photosSection"
import PostsSection from "./components/postsSection"
import { PostProvider } from "./context/PostContext"


function App() {

  return(
    <PostProvider>
      <div className="app-container">
        <div className="main-container">
          <ProfileHeader />
          <PostCreator />
          <PhotosSection />
          <PostsSection />
        </div>
      </div>
    </PostProvider>
  )
}

export default App