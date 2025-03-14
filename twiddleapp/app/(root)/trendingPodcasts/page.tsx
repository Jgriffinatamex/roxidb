import PodcastCard from '@/components/cards/PodcastCard'
import { podcastData } from '@/constants'
import React from 'react'

const TrendingPodcasts = () => {
//const Podcasts = ({params}: {params: string}) => {
  return (
    
    <div className='mt-9 flex flex-col gap-9 border-2 border-red-500'>
      <section className='flex flex-col gap-5'>
        <h1 className='text-2xl font-bold text-white'>Trending Pods</h1>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
            {podcastData.map(({
            id,
            title,
            description,
            imgURL

            }) => (
            <PodcastCard
                key={id}
                imgUrl={imgURL}
                title={title}
                description={description}
                podcastId={id}
            />
            ))}
        </div>
      </section>

    </div>
  )
}

export default TrendingPodcasts