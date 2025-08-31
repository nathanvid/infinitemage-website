'use client'

import { useState } from 'react'
import ChapterList from './ChapterList'

interface Chapter {
  slug: string
  title: string
  number: number
  date: string
  wordCount?: number
  published: boolean
}

interface ChapterListWithSortProps {
  chapters: Chapter[]
}

export default function ChapterListWithSort( {chapters} : ChapterListWithSortProps) {
  const [reverseOrder, setReverseOrder] = useState(false)
  
  const toggleOrder = () => {
    setReverseOrder(!reverseOrder)
  }
  
  return (
    <ChapterList 
      chapters={chapters}
      showSortButton={true}
      reverseOrder={reverseOrder}
      onToggleOrder={toggleOrder}
      showFooter={false} // Footer géré par la page parent
    />
  )
}