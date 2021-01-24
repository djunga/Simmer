import React, {useContext, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Box, Button, Grid } from '@material-ui/core';
import { Text } from 'react-font';
import UserContext from '../../contexts/UserContext';
import ChangePasswordConfirmationModal from '../modals/ChangePasswordConfirmationModal';
import { getEmail } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    parentBox: {
        marginTop: '1%',
        height: '93%',
        width: '100%',
    },
    headingBox: {
        margin: '3%'
    },
  }));

/*
    TODO: Home Page
*/
export default function MyAccountPage(props) {
    const history = useHistory();
    const classes = useStyles();

    const { user, setUser } = useContext(UserContext);
    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [email, setEmail] = useState(""); 

    // useEffect(() => {
    //     // getEmail()
    //     // .then((e) => {
            
    //     //     //setEmail(e);
    //     // })
    //     // .catch(err => {
    //     //     console.log("Error fetching email.");
    //     // });
    //     //setEmail(user.email);
    //     console.log("user: ", user);
    // }, [email]);

    return(
        <Box className={classes.parentBox}>
            <Box
                style={{
                    padding: '1%'
                }}
            >
                <Box className={classes.headingBox}>
                    <Text family="Courgette" style={{ fontSize: 40, margin: 0 }} >
                        My Account
                    </Text>
                </Box>
                <Box >
                    <Text family="Roboto" style={{ fontSize: 30, margin: 0 }} >
                        Email: {user?.email}
                    </Text>
                </Box>
                <Button
                    style={{
                        height: '10%',
                        width: '20%',
                        padding: '2%',
                        margin: '5%',
                        fontSize: 16,
                        backgroundColor: '#7efcc8'
                    }}
                    onClick={() => setChangePasswordModalOpen(true)}
                >
                    change password
                </Button>
                <ChangePasswordConfirmationModal open={changePasswordModalOpen} setOpen={setChangePasswordModalOpen} />
            </Box>
        </Box>
    );
}

