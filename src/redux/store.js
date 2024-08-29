import { configureStore } from '@reduxjs/toolkit';

import priceReducer from './pricesSlice';
import tonPricesReducer from './tonPricesSlice';
import dogsPricesReducer from './dogsPricesSlice';

const store = configureStore({
  reducer: {
    prices: priceReducer,
    tonPrices: tonPricesReducer,
    dogsPrices: dogsPricesReducer,
  },
});
export default store;
