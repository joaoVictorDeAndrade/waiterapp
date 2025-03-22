import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
  width: 100%;
  height: 200px;
  align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);

  justify-content: center;
  align-items: center;
  margin: 24px;
`;

export const ModalBody = styled.View`
  background: #fafafa;
  flex: 1;
  padding: 32px 24px 0;
  gap: 32px;
`;

export const Header = styled.View`
  gap: 8px;
`;

export const IngredientsContainer = styled.View`
  gap: 16px;
  flex: 1;
`;

export const IngredientItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 1px solid rgba(204, 204, 204, 0.3);
  margin-bottom: 4px;
`;

export const Footer = styled.View`
  height: 110px;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceContainer = styled.View``;
