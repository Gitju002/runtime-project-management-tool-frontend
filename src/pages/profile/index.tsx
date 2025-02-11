import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProfileInfo from "@/pages/profile/_components/profile-info";
import { Mail, Phone, MapPin, Briefcase, Calendar, Award } from "lucide-react";
import { useGetUserQuery } from "@/store/api/user";
import { useLogoutMutation } from "@/store/api/auth";
import { useDispatch } from "react-redux";
import { log } from "console";
import Image from "next/image";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    isFetching: userFetching,
  } = useGetUserQuery();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  console.log("userData", userData?.data.profilepic);

  return (
    <div className="container mx-auto w-full py-6 space-y-4">
      {/* Hero Section */}
      <div className="relative transition-all duration-200 border border-[#12c6e2]  bg-transparent text-white rounded-3xl profile-bg overflow-hidden">
        <div className="absolute  bottom-2 right-4">
          <Image
            sizes="100vw"
            height={0}
            width={0}
            src="/images/logo-bg.svg"
            alt=""
            className="object-cover w-32 lg:w-60 object-center mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-24">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {loading ? (
              <Skeleton className="w-48 h-48 rounded-full" />
            ) : (
              <Avatar className="w-48 h-48 border-4 shadow-xl bg-white border-white/50">
                <AvatarImage
                  className=" object-contain"
                  src={userData?.data?.profilepic ?? "/images/default-user.png"}
                  alt={userData?.data?.name}
                />
                <AvatarFallback>{userData?.data?.name}</AvatarFallback>
              </Avatar>
            )}
            <div className="text-center sm:text-left">
              <h1 className="text-4xl text-lime-shade drop-shadow-md sm:text-5xl font-bold mb-2">
                {loading ? (
                  <Skeleton className="h-12 w-64" />
                ) : (
                  userData?.data?.name
                )}
              </h1>
              <div className="text-xl font-semibold sm:text-2xl opacity-90 mb-4">
                {loading ? (
                  <Skeleton className="h-8 w-48" />
                ) : (
                  <p>{userData?.data?.designation || "N/A"}</p>
                )}
              </div>
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => alert("Currently not available :(")}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileInfo
              icon={Phone}
              label="Mobile"
              value={userData?.data?.mobile ?? "N/A"}
              loading={loading}
              bgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
            <ProfileInfo
              icon={Mail}
              label="Email"
              value={userData?.data.email || "N/A"}
              loading={loading}
              bgColor="bg-red-100"
              iconColor="text-red-600"
            />
            <ProfileInfo
              icon={MapPin}
              label="Office"
              value={userData?.data?.officeName || "N/A"}
              loading={loading}
              bgColor="bg-yellow-100"
              iconColor="text-yellow-600"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileInfo
              icon={Briefcase}
              label="Department"
              value={userData?.data?.departmentName || "N/A"}
              loading={loading}
              bgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <ProfileInfo
              icon={Briefcase}
              label="Position"
              value={userData?.data?.designation || "N/A"}
              loading={loading}
              bgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
            <ProfileInfo
              icon={Calendar}
              label="Join Date"
              value={userData?.data?.date_of_joining || "N/A"}
              loading={loading}
              bgColor="bg-teal-100"
              iconColor="text-teal-600"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Skills & Expertise
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-3/5" />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    skill: "React",
                    bgColor: "bg-blue-100",
                    textColor: "text-blue-600",
                  },
                  {
                    skill: "TypeScript",
                    bgColor: "bg-indigo-100",
                    textColor: "text-indigo-600",
                  },
                  {
                    skill: "Node.js",
                    bgColor: "bg-green-100",
                    textColor: "text-green-600",
                  },
                  {
                    skill: "GraphQL",
                    bgColor: "bg-pink-100",
                    textColor: "text-pink-600",
                  },
                  {
                    skill: "AWS",
                    bgColor: "bg-yellow-100",
                    textColor: "text-yellow-600",
                  },
                  {
                    skill: "Docker",
                    bgColor: "bg-slate-100",
                    textColor: "text-slate-600",
                  },
                  {
                    skill: "Kubernetes",
                    bgColor: "bg-orange-100",
                    textColor: "text-orange-600",
                  },
                ].map(({ skill, bgColor, textColor }) => (
                  <Badge
                    key={skill}
                    className={`${bgColor} ${textColor} hover:bg-transparent dark:hover:bg-white `}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
          ) : (
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold">
                    Completed Advanced React Course
                  </p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">
                    Started new project: E-commerce Platform
                  </p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">
                    Received Employee of the Month Award
                  </p>
                  <p className="text-sm text-gray-500">2 weeks ago</p>
                </div>
              </li>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
