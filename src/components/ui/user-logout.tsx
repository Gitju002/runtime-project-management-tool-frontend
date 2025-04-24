import { useRouter } from "next/router";
import { Button } from "./button";
// import { useLogoutMutation } from "@/store/api/auth";
// import { useDispatch } from "react-redux";
// import { clearUserInfo } from "@/store/features/userInfo";
import { motion } from "framer-motion";

export default function UserLogout() {
  const router = useRouter();
  // const dispatch = useDispatch();
  // const [logout] = useLogoutMutation();
  const handleLogout = () => {
    // logout();
    // dispatch(clearUserInfo());
    router.push("/logout");
  };
  return (
    <div className="fixed bottom-4 left-4 flex items-center justify-center">
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          onClick={handleLogout}
          className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:text-lime-shade hover:shadow-teal-shade/35"
          variant={"outline"}
          size={"sm"}
        >
          Logout
        </Button>
      </motion.div>
    </div>
  );
}
