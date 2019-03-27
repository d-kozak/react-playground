import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';


import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Tooltip from './tooltip';


const styles = createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

export interface Props extends WithStyles<typeof styles> {
}

const Home = () => <h3>Home</h3>;
const Formik = () => <h3>Formik</h3>;

const App = (props: Props) => {
    const {classes} = props;
    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    React playground
                </Typography>
            </Toolbar>
        </AppBar>
        <Router>
            <Link to="/">Home</Link>
            <Link to="/formik">Formik</Link>
            <Link to="/tooltip">Tooltip</Link>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/formik" exact={true} component={Formik}/>
            <Route path="/tooltip" exact={true} component={Tooltip}/>
        </Router>
    </div>
};

const StyledApp = withStyles(styles)(App);

ReactDOM.render(
    <StyledApp/>,
    document.getElementById('root') as HTMLElement
);

