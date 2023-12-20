import React, { useContext, useState } from "react";

import { NavLink , Link } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from '../../Images/dtellogo.png'
import { TbReportAnalytics } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import { MyServerContext } from "../Contexts/SeverContexts";
const Profileimg = {
  // margin:"12px",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  color: "grey",
};

const Sidebar = ({ children }) => {
  const { baseurl } = useContext(MyServerContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleLogout = (id) => {
    if (id == 7) {
      Cookies.remove('authToken'); //removing the cookies from the users machine, i.e. token //
      localStorage.removeItem('globalState');
      window.location.href = '/ConvoxMeetConference';  // /public for bundle logout actual /weblogin  hello
    }
  }

  const menuItem = [
    {
      id: 1,
      path: "/",
      name: "AddGroups",
      icon: <i className="fa fa-plus" aria-hidden="true"></i>,
    },
    {
      id: 2,
      path: "/quicktalks",
      name: "QuickTalks",
      icon: <i className="fas fa-phone-alt"></i>,
    },
    // { id:3,
    //   path: "/searchconf",
    //   name: "Search",
    //   icon: <i className="fa fa-search"></i>,
    // },
    {
      id: 4,
      path: "/recharge",
      name: "Recharge",
      icon: <i className="fa fa-credit-card" aria-hidden="true"></i>,
    },
    {
      id: 5,
      path: "/profile",
      name: "Profile",
      icon: <i className="fa fa-user" aria-hidden="true"></i>,
    },
    {
      id: 6,
      path: "/gerreport",
      name: "Report",
      icon: <TbReportAnalytics />
    },
    {
      id: 7,
      path: "/weblogin",
      name: "logout",
      icon: <i className="fa fa-sign-out" aria-hidden="true"></i>
    }

  ];
  // style={{ width: isOpen ? "200px" : "82px", }}
  return (
    <>
      <div className="d-flex">
        <div
          className="sidebar" >
          <div className="profileBox" >
            {/*<CgProfile style={Profileimg} onClick={toggle} />*/}
            <Link  to={`/`}><img style={{height:"50px", width:'50px', borderRadius:'50%'}} src={logo}/></Link>
          </div>

          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={item.name}
              className="link "
              activeClassName="active"
              onClick={() => handleLogout(item.id)}
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>

        {children}
      </div>
    </>
  );
};



export default Sidebar;


