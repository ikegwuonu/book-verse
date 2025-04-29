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

import {
  AlertCircle,
  ArrowLeft,
  Book,
  CheckCircle2,
  ImageIcon,
  Info,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample genres for selection
const genres = [
  "Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Historical Fiction",
  "Biography",
  "Autobiography",
  "Memoir",
  "Self-Help",
  "Business",
  "History",
  "Science",
  "Philosophy",
  "Poetry",
  "Drama",
  "Horror",
  "Young Adult",
  "Children's",
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

export default function AddBookPage() {
  // Basic book information
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([""]);
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [language, setLanguage] = useState("English");
  const [format, setFormat] = useState("Hardcover");
  const [pages, setPages] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("available");

  // Additional book information
  const [series, setSeries] = useState("");
  const [edition, setEdition] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewRelease, setIsNewRelease] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);

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

  // Handle tags
  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
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
      setError("Book title is required");
      setActiveTab("basic");
      return;
    }

    if (!authors[0]) {
      setError("At least one author is required");
      setActiveTab("basic");
      return;
    }

    if (!genre) {
      setError("Genre is required");
      setActiveTab("basic");
      return;
    }

    if (!publicationYear) {
      setError("Publication year is required");
      setActiveTab("basic");
      return;
    }

    if (!isbn) {
      setError("ISBN is required");
      setActiveTab("basic");
      return;
    }

    if (!description) {
      setError("Book description is required");
      setActiveTab("basic");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an actual API call to create the book
      // and upload the cover image if present

      // For demo purposes, show success
      setSuccess(true);
      setIsLoading(false);

      // Reset form after successful submission
      // This would typically happen after a successful API response
      setTimeout(() => {
        setTitle("");
        setAuthors([""]);
        setGenre("");
        setPublicationYear("");
        setPublisher("");
        setIsbn("");
        setLanguage("English");
        setFormat("Hardcover");
        setPages("");
        setDescription("");
        setStatus("available");
        setSeries("");
        setEdition("");
        setTags([]);
        setCurrentTag("");
        setIsFeatured(false);
        setIsNewRelease(false);
        setIsRecommended(false);
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
          href="/admin/books"
          className="text-navy-700 hover:text-navy-900 flex items-center text-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Books
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-navy-100 flex items-center justify-center mr-4">
            <Book className="h-6 w-6 text-navy-800" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Add New Book</h1>
            <p className="text-gray-600">
              Add a new book to your digital library
            </p>
          </div>
        </div>
      </div>

      {/* Book Form */}
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
                  Book Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
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

              {/* Genre */}
              <div className="space-y-2">
                <Label htmlFor="genre" className="text-gray-700">
                  Genre <span className="text-red-500">*</span>
                </Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Publication Year */}
                <div className="space-y-2">
                  <Label htmlFor="publicationYear" className="text-gray-700">
                    Publication Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="publicationYear"
                    type="number"
                    min="1000"
                    max={new Date().getFullYear()}
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                    placeholder="YYYY"
                    required
                  />
                </div>

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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="e.g., 320"
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

                {/* Format */}
                <div className="space-y-2">
                  <Label className="text-gray-700">Format</Label>
                  <RadioGroup
                    value={format}
                    onValueChange={setFormat}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Hardcover" id="hardcover" />
                      <Label
                        htmlFor="hardcover"
                        className="font-normal cursor-pointer"
                      >
                        Hardcover
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Paperback" id="paperback" />
                      <Label
                        htmlFor="paperback"
                        className="font-normal cursor-pointer"
                      >
                        Paperback
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ebook" id="ebook" />
                      <Label
                        htmlFor="ebook"
                        className="font-normal cursor-pointer"
                      >
                        Ebook
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Audiobook" id="audiobook" />
                      <Label
                        htmlFor="audiobook"
                        className="font-normal cursor-pointer"
                      >
                        Audiobook
                      </Label>
                    </div>
                  </RadioGroup>
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
                  placeholder="Enter book description or synopsis"
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
                    <RadioGroupItem value="available" id="available" />
                    <Label
                      htmlFor="available"
                      className="font-normal cursor-pointer"
                    >
                      Available
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="borrowed" id="borrowed" />
                    <Label
                      htmlFor="borrowed"
                      className="font-normal cursor-pointer"
                    >
                      Borrowed
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="reserved" id="reserved" />
                    <Label
                      htmlFor="reserved"
                      className="font-normal cursor-pointer"
                    >
                      Reserved
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Series */}
                <div className="space-y-2">
                  <Label htmlFor="series" className="text-gray-700">
                    Series
                  </Label>
                  <Input
                    id="series"
                    value={series}
                    onChange={(e) => setSeries(e.target.value)}
                    placeholder="Series name (if applicable)"
                  />
                </div>

                {/* Edition */}
                <div className="space-y-2">
                  <Label htmlFor="edition" className="text-gray-700">
                    Edition
                  </Label>
                  <Input
                    id="edition"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    placeholder="e.g., First Edition, Revised Edition"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags" className="text-gray-700">
                  Tags
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="tags"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add tags to help with search and categorization"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addTag}
                    className="flex-shrink-0"
                    disabled={!currentTag.trim()}
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center bg-gray-100 text-gray-800 text-sm rounded-full px-3 py-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured, New Release, Recommended */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={isFeatured}
                    onCheckedChange={(checked) =>
                      setIsFeatured(checked === true)
                    }
                  />
                  <Label
                    htmlFor="featured"
                    className="font-normal cursor-pointer"
                  >
                    Featured Book (will be highlighted on the homepage)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newRelease"
                    checked={isNewRelease}
                    onCheckedChange={(checked) =>
                      setIsNewRelease(checked === true)
                    }
                  />
                  <Label
                    htmlFor="newRelease"
                    className="font-normal cursor-pointer"
                  >
                    New Release (will be shown in the new releases section)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommended"
                    checked={isRecommended}
                    onCheckedChange={(checked) =>
                      setIsRecommended(checked === true)
                    }
                  />
                  <Label
                    htmlFor="recommended"
                    className="font-normal cursor-pointer"
                  >
                    Recommended (will be included in staff recommendations)
                  </Label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium">Additional Information</p>
                    <p className="mt-1">
                      These details help with categorization, discovery, and
                      promotion of books in your digital library. The more
                      information you provide, the easier it will be for users
                      to find this book.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cover" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-2 mb-4">
                    <Label className="text-gray-700">Book Cover Image</Label>
                    <p className="text-sm text-gray-500">
                      Upload a cover image for this book. JPG, PNG or GIF, max
                      5MB.
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
                      This is how the cover will appear in the book listings.
                    </p>
                  </div>

                  <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md p-6 h-[300px]">
                    {coverImageUrl ? (
                      <div className="relative h-full max-h-[250px] max-w-[180px] w-auto shadow-lg rounded-md overflow-hidden">
                        <Image
                          src={coverImageUrl || "/placeholder.svg"}
                          alt="Book cover preview"
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
            <Link href="/admin/books">Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-navy-800 hover:bg-navy-900"
            disabled={isLoading}
          >
            {isLoading ? "Adding Book..." : "Add Book"}
          </Button>
        </div>
      </form>
    </div>
  );
}
