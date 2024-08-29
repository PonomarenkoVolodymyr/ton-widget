import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dogsBinanceLastPrice: null,
  dogsBinanceChange24h: null,
  dogsBybitLastPrice: null,
  dogsBybitChange24h: null,
  dogsOkxLastPrice: null,
  dogsOkxOpen24h: null,
  dogsCoinsValueString: null,
};

const dogsPricesSlice = createSlice({
  name: 'dogsPrices',
  initialState,
  reducers: {
    setDogsBinancePrice(state, action) {
      state.dogsBinanceLastPrice = action.payload.lastPrice;
      state.dogsBinanceChange24h = action.payload.change24h;
    },

    setDogsBybitPrice(state, action) {
      state.dogsBybitLastPrice = action.payload.lastPrice;
      state.dogsBybitChange24h = action.payload.change24h;
    },
    setDogsOkxPrice(state, action) {
      state.dogsOkxLastPrice = action.payload.lastPrice;
      state.dogsOkxOpen24h = action.payload.open24h;
    },
    setDogsCoinsValue(state, action) {
      state.dogsCoinsValue = action.payload;
    },
  },
});

export const {
  setDogsBinancePrice,
  setDogsBybitPrice,
  setDogsOkxPrice,
  setDogsCoinsValue,
} = dogsPricesSlice.actions;
export default dogsPricesSlice.reducer;
