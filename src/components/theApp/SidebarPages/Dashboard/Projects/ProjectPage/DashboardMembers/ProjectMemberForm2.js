import { useEffect, useRef, useState } from 'react';
// import styles from '../ProjectTicketAndMemberForm.module.css'
import styles from './ProjectMemberForm2.module.css'
import Modal from '../../../../../../UI/Modal';
import useHttp from '../../../../../../../hooks/useHttp';
import { useRouteMatch } from 'react-router-dom';

const ProjectMemberForm2 = (props) => {
    const { httpRequest } = useHttp()
    const [newMembers, setNewMembers] = useState([])
    const [allUsers, setAllUsers] = useState(null);

    const match = useRouteMatch();


    //Get all users from db.
    useEffect(() => {
        let httpInfo = {
            url: `/users`,
        }
        httpRequest(httpInfo).then(res => {
            setAllUsers(res);
        })
    }, [])


    // console.log("All users:   ", allUsers);
    // console.log("All project members users:    ", props.projectMembers);
    const onSubmitFormHandler = async (event) => {
        event.preventDefault();

        console.log(newMembers);

        let httpInfo = {
            url: `/projects/users/${match.params.id}`,
            method: 'POST',
            body: newMembers,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(res => {
            props.addNewMemberHandler(res);
        })
        // enteredName.current.value = '';
        // enteredEmail.current.value = '';
        // enteredPhone.current.value = '';
        // enteredAuthority.current.value = '';
        // props.closeMemberFormModal();

        // Delete user from newUsers state
    }


    const onCheckboxMember = (event) => {
        if (event.target.checked) {
            setNewMembers(memberList => {
                return [...memberList, { id: event.target.id }];
            });
        }
        else {
            setNewMembers(memberList => {
                return memberList.filter(member => member.id !== event.target.id);
            });
        }
    }


    return (
        <Modal onModalHandler={props.closeMemberFormModal}>
            <div className={styles.formContainer}>
                <form className={styles.formStyle} onSubmit={onSubmitFormHandler}>
                    <h2 className={styles.formHeader}>New Member</h2>
                    <ul>
                        {allUsers && allUsers.map(user => (
                            <li>
                                <label htmlFor={user._id} className={styles.formControl}>{`${user.name} ${user.surname}`}</label>
                                <input type="checkbox" name={user.name} id={user._id} onChange={onCheckboxMember} />
                            </li>
                        ))}
                    </ul>
                    {/* <div>
                        <label className={styles.formControl}>Mario Leka</label>
                        <input type="checkbox" name="Mario" onChange={onCheckboxMember} />
                    </div> */}

                    {/* <div>
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
                    </div> */}
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ProjectMemberForm2;