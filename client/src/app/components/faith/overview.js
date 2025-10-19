"use client";
import { useState } from "react";

export default function FaithOverview() {
  const [selectedFaith, setSelectedFaith] = useState(null);

  const faiths = [
    {
      id: 1,
      name: "Hinduism",
      imageUrl: "/faith-hinduism.png",
      summary: "Ancient traditions view menstruation as a natural cycle of renewal and spiritual energy. Practices vary widely across regions, emphasizing respect for feminine power.",
      color: "from-orange-600 to-red-600",
      borderColor: "border-orange-500",
      hoverGlow: "hover:shadow-orange-500/30",
      quote: "\"She who flows with the sacred waters holds the power of creation itself.\"",
      quoteSource: "Ancient Vedic wisdom",
      mythBuster: "Original Vedic rituals viewed menstruation as a time of sacred rest, not impurity. The notion of 'pollution' came from later cultural interpretations, not original scriptures.",
      reflection: "Menstruation in Hindu philosophy is deeply connected to Shakti - the divine feminine energy. It represents the cyclical nature of creation, preservation, and transformation. Modern understanding encourages honoring this natural process while maintaining spiritual connection.",
      details: "Hindu traditions encompass diverse perspectives on menstruation, from viewing it as a period of heightened spiritual energy to observing rest practices. Many communities celebrate menarche as a sacred transition into womanhood."
    },
    {
      id: 2,
      name: "Islam",
      imageUrl: "/faith-islam.png",
      summary: "Islamic teachings emphasize cleanliness and natural cycles, with specific guidelines for prayer and fasting during menstruation, rooted in compassion and women's wellbeing.",
      color: "from-green-600 to-emerald-600",
      borderColor: "border-green-500",
      hoverGlow: "hover:shadow-green-500/30",
      quote: "\"Allah does not burden a soul beyond its capacity.\"",
      quoteSource: "Quran 2:286",
      mythBuster: "Menstruation is not a punishment or curse in Islam. The exemption from certain prayers is a mercy, not a judgment. Women remain spiritually connected to Allah during this time.",
      reflection: "Islamic teachings recognize menstruation as a natural, divinely ordained process. The focus on hygiene and health reflects deep care for women's wellbeing, while spiritual exemptions honor the body's needs during this time.",
      details: "Islamic jurisprudence provides clear guidance on menstruation, exempting women from certain religious obligations while emphasizing their spiritual equality. The focus is on health, dignity, and maintaining connection with faith."
    },
    {
      id: 3,
      name: "Christianity",
      imageUrl: "/faith-christianity.png",
      summary: "Modern Christian perspectives celebrate menstruation as part of divine creation, moving beyond historical taboos to embrace women's health and dignity in faith communities.",
      color: "from-blue-600 to-indigo-600",
      borderColor: "border-blue-500",
      hoverGlow: "hover:shadow-blue-500/30",
      quote: "\"Your body is a temple of the Holy Spirit... you are not your own.\"",
      quoteSource: "1 Corinthians 6:19",
      mythBuster: "Old Testament restrictions on menstruation were lifted through the New Covenant. Jesus consistently broke menstrual taboos, healing the woman with bleeding and affirming her dignity.",
      reflection: "Christianity celebrates the body as sacred, made in God's image. Menstruation is part of the beautiful design of creation, reflecting God's intention for life and renewal. Modern faith communities embrace this understanding with compassion.",
      details: "Contemporary Christianity emphasizes the sacredness of the body as God's temple. Many denominations actively promote menstrual health education and reject stigma, viewing women's biological processes as inherently holy."
    },
    {
      id: 4,
      name: "Sikhism",
      imageUrl: "/faith-sikhism.png",
      summary: "Sikh teachings reject menstrual taboos, affirming that all natural bodily processes are pure. Equality and dignity for women are central tenets of the faith.",
      color: "from-yellow-600 to-orange-600",
      borderColor: "border-yellow-500",
      hoverGlow: "hover:shadow-yellow-500/30",
      quote: "\"From woman, man is born; within woman, man is conceived.\"",
      quoteSource: "Guru Nanak, Guru Granth Sahib",
      mythBuster: "Guru Nanak explicitly rejected the idea that menstruation makes women impure or unable to worship. Sikhism was revolutionary in affirming women's complete spiritual equality.",
      reflection: "Sikh philosophy recognizes that what God has created cannot be impure. Natural bodily functions are part of divine design and do not diminish one's connection to the Divine or ability to participate fully in spiritual life.",
      details: "Sikhism explicitly rejects the notion that menstruation is impure or polluting. Guru Nanak and subsequent Gurus emphasized gender equality, teaching that natural processes cannot make one spiritually unclean."
    },
    {
      id: 5,
      name: "Buddhism",
      imageUrl: "/faith-buddhism.png",
      summary: "Buddhist philosophy views menstruation as a natural phenomenon without inherent impurity. Modern practice emphasizes mindfulness and compassion in understanding bodily experiences.",
      color: "from-purple-600 to-violet-600",
      borderColor: "border-purple-500",
      hoverGlow: "hover:shadow-purple-500/30",
      quote: "\"All phenomena are impermanent. All phenomena are without self.\"",
      quoteSource: "Buddhist Teaching",
      mythBuster: "Buddha never taught that menstruation was spiritually polluting. Historical restrictions came from cultural contexts, not Buddhist doctrine. Modern Buddhist teachers actively challenge menstrual stigma.",
      reflection: "Buddhist practice encourages mindful acceptance of all bodily experiences without attachment or aversion. Menstruation is simply another natural process to observe with compassion and understanding, free from judgment.",
      details: "Buddhist teachings encourage acceptance of the body's natural rhythms without attachment or aversion. Many contemporary Buddhist communities actively work to eliminate menstrual stigma and promote women's spiritual equality."
    },
    {
      id: 6,
      name: "Indigenous Traditions",
      imageUrl: "/faith-indigenous.png",
      summary: "Many indigenous cultures honor menstruation as a time of heightened spiritual connection and power. Moon lodges and ceremonial practices celebrate this sacred cycle.",
      color: "from-teal-600 to-cyan-600",
      borderColor: "border-teal-500",
      hoverGlow: "hover:shadow-teal-500/30",
      quote: "\"When women bleed, they are at their most powerful. This is when they dream their dreams into being.\"",
      quoteSource: "Indigenous wisdom tradition",
      mythBuster: "Separation during menstruation in many indigenous cultures was not about impurity but about honoring women's heightened spiritual power. Moon lodges were sacred spaces for rest and connection, not exile.",
      reflection: "Indigenous perspectives often view menstruation as a profound connection to earth cycles, moon phases, and ancestral wisdom. This time is honored as one of deep intuition, spiritual gifts, and sacred feminine power.",
      details: "Across diverse indigenous communities worldwide, menstruation is often celebrated as a sacred time when women possess unique spiritual gifts. Traditional practices honor this connection to earth cycles and feminine wisdom."
    }
  ];

  return (
    <section id="faith" className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-red-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-red-400/12 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Faith <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Perspectives</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Exploring how different faith traditions approach menstrual health with wisdom, compassion, and respect
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500" />
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500" />
          </div>
        </div>

        {/* Faith Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {faiths.map((faith) => (
            <div
              key={faith.id}
              className="group relative"
              onClick={() => setSelectedFaith(faith)}
            >
              {/* Card */}
              <div className={`relative h-full bg-gradient-to-br from-zinc-900 to-black border-2 ${faith.borderColor} border-opacity-30 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:border-opacity-50 hover:shadow-2xl ${faith.hoverGlow} cursor-pointer`}>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:to-transparent rounded-2xl transition-all duration-500" />
                
                <div className="relative z-10 p-8 flex flex-col items-center text-center space-y-4">
                  {/* Image Circle */}
                  <div className="w-32 h-32 rounded-2xl overflow-hidden mb-2 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <img 
                      src={faith.imageUrl} 
                      alt={faith.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Faith Name */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {faith.name}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-400 group-hover:text-gray-300 text-sm leading-relaxed flex-grow" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {faith.summary}
                  </p>

                  {/* Learn More Button */}
                  <button
                    className={`mt-4 w-full py-3 px-6 bg-gradient-to-r ${faith.color} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1`}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Learn More
                  </button>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative line */}
        <div className="mt-16 flex items-center justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>
      </div>

      {/* Modal */}
      {selectedFaith && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedFaith(null)}
        >
          <div 
            className="bg-gradient-to-br from-zinc-900 to-black border-2 border-red-500/50 rounded-2xl max-w-3xl w-full relative transform transition-all duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floral border decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-red-500/30 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-red-500/30 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-red-500/30 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-red-500/30 rounded-br-2xl" />
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedFaith(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 rounded-full transition-all duration-300 z-10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              {/* Image */}
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden mb-6 shadow-2xl">
                <img 
                  src={selectedFaith.imageUrl} 
                  alt={selectedFaith.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedFaith.name}
              </h3>

              {/* Quote Section */}
              <div className="bg-gradient-to-br from-red-950/30 to-red-900/20 border border-red-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-8 h-8 text-red-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <div className="flex-1">
                    <p className="text-white text-lg italic leading-relaxed mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedFaith.quote}
                    </p>
                    <p className="text-red-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                      — {selectedFaith.quoteSource}
                    </p>
                  </div>
                </div>
              </div>

              {/* Myth Buster Section */}
              <div className="bg-gradient-to-br from-amber-950/30 to-orange-900/20 border border-amber-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-amber-400 font-bold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Myth Buster
                    </h4>
                    <p className="text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedFaith.mythBuster}
                    </p>
                  </div>
                </div>
              </div>

              {/* Compassionate Reflection */}
              <div className="bg-gradient-to-br from-purple-950/30 to-pink-900/20 border border-purple-500/20 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-purple-400 font-bold text-lg mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      A Compassionate Reflection
                    </h4>
                    <p className="text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedFaith.reflection}
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent my-6" />

              {/* Detailed content */}
              <p className="text-gray-400 text-base leading-relaxed text-center mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                {selectedFaith.details}
              </p>

              {/* Close button */}
              <button
                onClick={() => setSelectedFaith(null)}
                className={`w-full py-4 px-8 bg-gradient-to-r ${selectedFaith.color} text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30`}
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}