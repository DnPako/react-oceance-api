import * as React from 'react';
import {ReactNode} from "react";

import Menu from '../Menu/Menu';
const classes = require('./Layout.module.css');

interface ILayoutProps {
    children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
    return (
        <>
            <Menu />
            <main className={classes.Content}>{props.children}</main>
        </>
    )
};

export default Layout;