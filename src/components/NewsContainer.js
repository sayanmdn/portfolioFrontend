import React, { useEffect, useState } from "react";
import { Loginform } from "./forms/LoginForm";
import { delAuth, initAuth } from "../redux/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Form, Button, ListGroup } from "react-bootstrap";
import { URL } from "../config";

export function NewsComponent(props) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}user/news`)
      .then((response) => {
        const { data } = response;
        const newsPoints = data.split("- ").filter((string) => string);
        setNews(newsPoints);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div></div>
      <div>
        <h2>News</h2>
        <ListGroup
          style={{
            color: "black",
            background: "blue",
          }}
        >
          {news.map((item, index) => (
            <ListGroup.Item key={index}>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}
