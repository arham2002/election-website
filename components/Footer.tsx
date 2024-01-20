import Link from 'next/link';
import React from 'react'

function Footer() {
  return (
    <div className='bg-green-500 mt-56'>
      <div className='flex space-x-12 justify-center py-16 text-xl'>
        <Link href="#" >About Us</Link>
        <Link href="/seats">Seats</Link>
        <Link href="/districts">Districts</Link>
        <Link href="#">Contact Us</Link>
      </div>
    </div>
  )
}

export default Footer;