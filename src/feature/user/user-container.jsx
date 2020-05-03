import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MemberIcon from '@material-ui/icons/Apartment';
import GuestIcon from '@material-ui/icons/Language';
import AcceptedIcon from '@material-ui/icons/Check';
import AcceptedWaitingIcon from '@material-ui/icons/HourglassEmpty';
import moment from 'moment';
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";


const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    countyImage: {
        height: 40,
    },
    vigoLogo: {
        height: '75px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(4),
        padding: theme.spacing(2),
    },

}));

const UserContainer = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const classes = useStyles();

    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowMessage(false);
    };

    const refreshUsers = () => {
        setLoading(true);
        axios.get('/api/user')
            .then(result => {
                if (result.status === 200) {
                    setUsers(result.data);
                }
            })
            .finally(() => setLoading(false));
    }

    const reInvite = (user => {
        setLoading(true);
        axios.post('/api/user/invite/' + user.mail)
            .then(result => {
                if (result.status === 204) {
                    setMessage(`${user.displayName} ble inviter på nytt`);
                    setShowMessage(true);
                }
            })
            .catch(e => {
                setMessage('En feil oppstod :(');
                setShowMessage(true);
            })
            .finally(() => setLoading(false));
    })

    useEffect(() => {
        refreshUsers();
    }, []);

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <img src='./assets/vigo.svg' alt="Vigo logo" className={classes.vigoLogo}/>
                    <Typography variant="h4" className={classes.title}>
                        QLIK BRUKER ADMIN
                    </Typography>
                </Toolbar>
            </AppBar>
            {loading && <LinearProgress color="secondary"/>}
            <Box className={classes.root} m={4}>
                <Snackbar
                    open={showMessage}
                    autoHideDuration={6000}
                    onClose={handleCloseMessage}
                    message={message}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                />
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Navn</TableCell>
                            <TableCell>Epost</TableCell>
                            <TableCell align="center">Fylke</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell>Invitasjon sist oppdatert</TableCell>
                            <TableCell>Opprettet</TableCell>
                            <TableCell>Handling</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.userPrincipalName}>
                                <TableCell component="th" scope="row">
                                    {user.displayName}
                                </TableCell>
                                <TableCell>
                                    {user.mail ? user.mail : user.userPrincipalName}
                                </TableCell>
                                <TableCell align="center">
                                    {user.department &&
                                    <img alt="fylkesvåpen" className={classes.countyImage}
                                         src={'./assets/' + user.department + '.png'}/>}
                                </TableCell>
                                <TableCell>
                                    {
                                        user.externalUserState === 'PendingAcceptance' ?
                                            <Tooltip
                                                title="Venter på at brukeren skal akseptere invitasjonen">
                                                <AcceptedWaitingIcon/>
                                            </Tooltip>
                                            : <AcceptedIcon/>
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {user.userType === 'Guest' ?
                                        <Tooltip title="Gjest"><GuestIcon/></Tooltip> :
                                        <Tooltip title="Intern"><MemberIcon/></Tooltip>}
                                </TableCell>
                                <TableCell>
                                    {
                                        user.userType === 'Guest' &&
                                        moment(user.externalUserStateChangeDateTime).format("DD.MM.Y HH:mm:ss")

                                    }
                                </TableCell>
                                <TableCell>
                                    {moment(user.createdDateTime).format("DD.MM.Y HH:mm:ss")}
                                </TableCell>
                                <TableCell>
                                    {
                                        user.userType === 'Guest' &&
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => reInvite(user)}
                                        >
                                            Inviter på nytt
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Box>
        </Box>
    );
};

export default UserContainer;
