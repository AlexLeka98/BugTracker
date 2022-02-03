import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./MainContent.module.css";
import Dashboard from "./SidebarPages/Dashboard/Dashboard";
import Ticket from "./SidebarPages/Tickets";
import Administration from "./SidebarPages/Administration";

const MainContent = (props) => {
    const authCtx = useContext(AuthContext);
    return (
        <div className={styles.maincontentContainer}>
            <Switch>
                <Route path='/app/dashboard' exact>
                    <Dashboard />
                </Route>
                <Route path='/app/tickets' exact>
                    <Ticket />
                </Route>
                <Route path='/app/administration' exact>
                    <Administration />
                </Route>
            </Switch>
        </div>
    )
}


export default MainContent;