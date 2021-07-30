import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import blogApi from "../../api/blogApi";
import { ModalWrapper, ModalCard, ModalRowWrapper } from "../ModalComponents";
import Title from "../Title";
import StandardInput from "../StandardInput";
import PasswordInput from "../PasswordInput";
import LoadingIcon from "../LoadingIcon";
import StyledButton from "../Button";
import CloseIcon from "../CloseIcon";

const SignUpForm = ({ closeForm }) => {
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
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

  const logIn = async () => {
    const valid = validate();
    if (valid) {
      try {
        setActivePage("loading");
        const res = await blogApi.post(`auth/login`, {
          email: formValues.email,
          password: formValues.password,
        });
        localStorage.setItem("token", res.data.token);
        closeForm();
        // TODO: At some point this will redirect to the logged in user's profile
        history.push("/");
      } catch (err) {
        console.log(err);
        console.error(err.response.data.error);
        setSubmitError(err.response.data.error);
        setActivePage("error");
      }
    }
  };

  const validate = () => {
    let valid = true;
    let errors = {
      email: false,
      password: false,
    };
    if (formValues.email === "") {
      errors.email = true;
    }
    if (formValues.password === "") {
      errors.password = true;
    }
    if (errors.email || errors.password) {
      valid = false;
    }
    setErrors(errors);

    return valid;
  };

  const resetPage = () => {
    setErrors({
      email: false,
      password: false,
    });
    setFormValues({
      email: "",
      password: "",
    });
    setSubmitError("");
    setActivePage("default");
  };

  return (
    <ModalWrapper id="modal" ref={cardWrapperRef} onMouseDown={clickOutside}>
      <ModalCard>
        <ModalRowWrapper>
          <Title>Sign In</Title>
          <CloseIcon onClick={closeForm} style={{ fontSize: "30px" }} />
        </ModalRowWrapper>

        {activePage === "loading" && <LoadingIcon />}
        {activePage === "error" && (
          <>
            <ModalRowWrapper>Error: {submitError}</ModalRowWrapper>
            <StyledButton text="Start Over" onClick={resetPage} />
          </>
        )}
        {activePage === "default" && (
          <form onSubmit={logIn}>
            <ModalRowWrapper>
              {/* The reason for the weird 1 or undefined error field is becuase Styled components only understand 
            string values so booleans are a no go. This could be a good place to just use traditional css instead.
            Only problem there is I'm not sure you can pass props to regular css */}
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
            <StyledButton onClick={logIn} text="Submit" />
          </form>
        )}
      </ModalCard>
    </ModalWrapper>
  );
};

export default SignUpForm;
