import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image1 from "../Images/cloud.jpg";

const Cloud = () => {
  const currentDate = new Date();
  const [newsTab, setNewsTab] = useState("news");
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // Full data for news, alerts, blogs
  const newsData = [
    { text: "University awarded top ranking for engineering program.", link: "#" },
    { text: "New research reveals breakthrough in renewable energy.", link: "#" },
    { text: "Student startup secures major funding round.", link: "#" },
    { text: "Faculty member receives prestigious national award.", link: "#" },
    { text: "Annual alumni gala raises record funds for scholarships.", link: "#" },
    { text: "New campus-wide shuttle service to launch next month.", link: "#" },
    { text: "Upcoming guest lecture by a Nobel laureate on climate change.", link: "#" },
    { text: "Renovations to campus gym to be completed by fall semester.", link: "#" },
    { text: "University hosts international conference on artificial intelligence.", link: "#" },
  ];

  const alertsData = [
    { text: "Campus library will be closed on Sept 5 for maintenance.", link: "#" },
    { text: "New COVID-19 guidelines effective from Oct 1.", link: "#" },
    { text: "Virtual career fair scheduled for Nov 20.", link: "#" },
    { text: "Severe weather alert: Campus closure expected tomorrow.", link: "#" },
    { text: "Important security update for all student portals.", link: "#" },
    { text: "Parking lot C will be closed for a special event this weekend.", link: "#" },
  ];

  const blogsData = [
    { text: "Navigating your first semester with confidence.", link: "#" },
    { text: "The future of higher education in a digital world.", link: "#" },
    { text: "How to ace your final exams: Tips and tricks.", link: "#" },
    { text: "Five ways to get involved in campus life.", link: "#" },
    { text: "From classroom to career: A student's journey.", link: "#" },
    { text: "The importance of mental health for students.", link: "#" },
  ];

  const data = { news: newsData, alerts: alertsData, blogs: blogsData };

  // Scroll animation
  const scrollVariants = {
    animate: {
      y: ["0%", "-100%"],
      transition: { y: { duration: 20, ease: "linear", repeat: Infinity } },
    },
    pause: { y: null, transition: { duration: 0 } },
  };

  return (
    <section className="p-8 box-border">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-around">
        {/* Left Section: News/Alerts/Blogs */}
        <div className="space-y-4 lg:w-1/3">
          <h2 className="text-xl md:text-2xl font-bold">
            The latest Blogs from findmycollege:
          </h2>

          {/* Tabs */}
          <div className="flex bg-[#a476a4] rounded-t-xl overflow-hidden shadow-md">
            {["news", "alerts", "blogs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setNewsTab(tab)}
                className={`flex-1 px-4 py-3 font-semibold text-sm transition-all ${
                  newsTab === tab
                    ? "bg-[#a476a4] text-white border-b-2 border-purple-500"
                    : "bg-[#a476a4] text-gray-400 hover:text-white"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Scrollable Content */}
          <div
            ref={containerRef}
            className="bg-[#483248] border-t-2 border-purple-600 p-4 h-64 overflow-hidden relative rounded-b-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={newsTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-2"
              >
                <motion.div
                  ref={scrollRef}
                  variants={scrollVariants}
                  animate={isHovered ? "pause" : "animate"}
                >
                  {data[newsTab].map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2 border-b border-dotted border-gray-600 last:border-0"
                    >
                      <a
                        href={item.link}
                        className="text-gray-300 hover:text-purple-500 transition-colors block leading-tight"
                      >
                        {item.text}
                      </a>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* View All Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#a476a4] text-white px-6 py-3 mt-6 rounded-full font-semibold shadow-md hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            <span>View All</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          <p className="text-gray-400">lorem | {currentDate.toLocaleDateString()}</p>
        </div>

        {/* Right Section: Image & Blog */}
        <div className="my-9 space-y-4 lg:w-1/3">
          <img className="w-full h-96 object-cover rounded-lg" src={Image1} alt="cloud" />
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold">
              Our Planned Upgrade to Cloud Servers
            </h2>
            <p className="text-gray-400">lorem | {currentDate.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cloud;
