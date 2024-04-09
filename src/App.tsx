import React from 'react';
import { getWeather } from './async/getWeather';
import { useAppDispatch } from './hooks/hooks';
import { Layout } from './components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export type Coords = {
  latitude: number;
  longitude: number;
};

type Location = {
  coords: Coords;
  timestamp: number;
};

const Home = React.lazy(() => import('./pages/Home'));
const Saved = React.lazy(() => import('./pages/Saved'));

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = React.useState<boolean>(false);
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response: Location) => {
        dispatch(getWeather(response.coords));
      },
      (error: any) => {
        const coords = {
          latitude: 28.7041,
          longitude: 77.1025,
        };
        dispatch(getWeather(coords));
      }
    );
  }, []);
  React.useEffect(() => {
    document.body.style.backgroundColor = theme ? '#101827' : '#DDDDDD';
  }, [theme]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route
            index
            element={
              <React.Suspense>
                <Home theme={theme} />
              </React.Suspense>
            }
          />
          <Route
            path="/saved"
            element={
              <React.Suspense>
                <Saved theme={theme} />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
