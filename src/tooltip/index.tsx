import Divider from '@material-ui/core/Divider';
import * as React from "react";
import {useState} from "react";
import * as ReactTooltip from 'react-tooltip';

import './styles.css';

const FirstToolTipExample = () => {

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

const SecondToolTipExample = () => {
    const [numbers, setNumbers] = useState<Array<number>>([]);

    const handleClick = () => {
        const highestNum = numbers.length > 0 ? numbers.length + 1 : 1;
        setNumbers(numbers.concat([highestNum]));
    };

    const removeElem = (index: number) => {
        setNumbers(numbers.filter(number => number != index));
    };

    return <div>
        <p>Every time you click, new item is generated. In it's tooltip, you have a button for deleting him</p>
        <button onClick={handleClick}>Click me</button>
        <ul>
            {numbers.map(number => <div key={number}>
                <li>
                    <p>This is elem number {number}</p>
                    It has a tooltip <b data-tip={true} data-for={`my-tooltip-${number}`}>here</b>
                </li>
                <ReactTooltip id={`my-tooltip-${number}`} className="extraClass" delayHide={500} place="top"
                              type="dark">
                    <button onClick={() => removeElem(number)}>Remove elem number {number}</button>
                </ReactTooltip>
            </div>)}
        </ul>
    </div>
};

const Tooltip = () => {

    return <div>
        <FirstToolTipExample/>
        <Divider/>
        <SecondToolTipExample/>
    </div>
};

export default Tooltip;