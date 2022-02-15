import styles from './TicketComment.module.css'


const TicketComment = (props) => {


    const deleteCommentHandler = () => {
        props.onDeleteComment(props);
    }

    return (
        <li className={styles.ticketContainer}>
            <div className={styles.commentContainer}>
                <div className={styles.commentInfo}>
                    <p>{`${props.username} ${props.surname}`}</p><span>&#183;</span>
                    <p>{props.date}</p>
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