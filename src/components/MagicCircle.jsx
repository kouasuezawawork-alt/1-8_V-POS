import { motion } from "framer-motion";

const registers = [
  { id: 1, x: 50, y: 11 },
  { id: 2, x: 76, y: 24 },
  { id: 3, x: 89, y: 50 },
  { id: 4, x: 76, y: 76 },
  { id: 5, x: 50, y: 89 },
  { id: 6, x: 24, y: 76 },
  { id: 7, x: 11, y: 50 },
  { id: 8, x: 24, y: 24 },
];

export default function MagicCircle(props) {

  console.log("MagicCircle props =", props);

  const {
    selected,
    onSelect,
    onMasterTap,
  } = props;

  return (
    <div className="magic-circle-root">

      <motion.div
        className="magic-circle-container"
        animate={{ rotate: 360 }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >

        <motion.img
          src="/images/magic-circle.png"
          alt="Magic Circle"
          className="magic-circle-image"
        />

        {registers.map((item) => (
          <button
            key={item.id}
            className={`register-button ${
              selected === item.id ? "active" : ""
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            onClick={() => {
              console.log("CLICK", item.id, typeof onSelect, onSelect);

              if (typeof onSelect !== "function") {
                alert("onSelect が関数ではありません");
                return;
              }

              onSelect(item.id);
            }}
          >
            {item.id}
          </button>
        ))}

      </motion.div>

      <div
        className="magic-core"
        onClick={() => {
          if (typeof onMasterTap === "function") {
            onMasterTap();
          }
        }}
      />
    </div>
  );
}