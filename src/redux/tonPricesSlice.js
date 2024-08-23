import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tonBinanceLastPrice: null,
  tonBinanceChange24h: null,
  tonBybitLastPrice: null,
  tonBybitChange24h: null,
  tonOkxLastPrice: null,
  tonOkxOpen24h: null,
  tonCoinsValue: null,
};

const tonPricesSlice = createSlice({
  name: 'tonPrices',
  initialState,
  reducers: {
    setTonBinancePrice(state, action) {
      state.tonBinanceLastPrice = action.payload.lastPrice;
      state.tonBinanceChange24h = action.payload.change24h;
    },

    setTonBybitPrice(state, action) {
      state.tonBybitLastPrice = action.payload.lastPrice;
      state.tonBybitChange24h = action.payload.change24h;
    },
    setTonOkxPrice(state, action) {
      state.tonOkxLastPrice = action.payload.lastPrice;
      state.tonOkxOpen24h = action.payload.open24h;
    },
    setTonCoinsValue(state, action) {
      state.tonCoinsValue = action.payload;
    },
  },
});

export const {
  setTonBinancePrice,
  setTonBybitPrice,
  setTonOkxPrice,
  setTonCoinsValue,
} = tonPricesSlice.actions;
export default tonPricesSlice.reducer;
