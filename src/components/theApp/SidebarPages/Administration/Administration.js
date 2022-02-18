
import { Fragment, useContext, useRef, useState } from 'react';
import styles from './Administration.module.css'
import useHttp from '../../../../hooks/useHttp';
import DashboardPanel from '../../../UI/DashboardPanel';
import DashboardItem from '../../../UI/DashboardItem';
import AddNewUserForm from './AddNewUserForm';
import EditUserForm from './EditUserForm';
import AuthContext from '../../../../store/auth-context';

const Administration = () => {
    const { httpRequest, isLoading, error } = useHttp();
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ username: '', surname: '' })
    const [addNewUserFormIsOpen, setAddNewUserFormIsOpen] = useState(false);
    const nameRef = useRef();
    const surnameRef = useRef();
    const phoneRef = useRef();
    const authorizRef = useRef();
    const emailRef = useRef();
    
    const authCtx = useContext(AuthContext);


    useState(() => {
        let httpInfo = {
            url: '/users'
        }
        httpRequest(httpInfo).then(users => {
            setAllUsers(users)
        })
    }, [])

    const selectAUser = (data) => {
        nameRef.current.value = data.username;
        surnameRef.current.value = data.surname;
        emailRef.current.value = data.email;
        authorizRef.current.value = data.authority;
        phoneRef.current.value = data.phone;
        setSelectedUser(data);
    }
    const deleteUser = (user) => {
        let httpInfo = {
            url: '/users',
            method: 'DELETE',
            body: { id: selectedUser._id },
            headers: {
                'Content-Type': 'application/json'
            },
        }
        httpRequest(httpInfo);
        removeUserFromState(selectedUser._id);
    }

    const addUserToState = (newUser) => {
        setAllUsers(prevUsers => {
            return [...prevUsers, newUser];
        })
    }

    const removeUserFromState = (id) => {
        setAllUsers(prevUsers => {
            const newUsers = prevUsers.filter(user => {
                if (user._id !== id) return user;
            })
            return newUsers;
        })
    }

    const toggleAddNewUserForm = () => {
        setAddNewUserFormIsOpen(prevState => (!prevState));
    }

    const updateAllUsers = (newUser) => {
        setAllUsers(prevUsers => {
            let updatedUsers = prevUsers.map(user => {
                if (user._id === newUser._id) {
                    return newUser
                }
                return user;
            })
            return updatedUsers;
        })
    }

    const panelData1 = [{ title: 'Users', width: 95 }];

    const submitUserChanges = (event) => {
        event.preventDefault();
        let data = {
            username: nameRef.current.value,
            surname: surnameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            authority: authorizRef.current.value,
        }
        let httpInfo = {
            url: `/users/${selectedUser._id}`,
            method: 'PUT',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        }
        httpRequest(httpInfo).then(res => {
            updateAllUsers(res)
        })
    }
    return (
        <Fragment>
            <h1 className={styles.administrationTitle}>Administration</h1>
            <div className={styles.administrationContainer}>
                <div className={styles.organizationPanel}>


                    <DashboardPanel
                        name='Organization'
                        buttonName='New User'
                        panelData={panelData1}
                        onClick={toggleAddNewUserForm}>
                        {allUsers && allUsers.length > 0 && allUsers.map(user => {
                            let rowData = [
                                { value: `${user.username} ${user.surname}`, width: 95 },
                            ]
                            return (
                                <DashboardItem
                                    rowData={rowData}
                                    key={user._id}
                                    id={user._id}
                                    item={user}
                                    className={styles.hoverColor}
                                    // onRemoveItem={removeProjectHandler}
                                    onClickItem={selectAUser}
                                />
                            )
                        })}
                        {isLoading && <div className="loader" style={{ marginTop: '30px' }}></div>}
                    </DashboardPanel>
                    {addNewUserFormIsOpen && <AddNewUserForm toggleAddNewUserForm={toggleAddNewUserForm} addUserToState={addUserToState} />}
                </div>
                <div className={styles.editUser}>
                    <DashboardPanel
                        name='Edit User Information'
                        buttonName='Remove User'
                        onClick={deleteUser}
                        panelData={[
                            {
                                title: `${selectedUser.username} ${selectedUser.surname}`,
                                width: 95
                            },
                        ]}>
                        {selectedUser && !isLoading &&
                            <form className={styles.formStyle} onSubmit={submitUserChanges}>
                                <div className={styles.formRow}>
                                    <div>
                                        <label htmlFor='name'>First Name</label>
                                        <input type='text' id='name' ref={nameRef} />
                                    </div>
                                    <div>
                                        <label htmlFor='surname'>Last Name</label>
                                        <input type='text' id='surname' ref={surnameRef} />
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div>
                                        <label htmlFor='phone'>Phone</label>
                                        <input type='text' id='phone' ref={phoneRef} />
                                    </div>
                                    <div>
                                        <label htmlFor='authoriz'>Authorization Level</label>
                                        <select name='authority' ref={authorizRef}>
                                            <option disabled selected value> -- select an option -- </option>
                                            <option value='admin'>Admin</option>
                                            <option value='developer'>Developer</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.lastRow}>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' id='email' ref={emailRef} />
                                </div>
                                <button>Submit</button>
                            </form>
                        }
                        {isLoading && <div className='loader'></div>}
                    </DashboardPanel>
                </div>
            </div>
        </Fragment>
    )
}

export default Administration;