import Divider from '@material-ui/core/Divider';
import * as React from "react";
import {FirstTooltipExample} from "./FirstTooltipExample";
import {SecondTooltipExample} from "./SecondTooltipExample";

import './styles.css';

const Tooltip = () => {

    return <div>
        <FirstTooltipExample/>
        <Divider/>
        <SecondTooltipExample/>
    </div>
};

export default Tooltip;