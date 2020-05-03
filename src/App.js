import React from 'react';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import './App.css';
import {BrowserRouter} from "react-router-dom";
import UserContainer from "./feature/user/user-container";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fff',
            dark: '#666666',
        },
        secondary: {
            main: '#8cc640',
            contrastText: '#fff',
        },
    }
});
function App() {
    return (
        <MuiThemeProvider theme={theme}>
                    <BrowserRouter basename='/'>
                        <UserContainer/>
                    </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
