import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Main = () => {
  const [scannedCode, setScannedCode] = useState('');

  useEffect(() => {
    const qrCodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );
    qrCodeScanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(decodedText, decodedResult) {
      setScannedCode(decodedText);
    }

    function onScanFailure(error) {
      console.warn(`QR code scan failure: ${error}`);
    }

    return () => qrCodeScanner.clear();
  }, []);

  const displayBarcodeData = (data) => {
    if (isURL(data)) {
      return <a href={data}>Open Link</a>;
    } else {
      // For simplicity, assuming other data as product code
      return <p>Product Code: {data}</p>;
    }
  };

  // Utility function to check if the data is a URL
  const isURL = (data) => {
    try {
      new URL(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="main-container">
      <div id="qr-reader" className="qr-reader"></div>
      <div className="result-display">{scannedCode}</div>
    </div>
  );
};

export default Main;
