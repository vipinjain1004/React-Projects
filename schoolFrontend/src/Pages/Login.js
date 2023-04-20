import React,{useEffect} from 'react';
import LoginForm from '../Components/LoginForm';
import { useSelector } from 'react-redux';
import{useNavigate} from 'react-router-dom';
function LoginPage() {
    const authenticationData = useSelector(state => state.authentication);
    const navigate = useNavigate();
    useEffect(()=>{if(authenticationData.isLoggedIn){
        navigate('/');
    }},[]);
    
    return (
        <>   {!authenticationData.isLoggedIn &&   <LoginForm />  }
        </>
    );
}
 export default LoginPage;