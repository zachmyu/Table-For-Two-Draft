import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getAllVenueReviews } from "../../store/review"



function Reviews() {
    const dispatch = useDispatch();




    const venue = useSelector(state => state?.venue.current)
    const sessionUser = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state?.review))
    console.log(reviews)

    useEffect(() => {
        dispatch(getAllVenueReviews(venue.id))
    }, [dispatch, venue.id])

    let reviewsList;
    if (sessionUser) {
        reviewsList = (
            <div className='container_venue-comments'>
                {reviews && reviews.map(review => (
                    <>
                        <hr />
                        <h3>Title: {review.title}</h3>
                        <div>{review.body}</div>
                        {sessionUser.id === review.user_id && (
                            <div className='container_venue-commentsEdit'>
                                <button className='button3' >Edit Review</button>
                                {/* <button className='button3' onClick={() => openForm(review)}>Edit Review</button> */}
                                {/* {showForm && review.id === formId ?
                                    <>
                                        <h3>Edit your review for this venue</h3>
                                        <form className='review-container'
                                            onSubmit={(e) =>
                                                editReview(review.id, title, body, Number(rating), e)}
                                            key={review.id}>
                                            <div className='review-element-container'>
                                                <input
                                                    className='review-element'
                                                    type='text'
                                                    value={title}
                                                    placeholder='Title'
                                                    onChange={(e) =>
                                                        setTitle(e.target.value)}
                                                    required>
                                                </input>
                                            </div>
                                            <div className='review-element-container'>
                                                <textarea
                                                    className='review-text-element'
                                                    value={body}
                                                    placeholder='Update your review!'
                                                    onChange={(e) =>
                                                        setBody(e.target.value)}
                                                    required
                                                />

                                            </div>
                                            <div className='review-radio-container'>
                                                <h3>Rating</h3>
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <div className='review-radio-select'>
                                                        {i}
                                                        <input
                                                            type="radio"
                                                            key={i}
                                                            value={i}
                                                            checked={i === rating}
                                                            onClick={() => ratingHelper(i)}>
                                                        </input>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='review-button-container'>
                                                <button className='button2' type='submit'>Update Review</button>
                                                <button className='button1' onClick={() => deleteSingleReview(review.id)}>Delete Review</button>
                                            </div>
                                        </form>
                                    </>
                                    : null
                                } */}
                            </div>
                        )}
                    </>
                ))
                }
                <hr />
                {/* <div><ReviewFormModal venue_id={id} /></div> */}
            </div >
        )
    } else {
        reviewsList = (
            <div className='container_venue-comments'>
                {reviews && reviews?.map(review => (
                    <div className='container_venue-comments' id={review.id}>
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
