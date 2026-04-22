import { createContext, useState, useRef, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const postIdRef = useRef(2);
    const commentIdRef = useRef(3);
    const replyIdRef = useRef(1);

    const [profile, setProfile] = useState({
        name: "Carlos Rodríguez",
        bio: "Amante del fútbol, viajes y tecnología 🌍⚽💻",
        coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=400&fit=crop",
        profilePicture: "👨‍💼",
        followers: 1543,
        following: 523,
        friends: 287
    });

    const [photos, setPhotos] = useState([
        {
            id: 1,
            title: "Viaje en Marruecos",
            image: "https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=300&h=300&fit=crop",
            date: "Marzo 2026"
        },
        {
            id: 2,
            title: "Partido de Fútbol",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop",
            date: "Febrero 2026"
        },
        {
            id: 3,
            title: "Reunión con Amigos",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop",
            date: "Enero 2026"
        },
        {
            id: 4,
            title: "Paisaje Natural",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
            date: "Diciembre 2025"
        }
    ]);

    const [posts, setPosts] = useState([
        {
            id: 1,
            author: profile.name,
            avatar: profile.profilePicture,
            content: "¡Qué día tan increíble en el partido de hoy! El equipo jugó de maravilla 🎉⚽",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=550&h=400&fit=crop",
            likes: 42,
            comments: [
                {
                    id: 1,
                    author: "Juan Pérez",
                    avatar: "👨",
                    text: "¡Excelente desempeño! ¿A qué hora es el próximo?",
                    likes: 5,
                    replies: []
                },
                {
                    id: 2,
                    author: "María García",
                    avatar: "👩",
                    text: "¡Felicidades! Se veía increíble",
                    likes: 3,
                    replies: []
                }
            ],
            shares: 8,
            timestamp: "Hace 3 horas"
        },
        {
            id: 2,
            author: profile.name,
            avatar: profile.profilePicture,
            content: "Disfrutando de un hermoso atardecer con los amigos. ¡La vida es bella! 🌅",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=550&h=400&fit=crop",
            likes: 87,
            comments: [
                {
                    id: 3,
                    author: "Ana López",
                    avatar: "👩‍🦰",
                    text: "¡Qué hermoso atardecer! Me encanta ese lugar",
                    likes: 12,
                    replies: []
                }
            ],
            shares: 15,
            timestamp: "Hace 1 día"
        }
    ]);

    // Crear nuevo post
    const createNewPost = (content, image = null) => {
        const newPost = {
            id: postIdRef.current++,
            author: profile.name,
            avatar: profile.profilePicture,
            content: content,
            image: image,
            likes: 0,
            comments: [],
            shares: 0,
            timestamp: "Hace unos segundos"
        };
        setPosts([newPost, ...posts]);
    };

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
                            author: user ? user.username : "Usuario",
                            avatar: user ? user.avatar : "👤",
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
                                        author: user ? user.username : "Usuario",
                                        avatar: user ? user.avatar : "👤",
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
        profile,
        photos,
        posts,
        createNewPost,
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
