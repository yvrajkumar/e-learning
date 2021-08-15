import React, { useState } from "react";
import classes from './Signup.module.css';
import { Link, useHistory} from "react-router-dom";
import Signup_Img from "../Images/Signup.svg";
import axios from 'axios';

function Signup() {
    const [SignupDetails, setSignupDetails] = useState({
        email: "",
        username: "",
        mobilenumber:"",
        address: "",
        password: "",       
        confirmpassword: ""
      });

      let history = useHistory();

      const onChangeHandler = (e) => {
        let user = SignupDetails;
        user[e.target.name] = e.target.value;
        setSignupDetails(user);
      };
    
      const onSubmitHandler = async (e) => {
      if(SignupDetails["password"]===SignupDetails["confirmpassword"])
      {
          e.preventDefault();
          axios.post(`https://e-learning-yvlk.herokuapp.com/signup/`, { email: SignupDetails["email"], password: SignupDetails["password"], username: SignupDetails["username"], mobileNumber: SignupDetails["mobilenumber"], address: SignupDetails["address"], active: "true", role: "user"  })
        .then(res => {
          console.log(res);
          console.log(res.data);
          console.log(res.status);
          if(res.data===true)
          {
            console.log(res.data.validation);
            localStorage.setItem('userDetails', JSON.stringify(res.data));
            window.location.replace('/login');
            
          }
          else{
            alert(res.data.message);
          }
        })
      }
      else{
        alert("Please enter valid password and confirm password");
      }
        return;        
      }

      const homepageHandler = async (e) => {
        e.preventDefault();
        window.location.replace('/');
        return;
    }
    
  return (
    <div style={{width: "100vw",height: "100vh"}}>
      <div style={{background:"#C73A0D"}}>
          <h1 style={{color:"white",padding:"10px",cursor:"pointer"}} onClick={homepageHandler}>E-Learning</h1>
      </div>
      <div className={classes.Signup}>
      <div className={classes.Signup_Box}>
            <form onSubmit={onSubmitHandler}>
              <h1 className={classes.title_SU} style={{color:"#C73A0D",fontFamily:"'Oswald', sans-serif"}}>Sign Up</h1>

              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="text"
                placeholder="Enter User Name"
                name="username"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="tel"
                placeholder="Enter Mobile Number"
                name="mobilenumber"
                pattern="[0-9]{10}"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="text"
                placeholder="Enter Address"
                name="address"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="password"
                placeholder="Enter Confirm Password"
                name="confirmpassword"
                onChange={onChangeHandler}
              /><br></br>

              <input type="submit" value="Signup" />
              
              <div className={classes.bottomLinkWrapper}>
              <br></br>
              <b>Already a user?&nbsp;</b>
              <Link to="/login" className={classes.BottomLinks} style={{color:"#C73A0D",fontFamily:"'Oswald', sans-serif"}}>
                Login
              </Link>
            </div>
            </form>
        </div>
        <div className={classes.Signup_Image}>
          <img src={Signup_Img} alt="Signup" />
      </div>
      </div>
    </div>
  );
}

export default Signup;