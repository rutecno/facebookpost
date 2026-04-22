import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import CommentForm from "./commentForm";
import ListComments from "./listComment";

const PostsSection = () => {
    const { posts, addLikeToPost, addCommentToPost, addReplyToComment, sharePost } = useContext(PostContext);
    const [showCommentForm, setShowCommentForm] = useState({});

    const handleLike = (postId) => {
        addLikeToPost(postId);
    };

    const handleShowCommentForm = (postId) => {
        setShowCommentForm(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));
    };

    const handleAddComment = (postId, commentText) => {
        addCommentToPost(postId, commentText);
        setShowCommentForm(prev => ({
            ...prev,
            [postId]: false
        }));
    };

    const handleShare = (postId) => {
        sharePost(postId);
    };

    return (
        <div className="posts-section">
            {posts.length === 0 ? (
                <div className="no-posts">
                    <p>No hay publicaciones aún</p>
                </div>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post-card">
                        {/* Post Header */}
                        <div className="post-header">
                            <div className="author-info">
                                <span className="avatar">{post.avatar}</span>
                                <div className="author-details">
                                    <h3 className="author-name">{post.author}</h3>
                                    <p className="timestamp">{post.timestamp}</p>
                                </div>
                            </div>
                            <button className="post-menu-btn">⋯</button>
                        </div>

                        {/* Post Content */}
                        <div className="post-content">
                            <p className="post-text">{post.content}</p>
                            {post.image && (
                                <img src={post.image} alt="Post" className="post-image" />
                            )}
                        </div>

                        {/* Post Stats */}
                        <div className="post-stats">
                            <span className="stat-item">👍 {post.likes} {post.likes === 1 ? "me gusta" : "me gustan"}</span>
                            <span className="stat-item">💬 {post.comments.length} comentarios</span>
                            <span className="stat-item">📤 {post.shares} compartidos</span>
                        </div>

                        {/* Post Actions */}
                        <div className="post-actions">
                            <button
                                className="action-button"
                                onClick={() => handleLike(post.id)}
                            >
                                👍 Me gusta
                            </button>
                            <button
                                className="action-button"
                                onClick={() => handleShowCommentForm(post.id)}
                            >
                                💬 Comentar
                            </button>
                            <button
                                className="action-button"
                                onClick={() => handleShare(post.id)}
                            >
                                📤 Compartir
                            </button>
                        </div>

                        {/* Comment Form */}
                        {showCommentForm[post.id] && (
                            <CommentForm
                                onAddComment={(text) => handleAddComment(post.id, text)}
                            />
                        )}

                        {/* Comments List */}
                        {post.comments.length > 0 && (
                            <ListComments
                                comments={post.comments}
                                postId={post.id}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default PostsSection;
