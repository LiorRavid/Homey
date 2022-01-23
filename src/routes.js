import { HomePage } from './pages/HomePage.jsx'
import { Explore } from './pages/Explore.jsx'
import { StayDetails } from './pages/StayDetails.jsx'

import { StayPreview } from './cmps/StayPreview.jsx'

const routes = [
  {
    path:'/stay/:stayId',
    component: StayDetails,
  },
  {
    path: '/explore',
    component: Explore,
  },
  {
    path: '/',
    component: HomePage,
  },
]

export default routes
