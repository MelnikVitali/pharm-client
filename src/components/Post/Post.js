import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';

import { APIUrls } from '../../configs/APIUrls';

const Post = (props) => {
    const classes = useStyles();

    const shortText = text => text.substr(0, 100) + "...";

    const { post } = props;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h3" component="h2">
                    {post.title}
                </Typography>
                <Typography variant="body2" component="p">
                    {post.text ? shortText(post.text) : '...'}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`${APIUrls.post}/${post._id}`}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Подробнеее
                    </Button>
                </Link>
            </CardActions>
        </Card>
  );
};

export default Post;

