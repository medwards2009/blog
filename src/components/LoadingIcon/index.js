import React from "react";
import styled from "styled-components";
import { Spin } from "antd";

const Spincontainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
`;

const LoadingIcon = () => {
  return (
    <Spincontainer>
      <Spin size="large" />
    </Spincontainer>
  );
};

export default LoadingIcon;
