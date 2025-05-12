import React, { useRef, useEffect, useState, useContext } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import { VoterDataContext } from '../context/VoterContext';
import { useNavigate } from 'react-router-dom';
import { verifyFace } from '../js/MatchTwoFace';

const VerifyFaceScanner = ({setShowModal,setVerifying,setIsFaceMatched,electionId}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [message, setMessage] = useState('');
  const {voter,setVoter}=useContext(VoterDataContext);
  // console.log(voter);
  //console.log('electionId:',electionId);
  const navigate=useNavigate();
  // useEffect(()=>{
  //     if(!voter.descriptor){
  //       navigate('/voter/login');
  //     }
  // },[]);
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
        const verficationDescriptor = detection.descriptor;
        if(voter.descriptor===undefined || voter.descriptor===null){
          navigate('/voter/login');
        }
        const descriptor1 = new Float32Array(Object.values(verficationDescriptor));
        const descriptor2 = new Float32Array(Object.values(voter.descriptor));

        setShowModal(false);
        setVerifying(true);

        const isSame=await verifyFace(descriptor1,descriptor2);
        console.log('isSame:',isSame);
        localStorage.setItem('verified',isSame);
        if(isSame===false){
          setIsFaceMatched(false);
          return;
        }
        else{
          setMessage('Face recognized ✅');
          setVerifying(false);
          setShowModal(false);
          setTimeout(() => {
            setVerifying(false);
            setShowModal(false);
          }, 3000);
          navigate(`/voter/voting/${electionId.id}`);
        }
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
        Verify your Face
      </button>

      <p className="mt-4 text-gray-200">{message}</p>
    </div>
  );
};

export default VerifyFaceScanner;
