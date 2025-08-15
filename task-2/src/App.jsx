import imgData from "./img-data";
import ImageItem from "./components/ImageItem/ImageItem";
import Time from "./components/Time/Time";

function App() {
    return (
        <>
            <Time />
            <div className="container">
                {imgData.map((imgInfo) => (
                    <ImageItem key={imgInfo.alt} {...imgInfo} />
                ))}
            </div>
        </>
    );
}

export default App;
