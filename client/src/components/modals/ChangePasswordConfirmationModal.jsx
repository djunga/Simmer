import React, { useEffect, useState } from 'react';
import {
    Backdrop,
    Box,
    Button,
    Fade,
    Grid,
    Modal,
    Snackbar,
    TextField,
    Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { changePassword } from '../../utils/api';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function ChangePasswordConfirmationModal(props) {
    const classes = useStyles();

    const { open, setOpen } = props;

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [doneDisabled, setDoneDisabled] = useState(true);

    /**
     * Determine whether "DONE" button should be enabled
     */
    const isValidInput = () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return false;
        }
        if (currentPassword.trim() === '' || newPassword.trim() === '' || confirmNewPassword.trim() === '') {
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            console.log("newPassword !== confirmNewPassword")
            return false;
        }
        return true;
    }

    const inputHandler = (e, setState) => setState(e.target.value);

    useEffect(() => setDoneDisabled(!isValidInput()), [currentPassword, newPassword, confirmNewPassword]);

    const closeModal = () => {
        [setCurrentPassword,setNewPassword, setConfirmNewPassword].forEach(setState => setState(''));
        setDoneDisabled(true);
        setOpen(false);
    }

    const submit = () => {
        changePassword(currentPassword, newPassword)
        .then(() => {
            alert('Password changed successfully.');
            // setSnackbarText("Password changed successfully.");
            // setSnackbarOpen(true);
            closeModal();
        })
        .catch(err => {
            if(err?.response?.status === 401) {
                // setSnackbarText("Incorrect current password entered.");
                // setSnackbarOpen(true);
                alert(err?.response?.status === 401 ? 'Current password is not correct.' : err);
            }
        });
    }

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={closeModal}
            
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Grid container align="center" style={{ backgroundColor: blueGrey[400], height: '40%', width: '30%' }}>
                    <Grid item xs={12}>
                        <Typography variant="h4">Change Password</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={currentPassword} onChange={(e) => inputHandler(e, setCurrentPassword)} variant="outlined" label="Current Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={newPassword} onChange={(e) => inputHandler(e, setNewPassword)} variant="outlined" label="New Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={confirmNewPassword} onChange={(e) => inputHandler(e, setConfirmNewPassword)} variant="outlined" label="Confirm New Password" />
                    </Grid>
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                        <Button variant="outlined" onClick={closeModal}>CANCEL</Button>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={3}>
                        <Button variant="outlined" onClick={submit} disabled={doneDisabled}>DONE</Button>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </Fade>
        </Modal>
    )
}

export default ChangePasswordConfirmationModal;
