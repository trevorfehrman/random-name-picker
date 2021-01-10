import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { MyComponent } from 'components/MyComponent'

const AuthenticatedApp: React.FC = () => {
  return (
    <Switch>
      <Route path="/">
        <MyComponent myProp="hi" />
      </Route>
    </Switch>
  )
}

export { AuthenticatedApp }
