import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Mail } from "lucide-react";
import React from "react";

const Notification = () => {
  return (
    <div>
      {/* Notifications Tab */}
      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Control how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Updates</p>
                    <p className="text-sm text-gray-500">
                      Receive updates about system changes
                    </p>
                  </div>
                  <Switch id="systemUpdates" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New User Registrations</p>
                    <p className="text-sm text-gray-500">
                      Be notified when new users register
                    </p>
                  </div>
                  <Switch id="newUsers" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Content Reports</p>
                    <p className="text-sm text-gray-500">
                      Receive notifications about reported content
                    </p>
                  </div>
                  <Switch id="contentReports" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Newsletter</p>
                    <p className="text-sm text-gray-500">
                      Receive our monthly newsletter
                    </p>
                  </div>
                  <Switch id="newsletter" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Delivery</h3>

              <div className="space-y-2">
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <Input
                    id="notificationEmail"
                    type="email"
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  This is where all notifications will be sent
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Notification;
