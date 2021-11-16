import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { getAllVenueReviews, updateReview, deleteReview } from "../../store/review"
import ReviewEdit from "../ReviewModal/ReviewEdit";



function Reviews() {
    const dispatch = useDispatch();


    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(0);
    const [showForm, setShowForm] = useState(false)
    const [formId, setFormId] = useState(null)
    const [buttonUnFave, setButtonUnFave] = useState('button-unfave')
    const [buttonAddFave, setButtonAddFave] = useState('button-addfave')
    const [oneClickBtn, setOneClickBtn] = useState(false)


    const venue = useSelector(state => state?.venue.current)
    const sessionUser = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state?.review))

    useEffect(() => {
        dispatch(getAllVenueReviews(venue.id))
    }, [dispatch, venue.id])

    const editReview = async (reviewId, title, body, rating, e) => {
        e.preventDefault();
        dispatch(updateReview(sessionUser.id, venue.id, title, body, Number(rating), reviewId))
        setTitle('')
        setBody('')
        setRating('')
        setShowForm(false)
    }

    const openForm = (review) => {
        setShowForm(!showForm)
        setTitle(review.title)
        setBody(review.body)
        setRating(review.rating)
        setFormId(review.id)
    }

    const deleteSingleReview = async (reviewId) => {
        let alert = window.confirm('Are you sure you want to delete this review?')
        if (alert) {
            await dispatch(deleteReview(reviewId))
        }
    }



    let reviewsList;
    if (sessionUser) {
        reviewsList = (
            <div className='container_venue-comments'>
                {reviews && reviews.map(review => (
                    <div className='container_venue-comments' key={review.id}>
                        <hr />
                        <h3>{review.title}</h3>
                        <div>{review.rating} <i className="fas fa-star"></i></div>
                        <div>{review.body}</div>
                        {sessionUser.id === review.user_id && (
                            <div className='container_venue-commentsEdit'>
                                {/* <button className='button3' >Edit Review</button> */}
                                <ReviewEdit venue_id={venue.id} review={review} />
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
                    </div>
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
