import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { URL } from "../config";

export function InstagramImageFetcher() {
  const [postUrl, setPostUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const extractImageFromHtml = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    const ogImageMeta = doc.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      return ogImageMeta.getAttribute("content");
    }
    
    const ogImageSecureMeta = doc.querySelector('meta[property="og:image:secure_url"]');
    if (ogImageSecureMeta) {
      return ogImageSecureMeta.getAttribute("content");
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setImageUrl("");

    if (!postUrl.trim()) {
      setError("Please enter a valid Instagram post URL");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to use this feature");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${URL}post/instagram-proxy`, {
        params: { url: postUrl },
        headers: {
          Authorization: token
        }
      });

      if (response.data.code === "success" && response.data.html) {
        const extractedImageUrl = extractImageFromHtml(response.data.html);
        
        if (extractedImageUrl) {
          setImageUrl(extractedImageUrl);
          setSuccess(true);
        } else {
          setError("Could not extract image from the Instagram post");
        }
      } else {
        setError("Failed to fetch Instagram post data");
      }
    } catch (err) {
      console.error("Error fetching Instagram post:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while fetching the Instagram post");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `instagram-image-${Date.now()}.jpg`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h3>Instagram Image Fetcher</h3>
          <p className="text-muted mb-0">
            Enter an Instagram post URL to fetch and download the main image
          </p>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Instagram Post URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://www.instagram.com/p/ABC123/"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                disabled={loading}
              />
              <Form.Text className="text-muted">
                Enter the full URL of the Instagram post
              </Form.Text>
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="mb-3"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Fetching...
                </>
              ) : (
                "Fetch Image"
              )}
            </Button>
          </Form>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {success && imageUrl && (
            <div className="mt-4">
              <Alert variant="success">
                Image fetched successfully!
              </Alert>
              
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <span>Fetched Image</span>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={handleDownload}
                  >
                    Download
                  </Button>
                </Card.Header>
                <Card.Body className="text-center">
                  <img
                    src={imageUrl}
                    alt="Instagram post"
                    style={{ 
                      maxWidth: "100%", 
                      height: "auto",
                      maxHeight: "500px",
                      borderRadius: "8px"
                    }}
                    onError={() => setError("Failed to load the image")}
                  />
                </Card.Body>
              </Card>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}