import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export default function ContactPage() {
  return (
    <div className=" flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy-900 via-slate-800 to-slate-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have questions about BookVerse? We're here to help you with any
              inquiries about our digital library platform.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24
                  hours.
                </p>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="first-name"
                        className="text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <Input id="first-name" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="last-name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please provide as much detail as possible..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-navy-800 hover:bg-navy-900"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-navy-800" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-navy-900">
                        Email Us
                      </h3>
                      <p className="text-gray-600">support@bookverse.com</p>
                      <p className="text-sm text-gray-500 mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-navy-800" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-navy-900">
                        Call Us
                      </h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Mon-Fri from 9am to 6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center mr-4">
                      <MessageSquare className="h-5 w-5 text-navy-800" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-navy-900">
                        Live Chat
                      </h3>
                      <p className="text-gray-600">Available on our platform</p>
                      <p className="text-sm text-gray-500 mt-1">
                        24/7 for premium members
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-navy-900 mb-4">
                    Frequently Asked Questions
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-navy-800">
                        How do I reset my password?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        You can reset your password by clicking on the "Forgot
                        Password" link on the login page. We'll send you an
                        email with instructions to create a new password.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-navy-800">
                        Can I read books offline?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        Yes, premium members can download books for offline
                        reading on our mobile apps. The books will be available
                        for 30 days offline before requiring reconnection.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-navy-800">
                        How do I cancel my subscription?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        You can cancel your subscription anytime from your
                        account settings. Your access will continue until the
                        end of your current billing period.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
