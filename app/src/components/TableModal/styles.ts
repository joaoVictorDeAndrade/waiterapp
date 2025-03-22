import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
  background: rgba(0, 0, 0, 0.6);
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const ModalBody = styled.View`
  background: #fafafa;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  gap: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.View`
    gap: 24px
`;

export const Input = styled.TextInput`
  background: #FFF;
  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  padding: 16px;
`;
