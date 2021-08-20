import styled from "styled-components";
import { CloseCircleOutlined } from "@ant-design/icons";

const CloseIcon = styled(CloseCircleOutlined)`
  display: none;
  margin-top: 15px;
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

export default CloseIcon;
