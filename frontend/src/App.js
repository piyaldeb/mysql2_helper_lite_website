import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Book, Database, Shield, Sparkles, Star, Users, Zap, Gift, User, Linkedin, Mail, Code2 } from 'lucide-react';
import { allFunctions } from './functionsData';
import DocumentationPage from './Documentation';
import CreatorPage from './CreatorPage';
import Terminal from './Terminal';
import AdminDashboard from './AdminDashboard';

const API_URL =
  (typeof window !== 'undefined' && window.__MYSQL2_HELPER_API_URL__) ||
  process.env.REACT_APP_API_URL ||
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  'http://localhost:3001/api';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;600;700;800;900&display=swap');

  :root {
    color-scheme: light;
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --secondary: #8b5cf6;
    --accent: #ec4899;
    --success: #10b981;
    --warning: #f59e0b;
    --code-bg: #1e1e2e;
    --code-text: #cdd6f4;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    50% {
      transform: translateY(-20px) translateX(10px);
    }
  }

  @keyframes bubbleFloat {
    0% {
      transform: translateY(100vh) translateX(0) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 0.6;
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100px) translateX(calc(var(--bubble-x) * 1px)) scale(1);
      opacity: 0;
    }
  }

  @keyframes bubbleFloatSlow {
    0% {
      transform: translateY(100vh) translateX(0) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 0.4;
    }
    90% {
      opacity: 0.4;
    }
    100% {
      transform: translateY(-100px) translateX(calc(var(--bubble-x) * 1px)) scale(1);
      opacity: 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow:
        0 0 20px rgba(139, 92, 246, 0.3),
        0 0 40px rgba(139, 92, 246, 0.2),
        0 0 60px rgba(139, 92, 246, 0.1);
    }
    50% {
      box-shadow:
        0 0 30px rgba(139, 92, 246, 0.4),
        0 0 60px rgba(139, 92, 246, 0.3),
        0 0 90px rgba(139, 92, 246, 0.2);
    }
  }

  .bubble-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
    will-change: transform;
  }

  .bubble {
    position: absolute;
    bottom: -100px;
    border-radius: 50%;
    background: linear-gradient(135deg, 
      rgba(99, 102, 241, 0.2) 0%, 
      rgba(139, 92, 246, 0.15) 50%,
      rgba(168, 85, 247, 0.1) 100%);
    backdrop-filter: blur(50px) saturate(180%);
    -webkit-backdrop-filter: blur(50px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
      0 8px 32px rgba(99, 102, 241, 0.15),
      0 4px 16px rgba(139, 92, 246, 0.1),
      inset 0 0 30px rgba(255, 255, 255, 0.15),
      inset 0 0 60px rgba(99, 102, 241, 0.05);
    will-change: transform, opacity;
    animation-timing-function: linear;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }

  .bubble-small {
    width: 40px;
    height: 40px;
    animation: bubbleFloat 20s infinite;
    animation-delay: var(--bubble-delay);
  }

  .bubble-medium {
    width: 60px;
    height: 60px;
    animation: bubbleFloat 25s infinite;
    animation-delay: var(--bubble-delay);
  }

  .bubble-large {
    width: 80px;
    height: 80px;
    animation: bubbleFloatSlow 30s infinite;
    animation-delay: var(--bubble-delay);
  }

  .bubble-extra-large {
    width: 120px;
    height: 120px;
    animation: bubbleFloatSlow 35s infinite;
    animation-delay: var(--bubble-delay);
  }

  @media (max-width: 768px) {
    .bubble-container {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bubble {
      animation: none;
      opacity: 0;
    }
    
    .mh-card,
    .mh-stat-card,
    .mh-btn-primary,
    .mh-btn-secondary {
      transition: none;
    }
  }

  .mh-root {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    color: #1e1b4b;
    background:
      radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 80% 60%, rgba(168, 85, 247, 0.10) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(217, 70, 239, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #fae8ff 100%);
    line-height: 1.6;
    animation: fadeInUp 0.6s ease-out;
    position: relative;
    overflow-x: hidden;
    min-height: 100vh;
  }

  .mh-root::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(217, 70, 239, 0.04) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.03) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .mh-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .mh-container-wide {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  #playground .mh-container {
    max-width: 1400px;
  }

  .mh-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 9999px;
    background: rgba(148, 163, 184, 0.15);
    padding: 0.4rem 0.9rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: #e2e8f0;
  }

  .mh-hero {
    position: relative;
    overflow: hidden;
    padding: 5rem 0 6rem;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
    color: #ffffff;
    z-index: 2;
  }

  .mh-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 40%);
    pointer-events: none;
    animation: pulse 4s ease-in-out infinite;
  }

  .mh-hero::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%);
    background-size: 200% 200%;
    animation: shimmer 15s linear infinite;
  }

  .mh-hero .mh-container {
    position: relative;
    z-index: 1;
  }

  .mh-hero h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.1;
    margin-bottom: 1.25rem;
    font-weight: 900;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    animation: fadeInUp 0.8s ease-out 0.2s both;
  }

  .mh-hero p {
    max-width: 640px;
    color: rgba(226, 232, 240, 0.85);
    margin-bottom: 2rem;
  }

  .mh-highlight-grid {
    display: grid;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 640px) {
    .mh-highlight-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .mh-highlight {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(15, 23, 42, 0.5);
    border-radius: 0.9rem;
    padding: 0.9rem 1.2rem;
    font-size: 0.95rem;
  }

  .mh-highlight svg {
    flex-shrink: 0;
    color: #38bdf8;
  }

  .mh-cta-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2.5rem;
  }

  .mh-btn-primary,
  .mh-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 9999px;
    padding: 0.75rem 1.3rem;
    position: relative;
    overflow: hidden;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .mh-btn-primary {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #0f172a;
    box-shadow:
      0 8px 24px rgba(255, 255, 255, 0.3),
      0 4px 12px rgba(15, 23, 42, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    border: 1px solid rgba(255, 255, 255, 0.8);
  }

  .mh-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .mh-btn-primary:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow:
      0 16px 40px rgba(255, 255, 255, 0.4),
      0 8px 20px rgba(99, 102, 241, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .mh-btn-primary:hover::before {
    opacity: 1;
  }

  .mh-btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #f8fafc;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .mh-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .mh-content {
    padding: 4.5rem 0;
    position: relative;
    z-index: 2;
  }

  .mh-section {
    margin-bottom: 5rem;
  }

  .mh-eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18rem;
    font-weight: 700;
    font-size: 0.75rem;
    color: #2563eb;
    margin-bottom: 0.75rem;
  }

  .mh-section-title {
    text-align: center;
    margin-bottom: 2.75rem;
  }

  .mh-section-title h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: 0.75rem;
    color: #0f172a;
  }

  .mh-section-title p {
    color: #475569;
    max-width: 700px;
    margin: 0 auto;
  }

  .mh-grid {
    display: grid;
    gap: 1.75rem;
  }

  @media (min-width: 768px) {
    .mh-grid-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .mh-grid-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .mh-card {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border-radius: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow:
      0 8px 32px rgba(15, 23, 42, 0.1),
      0 2px 8px rgba(99, 102, 241, 0.05),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    will-change: transform;
  }

  .mh-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.08) 0%,
      rgba(139, 92, 246, 0.08) 50%,
      rgba(236, 72, 153, 0.06) 100%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .mh-card::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .mh-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow:
      0 24px 60px rgba(99, 102, 241, 0.2),
      0 12px 24px rgba(99, 102, 241, 0.15),
      0 0 0 1px rgba(99, 102, 241, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    border-color: rgba(99, 102, 241, 0.4);
    background: rgba(255, 255, 255, 0.9);
    animation: glow 2s ease-in-out infinite;
  }

  .mh-card:hover::before {
    opacity: 1;
  }

  .mh-card:hover::after {
    opacity: 0.5;
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.4) 0%,
      rgba(168, 85, 247, 0.3) 30%,
      rgba(217, 70, 239, 0.2) 60%,
      transparent 100%
    );
    pointer-events: none;
    animation: ripple 0.8s cubic-bezier(0, 0, 0.2, 1);
    z-index: 1;
  }

  .mh-card h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #0f172a;
  }

  .mh-card pre {
    margin-top: 1.25rem;
    border-radius: 0.9rem;
    background: var(--code-bg);
    color: var(--code-text);
    padding: 1.1rem;
    font-size: 0.88rem;
    overflow-x: auto;
    font-family: 'JetBrains Mono', 'Consolas', monospace;
    border: 1px solid rgba(99, 102, 241, 0.2);
    position: relative;
    user-select: text;
    cursor: text;
  }

  .mh-card pre code {
    display: block;
    white-space: pre;
    word-wrap: normal;
    user-select: text;
  }

  .mh-card pre::-webkit-scrollbar {
    height: 8px;
  }

  .mh-card pre::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 4px;
  }

  .mh-card pre::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.4);
    border-radius: 4px;
  }

  .mh-card pre::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.6);
  }

  .code-copy-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: rgba(99, 102, 241, 0.9);
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    z-index: 10;
    transition: all 0.2s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .code-copy-btn:hover {
    background: rgba(99, 102, 241, 1);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .code-copy-btn:active {
    transform: translateY(0);
  }

  .mh-feature-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1rem;
  }

  .mh-feature-icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    display: grid;
    place-items: center;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .mh-feature-meta {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08rem;
    color: #1d4ed8;
  }

  .mh-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .mh-tab {
    border-radius: 9999px;
    border: 1px solid rgba(15, 23, 42, 0.1);
    background: #ffffff;
    padding: 0.55rem 1.3rem;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    position: relative;
    overflow: hidden;
  }

  .mh-tab:hover {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
  }

  .mh-tab-active {
    background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);
    color: #ffffff;
    border-color: #8b5cf6;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  .mh-tab-active:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
  }

  .mh-stats {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow:
      0 8px 32px rgba(59, 130, 246, 0.15),
      0 2px 8px rgba(99, 102, 241, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    border-radius: 1.5rem;
    padding: 2rem;
    display: grid;
    gap: 1rem;
    position: relative;
    overflow: hidden;
  }

  .mh-stats::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      145deg,
      rgba(99, 102, 241, 0.05) 0%,
      rgba(6, 182, 212, 0.05) 100%
    );
  }

  @media (min-width: 768px) {
    .mh-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .mh-stat-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 1.25rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 
      0 4px 16px rgba(15, 23, 42, 0.08),
      0 2px 4px rgba(99, 102, 241, 0.05);
    position: relative;
    z-index: 1;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .mh-stat-card:hover {
    transform: translateY(-4px) scale(1.01);
    box-shadow: 
      0 12px 32px rgba(99, 102, 241, 0.15),
      0 4px 8px rgba(99, 102, 241, 0.1);
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .mh-stat-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.9rem;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(14, 165, 233, 0.18));
    display: grid;
    place-items: center;
    color: #1d4ed8;
  }

  .mh-footer {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(15, 23, 42, 0.08);
    padding: 2.5rem 0;
    position: relative;
    z-index: 2;
  }

  .mh-footer-inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    color: #475569;
  }

  @media (min-width: 640px) {
    .mh-footer-inner {
      flex-direction: row;
    }
  }

  .mh-footer-links {
    display: flex;
    gap: 1.2rem;
  }

  .mh-footer-links a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
  }

  .mh-footer-links a:hover {
    color: #0f172a;
  }

  .mh-alert {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: #b45309;
    background: rgba(251, 191, 36, 0.12);
    border: 1px solid rgba(217, 119, 6, 0.25);
    border-radius: 0.75rem;
    padding: 0.9rem 1rem;
  }

  /* Version Update Section */
  .version-banner {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    color: white;
    padding: 1rem 0;
    text-align: center;
    font-weight: 600;
    position: relative;
    z-index: 1;
  }

  .version-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border: 2px solid rgba(99, 102, 241, 0.4);
    box-shadow:
      0 8px 32px rgba(99, 102, 241, 0.15),
      0 2px 8px rgba(99, 102, 241, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
    border-radius: 1.5rem;
    padding: 2.5rem;
    margin-bottom: 3rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .version-card:hover {
    transform: translateY(-2px);
    box-shadow:
      0 12px 40px rgba(99, 102, 241, 0.2),
      0 4px 12px rgba(99, 102, 241, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .version-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(99, 102, 241, 0.05) 0%,
      rgba(139, 92, 246, 0.05) 100%
    );
  }

  .version-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .version-badge {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: white;
    padding: 0.5rem 1.25rem;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 1.25rem;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  .version-features {
    display: grid;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .version-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem;
    background: white;
    border-radius: 0.75rem;
    border-left: 3px solid var(--success);
  }

  /* Creator Section */
  .creator-glimpse {
    background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
    color: white;
    padding: 3rem 0;
    border-top: 3px solid var(--primary);
    position: relative;
    z-index: 2;
  }

  .creator-card {
    display: flex;
    gap: 2rem;
    align-items: center;
    background: rgba(255,255,255,0.05);
    border-radius: 1.25rem;
    padding: 2rem;
    border: 1px solid rgba(255,255,255,0.1);
  }

  .creator-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    display: grid;
    place-items: center;
    font-size: 3rem;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
  }

  .creator-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.75rem;
    color: white;
  }

  .creator-role {
    color: var(--accent);
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .creator-links {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .creator-link-btn {
    padding: 0.6rem 1.25rem;
    border-radius: 9999px;
    background: var(--primary);
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .creator-link-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.4);
  }

  @media (max-width: 768px) {
    .creator-card {
      flex-direction: column;
      text-align: center;
    }

    .version-card {
      padding: 1.5rem;
    }
  }
`;

const heroHighlights = [
  { icon: <Zap size={18} />, label: 'High velocity SQL helpers' },
  { icon: <Sparkles size={18} />, label: 'Typed, production ready patterns' },
  { icon: <Shield size={18} />, label: 'Safe defaults and guardrails' },
];

const fallbackData = {
  features: allFunctions,
  examples: [
    {
      id: '1',
      title: 'E-Commerce Order Processing',
      description: 'Create orders, add line items, and adjust inventory in a single transaction.',
      category: 'E-Commerce',
      code: `const orderId = await db.transaction(async () => {
  const order = await db.insertAndReturn('orders', {
    user_id: userId,
    total: 299.99,
    status: 'pending'
  });

  await db.bulkInsert('order_items', items);
  await db.decrement('products', item.id, 'stock', item.quantity);
  return order.id;
});`,
      order: 1,
    },
    {
      id: '2',
      title: 'User Analytics Dashboard',
      description: 'Generate comprehensive user statistics for an admin dashboard.',
      category: 'Analytics',
      code: `const stats = {
  total: await db.count('users'),
  activeToday: await db.createdToday('users'),
  activeThisWeek: await db.createdThisWeek('users'),
  avgAge: await db.avg('users', 'age'),
  statusBreakdown: await db.countBy('users', 'status')
};`,
      order: 2,
    },
    {
      id: '3',
      title: 'Advanced Product Search',
      description: 'Search products with multiple filters and full-text search.',
      category: 'Search',
      code: `const products = await db.advancedSearch('products', {
  price: { operator: 'BETWEEN', value: { min: 50, max: 500 } },
  category: { operator: 'IN', value: ['Electronics', 'Computers'] },
  stock: { operator: '>', value: 0 }
}, {
  orderBy: [{ column: 'price', direction: 'ASC' }],
  limit: 20
});`,
      order: 3,
    },
  ],
};

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mh-section-title">
      {eyebrow ? <p className="mh-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function FeatureCard({ feature }) {
  const [copied, setCopied] = React.useState(false);
  const cardRef = React.useRef(null);

  const createRipple = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    card.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(feature.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      ref={cardRef}
      className="mh-card"
      onClick={createRipple}
    >
      <div className="mh-feature-header">
        <span className="mh-feature-icon">{feature.icon?.slice(0, 2).toUpperCase()}</span>
        <div>
          <div className="mh-feature-meta">{feature.category}</div>
          <h3>{feature.title}</h3>
        </div>
      </div>
      <p>{feature.description}</p>
      <div style={{ position: 'relative' }}>
        <button
          onClick={handleCopy}
          className="code-copy-btn"
          title="Copy code"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
        <pre>
          <code>{feature.code}</code>
        </pre>
      </div>
    </article>
  );
}

function ExampleCard({ example }) {
  const [copied, setCopied] = React.useState(false);
  const cardRef = React.useRef(null);

  const createRipple = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    card.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      ref={cardRef}
      className="mh-card"
      onClick={createRipple}
    >
      <div className="mh-feature-meta">{example.category}</div>
      <h3>{example.title}</h3>
      <p>{example.description}</p>
      <div style={{ position: 'relative' }}>
        <button
          onClick={handleCopy}
          className="code-copy-btn"
          title="Copy code"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
        <pre>
          <code>{example.code}</code>
        </pre>
      </div>
    </article>
  );
}

function StatsBar({ stats }) {
  const fallback = {
    totalDownloads: 1500,
    githubStars: 250,
    activeUsers: 1000,
  };

  const values = stats ?? fallback;

  const items = [
    {
      icon: <Database size={20} />,
      label: 'Downloads',
      value: values.totalDownloads.toLocaleString(),
    },
    {
      icon: <Star size={20} />,
      label: 'GitHub stars',
      value: values.githubStars.toLocaleString(),
    },
    {
      icon: <Users size={20} />,
      label: 'Active teams',
      value: values.activeUsers.toLocaleString(),
    },
  ];

  return (
    <div className="mh-stats">
      {items.map((item) => (
        <div key={item.label} className="mh-stat-card">
          <span className="mh-stat-icon">{item.icon}</span>
          <div>
            <p style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>{item.value}</p>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function IntegrationSteps() {
  const steps = [
    {
      title: 'Install',
      description: 'Add the helper to your project and create a connection pool.',
      code: `npm install mysql2-helper-lite`,
    },
    {
      title: 'Configure',
      description: 'Set up your database credentials and default helper options.',
      code: `import { createHelper } from 'mysql2-helper-lite';

const db = createHelper({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});`,
    },
    {
      title: 'Ship',
      description: 'Replace repetitive SQL with expressive helper calls.',
      code: `const users = await db.cachedQuery(
  'SELECT * FROM users WHERE status = ?',
  ['active'],
  { ttlSeconds: 60 }
);`,
    },
  ];

  return (
    <div className="mh-grid mh-grid-3">
      {steps.map((step, index) => (
        <div key={step.title} className="mh-card">
          <div className="mh-feature-meta">Step {index + 1}</div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <pre>
            <code>{step.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const cardRef = React.useRef({});

  const createRipple = (event, index) => {
    const card = cardRef.current[index];
    if (!card) return;

    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    card.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  };

  const items = [
    {
      question: 'What is MySQL2 Helper Lite?',
      answer:
        'MySQL2 Helper Lite is a comprehensive TypeScript library built on top of mysql2, providing 100+ ready-to-use functions for database operations. It eliminates boilerplate code and makes database interactions simple and intuitive.',
    },
    {
      question: 'Does it work with serverless deployments?',
      answer:
        'Yes! The helpers wrap mysql2 and are fully compatible with serverless functions (AWS Lambda, Vercel, Netlify) as long as you manage connection pooling properly. We recommend using connection reuse for optimal performance.',
    },
    {
      question: 'Is it production-ready?',
      answer:
        'Absolutely. MySQL2 Helper Lite is battle-tested in production environments, handles edge cases gracefully, includes comprehensive error handling, and provides TypeScript support for type safety.',
    },
    {
      question: 'How does it compare to ORMs like Prisma or TypeORM?',
      answer:
        'Unlike full ORMs, MySQL2 Helper Lite is lightweight and gives you direct SQL control while removing boilerplate. Perfect for developers who want SQL power with helper convenience, without the overhead of a full ORM.',
    },
    {
      question: 'Can I use it with existing mysql2 code?',
      answer:
        'Yes! MySQL2 Helper Lite is a wrapper around mysql2, so you can gradually adopt it in existing projects. Use helpers for new code while keeping your existing mysql2 queries working side by side.',
    },
    {
      question: 'What about transactions and connection pooling?',
      answer:
        'Built-in support for transactions with automatic rollback on errors. Connection pooling is inherited from mysql2, and the helper provides convenient transaction() and withConnection() methods.',
    },
    {
      question: 'Is there TypeScript support?',
      answer:
        'Yes! Full TypeScript definitions are included. Get autocomplete, type checking, and IntelliSense for all 100+ functions right in your IDE.',
    },
    {
      question: 'How are admin routes secured?',
      answer:
        'Mutating endpoints expect an Authorization header that matches your ADMIN_SECRET environment variable. This ensures only authorized applications can modify data.',
    },
    {
      question: 'Can I extend the helpers?',
      answer:
        'Absolutely. The helper exposes hooks and plugins so you can register your own transformers, add custom middleware, or wrap existing functions with your business logic.',
    },
    {
      question: 'What are the creative functions in v6.0.0?',
      answer:
        'V6.0.0 introduces 16 innovative functions including fuzzySearch() for typo-tolerant search, timeTravel() for historical queries, diff() for comparing records, pivotTable() for data transformation, and many more!',
    },
  ];

  return (
    <div className="mh-grid">
      {items.map((item, index) => (
        <details
          key={item.question}
          ref={(el) => (cardRef.current[index] = el)}
          className="mh-card faq-item"
          onClick={(e) => createRipple(e, index)}
        >
          <summary style={{ cursor: 'pointer', fontWeight: 700, position: 'relative', zIndex: 2 }}>
            {item.question}
          </summary>
          <p style={{ marginTop: '1rem', position: 'relative', zIndex: 2 }}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

function VersionUpdate() {
  return (
    <div className="version-card">
      <div className="version-header">
        <Gift size={32} color="#6366f1" />
        <div>
          <h2 style={{ margin: 0, fontSize: '1.75rem' }}>
            <span className="version-badge">v6.0.0</span> Latest Release
          </h2>
          <p style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>
            Released November 11, 2025 • Revolutionary Features Beyond mysql2!
          </p>
        </div>
      </div>
      <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#475569' }}>
        This major release introduces <strong>16 creative functions</strong> that go far beyond standard mysql2,
        including smart comparison, time travel queries, fuzzy search, weighted random selection, and much more!
      </p>
      <div className="version-features">
        <div className="version-feature-item">
          <Sparkles size={20} color="#10b981" style={{ flexShrink: 0 }} />
          <div>
            <strong>diff()</strong> - Smart comparison showing only changed fields between records
          </div>
        </div>
        <div className="version-feature-item">
          <Sparkles size={20} color="#10b981" style={{ flexShrink: 0 }} />
          <div>
            <strong>timeTravel()</strong> - Query records as they existed at specific timestamps
          </div>
        </div>
        <div className="version-feature-item">
          <Sparkles size={20} color="#10b981" style={{ flexShrink: 0 }} />
          <div>
            <strong>fuzzySearch()</strong> - Approximate matching with typo tolerance
          </div>
        </div>
        <div className="version-feature-item">
          <Sparkles size={20} color="#10b981" style={{ flexShrink: 0 }} />
          <div>
            <strong>13+ more creative functions</strong> including pivotTable, rank, movingAverage, and cascadeUpdate
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorGlimpse({ onViewFull }) {
  return (
    <section className="creator-glimpse">
      <div className="mh-container">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.25rem' }}>
          Meet the Creator
        </h2>
        <div className="creator-card">
          <div className="creator-avatar">RD</div>
          <div className="creator-info">
            <h3>Ranak Debnath</h3>
            <p className="creator-role">Senior Backend Developer | Data Analyst | Automation Specialist</p>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>
              Passionate backend developer with expertise in Node.js, Express, SQL, and MongoDB.
              Currently working at Cleverlyy and Tex Fasteners, specializing in scalable backend systems,
              data analysis, and automation solutions.
            </p>
            <div className="creator-links">
              <a href="https://www.linkedin.com/in/ranakdebnath-7644621b7" target="_blank" rel="noopener noreferrer" className="creator-link-btn">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href="mailto:piyaldeb87@gmail.com" className="creator-link-btn">
                <Mail size={18} /> Contact
              </a>
              <button onClick={onViewFull} className="creator-link-btn" style={{ background: 'var(--accent)', border: 'none', cursor: 'pointer' }}>
                <User size={18} /> View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Optimized Bubble Background Component
function BubbleBackground() {
  const bubbles = useMemo(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      return [];
    }
    
    // Check if user prefers reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return [];
    }
    
    const bubbleConfigs = [];
    const sizes = ['small', 'medium', 'large', 'extra-large'];
    
    // Create 12 bubbles for optimal performance (reduced from 15)
    // Adjust based on screen size
    const isMobile = window.innerWidth < 768;
    const bubbleCount = isMobile ? 0 : 12;
    
    for (let i = 0; i < bubbleCount; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 20;
      const xOffset = (Math.random() - 0.5) * 200;
      
      bubbleConfigs.push({
        id: i,
        size,
        left,
        delay,
        xOffset
      });
    }
    
    return bubbleConfigs;
  }, []);

  return (
    <div className="bubble-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`bubble bubble-${bubble.size}`}
          style={{
            left: `${bubble.left}%`,
            '--bubble-delay': `${bubble.delay}s`,
            '--bubble-x': `${bubble.xOffset}`
          }}
        />
      ))}
    </div>
  );
}

export default function Mysql2HelperWebsite() {
  const [features, setFeatures] = useState(fallbackData.features);
  const [examples, setExamples] = useState(fallbackData.examples);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('Core');
  const [currentView, setCurrentView] = useState(() => {
    // Check if we're on the admin route
    if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
      return 'admin';
    }
    return 'home';
  }); // 'home', 'docs', 'creator', or 'admin'
  const [adminSecret, setAdminSecret] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [pageLoadTime] = useState(() => Date.now());

  // Reusable ripple effect function
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 1000);
  }

  // Track page view
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const visitDuration = Math.floor((Date.now() - pageLoadTime) / 1000);
        await fetch(`${API_URL}/analytics/pageview`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: window.location.pathname,
            sessionId,
            visitDuration,
          }),
        });
      } catch (err) {
        console.error('Failed to track pageview:', err);
      }
    };

    trackPageView();

    // Track page unload
    const handleBeforeUnload = () => {
      const visitDuration = Math.floor((Date.now() - pageLoadTime) / 1000);
      const data = JSON.stringify({
        path: window.location.pathname,
        sessionId,
        visitDuration,
      });
      const blob = new Blob([data], { type: 'application/json' });
      navigator.sendBeacon(`${API_URL}/analytics/pageview`, blob);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sessionId, pageLoadTime]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featureRes, exampleRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/features?active=true`),
          fetch(`${API_URL}/examples?active=true`),
          fetch(`${API_URL}/stats`),
        ]);

        if (!featureRes.ok || !exampleRes.ok || !statsRes.ok) {
          throw new Error('Network response was not ok');
        }

        const [featureData, exampleData, statsData] = await Promise.all([
          featureRes.json(),
          exampleRes.json(),
          statsRes.json(),
        ]);

        // Only use API data if it has MORE functions than our fallback
        // This ensures we always show the complete function list
        if (featureData && featureData.length > fallbackData.features.length) {
          setFeatures(featureData);
        }
        if (exampleData && exampleData.length > 0) {
          setExamples(exampleData);
        }
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error('Failed to load data from API, using fallback data', err);
        setError('Using built-in function data. API is offline.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(features.map((item) => item.category));
    return ['All', ...Array.from(unique).sort()];
  }, [features]);

  const filteredFeatures = useMemo(() => {
    if (categoryFilter === 'All') {
      return features;
    }
    return features.filter((item) => item.category === categoryFilter);
  }, [features, categoryFilter]);

  const functionCount = features.length;

  if (currentView === 'docs') {
    return <DocumentationPage onBack={() => setCurrentView('home')} features={features} />;
  }

  if (currentView === 'creator') {
    return <CreatorPage onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'admin') {
    // Check if admin secret is set, if not prompt for it
    if (!adminSecret) {
      const secret = prompt('Enter admin password:');
      // Password is stored in environment variable for security
      const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 
                           (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMIN_PASSWORD) ||
                           '';
      
      if (secret === adminPassword && adminPassword) {
        setAdminSecret(adminPassword);
      } else if (secret) {
        alert('Invalid password');
        window.location.href = '/';
        return null;
      } else {
        window.location.href = '/';
        return null;
      }
    }

    return (
      <AdminDashboard
        onBack={() => {
          setCurrentView('home');
          setAdminSecret('');
          window.location.href = '/';
        }}
        adminSecret={adminSecret}
      />
    );
  }

  return (
    <div className="mh-root">
      <style>{styles}</style>
      <BubbleBackground />

      <header className="mh-hero">
        <div className="mh-container">
          <span className="mh-pill">
            <Sparkles size={16} /> MySQL2 Helper Lite - {functionCount}+ Functions
          </span>
          <h1>Ship production-ready SQL helpers in minutes.</h1>
          <p>
            A comprehensive set of {functionCount}+ MySQL utilities built on top of mysql2. Skip repetitive boilerplate,
            ship features faster, and keep your data flows auditable.
          </p>

          <div className="mh-highlight-grid">
            {heroHighlights.map((item) => (
              <div key={item.label} className="mh-highlight">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mh-cta-group">
            <a href="#playground" className="mh-btn-primary" onClick={createRipple}>
              <Code2 size={18} /> Try Playground
            </a>
            <a href="#features" className="mh-btn-secondary" onClick={createRipple}>
              Explore {functionCount}+ features <ArrowRight size={18} />
            </a>
            <button
              onClick={(e) => {
                createRipple(e);
                setCurrentView('docs');
              }}
              className="mh-btn-secondary"
              style={{ cursor: 'pointer', border: 'none' }}
            >
              <Book size={18} /> Documentation
            </button>
            <a
              href="https://github.com/piyaldeb/mysql2-helper-lite"
              className="mh-btn-secondary"
              onClick={createRipple}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="mh-content">
        <div className="mh-container">
          <section id="version" className="mh-section">
            <VersionUpdate />
          </section>

          <section id="stats" className="mh-section">
            <SectionTitle
              eyebrow="Snapshot"
              title="Trusted by data-focused teams"
              description="Track adoption and fast-moving metrics right from the API. Seed data is included for quick demos."
            />
            <StatsBar stats={stats} />
          </section>

          <section id="features" className="mh-section">
            <SectionTitle
              eyebrow="All Functions"
              title={`${functionCount}+ Purpose-built helpers for everyday workloads`}
              description="Browse all available functions organized by category. Each function is production-ready and optimized for performance."
            />
            <div className="mh-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`mh-tab ${categoryFilter === category ? 'mh-tab-active' : ''}`}
                  onClick={(e) => {
                    createRipple(e);
                    setCategoryFilter(category);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: '#475569', marginBottom: '2rem' }}>
              Showing {filteredFeatures.length} of {functionCount} functions
            </p>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Loading features…</p>
            ) : (
              <div className="mh-grid mh-grid-2">
                {filteredFeatures.map((feature) => (
                  <FeatureCard key={feature._id || feature.id} feature={feature} />
                ))}
              </div>
            )}
            {error ? <div className="mh-alert">{error}</div> : null}
          </section>

          <section id="examples" className="mh-section">
            <SectionTitle
              eyebrow="Code samples"
              title="Drop-in patterns for real-world apps"
              description="Use the examples as a starting point for transactions, analytics, and background jobs."
            />
            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Loading examples…</p>
            ) : (
              <div className="mh-grid mh-grid-2">
                {examples.map((example) => (
                  <ExampleCard key={example._id || example.id} example={example} />
                ))}
              </div>
            )}
          </section>

          <section id="playground" className="mh-section">
            <SectionTitle
              eyebrow="Try it now"
              title="Interactive SQL Playground"
              description="Test MySQL2 Helper functions in real-time. Run code examples and see instant results."
            />
            <Terminal />
          </section>

          <section id="integration" className="mh-section">
            <SectionTitle
              eyebrow="Integration"
              title="Three steps to production readiness"
              description="Install the helper, configure the connection, and ship your first feature."
            />
            <IntegrationSteps />
          </section>

          <section id="faq" className="mh-section">
            <SectionTitle
              eyebrow="FAQ"
              title="Answers to common questions"
              description="Need more help? Open a GitHub issue or reach out to the maintainers."
            />
            <FAQ />
          </section>
        </div>
      </main>

      <CreatorGlimpse onViewFull={() => setCurrentView('creator')} />

      <footer className="mh-footer">
        <div className="mh-container">
          <div className="mh-footer-inner">
            <span>MIT Licensed. Made for the developer community.</span>
            <div className="mh-footer-links">
              <a href="https://github.com/piyaldeb">GitHub</a>
              <a href="piyaldeb87@example.com">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
