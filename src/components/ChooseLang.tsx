'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {useRouter} from 'next/navigation'
import {langList} from '@/lib/constants'

export default function ChooseLang({lang}: {lang: string}) {
  const router = useRouter()

  return (
    <Select
      onValueChange={(value) => router.push('/' + value)}
      defaultValue={lang}
    >
      <SelectTrigger
        className={`px-auto w-[5rem] xsm:h-6 xsm:w-[4rem] border-solid border border-[#ddd]`}
      >
        <SelectValue className='text-white' />
      </SelectTrigger>
      <SelectContent className='xsm:min-w-[4rem] min-w-[5rem]'>
        {langList.map((lang: {title: string; value: string}, key: number) => (
          <SelectItem
            key={key}
            value={lang.value}
            className='xsm:h-6 '
          >
            <div className='flex text-[0.875rem] text-[#aaa] font-semibold uppercase xsm:text-[0.6rem]'>
              {lang.title}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
