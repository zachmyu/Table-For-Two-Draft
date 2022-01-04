import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TimePicker from '@mui/lab/TimePicker';

import Stack from '@mui/material/Stack';
import { format } from 'date-fns'

function Calendar() {
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(format(new Date(), "HH"))

    return (
        <Stack component="form" noValidate spacing={3}>
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
