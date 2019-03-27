import * as React from "react";
import {useState} from "react";
import * as ReactTooltip from "react-tooltip";

import './styles.css';


export const FirstTooltipExample = () => {

    const [clicked, setClicked] = useState(0);

    const clickedElems = [];
    for (let i = 0; i < clicked; i++) {
        clickedElems.push(<li key={i}>Click</li>);
    }

    return <div>
        <h3>Example with tooltip</h3>
        This <a data-tip={true} data-for="my-tooltip"> <b>tooltip</b> </a> will stay there if you hover over it.
        And buttons inside are working as well.

        <ReactTooltip className="extraClass" delayHide={500} id="my-tooltip" place="top" type="dark">
            <h1>hello!</h1>
            <p>foo</p>
            <h3>bar</h3>
            <button onClick={() => setClicked(clicked + 1)}>Click me</button>
        </ReactTooltip>

        <p>You clicked {clicked} times.</p>
        <ol>
            {clickedElems}
        </ol>

    </div>;
};