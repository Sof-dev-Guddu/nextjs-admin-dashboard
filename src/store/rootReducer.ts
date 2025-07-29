
import { combineReducers } from '@reduxjs/toolkit';
import appealReducer from './slices/appeal/appealSlice';
import tableFilterReducer from './slices/appeal/appeal-filter/tableFilterSlice';
import calendarReducer from './slices/calendar/calendarSlice';

const rootReducer = combineReducers({
  appeals: appealReducer,
  tableFilter: tableFilterReducer,
  calendar: calendarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
