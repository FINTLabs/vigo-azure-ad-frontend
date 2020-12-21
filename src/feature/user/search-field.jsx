import React from 'react';
import {Box} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const SearchField = (props) => {
    const {searchValue, setSearchValue} = props;
    return (
        <Box display={"flex"} width={300} margin={"auto"} justifyContent={"center"} mt={2} >
            <TextField id="outlined-basic" label="Søk på navn" variant="outlined" onChange={(setSearchValue)} value={searchValue} color={"secondary"} placeholder={"Fornavn Etternavn"}/>
        </Box>
    );
};

export default SearchField;