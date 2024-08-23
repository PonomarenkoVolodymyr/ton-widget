import useWebSocket from 'react-use-websocket';
import { useDispatch } from 'react-redux';
import { setOkxPrice } from '../../redux/pricesSlice';

const useOKXWebSocket = () => {
  const dispatch = useDispatch();
  const socketUrl = 'wss://ws.okx.com:8443/ws/v5/public';

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log('WebSocket connection established.');
      sendJsonMessage({
        op: 'subscribe',
        args: [
          {
            channel: 'tickers',
            instId: 'NOT-USDT',
          },
        ],
      });
    },
    onMessage: () => {
      const wsData = lastJsonMessage;

      if (
        wsData &&
        wsData.data &&
        Array.isArray(wsData.data) &&
        wsData.data.length > 0
      ) {
        const lastPrice = parseFloat(wsData.data[0].last).toFixed(6);
        const open24h = parseFloat(wsData.data[0].open24h);
        dispatch(setOkxPrice({ lastPrice, open24h }));
      }
    },
    onError: (event) => console.error('WebSocket error:', event),
    shouldReconnect: (closeEvent) => true, // Always try to reconnect on close
  });
};

export default useOKXWebSocket;
