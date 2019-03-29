import * as React from 'react';

export interface StateDebuggerProps {
    state: any,
    title?: string
}

const StateDebugger = ({state, title = 'State is'}: StateDebuggerProps) => <div>
    <h5>{title}</h5>
    <pre>
        {JSON.stringify(state, null, 4)}
    </pre>
</div>;

export default StateDebugger;