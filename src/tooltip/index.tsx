import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';


const Tooltip = () => <div>
    <h3>Example with tooltip</h3>
    <a data-tip="React-tooltip"> ◕‿‿◕ </a>

    <ReactTooltip place="top" type="dark" effect="float">
        <h1>hello!</h1>
        <p>foo</p>
        <h3>bar</h3>
    </ReactTooltip>

</div>;

export default Tooltip;