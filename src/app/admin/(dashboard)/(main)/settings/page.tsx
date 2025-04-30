"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AlertCircle,
  Bell,
  BookOpen,
  CheckCircle2,
  Globe,
  Lock,
  Mail,
  Save,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // General settings
  const [libraryName, setLibraryName] = useState("BookVerse");
  const [libraryDescription, setLibraryDescription] = useState(
    "Your world of knowledge, digitized. Access thousands of books across all your devices with our seamless reading experience."
  );
  const [contactEmail, setContactEmail] = useState("support@bookverse.com");
  const [timezone, setTimezone] = useState("America/New_York");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12-hour");

  // User settings
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] =
    useState(true);
  const [defaultUserRole, setDefaultUserRole] = useState("reader");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5");
  const [passwordMinLength, setPasswordMinLength] = useState("8");
  const [passwordRequireSpecial, setPasswordRequireSpecial] = useState(true);
  const [passwordRequireNumbers, setPasswordRequireNumbers] = useState(true);

  // Content settings
  const [defaultBorrowDuration, setDefaultBorrowDuration] = useState("14");
  const [maxBorrowsPerUser, setMaxBorrowsPerUser] = useState("5");
  const [allowRatings, setAllowRatings] = useState(true);
  const [allowReviews, setAllowReviews] = useState(true);
  const [moderateReviews, setModerateReviews] = useState(true);
  const [enableRecommendations, setEnableRecommendations] = useState(true);
  const [showPopularBooks, setShowPopularBooks] = useState(true);
  const [showNewReleases, setShowNewReleases] = useState(true);

  // Notification settings
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [sendBorrowConfirmation, setSendBorrowConfirmation] = useState(true);
  const [sendReturnReminders, setSendReturnReminders] = useState(true);
  const [daysBeforeDueReminder, setDaysBeforeDueReminder] = useState("3");
  const [sendOverdueNotices, setSendOverdueNotices] = useState(true);
  const [sendNewsletters, setSendNewsletters] = useState(true);
  const [newsletterFrequency, setNewsletterFrequency] = useState("weekly");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);
    setShowError(false);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an actual API call to save settings
      const success = Math.random() > 0.1; // 90% success rate for demo

      if (success) {
        setShowSuccess(true);
      } else {
        setShowError(true);
      }
      setIsSaving(false);

      // Auto-hide success message after 5 seconds
      if (success) {
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <Settings className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
            <p className="text-gray-600">
              Configure your digital library system preferences
            </p>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-navy-800 hover:bg-navy-900 flex items-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save All Settings
            </>
          )}
        </Button>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Card className="mb-6">
            <CardContent className="p-0">
              <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-transparent p-0">
                <TabsTrigger
                  value="general"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-navy-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-navy-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-navy-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-navy-800 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic library information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="library-name">Library Name</Label>
                  <Input
                    id="library-name"
                    value={libraryName}
                    onChange={(e) => setLibraryName(e.target.value)}
                    placeholder="Enter your library name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="library-description">
                    Library Description
                  </Label>
                  <Textarea
                    id="library-description"
                    value={libraryDescription}
                    onChange={(e) => setLibraryDescription(e.target.value)}
                    placeholder="Enter a brief description of your library"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Enter contact email address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">
                          Eastern Time (ET)
                        </SelectItem>
                        <SelectItem value="America/Chicago">
                          Central Time (CT)
                        </SelectItem>
                        <SelectItem value="America/Denver">
                          Mountain Time (MT)
                        </SelectItem>
                        <SelectItem value="America/Los_Angeles">
                          Pacific Time (PT)
                        </SelectItem>
                        <SelectItem value="Europe/London">
                          Greenwich Mean Time (GMT)
                        </SelectItem>
                        <SelectItem value="Europe/Paris">
                          Central European Time (CET)
                        </SelectItem>
                        <SelectItem value="Asia/Tokyo">
                          Japan Standard Time (JST)
                        </SelectItem>
                        <SelectItem value="Australia/Sydney">
                          Australian Eastern Time (AET)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select value={dateFormat} onValueChange={setDateFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                        <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Time Format</Label>
                  <RadioGroup
                    value={timeFormat}
                    onValueChange={setTimeFormat}
                    className="flex gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="12-hour" id="12-hour" />
                      <Label
                        htmlFor="12-hour"
                        className="font-normal cursor-pointer"
                      >
                        12-hour (1:30 PM)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="24-hour" id="24-hour" />
                      <Label
                        htmlFor="24-hour"
                        className="font-normal cursor-pointer"
                      >
                        24-hour (13:30)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Settings */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>
                  Configure user registration and authentication options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-registration">
                      Allow User Registration
                    </Label>
                    <p className="text-sm text-gray-500">
                      Enable or disable new user registrations
                    </p>
                  </div>
                  <Switch
                    id="allow-registration"
                    checked={allowRegistration}
                    onCheckedChange={setAllowRegistration}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-email-verification">
                      Require Email Verification
                    </Label>
                    <p className="text-sm text-gray-500">
                      Users must verify their email address before accessing the
                      library
                    </p>
                  </div>
                  <Switch
                    id="require-email-verification"
                    checked={requireEmailVerification}
                    onCheckedChange={setRequireEmailVerification}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-user-role">Default User Role</Label>
                  <Select
                    value={defaultUserRole}
                    onValueChange={setDefaultUserRole}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select default role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reader">Reader</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">
                      Session Timeout (minutes)
                    </Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      min="5"
                      max="1440"
                      value={sessionTimeout}
                      onChange={(e) => setSessionTimeout(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">
                      Max Login Attempts
                    </Label>
                    <Input
                      id="max-login-attempts"
                      type="number"
                      min="1"
                      max="10"
                      value={maxLoginAttempts}
                      onChange={(e) => setMaxLoginAttempts(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium mb-4 flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    Password Requirements
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password-min-length">
                        Minimum Password Length
                      </Label>
                      <Input
                        id="password-min-length"
                        type="number"
                        min="6"
                        max="32"
                        value={passwordMinLength}
                        onChange={(e) => setPasswordMinLength(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="password-require-special"
                        checked={passwordRequireSpecial}
                        onCheckedChange={(checked) =>
                          setPasswordRequireSpecial(checked === true)
                        }
                      />
                      <Label
                        htmlFor="password-require-special"
                        className="font-normal cursor-pointer"
                      >
                        Require special characters
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="password-require-numbers"
                        checked={passwordRequireNumbers}
                        onCheckedChange={(checked) =>
                          setPasswordRequireNumbers(checked === true)
                        }
                      />
                      <Label
                        htmlFor="password-require-numbers"
                        className="font-normal cursor-pointer"
                      >
                        Require numbers
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Settings */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>
                  Configure book borrowing and content display options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-borrow-duration">
                      Default Borrow Duration (days)
                    </Label>
                    <Input
                      id="default-borrow-duration"
                      type="number"
                      min="1"
                      max="90"
                      value={defaultBorrowDuration}
                      onChange={(e) => setDefaultBorrowDuration(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-borrows-per-user">
                      Maximum Borrows Per User
                    </Label>
                    <Input
                      id="max-borrows-per-user"
                      type="number"
                      min="1"
                      max="50"
                      value={maxBorrowsPerUser}
                      onChange={(e) => setMaxBorrowsPerUser(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-ratings">Allow Ratings</Label>
                    <p className="text-sm text-gray-500">
                      Let users rate books
                    </p>
                  </div>
                  <Switch
                    id="allow-ratings"
                    checked={allowRatings}
                    onCheckedChange={setAllowRatings}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-reviews">Allow Reviews</Label>
                    <p className="text-sm text-gray-500">
                      Let users write book reviews
                    </p>
                  </div>
                  <Switch
                    id="allow-reviews"
                    checked={allowReviews}
                    onCheckedChange={setAllowReviews}
                  />
                </div>

                {allowReviews && (
                  <div className="flex items-center justify-between pl-6">
                    <div className="space-y-0.5">
                      <Label htmlFor="moderate-reviews">Moderate Reviews</Label>
                      <p className="text-sm text-gray-500">
                        Reviews require approval before being published
                      </p>
                    </div>
                    <Switch
                      id="moderate-reviews"
                      checked={moderateReviews}
                      onCheckedChange={setModerateReviews}
                    />
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium mb-4">
                    Homepage Display Options
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="enable-recommendations">
                          Enable Recommendations
                        </Label>
                        <p className="text-sm text-gray-500">
                          Show personalized book recommendations
                        </p>
                      </div>
                      <Switch
                        id="enable-recommendations"
                        checked={enableRecommendations}
                        onCheckedChange={setEnableRecommendations}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-popular-books">
                          Show Popular Books
                        </Label>
                        <p className="text-sm text-gray-500">
                          Display most borrowed and viewed books
                        </p>
                      </div>
                      <Switch
                        id="show-popular-books"
                        checked={showPopularBooks}
                        onCheckedChange={setShowPopularBooks}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-new-releases">
                          Show New Releases
                        </Label>
                        <p className="text-sm text-gray-500">
                          Display recently added books
                        </p>
                      </div>
                      <Switch
                        id="show-new-releases"
                        checked={showNewReleases}
                        onCheckedChange={setShowNewReleases}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure email notifications and reminders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="send-welcome-email">
                      Send Welcome Email
                    </Label>
                    <p className="text-sm text-gray-500">
                      Send an email when a new user registers
                    </p>
                  </div>
                  <Switch
                    id="send-welcome-email"
                    checked={sendWelcomeEmail}
                    onCheckedChange={setSendWelcomeEmail}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="send-borrow-confirmation">
                      Send Borrow Confirmation
                    </Label>
                    <p className="text-sm text-gray-500">
                      Send an email when a user borrows a book
                    </p>
                  </div>
                  <Switch
                    id="send-borrow-confirmation"
                    checked={sendBorrowConfirmation}
                    onCheckedChange={setSendBorrowConfirmation}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="send-return-reminders">
                      Send Return Reminders
                    </Label>
                    <p className="text-sm text-gray-500">
                      Send reminders before books are due
                    </p>
                  </div>
                  <Switch
                    id="send-return-reminders"
                    checked={sendReturnReminders}
                    onCheckedChange={setSendReturnReminders}
                  />
                </div>

                {sendReturnReminders && (
                  <div className="pl-6 space-y-2">
                    <Label htmlFor="days-before-due-reminder">
                      Days Before Due Date
                    </Label>
                    <Input
                      id="days-before-due-reminder"
                      type="number"
                      min="1"
                      max="14"
                      value={daysBeforeDueReminder}
                      onChange={(e) => setDaysBeforeDueReminder(e.target.value)}
                      className="max-w-[100px]"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="send-overdue-notices">
                      Send Overdue Notices
                    </Label>
                    <p className="text-sm text-gray-500">
                      Send notifications for overdue books
                    </p>
                  </div>
                  <Switch
                    id="send-overdue-notices"
                    checked={sendOverdueNotices}
                    onCheckedChange={setSendOverdueNotices}
                  />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-base font-medium mb-4 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Newsletter Settings
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="send-newsletters">
                          Send Newsletters
                        </Label>
                        <p className="text-sm text-gray-500">
                          Send regular newsletters to users
                        </p>
                      </div>
                      <Switch
                        id="send-newsletters"
                        checked={sendNewsletters}
                        onCheckedChange={setSendNewsletters}
                      />
                    </div>

                    {sendNewsletters && (
                      <div className="space-y-2">
                        <Label htmlFor="newsletter-frequency">
                          Newsletter Frequency
                        </Label>
                        <Select
                          value={newsletterFrequency}
                          onValueChange={setNewsletterFrequency}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="biweekly">Bi-weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                  <div className="flex">
                    <Shield className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Email Configuration</p>
                      <p className="mt-1">
                        Make sure your SMTP settings are configured correctly in
                        the system configuration file for emails to be sent
                        properly.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
