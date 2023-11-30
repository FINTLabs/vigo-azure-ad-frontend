import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import GetCountyPicture from "./get-county-picture";

const sortArray = (array) => array.sort()

// const CountySelector = (props) => {
//     const {classes, county, handleFilterCountyChange} = props;
//     return (
//         <Box display={"flex"} width={300} margin={"auto"} justifyContent={"center"}>
//             <FormControl className={classes.formControl}>
//                 <InputLabel id="counties">Velg fylke</InputLabel>
//                 <Select
//                     labelId="counties"
//                     id="county-select"
//                     value={county}
//                     onChange={(event) => handleFilterCountyChange(event)}
//                 >
//                     <MenuItem value={3}> <Box ml={1}>Oslo</Box></MenuItem>
//                     <MenuItem value={11}><Box ml={1}>Rogaland</Box></MenuItem>
//                     <MenuItem value={15}><Box ml={1}>Møre og Romsdal</Box></MenuItem>
//                     <MenuItem value={18}><Box ml={1}>Nordland</Box></MenuItem>
//                     <MenuItem value={30}><Box ml={1}>Viken</Box></MenuItem>
//                     <MenuItem value={31}><Box ml={1}>Østfold</Box></MenuItem>
//                     <MenuItem value={32}><Box ml={1}>Akershus</Box></MenuItem>
//                     <MenuItem value={33}><Box ml={1}>Buskerud</Box></MenuItem>
//                     <MenuItem value={34}><Box ml={1}>Innlandet</Box></MenuItem>
//                     <MenuItem value={38}><Box ml={1}>Vestfold og Telemark</Box></MenuItem>
//                     <MenuItem value={39}><Box ml={1}>Vestfold</Box></MenuItem>
//                     <MenuItem value={40}><Box ml={1}>Telemark</Box></MenuItem>
//                     <MenuItem value={42}><Box ml={1}>Agder</Box></MenuItem>
//                     <MenuItem value={46}><Box ml={1}>Vestland</Box></MenuItem>
//                     <MenuItem value={50}><Box ml={1}>Trøndelag</Box></MenuItem>
//                     <MenuItem value={54}><Box ml={1}>Troms og Finnmark</Box></MenuItem>
//                     <MenuItem value={55}><Box ml={1}>Troms</Box></MenuItem>
//                     <MenuItem value={56}><Box ml={1}>Finnmark</Box></MenuItem>
//                     <MenuItem value={98}><Box ml={1}>IST</Box></MenuItem>
//                 </Select>
//             </FormControl>
//             {county !== 0 && <GetCountyPicture number={county} classes={classes}/>}
//         </Box>
//     );
// };
const counties = [
    { value: 3, label: 'Oslo' },
    { value: 11, label: 'Rogaland' },
    { value: 15, label: 'Møre og Romsdal' },
    { value: 18, label: 'Nordland' },
    { value: 30, label: 'Viken' },
    { value: 31, label: 'Østfold' },
    { value: 32, label: 'Akershus' },
    { value: 33, label: 'Buskerud' },
    { value: 34, label: 'Innlandet' },
    { value: 38, label: 'Vestfold og Telemark' },
    { value: 39, label: 'Vestfold' },
    { value: 40, label: 'Telemark' },
    { value: 42, label: 'Agder' },
    { value: 46, label: 'Vestland' },
    { value: 50, label: 'Trøndelag' },
    { value: 54, label: 'Troms og Finnmark' },
    { value: 55, label: 'Troms' },
    { value: 56, label: 'Finnmark' },
    { value: 98, label: 'IST' },
];
const CountySelector = (props) => {
    const { classes, county, handleFilterCountyChange } = props;

    const sortArray = (array) => array.slice().sort((a, b) => a.label.localeCompare(b.label));


    const sortedCounties = sortArray(counties);

    return (
        <Box display="flex" width={300} margin="auto" justifyContent="center">
            <FormControl className={classes.formControl}>
                <InputLabel id="counties">Velg fylke</InputLabel>
                <Select
                    labelId="counties"
                    id="county-select"
                    value={county}
                    onChange={(event) => handleFilterCountyChange(event)}
                >
                    {sortedCounties.map((county) => (
                        <MenuItem key={county.value} value={county.value}>
                            <Box ml={1}>{county.label}</Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {county !== 0 && <GetCountyPicture number={county} classes={classes} />}
        </Box>
    );
};

export default CountySelector;
