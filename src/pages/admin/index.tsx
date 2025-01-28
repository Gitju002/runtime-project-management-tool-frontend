import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  return (
    <div className="space-y-4 border border-red-500 ">
      <h1 className="text-3xl font-bold ">Welcome to the Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">24</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Project Types</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">156</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
