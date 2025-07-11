import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import { URL } from "../config";
import reactGa from "react-ga";

export function Warehouse(props) {
  const [testData, setTestData] = useState([]);
  const [stateToken, setStateToken] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setStateToken(authToken);
    reactGa.initialize("UA-92548969-2");
    reactGa.pageview("/warehouse");
  }, []);

  const fetchData = () => {
    const authToken = localStorage.getItem("token");
    setStateToken(authToken);
    axios({
      method: "post",
      url: URL + "user/getdata",
      data: { token: authToken },
    })
      .then((res) => {
        setTestData(res.data);
      })
      .catch((err) => {
        console.log("error returned at fetchData: " + err);
      });
  };
  const auth = useSelector((state) => state.auth);
  if (auth.isLoggedIn) {
    var userId = auth.user.id;
  }

  var [saveSuccess, setSaveSuccess] = useState(false);
  const [savedData, setSavedData] = useState(testData);
  const formik = useFormik({
    initialValues: {
      data: "",
    },
    onSubmit: (values) => {
      axios
        .post(`${URL}user/save`, { token: stateToken, data: values })
        .then((res) => {
          //USERCREATED SUCCESS
          if (res.data.code === "dataSaved") {
            setSaveSuccess(true);
            alert("Data saved successfully");
          }

          console.log(res);
          // console.log(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      // alert(JSON.stringify(values));
    },
  });

  return (
    <div className="warehouse-main">
      <div className="dataForm">
        <h2 className="text-2xl font-bold text-white mb-6">HTTP Logger</h2>
        <form className="data-form" onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Anything you want to save
            </label>
            <input
              type="text"
              name="data"
              className="input-glass w-full"
              placeholder="Enter data"
              onChange={formik.handleChange}
              value={formik.values.data}
            />
          </div>
          <button type="submit" className="btn-primary-glass">
            Submit Data
          </button>
        </form>
      </div>
      <div className="data-api">
        <p className="text-text-secondary mb-4">
          You can also log your data from your application. Api details are
          given below
        </p>
        <code className="text-primary-light block mb-2">Link: {URL}user/save</code>
        <br />
        <code className="text-primary-light block">
          Request method: POST, Object:
          {`{"token":"` +
            stateToken +
            `"
                "data": {
                  <YOUR JSON DATA>
                }
            }`}
        </code>
      </div>
      <div className="dataFormUpper" style={{ marginTop: "150px" }}>
        <h2 className="text-2xl font-bold text-white mb-6">Your saved data</h2>
        <button className="btn-primary-glass mb-8" onClick={() => fetchData()}>
          Fetch Data
        </button>
        <ol>
          {testData
            .slice(0)
            .reverse()
            .map((data) => {
              return <li>{JSON.stringify(data.data.data)}</li>;
            })}
        </ol>
      </div>
    </div>
  );
}
