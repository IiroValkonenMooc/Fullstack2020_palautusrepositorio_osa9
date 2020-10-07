import React from 'react';

interface HeaderText {
    text: string;
}

const Header: React.FC<HeaderText> = (props) => {
    return <h1>{ props.text }</h1>
}

export default Header