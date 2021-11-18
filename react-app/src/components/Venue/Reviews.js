import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllVenueReviews } from "../../store/review"
import { Rating } from '@mui/material';

import ReviewEdit from "../ReviewModal/ReviewEdit";

function Reviews() {
    const dispatch = useDispatch();

    const venue = useSelector(state => state?.venue.current)
    const sessionUser = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state?.review))

    useEffect(() => {
        dispatch(getAllVenueReviews(venue.id))
    }, [dispatch, venue.id])

    let reviewsList;
    if (sessionUser) {
        reviewsList = (
            <div className='container_venue-comments'>
                {reviews && reviews.map(review => (
                    <div className='container_venue-comments' key={review.id}>
                        <hr />
                        <h3>{review.title}</h3>

                        <Rating name="read-only" value={review.rating} readOnly />
                        <div>{review.body}</div>
                        {sessionUser.id === review.user_id && (
                            <div className='container_venue-commentsEdit'>
                                <ReviewEdit venueId={venue.id} review={review} />
                            </div>
                        )}
                    </div>
                ))
                }
                <hr />
            </div >
        )
    } else {
        reviewsList = (
            <div className='container_venue-comments'>
                {reviews && reviews?.map(review => (
                    <div className='container_venue-comments' key={review.id}>
                        <hr />
                        <h3>Title: {review.title}</h3>
                        <div>{review.body}</div>
                    </div>
                ))}
                <hr />
                <h4>Please log in to add or edit reviews!</h4>
            </div>
        )
    }

    return (
        <>
            {reviewsList}
        </>
    )


}

export default Reviews
