import React, { useState, useEffect } from "react";
import classes from './Resource.module.css';
import { Link, useHistory} from "react-router-dom";
import axios from 'axios';

function Resource() {
    const [ResourceDetails, setResourceDetails] = useState([]);

    let history = useHistory();
    let id = window.location.pathname.split('/').pop();
    let url = window.location.pathname.split('/');
    url = url[-1];

    useEffect(()=> {
        if(localStorage.getItem("userDetails")!=null)
        {
        axios.get(`https://e-learning-yvlk.herokuapp.com/home/`+id) 
        .then(res => {
          console.log(res);
          console.log(res.data);
          console.log(res.status);
          if(res.status===200)
          {  
            setResourceDetails(res.data); 
          }     
          
        })
      }
      else{
        window.location.replace("/");
      }
    
      }, [url,history]);
    
    const homepageHandler = async (e) => {
        e.preventDefault();
        window.location.replace('/');
        return;
    }

    const coursepagenavHandler = async (e) => {
      e.preventDefault();
      window.location.replace('/course');
      return;
    }

    const homepagenavHandler = async (e) => {
      e.preventDefault();
      window.location.replace('/home');
      return;
    }
    
    const addresourcenavHandler = async (e) => {
      e.preventDefault();
      window.location.replace('/addresource');
      return;
    }
  
    const logoutHandler = async (e) => {
      e.preventDefault();
      localStorage.removeItem('userDetails');
      window.location.replace('/');
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
      <div style={{display:"flex"}}>
        <h3 style={{marginLeft: "5%", marginTop:"15px"}}>{ResourceDetails.resourceName}</h3>
        <input type="text" style={{width: "50vw", marginLeft: "20%", padding:"5px", marginTop:"15px"}} name="search"></input>
        <button style={{background:"#E6AF9E", border: "none", cursor:"pointer", marginLeft: "10px", padding:"5px", marginTop:"15px", cursor:"pointer"}}>Search</button>
      </div>
      <div style={{display:"flex", flexDirection: "row"}}>
        <div style={{background:"#CEEDFF", margin:"5%", width:"60%", height:"80%", display:"flex", flexWrap: "wrap" }}> 
          <div style={{padding:"5%"}}>
          <iframe width="720px" height="350px" 
            src={"https://www.youtube.com/embed/"+ResourceDetails.resourceLink}
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
          </div>
          <div style={{padding:"20px",display:"flex"}}>
            <h2>Video URL: </h2>
            <a href="https://www.youtube.com/embed/yfoY53QXEnI" style={{padding:"5px"}}>https://www.youtube.com/embed/yfoY53QXEnI</a>
          </div>
        </div>
        <div style={{background:"#CEEDFF", margin:"5%", width:"20%", height:"60%", display:"flex", flexWrap: "wrap" }}> 
              <h3 style={{padding:"40%",paddingTop:"10%",paddingBottom:"100%"}}>Chat</h3>
              <input type="text" style={{margin:"5%", marginTop:"50%", paddingBottom:"10px"}}></input>
              <button style={{height:"20px", marginTop:"50%", paddingBottom:"10px"}}>Send</button>
              
        </div>
      </div>
    </div>
  );

  }

export default Resource;