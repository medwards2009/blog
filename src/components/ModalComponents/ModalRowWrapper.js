import styled from "styled-components";

const ModalRowWrapper = styled.div`
  margin: 15px;
  display: flex;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
`;

export default ModalRowWrapper;
