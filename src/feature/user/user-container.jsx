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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from "@material-ui/core/Button";
import axios from "axios";
import MemberIcon from '@material-ui/icons/Apartment';
import GuestIcon from '@material-ui/icons/Language';
import AcceptedIcon from '@material-ui/icons/Check';
import AcceptedWaitingIcon from '@material-ui/icons/HourglassEmpty';
import moment from 'moment';
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import CountySelector from "./county-selector";
import SearchField from "./search-field";


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
    countyImageTop: {
        height: 40,
        marginTop: 25,
        marginLeft: 10,
    },
    vigoLogo: {
        height: '75px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(4),
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

const UserContainer = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [county, setCounty] = useState(34);
    const [searchValue, setSearchValue] = useState('');
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
        axios.post('/api/qlik/user/invite/'+user.mail, {
            },
        )
            .then(result => {
                if (result.status === 204) {
                    setMessage(`${user.displayName} ble invitert på nytt`);
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

    const [sortBy, setSortBy] = React.useState('');
    const [sortOrder, setSortOrder] = React.useState('asc');

    const handleSort = (property) => {
        const isAsc = sortBy === property && sortOrder === 'asc';
        setSortBy(property);
        setSortOrder(isAsc ? 'desc' : 'asc');

        // Implement the sorting logic for your array
        const sorted = [...users].sort((a, b) => {
            if (isAsc) {
                return a[property].localeCompare(b[property]);
            } else {
                return b[property].localeCompare(a[property]);
            }
        });

        // Update the users array with the sorted data
        setUsers(sorted);
    };

    function handleFilterCountyChange(event) {
        setCounty(event.target.value);
    }

    function handleSearchValue(event) {
        setSearchValue(event.target.value);
    }

    function matchSearch(user) {
        let matched = false;
        let lowerCaseSearchValue = searchValue.toLowerCase();
        if (searchValue === '') {
            matched = true;
        } else if (user.givenName && user.givenName.toLowerCase().includes(lowerCaseSearchValue)) {
            matched = true;
        }
        else if (user.surName && user.surName.toLowerCase().includes(lowerCaseSearchValue)) {
            matched = true;
        }
        else if (user.displayName && user.displayName.toLowerCase().includes(lowerCaseSearchValue)) {
            matched = true;
        }
        return matched;
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <img src='./assets/vigo.svg' alt="Vigo logo" className={classes.vigoLogo}/>
                    <Typography variant="h4" className={classes.title}>
                        Qlik Sense brukere av lokale apper
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
                <CountySelector classes={classes} county={county} handleFilterCountyChange={handleFilterCountyChange}/>
                <SearchField searchValue={searchValue} setSearchValue={handleSearchValue}/>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy === 'displayName'}
                                    direction={sortBy === 'displayName' ? sortOrder : 'asc'}
                                    onClick={() => handleSort('displayName')}
                                >
                                    Navn
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy === 'mail'}
                                    direction={sortBy === 'mail' ? sortOrder : 'asc'}
                                    onClick={() => handleSort('mail')}
                                >
                                    Epost
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Fylke</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell>Invitasjon sist oppdatert</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={sortBy === 'createdDateTime'}
                                    direction={sortBy === 'createdDateTime' ? sortOrder : 'asc'}
                                    onClick={() => handleSort('createdDateTime')}
                                >
                                    Opprettet
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Handling</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.filter(user => user.department === county.toString() || county === 0)
                            .filter(user => matchSearch(user))
                            .map(user => (
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
                                                Send invitasjon
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
