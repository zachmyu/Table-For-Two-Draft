import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllUserFavorites, createFavorites, deleteFavorites, getOneFavorite } from "../../store/favorite"

function Favorites() {
    const dispatch = useDispatch();

    const [buttonUnFave, setButtonUnFave] = useState('button-unfave')
    const [buttonAddFave, setButtonAddFave] = useState('button-addfave')
    const [oneClickBtn, setOneClickBtn] = useState(false)

    const venue = useSelector(state => state?.venue.current)
    const sessionUser = useSelector(state => state.session.user)
    const userFavorites = sessionUser ? Object.values(sessionUser?.favorites) : null
    const faveFind = userFavorites?.find(favorite => favorite?.venue_id === venue.id)

    useEffect(() => {
        dispatch(getAllUserFavorites(sessionUser.id))
    }, [dispatch, sessionUser.id])

    useEffect(() => {
        if (faveFind)
            setButtonAddFave('button-addfave-clicked')
    }, [faveFind])




    const addFave = async (e) => {
        e.preventDefault();
        setButtonAddFave('button-addfave-clicked')
        // setOneClickBtn(true)
        await dispatch(createFavorites({ userId: sessionUser.id, venueId: venue.id }))
        console.log(!!faveFind)
    }

    const unFave = async (favId) => {
        console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        await dispatch(deleteFavorites(favId))
        setButtonUnFave('button-unfave-clicked')
        setOneClickBtn(true)
        console.log(!!faveFind)

    }

    let favoriteButton;
    if (faveFind) {
        favoriteButton = (
            <div className='reservation-favorites'>
                <span className='fav-title'>New Remove from your favorites? ☹</span>
                <button type='button'
                    disabled={oneClickBtn}
                    id={buttonUnFave}
                    onClick={() => unFave(faveFind.id)}
                // onClick={() => (
                //     unFave(userFavorites.find(favorite => (
                //         favorite?.venue_id === venue.id
                //     ))?.venue.id)
                // )}
                >
                    <i className="fas fa-heart" />
                </button >
            </div >
        )
    } else {
        favoriteButton = (
            <div className='reservation-favorites'>
                <span className='fav-title'>New Add to your favorites!</span>
                <button type='button'
                    // disabled={oneClickBtn}
                    id={buttonAddFave}
                    onClick={addFave}>
                    <i className="fas fa-heart" />
                </button>
            </div>
        )
    }

    return (
        <>
            {favoriteButton}
        </>
    )


}

export default Favorites
