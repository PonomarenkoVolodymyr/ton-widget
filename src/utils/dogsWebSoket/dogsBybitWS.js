import useWebSocket from 'react-use-websocket';
import { useDispatch } from 'react-redux';
import { setDogsBybitPrice } from '../../redux/dogsPricesSlice';

const useDogsBybitWebSocket = () => {
  const dispatch = useDispatch();
  const socketUrl = 'wss://stream.bybit.com/v5/public/spot';

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log('WebSocket connection established.');
      sendJsonMessage({
        op: 'subscribe',
        args: ['tickers.DOGSUSDT'],
      });
    },
    onMessage: () => {
      if (lastJsonMessage && lastJsonMessage.data) {
        const data = lastJsonMessage.data;
        const lastPrice = parseFloat(data.lastPrice).toFixed(6);
        const change24h = parseFloat(data.price24hPcnt * 100).toFixed(3);
        dispatch(setDogsBybitPrice({ lastPrice, change24h }));
      }
    },
    onError: (event) => console.error('WebSocket error:', event),
    shouldReconnect: (closeEvent) => true, // Always try to reconnect on close
  });
};

export default useDogsBybitWebSocket;
