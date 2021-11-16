import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { updateReview, deleteReview } from '../../store/review'

function ReviewEdit({ venueId, review }) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState(review.title);
    const [body, setBody] = useState(review.body);
    const [rating, setRating] = useState(review.rating);

    const sessionUser = useSelector((state) => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewDetails = {
            userId: sessionUser.id,
            venueId,
            title,
            body,
            rating,
            reviewId: review.id
        }
        dispatch(updateReview(reviewDetails))
        setShowModal(false)
    }

    const deleteCurrReview = async (reviewId) => {
        let alert = window.confirm('Are you sure you want to delete this review?')
        if (alert) {
            await dispatch(deleteReview(reviewId))
        }
    }

    const radioHelper = () => {
        return [1, 2, 3, 4, 5].map(i => (
            <div className='review-radio-select' key={i}>
                {i}
                <input
                    type="radio"
                    value={i}
                    checked={i === rating}
                    onChange={(e) => setRating(i)}>
                </input>
            </div>
        ))
    }

    return (
        <>
            <button className='button3' onClick={() => setShowModal(true)}>Edit Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form className='review-container' onSubmit={handleSubmit}>
                        <h3>Edit your review for this venue</h3>
                        <div className="review-element-container">
                            <input
                                className="review-element"
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="review-element-container">
                            <textarea
                                className="review-text-element"
                                value={body}
                                placeholder='Add your review!'
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                        </div>
                        <div className="review-radio-container">
                            <h3>Rating</h3>
                            {radioHelper()}
                        </div>
                        <div className='review-button-container'>
                            <button className="button2" type="submit">Submit Review</button>
                            <button className='button1' onClick={() => deleteCurrReview(review.id)}>Delete Review</button>
                        </div>
                    </form >
                </Modal>
            )}
        </>
    );
}

export default ReviewEdit;
