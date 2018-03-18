import Home from 'containers/home'
import About from 'containers/about'
import Articles from 'containers/articles'
import Studies from 'containers/studies'

export default [
  {
    path: '/about',
    component: About,
    name: 'About'
  },
  {
    path: '/studies',
    component: Studies,
    name: 'Studies'
  },
  {
    path: '/articles',
    component: Articles,
    name: 'Articles'
  },
  {
    path: '/',
    component: Home,
    name: 'Home'
  }
]
