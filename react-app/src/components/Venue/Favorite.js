import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUserFavorites, createFavorites, deleteFavorites } from "../../store/favorite"

function Favorites() {
    const dispatch = useDispatch();

    const [faved, setFaved] = useState({ id: null })

    const venue = useSelector(state => state?.venue.current)
    const sessionUser = useSelector(state => state.session.user)
    const userFavorites = sessionUser ? Object.values(sessionUser?.favorites) : null
    const faveFind = userFavorites?.find(favorite => favorite?.venue_id === venue.id)

    useEffect(() => {
        if (faveFind)
            setFaved({ id: faveFind.id })
    }, [faveFind])

    async function handleFav() {
        if (faved.id) {
            await dispatch(deleteFavorites(faved.id))
            setFaved({ id: null })
        } else {
            let res = await dispatch(createFavorites({ userId: sessionUser.id, venueId: venue.id }))
            setFaved({ id: res.favorite.id })
        }
    }

    return (
        <>
            <span className='fav-title'>
                {faved.id ? <>Remove from your favorites...</>
                    : <>Add to your favorites</>
                }
            </span>

            <button
                type='button'
                onClick={() => handleFav()}
                id={faved.id ? 'button-unfave' : 'button-addfave'}
            >
                <i className="fas fa-heart" />
            </button >
        </>
    )


}

export default Favorites
