import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateReservation, getAllUserReservations } from '../../store/reservation'

import "./User.css"

function UserReservations() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session.user)
    const userReservations = Object.values(useSelector(state => state.reservation))

    useEffect(() => {
        dispatch(getAllUserReservations(sessionUser.id))
    }, [dispatch, sessionUser.id])

    return (
        <>
            <h2> Your Current Reservations </h2>
            {userReservations.map(reservation => (
                <div key={reservation.id}>
                    <div className="reservation-left">
                        <h3>{reservation.venue.name}</h3>
                        <img className="reservation-venuePic" src={reservation.venue.image_url}></img>
                    </div>

                    <div className="reservation-right">
                        <div>Reservation Date & Time: {reservation.reservation_datetime}</div>
                        <div>Duration: {reservation.duration}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <button>Edit your reservation</button>
                        <button>Cancel the reservation</button>
                        <hr />
                    </div>
                </div>
            ))}
        </>
    )
}

export default UserReservations
