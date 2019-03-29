import * as React from "react";
import Popup from "reactjs-popup";

export default () => {
    return <div>
        <h1>Tooltip using reactjs-popup</h1>
        <Popup trigger={<span> Trigger</span>} position="right center" on="hover">
            <div>Popup content here !!</div>
        </Popup>
    </div>
};