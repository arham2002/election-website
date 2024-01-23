import React from 'react'
import CandidateCard from './CandidateCard';

type Props = {
  name: string;
  imgPath: string;
  symbol: string;

}

function CandidateChart({name, imgPath, symbol, }: Props) {


  return (
    <>
      {name !== "" && (
        <table className='border-collapse border-black border-2 mx-auto w-[80%] lg:mx-0 lg:w-[40%]'>
        <CandidateCard name={name} imagePath={imgPath} symbolName={symbol} party="PTI" />
        <CandidateCard name="" imagePath="https://cdn-icons-png.flaticon.com/128/7735/7735168.png" symbolName='Arrow' party="PPPP"/>
        <CandidateCard name="" imagePath="https://cdn-icons-png.flaticon.com/128/13681/13681769.png" symbolName='Sher' party='PML-N'/>

      </table>
      )} 
    </>
  )
}

export default CandidateChart;