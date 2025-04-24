import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDirectLoginQuery } from "@/store/api/auth";
import { setCredentials } from "@/store/features/userInfo";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();

  const dispatch = useDispatch();

  const { isLoading, error, isError, isFetching, isSuccess, data } =
    useDirectLoginQuery(
      { user_id: decodeURIComponent(params?.get("user_id") || "") },
      { skip: !params?.get("user_id"), refetchOnMountOrArgChange: true }
    );

  // if (params === null || params?.get("user_id") === null) {
  //   return;
  // }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black/40">
        <Loader2 className="w-10 h-10 animate-spin text-teal-shade" />
      </div>
    );
  }

  if (data?.success === true) {
    dispatch(
      setCredentials({
        name: data?.data?.user?.name,
        token: data?.data?.token,
        role: data?.data?.user?.role,
      })
    );
    if (data?.data?.user?.role === "Admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  }
  const text = "Welcome Back 👋🏼".split(" ");

  return (
    <div className="relative min-h-screen bg-black/40 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 "
      >
        <source src="/videos/login-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-md"
      >
        <Card className="w-full max-w-md dark:bg-dark-shade/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-50/20 hover:shadow-xl hover:dark:shadow-teal-shade/30 hover:shadow-lime-shade/20 transition-all duration-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center raleway-semibold">
              {text.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: i / 5,
                  }}
                  key={i}
                >
                  {el}{" "}
                </motion.span>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="dark:text-lime-shade text-teal-shade"
              >
                Runtimer!
              </motion.p>
            </CardTitle>
            <CardDescription className="text-center text-white">
              Login, and start managing your projects!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            {isLoading && (
              <>
                <Loader2 className="w-10 h-10 animate-spin text-teal-shade" />
                <p className="text-center text-white">Logging you in...</p>
              </>
            )}
            {isError && (
              <p className="text-center text-red-500">
                "An error occurred. Please try again."
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
