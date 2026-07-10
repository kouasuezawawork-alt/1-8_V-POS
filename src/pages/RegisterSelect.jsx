import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MagicCircle from "../components/MagicCircle";

export default function RegisterSelect() {
  const navigate = useNavigate();

  const [selectedRegister, setSelectedRegister] = useState(null);
  const [flash, setFlash] = useState(false);

  const tapCount = useRef(0);
  const tapTimer = useRef(null);

  const handleRegisterSelect = (registerId) => {
    setSelectedRegister(registerId);

    setFlash(true);

    setTimeout(() => {
      setFlash(false);
      navigate("/register-home", {
        state: { register: registerId },
      });
    }, 500);
  };

  const handleCenterTap = () => {
    tapCount.current++;

    clearTimeout(tapTimer.current);

    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 800);

    if (tapCount.current >= 3) {
      tapCount.current = 0;
      navigate("/admin");
    }
  };

  return (
    <div className="register-page">
      <div className="space-background" />

      {flash && (
        <motion.div
          className="screen-flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />
      )}

      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        1-8 V-POS
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        レジを選択してください
      </motion.p>

      <MagicCircle
        selected={selectedRegister}
        onSelect={handleRegisterSelect}
        onMasterTap={handleCenterTap}
      />

      <motion.div
        className="bottom-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        中央を3回タップすると管理画面へ
      </motion.div>
    </div>
  );
}