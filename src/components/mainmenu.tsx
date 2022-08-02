import { Component, ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from './UI/Card/Card';
import './mainmenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './auth';
type Props = {
  menus: MenuItem[];
};

type MenuItem = {
  title: string;
  link: string;
  cls: string;
};

const myMenu = [
  { title: 'Main Menu', link: '/mainmenu', cls: 'nav-link' },
  { title: 'Top Scores', link: '/topscores', cls: 'nav-link' },
  { title: 'Configuration', link: '/config', cls: 'nav-link' },
  { title: 'Play', link: '/play', cls: 'nav-link text-dark' },
];

const MyMenuItem: React.FC<MenuItem> = ({ title, link, cls }) => {
  return (
    <li className="list-group-item">
      <Link to={link} className={cls}>
        {title}
      </Link>
    </li>
  );
};

const Mymenu: React.FC<Props> = ({ menus }) => {
  const ctx = useContext(AuthContext);
  return (
    <ul className="list-group">
      {menus.map((itm) => (
        <MyMenuItem key={itm.title} title={itm.title} link={itm.link} cls={itm.cls}></MyMenuItem>
      ))}
      <li className="list-group-item">
        <button onClick={ctx.onLogout} className="btn">
          Logout
        </button>
      </li>
    </ul>
  );
};

export default class MainMenu extends Component {
  render() {
    return (
      <Card className="mainmenu">
        <h2>Welcome to LTetris</h2>
        <Mymenu menus={myMenu}></Mymenu>
      </Card>
    );
  }
}
