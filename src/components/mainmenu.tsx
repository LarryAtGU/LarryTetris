import { Component, ChangeEvent } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

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
  return (
    <div className="container w-25">
      <ul className="list-group">
        {menus.map((itm) => (
          <MyMenuItem key={itm.title} title={itm.title} link={itm.link} cls={itm.cls}></MyMenuItem>
        ))}
      </ul>
    </div>
  );
};

export default class MainMenu extends Component {
  render() {
    return (
      <div>
        <h2>Welcome to play LTetris</h2>
        <Mymenu menus={myMenu}></Mymenu>
      </div>
    );
  }
}
