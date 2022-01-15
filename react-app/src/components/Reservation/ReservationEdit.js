import React from 'react'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { updateReservation } from '../../store/reservation'
import Calendar from '../Calendar/Calendar';


function ReservationEdit({ reservation, venue_id }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
    const [dateTime, setDateTime] = useState(reservation.reservation_datetime);
    const [people, setPeople] = useState(reservation.party_size);
    const [duration, setDuration] = useState(reservation.party_size);
    const dispatch = useDispatch();


    const durations = [1, 2, 3]
    const peopleAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const reservationUpdate = async (e) => {
        e.preventDefault();
        dispatch(updateReservation({ user_id: sessionUser.id, venue_id: reservation.venue_id, reservation_datetime: dateTime, party_size: Number(people), duration: Number(duration) }))
        window.confirm(`Your reservation has been updated for ${dateTime} for ${people} couples!`)
        return setShowModal(false)
    }

    return (
        <>
            <button className='button2' onClick={() => setShowModal(true)}>Edit your reservation</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <h4>Edit your reservation!</h4>
                    <Calendar
                        dateTime={dateTime}
                        setDateTime={setDateTime} />
                    <div className='reservation-element'>
                        <span>Number of couples: </span>
                        <select onChange={e => { setPeople(e.target.value) }}>
                            {peopleAmount.map(count => {
                                return <option key={count} value={count}>{count}</option>
                            })}
                        </select>
                    </div>
                    <div className='reservation-element'>
                        <span>Duration:  </span>
                        <select value={duration} onChange={e => setDuration(e.target.value)}>
                            {durations.map((duration) => (
                                <option key={duration} value={duration}>{duration} Hour(s)</option>
                            ))}
                        </select>
                    </div>
                    <button className='button1' onClick={reservationUpdate}>Update Reservation</button>
                </Modal>
            )}
        </>
    )

}

export default ReservationEdit
