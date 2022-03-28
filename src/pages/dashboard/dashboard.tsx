import React, {FC, memo, useCallback, useEffect, useMemo, useState} from "react";
import styles from "./dashboard.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppState, RootState} from "reducer";
import useGetVisitAction from "hooks/useGetVisitAction";
import useDashBoard from "../../hooks/useDashBoard";
import Selector from "component-system/Selector";
import DashBoardRegion from "../../component/dashBoardRegion";
import {Visit} from "../../core/schema";
import DashBoardSide from "../../component/dashBoardSide/dashBoardSide";
import {DashBoardActions} from "../../reducer/visit";

interface Props {
}

const Dashboard: FC<Props> = memo(() => {
  const dispatch = useDispatch();
  const visit = useSelector((state: AppState) => state.visit);

  const [dashBoard] = useDashBoard(visit.data);
  const [target, setTarget] = useState<string | null>(null);
  const [data, setData] = useState<Visit[] | null>(null);

  const handleChangeTarget = useCallback((target: string) => {
    setTarget(target);
  }, [target]);

  const handleTargetChild = (data: Visit[]) => {
    setData(data)
  }

  const renderTarget = useMemo(() => {
    if (!target) {
      return null;
    }

    return Object.entries(dashBoard[target]).map((e) => {
      return (
        <DashBoardRegion
          region={e[0]}
          key={e[0]}
          data={e[1]}
          handleTargetChild={handleTargetChild}
        />)
    })
  }, [target]);


  useEffect(() => {
    dispatch(DashBoardActions.GET_DASHBOARD("SIX_MONTH"))
  }, []);

  if (!visit.data) {
    return <div>방문자가 없습니다.</div>;
  }

  return (
    <div className={styles.dashboard}>
      <Selector
        data={Object.keys(dashBoard)}
        handleChangeTarget={handleChangeTarget}
        target={target}
      />
      <div className={styles.dashboardItem}>
        {renderTarget}
      </div>
      <DashBoardSide data={data}/>
    </div>

  );
});

export default Dashboard;
