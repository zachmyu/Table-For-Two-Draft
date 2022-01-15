import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteReservation, getAllUserReservations } from '../../store/reservation'
import ReservationEdit from "../Reservation/ReservationEdit";

import "./User.css"

function UserReservations() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session.user)
    const userReservations = Object.values(useSelector(state => state.reservation))
    console.log(userReservations)

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id))
    }, [dispatch, sessionUser.id])

    const deleteCurrReservation = async (reservationId) => {
        let alert = window.confirm('Are you sure you want to delete this reservation?')
        if (alert) {
            await dispatch(deleteReservation(reservationId))
        }
    }

    return (
        <>
            <h2> Your Current Reservations </h2>
            {userReservations.map(reservation => (
                <div key={reservation.id}>
                    <div className="reservation-left">
                        <h3>{reservation.venue.name}</h3>
                        <img className="reservation-venuePic" src={reservation.venue.image_url} alt={reservation.venue.name}></img>
                    </div>

                    <div className="reservation-right">
                        <div>Reservation Date & Time: {reservation.reservation_datetime}</div>
                        <div>Duration: {reservation.duration}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <div className='reservation-button-container'>
                            <ReservationEdit />
                            <button className='button1'
                                onClick={() => deleteCurrReservation(reservation.id)}
                            >Cancel the reservation</button>
                        </div>
                        <hr />
                    </div>
                </div>
            ))}
        </>
    )
}

export default UserReservations
