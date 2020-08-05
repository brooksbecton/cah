import React from "react";
import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  max-width: 212px;
  border-radius: 5px;
  padding: 5px;
  font-size: 18px;
  border-color: transparent;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.16);
  padding-left: 13px;
  padding-bottom: 9px;
  padding-top: 9px;

  -webkit-inner-spin-button {
    border: none;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  ...props
}) => {
  return isLoading ? (
    <StyledButton {...props} disabled>
      {"Loading"}
    </StyledButton>
  ) : (
    <StyledButton {...props}>{children}</StyledButton>
  );
};

const StyledButton = styled.button`
  width: 100%;
  max-width: 232px;
  border-color: transparent;
  border-radius: 20px;
  padding: 5px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.16);
`;
