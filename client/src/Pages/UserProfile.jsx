import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Context/auth';
import Sidebar from '../components/sidebar';
import '../Styles/Profile.css';

const UserProfile = () => {
    const [auth] = useAuth();
    const [name, setname] = useState("");
    const [username, setusername] = useState();

    useEffect(() => {
        if(auth?.user) {
            console.log(auth)
            const {name , username} = auth?.user;
            setname(name || "ExampleName");
            setusername(username || "DefaultUser");         
        }
    }, [auth])

  return (
    <>
    <Sidebar/>
    <div className="Profile_main_container" style={{marginLeft:"15vw"}}>
      <div className='dp'></div>
      <div className='Profile_info_count'>
          <div >  
              <div>Posts</div>
              <div>34</div>
          </div>
          <div>
              <div>Friends</div>
              <div>436</div>
          </div>
      </div>
    </div>
    </>
  )
}

export default UserProfile
