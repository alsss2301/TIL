import React, { useEffect } from 'react';
import { useUsersState, useUsersDispatch, getUser } from './UsersContext';


function User({ id }) {
    const state = useUsersState();
    const dispatch = useUsersDispatch();
    useEffect(() => {
      getUser(dispatch, id);
    }, [dispatch, id]);
    // useEffect 를 사용해서 id 값이 바뀔 때마다 getUser() 함수를 호출해주도록 함. 
    //여기서 getUser() 함수를 호출 할 때에는 두번째 파라미터에 현재 props 로 받아온 id 값을 넣어줌.


    const { data: user, error, isLoading } = state.user;
  
  
    if (isLoading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!user) return null;
  
    return (
      <div>
        <h2>{user.username}</h2>
        <p>
          <b>Email:</b> {user.email}
        </p>
      </div>
    );
  }
  
  export default User;