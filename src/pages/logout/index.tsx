import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/store/api/auth";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/features/userInfo";

export default function LogoutPage() {
  const router = useRouter();

  const dispatch = useDispatch();
  const [logout, { isLoading: isLoggingOut, isSuccess: logoutComplete }] =
    useLogoutMutation();

  const handleLogout = () => {
    logout();
    dispatch(clearUserInfo());
    // Redirect after showing success message
    setTimeout(() => {
      router.push("/app-login");
    }, 2000);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20" />
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20" />

          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700">
            {!logoutComplete ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-raleway">
                    Ready to leave?
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    We'll keep your data safe until you return
                  </p>
                </div>

                <div className="space-y-4">
                  {isLoggingOut ? (
                    <div className="flex flex-col items-center justify-center py-6">
                      <Loader2 className="h-8 w-8 animate-spin mb-4" />
                      <p className="text-slate-600 dark:text-slate-300">
                        Signing you out securely...
                      </p>
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={handleLogout}
                        className="w-full py-6 transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:text-lime-shade hover:shadow-teal-shade/35"
                      >
                        Log Out
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="w-full py-6 transition-all duration-200 border border-teal-shade dark:border-lime-shade bg-transparent text-teal-shade dark:text-lime-shade  hover:shadow-lg hover:bg-transparent dark:hover:shadow-lime-shade/35 hover:shadow-teal-shade/35"
                      >
                        Return to Dashboard
                      </Button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="mx-auto mb-6"
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                </motion.div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-raleway">
                  Successfully Signed Out
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Thank you for using our application
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Redirecting you to login...
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Runtime Solutions Pvt. Ltd. All rights
            reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
