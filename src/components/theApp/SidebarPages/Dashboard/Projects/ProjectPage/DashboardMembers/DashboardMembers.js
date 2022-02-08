import DashboardPanel from "../../../../../../UI/DashboardPanel"
import ProjectMemberForm2 from "./ProjectMemberForm2";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";
import { useState } from "react";
import useHttp from "../../../../../../../hooks/useHttp";


const DashboardMembers = (props) => {
    const match = useRouteMatch();
    const panelTitles = { col1: 'NAME', col2: 'EMAIL', col3: 'PHONE' }
    const [memberModalIsOpen, setMemberModalIsOpen] = useState(false);
    const [members, setMembers] = useState(props.members);
    const { isLoading, error, httpRequest } = useHttp()

    const onToggleMemberFormModal = () => {
        props.toggleMemberFormModal();
    }
    const closeMemberFormModal = () => {
        setMemberModalIsOpen(prevState => !prevState);
    }
    const addNewMemberHandler = (newMember) => {
        setMembers(prevMembers => {
            return [...prevMembers, newMember];
        })
    }
    const removeMemberHandler = (userId) => {
        let httpInfo = {
            url: '/projects/user',
            method: 'DELETE',
            body: { userId: userId, projectId: match.params.id },
            headers: { 'Content-Type': 'application/json' }
        }
        httpRequest(httpInfo).then(() => {
            setMembers(prevUsers => {
                return prevUsers.filter(user => user._id !== userId);
            })
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <DashboardPanel
            name='Members'
            buttonName='New Member'
            onClick={onToggleMemberFormModal}
            panelTitles={panelTitles}>
            {members.length > 0 && members.map(item => (
                <DashboardItem
                    col1={item.name}
                    col2={item.email}
                    col3={item.phone}
                    key={item._id}
                    id={item._id}
                    onRemoveItem={removeMemberHandler}
                />
            ))}
            {props.members.length === 0 && <h5>No Members yet.</h5>}
            {memberModalIsOpen &&
                <ProjectMemberForm2
                    addNewMemberHandler={addNewMemberHandler}
                    closeMemberFormModal={closeMemberFormModal}
                    id={match.params.id}
                    projectMembers={members}
                />
            }
        </DashboardPanel>
    )
}


export default DashboardMembers;