import { useContext } from "react";
import { PostContext } from "../context/PostContext";

const ProfileHeader = () => {
    const { profile } = useContext(PostContext);

    return (
        <div className="profile-header">
            {/* Cover Photo */}
            <div className="cover-photo">
                <img src={profile.coverImage} alt="Portada" />
                <button className="edit-cover-btn">📷 Cambiar portada</button>
            </div>

            {/* Profile Info Section */}
            <div className="profile-info-section">
                <div className="profile-pic-container">
                    <div className="profile-picture">
                        <span className="profile-pic-emoji">{profile.profilePicture}</span>
                    </div>
                    <button className="edit-pic-btn">📷</button>
                </div>

                <div className="profile-details">
                    <h1 className="profile-name">{profile.name}</h1>
                    <p className="profile-bio">{profile.bio}</p>

                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-number">{profile.followers}</span>
                            <span className="stat-label">Seguidores</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{profile.following}</span>
                            <span className="stat-label">Siguiendo</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{profile.friends}</span>
                            <span className="stat-label">Amigos</span>
                        </div>
                    </div>
                </div>

                <div className="profile-actions">
                    <button className="action-btn primary">➕ Agregar amigo</button>
                    <button className="action-btn">✉️ Mensaje</button>
                    <button className="action-btn">⋯ Más</button>
                </div>
            </div>

            {/* Profile Navigation */}
            <div className="profile-nav">
                <button className="nav-link active">📰 Publicaciones</button>
                <button className="nav-link">📸 Fotos</button>
                <button className="nav-link">👫 Amigos</button>
                <button className="nav-link">ℹ️ Información</button>
            </div>
        </div>
    );
};

export default ProfileHeader;
