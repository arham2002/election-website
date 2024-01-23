import React from 'react'
import SearchInput from './SearchInput'
import { getDistricts, getSeats, getSeatsId } from '@/lib/getCandidate'

async function SearchBoxes() {

  const seats = await getSeatsId();
  const flattenedSeats = seats?.flat()

  const districts =  await getDistricts();
  const flatDistricts = districts?.flat().flatMap((str) => (str as string).split(/,\s+and\s+|,\s*|\s+and\s+/))
  
  return (
      <div className='lg:mt-56 text-gray-500'>
        <div className='flex justify-evenly flex-col lg:flex-row items-center'>
          <div className='flex flex-col items-center'>
            <h1 className='text-4xl mb-5'>Search By Town</h1><br />
            <SearchInput keyword='Town' suggestions={flatDistricts}/>
          </div>

          
          <div className='flex-col items-center hidden lg:flex'>
            <div className='border-l-2 py-11 border-gray-400 align-self-center'></div>
            <div className='text-4xl '>OR</div>
            <div className='border-l-2 py-14 border-gray-400 align-self-center'></div>
          </div>

          <div className='text-4xl lg:hidden py-14'>OR</div>

          <div className='flex flex-col items-center'>
            <h1 className='text-4xl mb-5'>Search By Seat No.</h1><br />
            <SearchInput keyword="Seat No" suggestions={flattenedSeats} />
          </div>
        </div>
      </div>
  )
}

export default SearchBoxes