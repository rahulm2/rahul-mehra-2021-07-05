import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';

export function createReduxStore() {
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
}
