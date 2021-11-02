import React, {useRef, useState, useMemo, useCallback, useReducer} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  }, 
  users: [
    {
      id: 1,
      username: 'verlopert',
      email: 'tester@example.com',
      active : true
    },
    {
      id: 2,
      username: 'tester',
      email: 'public.velopert@gmail.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active : false
    }
  ]
}; // initialState변수에 객체선언하고(객체는 필드를 갖는다, 객체가 객체의 필드로 객체를 가질수도 있음) inputs, users필드를 넣고 inputs은 initialState의 필드이면서 객체임. users필드는 배열선언을 하고 그안에 객체 3개를 넣음

function reducer(state, action) {
  switch(action.type) { //action객체는 사용자정의안해도 리액트가 알아서 해줌.
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs:  {
          ...state.inputs,
          [action.name]: action.value
        }//불변성 지키기위해 spread연산자 사용
      };

    case 'CREATE_USER':
      return {
        inputs:initialState.inputs,
        users:state.users.concat(action.user)
      };

    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? {...user, active: !user.active} : user
          )
      };

    case 'REMOVE_USER':
      return {
        ...state,
        users:state.users.filter(user => user.id !== action.id)
      };

      default:
        return state;
    }
   // 새로운 상태를 만들고 새로운 상태를 return으로 반환
} // 현재상태와 액션객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수, 액션은 업데이트를 위한 정보를 가지고 있음


function App() {
  const [state, dispatch] = useReducer(reducer, initialState); //useReducer는 상태 업데이트할때 사용, dispatch는 액션을 발생시키는 함수, 배열을 쓰는이유는 useState와 같은 이유, state는 현재상태, dispatch는 상태업뎃함수
  const nextId = useRef(4);
  
  const {users} = state; //구조분해할당, state가 객체라서 []씀. [a, b] = [1,2];
  const {username, email} = state.inputs;

  const onChange = useCallback(e=> {
    const {name, value} = e.target;
    dispatch({ // dispatch함수를 호출할때는 객체 하나를 파라미터로 넣어서 호출해야함(type프로퍼티는 무조건 필수). > dispatch는 받은 객체를 action에 복사함.
      type:'CHANGE_INPUT', //type이 switch의 action.type으로 들어가서 CREATE_USER를 리턴해줌
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id:nextId.current,
        username,
        email
      } //user프로퍼티는 객체를 만들어서 줌
    });
    nextId.current += 1;
  }, [username, email]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);


  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
    <CreateUser 
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
    <div>활성사용자 수 : {count}</div>
    </>
  );
}

export default App;

