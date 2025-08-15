import { createContext, useState } from "react";
import imgData from "../img-data";

const ImageContext = createContext({
    images: [],
    selectedImage: {},
    handleOpenImage: () => {},
    handleCloseImage: () => {},
});

function ImageContextProvider({ children }) {
    const [images, setImages] = useState(imgData);
    const [selectedImage, setSelectedImage] = useState(null);

    function handleOpenImage(imageId) {
        const image = images.find((img) => img.id === imageId);
        setSelectedImage(image);
    }

    function handleCloseImage() {
        setSelectedImage(null);
    }

    const ctxValue = {
        images,
        selectedImage,
        handleOpenImage,
        handleCloseImage,
    };

    return <ImageContext value={ctxValue}>{children}</ImageContext>;
}

export default ImageContextProvider;
export { ImageContext };
