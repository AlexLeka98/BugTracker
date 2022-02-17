
// import DashboardPanel from "../../../UI/DashboardPanel";
// import styles from './Administration.module.css';

// const EditUserForm = () => {
//     const nameRef = useRef();
//     const surnameRef = useRef();
//     const phoneRef = useRef();
//     const authorizRef = useRef();
//     const emailRef = useRef();



//     const selectAUser = (data) => {
//         nameRef.current.value = data.name;
//         surnameRef.current.value = data.surname;
//         emailRef.current.value = data.email;
//         authorizRef.current.value = data.authority;
//         phoneRef.current.value = data.phone;
//         setSelectedUser(data);
//     }


//     const submitUserChanges = (event) => {
//         event.preventDefault();
//         let data = {
//             name: nameRef.current.value,
//             surname: surnameRef.current.value,
//             email: emailRef.current.value,
//             phone: phoneRef.current.value,
//             authority: authorizRef.current.value,
//         }
//         console.log(data);
//         let httpInfo = {
//             url: `/users/${selectedUser._id}`,
//             method: 'PUT',
//             body: data,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }
//         httpRequest(httpInfo).then(res => {
//             updateAllUsers(res)
//         })
//         console.log(nameRef.current.value);
//     }


//     return (
//         <div className={styles.editUser}>
//             <DashboardPanel
//                 name='Edit User Information'
//                 buttonName='Remove User'
//                 panelData={[
//                     {
//                         title: `${selectedUser.name} ${selectedUser.surname}`,
//                         width: 95
//                     },
//                 ]}>
//                 {selectedUser && !isLoading &&
//                     <form className={styles.formStyle} onSubmit={submitUserChanges}>
//                         <div className={styles.formRow}>
//                             <div>
//                                 <label htmlFor='name'>First Name</label>
//                                 <input type='text' id='name' ref={nameRef} />
//                             </div>
//                             <div>
//                                 <label htmlFor='surname'>Last Name</label>
//                                 <input type='text' id='surname' ref={surnameRef} />
//                             </div>
//                         </div>
//                         <div className={styles.formRow}>
//                             <div>
//                                 <label htmlFor='phone'>Phone</label>
//                                 <input type='text' id='phone' ref={phoneRef} />
//                             </div>
//                             <div>
//                                 <label htmlFor='authoriz'>Authorization Level</label>
//                                 <select name='authority' ref={authorizRef}>
//                                     <option disabled selected value> -- select an option -- </option>
//                                     <option value='admin'>Admin</option>
//                                     <option value='dev'>Developer</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className={styles.lastRow}>
//                             <label htmlFor='email'>Email</label>
//                             <input type='email' id='email' ref={emailRef} />
//                         </div>
//                         <button>Submit</button>
//                     </form>
//                 }
//                 {isLoading && <div className='loader'></div>}
//             </DashboardPanel>
//         </div>
//     )
// }

// export default EditUserForm;