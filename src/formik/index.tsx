import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import {ReactNode} from 'react';
import SwipeableViews from 'react-swipeable-views';
import AutoupdateFormExample from "./AutoupdateFormExample";
import FormikExample from "./FormikExample";

function TabContainer({children, dir}: { children: ReactNode, dir: string }) {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
}


const styles = (theme: any) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    },
});


class FormikExamples extends React.Component<any> {
    state = {
        value: 0,
    };

    handleChange = (event: any, value: number) => {
        this.setState({value});
    };

    handleChangeIndex = (index: number) => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Basic form example"/>
                        <Tab label="Example with autosubmiting form"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><FormikExample/></TabContainer>
                    <TabContainer dir={theme.direction}><AutoupdateFormExample/></TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: true})(FormikExamples);
