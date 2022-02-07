import DashboardPanel from "../../../../../../UI/DashboardPanel"
import ProjectMemberForm from "./ProjectMemberForm";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";

const DashboardMembers = (props) => {
    const match = useRouteMatch();
    const panelTitles = { col1: 'NAME', col2: 'EMAIL', col3: 'PHONE' }
    return (
        <DashboardPanel
            name='Members'
            buttonName='New Member'
            onClick={props.toggleMemberFormModal}
            panelTitles={panelTitles}>
            {props.members.length > 0 && props.members.map(item => (
                <DashboardItem
                    col1={item.name}
                    col2={item.email}
                    col3={item.phone}
                    key={item._id}
                    id={item._id}
                    onRemoveItem={props.removeMemberHandler}
                />
            ))}
            {props.members.length === 0 && <h5>No Members yet.</h5>}
            {props.memberModalIsOpen &&
                <ProjectMemberForm
                    addNewMemberHandler={props.addNewMemberHandler}
                    closeMemberFormModal={props.closeMemberFormModal}
                    id={match.params.id}
                />
            }
        </DashboardPanel>
    )
}


export default DashboardMembers;