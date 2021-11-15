import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';


const sizeStyles = css`
  ${props =>
    props.size === 'large' &&
    css`
      height: 3rem;
      font-size: 1.25rem;
    `}

  ${props =>
    props.size === 'medium' &&
    css`
      height: 2.25rem;
      font-size: 1rem;
    `}

    ${props =>
      props.size === 'small' &&
      css`
        height: 1.75rem;
        font-size: 0.875rem;
      `}
`;


const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 크기 */
  height: 2.25rem;
  font-size: 1rem;

  /* 색상 */
  ${props => {
      const selected = props.theme.palette.[props.color];
      /*
       ${({ theme, color }) => {
    const selected = theme.palette[color];
    */ //비구조화할당이용해서 가독성높임
      return css`
      background: ${selected};
      &:hover {
          background: ${lighten(0.1, selected)};
      }
      &:active {
          background: ${darken(0.1, selected)};
      }
      `;
  }}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }
`; //해당 스타일을 가진 컴포넌트를 만들 수 있음.(여기선 Circle컴포넌트) 만약에 div 를 스타일링 하고 싶으면 styled.div, input 을 스타일링 하고 싶으면 styled.input 이런식

function Button({children, color, size, ...rest}) {
  return (
    <StyledButton color={color} size={size} {...rest}>
        {children}
    </StyledButton>
  );
}

Button.defaultProps = {
    color: 'blue'
};



export default Button;