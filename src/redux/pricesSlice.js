import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  binanceLastPrice: null,
  binanceChange24h: null,
  bybitLastPrice: null,
  bybitChange24h: null,
  okxLastPrice: null,
  okxOpen24h: null,
  coinsValue: null,
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setBinancePrice(state, action) {
      state.binanceLastPrice = action.payload.lastPrice;
      state.binanceChange24h = action.payload.change24h;
    },

    setBybitPrice(state, action) {
      state.bybitLastPrice = action.payload.lastPrice;
      state.bybitChange24h = action.payload.change24h;
    },
    setOkxPrice(state, action) {
      state.okxLastPrice = action.payload.lastPrice;
      state.okxOpen24h = action.payload.open24h;
    },
    setCoinsValue(state, action) {
      state.coinsValue = action.payload;
    },
  },
});

export const { setBinancePrice, setBybitPrice, setOkxPrice, setCoinsValue } =
  priceSlice.actions;
export default priceSlice.reducer;
