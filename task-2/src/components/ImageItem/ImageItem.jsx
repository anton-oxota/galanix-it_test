import styles from "./ImageItem.module.css";

function ImageItem({ src, alt }) {
    return <img className={styles.img} src={src} alt={alt} />;
}

export default ImageItem;
