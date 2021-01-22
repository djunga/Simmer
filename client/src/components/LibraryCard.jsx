import React from 'react';
import { Paper } from '@material-ui/core';

export default function LibraryCard(props) {
    const { recipe } = props;
    return(
        <Paper
            elevation={8}
            style={{
                backgroundColor: '#a3eeff',
                color: '#5b5fcf',
                padding: '5px',
                border: '1px solid #5b5fcf'
            }}
        >
            {recipe?.title}
        </Paper>
    );
}
