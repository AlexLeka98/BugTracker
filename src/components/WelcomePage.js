import { useContext } from "react";
import AuthContext from "../store/auth-context";



const WelcomePage = () => {

    const authCtx = useContext(AuthContext);
    console.log(authCtx.isLoggedIn)
    console.log(authCtx.token)
    return (
        <div>
            <h1>Welcome {authCtx.token} </h1>
        </div>
    )
}


export default WelcomePage;