import { AppProviders, Canvas } from './components';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <AppProviders>
      <Canvas />
      <Outlet />
    </AppProviders>
  );
};

export default App;
