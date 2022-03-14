import { useEffect, useRef, useState } from 'react';
import useHttp from '../../../../../hooks/useHttp';
import styles from './ProjectForm.module.css'
import Modal from '../../../../UI/Modal';

const ProjectForm = (props) => {
    const [allUsers, setAllUsers] = useState([]);
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
        console.log('New project: ', httpInfo);
        httpRequest(httpInfo).then(res => {
            props.onAddNewProject({ ...res, key: res._id });
        })
        enteredTitle.current.value = '';
        enteredDescription.current.value = '';
        enteredAuthor.current.value = '';
        props.closeFormModal();
    }

    useEffect(() => {
        let httpInfo = {
            url: '/users'
        }
        httpRequest(httpInfo).then(res => {
            setAllUsers(res);
        })
    }, [])
    return (
        <Modal onModalHandler={props.closeFormModal}>
            <div className={styles.formContainer}>

                <form className={styles.formStyle} onSubmit={onSubmitFormHandler}>
                    <h2 className={styles.formHeader}>New Project</h2>


                    <div className={styles.formRow}>
                        <div>
                            <label>Title</label>
                            <input type='text' placeholder='title' ref={enteredTitle} />
                        </div>
                        <div>
                            <label>Author</label>
                            <select name='author' ref={enteredAuthor}>
                                <option disabled selected value> -- select an option -- </option>
                                {allUsers.length > 0 && allUsers.map(user => (
                                    <option key={user._id} value={`${user.username} ${user.surname}`}>{`${user.username} ${user.surname}`}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div>
                            <label>Description</label>
                            <input type='text' placeholder='descripton' ref={enteredDescription} />
                        </div>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ProjectForm;