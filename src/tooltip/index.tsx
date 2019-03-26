import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';

import './styles.css';

const Tooltip = () => {
    return <div>
        <h3>Example with tooltip</h3>
        This <a data-tip={true} data-for="my-tooltip"> <b>tooltip</b> </a> will stay there if you hover over it.
        And buttons inside are working as well.

        <ReactTooltip className="extraClass" delayHide={500} id="my-tooltip" place="top" type="dark">
            <h1>hello!</h1>
            <p>foo</p>
            <h3>bar</h3>
            <button onClick={() => console.log('click')}>Click me</button>
        </ReactTooltip>

    </div>;
};

export default Tooltip;