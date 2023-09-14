import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        display: 'flex',
        // flexGrow: 1,
        justifyContent: 'space-between',
        flexWrap: 'wrap'
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
    google: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100% ',
        marginRight: '0 !important'
    },
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
    btnRepeatEmail: {
        margin: theme.spacing(2)
    }
}));

export default useStyles;
