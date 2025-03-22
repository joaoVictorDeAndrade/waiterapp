import { FlatList } from 'react-native';
import { useState } from 'react';

import { Text } from '../Text';
import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCardButton } from './styles';

import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../utils/api';

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleSelectProduct(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductContainer onPress={() => handleSelectProduct(product)}>
            <ProductImage
              source={{
                uri: `${BASE_URL}/uploads/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight={600}>{product.name}</Text>
              <Text size={14} color="#666">{product.description}</Text>
              <Text size={14} weight={600}>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCardButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCardButton>
          </ProductContainer>
        )}
      />

      <ProductModal
        visible={isModalVisible}
        product={selectedProduct}
        onClose={() => setIsModalVisible(false)}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
