import React, { useState, useEffect } from "react";
import classes from './Home.module.css';
import deleteImg from '../Images/delete.png';
import { Link, useHistory} from "react-router-dom";
import axios from 'axios';

function Home() {
    const [ResourceDetails, setResourceDetails] = useState([]);
    const [UserDetails, setUserDetails] = useState([]);
    let history = useHistory();
    let url = window.location.pathname.split('/').pop();

    useEffect(()=> {
    if(localStorage.getItem("userDetails")!=null)
    {
    if(localStorage.getItem("userDetails")==="admin" && url==="home")
    {
      axios.get(`https://e-learning-yvlk.herokuapp.com/admin/`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.status===200)
        {  
          setUserDetails(res.data); 
        }     
        
      })
    }
    else{
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
    }
    else
    {
      history.push("/");
    }
    },{url,history})

    const addresourcenavHandler = async (e) => {
      e.preventDefault();
      history.push('/addresource');
      return;
    }

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

    const logoutHandler = async (e) => {
      e.preventDefault();
      localStorage.removeItem('userDetails');
      history.push('/');
      return;
    }

    const deleteresourceHandler = (e) => {
      e.preventDefault();
      axios.delete(`https://e-learning-yvlk.herokuapp.com/home/`+e.target.id)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.status===200)
        {  
          history.push("/course");
        }     
        
      })
    }

    const deleteuserHandler = (e) => {
      e.preventDefault();
      axios.delete(`https://e-learning-yvlk.herokuapp.com/admin/delete/`+e.target.id)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(res.status);
        if(res.status===200)
        {  
          history.push("/home");
        }     
        
      })
    }
  if(localStorage.getItem("userDetails")==="admin" && url==="home")
  {
    return (
      <div style={{width: "100vw",height: "100vh"}}>
        <div style={{background:"#C73A0D",display:"flex"}}>
            <h1 style={{color:"white",padding:"10px", cursor:"pointer"}} onClick={homepageHandler}>E-Learning</h1>
            <h3 style={{color:"white",padding:"10px", paddingTop:"20px", marginLeft:"60%", cursor:"pointer"}} onClick={homepagenavHandler}>Home</h3>
            <h3 style={{color:"white",padding:"10px", paddingTop:"20px", cursor:"pointer"}} onClick={coursepagenavHandler}>Course</h3>
            <h3 style={{color:"white",padding:"10px", paddingTop:"20px", cursor:"pointer"}} onClick={logoutHandler}>Logout</h3>
        </div>
        <div>
          <input type="text" style={{width: "50vw", marginLeft: "25%", padding:"5px", marginTop:"15px"}} name="search"></input>
          <button style={{background:"#E6AF9E", border: "none", cursor:"pointer", marginLeft: "10px", padding:"5px", marginTop:"15px", cursor:"pointer"}}>Search</button>
        </div>
        <div style={{marginLeft: "10%", marginRight: "10%", marginTop:"5%", display:"flex", flexWrap: "wrap" }}> 
          <table cellpadding="15" border="1"  style={{width:"70%",borderCollapse:"collapse"}}>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Options</th>
            </tr>
          {UserDetails.map((User) => (

            <tr style={{background:"#E7E9EB"}}>
              <td>{User.username}</td>
              <td>{User.email}</td>
              <td>{User.mobileNumber}</td>
              <td><img src={deleteImg} onClick={deleteuserHandler}  alt="Delete" id={User.email} style={{paddingTop:"5%",paddingBottom:"5%", cursor:"pointer"}}></img></td>
            </tr>
          )) }
            </table>    
        </div>
      </div>
    );
  }
  else{
    return (
      <div style={{width: "100vw",height: "100vh"}}>
        <div style={{background:"#C73A0D",display:"flex"}}>
            <h1 style={{color:"white",padding:"10px", cursor:"pointer"}} onClick={homepageHandler}>E-Learning</h1>
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
                {
                  localStorage.getItem("userDetails")==="admin"?<img src={deleteImg} onClick={deleteresourceHandler}  alt="Delete" id={resource.resourceId} style={{paddingTop:"5%",paddingBottom:"5%"}}></img>:<br></br>
                }
            </Link>
            </div>

          )) }    
        </div>
      </div>
    );
  }

  }

export default Home;