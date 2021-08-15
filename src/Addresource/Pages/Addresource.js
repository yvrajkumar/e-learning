import React, { useState, useEffect } from "react";
import classes from './Addresource.module.css';
import { Link, useHistory} from "react-router-dom";
import axios from 'axios';

function Addresource() {
    const [ResourceDetails, setResourceDetails] = useState({
      resourceName: "",
      resourceLink: "",
      imageUrl: "",
      resourceCategory: "",
      createdBy:{
        email: JSON.parse(localStorage.getItem("userDetails"))
      }
    });

    const [Alert, setAlert] = useState("");

    let history = useHistory();

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      axios.post(`https://e-learning-yvlk.herokuapp.com/home/`, { resourceName: ResourceDetails["resourceName"], resourceLink: ResourceDetails["resourceLink"], imageUrl: ResourceDetails["imageUrl"], resourceCategory: ResourceDetails["resourceCategory"], createdBy: ResourceDetails["createdBy"] })
    .then(res => {
      if(res.status===200)
      {
        history.push('/addresource');
        setAlert("Resource added successfully");
        
      }
      else{
        alert("Please provide valid details");
      }
    })
    .catch(error =>{
        console.log(error);
        alert("Please provide valid details");
    })
      return;        
    }

    const onChangeHandler = (e) => {
      let resource = ResourceDetails;
      resource[e.target.name] = e.target.value;
      setResourceDetails(resource);
    };
    
    const homepageHandler = async (e) => {
        e.preventDefault();
        history.push('/home');
        return;
    }

    const coursepagenavHandler = async (e) => {
      e.preventDefault();
      history.push('/course');
      return;
    }

    const homepagenavHandler = async (e) => {
      e.preventDefault();
      history.push('/home');
      return;
    }
    
    const addresourcenavHandler = async (e) => {
      e.preventDefault();
      history.push('/addresource');
      return;
    }
  
    const logoutHandler = async (e) => {
      e.preventDefault();
      localStorage.removeItem('userDetails');
      history.push('/');
      return;
    }
    
  return (
    <div style={{width: "100vw",height: "100vh"}}>
      <div style={{background:"#C73A0D",display:"flex"}}>
          <h1 style={{color:"white",padding:"10px",cursor:"pointer"}} onClick={homepageHandler}>E-Learning</h1>
          {
              localStorage.getItem("userDetails")==="admin"?
                  <>
                  <h3 style={{color:"white",padding:"10px", paddingTop:"20px", marginLeft:"60%", cursor:"pointer"}} onClick={homepagenavHandler}>Home</h3>
                  <h3 style={{color:"white",padding:"10px", paddingTop:"20px", cursor:"pointer"}} onClick={coursepagenavHandler}>Course</h3>
                  </>
                :
                <h3 style={{color:"white",padding:"10px", paddingTop:"20px", marginLeft:"60%", cursor:"pointer"}} onClick={addresourcenavHandler}>Add Resource</h3>

          }
          <h3 style={{color:"white",padding:"10px", paddingTop:"20px", cursor:"pointer"}} onClick={logoutHandler}>Logout</h3>
      </div>
      <div className={classes.Addresource_Box}>
      <form onSubmit={onSubmitHandler}>
              <h1 className={classes.title_SU} style={{color:"#C73A0D",fontFamily:"'Oswald', sans-serif"}}>Add New Resource</h1>
              <br></br>
              <center><b style={{color:"red"}}>{Alert}</b></center><br></br>
              <input
                type="text"
                placeholder="Enter Resource Name"
                name="resourceName"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="text"
                placeholder="Enter Resource Link"
                name="resourceLink"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="text"
                placeholder="Enter Image Url"
                name="imageUrl"
                onChange={onChangeHandler}
              /><br></br>

              <input
                type="text"
                placeholder="Enter Resource Category"
                name="resourceCategory"
                onChange={onChangeHandler}
              /><br></br>

              <input type="submit" value="Add Resource" />
              <br></br><br></br>
            </form>
      </div>
    </div>
  );

  }

export default Addresource;