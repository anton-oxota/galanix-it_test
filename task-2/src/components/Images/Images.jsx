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
            <div className={styles.images}>
                {images.map((imgInfo) => (
                    <ImageItem key={imgInfo.alt} {...imgInfo} />
                ))}
            </div>

            <button onClick={handleResetImages}>Reset Images</button>

            <Popup ref={dialogRef} onClose={handleCloseImage}>
                {selectedImage && (
                    <img src={selectedImage.src} alt={selectedImage.alt} />
                )}
            </Popup>
        </>
    );
}

export default Images;
