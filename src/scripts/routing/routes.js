import RestoList from '../views/pages/resto-list';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/favorite';

const routes = {
  '/': RestoList,
  '/home': RestoList,
  '/detail/:id': Detail,
  '/fav': Favorite,
};

export default routes;
