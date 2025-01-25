"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/types/types";

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);

  const handleAddService = () => {};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Services</h2>
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddService} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" name="projectName" required />
              </div>
              <div>
                <Label htmlFor="serviceName">Service Name</Label>
                <Input id="serviceName" name="serviceName" required />
              </div>
              <div className="col-span-2">
                <Label htmlFor="serviceDesc">Service Description</Label>
                <Textarea id="serviceDesc" name="serviceDesc" required />
              </div>
            </div>
            <Button type="submit">Add Service</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Service List</h3>
        <div className="grid gap-4">
          {services.map((service, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <h4 className="font-bold">{service.serviceName}</h4>
                {/* <p>Project: {service.}</p> */}
                <p>{service.cost}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
