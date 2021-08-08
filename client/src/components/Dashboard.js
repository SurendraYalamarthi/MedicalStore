import React, { useEffect, useState } from "react";
import { ACTIVE_TAB_KEY, UPLOAD_TAB_KEY } from "../constants/tabKeys";
import firebase from "../constants/firebase";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Upload from "./Upload";
import Loader from "./Loader";
import ActiveTab from "./ActiveTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(ACTIVE_TAB_KEY);
  const [allMedicineList, setAllMedicineList] = useState([]);
  const [fetchingList, setFetchingList] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if ((!allMedicineList || allMedicineList.length === 0) && !fetchingList) {
      setFetchingList(true);
      setLoader(true);
      let ref = firebase.database().ref("allMedicine");
      ref.on("value", (snapshot) => {
        setLoader(false);
        const state = snapshot.val();
        setAllMedicineList(state);
      });
    }
  }, [allMedicineList, fetchingList]);

  return (
    <div className="d-flex">
      <div
        className="d-flex flex-column w-100"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Header />
        <div className="d-flex">
          <Sidebar defaultTab={activeTab} onChange={setActiveTab} />
          <div
            style={{
              height: "100vh",
              width: "calc(100% - 250px)",
              overflow: "scroll",
            }}
          >
            {activeTab === ACTIVE_TAB_KEY ? (
              <ActiveTab allMedicineList={allMedicineList || []} />
            ) : null}
            {activeTab === UPLOAD_TAB_KEY ? (
              <Upload allMedicineList={allMedicineList || []} />
            ) : null}
          </div>
        </div>
      </div>
      <Loader loader={loader} />
    </div>
  );
}
