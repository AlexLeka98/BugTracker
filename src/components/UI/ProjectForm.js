import { useRef } from 'react';
import useHttp from '../../hooks/useHttp';
import styles from './ProjectForm.module.css'
import Modal from './Modal';

const ProjectForm = (props) => {
    const { httpRequest } = useHttp()
    const enteredTitle = useRef();
    const enteredDescription = useRef();
    const enteredAuthor = useRef();

    const onSubmitFormHandler = async (event) => {
        event.preventDefault();

        let newProject = {
            title: enteredTitle.current.value,
            description: enteredDescription.current.value,
            author: enteredAuthor.current.value,
        }
        let httpInfo = {
            url: '/projects',
            method: 'POST',
            body: newProject,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo)

        enteredTitle.current.value = '';
        enteredDescription.current.value = '';
        enteredAuthor.current.value = '';
    }


    return (
        <Modal onModalHandler={props.closeFormModal}>
            <div className={styles.formContainer}>
                <form className={styles.formStyle} onSubmit={onSubmitFormHandler}>
                    <div>
                        <label>Title</label>
                        <input type='text' placeholder='title' ref={enteredTitle} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input type='text' placeholder='descripton' ref={enteredDescription} />
                    </div>
                    <div>
                        <label>Author</label>
                        <input type='text' placeholder='author' ref={enteredAuthor} />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ProjectForm;