import Image from 'next/image'
import React from 'react'

const PodcastCard = ({
  imgUrl,
  title,
  description,
  podcastId
}:{
  imgUrl: string,
  title: string,
  description: string,
  podcastId: number,
}) => {
  return (
    <div className='text-light-1 cursor-pointer border-2 border-red-500'>
      <figure className='flex flex-col gap-2'>
        <Image 
          src={imgUrl}
          width={174}
          height={174}
          alt={title}
          className='aspect-square h-fit w-full rounded-xl 2xl:size-[200px]'
        />
        <div className="flex flex-col">
          <h1 className=" text-[16px] leading-normal truncate font-bold text-white">{title}</h1>
          <h2 className="text-[12px] truncate font-normal capitalize text-gray-500">{description}</h2>
        </div>
      </figure>
    </div>
  )
}

export default PodcastCard