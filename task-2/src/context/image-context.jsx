import { createContext, useState } from "react";
import imgData from "../img-data";

const ImageContext = createContext({ images: [] });

function ImageContextProvider({ children }) {
    const [images, setImages] = useState(imgData);

    const ctxValue = {
        images,
    };

    return <ImageContext value={ctxValue}>{children}</ImageContext>;
}

export default ImageContextProvider;
export { ImageContext };
