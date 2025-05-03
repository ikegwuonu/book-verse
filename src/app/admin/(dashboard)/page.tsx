"use client";

import { SVGProps, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  LineChart,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { MoreHorizontal, User } from "@/components/svg/icon";
import { useAdminProfileStore } from "@/zustand/adminProfile";

export default function AdminDashboardPage() {
  const { adminStore } = useAdminProfileStore();
  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div className="flex-1 p-6 lg:p-8 pt-16">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {greeting}, {adminStore.first_name}
            </h1>
            <p className="text-gray-500 mt-1">
              Here's what's happening with your library today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Reports</span>
            </Button>
            <Button size="sm" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">2,543</div>
              <Badge
                variant="outline"
                className="text-emerald-600 bg-emerald-50 border-emerald-200"
              >
                +12.5%
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Compared to last month
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/admin/users"
              className="text-sm text-navy-700 flex items-center"
            >
              View all users
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">8,294</div>
              <Badge
                variant="outline"
                className="text-emerald-600 bg-emerald-50 border-emerald-200"
              >
                +8.2%
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Compared to last month
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/admin/books"
              className="text-sm text-navy-700 flex items-center"
            >
              View all books
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Borrows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">1,832</div>
              <Badge
                variant="outline"
                className="text-amber-600 bg-amber-50 border-amber-200"
              >
                +3.1%
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Compared to last month
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/admin/borrows"
              className="text-sm text-navy-700 flex items-center"
            >
              View all borrows
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Page Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-bold">42.5k</div>
              <Badge
                variant="outline"
                className="text-emerald-600 bg-emerald-50 border-emerald-200"
              >
                +18.2%
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Compared to last month
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link
              href="/admin/analytics"
              className="text-sm text-navy-700 flex items-center"
            >
              View analytics
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Recent Content</CardTitle>
                  <CardDescription>
                    Latest books and textbooks added to the library
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-navy-700">
                  View all
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "The Art of Programming",
                      author: "Jane Smith",
                      type: "Book",
                      date: "Today, 10:30 AM",
                      status: "Published",
                    },
                    {
                      title: "Advanced Mathematics for Engineers",
                      author: "Robert Johnson",
                      type: "Textbook",
                      date: "Yesterday, 3:45 PM",
                      status: "Published",
                    },
                    {
                      title: "Modern Web Development",
                      author: "Sarah Williams",
                      type: "Book",
                      date: "Yesterday, 11:20 AM",
                      status: "Draft",
                    },
                    {
                      title: "Introduction to Artificial Intelligence",
                      author: "Michael Chen",
                      type: "Textbook",
                      date: "May 2, 2023",
                      status: "Published",
                    },
                    {
                      title: "The History of Modern Art",
                      author: "Emily Davis",
                      type: "Book",
                      date: "May 1, 2023",
                      status: "Published",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          {item.type === "Book" ? (
                            <BookOpen className="h-5 w-5 text-navy-700" />
                          ) : (
                            <FileText className="h-5 w-5 text-navy-700" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-gray-500">
                            {item.author} • {item.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm text-gray-500 hidden sm:block">
                          {item.date}
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "Published"
                              ? "text-emerald-600 bg-emerald-50 border-emerald-200"
                              : "text-amber-600 bg-amber-50 border-amber-200"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Server Uptime</div>
                      <div className="text-sm text-gray-500">99.9%</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: "99.9%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Database Load</div>
                      <div className="text-sm text-gray-500">42%</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Storage Usage</div>
                      <div className="text-sm text-gray-500">68%</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: "68%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">API Requests</div>
                      <div className="text-sm text-gray-500">1.2k/min</div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-navy-500 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                      Last System Update
                    </div>
                    <div className="text-sm text-gray-500">2 days ago</div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm font-medium">
                      Next Scheduled Backup
                    </div>
                    <div className="text-sm text-gray-500">Today, 11:00 PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l border-gray-200">
                {[
                  {
                    action: "Added new book",
                    user: "John Doe",
                    details: "Added 'The Art of Programming' to the library",
                    time: "10 minutes ago",
                    icon: <Plus className="h-4 w-4 text-emerald-500" />,
                  },
                  {
                    action: "Updated user role",
                    user: "Admin",
                    details: "Changed Sarah Williams' role to Content Manager",
                    time: "1 hour ago",
                    icon: <Users className="h-4 w-4 text-blue-500" />,
                  },
                  {
                    action: "System backup",
                    user: "System",
                    details: "Automatic backup completed successfully",
                    time: "3 hours ago",
                    icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
                  },
                  {
                    action: "New user registered",
                    user: "System",
                    details: "Michael Chen created an account",
                    time: "Yesterday, 4:23 PM",
                    icon: <User className="h-4 w-4 text-navy-500" />,
                  },
                  {
                    action: "Category updated",
                    user: "Jane Smith",
                    details: "Renamed category 'Sci-Fi' to 'Science Fiction'",
                    time: "Yesterday, 2:45 PM",
                    icon: <FileText className="h-4 w-4 text-amber-500" />,
                  },
                  {
                    action: "Book borrowed",
                    user: "System",
                    details: "User Emily Davis borrowed 'Introduction to AI'",
                    time: "Yesterday, 11:30 AM",
                    icon: <BookOpen className="h-4 w-4 text-purple-500" />,
                  },
                  {
                    action: "System alert",
                    user: "System",
                    details:
                      "High traffic detected, scaled resources automatically",
                    time: "2 days ago",
                    icon: <AlertCircle className="h-4 w-4 text-red-500" />,
                  },
                ].map((item, index) => (
                  <div key={index} className="mb-6 relative">
                    <div className="absolute -left-10 mt-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-50">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.action}</span>
                        <span className="text-sm text-gray-500">
                          by {item.user}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {item.details}
                      </p>
                      <span className="text-xs text-gray-400 mt-1 block">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tasks & Reminders</CardTitle>
                <CardDescription>
                  Your upcoming tasks and scheduled reminders
                </CardDescription>
              </div>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Review new book submissions",
                    priority: "High",
                    due: "Today",
                    completed: false,
                  },
                  {
                    title: "Update content guidelines",
                    priority: "Medium",
                    due: "Tomorrow",
                    completed: false,
                  },
                  {
                    title: "Approve user verification requests",
                    priority: "High",
                    due: "Today",
                    completed: true,
                  },
                  {
                    title: "Prepare monthly analytics report",
                    priority: "Medium",
                    due: "May 5, 2023",
                    completed: false,
                  },
                  {
                    title: "Review system security logs",
                    priority: "Low",
                    due: "May 7, 2023",
                    completed: false,
                  },
                ].map((task, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      task.completed
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                          task.completed
                            ? "border-gray-300 bg-gray-100"
                            : task.priority === "High"
                              ? "border-red-500"
                              : task.priority === "Medium"
                                ? "border-amber-500"
                                : "border-blue-500"
                        }`}
                      >
                        {task.completed && (
                          <CheckCircle2 className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <div
                          className={`font-medium ${
                            task.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge
                            variant="outline"
                            className={
                              task.priority === "High"
                                ? "text-red-600 bg-red-50 border-red-200"
                                : task.priority === "Medium"
                                  ? "text-amber-600 bg-amber-50 border-amber-200"
                                  : "text-blue-600 bg-blue-50 border-blue-200"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.due}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-500">Showing 5 of 12 tasks</div>
              <Button variant="outline" size="sm">
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin actions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center py-4 px-2"
            >
              <Users className="h-5 w-5 mb-2" />
              <span className="text-sm">Add User</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center py-4 px-2"
            >
              <BookOpen className="h-5 w-5 mb-2" />
              <span className="text-sm">Add Book</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center py-4 px-2"
            >
              <FileText className="h-5 w-5 mb-2" />
              <span className="text-sm">Add Textbook</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center py-4 px-2"
            >
              <LineChart className="h-5 w-5 mb-2" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center py-4 px-2"
            >
              <Settings className="h-5 w-5 mb-2" />
              <span className="text-sm">Settings</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center py-4 px-2"
            >
              <Bell className="h-5 w-5 mb-2" />
              <span className="text-sm">Notifications</span>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled events and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "System Maintenance",
                  date: "May 5, 2023",
                  time: "2:00 AM - 4:00 AM",
                  description:
                    "Scheduled database optimization and system updates.",
                },
                {
                  title: "New Feature Release",
                  date: "May 10, 2023",
                  time: "10:00 AM",
                  description:
                    "Launching advanced search and recommendation features.",
                },
                {
                  title: "Admin Team Meeting",
                  date: "May 12, 2023",
                  time: "1:00 PM - 2:30 PM",
                  description: "Quarterly review and planning session.",
                },
              ].map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-navy-50 border border-navy-200 flex items-center justify-center text-navy-700">
                      <Calendar className="h-5 w-5" />
                    </div>
                    {index < 2 && (
                      <div className="flex-1 w-px bg-gray-200 my-2"></div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="text-sm text-gray-500 mt-1">
                      {event.date} • {event.time}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
