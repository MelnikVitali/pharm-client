import React from 'react';
import { Link } from 'react-router-dom';

export const Post = (props) => {
    const shortText = text => text.substr(0, 100) + "...";

    const { post } = props;

    return (
        <div className='card mb-3'>
            <div className="card-body">
                <h1>{ post.title }</h1>
                <p>{ shortText(post.text) }</p>
                <Link to={ `/post/${ post._id }` } className="btn btn-primary">Подробнее</Link>
            </div>
        </div>
    );
};

