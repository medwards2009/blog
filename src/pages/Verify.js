import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import LoadingIcon from '../components/LoadingIcon';
import Wrapper from '../components/DefaultWrapper';
import Title from '../components/Title'

// import blogApi from '../api/blogApi';


const Verify = () => {
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  console.log(history);

  const verifyUser = async () => {
    try {
      // const res = await blogApi.post(history.location.pathname);
      // console.log(res);
      console.log(history.location.pathname);
      setLoading(false);
    } catch (err) {
      console.error(err);
    };
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <LoadingIcon />
      ):(
        <>
        <Title>Thanks</Title>
        <div>{history.location.pathname}</div>
        </>
      )}
    </Wrapper>
  );
};


export default Verify;
