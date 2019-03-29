import * as React from "react";
import Popup from "reactjs-popup";

export default () => {
    return <div>
        <h2>Tooltip using reactjs-popup</h2>
        <Popup trigger={<span> Trigger</span>} position="right center" on="hover">
            <div>Popup content here !!</div>
        </Popup>
        }
    </div>
};