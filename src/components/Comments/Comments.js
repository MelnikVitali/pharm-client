import React from 'react';

import { Comment } from '../Comment/Comment'

export const Comments = (props) => {

    const { comments } = props;

    if (comments.length === 0) {
        return (<p>Список комментариев пока пуст</p>);
    }

    return (
        <div>
            {
                comments.map(comment => (
                    <Comment key={ comment._id } comment={ comment } />
                ))
            }
        </div>
    );

};

