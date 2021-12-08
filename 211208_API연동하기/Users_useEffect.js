import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchUsers = async () => {
    //비동기란, 순서대로 이루어지도록 하는 것, A가 실행되고 나서 B가 실행되도록, 일련의 과정에 대해 순차성을 강제해주는 것. 
    //asyns-await을 이용하여 구현가능. 이경우 fetchUsers함수는 axios.get(...)을 기다릴 것(await)이다.
         try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);
            const response = await axios.get(
              'https://jsonplaceholder.typicode.com/users'
            );
            setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
        } catch (e) {
            setError(e);
        }
        setLoading(false);
      };

      useEffect(() => {
        fetchUsers();
      }, []);
    
     
      if (loading) return <div>로딩중..</div>;
      if (error) return <div>에러가 발생했습니다</div>;
      if (!users) return null;
      return (
        <>
            <ul>
            {users.map(user => (
                <li key={user.id}>
                {user.username} ({user.name})
                </li>
            ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </>
      );
    }

    export default Users;
