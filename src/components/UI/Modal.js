import styles from './Modal.module.css';
import { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';


const Backdrop = () => {
    return <div className={styles.backfrop} />
}

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <button onClick={props.onModalHandler} className={styles.closeModal}></button>
            <div className={styles.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    const modalIsOpen = true;
    return (
        <Fragment>
            {/* This is how you do it without portal 
            <Backdrop></Backdrop>
            <ModalOverlay>{props.children}</ModalOverlay> */}
            {modalIsOpen && ReactDOM.createPortal(<Backdrop />, portalElement)}
            {modalIsOpen && ReactDOM.createPortal(<ModalOverlay onModalHandler={props.onModalHandler}>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}






export default Modal;