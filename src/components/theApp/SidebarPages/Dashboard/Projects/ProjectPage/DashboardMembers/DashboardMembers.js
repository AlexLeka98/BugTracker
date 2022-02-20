import DashboardPanel from "../../../../../../UI/DashboardPanel"
import AddMemberForm from "./AddMemberForm";
import { useRouteMatch } from "react-router-dom";
import DashboardItem from "../../../../../../UI/DashboardItem";
import { useContext, useState } from "react";
import useHttp from "../../../../../../../hooks/useHttp";
import AuthContext from "../../../../../../../store/auth-context";


const DashboardMembers = (props) => {
    const match = useRouteMatch();
    const [page, setPage] = useState(0);
    const [members, setMembers] = useState(props.members);
    const { isLoading, error, httpRequest } = useHttp()
    const authCtx = useContext(AuthContext);
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
        // Redirect to User profile.
        console.log('redirect Ticket Item Handler');
    }

    const onChangePage = (page) => {
        console.log(page);
        console.log(Math.ceil(members.length / 5 - 1));
        if (page >= 0 && page <= Math.ceil(members.length / 5 - 1)) {
            console.log("I am still here");
            setPage(page);
        }
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
            buttonName={authCtx.userInfo.authority === 'admin' ? 'Add Member' : ''}
            onClick={onToggleMemberFormModal}
            panelData={panelData}
            pages={Math.ceil(members.length / 5)}
            onChangePage={onChangePage}
            page={page}
        >
            {members.length > 0 && members.slice(page * 5, (page + 1) * 5).map(member => {
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