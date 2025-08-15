import { use } from "react";
import Time from "../Time/Time";
import { ImageContext } from "../../context/image-context";

function Info() {
    const { images } = use(ImageContext);

    return (
        <>
            <p>Tolat images: {images.length}</p>
            <Time />
        </>
    );
}

export default Info;
