import Post from "./components/Post"
import { PostProvider } from "./context/PostContext"


function App() {

  return(
    <PostProvider>
      <div className="app-container">
        <Post />
      </div>
    </PostProvider>
  )
}

export default App