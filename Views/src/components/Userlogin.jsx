import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Userlogin = () => {
  const userRef = useRef();
  const errRef = errRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  
  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  return (

    <div>Userlogin</div>
  )
}

export default Userlogin