'use client'

import { useState } from 'react'
import ChapterList from './ChapterList'

interface ChapterListWithSortProps {
  chapters: any[]
}

export default function ChapterListWithSort({ chapters }: ChapterListWithSortProps) {
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