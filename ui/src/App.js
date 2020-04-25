import React, { Component } from "react";
import { Container, Col, Row, Navbar, Nav, Button } from "react-bootstrap";
import { UndrawProgrammer } from "react-undraw";

import Splitter from "./components/Splitter.component";

import colors from "./utils/colors";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Logo from "./assets/img/Logo.svg";

class App extends Component {
  state = {
    splitter: false,
  };

  /**
   * @param {string} property name of property you want to change
   * @param {string} value new value for the property
   */
  changeAppState = (property, value) => {
    const state = this.state;
    state[property] = value;
    this.setState({ state });
  };

  componentDidMount() {
    this.setState({ splitter: true });
  }

  render() {
    const { splitter } = this.state;
    return (
      <div className="App">
        <div
          className="App--dimmer"
          style={{ opacity: splitter ? "0.3" : "0" }}
        ></div>
        <Container>
          <Navbar className="pt-5 pb-5 Navbar" collapseOnSelect expand="lg">
            <Navbar.Brand href="#" className="Navbar--brand">
              <img src={Logo} width={50} />
              splitQuery
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="#blog">Blog</Nav.Link>
                <Nav.Link href="#tool">Tool</Nav.Link>
                <Nav.Link href="#more">More</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
        <Container className="pt-5 App--hero position-relative">
          <Row>
            <Col md={7} style={{ zIndex: 2 }}>
              <h1>Tired of using only a part of jQuery ?</h1>
            </Col>
          </Row>
          <Row>
            <Col md={4} style={{ zIndex: 2 }}>
              <p>
                Use only what you need, <a href="#">discover our splitter</a>
              </p>
            </Col>
          </Row>
          <UndrawProgrammer
            height={400}
            primaryColor={colors.primary}
            className="position-absolute"
            style={{ top: 50, right: "-16vw" }}
          />
        </Container>
        <Splitter opened={splitter} changeAppState={this.changeAppState} />
      </div>
    );
  }
}

export default App;
