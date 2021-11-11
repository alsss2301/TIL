import React from 'react';
import classNames from 'classnames';
import './Button.scss';

function Button({ children, size, color, outline, fullWidth, onClick, ...rest }) {
    return (
    <button className={classNames('Button', size, color, {outline, fullWidth})}
            {...rest} // ...rest를 사용하면 우리가 지정한 props 를 제외한 값들을 rest 라는 객체에 모아주고, <button> 태그에 {...rest} 를 해주면, rest 안에 있는 객체안에 있는 값들을 모두 <button> 태그에 설정해줌.
            /*onClick={onClick}
            onMouseMove={onMouseMove}*/ // 이벤트 설정을 "on이벤트이름={함수이름}" 형태로 작성
    >
        {children}
    </button>
    );
}

Button.defaultProps = {
    size: 'medium',
    color: 'blue'
};

export default Button;