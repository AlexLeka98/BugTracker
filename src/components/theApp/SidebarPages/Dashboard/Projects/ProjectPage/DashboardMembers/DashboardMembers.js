import DashboardPanel from "../../../../../../UI/DashboardPanel"
import AddMemberForm from "./AddMemberForm";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";
import { useState } from "react";
import useHttp from "../../../../../../../hooks/useHttp";


const DashboardMembers = (props) => {
    const match = useRouteMatch();
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
        console.log(userId);
        let httpInfo = {
            url: '/projects/user',
            method: 'DELETE',
            body: { userId: userId, projectId: match.params.projectId },
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

    const panelData = [
        {
            title: 'NAME',
            width: 25,
        },
        {
            title: 'EMAIL',
            width: 50,
        },
        {
            title: 'PHONE',
            width: 20,
        },
    ]
    return (
        <DashboardPanel
            name='Members'
            buttonName='Add Member'
            onClick={onToggleMemberFormModal}
            panelData={panelData}>
            {members.length > 0 && members.map(member => {
                let rowData = [
                    { value: member.username, width: 25 },
                    { value: member.email, width: 50 },
                    { value: member.phone, width: 20 },
                ]
                return (
                    <DashboardItem
                        rowData={rowData}
                        key={member._id}
                        id={member._id}
                        onRemoveItem={removeMemberHandler}
                        onClickItem={redirectMemberItemHandler}
                    />
                )
            })}
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