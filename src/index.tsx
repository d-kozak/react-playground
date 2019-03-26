import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

const Home = () => <h3>Home</h3>;
const Formik = () => <h3>Formik</h3>;
const Tooltip = () => <h3>React-tooltip</h3>;

const App = () => <div>
    <h1>React Playground</h1>
    <Router>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/formik" exact={true} component={Formik}/>
        <Route path="/tooltip" exact={true} component={Tooltip}/>
        <Link to="/">Home</Link>
        <Link to="/formik">Formik</Link>
        <Link to="/tooltip">Tooltip</Link>
    </Router>
</div>;

ReactDOM.render(
    <App/>,
    document.getElementById('root') as HTMLElement
);

