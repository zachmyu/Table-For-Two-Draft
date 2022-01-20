const READ_SINGLE_REVIEW = 'review/READ_SINGLE_REVIEW'
const READ_ALL_REVIEWS = 'review/READ_ALL_REVIEWS'
const CREATE_REVIEW = 'review/CREATE_REVIEW'
const UPDATE_REVIEW = 'review/UPDATE_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'


const loadOneReview = review => ({
    type: READ_SINGLE_REVIEW,
    payload: review
});

const loadAllReviews = reviews => ({
    type: READ_ALL_REVIEWS,
    payload: reviews
});

const addReview = review => ({
    type: CREATE_REVIEW,
    payload: review
});

const changeReview = reviewId => ({
    type: UPDATE_REVIEW,
    payload: reviewId
});

const removeReview = reviewId => ({
    type: DELETE_REVIEW,
    payload: reviewId
});


export const getOneReview = reviewId => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}/`)
    const data = await res.json();

    if (res.ok) {
        dispatch(loadOneReview(data))
    } else {
        throw res;
    };
}

export const getAllUserReviews = userId => async dispatch => {
    const res = await fetch(`/api/reviews/users/${userId}/`);
    const data = await res.json();

    if (res.ok) {
        dispatch(loadAllReviews(data))
    } else {
        throw res;
    };
}

export const getAllVenueReviews = venueId => async dispatch => {
    const res = await fetch(`/api/reviews/venues/${venueId}/`);
    const data = await res.json();

    if (res.ok) {
        dispatch(loadAllReviews(data))
    } else {
        throw res;
    };
}

export const createReview = reviewData => async dispatch => {
    const { userId, venueId, title, body, rating } = reviewData
    const res = await fetch(`/api/reviews/venues/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            venue_id: venueId,
            title,
            body,
            rating
        }),

    });
    const data = await res.json();

    if (res.ok) {
        dispatch(addReview(data))
    } else {
        throw res;
    };
    return data
}

export const updateReview = reviewData => async dispatch => {
    const { userId, venueId, title, body, rating, reviewId } = reviewData
    const res = await fetch(`/api/reviews/${reviewId}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            venue_id: venueId,
            title,
            body,
            rating
        }),
    });
    const data = await res.json();

    if (res.ok) {
        dispatch(changeReview(data))
    } else {
        throw res;
    };
    return data
}

export const deleteReview = reviewId => async dispatch => {
    const res = await fetch(`/api/reviews/${reviewId}/`, {
        method: 'DELETE',
    })

    if (res.ok) {
        dispatch(removeReview(reviewId))
    } else {
        throw res;
    };
}


const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case READ_SINGLE_REVIEW:
            newState = { ...state };
            newState.current = action.payload;
            return newState;

        case READ_ALL_REVIEWS:
            newState = { ...action.payload };
            return newState;

        case CREATE_REVIEW:
            newState = Object.assign({}, state);
            newState[action.payload.review.id] = action.payload.review;
            return newState;

        case UPDATE_REVIEW:
            newState = {
                ...state,
                [action.payload.id]: action.payload
            };
            return newState;

        case DELETE_REVIEW:
            newState = { ...state };
            delete newState[action.payload];
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;
