import React, {FC, useEffect} from 'react';
import useGetTokenAction from "hooks/useGetTokenActions";
import {useDispatch, useSelector} from "react-redux";
import {AppState, RootState} from "reducer";
import {useFormik} from "formik";
import {ILogin, TokenAction} from "reducer/token";
import styles from "./login.module.scss";
import InputBox from "component-system/InputBox/InputBox";
import Typography from "component-system/Typography/Typography";
import Button from "component-system/Button/button";
import {useHistory} from "react-router-dom";

interface Props {

}


const Login: FC<Props> = () => {
  const token = useSelector((state: AppState) => state.token);
  const history = useHistory();
  const dispatch = useDispatch()

  const {values, handleChange, handleSubmit, setFieldValue} = useFormik<ILogin>({
    initialValues: {
      user: "",
      pwd: ""
    },
    onSubmit: () => {
      dispatch(TokenAction.GET_TOKEN(values.user, values.pwd))
    }
  });


  useEffect(() => {
    if (token.data) {
      history.push("/");
    }
  }, [token.data]);


  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <div className={styles.inputBox}>
          <InputBox name="user" type="text" placeholder="아이디" handleChange={handleChange} value={values.user}/>
        </div>
        <div className={styles.inputBox}>
          <InputBox name="pwd" type="password" placeholder="비밀번호" handleChange={handleChange} value={values.pwd}/>
        </div>
        {token.error &&
        <Typography component="h1" type="error" className={styles.error}>
           로그인 할 수 없습니다.
        </Typography>
        }
        <Button className={styles.button}>로그인</Button>
      </form>
    </div>
  );
};

export default Login;
