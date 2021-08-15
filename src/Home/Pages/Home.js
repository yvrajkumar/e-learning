import React, { useState, useEffect } from "react";
import classes from './Home.module.css';
import { Link, useHistory} from "react-router-dom";
import axios from 'axios';

function Home() {
    const [ResourceDetails, setResourceDetails] = useState([]);

    let history = useHistory();
    let url = window.location.pathname.split('/');
    url = url[-1];

    useEffect(()=> {
    if(localStorage.getItem("userDetails")!=null)
    {
    axios.get(`https://e-learning-yvlk.herokuapp.com/home/`)
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
      history.push("/");
    }
    },{url})

    const homepageHandler = async (e) => {
      e.preventDefault();
      history.push('/');
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
          <h1 style={{color:"white",padding:"10px", cursor:"pointer"}} onClick={homepageHandler}>E-Learning</h1>
          <h3 style={{color:"white",padding:"10px", paddingTop:"20px", marginLeft:"60%", cursor:"pointer"}} onClick={addresourcenavHandler}>Add Resource</h3>
          <h3 style={{color:"white",padding:"10px", paddingTop:"20px", cursor:"pointer"}} onClick={logoutHandler}>Logout</h3>
      </div>
      <div>
        <input type="text" style={{width: "50vw", marginLeft: "25%", padding:"5px", marginTop:"15px"}} name="search"></input>
        <button style={{background:"#E6AF9E", border: "none", cursor:"pointer", marginLeft: "10px", padding:"5px", marginTop:"15px", cursor:"pointer"}}>Search</button>
      </div>
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop:"5%", display:"flex", flexWrap: "wrap" }}> 
        {ResourceDetails.map((resource) => (

          <div style={{maxWidth:"15%",maxHeight:"25%", margin:"20px", background:"#F3D8CF", textAlign:"center"}}>
          <Link to={"/resource/"+resource.resourceId} style={{color: "black",}}>
              <img src={resource.imageUrl} alt="img" width="100%" height="50%"></img><br></br><br></br>
              <h5>{resource.resourceName}</h5><br></br> 
              <p>{resource.resourceCategory}</p> 
          </Link>
          </div>

        )) }    
      </div>
    </div>
  );

  }

export default Home;