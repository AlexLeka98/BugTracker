import { useRef, useContext } from "react";
import useHttp from "../../../../hooks/useHttp";
import { AuthContextProvider } from "../../../../store/auth-context";
import AuthContext from "../../../../store/auth-context";
import Modal from "../../../UI/Modal";
import styles from './AddNewUserForm.module.css'

const AddNewUserForm = (props) => {
    const { httpRequest, isLoading, error } = useHttp();
    const authCtx = useContext(AuthContext);

    const enteredName = useRef();
    const enteredSurname = useRef();
    const enteredEmail = useRef();
    const enteredPhone = useRef();
    const enteredAuthority = useRef();
    const enteredPassword = useRef();


    const submitNewUserForm = (event) => {
        event.preventDefault();
        let newUser = {
            username: enteredName.current.value,
            surname: enteredSurname.current.value,
            email: enteredEmail.current.value,
            phone: enteredPhone.current.value,
            authority: enteredAuthority.current.value,
        }

        let authInfo = {
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authCtx.firebaseKey}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: enteredEmail.current.value,
                password: enteredPassword.current.value,
                returnSecureToken: true
            }
        }
        httpRequest(authInfo).then(res => {
            let httpInfo = {
                url: '/users',
                method: 'POST',
                body: { ...newUser, idToken: res.idToken },
                headers: { 'Content-Type': 'application/json' }
            }
            httpRequest(httpInfo).then(res => {
                props.addUserToState(res);
            })
        })
        props.toggleAddNewUserForm();
    }

    return (
        <Modal onModalHandler={props.toggleAddNewUserForm}>
            <div className={styles.formContainer}>
                <form className={styles.formStyle} onSubmit={submitNewUserForm}>
                    <h2 className={styles.formHeader}>New User</h2>
                    <div className={styles.formRow}>
                        <div>
                            <label>Name</label>
                            <input type='text' placeholder='Name' ref={enteredName} />
                        </div>
                        <div>
                            <label>Surname</label>
                            <input type='text' placeholder='Surname' ref={enteredSurname} />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div>
                            <label>Email</label>
                            <input type='email' placeholder='Email' ref={enteredEmail} />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='password' placeholder='Password' ref={enteredPassword} />
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div>
                            <label>Phone</label>
                            <input type='text' placeholder='Phone' ref={enteredPhone} />
                        </div>
                        <div>
                            <label>Authority</label>
                            <select name='authority' ref={enteredAuthority} >
                                <option disabled selected value> -- select an option -- </option>
                                <option value='developer'>Developer</option>
                                <option value='admin'>Admin</option>
                            </select>
                        </div>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default AddNewUserForm;