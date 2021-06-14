import styled from "styled-components";

const Title = styled.div`
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: ${(props) => (props.size ? props.size : "24px")};
  cursor: ${(props) => (props.cursor ? props.cursor : "default")};
  font-family: "Limelight", cursive;
  margin: auto;
`;

export default Title;
