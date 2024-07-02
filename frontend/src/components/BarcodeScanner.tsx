import React, { useEffect, useRef, useState } from 'react';

const BarcodeDetectorComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [barcode, setBarcode] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }
    };

    const detectBarcode = async () => {
      if (videoRef.current) {
        const barcodeDetector = new (window as any).BarcodeDetector({ formats: ['qr_code', 'code_128', 'code_39', 'ean_13'] });
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const barcodes = await barcodeDetector.detect(canvas);
          if (barcodes.length > 0) {
            setBarcode(barcodes[0].rawValue);
          }
        }
      }
    };

    const intervalId = setInterval(detectBarcode, 1000);

    startCamera();

    return () => {
      clearInterval(intervalId);
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
        }
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
      {barcode && <div>Detected Barcode: {barcode}</div>}
    </div>
  );
};

export default BarcodeDetectorComponent;
