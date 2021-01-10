import * as React from 'react'

import { MyComponent } from 'components/MyComponent'

const App: React.FC = () => {
  const [numbers, setNumbers] = React.useState([1, 'balls', 3, 4, 5, 6])

  return (
    <div>
      {numbers.map((number: number | string) => {
        return <MyComponent key={number} myProp={number} />
      })}
    </div>
  )
}

export default App
