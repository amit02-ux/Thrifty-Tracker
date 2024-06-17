import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { message } from 'antd';

const Header = () => {
  const [theme,setTheme]=useState("dark-theme")
  const navigate=useNavigate()
  const logoutHandler=()=>{
    localStorage.removeItem('user');
    message.success("Logout successfully")
    const myTimeout = setTimeout(() => {
      navigate('/login');
  }, 400); 


  }
  const changeMode=()=>{
    // console.log(theme)
    if(theme=="light-theme"){
      setTheme("dark-theme")
    }
    else
    setTheme("light-theme")


  }
  const [loginUser,setLoginUser]=useState('')
  

useEffect(() => {
  // Retrieve user from local storage
  const storedUser = localStorage.getItem('user');
  
  // Initialize user variable
  let user = null;
  
  // Try to parse the stored user data
  try {
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing stored user data", error);
  }
  
  // Apply the theme to the document body
  document.body.className = theme;
  
  // Set the login user if it exists
  if (user) {
    setLoginUser(user);
  }
}, [theme, setLoginUser]);

// Don't forget to include `theme` and `setLoginUser` in the dependency array

  return (
   <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <div>
    <h1 className="navbar-brand" >Thrifty-Tracker</h1>
    </div>
 
    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button> */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to='/login'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/transactions">Transactions</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/report">Report</Link>
        </li>
       <li>
       <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Setting
  </a>

  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#" onClick={logoutHandler}>Logout</a></li>
    <li><a class="dropdown-item" onClick={changeMode}>Change-Mode</a></li>
    {/* <li><a class="dropdown-item" href="#">Something else here</a></li> */}
  </ul>
</div>
       </li>
      
      </ul>
      <div className="profile-icon">
  
</div>

    </div>
  </div>
</nav>

   
   </>
  )

}

export default Header