import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateReview, getAllUserReviews } from '../../store/review'


function UserReviews() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session.user)
    const userReviews = Object.values(useSelector(state => state.review))

    useEffect(() => {
        dispatch(getAllUserReviews(sessionUser.id))
    }, [dispatch, sessionUser.id])

    return (
        <>
            <h2> Your Current Reservations </h2>
            {userReviews.map(review => (
                <div key={review.id}>
                    <div>{review.rating}</div>
                    <div>{review.title}</div>
                    <div>{review.body}</div>
                    <hr />
                </div>
            ))}
        </>
    )
}

export default UserReviews
