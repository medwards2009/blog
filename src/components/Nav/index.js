import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { SignUpForm } from "../Forms";

const Wrapper = styled.div`
  height: 60px;
  background: dodgerblue;
`;

const SubWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: inherit;
`;

const TitleWrapper = styled.div`
  display: flex;
`;

const Title = styled.div`
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: ${(props) => (props.size ? props.size : "24px")};
  cursor: ${(props) => (props.cursor ? props.cursor : "default")};
  font-family: "Limelight", cursive;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: auto 0;
`;

const AntButton = styled(Button)`
  background: #000080;
  border: none;
  color: white;
`;

const MenuButton = styled.div`
  margin: auto 10px;
  padding: 5px;
  cursor: pointer;
`;

const Nav = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  const displaySignUpForm = () => {
    setShowSignUp(true);
  };

  const closeForm = () => {
    setShowSignUp(false);
  };

  return (
    <Wrapper>
      <SubWrapper>
        <TitleWrapper>
          <Title
            cursor={"pointer"}
            onClick={goHome}
            color={"#000080"}
            size={"36px"}
          >
            Truth Today
          </Title>
        </TitleWrapper>

        <ButtonWrapper>
          <MenuButton>Sign In</MenuButton>
          <AntButton shape="round" onClick={displaySignUpForm}>
            Sign Up
          </AntButton>
        </ButtonWrapper>
      </SubWrapper>
      {showSignUp && <SignUpForm closeForm={closeForm} />}
    </Wrapper>
  );
};

export default Nav;
