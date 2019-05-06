import * as React from 'react';
import { NavLink } from "react-router-dom";
import {ReactNode} from "react";

const classes = require('./NavItem.module.css');

interface INavItemProps {
    link: string;
    children: ReactNode
}

const NavItem = (props: INavItemProps) => {
    return (
        <li className={classes.NavItem}>
            <NavLink
                to={props.link}
                exact
                activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    );
};

export default NavItem;

