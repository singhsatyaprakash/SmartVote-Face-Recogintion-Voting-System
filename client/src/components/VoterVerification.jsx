import React, { useRef, useEffect, useState, useContext } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { VoterDataContext } from '../context/VoterContext';
import { useNavigate } from 'react-router-dom';

const FaceScanner = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const {voter,setVoter}=useContext(VoterDataContext);
  const navigate=useNavigate();
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      console.log(faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL));
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded) {
      const interval = setInterval(async () => {
        await detectFace();
      }, 200); // Run detection every 200 ms
      return () => clearInterval(interval);
    }
  }, [modelsLoaded]);

  useEffect(()=>{
  
  },[voter]);

  const detectFace = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
    }
  };

const handleCapture = async () => {
    if (!modelsLoaded) {
      setMessage('Models loading, please wait...');
      return;
    }
    try {
      const video = webcamRef.current.video;
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
  
      if (detection) {
        const descriptor = detection.descriptor;
  
      // Create an updated voter object
      const updatedVoter = {
        ...voter,
        descriptor, // Add the descriptor key
      };

      // Update the voter state
      setVoter(updatedVoter);       
      let response =await axios.post(`${import.meta.env.VITE_BASE_URL}/voter/register-end`,updatedVoter);
      if(response.status===201){
        alert(response.data.message);
        navigate('/voter/login');
      }
      setMessage('Face Detected and Captured ✅');
      } else {
        setMessage('No face detected ❌');
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="flex flex-col items-center p-4 relative">
      <div className="relative w-[350px] h-[350px]">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          className="rounded-lg"
          videoConstraints={{
            width: 350,
            height: 350,
            facingMode: "user",
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
        />
      </div>

      <button
        onClick={handleCapture}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Register Face
      </button>

      <p className="mt-4 text-gray-200">{message}</p>
    </div>
  );
};

export default FaceScanner;
