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
            <CardContent className="flex flex-col items-end gap-2">
              <p className="text-end text-6xl font-semibold dark:text-lime-shade ">
                {index === 0
                  ? "24"
                  : index === 1
                  ? "12"
                  : index === 2
                  ? "8"
                  : "156"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Placeholder for more features */}
      <div className="border-2 border-dashed border-teal-shade/50 min-h-96 w-full bg-slate-100 dark:bg-slate-800/50 rounded-md flex flex-col items-center justify-center mt-6 cursor-not-allowed">
        <span className="text-teal-shade">Placeholder for more content</span>
      </div>
    </div>
  );
}
