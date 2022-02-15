import { Route, Switch } from "react-router-dom";
import styles from "./MainContent.module.css";
import Dashboard from "./SidebarPages/Dashboard/Dashboard";
import Tickets from "./SidebarPages/Tickets/Tickets";
import Administration from './SidebarPages/Administration/Administration'
import ProjectPage from "./SidebarPages/Dashboard/Projects/ProjectPage/ProjectPage";

const MainContent = () => {
    return (
        <div className={styles.maincontentContainer}>
            <Switch>
                <Route path='/app/dashboard' exact>
                    <Dashboard />
                </Route>
                <Route path='/app/dashboard/project/:projectId' exact>
                    <ProjectPage />
                </Route>
                <Route path='/app/dashboard/project/:projectId/:ticketId'>
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