import Divider from '@material-ui/core/Divider';
import * as React from "react";
import {FirstTooltipExample} from "./FirstTooltipExample";
import {SecondTooltipExample} from "./SecondTooltipExample";

import './styles.css';
import TextareaWithExtraTooltip from "./TextareaWithExtraTooltip";

const Tooltip = () => {

    return <div>
        <FirstTooltipExample/>
        <Divider/>
        <SecondTooltipExample/>
        <Divider/>
        <TextareaWithExtraTooltip/>
    </div>
};

export default Tooltip;