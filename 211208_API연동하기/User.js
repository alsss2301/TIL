import React from 'react';
import axios from 'axios';
import useAsync from './useAsyns';
//useAsync를 사용할때, 파라미터를 포함시켜서 함수를 호출하는 새로운 함수를 만들어서 등록해줌.
//id가 바뀔때마다 재호출되도록 deps에 id를 넣어줌.
async function getUser(id) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return response.data;
}

function User({ id }) {
    const [state] = useAsync(() => getUser(id), [id]);
    const { loading, data: user, error } = state;
  
    if (loading) return <div>로딩중..</div>;
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