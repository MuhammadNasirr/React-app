import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
// import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import { history } from './history';
import rootSaga from './sagas';
import { rangerSaga } from './sagas/ranger';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const sagaMiddleware = createSagaMiddleware();
const rangerMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares];
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares, rangerMiddleware))
);

sagaMiddleware.run(rootSaga);
rangerMiddleware.run(rangerSaga);

export default store;
