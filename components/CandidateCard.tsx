import Image from 'next/image';
import React from 'react'

type Props = {
  imagePath: string;
  name: string;
  symbolName: string;
  party: string;
}

function CandidateCard({imagePath, name, symbolName, party}: Props) {

  function capitalizeEachWord(input: string): string {
    return input.replace(/\b\w/g, (match) => match.toUpperCase());
  }
  
  // Example
  const capitalizedName = capitalizeEachWord(name);

  return ( 
      <tr className='border-black border-2'>
        <td className='border-black border-2 text-center px-8 w-auto md'>{party}</td>
        {
        name == '' ? null : (
        <td className='border-black border-2 text-center px-4 w-auto '>{capitalizedName}</td>
          )
        }
        
        <td className='border-black border-2 align-middle px-4' colSpan={2}>
          <Image
            className='w-32 h-32 lg:min-w-[200px] object-contain object-center mx-auto p-4'  
            alt='image'
            src={`${imagePath}`} 
            width={450}
            height={450}
          />
          <h1 className='text-center capitalize'>{symbolName}</h1>
        </td>
        
      </tr>
  )
}

export default CandidateCard