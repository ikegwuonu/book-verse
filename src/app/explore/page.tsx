"use client";
import { useGetMaterial } from "@/api/react-query/material";
import { useGetTextBooks } from "@/api/react-query/textbook";
import { BookCategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";
import { TextbooksSection } from "@/components/TextbooksSection";
import { department } from "@/lib/constant";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ExplorePage() {
  const { data: materialsData, isPending } = useGetMaterial();
  const { data: textbookData } = useGetTextBooks();
  const textbooks = textbookData || [];
  const materials = materialsData || [];
  const uniqueDepartments = Array.from(
    new Set(materials?.map((item) => item.department)) || []
  );
  return (
    <div className=" flex flex-col">
      <main className="flex-1 ">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy-900 via-slate-800 to-slate-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Explore Our Collection
              </h1>
              <p className="text-lg text-white/80 mb-6">
                Discover materials & resuorces across various departments. From
                pharmacolgy to pharmaceutics, we have something for every
                student.
              </p>
              <div className="flex flex-wrap gap-3">
                {uniqueDepartments.map((dpt) => (
                  <Link
                    key={dpt}
                    href={`/explore#${dpt}`}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    {dpt}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories and Books */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {uniqueDepartments.map((dpt, index) => {
                const materialsByDpt = materials.filter(
                  (item, i) => item.department === dpt
                );
                return (
                  <BookCategorySection
                    key={index}
                    category={materialsByDpt}
                    dpt={dpt}
                  />
                );
              })}
            </div>
            <div className="space-y-16">
              <TextbooksSection category={textbooks} />
            </div>
          </div>
        </section>

        {/* Reading Recommendations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                Personalized Reading Recommendations
              </h2>
              <p className="text-gray-600 mb-8">
                Create an account to get personalized book recommendations based
                on your reading history and preferences. Our AI-powered system
                learns what you love to read and suggests new titles you'll
                enjoy.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center text-navy-800 font-medium hover:text-navy-900"
              >
                Create your free account{" "}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
