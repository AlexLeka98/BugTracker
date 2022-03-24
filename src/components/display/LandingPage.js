import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";


const LandingPage = () => {
    let url = 'users'
    useEffect(() => {
        fetch('/' + url).then(res => {
            if (!res.ok) {
                throw new Error('Somethign happend');
            }
            const data = res.json()
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const authCtx = useContext(AuthContext);
    return (
        <div className={styles.landingContainer}>
            <h1>Welcome to BugTracker!</h1>
            {!authCtx.isLoggedIn && <Link to='/auth/login'><button>Login to continue</button></Link>}
        </div>
    )
}


export default LandingPage;