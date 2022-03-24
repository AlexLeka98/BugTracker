import styles from './SingleTicket.module.css'
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../../../../../../../store/auth-context';
import TicketComment from './TicketComment';
import useHttp from '../../../../../../../../hooks/useHttp';



const SingleTicket = (props) => {
    const commentRef = useRef();
    const { selectedTicket } = props;
    const { httpRequest, error, isLoading } = useHttp();
    const authCtx = useContext(AuthContext);

    const submitComment = (event) => {
        event.preventDefault();
        let date = new Date().toLocaleString(('en-GB', { timeZone: 'UTC' }));
        let newCommentData = {
            comment: commentRef.current.value,
            date: date,
            userId: authCtx.userInfo._id,
        }
        let httpInfo = {
            url: `/tickets/${selectedTicket._id}/comment`,
            method: 'POST',
            body: newCommentData,
            headers: {
                'Content-Type': 'application/json'
            },
        }
        httpRequest(httpInfo).then(ticketRes => {
            props.onUpdateSelectedTicket(ticketRes);
        });
        commentRef.current.value = '';
    }

    const deleteCommentHandler = (comment) => {
        let httpInfo = {
            url: `/tickets/${selectedTicket._id}/comment`,
            method: 'DELETE',
            body: { id: comment.id },
            headers: {
                'Content-Type': 'application/json'
            },
        }
        httpRequest(httpInfo)
            .then(ticketRes => {
                props.onUpdateSelectedTicket(ticketRes);
            });
    }
    return (

        <Fragment>
            {selectedTicket &&
                <div className={styles.panelStyles}>
                    <h4>{selectedTicket.title}</h4>
                    <div className={styles.ticketContainer}>
                        <div className={styles.ticketInfo}>
                            <div className={styles.firstInfoRow}>
                                <div>
                                    <p>TICKET TITLE</p>
                                    <h5>{selectedTicket.title}</h5>
                                </div>
                                <div>
                                    <p>AUTHOR</p>
                                    <h5>{selectedTicket.author}</h5>
                                </div>
                                <div>
                                    <p>DESCRIPTION</p>
                                    <h5>{selectedTicket.description}</h5>
                                </div>
                            </div>
                            <div className={styles.secondInfoRow}>
                                <div>
                                    <p>STATUS</p>
                                    <h5>{selectedTicket.status}</h5>
                                </div>
                                <div>
                                    <p>PRIORITY</p>
                                    <h5>{selectedTicket.priority}</h5>
                                </div>
                                <div>
                                    <p>TYPE</p>
                                    <h5>{selectedTicket.type}</h5>
                                </div>
                                <div>
                                    <p>TIME ESTIMATE (HOURS)</p>
                                    <h5>{selectedTicket.hours}</h5>
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
                                {selectedTicket.comments.map(comment => (
                                    <TicketComment
                                        comment={comment.comment}
                                        date={comment.date}
                                        username={comment.user.username}
                                        surname={comment.user.surname}
                                        id={comment._id}
                                        key={comment._id}
                                        onDeleteComment={deleteCommentHandler}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}


export default SingleTicket;