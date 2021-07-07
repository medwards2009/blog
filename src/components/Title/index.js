import styled from "styled-components";

const Title = styled.div`
  font-size: 30px;
  line-height: 30px;
  margin: 15px;
  cursor: default;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
`;

export default Title;
