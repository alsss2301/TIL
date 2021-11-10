import React, {useRef, useState, useMemo, useCallback, useReducer} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
import produce from 'immer';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  /*inputs: { 
    username: '',
    email: ''
  }, */ //inputs은 필드이면서도 객체임.
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
    /*case 'CHANGE_INPUT':
      return {
        ...state,
        inputs:  {
          ...state.inputs,
          [action.name]: action.value
        }//불변성 지키기위해 spread연산자 사용
      };*/

    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
        /*inputs:initialState.inputs,
        users:state.users.concat(action.user)*/

    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user=>user.id === action.id);
        user.active = !user.active;
      });
      /*return {
        ...state,
        users: state.users.map(user =>
          user.id === action.id ? {...user, active: !user.active} : user
          )
      };*/

    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user=>user.id === action.id);
        draft.users.splice(index, 1);
      });
      /*return {
        ...state,
        users:state.users.filter(user => user.id !== action.id);
      };*/

      default:
        return state;
    }
   // 새로운 상태를 만들고 새로운 상태를 return으로 반환
} // 현재상태와 액션객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수, 액션은 업데이트를 위한 정보를 가지고 있음

export const UserDispatch = React.createContext(null); //프로젝트의 상태를 전역적으로 관리함, 나중에 사용하고 싶을 때 불러와서 사용하기 위해 export함. import { UserDispatch } from './App'; 이렇게 사용가능

function App() {
  /*const [{username, email}, onChange, reset] = useInputs({
    username : '',
    email: ''
  });*/

  const [state, dispatch] = useReducer(reducer, initialState); //useReducer는 상태 업데이트할때 사용, dispatch는 액션을 발생시키는 함수, 배열을 쓰는이유는 useState와 같은 이유, state는 현재상태, dispatch는 상태업뎃함수
  //const nextId = useRef(4);
  
  const {users} = state; //구조분해할당, state가 객체라서 {}씀. [a, b] = [1,2];
 // const {username, email} = state.inputs;

  /*const onChange = useCallback(e=> {
    const {name, value} = e.target;
    dispatch({ // dispatch함수를 호출할때는 객체 하나를 파라미터로 넣어서 호출해야함(type프로퍼티는 무조건 필수). > dispatch는 받은 객체를 action에 복사함.
      type:'CHANGE_INPUT', //type이 switch의 action.type으로 들어가서 CREATE_USER를 리턴해줌
      name,
      value
    });
  }, []); */

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}> 
    <CreateUser />
    <UserList users={users} />
    <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider> 
  ); //Context안의 Provider컴포넌트를 이용해 Context의 값을 정할수있음. Provider에 의하여 감싸진 컴포넌트 중 어디서든지 우리가 Context 의 값을 다른 곳에서 바로 조회해서 사용 할 수 있음.
      // 여기서 value는 dispatch임.  UserDispatch 라는 Context 를 만들어서, 감싸진 컴포넌트 중 어디서든지 dispatch를 꺼내 쓸 수 있도록 준비를 해준 것.
}

export default App;

