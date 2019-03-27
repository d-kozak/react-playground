import Divider from '@material-ui/core/Divider';
import * as React from "react";
import ContentEditableExample from "./ContentEditableExample";
import ContentEditableWithPureHtml from "./ContentEditableWithPureHtml";
import {FirstTooltipExample} from "./FirstTooltipExample";
import {SecondTooltipExample} from "./SecondTooltipExample";

import './styles.css';
import TextareaWithSeparateRichText from "./TextareaWithSeparateRichText";

const Tooltip = () => {

    return <div>
        <FirstTooltipExample/>
        <Divider/>
        <SecondTooltipExample/>
        <Divider/>
        <TextareaWithSeparateRichText/>
        <Divider/>
        <ContentEditableExample/>
        <Divider/>
        <ContentEditableWithPureHtml/>
    </div>
};

export default Tooltip;