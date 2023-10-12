import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Spinner } from "react-bootstrap";
import { URL } from "../config";

export function NewsComponent(props) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${URL}user/news`);
        const { data } = response;
        const newsPoints = data.split("- ").filter((string) => string);
        setNews(newsPoints);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMaintenance(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div></div>
      <div>
        <h2>News</h2>
        {maintenance && <h3>Please retry after a short wait.</h3>}
        {loading ? (
          <div>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            <p>(Content curation typically requires around 7 seconds.)</p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
