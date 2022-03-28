import Header from "component/header/header";
import Dashboard from "pages/dashboard/dashboard";
import Message from "pages/message/message";
import Post from "pages/post/post";
import React, {FC} from "react";
import {Route, RouteComponentProps} from "react-router-dom";
import styles from "./lading.module.scss"

interface Props {

}

interface MatchParams {
  name: string;
}


const Landing: FC<Props & RouteComponentProps<MatchParams>> = (props: RouteComponentProps<MatchParams>) => {

  return (
    <div className={styles.landing}>
      <Header/>
      <Route exact={true} path={"/post"} component={Post}/>
      <Route exact={true} path={"/message"} component={Message}/>
      <Route exact={true} path={"/dashboard"} component={Dashboard}/>
    </div>
  );
};

export default Landing;