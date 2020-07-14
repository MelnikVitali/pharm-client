import React from 'react';

import spinner from './Spinner.gif'

const Spinner =() => {
        return (
            <div>
               <img src={spinner}
                    alt="Загрузка"
                    style={{
                        display: 'block',
                        margin:'auto',
                        width: '160px'
                    }}/>
            </div>
        );
};

export default Spinner;
