import * as React from 'react';

import NavItems from './NavItems/NavItems';
const classes = require('./Menu.module.css');

const Menu = () => {
    return (
        <header className={classes.Toolbar}>
            <nav>
                <NavItems />
            </nav>
        </header>
    );
}

export default Menu;