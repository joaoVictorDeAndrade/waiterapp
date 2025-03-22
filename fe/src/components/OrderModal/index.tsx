import { Overlay, ModalBody, OrderDetails, Actions } from './styles.ts';
import { formatCurrency } from '../../utils/formatCurrency.ts';
import closeIcon from '../../assets/images/close-icon.svg';

import { Order } from '../../types/Order.ts';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean,
  order: Order | null,
  isLoading: boolean,
  onClose: () => void,
  onCancelOrder: () => void,
  onChangeOrderStatus: () => void
}

export function OrderModal({ visible, order, isLoading, onClose, onCancelOrder, onChangeOrderStatus }: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event : KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, [onClose]);

  if (!visible || !order) return null;

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa { order.table }</strong>
          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Fechar modal" />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>

          <div>
            <span>
              { order.status === 'WAITING' && '🕒' }
              { order.status === 'IN_PRODUCTION' && '🧑🏽‍🍳' }
              { order.status === 'DONE' && '✅' }
            </span>
            <strong>
              { order.status === 'WAITING' && 'Fila de espera' }
              { order.status === 'IN_PRODUCTION' && 'Em produção' }
              { order.status === 'DONE' && 'Pronto' }
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img src={`http://localhost:3001/uploads/${product.imagePath}`} alt={product.name} width="56" height="28" />
                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{ formatCurrency(total) }</strong>
          </div>
        </OrderDetails>

        <Actions>
          {
            order.status !== 'DONE' && (
              <button
                onClick={onChangeOrderStatus}
                type="button"
                className="primary"
                disabled={isLoading}
              >
                { order.status === 'WAITING' ? (
                  <>
                    <span>🧑🏽‍🍳</span>
                    <strong>Iniciar Produção</strong>
                  </>
                ) : (
                  <>
                    <span>✅</span>
                    <strong>Pedido pronto</strong>
                  </>
                )}
              </button>
            )
          }

          <button
            onClick={onCancelOrder}
            type="button"
            className="secondary"
            disabled={isLoading}
          >
            <strong>Cancelar pedido</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
