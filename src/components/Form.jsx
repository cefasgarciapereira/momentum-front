import React from 'react';
import {
    FormHelperText
} from '@material-ui/core';

function Form(props) {
    const { children, onSubmit, styles, error } = props;

    return (
        <form onSubmit={onSubmit} style={{ ...formStyles, ...styles}}>
            {children}
            
            <FormHelperText error>{error}</FormHelperText>
        </form>
    )
}

const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem 0'
}

export default Form
