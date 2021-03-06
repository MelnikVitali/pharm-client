import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: '1 0 auto',
        '& > *': {
            margin: theme.spacing(2),
        },
        marginTop: theme.spacing(4),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        margin: theme.spacing(3, 0, 0, 0),
    },
    margin: {
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        textDecoration: 'none !Important'
    },
    link: {
        marginLeft: theme.spacing(1),
        textDecoration: 'none !important'
    },
    button: {
        marginTop: theme.spacing(0.7)
    }
}));

export default useStyles;
