import styled from "styled-components";
import { Input } from "antd";

const PasswordInput = styled(Input.Password)`
  border-color: ${(props) => props.error && "red"};
`;

export default PasswordInput;
