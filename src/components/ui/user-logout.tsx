import { useRouter } from "next/router";
import { Button } from "./button";
import { useLogoutMutation } from "@/store/api/auth";

export default function UserLogout() {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  return (
    <div className="fixed bottom-4 left-4 flex items-center justify-center">
      <Button
        onClick={handleLogout}
        className="transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:text-lime-shade hover:shadow-teal-shade/35"
        variant={"outline"}
        size={"sm"}
      >
        Logout
      </Button>
    </div>
  );
}
