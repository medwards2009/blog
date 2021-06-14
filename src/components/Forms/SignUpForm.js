import React, { useRef, useState } from "react";
import { Input, Button, Spin } from "antd";
import styled from "styled-components";

import blogApi from "../../api/blogApi";

const Wrapper = styled.div`
  background-color: rgba(128, 128, 128, 0.7);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: 10;
`;

const Card = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30em;
  height: 22em;
  margin-top: -11em; /*set to a negative number 1/2 of your height*/
  margin-left: -15em; /*set to a negative number 1/2 of your width*/
  background-color: #f3f3f3;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  @media (max-width: 250px) {
    margin: 0;
    border-radius: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  font-size: 30px;
  line-height: 30px;
  margin: 15px;
  cursor: default;
`;

const RowWrapper = styled.div`
  margin: 15px;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
`;

const StyledInput = styled(Input)`
  width: ${(props) => props.column && "190px"};
  border-color: ${(props) => props.error && "red"};
`;

const Password = styled(Input.Password)`
  border-color: ${(props) => props.error && "red"};
`;

const ButtonContainer = styled.div`
  margin: 15px;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-end"};
`;

const Spincontainer = styled.div`
  margin: 20px 0;
  margin-bottom: 20px;
  padding: 30px 50px;
  text-align: center;
  border-radius: 4px;
`;

const SignUpForm = ({ closeForm }) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [submitError, setSubmitError] = useState();
  const [activePage, setActivePage] = useState("default");

  let cardWrapperRef = useRef();
  const clickOutside = (event) => {
    if (cardWrapperRef.current === event.target) {
      closeForm();
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    if (event.target.value === "") {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleChange = (event) => {
    const { name } = event.target;
    setFormValues({ ...formValues, [name]: event.target.value });
  };

  const registerUser = async () => {
    const valid = validate();
    if (valid) {
      try {
        setActivePage("loading");
        await blogApi.post(`auth/register`, {
          name: `${formValues.firstName} ${formValues.lastName}`,
          email: formValues.email,
          password: formValues.password,
        });
        setActivePage("success");
      } catch (err) {
        console.error(err.response.data.error);
        setSubmitError(err.response.data.error);
        setActivePage("error");
      }
    }
  };

  const validate = () => {
    let valid = true;
    let errors = {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    };
    if (formValues.firstName === "") {
      errors.firstName = true;
    }
    if (formValues.lastName === "") {
      errors.lastName = true;
    }
    if (formValues.email === "") {
      errors.email = true;
    }
    if (formValues.password === "") {
      errors.password = true;
    }
    if (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.password
    ) {
      valid = false;
    }
    setErrors(errors);

    return valid;
  };

  const resetPage = () => {
    setErrors({
      firstName: false,
      lastName: false,
      email: false,
      password: false,
    });
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setSubmitError("");
    setActivePage("default");
  };

  return (
    <Wrapper ref={cardWrapperRef} onClick={clickOutside}>
      <Card>
        <Title>Sign Up</Title>
        {activePage === "loading" && (
          <Spincontainer>
            <Spin size="large" />
          </Spincontainer>
        )}
        {activePage === "error" && (
          <>
            <RowWrapper>Error: {submitError}</RowWrapper>
            <ButtonContainer>
              <Button onClick={resetPage} type="primary">
                Start Over
              </Button>
            </ButtonContainer>
          </>
        )}
        {activePage === "default" && (
          <form onSubmit={registerUser}>
            <RowWrapper>
              {/* The reason for the weird 1 or undefined error field is becuase Styled components only understand 
            string values so booleans are a no go. This could be a good place to just use traditional css instead.
            Only problem there is I'm not sure you can pass probs to regular css */}
              <StyledInput
                onChange={handleChange}
                placeholder="First Name"
                name="firstName"
                onBlur={handleBlur}
                error={errors.firstName ? 1 : undefined}
                column={1}
              />
              <StyledInput
                onChange={handleChange}
                placeholder="Last Name"
                name="lastName"
                onBlur={handleBlur}
                error={errors.lastName ? 1 : undefined}
                column={1}
              />
            </RowWrapper>
            <RowWrapper>
              <StyledInput
                onChange={handleChange}
                placeholder="Email"
                name="email"
                onBlur={handleBlur}
                error={errors.email ? 1 : undefined}
              />
            </RowWrapper>
            <RowWrapper>
              <Password
                onChange={handleChange}
                placeholder="Password"
                name="password"
                onBlur={handleBlur}
                error={errors.password ? 1 : undefined}
              />
            </RowWrapper>
            <ButtonContainer>
              <Button onClick={registerUser} type="primary">
                Submit
              </Button>
            </ButtonContainer>
          </form>
        )}
        {activePage === "success" && (
          <>
            <RowWrapper justifyContent="center">
              <Title>Thank You!</Title>
            </RowWrapper>
            <RowWrapper justifyContent="center">
              <p>Check your email for a link to complete your registration</p>
            </RowWrapper>
            <ButtonContainer justifyContent="center">
              <Button onClick={closeForm} type="primary">
                Finish
              </Button>
            </ButtonContainer>
          </>
        )}
      </Card>
    </Wrapper>
  );
};

export default SignUpForm;
