import React from 'react'

const Footer = () => {
  // console.log(length);
  const year = new Date()
  return (
    <footer className='footer'> 
     
      <p className='year'>
        {year.getFullYear()} @ Nataliya Lisjo
      </p>
    </footer>
  )
}

export default Footer