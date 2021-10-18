import React, {useRef, useState, useMemo} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}


function App() {
  const [inputs, setInputs] = useState( {
    username: '',
    email: ''
  });
  const {username, email} = inputs;
/* UserList.js에 보면 다음과 같은 코드가 있다.
만약에, 내가 "계정명" 이라고 적힌 창을 눌러서 입력하면
name = "username", value는 내가 저장한 값이 들어온다. const {name, value}
<input name="username"
      placeHolder="계정명"
      onChange={onChange}
      value={username}
  />
  <input 
  name="email"
  placeHolder="이메일"
  onChange={onChange}
  value={email}
  />
  */
  const onChange = e=> {
    const {name, value} = e.target;
    setInputs({
      ...inputs, /*inputs 배열을 새롭게 만드는 것-배열의 불변성때문에 원래 배열은 수정하지말고 */
      [name]: value /*입력한 value값이 name에 들어간다 */
    });
  };
  const [users, setUsers] =  useState([
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
]);

const nextId = useRef(4); //useRef()를 사용할 때 파라미터를 넣어주면 이 값이 .current값의 기본값이 됨.
const onCreate = () => {
  const user = {
    id: nextId.current,
    username,
    email
  };
  setUsers(users.concat(user));

  setInputs({
    username: '',
    email:''
  });
  nextId.current += 1;
};

const onRemove = id => {
  setUsers(users.filter(user => user.id !== id))
};  // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
  // = user.id 가 id 인 것을 제거함

const onToggle = id => {
  setUsers(
    users.map(user =>
      user.id === id ? {...user, active: !user.active } : user
      )
  );
};
const count = useMemo(() => countActiveUsers(users), [users]);
return (
  <>
    <CreateUser 
      username={username}
      email={email}
      onChange={onChange}
      onCreate={onCreate}
    />
    <UserList users ={users} onRemove={onRemove} onToggle={onToggle} />
    <div>활성사용자 수 : {count}</div>
  </>
  );
}

export default App;
