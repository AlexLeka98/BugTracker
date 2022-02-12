import styles from './SingleTicket.module.css'
import { useContext, useRef } from 'react';
import AuthContext from '../../../../../../../../store/auth-context';
import TicketComment from './TicketComment';
import useHttp from '../../../../../../../../hooks/useHttp';



const SingleTicket = (props) => {
    const commentRef = useRef();
    const { ticket } = props;
    const { httpRequest, error, isLoading } = useHttp();
    const authCtx = useContext(AuthContext);

    const submitComment = (event) => {
        event.preventDefault();
        const newComment = commentRef.current.value;
        let httpInfo = {
            url: `/tickets/${ticket._id}/comment`,
            method: 'POST',
            body: {
                comment: newComment,
                date: new Date(),
                userInfo: authCtx.userInfo,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        }
        httpRequest(httpInfo);
        console.log(newComment);
        console.log('We submit here');
        commentRef.current.value = '';
    }
    return (
        <div className={styles.panelStyles}>
            <h4>{ticket.title}</h4>
            <div className={styles.ticketContainer}>
                <div className={styles.ticketInfo}>
                    <div className={styles.firstInfoRow}>
                        <div>
                            <p>TICKET TITLE</p>
                            <h5>{ticket.title}</h5>
                        </div>
                        <div>
                            <p>AUTHOR</p>
                            <h5>{ticket.author}</h5>
                        </div>
                        <div>
                            <p>DESCRIPTION</p>
                            <h5>{ticket.description}</h5>
                        </div>
                    </div>
                    <div className={styles.secondInfoRow}>
                        <div>
                            <p>STATUS</p>
                            <h5>{ticket.status}</h5>
                        </div>
                        <div>
                            <p>PRIORITY</p>
                            <h5>HIGH</h5>
                        </div>
                        <div>
                            <p>TYPE</p>
                            <h5>{ticket.type}</h5>
                        </div>
                        <div>
                            <p>TIME ESTIMATE (HOURS)</p>
                            <h5>4</h5>
                        </div>
                    </div>
                </div>
                <div className={styles.ticketComments}>
                    <h5>Comments</h5>
                    <form onSubmit={submitComment} className={styles.ticketForm}>
                        <input type='text' placeholder='Enter comment...' ref={commentRef} />
                        <button type='submit'>Comment</button>
                    </form>
                    <ul className={styles.ticketComments}>
                        <TicketComment />
                        <TicketComment />
                        <TicketComment />
                    </ul>
                </div>
            </div>
        </div>
    )

}


export default SingleTicket;