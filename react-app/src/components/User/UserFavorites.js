import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUserFavorites } from '../../store/favorite'


function UserFavorites() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state?.session.user)
    const userFavorites = Object.values(useSelector(state => state.favorite))

    useEffect(() => {
        dispatch(getAllUserFavorites(sessionUser.id))
    }, [dispatch, sessionUser.id])

    return (
        <>
            <h2> Your Favorited Places </h2>
            {userFavorites.map(favorite => (
                <a href={`/venues/${favorite.venue.id}`} key={favorite.id}>
                    <h5>{favorite.venue.name}</h5>
                </a>
            ))}
        </>
    )
}

export default UserFavorites
