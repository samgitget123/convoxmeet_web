import React from "react";
import { Route, Routes } from "react-router-dom";
import ViewCallers from "../ContentSection/ViewCallers";
import Addgroups from "../SidebarComponents/AddGroupFolder/Addgroups";
import Profile from "../SidebarComponents/Profilefolder/Profile";
import UserProfile from "../SidebarComponents/Profilefolder/UserProfile";
import QuickTalkContent from "../SidebarComponents/QuickTalkFolder/QuickTalkContent";
import QuickTalks from "../SidebarComponents/QuickTalkFolder/QuickTalks";
import Recharge from "../SidebarComponents/RechargesFolder/Recharge";
import SearchConference from "../SidebarComponents/SearchConferenceFolder/SearchConference";
import Sidebar from "../SidebarComponents/Sidebar";
const Routess = () => {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/addgroups" element={<Addgroups />}>
            <Route path="viewcallers/:id" element={<ViewCallers />} />
          </Route>
          <Route path="/quicktalks" element={<QuickTalks />}>
            <Route path="quickTalkContent/:id" element={<QuickTalkContent />} />
          </Route>
          <Route path="/searchconf" element={<SearchConference />}>
            <Route path="searchconf" element={<SearchConference />} />
          </Route>
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="profilesdisplay" element={<UserProfile />} />
          </Route>
          
        </Routes>
      </Sidebar>
    </>
  );
};

export default Routess;
