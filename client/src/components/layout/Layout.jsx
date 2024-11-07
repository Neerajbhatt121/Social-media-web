import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import ChatList from '../../Pages/Chat/ChatList';
import Sidebar from '../sidebar';

//const navigate = useNavigate();

  //----------------//
  // handle Select conversation
  const handleSelectConversation = (conversationId, members) => {
    console.log("Selected conversation ID:", conversationId);
    console.log("Members:", members);
    // navigate('/ChatBox', {state: conversationId})
  };

const Layout = ({children, title, description, keyword, author}) => {

  return (
    <div style={{display:'flex'}}>
      <Helmet>
      <meta charSet="utf-8" />
        <meta name="description" content={description}/>        
        <meta name="keywords" content={keyword}/>        
        <meta name="author" content={author}/>
        <title>{title}</title>    
      </Helmet>
      <Sidebar/>
      <main style={({minHeight:'75.7vh' , marginLeft: "15vw", width:"100%" })}>
        <Toaster/>
          {children}
      </main>
      <ChatList selectConversation={handleSelectConversation} />
    </div>
  )
}

export default Layout
