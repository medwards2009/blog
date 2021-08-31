import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../GlobalProvider";
import { SignInForm, SignUpForm } from "../Forms";

const Wrapper = styled.div`
  height: 60px;
  background: ${(props) => props.color || "grey"};
  display: flex;
  justify-content: center;
`;

const SubWrapper = styled.div`
  width: 1200px;
  margin: 0 15px;
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
  font-family: ${(props) => (props.font ? props.font : "cursive")};
  margin: auto;

  @media screen and (max-width: 450px) {
    font-size: 21px;
    line-height: 21px;
  }
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
  const { state } = useContext(GlobalContext);
  const { blogName, primaryColor, secondaryColor, titleFont } = state;
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const history = useHistory();

  const goHome = () => {
    history.push("/");
  };

  const displaySignUpForm = () => {
    setShowSignUp(true);
  };

  const closeSignUpForm = () => {
    setShowSignUp(false);
  };

  const displaySignInForm = () => {
    setShowSignIn(true);
  };

  const closeSignInForm = () => {
    setShowSignIn(false);
  };

  return (
    <Wrapper color={secondaryColor}>
      <SubWrapper>
        <TitleWrapper>
          <Title
            cursor={"pointer"}
            onClick={goHome}
            color={primaryColor}
            size={"36px"}
            font={titleFont}
          >
            {blogName}
          </Title>
        </TitleWrapper>

        <ButtonWrapper>
          <MenuButton onClick={displaySignInForm}>Sign In</MenuButton>
          <AntButton shape="round" onClick={displaySignUpForm}>
            Sign Up
          </AntButton>
        </ButtonWrapper>
      </SubWrapper>
      {showSignUp && <SignUpForm closeForm={closeSignUpForm} />}
      {showSignIn && <SignInForm closeForm={closeSignInForm} />}
    </Wrapper>
  );
};

export default Nav;
