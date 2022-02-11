import styles from './TicketComment.module.css'


const TicketComment = () => {

    return (
        <li className={styles.ticketContainer}>
            <div className={styles.commentInfo}>
                <p>Aleksander Leka</p><span>&#183;</span>
                <p>June 14th 2021, 6:02:28pm</p>
            </div>
            <div className={styles.commentText}>
                <p>This is the comment text, This is the comment text, This is the comment text, 
                This is the comment text, This is the comment text, This is the comment text, This is the comment text, 
                This is the comment text, This is the comment text, This is the comment text, 
                This is the comment text, This is the comment text, 
                </p>
            </div>
        </li>
    )

}


export default TicketComment;