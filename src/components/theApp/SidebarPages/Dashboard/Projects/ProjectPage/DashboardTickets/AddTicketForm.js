import { useRef, useState, useEffect } from 'react';
import styles from './AddTicketForm.module.css'
import Modal from '../../../../../../UI/Modal';
import useHttp from '../../../../../../../hooks/useHttp';
import { useRouteMatch } from 'react-router-dom';


const AddTicketForm = (props) => {
    const { httpRequest } = useHttp()
    const enteredTitle = useRef();
    const enteredDescription = useRef();
    const enteredAuthor = useRef();
    const enteredType = useRef();
    const eneteredStatus = useRef();
    const enteredPriority = useRef();
    const eneteredDays = useRef();
    const eneteredHours = useRef();

    const [allUsers, setAllUsers] = useState([]);

    const match = useRouteMatch();


    const onSubmitFormHandler = async (event) => {
        event.preventDefault();
        const projectId = match.params.projectId;
        let newTicket = {
            title: enteredTitle.current.value,
            description: enteredDescription.current.value,
            author: enteredAuthor.current.value,
            priority: enteredPriority.current.value,
            type: enteredType.current.value,
            status: eneteredStatus.current.value,
            days: eneteredDays.current.value,
            hours: eneteredHours.current.value,
            projectId: projectId

        }
        let httpInfo = {
            url: `/projects/ticket/${projectId}`,
            method: 'POST',
            body: newTicket,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(res => {
            props.addNewTicketHandler(res);
        })
        enteredTitle.current.value = '';
        enteredDescription.current.value = '';
        enteredAuthor.current.value = '';
        enteredType.current.value = '';
        eneteredStatus.current.value = '';
        enteredPriority.current.value = '';
        eneteredDays.current.value = '';
        eneteredHours.current.value = '';
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
        <Modal onModalHandler={props.closeAddTicketFormModal}>
            <div className={styles.formContainer}>
                <form className={styles.formStyle} onSubmit={onSubmitFormHandler}>
                    <h2 className={styles.formHeader}>New Ticket</h2>


                    <div className={styles.formRow}>
                        <div>
                            <label>Title</label>
                            <input type='text' placeholder='title' ref={enteredTitle} />
                        </div>
                        <div>
                            <label>Author</label>
                            {/* <input type='text' placeholder='author' ref={enteredAuthor} /> */}
                            <select name='author' ref={enteredAuthor}>
                                <option disabled selected value> -- select an option -- </option>
                                {allUsers && allUsers.length > 0 && allUsers.map(user => (
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


                    <div className={styles.formRow}>
                        <div>
                            <label>Type</label>
                            <select name='type' ref={enteredType}>
                                <option disabled selected value> -- select an option -- </option>
                                <option value='issue'>Issue</option>
                                <option value='bug'>Bug</option>
                                <option value='feature_request'>Feature request</option>
                            </select>
                        </div>
                        <div>
                            <label>Status</label>
                            <select name='status' ref={eneteredStatus}>
                                <option disabled selected value> -- select an option -- </option>
                                <option value='new'>New</option>
                                <option value='in_progress'>In Progress</option>
                                <option value='resolved'>Resolved</option>
                            </select>

                        </div>
                        <div>
                            <label>Priority</label>
                            <select name='priority' ref={enteredPriority}>
                                <option disabled selected value> -- select an option -- </option>
                                <option value='immediate'>Immediate</option>
                                <option value='high'>High</option>
                                <option value='medium'>Medium</option>
                                <option value='low'>Low</option>
                            </select>
                        </div>
                    </div>


                    <div className={styles.formRow}>
                        <div>
                            <label>Days</label>
                            <input type='number' min='0' placeholder='days' ref={eneteredDays} />
                        </div>
                        <div>
                            <label>Hours</label>
                            <input type='number' min='0' placeholder='hours' ref={eneteredHours} />
                        </div>
                    </div>


                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default AddTicketForm;