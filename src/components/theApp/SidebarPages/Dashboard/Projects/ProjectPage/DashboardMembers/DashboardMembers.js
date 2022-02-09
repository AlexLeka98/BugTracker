import DashboardPanel from "../../../../../../UI/DashboardPanel"
import AddMemberForm from "./AddMemberForm";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";
import { useState } from "react";
import useHttp from "../../../../../../../hooks/useHttp";


const DashboardMembers = (props) => {
    const match = useRouteMatch();
    const panelTitles = { col1: 'NAME', col2: 'EMAIL', col3: 'PHONE' }
    const [members, setMembers] = useState(props.members);
    const { isLoading, error, httpRequest } = useHttp()

    const onToggleMemberFormModal = () => {
        props.toggleAddMemberFormModal();
    }

    const addNewMemberHandler = (newMember) => {
        setMembers(prevMembers => {
            return [...prevMembers, ...newMember];
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

    const redirectMemberItemHandler = (id) => {
        console.log('redirect Ticket Item Handler');
    }

    return (
        <DashboardPanel
            name='Members'
            buttonName='Add Member'
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
                    onRedirectItem={redirectMemberItemHandler}
                />
            ))}
            {members.length === 0 && <h5>No Members yet.</h5>}
            {props.memberAddFormModalIsOpen &&
                <AddMemberForm
                    addNewMemberHandler={addNewMemberHandler}
                    closeMemberFormModal={onToggleMemberFormModal}
                    id={match.params.id}
                    projectMembers={members}
                />
            }
        </DashboardPanel>
    )
}


export default DashboardMembers;