import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./MainContent.module.css";
import Dashboard from "./SidebarPages/Dashboard/Dashboard";
import Tickets from "./SidebarPages/Tickets";
import Administration from "./SidebarPages/Administration";
import ProjectPage from "./SidebarPages/Dashboard/Projects/ProjectPage/ProjectPage";

const MainContent = (props) => {
    const authCtx = useContext(AuthContext);
    return (
        <div className={styles.maincontentContainer}>
            <Switch>
                <Route path='/app/dashboard' exact>
                    <Dashboard />
                </Route>
                <Route path='/app/dashboard/project/:id'>
                    <ProjectPage />
                </Route>
                <Route path='/app/tickets' exact>
                    <Tickets />
                </Route>
                <Route path='/app/administration' exact>
                    <Administration />
                </Route>
            </Switch>
        </div>
    )
}


export default MainContent;