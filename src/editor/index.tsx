import {withStyles} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {ReactNode} from "react";
import SwipeableViews from "react-swipeable-views";
import ContentEditableDivExperiment from "./ContentEditableDivExperiment";
import HIghlightingAndTooltipsEditor from "./HightlightingAndTooltipsEditor";
import SimpleHighlightingEditor from "./SimpleHighlightingEditor";
import TextareaExperiment from "./TextareaExperiment";


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


class EditorExamples extends React.Component<any> {
    state = {
        value: 1,
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
                        <Tab label="Basic highlighting example"/>
                        <Tab label="Extending textarea"/>
                        <Tab label="Extending contenteditable div"/>
                        <Tab label="Highliting and tooltips"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><SimpleHighlightingEditor/></TabContainer>
                    <TabContainer dir={theme.direction}><TextareaExperiment/></TabContainer>
                    <TabContainer dir={theme.direction}><ContentEditableDivExperiment/></TabContainer>
                    <TabContainer dir={theme.direction}><HIghlightingAndTooltipsEditor/></TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}


export default withStyles(styles, {withTheme: true})(EditorExamples);
