import React from 'react'
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReservation } from '../../store/reservation'
import Calendar from '../Calendar/Calendar';



function ReservationForm({ venue_id, venue, reservations }) {
    const sessionUser = useSelector(state => state.session.user);
    const [reservation_datetime, setReservationDateTime] = useState(new Date());
    const [people, setPeople] = useState(2);
    const [duration, setDuration] = useState(1.0);
    const dispatch = useDispatch();
    const history = useHistory();

    const durations = [1, 2, 3]
    const peopleAmount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const reservation = async (e) => {
        e.preventDefault();
        dispatch(createReservation({ user_id: sessionUser.id, venue_id, reservation_datetime, party_size: Number(people), duration: Number(duration) }))
        window.confirm(`Your reservation has been made for ${reservation_datetime} for ${people} couples!`)
        history.push(`/users/${sessionUser.id}`)
    }

    return (
        <>
            <span>Make a new reservation!</span>
            <Calendar reservation_datetime={reservation_datetime}
                setReservationDateTime={setReservationDateTime} />
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
                <select value={duration} onChange={e => Number(setDuration(Number(e.target.value)))}>
                    {durations.map((duration) => (
                        <option key={duration} value={Number(duration)}>{duration} Hour(s)</option>
                    ))}
                </select>
            </div>
            <button className='button1' onClick={reservation}>Make a reservation</button>
        </>
    )

}

export default ReservationForm
