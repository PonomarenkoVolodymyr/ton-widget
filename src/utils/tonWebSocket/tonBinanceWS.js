import useWebSocket from 'react-use-websocket';
import { useDispatch } from 'react-redux';
import { setTonBinancePrice } from '../../redux/tonPricesSlice';

const useTonBinanceWebSocket = () => {
  const dispatch = useDispatch();
  const socketUrl = 'wss://stream.binance.com:9443/ws/tonusdt@ticker';

  useWebSocket(socketUrl, {
    onOpen: () => console.log('WebSocket connection established.'),
    onMessage: (message) => {
      const data = JSON.parse(message.data);
      const lastPrice = parseFloat(data.c).toFixed(6);
      const change24h = parseFloat(data.P);
      dispatch(setTonBinancePrice({ lastPrice, change24h }));
    },
    onError: (event) => console.error('WebSocket error:', event),
    shouldReconnect: (closeEvent) => true, // Always try to reconnect on close
  });
};

export default useTonBinanceWebSocket;
