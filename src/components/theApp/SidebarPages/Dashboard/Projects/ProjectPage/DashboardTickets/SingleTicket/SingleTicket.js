import styles from './SingleTicket.module.css'
import { useRef } from 'react';
import TicketComment from './TicketComment';



const SingleTicket = (props) => {
    const commentRef = useRef();
    const { ticket } = props;

    const submitComment = (event) => {
        event.preventDefault();
        const newComment = commentRef.current.value;
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
                    <ul className={styles.ticketComments}>
                        <TicketComment />
                        <TicketComment />
                        <TicketComment />
                    </ul>
                    <form onSubmit={submitComment} className={styles.ticketForm}>
                        <input type='text' placeholder='Enter comment...' ref={commentRef} />
                        <button type='submit'>Comment</button>
                    </form>
                </div>
            </div>
        </div>
    )

}


export default SingleTicket;