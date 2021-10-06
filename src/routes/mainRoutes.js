import SignIn from 'containers/SignIn';
import Home from '../containers/Home';
const mainRoutes = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    icon: 'home',
    component: Home,
    auth: true,
    permission: 'admin',
  },
  {
    path: '/signin',
    name: 'Sign In',
    icon: 'login',
    hide_auth: true,
    component: SignIn,
  },
];

export default mainRoutes;
