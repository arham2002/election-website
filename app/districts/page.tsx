import { getDistricts } from '@/lib/getCandidate'
import Link from 'next/link';
import React from 'react'

async function districtPage() {

  const districts: string[][] | undefined = await getDistricts();
  const kpkDistricts = districts?.slice(1,46).sort()
  const punDistricts = districts?.slice(47,190).sort()
  const sindhDistricts = districts?.slice(191,251).sort()
  const balochDistricts = districts?.slice(252, 267).sort()

  return (
    <div className='mx-auto w-[80%] lg:mx-20 mt-14'>
      <div>
        <h1 className='lg:text-5xl text-4xl mb-4 lg:mb-6'>KPK Districts</h1>
        <div className='flex flex-col text-sm lg:text-base'> 
          {
            kpkDistricts?.map((district) => (
              <Link 
                href={`/search/${district}`}
                className='inline-block mb-2 lg-mb- text-blue-700 hover:text-black underline'
              >{district}</Link>
            ))
          }
        </div>
      </div>
      
      <div className='mt-10'>
        <h1 className='lg:text-5xl text-4xl mb-4 lg:mb-6'>Punjab Districts</h1>
        <div className='flex flex-col text-sm lg:text-base'> 
          {
            punDistricts?.map((district) => (
              <Link 
                href={`/search/${district}`}
                className='inline-block mb-2 lg-mb-0 text-blue-700 hover:text-black underline'
              >{district}</Link>
            ))
          }
        </div>
      </div>

      <div className='mt-10'>
        <h1 className='lg:text-5xl text-4xl mb-4 lg:mb-6'>Sindh Districts</h1>
        <div className='flex flex-col text-sm lg:text-base'> 
          {
            sindhDistricts?.map((district) => (
              <Link 
                href={`/search/${district}`}
                className='inline-block mb-2 lg-mb-0 text-blue-700 hover:text-black underline'
              >{district}</Link>
            ))
          }
        </div>
      </div>

      <div className='mt-10'>
        <h1 className='lg:text-5xl text-4xl mb-4 lg:mb-6'>Balochistan Districts</h1>
        <div className='flex flex-col text-sm lg:text-base'> 
          {
            balochDistricts?.map((district) => (
              <Link 
                href={`/search/${district}`}
                className='inline-block mb-2 lg-mb-0 text-blue-700 hover:text-black underline'
              >{district}</Link>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default districtPage