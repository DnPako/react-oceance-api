import React, {Component, lazy, Suspense} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";

import Layout from './components/Layout/Layout';

const Auth = lazy(() => import('./components/Auth/Auth'));


class App extends Component {
    render() {
        return (
            <Layout>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <Route path='/authenticate'><Auth/></Route>
                </Suspense>
            </Layout>
        );
    }
}


export default App;
