import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { useAuth } from "../context/AuthContext";
import CommentForm from "./commentForm";
import ListComments from "./listComment";

const Post = () => {
    const { posts, addLikeToPost, addCommentToPost, sharePost } = useContext(PostContext);
    const { user, logout } = useAuth();
    const [showCommentForm, setShowCommentForm] = useState(false);
    const currentPost = posts.length > 0 ? posts[0] : null;

    if (!currentPost) {
        return <div className="loading">Cargando post...</div>;
    }

    const handleLike = () => {
        addLikeToPost(currentPost.id);
    };

    const handleShowCommentForm = () => {
        setShowCommentForm(!showCommentForm);
    };

    const handleAddComment = (commentText) => {
        addCommentToPost(currentPost.id, commentText);
        setShowCommentForm(false);
    };

    const handleShare = () => {
        sharePost(currentPost.id);
        alert("¡Post compartido exitosamente! 📤");
    };

    return (
        <>
            {/* Header con información del usuario */}
            <div className="app-header">
                <div className="user-info">
                    <span className="user-avatar">{user?.avatar}</span>
                    <span className="user-name">Hola, {user?.username}!</span>
                </div>
                <button className="logout-button" onClick={logout}>
                    Cerrar Sesión
                </button>
            </div>

            <div className="post-card">
            {/* Header del post */}
            <div className="post-header">
                <div className="author-info">
                    <span className="avatar">{currentPost.avatar}</span>
                    <div className="author-details">
                        <h3 className="author-name">{currentPost.author}</h3>
                        <p className="timestamp">{currentPost.timestamp}</p>
                    </div>
                </div>
            </div>

            {/* Contenido del post */}
            <div className="post-content">
                <h2 className="post-title">{currentPost.title}</h2>
                <p className="post-text">{currentPost.content}</p>
                <img src={currentPost.image} alt="Post" className="post-image" />
            </div>

            {/* Contador de interacciones */}
            <div className="post-stats">
                <span className="stat-item">👍 {currentPost.likes} {currentPost.likes === 1 ? "me gusta" : "me gustan"}</span>
                <span className="stat-item">💬 {currentPost.comments.length} comentarios</span>
                <span className="stat-item">📤 {currentPost.shares} compartidos</span>
            </div>

            {/* Botones de interaccion */}
            <div className="post-actions">
                <button 
                    className="action-button like-btn"
                    onClick={handleLike}
                >
                    👍 Me gusta
                </button>
                <button 
                    className="action-button comment-btn"
                    onClick={handleShowCommentForm}
                >
                    💬 Comentar
                </button>
                <button 
                    className="action-button share-btn"
                    onClick={handleShare}
                >
                    📤 Compartir
                </button>
            </div>

            {/* Formulario de comentario */}
            {showCommentForm && (
                <CommentForm 
                    onAddComment={handleAddComment}
                    postId={currentPost.id}
                />
            )}

            {/* Lista de comentarios */}
            <ListComments 
                comments={currentPost.comments}
                postId={currentPost.id}
            />
        </div>
        </>
    );
};

export default Post;
