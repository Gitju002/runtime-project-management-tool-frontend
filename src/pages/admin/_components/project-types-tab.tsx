"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/types";

export default function ProjectTypesTab() {
  const [projectTypes, setProjectTypes] = useState<Project[]>([]);

  const handleAddProjectType = () => {};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Project Types</h2>
      <Card>
        <CardHeader>
          <CardTitle>Add New Project Type</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProjectType} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="typeDesc">Type Description</Label>
                <Textarea id="typeDesc" name="typeDesc" required />
              </div>
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Input id="location" name="location" />
              </div>
            </div>
            <Button type="submit">Add Project Type</Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Project Type List</h3>
        <div className="grid gap-4">
          {projectTypes.map((type, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p>{type.projectDesc}</p>
                {type.location && <p>Location: {type.location}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
