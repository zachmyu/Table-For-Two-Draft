import React from "react";
import { useSelector } from 'react-redux'

function UserReservations() {
    const sessionUser = useSelector(state => state?.session.user)
    const userReservations = Object.values(sessionUser.reservations)

    return (
        <>
            {userReservations.map(reservation => (
                <>
                    <div className="left">
                        <h3>{reservation.venue.name}</h3>
                        <img src={reservation.venue.image_url}></img>
                    </div>

                    <div className="right">
                        <div>Reservation Date & Time: {reservation.reservation_datetime}</div>
                        <div>Duration: {reservation.duration}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <button>Edit your reservation</button>
                        <button>Cancel the reservation</button>
                    </div>
                </>
            ))}
        </>
    )
}

export default UserReservations
