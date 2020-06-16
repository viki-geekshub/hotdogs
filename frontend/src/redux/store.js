import { createStore } from 'redux';
import rootReducer from './reducers'
const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;

// import { createStore, compose, applyMiddleware } from 'redux';
// import reducer from './reducers/index.js';
// import { save, load } from 'redux-localstorage-simple';
// const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const createStoreWithMiddleware = applyMiddleware(
//     save(),
// )(createStore);

// const store = createStoreWithMiddleware(
//     reducer,
//     load(),
//     composeEnhancers(),
// );

// export default store;