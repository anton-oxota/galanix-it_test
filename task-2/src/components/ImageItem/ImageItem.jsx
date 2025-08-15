import { use } from "react";
import { ImageContext } from "../../context/image-context";
import styles from "./ImageItem.module.css";

function ImageItem({ src, alt, id }) {
    const { handleOpenImage } = use(ImageContext);

    return (
        <img
            onClick={() => handleOpenImage(id)}
            className={styles.img}
            src={src}
            alt={alt}
        />
    );
}

export default ImageItem;
