import useWebSocket from 'react-use-websocket';
import { useDispatch } from 'react-redux';
import { setBinancePrice } from '../../redux/pricesSlice';

const useBinanceWebSocket = () => {
  const dispatch = useDispatch();
  const socketUrl = 'wss://stream.binance.com:9443/ws/notusdt@ticker';

  useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection established.'),
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      const lastPrice = parseFloat(data.c).toFixed(6);
      const change24h = parseFloat(data.P);
      dispatch(setBinancePrice({ lastPrice, change24h }));
    },
    onError: (event) => console.error('WebSocket error:', event),
    shouldReconnect: (closeEvent) => true, // Always try to reconnect on close
  });
};

export default useBinanceWebSocket;
