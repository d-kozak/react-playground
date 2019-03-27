import * as React from "react";
import {useState} from "react";
import * as ReactTooltip from "react-tooltip";

import './styles.css';


export const SecondTooltipExample = () => {
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