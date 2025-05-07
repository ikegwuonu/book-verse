"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import FooterLinks from "./FooterLinks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscribeNewsletterSchema,
  subscribeNewsletterSchemaType,
} from "@/lib/form-validation";

import { useSubscribeNewsletter } from "@/api/react-query/newsletter";

export function Footer() {
  const { mutateAsync: subscribeFn, isPending } = useSubscribeNewsletter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subscribeNewsletterSchema),
  });
  const onSubmit = async (data: subscribeNewsletterSchemaType) => {
    await subscribeFn(data);
  };
  return (
    <footer className="bg-navy-900 text-white">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-2">
              Ready to expand your literary horizons?
            </h2>
            <p className="text-gray-300 mb-4">
              Join thousands of readers who discover new books, track their
              reading progress, and connect with fellow book lovers through
              BookVerse's digital library platform.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                {...register("email")}
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 max-w-xs"
              />
              <Button
                disabled={isPending}
                type="submit"
                className="bg-white text-navy-900 hover:bg-white/90"
              >
                {isPending ? "Subscribing..." : " Subscribe to Newsletter"}
              </Button>
            </form>
            {errors.email && (
              <p className="text-xs text-white">{errors.email.message}</p>
            )}
          </div>
          <div className="hidden md:flex justify-end">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
              <div className="absolute inset-0 rounded-full flex items-center justify-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-0.5 bg-navy-900"
                    style={{ transform: `rotate(${i * 22.5}deg)` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-white/10" />

      {/* Links Section */}
      <FooterLinks />

      {/* Bottom Section */}
      <div className="bg-navy-900 border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xl font-bold mr-2">BookVerse</span>
              <span className="text-sm text-gray-400">
                © 2025 All rights reserved
              </span>
            </div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
