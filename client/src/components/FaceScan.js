// src/components/FaceScan.js
import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceScan = ({ onScanSuccess }) => {
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    loadModels();
  }, []);

  const handleFaceScan = (e) => {
    const image = document.getElementById('inputImage');
    faceapi.detectSingleFace(image)
      .withFaceLandmarks()
      .withFaceDescriptor()
      .then(result => {
        if (result) {
          onScanSuccess(result);
        } else {
          alert('Face not detected');
        }
      });
  };

  return (
    <div>
      <img id="inputImage" src="path/to/face.jpg" alt="Face to scan" />
      <button onClick={handleFaceScan} className="bg-green-500 text-white px-6 py-3 rounded-lg">Scan Face</button>
    </div>
  );
};

export default FaceScan;
