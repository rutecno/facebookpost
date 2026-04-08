import { createContext, useState, useRef } from 'react';

export const PostContext = createContext();

// Función para generar IDs únicos
const generateUniqueId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const PostProvider = ({ children }) => {
    const commentIdRef = useRef(3);
    const replyIdRef = useRef(1);

    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "Comunidad Futbolera",
            avatar: "👨‍💼",
            title: "¡Viva el Fútbol!",
            content: "Este es un magnífico evento que reúne a los mejores equipos del mundo. Anímate a participar.",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/2026_FIFA_World_Cup_emblem.svg/960px-2026_FIFA_World_Cup_emblem.svg.png",
            likes: 0,
            comments: [
                {
                    id: 1,
                    author: "Juan",
                    avatar: "👨",
                    text: "Que viva el fútbol",
                    likes: 0,
                    replies: []
                },
                {
                    id: 2,
                    author: "María",
                    avatar: "👩",
                    text: "Quien para llenar el álbum del mundial?",
                    likes: 0,
                    replies: []
                }
            ],
            shares: 0,
            timestamp: new Date().toLocaleString()
        }
    ]);

    // Agregar like al post
    const addLikeToPost = (postId) => {
        setPosts(posts.map(post => 
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    // Agregar comentario al post
    const addCommentToPost = (postId, comment) => {
        const newId = commentIdRef.current++;
        setPosts(posts.map(post => 
            post.id === postId 
                ? {
                    ...post,
                    comments: [
                        ...post.comments,
                        {
                            id: newId,
                            author: "Nuevo Usuario",
                            avatar: "👤",
                            text: comment,
                            likes: 0,
                            replies: []
                        }
                    ]
                }
                : post
        ));
    };

    // Agregar respuesta a comentario
    const addReplyToComment = (postId, commentId, reply) => {
        const newReplyId = replyIdRef.current++;
        setPosts(posts.map(post => 
            post.id === postId 
                ? {
                    ...post,
                    comments: post.comments.map(comment =>
                        comment.id === commentId
                            ? {
                                ...comment,
                                replies: [
                                    ...comment.replies,
                                    {
                                        id: newReplyId,
                                        author: "Nuevo Usuario",
                                        avatar: "👤",
                                        text: reply,
                                        likes: 0
                                    }
                                ]
                            }
                            : comment
                    )
                }
                : post
        ));
    };

    // Agregar like a comentario
    const addLikeToComment = (postId, commentId) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? {
                    ...post,
                    comments: post.comments.map(comment =>
                        comment.id === commentId
                            ? { ...comment, likes: comment.likes + 1 }
                            : comment
                    )
                }
                : post
        ));
    };

    // Compartir post
    const sharePost = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, shares: post.shares + 1 } : post
        ));
    };

    const value = {
        posts,
        addLikeToPost,
        addCommentToPost,
        addReplyToComment,
        addLikeToComment,
        sharePost
    };

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};
