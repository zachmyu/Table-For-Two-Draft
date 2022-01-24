// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = user => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

const initialState = { user: null };

export const authenticate = () => async dispatch => {
    const response = await fetch(`/api/auth/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setUser(data));
    }
}

export const login = (email, password) => async dispatch => {
    const response = await fetch(`/api/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}

export const logout = () => async dispatch => {
    const response = await fetch(`/api/auth/logout/`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};

// export const signUp = userData => async dispatch => {
//     const { firstName, lastName, username, email, password, profileImgUrl } = userData
//     const response = await fetch(`/api/auth/signup/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             first_name: firstName,
//             last_name: lastName,
//             username: username,
//             email: email,
//             profile_image_url: profileImgUrl,
//             password: password
//         }),
//     });

//     const data = await response;
//     console.log(data)
//     if (response.ok) {
//         dispatch(setUser(data))
//         return data;
//     } else if (response.status < 500) {
//         if (data.errors) {
//             return data.errors;
//         }
//     } else {
//         return ['An error occurred. Please try again.']
//     }
// }
export const signUp = (first_name, last_name, username, email, password, profile_image_url) => async (dispatch) => {
    const formData = new FormData();

    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    if (profile_image_url) formData.append("image", profile_image_url);

    const response = await fetch('/api/auth/signup/', {
        method: 'POST',
        headers: {
            'enctype': 'multipart/form-data',
        },
        body: formData,
    })

    const data = await response.json();
    if (data.errors) {
        return data
    }
    dispatch(setUser(data))
    return data
}




export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        default:
            return state;
    }
}
