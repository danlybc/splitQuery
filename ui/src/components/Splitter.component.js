import React, { Component } from "react";
import { Container, Col, Row, Navbar, Nav, FormCheck } from "react-bootstrap";
import styled, { css } from "styled-components";

import { getFunctionsLength } from "../utils/functions";

import FuncList from "./FuncList.component";
import FuncCard from "./FuncCard.component";
import Checkbox from "./Checkbox.component";
import jQueryFunctions from "../data/jQueryFunctions.json";
import colors from "../utils/colors";
import FormCheckLabel from "react-bootstrap/FormCheckLabel";

const FN_LENGTH = getFunctionsLength();

const Button = styled.button`
  color: ${colors.primary};
  transition: 0.5s;
  font-weight: bold;
  background: ${colors.secondary};
  border: solid 1px ${colors.tertiary};
  border-radius: 1.3em;
  padding: ${(props) => (props.opened ? "13px" : "26px")};
  padding-top: 7px;
  padding-bottom: 7px;
  :focus {
    outline: none;
  }
`;

const SplitterWrapper = styled(Container)`
  background: ${colors.lightgrey};
  border: solid 1px ${colors.grey};
  width: 100%;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  left: 50%;
  transition: 0.7s;
  & .row {
    transition: 2s;
  }
  transform: translate(-50%, -50%);
  border-radius: 1.6rem;
  z-index: 5;
  top: ${(props) => (props.opened ? "50%" : "124vh")};

  & h2 {
    color: ${colors.primary};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 1.3rem;
  overflow: hidden;
  background: ${colors.primary};
`;
const FillBar = styled.div`
  height: 100%;
  width: ${(props) => props.fill + "%"};
  background: ${colors.darkgrey};
  transition: 0.3s;
`;

const SearchBar = styled.input`
  border-radius: 1.3vw;
  border: none;
  padding: 5px;
  padding-left: 12px;
  :focus {
    outline: none !important;
    border: none;
    box-shadow: none;
  }
`;

export default class Splitter extends Component {
  state = {
    selectedFn: ["qs"],
    minify: true,
    searchQuery: "",
  };
  constructor(props) {
    super(props);
    this.minify = React.createRef();
    this.searchFuncs = React.createRef();
  }

  render() {
    const { changeAppState } = this.props;
    const { selectedFn, minify, searchQuery } = this.state;
    const props = this.props;
    let { opened } = this.props;
    const percentJQuery = Math.round((selectedFn.length / FN_LENGTH) * 100);
    return (
      <SplitterWrapper
        className={`position-absolute px-5 pb-5`}
        opened={opened}
      >
        <Row className={`py-4 ${opened ? "text-left" : "text-center"}`}>
          <Col md={12}>
            <Button
              onClick={() => changeAppState("splitter", !opened)}
              opened={opened}
            >
              {opened ? "⨯" : "start splitting"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <h2>Functionnalities</h2>
            <Row>
              <Col md={12}>
                <SearchBar
                  ref={this.searchFuncs}
                  onChange={(e) =>
                    this.setState({ searchQuery: e.target.value })
                  }
                />

                {searchQuery.length > 0 && (
                  <button
                    onClick={(e) =>
                      this.setState(
                        { searchQuery: "" },
                        () => (this.searchFuncs.current.value = "")
                      )
                    }
                  >
                    ⨯
                  </button>
                )}
              </Col>
              <FuncList />
            </Row>
          </Col>
          <Col md={5}>
            <h2>Your bundle</h2>
            <Row>
              <Col md={12}>
                {selectedFn.length > 0 && (
                  <p>
                    You'd be using {percentJQuery}
                    % of jQuery, <br />
                    <strong>you're using 100% of splitQuery</strong>
                    <ProgressBar>
                      <FillBar fill={percentJQuery} />
                    </ProgressBar>
                  </p>
                )}
              </Col>
            </Row>
            <Row>
              <Col
                md={12}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                }}
              >
                {selectedFn.map((func) => (
                  <FuncCard>{func}</FuncCard>
                ))}
              </Col>
            </Row>
            <Row className="text-right">
              <Col md={12}>
                <FormCheck
                  style={{ opacity: 0, width: 0, height: 0 }}
                  className="pb-2"
                  type="checkbox"
                  label="minify version"
                  onClick={(e) => this.setState({ minify: e.target.checked })}
                />
                <Checkbox
                  ref={this.minify}
                  label="minified version"
                  align="right"
                  checked={minify}
                  onClick={() => {
                    this.setState({
                      minify: this.minify.current.state.checked,
                    });
                  }}
                />
              </Col>
              <Col md={12}>
                <Button>generate</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </SplitterWrapper>
    );
  }
}
