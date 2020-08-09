import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        marginBottom: theme.spacing(2)
    },
    error: {
        marginTop: theme.spacing(12),
        color: '#DD4040',
        fontWeight: 'bold'
    }
}));

export default useStyles;
