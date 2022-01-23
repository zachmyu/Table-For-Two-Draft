import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage'
import Venue from './components/Venue/Venue';
import SearchResults from './components/Search/SearchResults';
import User from './components/User/User';
import Footer from './components/NavBar/Footer';
// import UsersList from './components/UsersList';
// import Calendar from './components/Calendar'
// import DropDown from './components/DropDown'
// import GoogleMap from './components/Venue/GoogleMap'


function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const [results, setResults] = useState("")

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NavBar loaded={loaded} />
            {loaded && (
                <Switch>
                    <Route exact path='/' >
                        <HomePage setResults={setResults} />
                    </Route>
                    <Route exact path='/venues/:id'>
                        <Venue />
                    </Route>
                    <Route exact path='/search'>
                        <SearchResults results={results} />
                    </Route>
                    <ProtectedRoute exact path='/users/:userId'>
                        <User />
                    </ProtectedRoute>
                    {/* <ProtectedRoute exact path='/users'>
                        <UsersList />
                    </ProtectedRoute> */}
                    {/* <Route exact path='/calendar'>
                        <Calendar></Calendar>
                    </Route> */}
                    {/* <Route exact path='/dropdown'>
                        <DropDown></DropDown>
                    </Route> */}
                    {/* <Route exact path='/google-map'>
                        <GoogleMap></GoogleMap>
                    </Route> */}
                </Switch>
            )}
            <Footer />
        </LocalizationProvider>
    );
}

export default App;
