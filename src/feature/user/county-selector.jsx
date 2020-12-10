import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import GetCountyPicture from "./get-county-picture";

const CountySelector = (props) => {
    const {classes, county, handleFilterCountyChange} = props;
    return (
        <Box display={"flex"} width={300} margin={"auto"} justifyContent={"center"}>
            <FormControl className={classes.formControl}>
                <InputLabel id="counties">Velg fylke</InputLabel>
                <Select
                    labelId="counties"
                    id="county-select"
                    value={county}
                    onChange={(event) => handleFilterCountyChange(event)}
                >
                    <MenuItem value={0}>Alle</MenuItem>
                    <MenuItem value={3}> <Box ml={1}>Oslo</Box></MenuItem>
                    <MenuItem value={11}><Box ml={1}>Rogaland</Box></MenuItem>
                    <MenuItem value={15}><Box ml={1}>Møre og Romsdal</Box></MenuItem>
                    <MenuItem value={18}><Box ml={1}>Nordland</Box></MenuItem>
                    <MenuItem value={30}><Box ml={1}>Viken</Box></MenuItem>
                    <MenuItem value={34}><Box ml={1}>Innlandet</Box></MenuItem>
                    <MenuItem value={38}><Box ml={1}>Vestfold og Telemark</Box></MenuItem>
                    <MenuItem value={42}><Box ml={1}>Agder</Box></MenuItem>
                    <MenuItem value={46}><Box ml={1}>Vestland</Box></MenuItem>
                    <MenuItem value={50}><Box ml={1}>Trøndelag</Box></MenuItem>
                    <MenuItem value={54}><Box ml={1}>Troms og Finnmark</Box></MenuItem>
                </Select>
            </FormControl>
            {county !== 0 && <GetCountyPicture number={county} classes={classes}/>}
        </Box>
    );
};

export default CountySelector;