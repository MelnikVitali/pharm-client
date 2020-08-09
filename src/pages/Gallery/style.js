import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        root: {
            flex: '1 0 auto',
            '& > *': {
                margin: theme.spacing(2),
            },
        },
    },
    gridList: {
        width: 550,
        height: 450,
    },
    subtitle: {
        width: '100% !important',
        marginTop: theme.spacing(12)
    }
}));

export default useStyles;
