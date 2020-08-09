import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flex: '1 0 auto',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        marginTop: 20,
    },
}));

export default useStyles;
