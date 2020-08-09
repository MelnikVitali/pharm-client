import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './style';


const Preloader = () => {
    const classes = useStyles();

    return (
        <div>
            <Backdrop className={classes.backdrop} open>
                <CircularProgress
                    color="inherit"
                    size={66}
                    thickness={4}
                />
            </Backdrop>
        </div>
    );
};

export default Preloader;
