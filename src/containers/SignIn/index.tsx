import React, {useCallback, useEffect, useState} from 'react';
import {gql, useLazyQuery} from '@apollo/client';

export const LOGIN = gql`
  query ($id: String!){
    user(id: $id) {
      id
    }
  }
`;

const SignIn: React.FC = (): any => {
  const [userId, setUserId] = useState<string>('');

  const [auth, {loading, data}] = useLazyQuery(LOGIN, {
    onCompleted(){
      alert('success')
    }
  });
  
  const authCheck = (e: any) => {
    e.preventDefault();
    if(userId !== '') {
      auth({variables: {id:userId}});
    }
  }

  if (loading) return 'Loading...';

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="ID" onChange={e => setUserId(e.target.value)} />
        <input type="password" placeholder="PW" />
        <button onClick={e => authCheck(e)}>Login</button>
      </form>
      {
        data && 
        <p>로그인 성공</p>
      }
    </div>
  );
};

export default SignIn;
