import styles from "./Popup.module.css";

import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

function Popup({ children, ref, onClose }) {
    const dialogRef = useRef(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            dialogRef.current.showModal();
        },
    }));

    return createPortal(
        <dialog className={styles.dialog} ref={dialogRef} onClose={onClose}>
            {children}
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("popup")
    );
}

export default Popup;
