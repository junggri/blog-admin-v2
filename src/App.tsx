import React, {useEffect, useState} from 'react';
import {Route, useLocation} from 'react-router-dom';
import Landing from "pages/landing";
import Login from "pages/login";
import {useQuery} from "@apollo/client";
import {VALIDATE} from "graphql/query";
import useRedirect from "hooks/useRedirect";
import Write from 'pages/write';
import styles from "./styles/app.module.scss";
import SideBar from "./component/SideBar/sideBar";
import Post from 'pages/post/post';
import classNames from "classnames";
import Message from "pages/message/message";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  const [showSideBar, setShowSideBar] = useState<boolean>(false)
  useQuery(VALIDATE);
  useRedirect();

  const path = useLocation();

  useEffect(() => {
    if (path.pathname === "/login" || path.pathname.split("/")[1] === "write") {
      setShowSideBar(false)
    } else {
      setShowSideBar(true)
    }
  }, [path])

  return (
    <div className={classNames(styles.app, {[styles.init]: !showSideBar})}>
      {showSideBar && <SideBar/>}
      <div className={styles.body}>
        <Route exact={true} path={'/login'} component={Login}/>
        <Route exact={true} path={"/post"} component={Post}/>
        <Route exact={true} path={"/message"} component={Message}/>
        <Route exact={true} path={"/dashboard"} component={Dashboard}/>
        {/*<Route exact path={"/content/:hashId"} component={Content}/>*/}
        <Route exact path={["/write", "/write/:hashId"]} component={Write}/>
      </div>
    </div>
  );
}

export default App;
