import { useEffect, useState } from 'react';
import styles from './AddMemberForm.module.css'
import Modal from '../../../../../../UI/Modal';
import useHttp from '../../../../../../../hooks/useHttp';
import { useRouteMatch } from 'react-router-dom';

const AddMemberForm = (props) => {
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
            let userFilter = res.filter(user => {
                let flag = true;
                props.projectMembers.map(member => {
                    if (member._id === user._id) {
                        flag = false;
                    }
                })
                return flag;
            })
            setAllUsers(userFilter);
        })
    }, [])

    const onSubmitFormHandler = async (event) => {
        event.preventDefault();
        let httpInfo = {
            url: `/projects/users/${match.params.projectId}`,
            method: 'POST',
            body: newMembers,
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(res => {
            props.addNewMemberHandler(res);
        })
        props.closeMemberFormModal();
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
                                <label htmlFor={user._id} className={styles.formControl}>{`${user.username} ${user.surname}`}</label>
                                <input type="checkbox" name={user.username} id={user._id} onChange={onCheckboxMember} />
                            </li>
                        ))}
                    </ul>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default AddMemberForm;