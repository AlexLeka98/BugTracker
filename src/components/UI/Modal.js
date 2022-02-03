import styles from './Modal.module.css';
import { Fragment } from 'react';
import ReactDOM from 'react-dom';


const Backdrop = (props) => {
    return <div className={styles.backfrop} />
}

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {/* This is how you do it without portal 
            <Backdrop></Backdrop>
            <ModalOverlay>{props.children}</ModalOverlay> */}
            {ReactDOM.createPortal(<Backdrop />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}






export default Modal;