import { createContext, useState } from "react";
import imgData from "../img-data";

// Utils
function setLocalImages(data) {
    localStorage.setItem("images", JSON.stringify(data));
}

function getLocalImages() {
    const images = localStorage.getItem("images");
    return JSON.parse(images) || imgData;
}

const ImageContext = createContext({
    images: [],
    selectedImage: {},
    handleOpenImage: () => {},
    handleCloseImage: () => {},
    handleDeleteImage: () => {},
    handleResetImages: () => {},
});

const initialImages = getLocalImages();

function ImageContextProvider({ children }) {
    const [images, setImages] = useState(initialImages);
    const [selectedImage, setSelectedImage] = useState(null);

    function handleOpenImage(imageId) {
        const image = images.find((img) => img.id === imageId);
        setSelectedImage(image);
    }

    function handleCloseImage() {
        setSelectedImage(null);
    }

    function handleDeleteImage(imageId) {
        setImages((prevImages) => {
            const newImages = prevImages.filter((img) => img.id !== imageId);
            setLocalImages(newImages);
            return newImages;
        });
    }

    function handleResetImages() {
        setImages(imgData);
        setLocalImages(imgData);
    }

    const ctxValue = {
        images,
        selectedImage,
        handleOpenImage,
        handleCloseImage,
        handleDeleteImage,
        handleResetImages,
    };

    return <ImageContext value={ctxValue}>{children}</ImageContext>;
}

export default ImageContextProvider;
export { ImageContext };
