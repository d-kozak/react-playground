import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import {withStyles, WithStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import {ConnectedRouter} from "connected-react-router";
import * as React from "react";
import {useState} from "react";
import * as ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {Link, Route} from 'react-router-dom';
import DraftJsExamples from './draftjs/index';
import EditorExamples from "./editor/index";
import FormikExamples from './formik/index';
import ReactAceExample from "./reactace/ReactAceExample";
import PopupExamples from './reactjspopup';
import ReduxExample from './redux';
import configureStore, {history} from './store';
import Tooltip from './tooltip';

const styles = {
    list: {
        width: 200
    },
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
    container: {
        marginRight: "auto",
        marginLeft: "auto",
        maxWidth: "1200px",
        paddingRight: "10px",
        paddingLeft: "10px"
    }
};

export interface Props extends WithStyles<typeof styles> {
}

const Home = () => <h3>Home</h3>;

const store = configureStore();

const App = (props: Props) => {
    const {classes} = props;
    const [isOpen, setOpen] = useState(false);

    return <div className={classes.root}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <CssBaseline/>
                <AppBar
                    position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                                    onClick={() => setOpen(!isOpen)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            React playground
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={() => setOpen(false)}
                >
                    <List className={classes.list}>
                        <Link to="/">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="home"/>
                            </ListItem>
                        </Link>
                        <Link to="/formik">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="Formik"/>
                            </ListItem>
                        </Link>
                        <Link to="/tooltip">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="Tooltip"/>
                            </ListItem>
                        </Link>
                        <Link to="/editor">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="Editor"/>
                            </ListItem>
                        </Link>
                        <Link to="/popup">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="Popup"/>
                            </ListItem>
                        </Link>
                        <Link to="/race">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="React Ace"/>
                            </ListItem>
                        </Link>
                        <Link to="/draftjs">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="Draft.js"/>
                            </ListItem>
                        </Link>
                        <Link to="/redux">
                            <ListItem button={true} onClick={() => setOpen(false)}>
                                <ListItemText primary="Redux"/>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>

                <main className={classes.container}>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/formik" exact={true} component={FormikExamples}/>
                    <Route path="/tooltip" exact={true} component={Tooltip}/>
                    <Route path="/editor" exact={true} component={EditorExamples}/>
                    <Route path="/popup" exact={true} component={PopupExamples}/>
                    <Route path="/race" exact={true} component={ReactAceExample}/>
                    <Route path="/draftjs" exact={true} component={DraftJsExamples}/>
                    <Route path="/redux" exact={true} component={ReduxExample}/>
                </main>
            </ConnectedRouter>
        </Provider>
    </div>
};

const StyledApp = withStyles(styles, {withTheme: true})(App);

ReactDOM.render(
    <StyledApp/>,
    document.getElementById('root') as HTMLElement
);

