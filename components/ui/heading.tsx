import React from 'react'

interface HeadingProps{
    title:string;
    descriprtion:string;
}
export const Heading:React.FC<HeadingProps> = ({
    title,descriprtion
}) => {
  return (
    <div className='pt-8'>
        <h2  className='text-3xl font-bold tracking-tight'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{descriprtion}</p>
    </div>
  )
}

