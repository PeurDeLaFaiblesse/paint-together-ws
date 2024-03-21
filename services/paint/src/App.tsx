import { Counter } from './components';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Counter />
      <Outlet />
    </div>
  );
};

export default App;
