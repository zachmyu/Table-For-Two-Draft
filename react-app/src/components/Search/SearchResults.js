import React from 'react'
import './SearchResults.css'

function SearchResults({ results }) {
    let resultList;
    if (results.length) {
        resultList = (
            <>
                <h4>The following results match your search: </h4>
                {results.map((venue) => (
                    <div className='venue-container' key={venue.id}>
                        <h1>{venue.name}</h1>
                        <a href={`/venues/${venue?.id}`}>
                            <img className='search-venue-pix'
                                src={venue?.image_url} alt={venue?.name} />
                        </a>
                        <p>{venue?.address}</p>
                        <p>{venue?.phone_number}</p>
                        <hr></hr>
                    </div>
                ))}
            </>
        )
    } else {
        resultList = (
            <>
                <h4>No results matches the term you searched for...</h4>
                <h4>Please try a different search term!</h4>
            </>
        )
    }

    return (
        <>
            {resultList}
        </ >
    )
}

export default SearchResults
