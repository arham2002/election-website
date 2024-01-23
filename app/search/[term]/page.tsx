import CandidateChart from '@/components/CandidateChart';
import CommentSection from '@/components/CommentSection';
import { cleanString, getSearchedCandidate, getSearchedCandidateByDist } from '@/lib/getCandidate';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = {
  params: {
    term: string;
  }
}

async function SearchPage({ params: { term } }: { params: Props['params'] }) {
  let seatNo = ''
  let name = ''
  let imgPath = ''
  let symbol = ''
  let town = ''
  let map = ''
  let district = ''
  let electorates = ''
  if (!term) notFound();

  const termToUse = decodeURI(term) ;
  let candidate: string[][] | undefined; 

  // Determine the index based on the searched term
  if (isSeatNo(termToUse)) {
    candidate = await getSearchedCandidate(termToUse, 0);
    console.log(` ${termToUse}being used in seatnolist`)
  } else {
    candidate = await getSearchedCandidateByDist(termToUse, 5); 
    console.log(` ${termToUse}being used in distlist`)
  }


  if (candidate && candidate.length > 0) {
    [seatNo, name, imgPath, symbol, district, town, electorates,   map] = candidate[0];
    // Rest of your code
  } else {
    // Handle the case when candidate is undefined or an empty array
    const seatNo = ''
    const name = ''
    const imgPath = '' 
    const symbol = ''
    const town = ''
    let district = ''
    let electorates = ''

  }
  
  // API call to get searched candidates by taking keywords of town and seat no.

  return ( 
    <div>
    { seatNo === "" ? notFound() : (
      <div className='mx-auto lg:mx-20 mt-16'>
        <div>
          <div className='text-center lg:text-left mb-8'>
            <div className='mb-5'>
              <h1 className='text-4xl mt-8'>{district}</h1>
              <h1 className='text-2xL'>{town}</h1>
            </div>    
        </div>

      <div className="lg:flex lg:justify-between lg:items-center">
        <CandidateChart name={name} imgPath={imgPath} symbol={symbol} />
        <div className='mt-14 lg:mt-0'>
          <Image 
            className='w-[80%] mx-auto'
            src={map}
            alt="map"
            width={600}
            height={700}
          />
          <h2 className='text-2xl text-center'>Electorates: {electorates}</h2>
        </div>
      </div>
    </div>
    <div className="w-[80%] lg:w-[40%] mx-auto lg:mx-0 mt-28  text-center lg:mt-20 lg:text-left ">
      <h1 className='text-3xl mb-8 lg:text-3xl'>Comment Here</h1>
      <CommentSection />
    </div>
      </div>
    )
    }
    </div>
  )
}

export default SearchPage

// Function to check if the term is a seat number
function isSeatNo(term: string): boolean {
  // Add your logic to determine if the term is a seat number
  // For example, check if it's a number or follows a certain format
  return /^(na-|\d+)$/i.test(term);
}
