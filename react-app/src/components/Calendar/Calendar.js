import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function Calendar() {
    return (
        <Stack component="form" noValidate spacing={3}>
            {/* <TextField
                id="date"
                label="Birthday"
                type="date"
                defaultValue="2017-05-24"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
            /> */}
            {/* <TextField
                id="time"
                label="Alarm clock"
                type="time"
                defaultValue="07:30"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                sx={{ width: 150 }}
            /> */}
            <TextField
                id="datetime-local"
                label="Make a reservation"
                type="datetime-local"
                defaultValue="2022-01-01T08:00"
                sx={{ width: 250 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Stack>
    );
}

export default Calendar
