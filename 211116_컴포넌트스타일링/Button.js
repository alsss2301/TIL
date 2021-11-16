import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

  /* 색상 */
  const colorStyles = css`
    ${({ theme, color }) => {
      const selected = theme.palette[color]; //비구조화할당이용해서 가독성높임
      return css`
      background: ${selected};
      &:hover {
          background: ${lighten(0.1, selected)};
      }
      &:active {
          background: ${darken(0.1, selected)};
      }
      ${props => 
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color:white;
        }
      `}
    `;
  }}
`;

const sizes = {
  large: {
    height: '3rem',
    fontSize: '1.25rem'
  },
  medium: {
    height: '2.25rem',
    fontSize: '1rem'
  },
  small: {
    height: '1.75rem',
    fontSize: '0.875rem'
  }
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};  
  `}
`;

/*css`
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
      `}*/ //유지보수를 할 때 편해지기 위해 sizeStyles 에 해당하는 코드를 따로 분리하지 않고 StyledButton 의 스타일 내부에서 분리시킴.

const fullWidthStyle = css`
  ${props => 
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;// 원래는  & + & 

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
 ${sizeStyles}

 /* 색상 */
 ${colorStyles}

  /* 기타 */
  & + & {
    margin-left: 1rem;
  }

  ${fullWidthStyle}
`; //해당 스타일을 가진 컴포넌트를 만들 수 있음.(여기선 Circle컴포넌트) 만약에 div 를 스타일링 하고 싶으면 styled.div, input 을 스타일링 하고 싶으면 styled.input 이런식

function Button({children, color, size, outline, fullWidth, ...rest}) {
  return (
    <StyledButton
     color={color} 
     size={size} 
     outline={outline}
     fullWidth={fullWidth}
     {...rest}
     >
        {children}
    </StyledButton>
  );
}

Button.defaultProps = {
    color: 'blue',
    size: 'medium'
};



export default Button;