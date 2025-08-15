import imgData from "./img-data";
import ImageItem from "./components/ImageItem/ImageItem";

function App() {
    return (
        <div className="container">
            {imgData.map((imgInfo) => (
                <ImageItem key={imgInfo.alt} {...imgInfo} />
            ))}
        </div>
    );
}

export default App;
