import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { createReview } from '../../store/review'

import "./ReviewForm.css"

function ReviewCreate({ venueId }) {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [rating, setRating] = useState(0);

    const sessionUser = useSelector((state) => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewDetails = {
            userId: sessionUser.id,
            venueId,
            title,
            body,
            rating
        }
        dispatch(createReview(reviewDetails))
        setTitle("")
        setBody("")
        setRating(0)
        setShowModal(false)
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
            <button className="button2" onClick={() => setShowModal(true)}>Create a review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form className='review-container' onSubmit={handleSubmit}>
                        <h3>Add a review for this venue</h3>
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
                        </div>
                    </form >
                </Modal>

            )}

        </>
    );
}

export default ReviewCreate;