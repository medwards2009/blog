import styled from "styled-components";

const ModalCard = styled.div`
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

export default ModalCard;
