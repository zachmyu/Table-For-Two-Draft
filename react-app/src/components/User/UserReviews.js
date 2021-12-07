import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Rating } from '@mui/material';
import { getAllUserReviews } from '../../store/review'
import ReviewEdit from "../ReviewModal/ReviewEdit";


function UserReviews() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session.user)
    const userReviews = Object.values(useSelector(state => state.review))

    useEffect(() => {
        dispatch(getAllUserReviews(sessionUser.id))
    }, [dispatch, sessionUser.id])

    return (
        <>
            <h2> Reviews from you</h2>
            {userReviews.map(review => (
                <div key={review.id}>
                    <a href={`/venues/${review.venue_id}`}>
                        <div>{review.venues}</div>
                    </a>
                    <div>Title: {review.title}</div>
                    <Rating
                        name="read-only" value={review.rating}
                        precision={0.5} readOnly />
                    <div>{review.body}</div>
                    <div className='container_venue-commentsEdit'>
                        <ReviewEdit venueId={review.venue_id} review={review} />
                    </div>
                    <hr />
                </div>
            ))}
        </>
    )
}

export default UserReviews
