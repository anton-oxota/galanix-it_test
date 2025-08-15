import styles from "./ImageItem.module.css";

import closeIconSrc from "../../assets/close-icon.svg";

import { use } from "react";
import { ImageContext } from "../../context/image-context";

function ImageItem({ src, alt, id }) {
    const { handleOpenImage, handleDeleteImage } = use(ImageContext);

    return (
        <div className={styles.imageItem}>
            <img
                tabIndex={1}
                onClick={() => handleOpenImage(id)}
                className={styles.img}
                src={src}
                alt={alt}
            />

            <button
                className={styles.deleteButton}
                onClick={() => handleDeleteImage(id)}
            >
                <img src={closeIconSrc} alt="" />
            </button>
        </div>
    );
}

export default ImageItem;
