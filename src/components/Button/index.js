import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const ButtonContainer = styled.div`
  margin: 15px;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-end"};
`;

const StyledButton = ({ justifyContent, text, type, onClick }) => {
  return (
    <ButtonContainer justifyContent={justifyContent || undefined}>
      <Button onClick={onClick} type={type || "primary"}>
        {text}
      </Button>
    </ButtonContainer>
  );
};

export default StyledButton;
