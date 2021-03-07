import React, {useCallback, useEffect, useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';


const GET_USER = gql`
  query {
    users {
      userNo
      id
      pw
      name
    }
  }
`;

const SIGNUP = gql`
  mutation createUser($id: String!, $pw: String!, $name: String!) {
    createUser(variables: {id: $id, pw: $pw, name: $name}) {
      userNo
      id
      pw
      name
    }
  }
`;

const SignUp: React.FC = (): any => {
  const [accountInfo, setAccountInfo] = useState({
    id: '',
    pw: '',
    name: '',
  });

  const {data: userData, loading: userDataLoading} = useQuery(GET_USER);
  const [signup, {loading, data}] = useMutation(SIGNUP, {
    refetchQueries: [
      { query:  GET_USER }
    ],
    onCompleted() {
      alert('success')
      console.log('success')
    },
    onError(error) {
      alert(error.message)
    }
  });

  const authCheck = (e: any) => {
    const {id, pw, name} = accountInfo;
    e.preventDefault();
    if(
      id !== '' &&
      pw !== '' &&
      name !== ''
    ) {
      signup({variables: {id:id, pw:pw, name:name}});
    }
  };
  
  const onChange = (e: any) => {
    const {name, value} = e.target;
    setAccountInfo({...accountInfo, [name]: value});
  };

  console.log('signUp Data',data);
  console.log('Refetch userData', userData, userDataLoading);
  if (loading) return 'Loading...';
  const {id, pw, name} = accountInfo;
  return (
    <div>
      <h2>회원가입</h2>
      <form>
        <input name="id" value={id} type="text" placeholder="ID" onChange={onChange} />
        <input name="pw" value={pw} type="password" placeholder="PW" onChange={onChange} />
        <input name="name" value={name} type="text" placeholder="name" onChange={onChange} />
        <button onClick={e => authCheck(e)}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
