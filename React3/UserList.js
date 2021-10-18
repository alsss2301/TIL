import React, {useEffect} from 'react';

function User({ user, onRemove, onToggle }) {
    useEffect(()=> {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
            console.log('user가 바뀌기 전..');
            console.log(user);
        };//useEffect를 사용할때 첫번째 파라미터에는 함수(화살표함수 그자체), 두번째 파라미터에는 배열, 만약 배열을 비우게 되면 컴포넌트가 처음 나타날때만 useEffect에 등록한 함수가 호출됨
    //useEffect의 return값은 함수를 반환할 수 있는데 이를 cleanup 함수라고 부른다. 
    }, [user]);
    return (
        <div>
            <b
                style={{
                    cursor: 'pointer',
                    color: user.active ? 'green' : 'black'
                }}
                onClick={() => onToggle(user.id)}
            >
                {user.username}
                </b> 
                &nbsp;
                <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div> //User컴포넌트의 삭제 버튼이 클릭될때는 user.id값을 앞으로 props로 받아올 onRemove함수의 파라미터로 넣어서 호출
    );
}

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
           {users.map(user => (
               <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}
               />
           ))}
        </div>
    );
}

export default UserList;