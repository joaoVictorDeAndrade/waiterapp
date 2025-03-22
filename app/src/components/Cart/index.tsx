import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';

import { useState } from 'react';

import {
  CartItemContainer,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary, TotalContainer
} from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { api, BASE_URL } from '../../utils/api';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onRemove:  (product: Product) => void;
  onConfirmOrder:  () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onRemove, onConfirmOrder, selectedTable }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }))
    };

    await api.post('/orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      { cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 140 }}
          renderItem={({ item: cartItem }) => (
            <CartItemContainer>
              <ProductContainer>
                <Image
                  source={{
                    uri: `${BASE_URL}/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <QuantityContainer>
                  <Text size={14} color="#666">{cartItem.quantity}x</Text>
                </QuantityContainer>

                <ProductDetails>
                  <Text size={14} weight={600}>{cartItem.product.name}</Text>
                  <Text size={14} color="#666">{formatCurrency(cartItem.product.price)}</Text>
                </ProductDetails>
              </ProductContainer>

              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onRemove(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </CartItemContainer>
          )}
        />
      )}

      <Summary>
        <TotalContainer>
          { cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight={600}>{formatCurrency(total)}</Text>
            </>
          ): (
            <Text color="#666">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={!cartItems.length}
          isLoading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Summary>

      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      />
    </>
  );
}
