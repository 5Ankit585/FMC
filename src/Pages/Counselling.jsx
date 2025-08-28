// src/pages/Counselling.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Navbar from "../components/Navbar";

export default function CounsellingPage() {
  const [search, setSearch] = useState("");

  const colleges = [
    { name: "Harvard University", country: "USA", img: "/college1.jpg" },
    { name: "Oxford University", country: "UK", img: "/college2.jpg" },
    { name: "IIT Delhi", country: "India", img: "/college3.jpg" },
    { name: "University of Toronto", country: "Canada", img: "/college4.jpg" },
    { name: "University of Toronto", country: "Canada", img: "/college4.jpg" },
    { name: "University of Toronto", country: "Canada", img: "/college4.jpg" },
  ];

  const filtered = colleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
    <Navbar/>
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Find Your Dream College with MyVision
        </motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Explore top universities, connect with agents, and book personalised
          counselling sessions to plan your future.
        </p>
      </section>

      {/* Search Colleges */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Search Colleges & Universities</h2>
        <Input
          type="text"
          placeholder="Search by college name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full md:w-1/2"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((c, i) => (
            <Card key={i} className="shadow-lg hover:shadow-2xl transition rounded-2xl">
              <img
                src={c.img}
                alt={c.name}
                className="w-full h-40 object-cover rounded-t-2xl"
              />
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{c.name}</h3>
                <p className="text-gray-600">{c.country}</p>
                <Button className="mt-4 w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Agents Section */}
      <section className="bg-white py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">Connect with Agents</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Our expert counsellors are here to guide you through admissions,
          scholarships, and applications.
        </p>
        <Button size="lg" className="rounded-xl">
          Contact an Agent
        </Button>
      </section>

      {/* Book Counselling */}
      <section className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Book a Counselling Session
        </h2>
        <form className="max-w-xl mx-auto bg-white p-8 shadow-md rounded-2xl space-y-4">
          <Input type="text" placeholder="Your Full Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Input type="text" placeholder="Preferred Course" />
          <Input type="date" placeholder="Pick a Date" />
          <Button type="submit" className="w-full">Book Now</Button>
        </form>
      </section>
    </div>
  );
}
