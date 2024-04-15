import {QueryFunction} from "@tanstack/query-core";

export async function getAnimePopular() {
  const res: Response = await fetch('https://kitsu.io/api/edge/anime', {
    next: {
      tags: ['anime', 'popular']
    }
  })
  
  if (!res.ok) throw new Error('데이터 패칭 실패')
  
  const data = await res.json()
  console.log(data)
  return data
}