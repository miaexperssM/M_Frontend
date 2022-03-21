import Zones from 'containers/Zones';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import NotFound from 'containers/NotFound';
import SignOut from 'containers/SignOut';
import Users from 'containers/Users';
import Orders from 'containers/Orders';

const mainRoutes = [
  {
    exact: true,
    path: '/',
    name: 'Home',
    icon: 'home',
    component: Zones,
    auth: true,
  },
  {
    exact: true,
    path: '/orders',
    name: 'Order',
    icon: 'order',
    component: Orders,
    auth: true,
  },
  {
    path: '/signin',
    name: 'Sign In',
    icon: 'login',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'Sign Up',
    hide: true,
    component: SignUp,
  },
  {
    path: '/signout',
    name: 'Sign Out',
    component: SignOut,
    auth: true,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    auth: true,
    permission: 'Admin',
  },
  {
    path: '',
    name: 'Others',
    icon: 'close-circle',
    auth: true,
    hide: true,
    component: Zones,
  },
  ,
  {
    path: '/zones/:location',
    name: 'zonesNavigate',
    icon: 'close-circle',
    auth: true,
    hide: true,
    component: Zones,
  },
];

export default mainRoutes;
