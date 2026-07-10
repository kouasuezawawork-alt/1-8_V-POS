import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function BarcodeScanner({ onDetected }) {
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const lastCodeRef = useRef("");
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    async function start() {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();

        const backCamera =
          devices.find((d) =>
            d.label.toLowerCase().includes("back")
          ) || devices[0];

        await reader.decodeFromVideoDevice(
          backCamera?.deviceId,
          videoRef.current,
          (result) => {
            if (!result) return;

            const code = result.getText();
            const now = Date.now();

            // 同じバーコードを0.5秒以内に読まない
            if (
              code === lastCodeRef.current &&
              now - lastTimeRef.current < 500
            ) {
              return;
            }

            lastCodeRef.current = code;
            lastTimeRef.current = now;

            onDetected(code);
          }
        );
      } catch (err) {
        console.error(err);
      }
    }

    start();

    return () => {
      reader.reset();
    };
  }, [onDetected]);

  return (
    <div className="camera-wrapper">
      <video
        ref={videoRef}
        className="camera-video"
        muted
        playsInline
      />
    </div>
  );
}