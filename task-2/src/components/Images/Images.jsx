import styles from "./Images.module.css";

import ImageItem from "../ImageItem/ImageItem";
import { ImageContext } from "../../context/image-context";
import { use } from "react";

function Images() {
    const { images } = use(ImageContext);

    return (
        <div className={styles.images}>
            {images.map((imgInfo) => (
                <ImageItem key={imgInfo.alt} {...imgInfo} />
            ))}
        </div>
    );
}

export default Images;
