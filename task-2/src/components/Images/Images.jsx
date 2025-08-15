import styles from "./Images.module.css";

import { use, useRef } from "react";
import { ImageContext } from "../../context/image-context";

import ImageItem from "../ImageItem/ImageItem";
import Popup from "../Popup/Popup";

function Images() {
    const dialogRef = useRef(null);
    const { images, selectedImage, handleCloseImage, handleResetImages } =
        use(ImageContext);

    if (selectedImage) {
        dialogRef.current.open();
    }

    return (
        <>
            {/* Images Container */}
            <div className={styles.images}>
                {images.map((imgInfo) => (
                    <ImageItem key={imgInfo.alt} {...imgInfo} />
                ))}
            </div>

            {/* Reset Images Button */}
            <button className={styles.resetButton} onClick={handleResetImages}>
                Reset Images
            </button>

            <Popup ref={dialogRef} onClose={handleCloseImage}>
                {selectedImage && (
                    <img
                        className={styles.bigImage}
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                    />
                )}
            </Popup>
        </>
    );
}

export default Images;
