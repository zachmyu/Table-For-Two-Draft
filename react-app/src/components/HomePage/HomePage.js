import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getAllVenues } from "../../store/venue"
import "./HomePage.css";

function HomePage({ setResults }) {
    const venues = useSelector(state => state?.venue)
    const venueArray = Object.values(venues)
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllVenues())
    }, [dispatch])

    // let foundVenues = []
    const handleClick = () => {
        const venueFilter = venueArray.filter((venue) => {
            return venue.name.toLowerCase().includes(search.toLowerCase())
        })
        // foundVenues.push(venueFilter)
        setResults(venueFilter)
        setSearch("")
        // console.log("fffooooouuunnnndddd", results)
        return history.push("/search")
    }


    return (
        <>
            <div className="splash-container" style={{
                backgroundImage: `url("/images/splash_background.jpg")`
            }}>
                <h1 id="slogan">A date for any occasion</h1>
                <div className="splash-search-container" >
                    <form onSubmit={handleClick} className="splash-search-form">
                        <input
                            name="search"
                            id="splash-search"
                            type="text"
                            placeholder="Place or Date Type"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required
                        ></input>
                        <button className="splash-button">Let's go</button>
                    </form>
                </div>
            </div>
            <div className="splash-venues-container">
                {venueArray.map(venue => (
                    <a href={`/venues/${venue.id}`} key={venue.id}>
                        <div className="splash-venue-card" >
                            <img src={venue.image_url}
                                className="splash-venue-pix"
                                alt="{venue.name}" />
                            <div className="splash-venue-description">
                                <div className="splash-venue-title">
                                    <h3>{venue.name}</h3>
                                </div>
                                <div className="splash-venue-location">
                                    {venue.city} {venue.state}
                                </div>
                                <div className="splash-venue-hours">
                                    Hours: {venue.operation_hours}
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
}

export default HomePage
