import * as React from 'react';
import {PureComponent} from "react";

import NavItem from '../NavItem/NavItem';
const classes =  require('./NavItems.module.css');

interface INavItemsProps {

}

class NavItems extends PureComponent<INavItemsProps> {

    render() {
        return (
            <div className={classes.NavItems}>
                <NavItem link="/authenticate">Authenticate</NavItem>
                <NavItem link="/products">Products</NavItem>
            </div>
        );
    }
}

export default NavItems;