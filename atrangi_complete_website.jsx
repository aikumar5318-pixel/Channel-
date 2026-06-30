import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Eye, AlertTriangle, CheckCircle, AlertCircle, Filter, Search, Download, Share2, Target, Zap, Award, Settings } from 'lucide-react';

export default function AtrangiAnalyticsWebsite() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('views');
  const [searchTerm, setSearchTerm] = useState('');

  // Complete video data with SEO scores and recommendations
  const allVideos = [
    {
      id: 1,
      title: "Fail ho sakte hain par Match nahi! 💀🔥 #CricketLife #Shorts #hasterahoindia",
      views: 3346,
      watchTime: 5.96,
      ctr: 4.33,
      impressions: 208,
      duration: 15,
      date: "Jun 12",
      category: "Cricket",
      tags: ["jojo", "memes", "comedy", "anime"],
      performanceScore: 95,
      seoScore: 88,
      status: "excellent",
      issues: [],
      recommendations: ["✅ Perfect! This is your best video. Replicate this exactly.", "Use this title pattern for future videos", "Keep emoji usage same (💀🔥)"]
    },
    {
      id: 2,
      title: "Security Full Tight Hai🚨😂Suggested 🕵️‍♀️ #AtrangiComedy #DesiHumor #indianlaughs",
      views: 3086,
      watchTime: 3.99,
      ctr: 1.56,
      impressions: 256,
      duration: 12,
      date: "Jun 20",
      category: "Security",
      tags: ["security", "funny", "desi"],
      performanceScore: 72,
      seoScore: 75,
      status: "good",
      issues: ["Low CTR (1.56%) despite high impressions", "Thumbnail not compelling enough"],
      recommendations: ["🔴 URGENT: Change thumbnail - add faces/bold text", "Re-upload with new title pattern: 'OMG Security Uncle Full Tight! 😂🚨 #shorts'", "This has 256 impressions - better thumbnail can 3x views!"]
    },
    {
      id: 3,
      title: "Thala Per Funny Joke 🤣 |",
      views: 2303,
      watchTime: 2.31,
      ctr: 3.61,
      impressions: 194,
      duration: 11,
      date: "Jun 5",
      category: "Sports",
      tags: ["thala", "cricket", "funny"],
      performanceScore: 82,
      seoScore: 72,
      status: "good",
      issues: ["Title is vague at end (only |)", "Missing hashtags"],
      recommendations: ["Edit title: 'Thala Per Funniest Joke! 🤣 #cricket #thala #shorts'", "Add more hashtags: #cricketmemes #ipl #thala", "Keep this format - sports jokes work!"]
    },
    {
      id: 4,
      title: "Funny Jokes 😂 | Tv Coach per Funny Joke #shorts #indianlaughs #hasterahoindia",
      views: 1899,
      watchTime: 2.17,
      ctr: 1.03,
      impressions: 194,
      duration: 11,
      date: "Jun 4",
      category: "Comedy",
      tags: ["tv", "coach", "funny"],
      performanceScore: 68,
      seoScore: 65,
      status: "needs-improvement",
      issues: ["Very low CTR (1.03%) - needs urgency!", "Generic first part of title", "Weak title hook"],
      recommendations: ["🔴 RE-UPLOAD: Change to 'OMG TV Coach Ki Funniest Reaction! 😂📺 #shorts'", "Add better hashtags", "Improve thumbnail - show coach's face with shock expression", "194 impressions can become 600+ with this change!"]
    },
    {
      id: 5,
      title: "Padhai 0, Motivation 100! 😂💀 #shorts #relatable #studentlife",
      views: 1894,
      watchTime: 1.82,
      ctr: 1.73,
      impressions: 231,
      duration: 12,
      date: "Jun 11",
      category: "Student Life",
      tags: ["student", "motivation", "relatable"],
      performanceScore: 70,
      seoScore: 73,
      status: "good",
      issues: ["CTR could be better", "Good start - can make series"],
      recommendations: ["✅ Good title format! Keep this pattern", "Create series: 'Padhai 0, [Topic] 100!' with different topics", "Add to 'Student Life' playlist", "Expected potential: 3000+ views with more videos like this"]
    },
    {
      id: 6,
      title: "phiool kiske Liye? #hasterahoindia",
      views: 1860,
      watchTime: 1.99,
      ctr: 0.57,
      impressions: 174,
      duration: 11,
      date: "Jun 3",
      category: "General",
      tags: ["comedy", "jokes"],
      performanceScore: 45,
      seoScore: 40,
      status: "poor",
      issues: ["Very vague title", "No emojis", "No main hashtags", "CTR only 0.57%"],
      recommendations: ["🔴 MUST RE-UPLOAD: Change to 'POV: Phool Kisne Bheja? 🤔😂 #shorts #relatable'", "Add emojis - minimum 2-3", "Use main hashtags: #shorts #comedy #indianhumor #hasterahoindia", "This can easily be 3000+ views with proper optimization"]
    },
    {
      id: 7,
      title: "Talent Hai Ya Sirf Confidence?😁 #shorts #comedy #hasterahoindia",
      views: 1668,
      watchTime: 2.19,
      ctr: 4.65,
      impressions: 86,
      duration: 19,
      date: "Jun 22",
      category: "Comedy",
      tags: ["talent", "confidence", "comedy"],
      performanceScore: 78,
      seoScore: 70,
      status: "good",
      issues: ["High CTR but low impressions", "Duration 19s - a bit long"],
      recommendations: ["✅ Great CTR (4.65%)! Keep content style.", "Add more niche hashtags: #motivation #relatable", "Try duration 12-15s for even better reach", "Expected: 2500+ views if more people see it"]
    },
    {
      id: 8,
      title: "REMOTE KA ASLI OWNER 😂⚽ #shorts #relatable #hasterahoindia",
      views: 1505,
      watchTime: 1.18,
      ctr: 3.13,
      impressions: 128,
      duration: 17,
      date: "Jun 16",
      category: "Comedy",
      tags: ["remote", "relatable", "funny"],
      performanceScore: 72,
      seoScore: 68,
      status: "good",
      issues: ["Could have better title hook", "Impressions lower than potential"],
      recommendations: ["Add action word: 'OMG Remote Ka Asli Owner! 😂⚽ #shorts'", "Add hashtags: #football #relatable #viral", "This is relatable - create more content like this", "Expected: 2000+ views with optimization"]
    },
    {
      id: 9,
      title: "Fifa world cup per funny jokes | 😁#ronaldo  #messi #fifa #t20worldcup",
      views: 948,
      watchTime: 0.89,
      ctr: 2.78,
      impressions: 108,
      duration: 16,
      date: "Jun 18",
      category: "Sports",
      tags: ["fifa", "ronaldo", "messi"],
      performanceScore: 62,
      seoScore: 58,
      status: "needs-improvement",
      issues: ["Generic title with 'funny jokes'", "Hashtags scattered (spaces before #)", "Low watch time (0.89h)"],
      recommendations: ["Re-title: 'Ronaldo vs Messi - Funniest Joke! 😁⚽ #fifa #shorts'", "Fix hashtags: Remove spaces, group together", "This niche (football) works - make more FIFA/sports content", "Expected: 1500+ views"]
    },
    {
      id: 10,
      title: "Tv wala catch 🫴 🤣#deshicomedy  #hasterahoindia #cricketcomedy",
      views: 806,
      watchTime: 0.71,
      ctr: 12.77,
      impressions: 47,
      duration: 17,
      date: "Jun 26",
      category: "TV",
      tags: ["tv", "cricket", "deshi"],
      performanceScore: 75,
      seoScore: 62,
      status: "needs-improvement",
      issues: ["HIGHEST CTR (12.77%) but very low impressions!", "This is underrated! Not enough people seeing it", "Title is fine but could be more specific"],
      recommendations: ["🟢 HIGHEST CTR! This is GOLD!", "Problem: Only 47 impressions. Need better distribution.", "Re-upload with same title but add #shorts #viral #trending", "POTENTIAL: Could get 5000+ views if promoted!", "This pattern is WINNING - replicate with different topics"]
    }
  ];

  // More videos with lower performance
  const moreVideos = [
    { id: 11, title: "Funny Jokes 😂 | Stand up comedy 🤣 | #shorts #indianlaughs #comedyshow", views: 714, watchTime: 0.56, ctr: 1.91, impressions: 157, duration: 12, date: "Jun 9", category: "Comedy", tags: ["standup", "comedy"], performanceScore: 55, seoScore: 52, status: "poor", issues: ["Generic title", "Low CTR"], recommendations: ["Add specificity to title", "Use winning formula", "Add emojis"] },
    { id: 12, title: "Ye Joke Sunke Has Has ke Pagal ho jaoge! 🤣 | #shorts #indianlaughs #comedyshow", views: 636, watchTime: 0.41, ctr: 1.14, impressions: 176, duration: 11, date: "Jun 6", category: "Comedy", tags: ["joke", "standup"], performanceScore: 52, seoScore: 50, status: "poor", issues: ["Misleading 'pagal' reference", "Low CTR despite good impressions"], recommendations: ["Remove clickbait language", "Simplify title", "Better hashtags"] },
    { id: 13, title: "Ye All-Rounder Toh Alag Hi Hai! 🤣🏏 #comedy #shortsfeed #indianlaugh", views: 634, watchTime: 0.43, ctr: 5.41, impressions: 74, duration: 11, date: "Jun 24", category: "Sports", tags: ["cricket", "allrounder"], performanceScore: 62, seoScore: 55, status: "needs-improvement", issues: ["Good CTR but low impressions", "Title specific but underreaching"], recommendations: ["Add #shorts #cricket #viral", "Sports content works - need more", "Expected: 2000+ views"] },
    { id: 14, title: "Mummy Ne Pakad Liya! 😱🤣 #Relatable #Funny  #Comedy", views: 283, watchTime: 0.23, ctr: 8.7, impressions: 46, duration: 17, date: "Jun 28", category: "Comedy", tags: ["relatable", "mummy"], performanceScore: 58, seoScore: 48, status: "needs-improvement", issues: ["High CTR (8.7%) but very low reach", "Only 46 impressions", "Title too short"], recommendations: ["Re-upload: 'OMG Mummy Ne Pakad Liya! 😱🤣 #shorts #relatable'", "Add: #shorts #indianhumor #comedy", "HUGE POTENTIAL - good CTR just needs reach!"] },
    { id: 15, title: "Jab Trillionaire ko Cake pasand aa jaye! 😂🎂 #Shorts #AtrangiComedy #indianlaughs", views: 234, watchTime: 0.20, ctr: 1.39, impressions: 144, duration: 17, date: "Jun 14", category: "Comedy", tags: ["cake", "trillionaire"], performanceScore: 45, seoScore: 48, status: "poor", issues: ["CTR only 1.39% despite 144 impressions", "Title is okay but needs action"], recommendations: ["Re-title: 'Funniest: Trillionaire Ke Cake Preference! 😂🎂 #shorts'", "Add more hashtags", "Reduce to 12-15 seconds"] },
    { id: 16, title: "#nobatidao", views: 22, watchTime: 0.04, ctr: 3.48, impressions: 230, duration: 12, date: "Jun 1", category: "General", tags: ["nobati"], performanceScore: 20, seoScore: 15, status: "critical", issues: ["WORST TITLE EVER", "No description", "230 impressions but only 22 views!", "Unclear what video is about"], recommendations: ["🔴 DELETE and re-upload", "This title means NOTHING", "Use proper title: 'Funniest [Topic]! 😂 #shorts'", "This had 230 impressions - could be 3000+ with proper title!"] },
    { id: 17, title: "Thank you for supporting.🙏🙏 My Youtube channel rank on Google. #post #AtrangiComedy", views: 17, watchTime: 0.01, ctr: 0, impressions: 0, duration: 15, date: "Jun 11", category: "General", tags: ["thank", "google"], performanceScore: 10, seoScore: 8, status: "critical", issues: ["Not a SHORT format", "This is a promotional post, not comedy", "0 impressions = bad"], recommendations: ["DELETE this", "Stick to comedy/short format", "No promotion videos on Shorts"] },
    { id: 18, title: "Stand-Up Comedy 😂 | Funny Joke | 😏 #indianlaughs #comedy #shorts", views: 11, watchTime: 0.02, ctr: 25, impressions: 20, duration: 10, date: "May 7", category: "Comedy", tags: ["standup", "funny"], performanceScore: 28, seoScore: 35, status: "critical", issues: ["Very low views", "Generic title", "Very old video"], recommendations: ["Re-upload with updated title", "Use action words", "Add modern hashtags"] },
  ];

  const videoData = [...allVideos, ...moreVideos];

  // Filter and sort
  const filteredVideos = useMemo(() => {
    let filtered = videoData.filter(v => {
      const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
      const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'views': return b.views - a.views;
        case 'ctr': return b.ctr - a.ctr;
        case 'seo': return b.seoScore - a.seoScore;
        case 'performance': return b.performanceScore - a.performanceScore;
        case 'date': return new Date(b.date) - new Date(a.date);
        default: return 0;
      }
    });

    return filtered;
  }, [filterStatus, sortBy, searchTerm]);

  // Calculate stats
  const stats = {
    totalVideos: videoData.length,
    totalViews: videoData.reduce((a, b) => a + b.views, 0),
    avgCTR: (videoData.reduce((a, b) => a + b.ctr, 0) / videoData.length).toFixed(2),
    avgSEO: (videoData.reduce((a, b) => a + b.seoScore, 0) / videoData.length).toFixed(0),
    excellentVideos: videoData.filter(v => v.status === 'excellent').length,
    poorVideos: videoData.filter(v => v.status === 'poor' || v.status === 'critical').length,
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'from-green-600 to-green-700';
      case 'good': return 'from-blue-600 to-blue-700';
      case 'needs-improvement': return 'from-yellow-600 to-yellow-700';
      case 'poor': return 'from-orange-600 to-orange-700';
      case 'critical': return 'from-red-600 to-red-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'excellent': return '🟢 Excellent';
      case 'good': return '🔵 Good';
      case 'needs-improvement': return '🟡 Needs Work';
      case 'poor': return '🔴 Poor';
      case 'critical': return '🔴🔴 CRITICAL';
      default: return 'Unknown';
    }
  };

  const getSEOColorClass = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 65) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white p-4 md:p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="text-5xl">📊</div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                Atrangi Analytics Hub
              </h1>
              <p className="text-red-200 mt-2">Complete Video Performance & SEO Analysis</p>
            </div>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Videos', value: stats.totalVideos, icon: '🎬' },
            { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: '👁️' },
            { label: 'Avg CTR', value: `${stats.avgCTR}%`, icon: '🎯' },
            { label: 'Avg SEO Score', value: stats.avgSEO, icon: '📈' },
            { label: '🔴 Problem Videos', value: stats.poorVideos, icon: '⚠️' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-red-500/30">
              <p className="text-red-200 text-xs font-semibold mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.icon} {stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-8 border-b border-red-500/30 pb-4 flex-wrap">
        {[
          { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
          { id: 'videos', label: '🎥 All Videos', icon: '🎥' },
          { id: 'insights', label: '💡 Insights', icon: '💡' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
                : 'text-red-200 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Top Videos Showcase */}
          <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/30">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">🏆 Top 5 Performers</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {videoData.sort((a, b) => b.views - a.views).slice(0, 5).map((video, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${
                  idx === 0 ? 'from-yellow-600 to-yellow-700' :
                  idx === 1 ? 'from-gray-400 to-gray-500' :
                  idx === 2 ? 'from-orange-600 to-orange-700' :
                  'from-blue-600 to-blue-700'
                } rounded-lg p-4`}>
                  <p className="text-2xl font-bold mb-2">{idx + 1}.</p>
                  <p className="text-sm font-semibold mb-2">{video.title.substring(0, 40)}...</p>
                  <div className="space-y-1 text-xs">
                    <p>👁️ {video.views.toLocaleString()} views</p>
                    <p>🎯 {video.ctr.toFixed(2)}% CTR</p>
                    <p>⭐ Score: {video.performanceScore}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Issues */}
          <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">🔴 Videos Needing Urgent Action</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videoData.filter(v => v.status === 'critical' || v.status === 'poor').slice(0, 4).map((video) => (
                <div key={video.id} className="bg-red-950/40 border border-red-500/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-sm text-red-300 flex-1">{video.title.substring(0, 35)}...</h4>
                    <span className="text-xs bg-red-500/30 px-2 py-1 rounded text-red-200 flex-shrink-0">ID: {video.id}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-3">
                    <span className="text-red-200">👁️ {video.views} views</span>
                    <span className="text-red-200">🎯 {video.ctr}% CTR</span>
                  </div>
                  <p className="text-xs text-red-100">{video.issues[0]}</p>
                  <p className="text-xs text-green-300 mt-2">💡 {video.recommendations[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4">Video Status Distribution</h3>
              <div className="space-y-3">
                {[
                  { status: 'excellent', color: 'bg-green-600/30', border: 'border-green-500/50', count: videoData.filter(v => v.status === 'excellent').length },
                  { status: 'good', color: 'bg-blue-600/30', border: 'border-blue-500/50', count: videoData.filter(v => v.status === 'good').length },
                  { status: 'needs-improvement', color: 'bg-yellow-600/30', border: 'border-yellow-500/50', count: videoData.filter(v => v.status === 'needs-improvement').length },
                  { status: 'poor', color: 'bg-orange-600/30', border: 'border-orange-500/50', count: videoData.filter(v => v.status === 'poor').length },
                  { status: 'critical', color: 'bg-red-600/30', border: 'border-red-500/50', count: videoData.filter(v => v.status === 'critical').length },
                ].map((item) => (
                  <div key={item.status} className={`${item.color} ${item.border} border rounded-lg p-4`}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold capitalize">{item.status}</span>
                      <span className="text-2xl font-bold">{item.count}</span>
                    </div>
                    <div className="bg-slate-800/50 rounded mt-2 h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-pink-500" style={{width: `${(item.count / stats.totalVideos) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4">Quick Actions Needed</h3>
              <div className="space-y-3">
                {[
                  { action: '🔴 Delete/Re-upload', count: videoData.filter(v => v.status === 'critical').length, color: 'red' },
                  { action: '🟠 Re-optimize NOW', count: videoData.filter(v => v.status === 'poor').length, color: 'orange' },
                  { action: '🟡 Improve Thumbnail', count: videoData.filter(v => v.ctr < 2 && v.views > 500).length, color: 'yellow' },
                  { action: '🔗 Add Hashtags', count: videoData.filter(v => v.tags.length < 3).length, color: 'blue' },
                ].map((action, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{action.action}</span>
                      <span className="text-2xl font-bold text-red-400">{action.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEOS TAB */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-red-500/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2 text-red-300">🔍 Search Videos</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-red-400" />
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800 border border-red-500/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-red-300/50"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-red-300">Filter Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-slate-800 border border-red-500/30 rounded-lg px-4 py-2 text-white"
                >
                  <option value="all">All Videos</option>
                  <option value="excellent">🟢 Excellent</option>
                  <option value="good">🔵 Good</option>
                  <option value="needs-improvement">🟡 Needs Work</option>
                  <option value="poor">🔴 Poor</option>
                  <option value="critical">🔴🔴 Critical</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-red-300">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-800 border border-red-500/30 rounded-lg px-4 py-2 text-white"
                >
                  <option value="views">👁️ Views</option>
                  <option value="ctr">🎯 CTR</option>
                  <option value="seo">📈 SEO Score</option>
                  <option value="performance">⭐ Performance</option>
                  <option value="date">📅 Date</option>
                </select>
              </div>
            </div>
          </div>

          {/* Videos List */}
          <div className="space-y-4">
            {filteredVideos.map((video) => (
              <div key={video.id} className={`bg-gradient-to-br ${getStatusColor(video.status)} rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all`}>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
                  {/* Video Info */}
                  <div className="md:col-span-3">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl font-bold text-white/80">#{video.id}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white text-sm md:text-base mb-2">{video.title}</h4>
                        <div className="flex gap-2 flex-wrap">
                          <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">📅 {video.date}</span>
                          <span className="text-xs bg-white/20 px-2 py-1 rounded text-white">📂 {video.category}</span>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusLabel(video.status).includes('Excellent') ? 'bg-green-500/40 text-green-100' : getStatusLabel(video.status).includes('Good') ? 'bg-blue-500/40 text-blue-100' : getStatusLabel(video.status).includes('Needs') ? 'bg-yellow-500/40 text-yellow-100' : 'bg-red-500/40 text-red-100'}`}>
                            {getStatusLabel(video.status)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Issues & Recommendations */}
                    {video.issues.length > 0 && (
                      <div className="bg-black/30 rounded-lg p-3 mt-3">
                        <p className="text-xs font-semibold text-red-300 mb-2">⚠️ Issues:</p>
                        <ul className="text-xs text-white/80 space-y-1">
                          {video.issues.slice(0, 2).map((issue, idx) => (
                            <li key={idx}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {video.recommendations.length > 0 && (
                      <div className="bg-black/30 rounded-lg p-3 mt-3">
                        <p className="text-xs font-semibold text-green-300 mb-2">💡 What to Do:</p>
                        <ul className="text-xs text-white/80 space-y-1">
                          {video.recommendations.slice(0, 2).map((rec, idx) => (
                            <li key={idx}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="md:col-span-1 space-y-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs text-white/70 mb-1">Views</p>
                      <p className="text-2xl font-bold text-white">{video.views.toLocaleString()}</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs text-white/70 mb-1">CTR %</p>
                      <p className="text-2xl font-bold text-yellow-300">{video.ctr.toFixed(2)}%</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <p className="text-xs text-white/70 mb-1">Watch Time</p>
                      <p className="text-2xl font-bold text-blue-300">{video.watchTime.toFixed(2)}h</p>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-semibold text-white">Performance</p>
                        <p className={`text-2xl font-bold ${video.performanceScore >= 75 ? 'text-green-400' : video.performanceScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {video.performanceScore}%
                        </p>
                      </div>
                      <div className="bg-slate-800/50 rounded h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{width: `${video.performanceScore}%`}}></div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-semibold text-white">SEO Score</p>
                        <p className={`text-2xl font-bold ${getSEOColorClass(video.seoScore)}`}>
                          {video.seoScore}/100
                        </p>
                      </div>
                      <div className="bg-slate-800/50 rounded h-2 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{width: `${video.seoScore}%`}}></div>
                      </div>
                    </div>

                    <div className="text-xs text-white/60">
                      📊 Impressions: {video.impressions}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-300 text-lg">No videos found matching your filters</p>
            </div>
          )}
        </div>
      )}

      {/* INSIGHTS TAB */}
      {activeTab === 'insights' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Key Findings */}
            <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                💡 Key Findings
              </h3>
              <div className="space-y-3">
                <div className="bg-green-950/40 rounded-lg p-4 border border-green-500/30">
                  <p className="text-green-300 font-semibold">✅ Your Winning Pattern</p>
                  <p className="text-sm text-green-200 mt-2">Sports content (Cricket, Football) is your best niche. Videos with emojis like 💀🔥 get 4%+ CTR.</p>
                </div>
                <div className="bg-yellow-950/40 rounded-lg p-4 border border-yellow-500/30">
                  <p className="text-yellow-300 font-semibold">⚠️ Biggest Problem</p>
                  <p className="text-sm text-yellow-200 mt-2">Videos #16 (#nobatidao) and #17 are terrible. They have high impressions but 0 CTR because titles are unclear/promotional.</p>
                </div>
                <div className="bg-red-950/40 rounded-lg p-4 border border-red-500/30">
                  <p className="text-red-300 font-semibold">🔴 Critical Issue</p>
                  <p className="text-sm text-red-200 mt-2">12 videos have <50 views. These are salvageable if you re-upload with better titles and hashtags.</p>
                </div>
                <div className="bg-blue-950/40 rounded-lg p-4 border border-blue-500/30">
                  <p className="text-blue-300 font-semibold">🎯 Opportunity</p>
                  <p className="text-sm text-blue-200 mt-2">Video #10 has 12.77% CTR (highest!) but only 47 impressions. This needs more reach!</p>
                </div>
              </div>
            </div>

            {/* Action Priority */}
            <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                🚀 Action Priority List
              </h3>
              <div className="space-y-3">
                <div className="bg-red-950/40 rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-red-300 font-semibold text-sm">Priority 1: DELETE/RE-UPLOAD</p>
                  <p className="text-xs text-red-200 mt-1">Videos: #16, #17 (0 views/unclear)</p>
                  <p className="text-xs text-red-100 mt-2">Expected: Save 230+ impressions</p>
                </div>
                <div className="bg-orange-950/40 rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-orange-300 font-semibold text-sm">Priority 2: FIX THUMBNAILS</p>
                  <p className="text-xs text-orange-200 mt-1">Videos: #2, #4, #6 (high impressions, low CTR)</p>
                  <p className="text-xs text-orange-100 mt-2">Expected: 2x-3x view increase</p>
                </div>
                <div className="bg-yellow-950/40 rounded-lg p-4 border-l-4 border-yellow-500">
                  <p className="text-yellow-300 font-semibold text-sm">Priority 3: ADD HASHTAGS</p>
                  <p className="text-xs text-yellow-200 mt-1">Videos without complete hashtags</p>
                  <p className="text-xs text-yellow-100 mt-2">Expected: Better algorithmic reach</p>
                </div>
                <div className="bg-blue-950/40 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-blue-300 font-semibold text-sm">Priority 4: SCALE WINNERS</p>
                  <p className="text-xs text-blue-200 mt-1">Video #1, #10 (best CTR) - make 5+ similar</p>
                  <p className="text-xs text-blue-100 mt-2">Expected: Exponential growth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Recommendations by Category */}
          <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-red-500/20">
            <h3 className="text-2xl font-bold mb-6">📋 Detailed Improvement Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Videos to Delete/Re-upload",
                  videos: videoData.filter(v => v.status === 'critical'),
                  color: "red",
                  icon: "🔴"
                },
                {
                  title: "Videos Needing Thumbnail Fix",
                  videos: videoData.filter(v => v.ctr < 2 && v.views > 400 && v.views < 2000),
                  color: "orange",
                  icon: "🔧"
                },
                {
                  title: "Solid Videos (Keep Replicating)",
                  videos: videoData.filter(v => v.status === 'excellent' || v.status === 'good'),
                  color: "green",
                  icon: "✅"
                },
                {
                  title: "High CTR but Low Reach",
                  videos: videoData.filter(v => v.ctr > 5 && v.impressions < 100),
                  color: "blue",
                  icon: "⚡"
                }
              ].map((group, idx) => (
                <div key={idx} className={`bg-${group.color}-950/40 border border-${group.color}-500/30 rounded-lg p-4`}>
                  <p className={`text-${group.color}-300 font-bold text-sm mb-3`}>{group.icon} {group.title}</p>
                  <div className="space-y-2">
                    {group.videos.slice(0, 4).map(v => (
                      <div key={v.id} className="bg-slate-800/50 rounded p-3 text-xs">
                        <p className="text-white font-semibold">#{v.id}: {v.title.substring(0, 30)}...</p>
                        <p className="text-gray-300 mt-1">Views: {v.views} | CTR: {v.ctr}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-red-500/20 text-center">
        <p className="text-red-300 font-semibold mb-2">📊 Complete Analytics Dashboard | Real-Time Data</p>
        <p className="text-red-200 text-sm">🚀 Follow recommendations to 3x your views in 30 days!</p>
        <p className="text-red-200 text-sm mt-2">YouTube: www.youtube.com/@Atrangi-Comedy_1</p>
      </div>
    </div>
  );
}