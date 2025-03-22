import { useState } from 'react';
import { Order } from '../../types/Order.ts';
import { Board, OrdersContainer } from './styles.ts';
import { OrderModal } from '../OrderModal';
import { api } from '../../utils/api.ts';
import { toast } from 'react-toastify';

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Order[];
    onCancelOrder: () => void,
    onChanceOrderStatus: () => void
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChanceOrderStatus }: OrdersBoardProps) {
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ selectedOrder, setSelectedOrder ] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible((prev) => !prev);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder() {
    if (!selectedOrder?._id) return;

    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder._id}`);

    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
    setIsLoading(false);
    setIsModalVisible(false);
    onCancelOrder();
  }

  async function handleChanceOrderStatus() {
    if (!selectedOrder?._id) return;

    const status = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${selectedOrder._id}`, { status });

    toast.success(`O pedido da mesa ${selectedOrder.table} teve o status alterado!`, {
      position: 'bottom-center'
    });
    setIsLoading(false);
    setIsModalVisible(false);
    onChanceOrderStatus();
  }

  return (
    <Board>
      <header>
        <span>{icon}</span>
        <strong>{ title }</strong>
        <span>{orders.length}</span>
      </header>

      { orders.length > 0 && (
        <OrdersContainer>
          {orders.map(order => (
            <button key={order._id} type="button" onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}

      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        isLoading={isLoading}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChanceOrderStatus}
      />
    </Board>
  );
}
