
import { Fragment, useRef, useState } from 'react';
import styles from './Administration.module.css'
import useHttp from '../../../../hooks/useHttp';
import DashboardPanel from '../../../UI/DashboardPanel';
import DashboardItem from '../../../UI/DashboardItem';


const Administration = () => {
    const { httpRequest, isLoading, error } = useHttp();
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({ name: '', surname: '' })

    const nameRef = useRef();
    const surnameRef = useRef();
    const phoneRef = useRef();
    const authorizRef = useRef();
    const emailRef = useRef();

    useState(() => {
        let httpInfo = {
            url: '/users'
        }
        httpRequest(httpInfo).then(users => {
            setAllUsers(users)
        })
    }, [])

    const selectAUser = (data) => {
        nameRef.current.value = data.name;
        surnameRef.current.value = data.surname;
        emailRef.current.value = data.email;
        authorizRef.current.value = data.authority;
        phoneRef.current.value = data.phone;
        setSelectedUser(data);
    }
    const deleteUser = () => {
        console.log('We are about to delete this mfker!');
    }

    const updateAllUsers = (newUser) => {
        console.log('About to update the new user');
    }

    const panelData1 = [{ title: 'Users', width: 95 }];

    const submitUserChanges = (event) => {
        event.preventDefault();
        let data = {
            name: nameRef.current.value,
            surname: surnameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            authority: authorizRef.current.value,
        }
        console.log(data);
        let httpInfo = {
            url: `/users/${selectedUser._id}`,
            method: 'PUT',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        }
        httpRequest(httpInfo).then(res => {
            // setSelectedUser(res);
            console.log(res);
            updateAllUsers(res)
        })
        console.log(nameRef.current.value);
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
                        onClick={deleteUser}>
                        {allUsers && allUsers.length > 0 && allUsers.map(user => {
                            let rowData = [
                                { value: `${user.name} ${user.surname}`, width: 95 },
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

                </div>
                <div className={styles.editUser}>
                    <DashboardPanel
                        name='Edit User Information'
                        buttonName='Remove User'
                        panelData={[
                            {
                                title: `${selectedUser.name} ${selectedUser.surname}`,
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
                                        {/* <input type='text' id='authoriz' ref={authorizRef} /> */}
                                        <select name='authority' ref={authorizRef}>
                                            <option disabled selected value> -- select an option -- </option>
                                            <option value='admin'>Admin</option>
                                            <option value='dev'>Developer</option>
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