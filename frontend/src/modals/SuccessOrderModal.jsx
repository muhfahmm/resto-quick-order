import React from 'react';

export default function SuccessOrderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="success-modal-backdrop" onClick={onClose}>
      <style>{`
        .success-modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4000;
          padding: 1.5rem;
          box-sizing: border-box;
          animation: successFadeIn 0.3s ease-out;
        }

        .success-modal-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 32px;
          box-shadow: 0 35px 120px rgba(16, 185, 129, 0.25), 0 10px 40px rgba(15, 23, 42, 0.15);
          padding: 2.5rem 2rem;
          text-align: center;
          box-sizing: border-box;
          animation: successSlideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(16, 185, 129, 0.1);
          position: relative;
          overflow: hidden;
        }

        /* Ambient glowing background */
        .success-modal-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        @keyframes successFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes successSlideUp {
          from { transform: translateY(60px) scale(0.92); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }

        .success-icon-wrapper {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background-color: #ecfdf5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          position: relative;
          z-index: 1;
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.2);
          border: 2px solid #a7f3d0;
          animation: successPulse 2s infinite;
        }

        @keyframes successPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          70% {
            box-shadow: 0 0 0 18px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .checkmark-svg {
          width: 48px;
          height: 48px;
          color: #10b981;
        }

        .checkmark-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawCheckmark 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.2s;
        }

        @keyframes drawCheckmark {
          to { stroke-dashoffset: 0; }
        }

        .success-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 0.75rem;
          letter-spacing: -0.025em;
          position: relative;
          z-index: 1;
        }

        .success-description {
          font-size: 0.98rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 2rem;
          font-weight: 600;
          position: relative;
          z-index: 1;
        }

        .success-description span {
          color: #10b981;
          font-weight: 800;
          display: block;
          margin-top: 0.25rem;
          font-size: 1.02rem;
        }

        .success-close-btn {
          width: 100%;
          padding: 1rem 2rem;
          border-radius: 18px;
          border: none;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 0.98rem;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
          transition: all 0.25s ease;
          position: relative;
          z-index: 1;
          letter-spacing: 0.01em;
        }

        .success-close-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.45);
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .success-close-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <div className="success-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon-wrapper">
          <svg className="checkmark-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              className="checkmark-path"
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="3.5" 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        <h2 className="success-title">Pesanan Berhasil Dikirim!</h2>
        <p className="success-description">
          Terima kasih telah memesan.<br />
          <span>Silakan tunggu di meja.</span>
        </p>

        <button className="success-close-btn" onClick={onClose}>
          Selesai & Tutup
        </button>
      </div>
    </div>
  );
}
