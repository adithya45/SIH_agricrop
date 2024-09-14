import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import NavigationBar from "../NavigationBar/NavigationBar"; // Assuming this is used somewhere else in the app
import IMAGES from "../../assets"; // Assuming this is used somewhere else in the app

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const webcamRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setUseWebcam(false); // Switch to preview mode
  };

  const sendImageToBackend = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post("YOUR_BACKEND_API_URL", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data); // Adjust based on your backend response format
    } catch (error) {
      console.error("Error sending image to backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    header: {
      color: "#333",
      padding: "20px",
      textAlign: "center",
      borderRadius: "10px 10px 0 0",
      marginBottom: "20px",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 80px)", // Adjust height to account for header
      padding: "20px",
      borderRadius: "15px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      margin: "0 auto",
      maxWidth: "800px",
    },
    button: {
      margin: "10px",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      backgroundColor: "#007bff",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s, box-shadow 0.3s",
      fontSize: "16px",
    },
    buttonDisabled: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
    fileInputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "20px 0",
    },
    fileInputLabel: {
      marginBottom: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
    },
    fileInput: {
      display: "none", // Hide the default file input
    },
    fileInputCustom: {
      display: "inline-block",
      padding: "10px 20px",
      borderRadius: "5px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "background-color 0.3s, box-shadow 0.3s",
    },
    fileInputCustomHover: {
      backgroundColor: "#0056b3",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    previewImage: {
      marginTop: "20px",
      maxWidth: "100%",
      maxHeight: "400px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    resultContainer: {
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "left",
      width: "100%",
      maxWidth: "600px",
    },
    resultText: {
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    },
    webcamContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    switchButton: {
      marginTop: "10px",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      backgroundColor: "#28a745",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.3s, box-shadow 0.3s",
      fontSize: "16px",
    },
  };

  return (
    <>
      <div style={styles.header}>
        <h2>Upload or Capture Image to Detect Disease</h2>
      </div>
      <div style={styles.container}>
        {useWebcam ? (
          <div style={styles.webcamContainer}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{ facingMode: "environment" }}
            />
            <button style={styles.button} onClick={handleCapture}>
              Capture
            </button>
            <button style={styles.switchButton} onClick={() => setUseWebcam(false)}>
              Switch to File Upload
            </button>
          </div>
        ) : (
          <div style={styles.fileInputContainer}>
            <label htmlFor="file-upload" style={styles.fileInputLabel}>
              Choose an image:
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={styles.fileInput}
            />
            <label htmlFor="file-upload" style={styles.fileInputCustom}>
              Select File
            </label>
            <button style={styles.switchButton} onClick={() => setUseWebcam(true)}>
              Use Webcam
            </button>
          </div>
        )}
        <button
          style={{ ...styles.button, ...(loading && styles.buttonDisabled) }}
          onClick={sendImageToBackend}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Image"}
        </button>
        {image && <img src={image} alt="Preview" style={styles.previewImage} />}
        {result && (
          <div style={styles.resultContainer}>
            <h3>Result:</h3>
            <pre style={styles.resultText}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
