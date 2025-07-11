import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { URL } from "../config";
import reactGa from "react-ga";

export function WriteComponent(props) {
  const [testData, setTestData] = useState([]);
  const [stateToken, setStateToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    setStateToken(authToken);
    reactGa.initialize("UA-92548969-2");
    reactGa.pageview("/write");
  }, []);

  const formik = useFormik({
    initialValues: {
      data: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      setTestData();
      axios
        .post(
          `${URL}user/write`,
          { text: values.data },
          { headers: { Authorization: stateToken } }
        )
        .then((res) => {
          if (res.data) {
            setLoading(false);
            setTestData(res.data.response);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    },
  });

  return (
    <div className="warehouse-main">
      <div className="text-form">
        <h2 className="text-2xl font-bold text-white mb-6">Rewrite</h2>
        <form className="data-form" onSubmit={formik.handleSubmit}>
          <div className="mb-6">
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
      <br />
      <div
        className="data-api"
        style={{ textAlign: "center", fontSize: "large" }}
      >
        {loading && (
          <div>
            <div className="spinner-glass w-8 h-8 mx-auto mb-4"></div>
            <p className="text-text-secondary">(This typically requires around 2 seconds.)</p>
          </div>
        )}
        <p className="text-white">{testData}</p>
      </div>
    </div>
  );
}
