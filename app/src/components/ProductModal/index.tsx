import { FlatList, Modal } from 'react-native';
import { Product } from '../../types/Product';
import {
  CloseButton,
  ModalBody,
  Header,
  Image,
  IngredientsContainer,
  IngredientItem,
  Footer,
  FooterContainer, PriceContainer
} from './styles';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { BASE_URL } from '../../utils/api';

interface ProductModalProps {
  visible: boolean;
  product: null | Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({ visible, product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `${BASE_URL}/uploads/${product.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}><Close /></CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight={600}>{ product.name }</Text>
          <Text color="#666">{ product.description }</Text>
        </Header>

        { product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text weight={600} color="#666">Ingredientes</Text>

            <FlatList
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <IngredientItem>
                  <Text>{ item.icon }</Text>
                  <Text size={14} color="#666">{ item.name }</Text>
                </IngredientItem>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>

            <Text size={20} weight={600}>{formatCurrency(product.price)}</Text>
          </PriceContainer>

          <Button onPress={handleAddToCart} >Adicionar o pedido</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
