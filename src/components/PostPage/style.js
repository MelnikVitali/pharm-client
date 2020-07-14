import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
        marginTop: theme.spacing(4),
    },

    margin: {
        margin: theme.spacing(2, 1, 2, 0),
    },
    marginBottom:{
        marginBottom: theme.spacing(2)
    },
    textMuted:{
        color: '#6c757d'
    },
    textDecoration:{
        textDecoration:'none !important'
    }
}));

export default useStyles;
