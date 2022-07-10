import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './Root';
import { CssBaseline } from '@mui/material';
import SignIn from 'views/layouts/authentication/SignIn';
import SignUp from 'views/layouts/authentication/SignUp';
import DashboardLayout from 'views/layouts/DashboardLayout';
import navs, { Guard } from 'navs';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Root>
        <CssBaseline />
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<DashboardLayout />}>
            {navs.filter(nav => nav.guard !== Guard.PUBLIC).map((nav, index) => (
              <Route path={nav.to} element={<nav.component></nav.component>} key={index} />
            ))}
          </Route>
        </Routes>
      </Root>
    </BrowserRouter>
  );
}

export default App;
