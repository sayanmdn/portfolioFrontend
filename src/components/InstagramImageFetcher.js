import { useState } from "react";
import axios from "axios";
import { URL } from "../config";

export function InstagramImageFetcher() {
  const [postUrl, setPostUrl] = useState("");
  const [images, setImages] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setImages([]);
    setImageCount(0);

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

      if (response.data.images && response.data.images.length > 0) {
        setImages(response.data.images);
        setImageCount(response.data.count || response.data.images.length);
        setSuccess(true);
      } else {
        setError("No images found in the Instagram post");
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

  const handleDownload = (imageUrl, index = 0) => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `instagram-image-${index + 1}-${Date.now()}.jpg`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadAll = () => {
    images.forEach((imageUrl, index) => {
      setTimeout(() => handleDownload(imageUrl, index), index * 500);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <div className="glass-card">
        <div className="p-6 border-b border-white/20">
          <h3 className="text-xl font-bold text-white mb-2">Instagram Image Fetcher</h3>
          <p className="text-text-secondary mb-0">
            Enter an Instagram post URL to fetch and download the main image
          </p>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Instagram Post URL
              </label>
              <input
                type="url"
                className="input-glass w-full"
                placeholder="https://www.instagram.com/p/ABC123/"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                disabled={loading}
              />
              <p className="text-text-secondary text-sm mt-2">
                Enter the full URL of the Instagram post
              </p>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary-glass mb-6"
            >
              {loading ? (
                <>
                  <div className="spinner-glass w-4 h-4 mr-2 inline-block"></div>
                  Fetching...
                </>
              ) : (
                "Fetch Image"
              )}
            </button>
          </form>

          {error && (
            <div className="alert-glass alert-danger mt-6">
              {error}
            </div>
          )}

          {success && images.length > 0 && (
            <div className="mt-8">
              <div className="alert-glass alert-success">
                {imageCount === 1 ? '1 image' : `${imageCount} images`} fetched successfully!
              </div>
              
              {images.length > 1 && (
                <div className="mb-6 text-center">
                  <button 
                    className="btn-primary-glass"
                    onClick={handleDownloadAll}
                  >
                    Download All Images
                  </button>
                </div>
              )}
              
              {images.map((imageUrl, index) => (
                <div key={index} className={`glass-card ${index > 0 ? "mt-6" : ""}`}>
                  <div className="p-4 border-b border-white/20 flex justify-between items-center">
                    <span className="text-white">Image {index + 1}{images.length > 1 ? ` of ${imageCount}` : ''}</span>
                    <button 
                      className="btn-secondary-glass text-sm px-3 py-1"
                      onClick={() => handleDownload(imageUrl, index)}
                    >
                      Download
                    </button>
                  </div>
                  <div className="p-6 text-center">
                    <img
                      src={imageUrl}
                      alt={`Post ${index + 1}`}
                      className="max-w-full h-auto max-h-96 rounded-lg"
                      onError={() => setError(`Failed to load image ${index + 1}`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}