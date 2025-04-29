"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  ImageIcon,
  Info,
  Plus,
  School,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample categories for selection
const categories = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business",
  "Psychology",
  "Sociology",
  "History",
  "Literature",
  "Philosophy",
  "Engineering",
  "Medicine",
  "Law",
  "Political Science",
  "Education",
  "Art",
  "Music",
  "Languages",
];

// Sample languages for selection
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Chinese",
  "Korean",
  "Arabic",
];

// Sample academic levels
const academicLevels = [
  "Elementary",
  "Middle School",
  "High School",
  "Undergraduate",
  "Graduate",
  "Doctoral",
  "Professional",
];

export default function AddTextbookPage() {
  // Basic textbook information
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([""]);
  const [edition, setEdition] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [language, setLanguage] = useState("English");
  const [pages, setPages] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("published");

  // Academic information
  const [academicLevel, setAcademicLevel] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [department, setDepartment] = useState("");
  const [isTextbookRequired, setIsTextbookRequired] = useState(true);
  const [hasSupplementaryMaterials, setHasSupplementaryMaterials] =
    useState(false);
  const [supplementaryMaterials, setSupplementaryMaterials] = useState<
    string[]
  >([]);
  const [currentMaterial, setCurrentMaterial] = useState("");

  // Additional information
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [isDigitalAccessAvailable, setIsDigitalAccessAvailable] =
    useState(false);
  const [digitalAccessInfo, setDigitalAccessInfo] = useState("");
  const [isOpenAccess, setIsOpenAccess] = useState(false);
  const [price, setPrice] = useState("");

  // Cover image
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Handle author fields
  const handleAuthorChange = (index: number, value: string) => {
    const newAuthors = [...authors];
    newAuthors[index] = value;
    setAuthors(newAuthors);
  };

  const addAuthorField = () => {
    setAuthors([...authors, ""]);
  };

  const removeAuthorField = (index: number) => {
    if (authors.length > 1) {
      const newAuthors = [...authors];
      newAuthors.splice(index, 1);
      setAuthors(newAuthors);
    }
  };

  // Handle keywords
  const addKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  // Handle supplementary materials
  const addMaterial = () => {
    if (
      currentMaterial.trim() &&
      !supplementaryMaterials.includes(currentMaterial.trim())
    ) {
      setSupplementaryMaterials([
        ...supplementaryMaterials,
        currentMaterial.trim(),
      ]);
      setCurrentMaterial("");
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setSupplementaryMaterials(
      supplementaryMaterials.filter((material) => material !== materialToRemove)
    );
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setCoverImage(file);

      // Create a preview URL
      const imageUrl = URL.createObjectURL(file);
      setCoverImageUrl(imageUrl);

      // Clear any previous errors
      setError("");
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    if (coverImageUrl) {
      URL.revokeObjectURL(coverImageUrl);
    }
    setCoverImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validate required fields
    if (!title) {
      setError("Textbook title is required");
      setActiveTab("basic");
      return;
    }

    if (!authors[0]) {
      setError("At least one author is required");
      setActiveTab("basic");
      return;
    }

    if (!edition) {
      setError("Edition is required");
      setActiveTab("basic");
      return;
    }

    if (!isbn) {
      setError("ISBN is required");
      setActiveTab("basic");
      return;
    }

    if (!category) {
      setError("Category is required");
      setActiveTab("basic");
      return;
    }

    if (!description) {
      setError("Textbook description is required");
      setActiveTab("basic");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an actual API call to create the textbook
      // and upload the cover image if present

      // For demo purposes, show success
      setSuccess(true);
      setIsLoading(false);

      // Reset form after successful submission
      // This would typically happen after a successful API response
      setTimeout(() => {
        setTitle("");
        setAuthors([""]);
        setEdition("");
        setIsbn("");
        setCategory("");
        setPublisher("");
        setPublicationYear("");
        setLanguage("English");
        setPages("");
        setDescription("");
        setStatus("published");
        setAcademicLevel("");
        setCourseCode("");
        setDepartment("");
        setIsTextbookRequired(true);
        setHasSupplementaryMaterials(false);
        setSupplementaryMaterials([]);
        setCurrentMaterial("");
        setKeywords([]);
        setCurrentKeyword("");
        setIsDigitalAccessAvailable(false);
        setDigitalAccessInfo("");
        setIsOpenAccess(false);
        setPrice("");
        removeImage();
        setActiveTab("basic");
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/textbooks"
          className="text-navy-700 hover:text-navy-900 flex items-center text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Textbooks
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <BookOpen className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">
              Add New Textbook
            </h1>
            <p className="text-gray-600">
              Add a new textbook to your digital library
            </p>
          </div>
        </div>
      </div>

      {/* Alert Messages */}
      {/* {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}

      {/* {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">
                  Textbook added successfully! You can add another textbook or return to the textbooks list.
                </AlertDescription>
              </Alert>
            )} */}

      {/* Textbook Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="border-b border-gray-200">
              <TabsList className="h-auto p-0 bg-transparent border-b border-gray-200 rounded-none">
                <TabsTrigger
                  value="basic"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="academic"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Academic Details
                </TabsTrigger>
                <TabsTrigger
                  value="additional"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Additional Details
                </TabsTrigger>
                <TabsTrigger
                  value="cover"
                  className="px-6 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-navy-800 data-[state=active]:shadow-none"
                >
                  Cover Image
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="basic" className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700">
                  Textbook Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter textbook title"
                  required
                />
              </div>

              {/* Authors */}
              <div className="space-y-2">
                <Label className="text-gray-700">
                  Author(s) <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  {authors.map((author, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={author}
                        onChange={(e) =>
                          handleAuthorChange(index, e.target.value)
                        }
                        placeholder={`Author ${index + 1}`}
                        required={index === 0}
                      />
                      {authors.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeAuthorField(index)}
                          className="flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove author</span>
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAuthorField}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Author
                  </Button>
                </div>
              </div>

              {/* Edition */}
              <div className="space-y-2">
                <Label htmlFor="edition" className="text-gray-700">
                  Edition <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edition"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  placeholder="e.g., 3rd Edition"
                  required
                />
              </div>

              {/* ISBN */}
              <div className="space-y-2">
                <Label htmlFor="isbn" className="text-gray-700">
                  ISBN <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="e.g., 978-3-16-148410-0"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-700">
                  Category/Subject <span className="text-red-500">*</span>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Publisher */}
                <div className="space-y-2">
                  <Label htmlFor="publisher" className="text-gray-700">
                    Publisher
                  </Label>
                  <Input
                    id="publisher"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    placeholder="Publisher name"
                  />
                </div>

                {/* Publication Year */}
                <div className="space-y-2">
                  <Label htmlFor="publicationYear" className="text-gray-700">
                    Publication Year
                  </Label>
                  <Input
                    id="publicationYear"
                    type="number"
                    min="1000"
                    max={new Date().getFullYear()}
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                    placeholder="YYYY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Language */}
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-gray-700">
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pages */}
                <div className="space-y-2">
                  <Label htmlFor="pages" className="text-gray-700">
                    Number of Pages
                  </Label>
                  <Input
                    id="pages"
                    type="number"
                    min="1"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    placeholder="e.g., 450"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter textbook description or synopsis"
                  className="min-h-[150px]"
                  required
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-gray-700">Status</Label>
                <RadioGroup
                  value={status}
                  onValueChange={setStatus}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="published" id="published" />
                    <Label
                      htmlFor="published"
                      className="font-normal cursor-pointer"
                    >
                      Published
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="draft" />
                    <Label
                      htmlFor="draft"
                      className="font-normal cursor-pointer"
                    >
                      Draft
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="review" id="review" />
                    <Label
                      htmlFor="review"
                      className="font-normal cursor-pointer"
                    >
                      Under Review
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Academic Level */}
                <div className="space-y-2">
                  <Label htmlFor="academicLevel" className="text-gray-700">
                    Academic Level
                  </Label>
                  <Select
                    value={academicLevel}
                    onValueChange={setAcademicLevel}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic level" />
                    </SelectTrigger>
                    <SelectContent>
                      {academicLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-gray-700">
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g., Computer Science Department"
                  />
                </div>
              </div>

              {/* Course Code */}
              <div className="space-y-2">
                <Label htmlFor="courseCode" className="text-gray-700">
                  Course Code
                </Label>
                <Input
                  id="courseCode"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="e.g., CS101, MATH202"
                />
                <p className="text-sm text-gray-500">
                  Enter the course code(s) this textbook is typically used for
                </p>
              </div>

              {/* Required Textbook */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isTextbookRequired"
                    checked={isTextbookRequired}
                    onCheckedChange={(checked) =>
                      setIsTextbookRequired(checked === true)
                    }
                  />
                  <Label
                    htmlFor="isTextbookRequired"
                    className="font-normal cursor-pointer"
                  >
                    This is a required textbook (not supplementary)
                  </Label>
                </div>
              </div>

              {/* Supplementary Materials */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasSupplementaryMaterials"
                    checked={hasSupplementaryMaterials}
                    onCheckedChange={(checked) =>
                      setHasSupplementaryMaterials(checked === true)
                    }
                  />
                  <Label
                    htmlFor="hasSupplementaryMaterials"
                    className="font-normal cursor-pointer"
                  >
                    This textbook includes supplementary materials
                  </Label>
                </div>

                {hasSupplementaryMaterials && (
                  <div className="mt-4 pl-6 space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="supplementaryMaterials"
                        className="text-gray-700"
                      >
                        List Supplementary Materials
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="supplementaryMaterials"
                          value={currentMaterial}
                          onChange={(e) => setCurrentMaterial(e.target.value)}
                          placeholder="e.g., Solution Manual, Practice Problems"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addMaterial();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addMaterial}
                          className="flex-shrink-0"
                          disabled={!currentMaterial.trim()}
                        >
                          Add
                        </Button>
                      </div>
                      {supplementaryMaterials.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {supplementaryMaterials.map((material) => (
                            <div
                              key={material}
                              className="flex items-center bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1"
                            >
                              {material}
                              <button
                                type="button"
                                onClick={() => removeMaterial(material)}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">
                                  Remove {material}
                                </span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                <div className="flex">
                  <School className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Academic Information</p>
                    <p className="mt-1">
                      These details help categorize the textbook for academic
                      use and make it easier for students and educators to find
                      appropriate materials for their courses.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="p-6 space-y-6">
              {/* Keywords */}
              <div className="space-y-2">
                <Label htmlFor="keywords" className="text-gray-700">
                  Keywords
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="keywords"
                    value={currentKeyword}
                    onChange={(e) => setCurrentKeyword(e.target.value)}
                    placeholder="Add keywords to help with search and categorization"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addKeyword}
                    className="flex-shrink-0"
                    disabled={!currentKeyword.trim()}
                  >
                    Add
                  </Button>
                </div>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {keywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {keyword}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Digital Access */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isDigitalAccessAvailable"
                    checked={isDigitalAccessAvailable}
                    onCheckedChange={(checked) =>
                      setIsDigitalAccessAvailable(checked === true)
                    }
                  />
                  <Label
                    htmlFor="isDigitalAccessAvailable"
                    className="font-normal cursor-pointer"
                  >
                    Digital access available
                  </Label>
                </div>

                {isDigitalAccessAvailable && (
                  <div className="mt-4 pl-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="digitalAccessInfo"
                        className="text-gray-700"
                      >
                        Digital Access Information
                      </Label>
                      <Textarea
                        id="digitalAccessInfo"
                        value={digitalAccessInfo}
                        onChange={(e) => setDigitalAccessInfo(e.target.value)}
                        placeholder="Enter details about digital access (e.g., access code, platform, duration)"
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Open Access */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOpenAccess"
                    checked={isOpenAccess}
                    onCheckedChange={(checked) =>
                      setIsOpenAccess(checked === true)
                    }
                  />
                  <Label
                    htmlFor="isOpenAccess"
                    className="font-normal cursor-pointer"
                  >
                    This is an open access textbook
                  </Label>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700">
                  Price (if applicable)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Leave blank if price varies or is not applicable
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                <div className="flex">
                  <GraduationCap className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Additional Information</p>
                    <p className="mt-1">
                      These details provide important context about the
                      textbook's accessibility, pricing, and digital options.
                      This information helps students and educators make
                      informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cover" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-2 mb-4">
                    <Label className="text-gray-700">
                      Textbook Cover Image
                    </Label>
                    <p className="text-sm text-gray-500">
                      Upload a cover image for this textbook. JPG, PNG or GIF,
                      max 5MB.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="cover-image"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center w-full justify-center py-8 border-2 border-dashed"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      {coverImage ? "Change Cover Image" : "Upload Cover Image"}
                    </Button>

                    {coverImage && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                        {coverImage.name} (
                        {(coverImage.size / (1024 * 1024)).toFixed(2)}MB)
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeImage}
                          className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="space-y-2 mb-4">
                    <Label className="text-gray-700">Cover Preview</Label>
                    <p className="text-sm text-gray-500">
                      This is how the cover will appear in the textbook
                      listings.
                    </p>
                  </div>

                  <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md p-6 h-[300px]">
                    {coverImageUrl ? (
                      <div className="relative h-full max-h-[250px] max-w-[180px] w-auto shadow-lg rounded-md overflow-hidden">
                        <Image
                          src={coverImageUrl || "/placeholder.svg"}
                          alt="Textbook cover preview"
                          fill
                          className="object-cover"
                          sizes="180px"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon className="h-16 w-16 mb-2" />
                        <p className="text-sm">No cover image uploaded</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/textbooks">Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-navy-800 hover:bg-navy-900"
            disabled={isLoading}
          >
            {isLoading ? "Adding Textbook..." : "Add Textbook"}
          </Button>
        </div>
      </form>
    </div>
  );
}
