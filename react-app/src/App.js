import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from './components/NavBar/NavBar';
// import UsersList from './components/UsersList';
import User from './components/User/User';
// import Calendar from './components/Calendar'
// import DropDown from './components/DropDown'
// import GoogleMap from './components/Venue/GoogleMap'
import Venue from './components/Venue/Venue';
import HomePage from './components/HomePage/HomePage'
// import Search from './components/Search'
import Footer from './components/NavBar/Footer';



function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const [results, setResults] = useState([])

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <NavBar loaded={loaded} />
            {loaded && (
                <Switch>
                    {/* <Route exact path='/calendar'>
                        <Calendar></Calendar>
                    </Route> */}
                    {/* <Route exact path='/dropdown'>
                        <DropDown></DropDown>
                    </Route> */}
                    {/* <Route exact path='/google-map'>
                        <GoogleMap></GoogleMap>
                    </Route> */}
                    <Route exact path='/venues/:id'>
                        <Venue></Venue>
                    </Route>
                    {/* <Route exact path='/search'>
                        <Search results={results} />
                    </Route> */}
                    <Route exact path='/' >
                        <HomePage setResults={setResults} />
                    </Route>
                    <ProtectedRoute exact path='/users'>
                        <UsersList />
                    </ProtectedRoute>
                    {/* <ProtectedRoute exact path='/users/:userId'>
                        <User />
                    </ProtectedRoute> */}
                </Switch>
            )}
            <Footer />
        </>
    );
}

export default App;
