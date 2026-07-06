// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import About from './Component/About/About';
import Home from './Component/Home/Home';
import Root from './Component/Root/Root';
import Admin from './Component/Admin/Admin';
import Error from './Component/Error/Error';
import AdminDashboard from './Component/Admin/AdminDashboard';
import AdminUsers from './Component/Admin/AdminUser';
import AdminWelcome from './Component/Admin/AdminWelcome';
import AdminOffice from './Component/Admin/AdminOffice';
import AdminLogin from './Component/Admin/AdminLogin';
import StudentLogin from './Component/About/StudentLogin';
import TeacherPanal from './Component/Teacher_panal/TeacherPanal';
import TeacherRestion from './Component/Teacher_panal/TeacherRestion';
import TeacherLogin from './Component/Teacher_panal/TeacherLogin';
import TeacherNotice from './Component/Teacher_panal/TeacherNotice';
import TeacherWelcome from './Component/Teacher_panal/TeacherWelcome';
import StudentWelcome from './Component/StudentNotice/StudentWelcome';
import AdminRestion from './Component/Admin/AdminRestion';
import Unauthorized from './Component/Error/Unauthorized';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Component/ProtectedRoute';
import StudentPost from './Component/Admin/StudentPost';
import TeacherPost from './Component/Admin/TeacherPost';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <StudentWelcome />,
      },
      {
        path: 'log-in',
        element: <StudentLogin />,
      },
      {
        path: 'registion',
        element: <About />,
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
      {
        element: <ProtectedRoute allowedRoles={['student']} />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
        ],
      },
    ],
  },

  
  {
    element: <ProtectedRoute allowedRoles={['teacher']} />,
    children: [
      {
        path: '/teacher',
        element: <TeacherPanal />,
        children: [
          { index: true, element: <TeacherWelcome /> },
          { path: 'sir-notices', element: <TeacherNotice /> },
          { path: 'sir-registion', element: <TeacherRestion /> },
        ],
      },
    ],
  },
  {
    path: '/teacher/sir-login',
    element: <TeacherLogin />,
  },

 
  {
    element: <ProtectedRoute allowedRoles={['admin']} />,
    children: [
      {
        path: '/admin',
        element: <Admin />,
        children: [
          { index: true, element: <AdminWelcome /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'students', element: <AdminUsers /> },
          { path: 'official', element: <AdminOffice /> },
          { path: 'student-post', element: <StudentPost /> },
          { path: 'teacher-post', element: <TeacherPost /> },
          
        ],
      },
    ],
  },
  {
    path: '/admin/log-in',
    element: <AdminLogin />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
