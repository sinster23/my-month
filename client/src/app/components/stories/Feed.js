"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";

export default function StoriesFeed() {
  const [activeStory, setActiveStory] = useState(1);

  const stories = [
    {
      id: 1,
      title: "Finding Peace in Sacred Cycles",
      author: "Priya M.",
      identity: "Hindu Perspective",
      excerpt: "Growing up, I learned to honor my body's natural rhythms as a connection to divine feminine energy. My grandmother taught me that menstruation wasn't something to hide, but a time of spiritual renewal...",
      image: "/feed1.png",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      title: "Breaking Silence with Grace",
      author: "Aisha K.",
      identity: "Muslim Journey",
      excerpt: "In my faith community, I discovered that Islamic teachings emphasize cleanliness and self-care during menstruation. Learning the true compassion in these guidelines helped me embrace my cycle with dignity...",
      image: "/feed2.png",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Celebrating Womanhood",
      author: "Sarah L.",
      identity: "Christian Faith",
      excerpt: "My church youth group opened conversations about menstrual health, teaching us that our bodies are wonderfully made. This acceptance transformed shame into celebration of God's design...",
      image: "/feed3.png",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 4,
      title: "Wisdom of Equality",
      author: "Simran S.",
      identity: "Sikh Values",
      excerpt: "The Guru Granth Sahib teaches that menstruation is natural and pure. Growing up Sikh, I never felt the stigma many of my friends experienced. This equality shaped my confidence...",
      image: "/feed4.png",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 5,
      title: "Mindful Acceptance",
      author: "Maya T.",
      identity: "Buddhist Practice",
      excerpt: "Through meditation and Buddhist teachings, I learned to observe my menstrual cycle without judgment. Each month became an opportunity to practice compassion toward myself...",
      image: "/feed5.png",
      color: "from-purple-500 to-violet-500"
    },
    {
      id: 6,
      title: "Moon Time Traditions",
      author: "Anonymous",
      identity: "Indigenous Wisdom",
      excerpt: "In my community, we honor menstruation as moon time—a sacred period of connection to ancestral wisdom. The moon lodge ceremonies taught me the power women hold during this phase...",
      image: "/feed6.png",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 7,
      title: "Modern Faith, Timeless Truth",
      author: "Leah R.",
      identity: "Interfaith Dialogue",
      excerpt: "Dating someone from a different faith opened my eyes to how beautifully diverse—and similar—our traditions are. We both learned that respect for women transcends religious boundaries...",
      image: "/feed7.png",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 8,
      title: "A Mother's Gift",
      author: "Fatima H.",
      identity: "Multi-generational",
      excerpt: "When my daughter started her period, I wanted to give her what my mother gave me: knowledge without shame, faith without fear. We celebrated together, bridging tradition and modernity...",
      image: "/feed8.png",
      color: "from-red-500 to-rose-500"
    },
    {
      id: 9,
      title: "Reclaiming My Voice",
      author: "Rachel W.",
      identity: "Personal Journey",
      excerpt: "Years of silence ended when I joined a faith-based women's health group. Sharing our stories revealed that we all struggled with similar questions, fears, and hopes...",
      image: "/feed9.png",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Stories of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Faith & Strength
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Real voices sharing their journeys of faith, womanhood, and embracing menstrual health with dignity
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500" />
            <BookOpen className="w-6 h-6 text-red-500" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </motion.div>

        {/* Hover Expand Stories Grid - Matching template animation */}
        <motion.div 
          initial={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.5,
          }}
          className="relative w-full max-w-6xl mx-auto px-5"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="flex w-full items-center justify-center gap-1">
              {stories.map((story, index) => (
                <motion.div
                  key={story.id}
                  className="relative cursor-pointer overflow-hidden rounded-3xl"
                  initial={{ width: "5rem", height: "32rem" }}
                  animate={{
                    width: activeStory === index ? "24rem" : "5rem",
                    height: "32rem",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => setActiveStory(index)}
                  onHoverStart={() => setActiveStory(index)}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <div 
                      className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black"
                      style={{
                        backgroundImage: `url(${story.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <AnimatePresence>
                    {activeStory === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="absolute h-full w-full bg-gradient-to-t from-black via-black/60 to-transparent"
                      />
                    )}
                  </AnimatePresence>

                  {/* Active Content */}
                  <AnimatePresence>
                    {activeStory === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="absolute flex h-full w-full flex-col justify-end p-6"
                      >
                        {/* Identity Badge */}
                        <div className="mb-4">
                          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${story.color} text-white`}>
                            {story.identity}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {story.title}
                        </h3>

                        {/* Author */}
                        <p className="text-sm text-gray-300 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                          by {story.author}
                        </p>

                        {/* Excerpt */}
                        <p className="text-gray-300 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {story.excerpt}
                        </p>

                        {/* Read More Button */}
                        <button className="group flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-300 w-fit">
                          <span className="text-white font-semibold text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Read Full Story
                          </span>
                          <ChevronRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Collapsed State - Dark overlay and vertical title */}
                  {activeStory !== index && (
                    <>
                      <div className="absolute inset-0 bg-black/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white font-bold text-sm transform -rotate-90 whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {story.title}
                        </p>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Share Your Story
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}