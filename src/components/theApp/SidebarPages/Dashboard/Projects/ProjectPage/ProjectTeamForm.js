import { useRef } from 'react';
import styles from './ProjectTicketAndTeamForm.module.css'
import Modal from '../../../../../UI/Modal';
import useHttp from '../../../../../../hooks/useHttp';

const ProjectTeamForm = (props) => {
    const { httpRequest } = useHttp()
    const enteredTitle = useRef();
    const enteredDescription = useRef();
    const enteredAuthor = useRef();
    const enteredType = useRef();

    const onSubmitFormHandler = async (event) => {
        event.preventDefault();
        let newProject = {
            title: enteredTitle.current.value,
            description: enteredDescription.current.value,
            author: enteredAuthor.current.value,
            type: enteredType.current.value,
        }
        let httpInfo = {
            url: '/projects',
            method: 'POST',
            body: newProject,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(res => {
            props.onAddNewMember({ ...res, key: res._id });
        })
        enteredTitle.current.value = '';
        enteredDescription.current.value = '';
        enteredAuthor.current.value = '';
        enteredType.current.value = '';
        props.closeTeamFormModal();
    }


    return (
        <Modal onModalHandler={props.closeTeamFormModal}>
            <div className={styles.formContainer}>
                <form className={styles.formStyle} onSubmit={onSubmitFormHandler}>
                    <h2 className={styles.formHeader}>New Member</h2>
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
                    <div>
                        <label>Type</label>
                        <input type='text' placeholder='author' ref={enteredType} />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ProjectTeamForm;