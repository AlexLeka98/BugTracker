import { useEffect, useRef } from 'react';
import styles from './AddTicketForm.module.css'
import Modal from '../../../../../../UI/Modal';
import useHttp from '../../../../../../../hooks/useHttp';
import { useRouteMatch } from 'react-router-dom';

const UpdateTicketForm = (props) => {
    const { httpRequest } = useHttp()
    const enteredTitle = useRef();
    const enteredDescription = useRef();
    const enteredAuthor = useRef();
    const enteredType = useRef();
    const eneteredStatus = useRef();
    const { ticket } = props;
    const match = useRouteMatch();


    useEffect(() => {
        enteredTitle.current.value = ticket.title;
        enteredDescription.current.value = ticket.description;
        enteredAuthor.current.value = ticket.author;
        enteredType.current.value = ticket.type;
        eneteredStatus.current.value = ticket.status;
    })


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
            url: `/tickets/${ticket._id}`,
            method: 'PUT',
            body: newTicket,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(res => {
            props.updateTicketHandler(res);
        })
        enteredTitle.current.value = '';
        enteredDescription.current.value = '';
        enteredAuthor.current.value = '';
        enteredType.current.value = '';
        eneteredStatus.current.value = '';
        props.toggleUpdateTicketFormModal();
    }


    return (
        <Modal onModalHandler={props.toggleUpdateTicketFormModal}>
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

export default UpdateTicketForm;