import React, { useEffect, useState } from "react";
import Sidebar from "./Components/SidebarComponents/Sidebar";
import Addgroups from "./Components/SidebarComponents/AddGroupFolder/Addgroups";
import QuickTalks from "./Components/SidebarComponents/QuickTalkFolder/QuickTalks";
import SearchConference from "./Components/SidebarComponents/SearchConferenceFolder/SearchConference";
import Recharge from "./Components/SidebarComponents/RechargesFolder/Recharge";
import Profile from "./Components/SidebarComponents/Profilefolder/Profile";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewCallers from "./Components/ContentSection/ViewCallers";
import QuickTalkContent from "./Components/SidebarComponents/QuickTalkFolder/QuickTalkContent";
import UserProfile from "./Components/SidebarComponents/Profilefolder/UserProfile";
// import Home from "./Components/Home";
import WelcomeHeader from "./Components/Welcome/WelcomeHeader";
import Report from "./Components/Report";
import WelcomeContent from "./Components/Welcome/WelcomeContent";
import MyContext from "./Components/MyContext";
import WelcomePage from "./Components/Welcome/WelcomePage";
import Cookies from 'js-cookie';
import Calling from "./Components/ContentSection/Calling";
import QuickCalling from "./Components/ContentSection/QuickCalling";
import Summary from "./Components/Summary";
import { Servercontexts } from "./Components/Contexts/SeverContexts";
import NotFound from "./Components/NotFound";
//import Qrcsnnerweb from './Components/Qrcsnnerweb';
const App = () => {

  const [globalState, setGlobalState] = useState(() => {
    const storedGlobalState = localStorage.getItem('globalState');
    return storedGlobalState ? JSON.parse(storedGlobalState) : {};
  })

  useEffect(() => {
    localStorage.setItem('globalState', JSON.stringify(globalState));
  }, [globalState]);

  const authToken = Cookies.get('authToken');
  const updateToken = (mobile, userId) => {
    setGlobalState({ userMobile: mobile, userId: userId })
  }

  // useEffect(() => {
  //   updateToken();
  // }, []);

  return (
    <Servercontexts>
      <MyContext.Provider value={globalState}>
        <div>
          {authToken ? (
            <div>
              <WelcomeHeader />
              <Sidebar>
                <Routes className="d-flex" style={{ width: "100%" }}>
                  <Route path="/" element={<Addgroups />}>
                    <Route path="viewcallers/:id" element={<ViewCallers />} />
                    <Route path="calling/:id" element={<Calling />} />
                  </Route>
                  <Route path="/quicktalks" element={<QuickTalks />}>
                    <Route path="quickTalkContent/:id" element={<QuickTalkContent />} />
                    <Route path="quickcalling/:id" element={<QuickCalling />} />
                  </Route>
                  <Route path="/searchconf" element={<SearchConference />} />
                  <Route path="/recharge" element={<Recharge />} />
                  <Route path="/profile" element={<Profile />}>
                    <Route path="profilesdisplay" element={<UserProfile />} />
                  </Route>
                  <Route path="/gerreport" element={<Report />} />
                  <Route path="gerreport/getsummary/:id" element={<Summary />} />
                </Routes>
              </Sidebar>
            </div>
          ) : (
            <Routes>
              <Route exact path="/" element={<WelcomeContent updateToken={updateToken} />} />
              <Route path="/weblogin" element={<WelcomePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </div>
      </MyContext.Provider>
      </Servercontexts>
  );

};

export default App;
