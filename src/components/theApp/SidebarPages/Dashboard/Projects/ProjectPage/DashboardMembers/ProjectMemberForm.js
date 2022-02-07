import { useRef } from 'react';
import styles from '../ProjectTicketAndMemberForm.module.css'
import Modal from '../../../../../../UI/Modal';
import useHttp from '../../../../../../../hooks/useHttp';
import { useRouteMatch } from 'react-router-dom';

const ProjectMemberForm = (props) => {
    const { httpRequest } = useHttp()
    const enteredName = useRef();
    const enteredEmail = useRef();
    const enteredPhone = useRef();
    const enteredAuthority = useRef();

    const match = useRouteMatch();

    const onSubmitFormHandler = async (event) => {
        event.preventDefault();
        let newMember = {
            name: enteredName.current.value,
            email: enteredEmail.current.value,
            phone: enteredPhone.current.value,
            authority: enteredAuthority.current.value,
        }
        let httpInfo = {
            url: `/projects/users/${match.params.id}`,
            method: 'POST',
            body: newMember,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(res => {
            props.addNewMemberHandler(res);
        })
        enteredName.current.value = '';
        enteredEmail.current.value = '';
        enteredPhone.current.value = '';
        enteredAuthority.current.value = '';
        props.closeMemberFormModal();
    }


    return (
        <Modal onModalHandler={props.closeMemberFormModal}>
            <div className={styles.formContainer}>
                <form className={styles.formStyle} onSubmit={onSubmitFormHandler}>
                    <h2 className={styles.formHeader}>New Member</h2>
                    <div>
                        <label>Name</label>
                        <input type='text' placeholder='name' ref={enteredName} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type='text' placeholder='email' ref={enteredEmail} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input type='number' placeholder='phone' ref={enteredPhone} />
                    </div>
                    <div>
                        <label>Authority</label>
                        <input type='text' placeholder='authority' ref={enteredAuthority} />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ProjectMemberForm;