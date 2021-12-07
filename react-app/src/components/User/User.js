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

    // const editReservation = async (reservation_datetime, party_size, duration, reservationId, venue_id, e) => {
    //     e.preventDefault();
    //     dispatch(updateReservation(userId, venue_id, reservation_datetime, party_size, duration, reservationId))
    //     setReservationDateTime('')
    //     setPartySize('')
    //     setDuration(0.0)
    //     history.push(`/users/${user.id}`)
    // }

    // const deleteSingleReservation = async (reservationId) => {
    // 	let alert = window.confirm('Are you sure you want to delete this reservation?')
    // 	if (alert) {
    // 		dispatch(deleteReservation(reservationId))
    // 	}
    // 	history.push(`/users/${user.id}`)
    // }

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
                <h1> Welcome {sessionUser.first_name}!</h1>
            </div>

            <div className="user-reservations">
                <hr></hr>
                <div className="sidebar">
                    <button onClick={reservationToggle}>Your Reservations</button>
                    <button onClick={favoriteToggle}>Your Favorites</button>
                    <button onClick={reviewToggle}>Your Reviews</button>
                </div>

                <div className="main-body">
                    {viewReservations && (<UserReservations />)}
                    {viewFavorites && (<UserFavorites />)}
                    {viewReviews && (<UserReviews />)}
                </div>

            </div>
        </div >
    );
}
export default User;


{/* <Calendar className="user-reservation-element"
                                                    reservation_datetime={reservation_datetime} setReservationDateTime={setReservationDateTime} ></Calendar> */}
{/* <select
                                                    className="user-reservation-select"
                                                    onChange={(e) => {
                                                        Number(setPartySize(Number(e.target.value)))
                                                    }}
                                                    value={party_size}
                                                >
                                                    <option selected="" value="1">For 1 Person</option>
                                                    <option value="2">For 2 People</option>
                                                    <option value="3">For 3 People</option>
                                                    <option value="4">For 4 People</option>
                                                    <option value="5">For 5 People</option>
                                                    <option value="6">For 6 People</option>
                                                    <option value="7">For 7 People</option>
                                                    <option value="8">For 8 People</option>
                                                    <option value="9">For 9 People</option>
                                                    <option value="10">For 10 People</option>
                                                    <option value="11">For 11 People</option>
                                                    <option value="12">For 12 People</option>
                                                    <option value="13">For 13 People</option>
                                                    <option value="14">For 14 People</option>
                                                    <option value="15">For 15 People</option>
                                                    <option value="16">For 16 People</option>
                                                    <option value="17">For 17 People</option>
                                                    <option value="18">For 18 People</option>
                                                    <option value="19">For 19 People</option>
                                                    <option value="20">For 20 People</option>
                                                </select>
                                                <span>Duration</span>
                                                <select className="user-reservation-select"
                                                    value={duration} onChange={e => Number(setDuration(Number(e.target.value)))}>
                                                    {durations.map((duration) => (
                                                        <option key={duration} value={Number(duration)}>{duration} Hour(s)</option>
                                                    ))}
                                                </select>
                                                <button className="button2" onClick={editReservation}>Edit your current reservation</button>
                                            </form>
                                        </div>
                                    </div>
                                )} */}
