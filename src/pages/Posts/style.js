import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: '1 0 auto',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    marginTop: {
        marginTop: theme.spacing(12)
    },
}));

export default useStyles;
