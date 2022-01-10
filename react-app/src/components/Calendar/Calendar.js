import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import DateTimePicker from '@mui/lab/DateTimePicker';

function Calendar({ dateTime, setDateTime }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Reservation Date & Time"
                value={dateTime}
                onChange={(newValue) => {
                    setDateTime(newValue);
                }}
                shouldDisableTime={(timeValue, clockType) => {
                    if (clockType === 'minutes' && timeValue % 30) {
                        return true;
                    }
                    return false;
                }}
            />
        </LocalizationProvider>
    );
}

export default Calendar
