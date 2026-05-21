import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

function CameraScanner({ onClose, onScanSuccess }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [manualTable, setManualTable] = useState('');
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(true);
  const scannerRef = useRef(null);

  useEffect(() => {
    let html5Qrcode;
    let isMounted = true;

    // Delay sedikit untuk memastikan DOM element dengan id "qr-reader" sudah ter-render sempurna
    const startScanner = setTimeout(() => {
      if (!isMounted) return;

      try {
        html5Qrcode = new Html5Qrcode("qr-reader");
        scannerRef.current = html5Qrcode;

        const qrCodeSuccessCallback = (decodedText) => {
          console.log("QR Code Terdeteksi:", decodedText);
          onScanSuccess(decodedText);
        };

        const qrCodeErrorCallback = (errorMessage) => {
          // Abaikan error per frame untuk menghindari log spam
        };

        const config = {
          fps: 15,
          qrbox: (width, height) => {
            const size = Math.min(width, height) * 0.65;
            return { width: size, height: size };
          },
          aspectRatio: 1.0
        };

        html5Qrcode.start(
          { facingMode: "environment" }, // Kamera belakang
          config,
          qrCodeSuccessCallback,
          qrCodeErrorCallback
        )
        .then(() => {
          if (isMounted) {
            setLoading(false);
            setCameraPermissionGranted(true);
          }
        })
        .catch((err) => {
          console.error("Gagal menjalankan kamera:", err);
          if (isMounted) {
            setLoading(false);
            setCameraPermissionGranted(false);
            setErrorMsg("Gagal mengakses kamera. Pastikan izin kamera telah diberikan atau gunakan input manual di bawah.");
          }
        });
      } catch (err) {
        console.error("Inisialisasi Html5Qrcode gagal:", err);
        if (isMounted) {
          setLoading(false);
          setErrorMsg("Sistem pemindai gagal dimuat.");
        }
      }
    }, 450);

    return () => {
      isMounted = false;
      clearTimeout(startScanner);
      if (html5Qrcode) {
        try {
          if (html5Qrcode.isScanning) {
            html5Qrcode.stop()
              .then(() => {
                html5Qrcode.clear();
              })
              .catch((err) => console.error("Gagal menghentikan scanner:", err));
          }
        } catch (e) {
          console.error("Gagal membersihkan scanner:", e);
        }
      }
    };
  }, [onScanSuccess]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualTable.trim()) {
      onScanSuccess(manualTable.trim());
    }
  };

  return (
    <div className="scanner-overlay animate-fade-in">
      <div className="scanner-container">
        {/* Header */}
        <div className="scanner-header">
          <div className="scanner-title-wrapper">
            <span className="scanner-icon-pulse">📷</span>
            <h3>Pindai QR Code Meja</h3>
          </div>
          <button className="scanner-close-btn" onClick={onClose} aria-label="Tutup kamera">
            ✕
          </button>
        </div>

        {/* Viewport */}
        <div className="scanner-viewport-wrapper">
          {loading && (
            <div className="scanner-loader-container">
              <div className="spinner scanner-spinner"></div>
              <p>Mengaktifkan Kamera...</p>
            </div>
          )}

          {cameraPermissionGranted ? (
            <div id="qr-reader" className="qr-reader-el"></div>
          ) : (
            <div className="scanner-fallback-warning">
              <span className="warning-big-icon">🔒</span>
              <p>{errorMsg}</p>
            </div>
          )}

          {/* Target Overlay Frame */}
          {cameraPermissionGranted && !loading && (
            <div className="scanner-target-frame">
              <div className="scanner-corner corner-tl"></div>
              <div className="scanner-corner corner-tr"></div>
              <div className="scanner-corner corner-bl"></div>
              <div className="scanner-corner corner-br"></div>
              <div className="scanner-scan-line"></div>
            </div>
          )}
        </div>

        {/* Info & Manual Fallback */}
        <div className="scanner-footer">
          {cameraPermissionGranted && !loading && (
            <p className="scanner-hint">
              Arahkan kamera belakang ponsel Anda ke stiker QR Code yang tertera di meja restoran Anda.
            </p>
          )}

          <div className="scanner-manual-box">
            <div className="manual-divider">
              <span>ATAU MASUKKAN MANUAL</span>
            </div>
            <form onSubmit={handleManualSubmit} className="manual-form">
              <input
                type="number"
                placeholder="Nomor Meja (Contoh: 3)"
                value={manualTable}
                onChange={(e) => setManualTable(e.target.value)}
                className="manual-input"
                min="1"
                required
              />
              <button type="submit" className="manual-submit-btn">
                Konfirmasi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraScanner;
