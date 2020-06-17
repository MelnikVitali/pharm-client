import React from 'react';
import { connect } from 'react-redux'

import { deleteComment } from "../../store/actions/postActions";

const mapStateToProps = state => ({
    user: state.authReducer.user
});

export const Comment = connect(mapStateToProps, { deleteComment })(props => {
    const { comment, user } = props;

    const deleteComment = () => {
        const id = comment._id;

        props.deleteComment(id);
    };

    return (
        <div className='card mb-3'>
            <div className="card-body">
                <h4>{ comment.author.name }</h4>
                <p>{ comment.text }</p>

                { user && user.id === comment.author._id && (
                    <button
                        className="btn-danger"
                        onClick={ deleteComment }>
                        Удалить
                    </button>
                )
                }
            </div>
        </div>
    );
});
