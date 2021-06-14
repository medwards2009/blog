import styled from "styled-components";
import { Input } from "antd";

const StandardInput = styled(Input)`
  width: ${(props) => props.column && "190px"};
  border-color: ${(props) => props.error && "red"};
`;

export default StandardInput;
