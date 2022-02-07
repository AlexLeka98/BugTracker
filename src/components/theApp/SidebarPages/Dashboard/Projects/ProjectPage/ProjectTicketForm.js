import { useRef } from 'react';
import styles from './ProjectTicketAndTeamForm.module.css'
import Modal from '../../../../../UI/Modal';
import useHttp from '../../../../../../hooks/useHttp';
import { useRouteMatch } from 'react-router-dom';

const ProjectTicketForm = (props) => {
    const { httpRequest } = useHttp()
    const enteredTitle = useRef();
    const enteredDescription = useRef();
    const enteredAuthor = useRef();
    const enteredType = useRef();
    const eneteredStatus = useRef();

    const match = useRouteMatch();


    const onSubmitFormHandler = async (event) => {
        event.preventDefault();
        let newTicket = {
            title: enteredTitle.current.value,
            description: enteredDescription.current.value,
            author: enteredAuthor.current.value,
            type: enteredType.current.value,
            status: eneteredStatus.current.value,
        }
        let httpInfo = {
            url: `/projects/ticket/${match.params.id}`,
            method: 'POST',
            body: newTicket,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(res => {
            props.addNewTicketHandler({ ...res, key: res._id });
        })
        enteredTitle.current.value = '';
        enteredDescription.current.value = '';
        enteredAuthor.current.value = '';
        enteredType.current.value = '';
        eneteredStatus.current.value = '';
        props.closeTicketFormModal();
    }


    return (
        <Modal onModalHandler={props.closeTicketFormModal}>
            <div className={styles.formContainer}>
                <form className={styles.formStyle} onSubmit={onSubmitFormHandler}>
                    <h2 className={styles.formHeader}>New Ticket</h2>
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
                        <input type='text' placeholder='type' ref={enteredType} />
                    </div>
                    <div>
                        <label>Status</label>
                        <input type='text' placeholder='status' ref={eneteredStatus} />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ProjectTicketForm;