import React, {useState} from 'react';
import {gql, useLazyQuery} from '@apollo/client';

export const LOGIN = gql`
  query($id: String!) {
    user(id: $id) {
      id
    }
  }
`;

const SignIn: React.FC = (): any => {
  const [id, setId] = useState<string>('');

  const [auth, {loading, data}] = useLazyQuery(LOGIN);

  if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  const authCheck = (e: any) => {
    e.preventDefault();
    auth({variables: {id}});

    if (data) alert('success!');
    else alert('fail!');
  };

  console.log('id', id);

  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="ID" onChange={e => setId(e.target.value)} />
        <input type="password" placeholder="PW" />
        <button onClick={e => authCheck(e)}>Login</button>
      </form>
    </div>
  );
};

export default SignIn;
