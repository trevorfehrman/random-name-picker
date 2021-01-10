import * as React from 'react'

type MyComponentProps = {
  myProp: number | string
}

const MyComponent: React.FC<MyComponentProps> = ({ myProp }) => {
  return (
    <div>
      <span>{myProp}</span>
    </div>
  )
}

export { MyComponent }
