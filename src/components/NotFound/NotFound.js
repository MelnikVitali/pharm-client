import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='text-center'>
            <h1>Страница не найдена</h1>
            <p>Вернуться на <Link to='/'>главную страницу</Link></p>
        </div>
    );
};
export default NotFound;