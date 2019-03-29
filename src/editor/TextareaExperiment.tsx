import * as React from "react";
import StateDebugger from "../utils/StateDebugger";


export interface Props {

}

export interface State {
    code: string
}

class TextareaExperiment extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            code: 'const answer = 42;'
        }
    }

    render() {
        return <div>
            <h1>Text area experiment</h1>
            <p>Experiment to see how much functionality can be achieved by using a text area</p>
            <textarea
                cols={75}
                rows={30}
                value={this.state.code}
                onChange={e => this.setState({code: e.target.value})}
            />
            <StateDebugger state={this.state} title="Editor state"/>
        </div>;
    }
}

export default TextareaExperiment;