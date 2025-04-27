import {
  Check,
  CircleCheck,
  Clock,
  Globe,
  Library,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

export function Discover() {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Main Feature Card - Spans 2 columns on desktop */}
          <div className="md:col-span-2 bg-navy-900 text-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">
              Discover, read, and manage your digital library
            </h2>
            <p className="text-white/80">
              Access thousands of books across all your devices with our
              seamless reading experience.
            </p>
          </div>

          {/* Global Collection Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-navy-800">
                Global Collection
              </h3>
              <Globe className="h-5 w-5 text-navy-700" />
            </div>
            <p className="text-gray-600 text-sm mt-2 mb-4">
              Access books from publishers worldwide
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-16 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-gray-500">Fiction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-12 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-500">Non-fiction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-10 rounded-full bg-amber-500"></div>
                <span className="text-xs text-gray-500">Academic</span>
              </div>
            </div>
          </div>

          {/* Automated Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-navy-800">
                Personalized
              </h3>
              <Sparkles className="h-5 w-5 text-navy-700" />
            </div>
            <p className="text-gray-600 text-sm mt-2 mb-4">
              AI-powered recommendations based on your reading habits
            </p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-purple-500"></div>
              </div>
              <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
              </div>
              <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-navy-700"></div>
              </div>
              <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
              </div>
              <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-purple-500"></div>
              </div>
              <div className="aspect-square rounded-md bg-gray-100 flex items-center justify-center">
                <div className="h-6 w-6 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Complete Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-navy-800">Complete</h3>
              <CircleCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-gray-600 text-sm mt-2">
              Full-featured reading experience with bookmarks, notes, and
              highlights
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
              <span className="text-sm text-navy-800">
                Syncs across all devices
              </span>
            </div>
          </div>

          {/* Anywhere Card */}
          <div className="md:col-span-2 bg-white border border-gray-200 p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-navy-800">
                All-in-one place
              </h3>
              <Library className="h-5 w-5 text-navy-700" />
            </div>
            <p className="text-gray-600 text-sm mt-2 mb-4">
              Manage your entire reading collection in one platform - books,
              audiobooks, articles, and more
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-purple-500" />
                </div>
                <span className="text-xs text-gray-500">Favorites</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <span className="text-xs text-gray-500">Reading List</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-amber-500" />
                </div>
                <span className="text-xs text-gray-500">Book Clubs</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                  <Check className="h-6 w-6 text-emerald-500" />
                </div>
                <span className="text-xs text-gray-500">Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
