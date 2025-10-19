"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, Plus, Paperclip, Mic, Sparkles, Calendar, Heart, Activity, BookOpen, Droplets, Brain, Copy, Check, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function MenstruationChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [typingText, setTypingText] = useState('');
  const [fullResponseText, setFullResponseText] = useState('');
  const messagesEndRef = useRef(null);

  const router = useRouter();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const recentChats = [
    "When is my next period?",
    "How to manage cramps?",
    "Period tracking tips",
    "Understanding my cycle",
    "What are ovulation symptoms?",
    "Best foods during period",
    "Menstrual cup vs tampons",
    "PMS mood management"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (fullResponseText && typingText.length < fullResponseText.length) {
      const timeout = setTimeout(() => {
        setTypingText(fullResponseText.slice(0, typingText.length + 5));
      }, 10);
      return () => clearTimeout(timeout);
    } else if (fullResponseText && typingText.length === fullResponseText.length && fullResponseText.length > 0) {
      // Typing complete, update the actual message
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        updated[lastIndex] = {
          ...updated[lastIndex],
          text: fullResponseText,
          isTyping: false,
          isComplete: true
        };
        return updated;
      });
      setFullResponseText('');
      setTypingText('');
      setIsTyping(false);
    }
  }, [typingText, fullResponseText]);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const getDisplayName = () => {
    if (user && user.name) {
      return user.name.split(' ')[0];
    }
    return 'User';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Simple markdown parser
  const parseMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentList = null;
    let listItems = [];
    let codeBlock = null;
    let codeLines = [];

    const flushList = () => {
      if (currentList && listItems.length > 0) {
        elements.push({
          type: currentList,
          items: [...listItems]
        });
        listItems = [];
        currentList = null;
      }
    };

    const flushCodeBlock = () => {
      if (codeBlock && codeLines.length > 0) {
        elements.push({
          type: 'code',
          language: codeBlock,
          content: codeLines.join('\n')
        });
        codeLines = [];
        codeBlock = null;
      }
    };

    lines.forEach((line, index) => {
      // Code blocks
      if (line.trim().startsWith('```')) {
        if (codeBlock) {
          flushCodeBlock();
        } else {
          flushList();
          codeBlock = line.trim().slice(3) || 'text';
        }
        return;
      }

      if (codeBlock) {
        codeLines.push(line);
        return;
      }

      // Headers
      if (line.startsWith('# ')) {
        flushList();
        elements.push({ type: 'h1', content: line.slice(2) });
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push({ type: 'h2', content: line.slice(3) });
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push({ type: 'h3', content: line.slice(4) });
      }
      // Unordered lists
      else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        if (currentList !== 'ul') {
          flushList();
          currentList = 'ul';
        }
        listItems.push(line.trim().slice(2));
      }
      // Ordered lists
      else if (/^\d+\.\s/.test(line.trim())) {
        if (currentList !== 'ol') {
          flushList();
          currentList = 'ol';
        }
        listItems.push(line.trim().replace(/^\d+\.\s/, ''));
      }
      // Blockquotes
      else if (line.trim().startsWith('> ')) {
        flushList();
        elements.push({ type: 'blockquote', content: line.trim().slice(2) });
      }
      // Horizontal rule
      else if (line.trim() === '---' || line.trim() === '***') {
        flushList();
        elements.push({ type: 'hr' });
      }
      // Regular paragraph
      else if (line.trim()) {
        flushList();
        elements.push({ type: 'p', content: line });
      }
      // Empty line
      else {
        flushList();
      }
    });

    flushList();
    flushCodeBlock();

    return elements;
  };

  // Format inline markdown (bold, italic, code, links)
  const formatInline = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    const patterns = [
      { regex: /\*\*(.+?)\*\*/g, component: 'strong' },
      { regex: /\*(.+?)\*/g, component: 'em' },
      { regex: /`(.+?)`/g, component: 'code' },
      { regex: /\[(.+?)\]\((.+?)\)/g, component: 'link' }
    ];

    while (remaining) {
      let earliestMatch = null;
      let earliestIndex = Infinity;
      let matchedPattern = null;

      patterns.forEach(pattern => {
        pattern.regex.lastIndex = 0;
        const match = pattern.regex.exec(remaining);
        if (match && match.index < earliestIndex) {
          earliestMatch = match;
          earliestIndex = match.index;
          matchedPattern = pattern;
        }
      });

      if (!earliestMatch) {
        parts.push(<span key={key++}>{remaining}</span>);
        break;
      }

      if (earliestIndex > 0) {
        parts.push(<span key={key++}>{remaining.slice(0, earliestIndex)}</span>);
      }

      if (matchedPattern.component === 'strong') {
        parts.push(<strong key={key++} className="font-semibold text-white">{earliestMatch[1]}</strong>);
      } else if (matchedPattern.component === 'em') {
        parts.push(<em key={key++} className="italic text-gray-200">{earliestMatch[1]}</em>);
      } else if (matchedPattern.component === 'code') {
        parts.push(<code key={key++} className="bg-red-950/40 text-red-300 px-1.5 py-0.5 rounded text-sm font-mono">{earliestMatch[1]}</code>);
      } else if (matchedPattern.component === 'link') {
        parts.push(
          <a key={key++} href={earliestMatch[2]} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">
            {earliestMatch[1]}
          </a>
        );
      }

      remaining = remaining.slice(earliestIndex + earliestMatch[0].length);
    }

    return parts;
  };

  const renderMarkdown = (text) => {
    const elements = parseMarkdown(text);
    
    return elements.map((element, index) => {
      switch (element.type) {
        case 'h1':
          return <h1 key={index} className="text-2xl font-bold mb-4 text-white mt-2">{formatInline(element.content)}</h1>;
        case 'h2':
          return <h2 key={index} className="text-xl font-bold mb-3 text-white mt-4">{formatInline(element.content)}</h2>;
        case 'h3':
          return <h3 key={index} className="text-lg font-semibold mb-2 text-white mt-3">{formatInline(element.content)}</h3>;
        case 'p':
          return <p key={index} className="mb-3 leading-relaxed text-gray-100">{formatInline(element.content)}</p>;
        case 'ul':
          return (
            <ul key={index} className="list-disc list-inside mb-3 space-y-1.5 ml-2">
              {element.items.map((item, i) => (
                <li key={i} className="text-gray-100 leading-relaxed">{formatInline(item)}</li>
              ))}
            </ul>
          );
        case 'ol':
          return (
            <ol key={index} className="list-decimal list-inside mb-3 space-y-1.5 ml-2">
              {element.items.map((item, i) => (
                <li key={i} className="text-gray-100 leading-relaxed">{formatInline(item)}</li>
              ))}
            </ol>
          );
        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-red-600 pl-4 py-2 my-3 bg-red-950/20 rounded-r text-gray-100">
              {formatInline(element.content)}
            </blockquote>
          );
        case 'code':
          return (
            <div key={index} className="relative my-4 rounded-lg overflow-hidden">
              <div className="bg-zinc-800 px-4 py-2 text-xs text-zinc-400 flex items-center justify-between">
                <span>{element.language}</span>
                <button
                  onClick={() => copyToClipboard(element.content, `code-${index}`)}
                  className="hover:text-white transition-colors"
                >
                  {copiedIndex === `code-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <pre className="bg-zinc-900 p-4 overflow-x-auto">
                <code className="text-sm text-gray-100 font-mono">{element.content}</code>
              </pre>
            </div>
          );
        case 'hr':
          return <hr key={index} className="my-4 border-red-900/30" />;
        default:
          return null;
      }
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Add placeholder message for typing animation
    const placeholderId = Date.now() + 1;
    setMessages(prev => [...prev, { id: placeholderId, text: '', sender: 'ai', isTyping: true }]);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          message: currentInput,
          history: messages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          })),
          userName: user?.name || null,
          userEmail: user?.email || null
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('AI Response:', data);
      
      const responseText = data.reply || data.response || "I'm here to help you with your menstrual health questions.";
      
      // Start typing animation
      setFullResponseText(responseText);
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
      setFullResponseText(errorMessage);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a0f] to-[#0f0a0f] text-white relative overflow-hidden">
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-red-900/20 via-red-950/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-rose-900/20 via-red-950/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <motion.div
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0 }}
        className="relative bg-black/40 backdrop-blur-xl border-r border-red-900/20 flex-shrink-0 overflow-hidden z-10"
      >
        <div className="w-[280px] h-full flex flex-col">
          <div className="p-4 border-b border-red-900/20">
            <div className="flex items-center mb-4 gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="Nirva" className="w-8 h-8" />
              </div>
              <span className="font-semibold">Noor AI</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-950/30 hover:bg-red-950/40 backdrop-blur-sm border border-red-900/30 rounded-lg px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </motion.button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-xs text-zinc-500 px-3 py-2 font-medium">
              Recents
            </div>
            <div className="space-y-1">
              <motion.div
                whileHover={{ backgroundColor: "rgba(127, 29, 29, 0.2)" }}
                className="px-3 py-2.5 rounded-lg text-sm cursor-pointer bg-red-950/20 backdrop-blur-sm border border-red-900/20"
              >
                New Chat
              </motion.div>
              {recentChats.map((chat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ backgroundColor: "rgba(127, 29, 29, 0.2)" }}
                  className="px-3 py-2.5 rounded-lg text-sm text-zinc-400 cursor-pointer transition-colors"
                >
                  {chat}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-red-900/20 space-y-3">
            {!isLoadingUser && (
              <div className="flex items-center gap-3 px-2">
                {user ? (
                  <>
                    <div className="w-8 h-8 rounded-full ring-2 ring-red-900/30 bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-zinc-500 truncate">
                        {user.email}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anonymous"
                      alt="User"
                      className="w-8 h-8 rounded-full ring-2 ring-red-900/30"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Anonymous</div>
                      <div className="text-xs text-zinc-500">Guest User</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col relative z-10">
        <div className="border-b border-red-900/20 bg-black/20 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-red-950/30 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold">Noor AI</h1>
              <p className="text-xs text-zinc-500">Your Health Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/')} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
              Home
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg text-sm font-medium shadow-lg shadow-red-900/30"
            >
              Get Products
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-3">
                  {getGreeting()},{" "}
                  <span className="text-zinc-400">{getDisplayName()}</span>
                </h2>
                <p className="text-zinc-500 text-sm">
                  Welcome to your AI-powered Menstrual Health Assistant. How can
                  I help you today?
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Calendar,
                    title: "Track Your Cycle",
                    desc: "Monitor your menstrual cycle with AI-powered predictions and personalized insights.",
                    color: "red",
                  },
                  {
                    icon: Activity,
                    title: "Symptom Analysis",
                    desc: "Get instant help understanding and managing your period symptoms effectively.",
                    color: "rose",
                  },
                  {
                    icon: BookOpen,
                    title: "Health Education",
                    desc: "Learn about menstrual health, wellness tips, and best practices for self-care.",
                    color: "pink",
                  },
                  {
                    icon: Droplets,
                    title: "Flow Tracker",
                    desc: "Log your flow patterns and receive personalized recommendations for products.",
                    color: "red",
                  },
                  {
                    icon: Brain,
                    title: "Mood Insights",
                    desc: "Understand hormonal changes and get tips for emotional wellness support.",
                    color: "rose",
                  },
                  {
                    icon: Heart,
                    title: "Wellness Guide",
                    desc: "Get personalized nutrition, exercise, and lifestyle recommendations.",
                    color: "pink",
                  },
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-red-950/30 via-black/20 to-transparent backdrop-blur-xl border border-red-900/20 rounded-2xl p-5 cursor-pointer group hover:border-red-700/40 transition-all shadow-xl"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600/30 to-rose-600/30 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <card.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{card.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {card.desc}
                    </p>
                    <div className="mt-4 text-xs text-zinc-600 group-hover:text-red-400 transition-colors">
                      Learn More →
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex gap-3 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "ai" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center shadow-lg">
                        <img
                          src="/logo.png"
                          alt="Nirva"
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}

                    <div
                      className={`flex-1 max-w-[85%] ${
                        message.sender === "user" ? "flex justify-end" : ""
                      }`}
                    >
                      <div
                        className={`${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-red-600 to-rose-600 text-white px-5 py-3 rounded-2xl shadow-lg shadow-red-900/30"
                            : `bg-red-950/20 backdrop-blur-xl border border-red-900/20 px-5 py-4 rounded-2xl ${
                                message.isTyping && !typingText ? "w-fit" : ""
                              }`
                        }`}
                      >
                        {message.sender === "user" ? (
                          <p className="text-white leading-relaxed">
                            {message.text}
                          </p>
                        ) : message.isTyping ? (
                          typingText ? (
                            <div className="prose prose-invert max-w-none">
                              {renderMarkdown(typingText)}
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              <motion.div
                                className="w-2 h-2 bg-red-400 rounded-full"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: 0,
                                }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-rose-400 rounded-full"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: 0.2,
                                }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-pink-400 rounded-full"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{
                                  duration: 0.6,
                                  repeat: Infinity,
                                  delay: 0.4,
                                }}
                              />
                            </div>
                          )
                        ) : (
                          <div className="prose prose-invert max-w-none">
                            {renderMarkdown(message.text)}
                          </div>
                        )}
                      </div>

                      {message.sender === "ai" && message.isComplete && (
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            className="p-1.5 hover:bg-red-950/30 rounded-lg transition-colors"
                            title="Like"
                          >
                            <ThumbsUp className="w-4 h-4 text-zinc-500 hover:text-green-400" />
                          </button>
                          <button
                            className="p-1.5 hover:bg-red-950/30 rounded-lg transition-colors"
                            title="Dislike"
                          >
                            <ThumbsDown className="w-4 h-4 text-zinc-500 hover:text-red-400" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(message.text, index)}
                            className="p-1.5 hover:bg-red-950/30 rounded-lg transition-colors"
                            title="Copy message"
                          >
                            {copiedIndex === index ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-zinc-500 hover:text-blue-400" />
                            )}
                          </button>
                          <button
                            className="p-1.5 hover:bg-red-950/30 rounded-lg transition-colors"
                            title="Regenerate"
                          >
                            <RotateCcw className="w-4 h-4 text-zinc-500 hover:text-purple-400" />
                          </button>
                          <div className="ml-auto text-xs text-zinc-600">
                            Noor AI
                          </div>
                        </div>
                      )}
                    </div>

                    {message.sender === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center shadow-lg text-white font-bold text-sm">
                        {user ? getInitials(user.name) : "U"}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t border-red-900/20 bg-black/20 backdrop-blur-xl px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-950/20 via-black/40 to-transparent backdrop-blur-xl rounded-3xl border border-red-900/20 p-4 shadow-2xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about cycle tracking, symptoms, or wellness tips..."
                className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-600 mb-3"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-red-950/30 rounded-lg transition-colors">
                    <Paperclip className="w-4 h-4 text-zinc-500" />
                  </button>
                  <button className="px-3 py-2 hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-2">
                    <Mic className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500">Voice Message</span>
                  </button>
                  <button className="px-3 py-2 hover:bg-red-950/30 rounded-lg transition-colors flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500">
                      Browse Prompts
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-600">
                    {input.length}/3,000
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 rounded-lg transition-all shadow-lg shadow-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-zinc-600 mt-3">
              AI may generate inaccurate information. Always consult healthcare
              professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}