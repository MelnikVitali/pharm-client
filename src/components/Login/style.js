import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
    },
    facebookBtn: {
        backgroundColor: '#395697 !important',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: '#fff',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid transparent',
        fontSize: '14px',
        fontWeight: 500,
        fontFamily: 'Roboto, sans-serif',
        lineHeight: 1.95,
        cursor:'pointer'
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 0 auto',
    },
    line: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    google: {},
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: 'red',
    },
    btnRepeatEmail:{
        margin:theme.spacing(2)
    }
}));

export default useStyles;
