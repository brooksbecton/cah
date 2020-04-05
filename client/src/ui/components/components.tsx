import styled from "styled-components";

export const Input = styled.input`
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 100%;
  border-radius: 20px;
  padding: 10px;
  font-size: 18px;
  background-color: ${({theme}) => theme.colors.white};
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.16);
`;
