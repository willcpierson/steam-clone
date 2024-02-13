import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
    </Switch>
  );
}

export default App;