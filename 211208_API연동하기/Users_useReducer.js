import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

function reducer(state, action) {
    switch (action.type) {
      case 'LOADING':
        return {
          loading: true,
          data: null,
          error: null
        };
      case 'SUCCESS':
        return {
          loading: false,
          data: action.data,
          error: null
        };
      case 'ERROR':
        return {
          loading: false,
          data: null,
          error: action.error
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

function Users() {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });


    const fetchUsers = async () => {
    //비동기란, 순서대로 이루어지도록 하는 것, A가 실행되고 나서 B가 실행되도록, 일련의 과정에 대해 순차성을 강제해주는 것. 
    //asyns-await을 이용하여 구현가능. 이경우 fetchUsers함수는 axios.get(...)을 기다릴 것(await)이다.
         dispatch({ type: 'LOADING' });
         try {
             const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
             );
             dispatch({ type: 'SUCCESS', data: response.data});
         } catch (e) {
           dispatch({ type: 'ERROR', error:e });
         }
      };

      useEffect(() => {
        fetchUsers();
      }, []);

      const { loading, data: users, error } = state; //state.data를 users키워드로 조회
    
     
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
