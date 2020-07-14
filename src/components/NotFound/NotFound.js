import React from 'react';
import { Link } from 'react-router-dom';

import { APIUrls } from '../../configs/APIUrls';
import Typography from '@material-ui/core/Typography';

const NotFound = () => {
    return (
<>
            <Typography variant="h3" item xs align='center'>
                Страница не найдена
            </Typography>
            <Typography component='p' variant="p" item align='center'>
                Вернуться на <Link to={APIUrls.homePage}>главную страницу</Link>
            </Typography>
    </>
    );
};

export default NotFound;
