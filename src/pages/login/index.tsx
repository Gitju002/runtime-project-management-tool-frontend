import LoginForm from "@/pages/login/_components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-black/60 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
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
      <Card className="w-full max-w-md dark:bg-dark-shade/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-teal-shade hover:shadow-xl hover:dark:shadow-teal-shade/30 hover:shadow-lime-shade/20 transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center raleway-semibold">
            Welcome Back 👋🏼
            <p className="dark:text-lime-shade text-teal-shade">Runtimer!</p>
          </CardTitle>
          <CardDescription className="text-center">
            Login, and start managing your projects!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
