"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  BookOpen,
  Calendar,
  Download,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  booksByCategoryData,
  borrowsByAgeData,
  contentGrowthData,
  engagementTrendsData,
  featureUsageData,
  popularBooksData,
  userActivityData,
  userGrowthData,
} from "@/lib/constant";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("last-30-days");
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate summary metrics
  const totalUsers = 5000;
  const newUsersThisMonth = 500;
  const userGrowthRate = 10; // 10%

  const totalBooks = 4730;
  const newBooksThisMonth = 120;
  const bookGrowthRate = 2.6; // 2.6%

  const totalBorrows = 12450;
  const borrowsThisMonth = 870;
  const borrowGrowthRate = 5.2; // 5.2%

  const totalViews = 156000;
  const viewsThisMonth = 18500;
  const viewGrowthRate = 12.5; // 12.5%

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <BarChart3 className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Monitor your digital library performance and user engagement
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-90-days">Last 90 days</SelectItem>
              <SelectItem value="last-12-months">Last 12 months</SelectItem>
              <SelectItem value="all-time">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalUsers.toLocaleString()}
                </div>
                <div className="flex items-center pt-1">
                  <span
                    className={`text-xs font-medium flex items-center ${
                      userGrowthRate > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {userGrowthRate > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(userGrowthRate)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1.5">
                    vs. last month
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Total Books Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Books
                </CardTitle>
                <BookOpen className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalBooks.toLocaleString()}
                </div>
                <div className="flex items-center pt-1">
                  <span
                    className={`text-xs font-medium flex items-center ${
                      bookGrowthRate > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {bookGrowthRate > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(bookGrowthRate)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1.5">
                    vs. last month
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Total Borrows Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Borrows
                </CardTitle>
                <Calendar className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalBorrows.toLocaleString()}
                </div>
                <div className="flex items-center pt-1">
                  <span
                    className={`text-xs font-medium flex items-center ${
                      borrowGrowthRate > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {borrowGrowthRate > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(borrowGrowthRate)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1.5">
                    vs. last month
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Total Views Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Views
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {totalViews.toLocaleString()}
                </div>
                <div className="flex items-center pt-1">
                  <span
                    className={`text-xs font-medium flex items-center ${
                      viewGrowthRate > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {viewGrowthRate > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(viewGrowthRate)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1.5">
                    vs. last month
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  Monthly user registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={userGrowthData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="userGrowthGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8884d8"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<ChartTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="users"
                          stroke="#8884d8"
                          fillOpacity={1}
                          fill="url(#userGrowthGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Books by Category Chart */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Books by Category</CardTitle>
                <CardDescription>
                  Distribution of books across categories
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={booksByCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {booksByCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Books Table */}
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Books</CardTitle>
              <CardDescription>
                Books with the highest engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left font-medium text-gray-500 py-3 pl-4">
                        Title
                      </th>
                      <th className="text-left font-medium text-gray-500 py-3">
                        Author
                      </th>
                      <th className="text-right font-medium text-gray-500 py-3">
                        Views
                      </th>
                      <th className="text-right font-medium text-gray-500 py-3 pr-4">
                        Borrows
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularBooksData.map((book, index) => (
                      <tr
                        key={index}
                        className={`${
                          index !== popularBooksData.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <td className="py-3 pl-4 font-medium">{book.title}</td>
                        <td className="py-3 text-gray-600">{book.author}</td>
                        <td className="py-3 text-right">
                          {book.views.toLocaleString()}
                        </td>
                        <td className="py-3 pr-4 text-right">
                          {book.borrows.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly User Activity</CardTitle>
              <CardDescription>
                User engagement patterns throughout the week
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend />
                      <Bar dataKey="logins" fill="#8884d8" name="Logins" />
                      <Bar dataKey="searches" fill="#82ca9d" name="Searches" />
                      <Bar dataKey="borrows" fill="#ffc658" name="Borrows" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  Breakdown of users by age group
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={borrowsByAgeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="borrows" fill="#8884d8" name="Borrows" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>
                  Monthly active users over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<ChartTooltip />} />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Activity Heatmap</CardTitle>
              <CardDescription>
                When users are most active during the week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="grid grid-cols-8 h-full">
                  <div className="flex flex-col justify-between text-xs text-gray-500 pr-2">
                    <div>12 AM</div>
                    <div>4 AM</div>
                    <div>8 AM</div>
                    <div>12 PM</div>
                    <div>4 PM</div>
                    <div>8 PM</div>
                    <div>11 PM</div>
                  </div>
                  <div className="col-span-7 grid grid-cols-7 grid-rows-24 gap-1">
                    {/* This would be a real heatmap in production */}
                    {Array.from({ length: 7 }).map((_, dayIndex) => (
                      <div key={dayIndex} className="flex flex-col gap-1">
                        {Array.from({ length: 24 }).map((_, hourIndex) => {
                          // Generate random activity level for demo
                          const activityLevel = Math.floor(Math.random() * 5);
                          let bgColor;
                          switch (activityLevel) {
                            case 0:
                              bgColor = "bg-gray-100";
                              break;
                            case 1:
                              bgColor = "bg-blue-100";
                              break;
                            case 2:
                              bgColor = "bg-blue-200";
                              break;
                            case 3:
                              bgColor = "bg-blue-300";
                              break;
                            case 4:
                              bgColor = "bg-blue-400";
                              break;
                          }
                          return (
                            <div
                              key={hourIndex}
                              className={`${bgColor} rounded-sm w-full h-full`}
                              title={`Activity level: ${activityLevel}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 pl-8">
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                  <div>Sun</div>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">Low</div>
                    <div className="flex">
                      <div className="w-4 h-4 bg-gray-100"></div>
                      <div className="w-4 h-4 bg-blue-100"></div>
                      <div className="w-4 h-4 bg-blue-200"></div>
                      <div className="w-4 h-4 bg-blue-300"></div>
                      <div className="w-4 h-4 bg-blue-400"></div>
                    </div>
                    <div className="text-xs text-gray-500">High</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Content Growth</CardTitle>
              <CardDescription>
                Books and textbooks added over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={contentGrowthData}>
                      <defs>
                        <linearGradient
                          id="booksGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="textbooksGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="books"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#booksGradient)"
                        name="Books"
                      />
                      <Area
                        type="monotone"
                        dataKey="textbooks"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#textbooksGradient)"
                        name="Textbooks"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Distribution</CardTitle>
                <CardDescription>Books by format and type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={booksByCategoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {booksByCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Most borrowed book categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={booksByCategoryData.slice(0, 5)}
                        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="value" fill="#8884d8" name="Books" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>
                User activity patterns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={engagementTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="views"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                        name="Views"
                      />
                      <Line
                        type="monotone"
                        dataKey="borrows"
                        stroke="#82ca9d"
                        name="Borrows"
                      />
                      <Line
                        type="monotone"
                        dataKey="completions"
                        stroke="#ffc658"
                        name="Completions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading Time</CardTitle>
                <CardDescription>Average time spent reading</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center py-6">
                  24.5 min
                </div>
                <div className="text-sm text-gray-500 text-center">
                  Average session duration
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
                <CardDescription>Books read to completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center py-6">68%</div>
                <div className="text-sm text-gray-500 text-center">
                  Average completion rate
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Return Rate</CardTitle>
                <CardDescription>Users returning within 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-center py-6">72%</div>
                <div className="text-sm text-gray-500 text-center">
                  Weekly return rate
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>Most used platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={featureUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="feature" />
                      <YAxis />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="usage" fill="#8884d8" name="Usage %" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
