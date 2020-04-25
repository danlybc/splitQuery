import React from "react";
import styled from "styled-components";

import colors from "../utils/colors";

const Card = styled.div`
  background: white;
  max-height: 10%;
  transition: 0.12s;
  user-select: none;
  padding: 15px;
  margin: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: center;
  border-radius: 1.6rem;

  :hover {
    box-shadow: 0px 8px 7px rgba(0, 0, 0, 0.1);
    margin-top: 1px;
    margin-bottom: 9px;
    cursor: pointer;
  }

  & span {
    color: ${colors.primary};
    font-weight: bold;
  }
  & p {
    margin: 0;
    margin-right: 3px;
  }
`;

const FuncCard = ({ children }) => {
  return (
    <Card>
      <p>{children}</p>
      <span>+</span>
    </Card>
  );
};

export default FuncCard;
