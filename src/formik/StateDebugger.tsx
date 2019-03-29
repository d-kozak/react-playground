import * as React from 'react';

export interface StateDebuggerProps {
    state: any,
    title?: string
}

const StateDebugger = ({state, title = 'State is'}: StateDebuggerProps) => <div>
    <h5>{title}</h5>
    <p>
        {JSON.stringify(state, null, 4)}
    </p>
</div>;

export default StateDebugger;