import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary py-3' title='footer'>
        <div className="container mx-auto">
            <h2 className='text-center text-xs sm:text-base px-4 text-white capitalize'>&#169; CopyRight {new Date().getFullYear()}. All rights are &#174;reserved by igniteshark</h2>
        </div>
    </footer>
  )
}

export default Footer