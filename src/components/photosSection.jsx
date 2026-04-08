import { useContext } from "react";
import { PostContext } from "../context/PostContext";

const PhotosSection = () => {
    const { photos } = useContext(PostContext);

    return (
        <div className="photos-section-container">
            <div className="section-header">
                <h2>📸 Fotos</h2>
                <button className="see-all-btn">Ver todas</button>
            </div>

            <div className="photos-grid">
                {photos.map(photo => (
                    <div key={photo.id} className="photo-item">
                        <img src={photo.image} alt={photo.title} />
                        <div className="photo-overlay">
                            <div className="photo-info">
                                <h3>{photo.title}</h3>
                                <p>{photo.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotosSection;
