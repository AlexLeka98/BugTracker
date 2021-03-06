
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import styles from './Administration.module.scss'
import useHttp from '../../../../hooks/useHttp';
import DashboardPanel from '../../../UI/DashboardPanel';
import DashboardItem from '../../../UI/DashboardItem';
import AddNewUserForm from './AddNewUserForm';
import AuthContext from '../../../../store/auth-context';
import BugTrackHeader from '../BugTrackHeader';

const Administration = () => {
    const { httpRequest, isLoading, error } = useHttp();
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ username: '', surname: '' })
    const [addNewUserFormIsOpen, setAddNewUserFormIsOpen] = useState(false);
    const [showUserForm, setShowUserForm] = useState(false);
    const [page, setPage] = useState(0);
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
        setShowUserForm(true);
        setSelectedUser(data);
    }

    useEffect(() => {
        if (showUserForm) {
            nameRef.current.value = selectedUser.username;
            surnameRef.current.value = selectedUser.surname;
            emailRef.current.value = selectedUser.email;
            authorizRef.current.value = selectedUser.authority;
            phoneRef.current.value = selectedUser.phone;
        }
    }, [showUserForm, selectedUser])


    const deleteUser = (user) => {

        let httpInfo = {
            url: '/users',
            method: 'DELETE',
            body: { id: selectedUser._id },
            headers: {
                'Content-Type': 'application/json'
            },
        }
        console.log('SELECTED USER: ', selectedUser);
        httpRequest(httpInfo).then(res => {
            let authHttpInfo = {
                url: `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${authCtx.firebaseKey}`,
                method: 'POST',
                body: {
                    idToken: selectedUser.idToken,
                },
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            httpRequest(authHttpInfo);
        })
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

    const onChangePage = (page) => {
        if (page >= 0 && page <= Math.ceil(allUsers.length / 5 - 1)) {
            setPage(page);
        }
    }

    const panelData1 = [{ title: 'Users', width: 50 }, { title: 'Authority', width: 45 }];

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
        setShowUserForm(prevState => !prevState);
    }
    return (
        <Fragment>
            <BugTrackHeader>Administration</BugTrackHeader>
            <div className={styles.administrationContainer}>
                <div className={styles.organizationPanel}>


                    <DashboardPanel
                        name='Organization'
                        buttonName='New User'
                        panelData={panelData1}
                        onClick={toggleAddNewUserForm}
                        pages={Math.ceil(allUsers.length / 5)}
                        onChangePage={onChangePage}
                        page={page}>
                        {allUsers && allUsers.length > 0 && allUsers.slice(page * 5, (page + 1) * 5).map(user => {
                            let rowData = [
                                { value: `${user.username} ${user.surname}`, width: 45 },
                                { value: `${user.authority}`, width: 45 },
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
                        {showUserForm && !isLoading &&
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
                        {!showUserForm && <h5 className={styles.selectUserMessage}>Select a user</h5>}
                        {isLoading && <div className='loader'></div>}
                    </DashboardPanel>
                </div>
            </div>
        </Fragment>
    )
}

export default Administration;