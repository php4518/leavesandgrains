import {applyMiddleware, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dishes', 'cart'],
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedReducer = persistReducer(persistConfig, reducers)
  const store = createStore(persistedReducer, preloadedState, composeEnhancers(
    applyMiddleware(...middlewares)
  ));
  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return {store, persistor};
}

const store = configureStore();

export default store;
