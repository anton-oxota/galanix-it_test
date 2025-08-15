import Images from "./components/Images/Images";
import Info from "./components/Info/Info";
import ImageContextProvider from "./context/image-context";

function App() {
    return (
        <ImageContextProvider>
            <div className="container">
                <Info />
                <Images />
            </div>
        </ImageContextProvider>
    );
}

export default App;
