import styled from "styled-components";
import { Input } from "antd";

const StandardInput = styled(Input)`
  margin-right: ${(props) => props.column && "10px"};
  &:last-child {
    margin-right: 0px;
  }
  border-color: ${(props) => props.error && "red"};
`;

export default StandardInput;
