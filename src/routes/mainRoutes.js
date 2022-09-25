import Zones from 'containers/Zones';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import BackendCheck from 'containers/BackendCheck';
import SignOut from 'containers/SignOut';
import Users from 'containers/Users';
import Orders from 'containers/Orders';
import Rules from 'containers/Rules';

const mainRoutes = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    component: Orders,
    auth: true,
  },
  {
    exact: true,
    path: '/zones',
    name: 'Zone',
    component: Zones,
    auth: true,
  },
  {
    exact: true,
    path: '/orders',
    name: 'Order',
    component: Orders,
    auth: true,
  },
  {
    exact: true,
    path: '/rules',
    name: 'Rule',
    component: Rules,
    auth: true,
  },
  {
    path: '/backendCheck',
    name: 'BackendCheck',
    auth: true,
    component: BackendCheck,
  },
  {
    path: '/signin',
    name: 'Sign In',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    hide: true,
    component: SignUp,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    auth: true,
    permission: 'Admin',
  },
  {
    path: '/signout',
    name: 'Sign Out',
    component: SignOut,
    auth: true,
  },
  {
    path: '/zones/:location',
    name: 'zonesNavigate',
    auth: true,
    hide: true,
    component: Zones,
  },
];

export default mainRoutes;
