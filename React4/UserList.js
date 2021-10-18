import React  from 'react';

const User = React.memo(function User({ user, onRemove, onToggle }) {
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
});

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
           {users.map(user => (
               <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove} 
                    onToggle={onToggle}
               />
           ))}
        </div>
    );
}

export default React.memo(UserList);