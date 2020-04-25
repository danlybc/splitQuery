import React, { Component } from "react";
import { Container, Col, Row, Navbar, Nav, FormCheck } from "react-bootstrap";
import styled from "styled-components";

import jQueryFunctions from "../data/jQueryFunctions.json";
import colors from "../utils/colors";

import { getCategoryIndex } from "../utils/functions";

import FuncCard from "./FuncCard.component";
import Checkbox from "./Checkbox.component";

const ListWrapper = styled(Row)`
  background: ${colors.grey};
  border-radius: 1.6rem;
  margin-top: 10px;
  overflow: hidden;
  min-height: 40vh;
`;

const Categories = styled(Col)`
  background: ${colors.greyer};
  width: 100%;
  user-select: none;
  min-height: 100%;
  & ul {
    list-style: none;
    padding: 0;
    & li {
      font-weight: 500;
      color: ${colors.darkgrey};
      &.active,
      :hover {
        color: ${colors.primary};
        cursor: pointer;
      }
    }
  }
`;

const Functions = styled(Col)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-height: 20vh;

  & hr {
    width: 100%;
  }
`;

export default class FuncList extends Component {
  state = {
    activeCategory: jQueryFunctions[0].name,
  };

  render() {
    const { activeCategory } = this.state;
    return (
      <Col md={12}>
        <ListWrapper>
          <Categories md={2} className={`py-3`}>
            <ul>
              {jQueryFunctions.map((category) => (
                <li
                  className={`py-1 ${
                    category.name === activeCategory ? "active" : ""
                  }`}
                  onClick={() =>
                    this.setState({ activeCategory: category.name })
                  }
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </Categories>
          <Functions md={10} className={`py-3`}>
            <Checkbox
              label={{
                checked: "remove functions",
                unchecked: "add functions",
              }}
              align="left"
            />
            <hr />
            {jQueryFunctions[getCategoryIndex(activeCategory)].functions.map(
              (func) => (
                <FuncCard>{func.name}</FuncCard>
              )
            )}
          </Functions>
        </ListWrapper>
      </Col>
    );
  }
}
