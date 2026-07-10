import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegisterHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const register = location.state?.register || 1;

  return (
    <div className="register-page">
      <div className="space-background" />

      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        1-8 V-POS
      </motion.h1>

      <motion.h2
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        レジ {register}
      </motion.h2>

      <motion.button
        className="main-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() =>
          navigate("/scan", {
            state: { register },
          })
        }
      >
        読取開始
      </motion.button>

      <div className="sub-buttons">
        <button
          className="sub-button"
          onClick={() => navigate("/")}
        >
          レジ変更
        </button>

        <button
          className="sub-button"
          onClick={() => alert("在庫確認は次の工程で実装します")}
        >
          在庫確認
        </button>
      </div>
    </div>
  );
}