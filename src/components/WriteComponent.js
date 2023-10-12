import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { URL } from "../config";
import reactGa from "react-ga";

export function WriteComponent(props) {
  const [testData, setTestData] = useState([]);
  const [stateToken, setStateToken] = useState("");

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
      axios
        .post(
          `${URL}user/write`,
          { text: values.data },
          { headers: { Authorization: stateToken } }
        )
        .then((res) => {
          if (res.data) {
            setTestData(res.data.response);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  return (
    <div className="warehouse-main">
      <div className="text-form">
        <h2>Rewrite</h2>
        <Form className="data-form" onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control
              type="text"
              name="data"
              placeholder="Enter data"
              onChange={formik.handleChange}
              value={formik.values.data}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Data
          </Button>
        </Form>
      </div>
      <br />
      <div className="data-api" style={{ textAlign: "center" }}>
        <p>{testData}</p>
      </div>
    </div>
  );
}
