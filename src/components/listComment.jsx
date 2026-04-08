import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";

const ListComments = ({ comments, postId }) => {
    const { addReplyToComment, addLikeToComment } = useContext(PostContext);
    const [showReplyForm, setShowReplyForm] = useState({});
    const [replyText, setReplyText] = useState({});

    const handleReplyToggle = (commentId) => {
        setShowReplyForm(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const handleReplyChange = (commentId, e) => {
        setReplyText(prev => ({
            ...prev,
            [commentId]: e.target.value
        }));
    };

    const handleAddReply = (commentId) => {
        if (replyText[commentId]?.trim()) {
            addReplyToComment(postId, commentId, replyText[commentId]);
            setReplyText(prev => ({
                ...prev,
                [commentId]: ""
            }));
            setShowReplyForm(prev => ({
                ...prev,
                [commentId]: false
            }));
        }
    };

    const handleCommentLike = (commentId) => {
        addLikeToComment(postId, commentId);
    };

    if (comments.length === 0) {
        return (
            <div className="comments-section">
                <p className="no-comments">No hay comentarios aun. Se el primero en comentar!</p>
            </div>
        );
    }

    return (
        <div className="comments-section">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                        <span className="comment-avatar">{comment.avatar}</span>
                        <div className="comment-content">
                            <h4 className="comment-author">{comment.author}</h4>
                            <p className="comment-text">{comment.text}</p>
                        </div>
                    </div>

                    <div className="comment-actions">
                        <button
                            className="comment-action-btn"
                            onClick={() => handleCommentLike(comment.id)}
                        >
                            👍 {comment.likes > 0 && <span>{comment.likes}</span>}
                        </button>
                        <button
                            className="comment-action-btn"
                            onClick={() => handleReplyToggle(comment.id)}
                        >
                            💬 Responder
                        </button>
                    </div>

                    {/* Formulario de respuesta */}
                    {showReplyForm[comment.id] && (
                        <div className="reply-form">
                            <textarea
                                className="reply-input"
                                placeholder="Escribe una respuesta..."
                                value={replyText[comment.id] || ""}
                                onChange={(e) => handleReplyChange(comment.id, e)}
                                rows="2"
                            />
                            <div className="reply-buttons">
                                <button
                                    className="reply-submit-btn"
                                    onClick={() => handleAddReply(comment.id)}
                                >
                                    Responder
                                </button>
                                <button
                                    className="reply-cancel-btn"
                                    onClick={() => handleReplyToggle(comment.id)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Lista de respuestas */}
                    {comment.replies && comment.replies.length > 0 && (
                        <div className="replies-list">
                            {comment.replies.map((reply) => (
                                <div key={reply.id} className="reply-item">
                                    <span className="reply-avatar">{reply.avatar}</span>
                                    <div className="reply-content">
                                        <h5 className="reply-author">{reply.author}</h5>
                                        <p className="reply-text">{reply.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ListComments;
