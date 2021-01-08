import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

export default function Navbar(props) {
    const history = useHistory();

    return(
        <div >
            <Box
                style={{
                    height: 1000,
                    width: 1000,
                    backgroundColor: 'red',
                    display: 'flex',
                    flexDirection: 'row'
                }}
            > 
                <Box
                    style={{
                        height: 300,
                        width: 400,
                        backgroundColor: 'pink',
                    }}
                >
                </Box>
                <Box
                    style={{
                        height: 300,
                        width: 400,
                        backgroundColor: 'blue',
                    }}
                >
                </Box>
                <Box
                    style={{
                        height: 300,
                        width: 400,
                        backgroundColor: 'green',
                    }}
                >
                </Box>
            </Box>
        </div>
    );
}
