import { HomePage } from './pages/HomePage.jsx'
import { StayApp } from './pages/StayApp.jsx'
import { StayDetails } from './pages/StayDetails.jsx'

const routes = [
  {
    path:'/stay/:stayId',
    component: StayDetails,
  },
  {
    path: '/explore',
    component: StayApp,
  },
  {
    path: '/',
    component: HomePage,
  },
]

export default routes
