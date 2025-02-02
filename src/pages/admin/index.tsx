import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  return (
    <div className="container  mx-auto min-h-screen w-full py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-2xl font-bold ">
          Welcome to the Admin Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {[
          "Total Users",
          "Initiated Projects",
          "Ongoing Projects",
          "Completed Projects",
        ].map((title, index) => (
          <Card key={index} className="card-dark">
            <CardHeader>
              <CardTitle className=" md:text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-end text-6xl font-semibold">
                {index === 0
                  ? "24"
                  : index === 1
                  ? "12"
                  : index === 2
                  ? "8"
                  : "156"}
              </p>
              {/* <p>
                {index === 0
                  ? "Users"
                  : index === 1
                  ? "Projects"
                  : index === 2
                  ? "Projects"
                  : "Projects"}
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
