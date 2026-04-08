import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";

const PostCreator = ({ onPostCreated }) => {
    const { profile, createNewPost } = useContext(PostContext);
    const [showForm, setShowForm] = useState(false);
    const [postContent, setPostContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (postContent.trim()) {
            createNewPost(postContent);
            setPostContent("");
            setShowForm(false);
            if (onPostCreated) onPostCreated();
        }
    };

    return (
        <div className="post-creator-container">
            <div className="creator-header">
                <div className="creator-avatar">
                    <span>{profile.profilePicture}</span>
                </div>
                <input
                    type="text"
                    className="creator-input"
                    placeholder="¿En qué estás pensando?"
                    onClick={() => setShowForm(true)}
                    readOnly
                />
            </div>

            {showForm && (
                <div className="creator-form-expanded">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className="creator-textarea"
                            placeholder="¿En qué estás pensando?"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                            rows="4"
                        />

                        <div className="creator-actions">
                            <div className="creator-tools">
                                <button type="button" className="tool-btn" title="Foto/video">
                                    🎥 Foto/Video
                                </button>
                                <button type="button" className="tool-btn" title="Emoji">
                                    😊 Emoji
                                </button>
                                <button type="button" className="tool-btn" title="Ubicación">
                                    📍 Ubicación
                                </button>
                            </div>

                            <div className="creator-buttons">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => {
                                        setShowForm(false);
                                        setPostContent("");
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="publish-btn">
                                    Publicar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostCreator;
