import {connectRouter, routerMiddleware, RouterState} from "connected-react-router";

import {createBrowserHistory} from 'history'
import {applyMiddleware, combineReducers, createStore, DeepPartial, Reducer} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createLogger} from "redux-logger";

interface AppState {
    router: RouterState
}

export const history = createBrowserHistory();

const rootReducer: Reducer<AppState> = combineReducers({
    router: connectRouter(history)
});


export default function configureStore(preloadedState?: DeepPartial<AppState>) {
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(
            applyMiddleware(
                createLogger(),
                routerMiddleware(history)
            )
        )
    );
}