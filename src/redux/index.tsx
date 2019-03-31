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

interface SetValue {
    type: "setValue",
    newValue: number
}

type IncAction = Increment | Decrement | SetValue;


const incrementAction = (): IncAction => ({type: "increment"});

const decrementAction = (): IncAction => ({type: "decrement"});

const setValueAction = (newValue: number): IncAction => ({type: "setValue", newValue});

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
        case "setValue":
            return {
                count: action.newValue
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
    decrement: () => void,
    setValue: (newValue: number) => void,
}

const Counter = ({count, increment, decrement, setValue}: CounterProps) => <div className="counter">
    <p>My amazing counter</p>
    <input type="number" value={count} onChange={e => setValue(Number(e.target.value))} className="current-count"/>
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
    decrement: () => dispatch(decrementAction()),
    setValue: (newValue => dispatch(setValueAction(newValue)))
});

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default () => {

    return <Provider store={store}>
        <h1>Redux example</h1>
        <p>Counter implemented with redux</p>
        <ConnectedCounter/>
    </Provider>
};