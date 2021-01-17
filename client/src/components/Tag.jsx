import React from 'react';
import { Box } from '@material-ui/core';

export default function Tag(props) {
    const { name, count } = props;
    return(
        <Box
            flex
            style={{
                height: 15,
                backgroundColor: '#a3eeff',
                alignText: 'center',
                color: '#5b5fcf',
                padding: '5px',
                margin: '10px',
                border: '1px solid #5b5fcf'
            }}
        >
            {name}, {count}
        </Box>
    );
}
