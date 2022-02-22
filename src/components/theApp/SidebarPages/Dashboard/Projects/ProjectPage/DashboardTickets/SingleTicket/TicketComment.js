import { useEffect, useState } from 'react';
import styles from './TicketComment.module.css'


const TicketComment = (props) => {
    const [date, setDate] = useState();

    const deleteCommentHandler = () => {
        props.onDeleteComment(props);
    }

    useEffect(() => {
        let dateTemp = new Date(props.date).toLocaleString(('en-GB', { timeZone: 'UTC' }));
        setDate(dateTemp);
    }, [])

    return (
        <li className={styles.ticketContainer}>
            <div className={`${styles.commentContainer} ${styles.commentRight}`}>
                <div className={`${styles.commentInfo} `}>
                    <p>{`${props.username} ${props.surname}`}</p><span>&#183;</span>
                    <p>{date}</p>
                </div>
                <div className={styles.commentText}>
                    <p>{props.comment}</p>
                </div>
            </div>
            <div className={styles.deleteComment} onClick={deleteCommentHandler}></div>
        </li>
    )

}


export default TicketComment;