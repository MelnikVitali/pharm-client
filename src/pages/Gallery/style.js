import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        flex: '1 0 auto',
    },
    gridList: {
        width: 650,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
        'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, ' +
            'rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
    },
    tile: {
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '49% !important',
        margin: '0.5% !important',
        border: '2px solid white',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
    },
    title:{
        padding:'0.5rem 1.5rem !important'
    },
    icon: {
        color: 'white',
        "&:hover": {
            color: 'lightblue'
        }
    },
    zoom:{
        fontSize:'1.7rem',
        "&:hover": {
            color: 'lightblue'
        }
    }
}));

export default useStyles;
