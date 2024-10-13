import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({children, title, description, keyword, author}) => {

  return (
    <div>
      <Helmet>
      <meta charSet="utf-8" />
        <meta name="description" content={description}/>        
        <meta name="keywords" content={keyword}/>        
        <meta name="author" content={author}/>
        <title>{title}</title>    
      </Helmet>
      
      <main style={({minHeight:'75.7vh'})}>
        <Toaster/>
          {children}
      </main>
    </div>
  )
}

export default Layout
