import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Globe, Laptop, LogOut } from "lucide-react";
import React from "react";

const Security = () => {
  return (
    <div>
      {/* Security Tab */}
      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>
              Manage your account security settings and active sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch id="2fa" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Login Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive alerts when someone logs into your account
                  </p>
                </div>
                <Switch id="loginNotifications" defaultChecked />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Active Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Laptop className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">MacBook Pro - Chrome</p>
                      <p className="text-sm text-gray-500">
                        New York, USA (Current)
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">iPhone 13 - Safari</p>
                      <p className="text-sm text-gray-500">
                        Boston, USA (2 days ago)
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout from all devices
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default Security;
