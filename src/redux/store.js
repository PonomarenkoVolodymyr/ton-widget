import { configureStore } from '@reduxjs/toolkit';

import priceReducer from './pricesSlice';
import tonPricesReducer from './tonPricesSlice';

const store = configureStore({
  reducer: {
    prices: priceReducer,
    tonPrices: tonPricesReducer,
  },
});
export default store;
