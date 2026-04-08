import { useState } from "react";

const CommentForm = ({ onAddComment }) => {
    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onAddComment(comment);
            setComment("");
        }
    };

    return (
        <div className="comment-form-container">
            <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                    className="comment-input"
                    placeholder="Escribe un comentario..."
                    value={comment}
                    onChange={handleCommentChange}
                    rows="3"
                />
                <button type="submit" className="comment-submit-btn">
                    Comentar
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
