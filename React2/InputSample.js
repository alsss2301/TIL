import React, { useState, useRef} from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '', //객체
        nickname: '' //객체
    });
    const nameInput = useRef();

    const { name, nickname } = inputs; //배열 비구조화 할당, 객체의 깊숙한 곳에 들어있는 값을 꺼내는 방법 

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        }); //리액트 상태에서 객체를 수정할 때
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        });
        nameInput.current.focus(); // input 에 포커스를 하는 focus() DOM API 를 호출
    };

    return (
        <div>
            <input name="name"
             placeholder="이름" 
             onChange={onChange} 
             value={name}
             ref={nameInput}
            />
            <input name="nickname"
             placeholder="닉네임"
              onChange={onChange} 
              value={nickname} 
            />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;