import React from 'react';

const GetCountyPicture = (props) => {
    const {number, classes} = props;
    return (
        <img alt="fylkesvåpen" className={classes.countyImageTop}
             src={'./assets/' + number + '.png'}/>
    );
};

export default GetCountyPicture;