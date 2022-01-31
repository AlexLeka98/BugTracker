import { useContext } from "react";
import AuthContext from "../../store/auth-context";



const WelcomePage = () => {

    const authCtx = useContext(AuthContext);

    return (
        <div>
            <h1>You are now Logged In !!!</h1>
        </div>
    )
}


export default WelcomePage;