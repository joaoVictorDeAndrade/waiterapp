import { useCallback, useEffect, useState } from 'react';
import { api, BASE_URL } from '../../utils/api.ts';
import socketIo from 'socket.io-client';

import { Order } from '../../types/Order.ts';

import { Container } from './styles.ts';
import { OrdersBoard } from '../OrdersBoard';

export function Orders() {
  const [ orders, setOrders ] = useState<Order[]>([]);

  const fetchOrders = useCallback(async () => {
    const { data } = await api.get('/orders');

    setOrders(data);
  }, []);

  useEffect(() => {
    const socket = socketIo(BASE_URL, {
      transports: ['websocket']
    });

    socket.on('orders@create', (order) => {
      setOrders(prevState => prevState.concat(order));
    });

  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  const awaiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction =  orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');
  return (
    <Container>
      <OrdersBoard
        icon='🕒'
        title="Fila de espera"
        orders={awaiting}
        onCancelOrder={fetchOrders}
        onChanceOrderStatus={fetchOrders}
      />

      <OrdersBoard
        icon='🧑🏽‍🍳'
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={fetchOrders}
        onChanceOrderStatus={fetchOrders}
      />

      <OrdersBoard
        icon='✅'
        title="Pronto!"
        orders={done}
        onCancelOrder={fetchOrders}
        onChanceOrderStatus={fetchOrders}
      />
    </Container>
  );
}
