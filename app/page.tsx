import SearchBoxes from '@/components/SearchBoxes'
// import { getSearchedCandidate } from '@/lib/getCandidate'
import Image from 'next/image'

export default async function Home() {

  return (
    <div>
      <div className='my-16 lg:my-0'>
        <SearchBoxes />
      </div>  
  
    </div>
  )
};
