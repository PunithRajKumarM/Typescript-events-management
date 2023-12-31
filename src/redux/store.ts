import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userEventsReducer from './user-events';
import recorderReducer from './recorder';

const rootReducer = combineReducers({
  userEvents: userEventsReducer,
  recorder: recorderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;

//Not working
// import { applyMiddleware, combineReducers, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import userEventsReducer from './user-events';
// import recorderReducer from './recorder';

// const rootReducer = combineReducers({
//   userEvents: userEventsReducer,
//   recorder: recorderReducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
