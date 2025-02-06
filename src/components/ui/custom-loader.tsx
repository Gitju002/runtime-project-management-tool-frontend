import { motion } from "framer-motion";

interface CustomLoaderProps {
  width: string;
  height: string;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ width, height }) => {
  return (
    <motion.div
      animate={{ opacity: [1, 0.5, 1], rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <img
        src="/images/hourglass.png"
        alt="loading..."
        className={`${width} ${height}`}
      />
    </motion.div>
  );
};

export default CustomLoader;
