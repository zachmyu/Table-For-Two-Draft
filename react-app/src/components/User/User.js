import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import UserReservations from './UserReservations';
import UserFavorites from './UserFavorites';
import UserReviews from './UserReviews';

import "./User.css"

function User() {
    const sessionUser = useSelector(state => state?.session.user)

    const [viewReservations, setViewReservations] = useState(true)
    const [viewFavorites, setViewFavorites] = useState(false)
    const [viewReviews, setViewReviews] = useState(false)

    if (!sessionUser) {
        return null;
    }

    const reservationToggle = () => {
        if (viewReservations === false) {
            setViewReservations(true)
            setViewFavorites(false)
            setViewReviews(false)
        } else {
            setViewReservations(false)
        }
    }

    const favoriteToggle = () => {
        if (viewFavorites === false) {
            setViewReservations(false)
            setViewFavorites(true)
            setViewReviews(false)
        } else {
            setViewFavorites(false)
        }
    }

    const reviewToggle = () => {
        if (viewReviews === false) {
            setViewReservations(false)
            setViewFavorites(false)
            setViewReviews(true)
        } else {
            setViewReviews(false)
        }
    }

    return (
        <div className="user-container">
            <div className="user-header">
                <img id='profile_img' src={sessionUser.profile_image_url} alt={sessionUser.username}></img>
                <h1 className="user-greeting"> Welcome {sessionUser.first_name}!</h1>
                <hr></hr>
            </div>

            <div className="user-info">
                <div className="user-sidebar">
                    <button className={viewReservations ? 'user-options-selected' : "user-options-button"} onClick={reservationToggle}>
                        Your Reservations
                    </button>
                    <button className={viewFavorites ? 'user-options-selected' : "user-options-button"} onClick={favoriteToggle}>
                        Your Favorites
                    </button>
                    <button className={viewReviews ? 'user-options-selected' : "user-options-button"} onClick={reviewToggle}>
                        Your Reviews
                    </button>
                </div>

                <div className="user-main-body">
                    {viewReservations && (<UserReservations />)}
                    {viewFavorites && (<UserFavorites />)}
                    {viewReviews && (<UserReviews />)}
                </div>

            </div>
        </div >
    );
}
export default User;
