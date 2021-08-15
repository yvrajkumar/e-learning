import React, { useState } from "react";
import classes from './Login.module.css';
import { Link, useHistory} from "react-router-dom";
import Login_Img from "../Images/Login.svg";
import axios from 'axios';

function LogIn() {
    const [LoginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
      });
      const [Alert, setAlert] = useState("");
      let history = useHistory();

      const onChangeHandler = (e) => {
        let user = LoginDetails;
        user[e.target.name] = e.target.value;
        setLoginDetails(user);
      };
       
      if(localStorage.getItem("userDetails")!=null)
      {
        history.push("/home");
      }

      const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.post(`https://e-learning-yvlk.herokuapp.com/login/`, { email: LoginDetails["email"], password: LoginDetails["password"] })
      .then(res => {
        if(res.status===200)
        {
          console.log(res.data);
          localStorage.setItem('userDetails', JSON.stringify(res.data));
          history.push('/home')
          
        }
        else{
          alert("Please provide valid credentials");
        }
      })
      .catch(error =>{
          console.log(error);
          setAlert("Please provide valid credentials");
      })
        return;        
      }

      const homepageHandler = async (e) => {
        e.preventDefault();
        history.push('/');
        return;
    }
    
  return (
    <div style={{width: "100vw",height: "100vh"}}>
      <div style={{background:"#C73A0D"}}>
          <h1 style={{color:"white",padding:"10px", cursor:"pointer"}} onClick={homepageHandler}>E-Learning</h1>
      </div>
      <div className={classes.Login}>
      <div className={classes.Login_Box}>
            <form onSubmit={onSubmitHandler}>
              <h1 className={classes.title_SU} style={{color:"#C73A0D",fontFamily:"'Oswald', sans-serif"}}>LOGIN</h1>
              <br></br>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={onChangeHandler}
              /><br></br>
              <center><b style={{color:"red"}}>{Alert}</b></center><br></br>
              <input type="submit" value="Login" />
              <br></br><br></br>
              <div className={classes.bottomLinkWrapper}>
              <br></br>
              <b>New User ?&nbsp;</b>
              <Link to="/signup" className={classes.BottomLinks} style={{color:"#C73A0D",fontFamily:"'Oswald', sans-serif"}}>
                Sign Up
              </Link>
            </div>
            </form>
        </div>
        <div className={classes.Login_Image}>
          <img src={Login_Img} alt="Login" />
      </div>
      </div>
    </div>
  );
}

export default LogIn;