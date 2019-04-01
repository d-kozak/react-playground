import {push} from "connected-react-router";
import * as React from "react";
import {connect} from "react-redux";

interface HomeProps {
    push: (path: string) => void;
}

const Home = ({push}: HomeProps) => {
    return <div>
        <h1>Hello locally</h1>
        <button onClick={() => push('/redux')}>Navigate to redux example</button>
    </div>
};


export default connect(null, {push})(Home);