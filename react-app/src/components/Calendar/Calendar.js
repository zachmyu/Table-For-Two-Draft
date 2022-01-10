import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';

//! Need to change database so date and time are separate!

function Calendar() {
    const [date, setDate] = useState(new Date(new Date().setMinutes(0)))
    const [time, setTime] = useState(new Date(new Date().setMinutes(0)))

    return (
        <Stack component="form" noValidate spacing={3}>
            {/* <DateTimePicker
                label="Reservation Date & Time"
                value={dateTime}
                onChange={(newValue) => {
                    setDateTime(newValue);
                }}
                // renderInput={(params) => <TextField {...params} />}
                shouldDisableTime={(timeValue, clockType) => {
                    if (clockType === 'minutes' && timeValue % 30) {
                        return true;
                    }
                    return false;
                }}
            /> */}
            <DesktopDatePicker
                label="Reservation Date"
                value={date}
                minDate={new Date('2017-01-01')}
                onChange={(newValue) => {
                    setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
                renderInput={(params) => <TextField {...params} />}
                label="Reservation Time"
                value={time}
                onChange={(newValue) => {
                    setTime(newValue);
                }}
                shouldDisableTime={(timeValue, clockType) => {
                    if (clockType === 'minutes' && timeValue % 30) {
                        return true;
                    }
                    return false;
                }}
            />
        </Stack>
    );
}

export default Calendar
