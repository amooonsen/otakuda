import { QueryFunction } from "@tanstack/query-core";

export async function getAnimeChapters() {
  const res: Response = await fetch('https://kitsu.io/api/edge/chapters/403830', {
    next: {
      tags: ['anime', 'chapters']
    }
  })

  if (!res.ok) throw new Error('데이터 패칭 실패')

  const data = await res.json()
  console.log(data)
  return data
}