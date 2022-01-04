import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getSingleVenue } from '../../store/venue'
import { useParams } from "react-router-dom";
import { Rating } from '@mui/material';
import ReservationForm from '../Reservation/Reservation'
import Reviews from "./Reviews";
import ReviewCreate from "../ReviewModal/ReviewCreate";

import './Venue.css'
import Favorites from './Favorite';


function Venue() {
    const { id } = useParams()
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const reservations = useSelector(state => state.reservations)
    const venue = useSelector(state => state?.venue.current)
    const reviewsInfo = venue ? Object.values(venue?.reviews) : null

    useEffect(() => {
        dispatch(getSingleVenue(id))
    }, [dispatch, id])

    const handleRating = () => {
        let total = 0
        reviewsInfo?.forEach(review => total += review?.rating)
        let avg = Math.round((total / reviewsInfo.length) * 10) / 10
        return avg
    }



    let makeReservation;
    if (user) {
        makeReservation = (
            <>
                <Favorites />
                <div className='container-reservation'>
                    <h3>Reservations</h3>
                    <ReservationForm venue_id={id}
                        venue={venue}
                        reservations={reservations}>
                    </ReservationForm>
                </div>
            </>
        )
    } else {
        makeReservation = (
            <>
                <h3>Reservations</h3>
                <p>Please login to make a reservation!</p>
            </>
        )
    }

    return (
        <>
            {venue &&
                <>
                    <div className='container__venue-title'>
                        <img src={venue.image_url}
                            alt={venue.name}
                            className='venue-picture' />
                    </div>
                    <div className='container__venue'>
                        <div className='container_venue-left'>
                            <div className='container_venue-summary'>
                                <h1 className='venue-title'>{venue.name}</h1>
                                <hr />
                            </div>
                            <div className='container_venue-details'>
                                <div className='venue-details-element'>
                                    <Rating name="read-only" value={handleRating()} precision={0.5} readOnly />
                                    <span>Average Score: {handleRating()}</span>
                                </div>
                                <div className='venue-details-element'>
                                    <i className="far fa-comment-alt"> </i>
                                    <span>{(Object.values(venue.reviews)).length} reviews</span>
                                </div>
                                <div className='venue-details-element'>
                                    <i className="fas fa-money-bill-wave"></i>
                                    <span>Price Per Couple: ${venue.price}</span>
                                </div>
                            </div>
                            <div className='container_venue-summary'>
                                {venue.description}
                            </div>
                            <Reviews />
                            <ReviewCreate venueId={id} />
                        </div>
                        <div className='container_venue-right'>
                            <div id="venueElement-reservation">{makeReservation}</div>
                            {/* <div id="venueElement-maps">Google Maps Placeholder</div> */}
                            {/* <div id="venueElement-info">Various Information Placeholder</div> */}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Venue
