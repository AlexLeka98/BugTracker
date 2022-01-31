import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";


const LandingPage = () => {

    const authCtx = useContext(AuthContext);
    console.log(authCtx.userInfo);
    return (
        <div className={styles.landingContainer}>
            <h1>Welcome to BugTracker!</h1>
            {!authCtx.isLoggedIn && <button><Link to='/auth/login'>Login to continue</Link></button>}
        </div>
    )
}


export default LandingPage;