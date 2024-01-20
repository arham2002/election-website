import { getSeats } from '@/lib/getCandidate'
import Link from 'next/link'
import React from 'react'

async function seatsPage() {

  const seats: string[][] | undefined = await getSeats()

  const kpkSeats = seats?.slice(1,47)?.flat();
  const punSeats = seats?.slice(47,190)?.flat();
  const sindhSeats = seats?.slice(191,251)?.flat();
  const balochSeats = seats?.slice(252, 267)?.flat();

  function getFirstWord(input: string): string {
    const words = input.trim().split(/\s+/);
    return words[0];
  }

  const sdsd = getFirstWord("sdfsdf dgdgtf")
  return (
    <div className='mx-auto mt-14 lg:ml-24 w-[80%]'>
      <div className='mb-10'>
        <h1 className='lg:text-5xl text-4xl mb-5 lg:mb-6'>KPK Seats</h1>
        <div className='flex flex-wrap justify-between '>
        {
            kpkSeats?.map((seat) => (
              
              <Link href={`/search/${getFirstWord(seat)}`} className='text-sm lg:text-base w-[45%] lg:w-[33%] inline-block mb-2 lg:mb-0 text-blue-700 hover:text-black underline'>{seat}</Link>
            ))
        }
        </div>
      </div>
      <div className='mb-10'>
        <h1 className='lg:text-5xl text-4xl mb-5 lg:mb-6'>Punjab Seats</h1>
        <div className='flex flex-wrap justify-between'>
        {
            punSeats?.map((seat) => (
              <Link href={`/search/${getFirstWord(seat)}`} className='text-sm lg:text-base w-[45%] lg:w-[33%] inline-block mb-2 lg:mb-0 text-blue-700 hover:text-black underline'>{seat}</Link>
            ))
          }
        </div>
      </div>
      <div className='mb-10'>
        <h1 className='lg:text-5xl text-4xl mb-5 lg:mb-6'>Sindh Seats</h1>
        <div className='flex flex-wrap justify-between'>
        {
            sindhSeats?.map((seat) => (
              <Link href={`/search/${getFirstWord(seat)}`} className='text-sm lg:text-base w-[45%] lg:w-[33%] inline-block mb-2 lg:mb-0 text-blue-700 hover:text-black underline'>{seat}</Link>
            ))
          }
        </div>
      </div>
      <div className='mb-10'>
        <h1 className='lg:text-5xl text-4xl mb-5 lg:mb-6'>Balochistan Seats</h1>
        <div className='flex flex-wrap justify-between'>
        {
            balochSeats?.map((seat) => (
              <Link href={`/search/${getFirstWord(seat)}`} className='text-sm lg:text-base w-[45%] lg:w-[33%] inline-block mb-2 lg:mb-0 text-blue-700 hover:text-black underline'>{seat}</Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default seatsPage