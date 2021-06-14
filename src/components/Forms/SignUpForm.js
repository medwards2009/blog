import React, { useRef, useState } from "react";

import blogApi from "../../api/blogApi";
import { ModalWrapper, ModalCard, ModalRowWrapper } from "../ModalComponents";
import Title from "../Title";
import StandardInput from "../StandardInput";
import PasswordInput from "../PasswordInput";
import LoadingIcon from "../LoadingIcon";
import StyledButton from "../Button";

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
    <ModalWrapper ref={cardWrapperRef} onClick={clickOutside}>
      <ModalCard>
        <Title>Sign Up</Title>
        {activePage === "loading" && <LoadingIcon />}
        {activePage === "error" && (
          <>
            <ModalRowWrapper>Error: {submitError}</ModalRowWrapper>
            <StyledButton text="Start Over" onClick={resetPage} />
          </>
        )}
        {activePage === "default" && (
          <form onSubmit={registerUser}>
            <ModalRowWrapper>
              {/* The reason for the weird 1 or undefined error field is becuase Styled components only understand 
            string values so booleans are a no go. This could be a good place to just use traditional css instead.
            Only problem there is I'm not sure you can pass probs to regular css */}
              <StandardInput
                onChange={handleChange}
                placeholder="First Name"
                name="firstName"
                onBlur={handleBlur}
                error={errors.firstName ? 1 : undefined}
                column={1}
              />
              <StandardInput
                onChange={handleChange}
                placeholder="Last Name"
                name="lastName"
                onBlur={handleBlur}
                error={errors.lastName ? 1 : undefined}
                column={1}
              />
            </ModalRowWrapper>
            <ModalRowWrapper>
              <StandardInput
                onChange={handleChange}
                placeholder="Email"
                name="email"
                onBlur={handleBlur}
                error={errors.email ? 1 : undefined}
              />
            </ModalRowWrapper>
            <ModalRowWrapper>
              <PasswordInput
                onChange={handleChange}
                placeholder="Password"
                name="password"
                onBlur={handleBlur}
                error={errors.password ? 1 : undefined}
              />
            </ModalRowWrapper>
            <StyledButton onClick={registerUser} text="Submit" />
          </form>
        )}
        {activePage === "success" && (
          <>
            <ModalRowWrapper justifyContent="center">
              <Title>Thank You!</Title>
            </ModalRowWrapper>
            <ModalRowWrapper justifyContent="center">
              <p>Check your email for a link to complete your registration</p>
            </ModalRowWrapper>
            <StyledButton
              justifyContent="center"
              onClick={closeForm}
              text="Finish"
            />
          </>
        )}
      </ModalCard>
    </ModalWrapper>
  );
};

export default SignUpForm;
