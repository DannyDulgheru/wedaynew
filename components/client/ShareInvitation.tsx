"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Share2,
  QrCode,
  Facebook,
  MessageCircle,
  Send,
  Mail,
  Download,
  X,
} from "lucide-react";
import QRCodeLib from "qrcode";

interface ShareInvitationProps {
  invitationUrl: string;
  eventTitle: string;
  eventId: string;
}

export default function ShareInvitation({
  invitationUrl,
  eventTitle,
  eventId,
}: ShareInvitationProps) {
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [shareStats, setShareStats] = useState({
    copy: 0,
    facebook: 0,
    whatsapp: 0,
    telegram: 0,
    email: 0,
    qr: 0,
  });

  const fullUrl = `https://weday.md${invitationUrl}`;

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setShareStats((prev) => ({ ...prev, copy: prev.copy + 1 }));
      
      // TODO: Track analytics
      console.log("Link copied:", eventId);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Generate QR Code
  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCodeLib.toDataURL(fullUrl, {
        width: 400,
        margin: 2,
        color: {
          dark: "#9333ea", // Purple
          light: "#ffffff",
        },
      });
      setQrCodeDataUrl(qrDataUrl);
      setShowQRModal(true);
      setShareStats((prev) => ({ ...prev, qr: prev.qr + 1 }));
      
      // TODO: Track analytics
      console.log("QR Code generated:", eventId);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    }
  };

  // Download QR Code as PNG
  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeDataUrl;
    link.download = `${eventTitle.replace(/\s+/g, "-")}-QRCode.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share on Facebook
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
    setShareStats((prev) => ({ ...prev, facebook: prev.facebook + 1 }));
    
    // TODO: Track analytics
    console.log("Shared on Facebook:", eventId);
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const message = `${eventTitle} - ${fullUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShareStats((prev) => ({ ...prev, whatsapp: prev.whatsapp + 1 }));
    
    // TODO: Track analytics
    console.log("Shared on WhatsApp:", eventId);
  };

  // Share on Telegram
  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
      fullUrl
    )}&text=${encodeURIComponent(eventTitle)}`;
    window.open(telegramUrl, "_blank");
    setShareStats((prev) => ({ ...prev, telegram: prev.telegram + 1 }));
    
    // TODO: Track analytics
    console.log("Shared on Telegram:", eventId);
  };

  // Share via Email
  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Invitație: ${eventTitle}`);
    const body = encodeURIComponent(
      `Bună!\n\nEști invitat la ${eventTitle}.\n\nVezi detaliile și confirmă prezența aici:\n${fullUrl}\n\nNe vedem acolo!`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShareStats((prev) => ({ ...prev, email: prev.email + 1 }));
    
    // TODO: Track analytics
    console.log("Shared via Email:", eventId);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Distribuie Invitația
            </h2>
            <p className="text-sm text-gray-600">
              Trimite linkul către invitați
            </p>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Link Invitație
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={fullUrl}
              readOnly
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-600 focus:outline-none"
            />
            <button
              onClick={handleCopyLink}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:from-rose-600 hover:to-purple-700"
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Copiat!</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  <span>Copiază</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Media Sharing */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Distribuie pe Social Media
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Facebook */}
            <button
              onClick={shareOnFacebook}
              className="flex flex-col items-center space-y-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all group"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Facebook className="h-6 w-6 text-white fill-current" />
              </div>
              <span className="text-sm font-semibold text-blue-900">
                Facebook
              </span>
              {shareStats.facebook > 0 && (
                <span className="text-xs text-blue-600">
                  {shareStats.facebook}x
                </span>
              )}
            </button>

            {/* WhatsApp */}
            <button
              onClick={shareOnWhatsApp}
              className="flex flex-col items-center space-y-2 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all group"
            >
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-900">
                WhatsApp
              </span>
              {shareStats.whatsapp > 0 && (
                <span className="text-xs text-green-600">
                  {shareStats.whatsapp}x
                </span>
              )}
            </button>

            {/* Telegram */}
            <button
              onClick={shareOnTelegram}
              className="flex flex-col items-center space-y-2 p-4 bg-sky-50 hover:bg-sky-100 rounded-xl transition-all group"
            >
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Send className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-sky-900">
                Telegram
              </span>
              {shareStats.telegram > 0 && (
                <span className="text-xs text-sky-600">
                  {shareStats.telegram}x
                </span>
              )}
            </button>

            {/* Email */}
            <button
              onClick={shareViaEmail}
              className="flex flex-col items-center space-y-2 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group"
            >
              <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                Email
              </span>
              {shareStats.email > 0 && (
                <span className="text-xs text-gray-600">
                  {shareStats.email}x
                </span>
              )}
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Cod QR
          </label>
          <button
            onClick={generateQRCode}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all"
          >
            <QrCode className="h-5 w-5" />
            <span>Generează Cod QR</span>
          </button>
          {shareStats.qr > 0 && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Generat de {shareStats.qr}x
            </p>
          )}
        </div>

        {/* Stats Summary */}
        {Object.values(shareStats).some((val) => val > 0) && (
          <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              📊 Statistici Distribuire
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {Object.values(shareStats).reduce((a, b) => a + b, 0)}
                </p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-rose-600">
                  {shareStats.copy}
                </p>
                <p className="text-xs text-gray-600">Link copiat</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {shareStats.facebook +
                    shareStats.whatsapp +
                    shareStats.telegram}
                </p>
                <p className="text-xs text-gray-600">Social Media</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Cod QR Invitație
              </h3>
              <p className="text-gray-600 mb-6">{eventTitle}</p>

              {/* QR Code Image */}
              <div className="bg-white p-6 rounded-xl border-4 border-purple-200 inline-block mb-6">
                <img
                  src={qrCodeDataUrl}
                  alt="QR Code"
                  className="w-64 h-64"
                />
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Scanează codul QR pentru a accesa invitația direct pe telefon
              </p>

              {/* Download Button */}
              <button
                onClick={downloadQRCode}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all"
              >
                <Download className="h-5 w-5" />
                <span>Descarcă PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
