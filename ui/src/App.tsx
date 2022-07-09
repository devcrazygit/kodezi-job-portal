import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './Root';
import { CssBaseline } from '@mui/material';
import SignIn from 'views/layouts/authentication/SignIn';
import SignUp from 'views/layouts/authentication/SignUp';
import DashboardLayout from 'views/layouts/DashboardLayout';
import UserHome from 'views/pages/user/UserHome';
import AdminHome from 'views/pages/admin/AdminHome';
import JobDetail from 'views/pages/user/JobDetail';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Root>
        <CssBaseline />
        <Routes>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="user" element={<UserHome />} />
            <Route path="user/job/:id" element={<JobDetail />} />
            <Route path="admin" element={<AdminHome />} />
          </Route>
        </Routes>
      </Root>
    </BrowserRouter>
  );
}

export default App;
