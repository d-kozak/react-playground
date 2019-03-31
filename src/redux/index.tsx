import * as React from "react";
import {connect, Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createLogger} from 'redux-logger';

import "./styles.css";

interface IncState {
    count: number
}

interface Increment {
    type: "increment"
}

interface Decrement {
    type: "decrement"
}

type IncAction = Increment | Decrement;


const incrementAction = (): IncAction => ({type: "increment"});

const decrementAction = (): IncAction => ({type: "decrement"});


const initialState: IncState = {
    count: 0
};

const reducer = (currentState: IncState = initialState, action: IncAction): IncState => {
    switch (action.type) {
        case "increment":
            return {
                count: currentState.count + 1
            };
        case "decrement":
            return {
                count: currentState.count - 1
            };
    }
    return currentState;
};

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            createLogger()
        )
    )
);


interface CounterProps {
    count: number,
    increment: () => void,
    decrement: () => void
}

const Counter = ({count, increment, decrement}: CounterProps) => <div className="counter">
    <p>Current count</p>
    <span className="current-count">{count}</span>
    <div>
        <button className="counter-button" onClick={increment}>+</button>
        <button className="counter-button" onClick={decrement}>-</button>
    </div>
</div>;

const mapStateToProps = (state: IncState): Partial<CounterProps> => ({
    count: state.count
});

const mapDispatchToProps = (dispatch: ((action: IncAction) => void)): Partial<CounterProps> => ({
    increment: () => dispatch(incrementAction()),
    decrement: () => dispatch(decrementAction())
});

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default () => {

    return <Provider store={store}>
        <h1>Redux example</h1>
        <p>Counter implemented with redux</p>
        <ConnectedCounter/>
    </Provider>
};