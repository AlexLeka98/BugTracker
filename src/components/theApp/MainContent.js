import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./MainContent.module.css";


const MainContent = () => {
    const authCtx = useContext(AuthContext);
    return (
        <div className={styles.maincontentContainer}>
            <h1>MainContent</h1>
            <h1>Welcome {authCtx.userInfo.username}</h1>
        </div>
    )
}


export default MainContent;