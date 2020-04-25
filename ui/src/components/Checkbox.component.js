import React, { useState } from "react";
import styled, { css } from "styled-components";

import colors from "../utils/colors";

const CheckboxWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: ${(props) =>
    props.align && props.align === "right" ? "flex-end" : props.align};
`;

const StyledCheckbox = styled.div`
  height: 25px;
  width: 25px;
  background-color: white;
  border-radius: 3pt;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.1);
  position: relative;

  :hover {
    cursor: pointer;
  }

  ${(props) =>
    props.checked &&
    css`
      :before {
        content: "◆";
        color: ${colors.primary};
        position: absolute;
        left: 50%;
        transform: translate(-50%);
      }
    `}
`;

const Label = styled.p`
  margin-left: 10px;
`;

class Checkbox extends React.Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    const { checked } = this.props;
    this.setState({ checked });
  }

  render() {
    let { checked } = this.state;
    let { onClick, label, className, align } = this.props;
    onClick && (onClick = onClick.bind(this));
    return (
      <CheckboxWrapper className={className} align={align}>
        <StyledCheckbox
          checked={checked}
          onClick={(e) =>
            this.setState({ checked: !checked }, onClick && onClick())
          }
        />
        {label && (
          <Label>{(checked ? label.checked : label.unchecked) || label}</Label>
        )}
      </CheckboxWrapper>
    );
  }
}

export default Checkbox;
