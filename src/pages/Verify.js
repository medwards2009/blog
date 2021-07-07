import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import LoadingIcon from '../components/LoadingIcon';
import Wrapper from '../components/DefaultWrapper';
import Title from '../components/Title'
import StyledButton from '../components/Button'; 
import blogApi from '../api/blogApi';

const Text = styled.div`
  margin: 15px;
  cursor: default;
  display: flex;
  justify-content: center;
`;


const Verify = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const verifyUser = async () => {
    try {
      await blogApi.post(`auth${history.location.pathname}`);
      setLoading(false);
    } catch (err) {
      console.error(err);
      history.push("/error");
    };
  };

  useEffect(() => {
    verifyUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This will eventually become go to complete profile or something like that
  const goHome = () => {
    history.push("/");
  };

  return (
    <Wrapper>
      {loading ? (
        <LoadingIcon />
      ):(
        <>
        <Title justifyContent="center">Thank You</Title>
        <Text>Thank you for verifying your user!</Text>
        <StyledButton text="Complete Profile" onClick={goHome} justifyContent="center" />
        </>
      )}
    </Wrapper>
  );
};


export default Verify;
