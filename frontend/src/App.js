import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Book, Database, Shield, Sparkles, Star, Users, Zap, Gift, User, Linkedin, Mail, Code2, Brain, Cpu, CheckCircle, X, Info } from 'lucide-react';
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
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Poppins:wght@400;500;600;700;800;900&family=Lexend:wght@300;400;500;600;700&display=swap');

  :root {
    color-scheme: light;
    --primary: #ffffff;
    --primary-dark: #f8fafc;
    --secondary: #3b82f6;
    --accent: #06b6d4;
    --royal: #1e3a8a;
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

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', 'Lexend', sans-serif;
    font-weight: 700;
    letter-spacing: -0.02em;
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
      transform: translateY(100vh) translateX(0) scale(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.9;
    }
    50% {
      transform: translateY(50vh) translateX(calc(var(--bubble-x) * 0.5px)) scale(1) rotate(180deg);
    }
    90% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-100px) translateX(calc(var(--bubble-x) * 1px)) scale(0.8) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes bubbleFloatSlow {
    0% {
      transform: translateY(100vh) translateX(0) scale(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(50vh) translateX(calc(var(--bubble-x) * 0.3px)) scale(1.1) rotate(90deg);
    }
    90% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100px) translateX(calc(var(--bubble-x) * 1px)) scale(1) rotate(180deg);
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
        0 0 30px rgba(59, 130, 246, 0.4),
        0 0 60px rgba(147, 197, 253, 0.3),
        0 0 90px rgba(6, 182, 212, 0.2);
    }
    50% {
      box-shadow:
        0 0 40px rgba(59, 130, 246, 0.5),
        0 0 80px rgba(147, 197, 253, 0.4),
        0 0 120px rgba(6, 182, 212, 0.3);
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
      rgba(59, 130, 246, 0.4) 0%,
      rgba(6, 182, 212, 0.35) 30%,
      rgba(147, 197, 253, 0.3) 60%,
      rgba(255, 255, 255, 0.25) 100%);
    backdrop-filter: blur(60px) saturate(200%);
    -webkit-backdrop-filter: blur(60px) saturate(200%);
    border: 2px solid rgba(255, 255, 255, 0.6);
    box-shadow:
      0 12px 48px rgba(59, 130, 246, 0.3),
      0 6px 24px rgba(6, 182, 212, 0.25),
      inset 0 0 40px rgba(255, 255, 255, 0.4),
      inset 0 -10px 40px rgba(59, 130, 246, 0.15),
      0 0 80px rgba(147, 197, 253, 0.2);
    will-change: transform, opacity;
    animation-timing-function: ease-in-out;
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
    font-family: 'Lexend', 'Segoe UI', sans-serif;
    font-weight: 400;
    color: #0f172a;
    background:
      radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 60%, rgba(6, 182, 212, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(147, 197, 253, 0.05) 0%, transparent 50%),
      linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f0f9ff 100%);
    line-height: 1.7;
    letter-spacing: 0.01em;
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
      radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.04) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(30, 58, 138, 0.03) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(147, 197, 253, 0.02) 0%, transparent 60%);
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
    background: linear-gradient(135deg, #ffffff 0%, #dbeafe 30%, #bfdbfe 60%, #93c5fd 100%);
    color: #0f172a;
    z-index: 2;
    box-shadow: 0 20px 60px rgba(59, 130, 246, 0.15);
  }

  .mh-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.12) 0%, transparent 40%);
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
    font-family: 'Poppins', 'Lexend', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4rem);
    line-height: 1.1;
    margin-bottom: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
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
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.95) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    color: #1e3a8a;
    box-shadow:
      0 12px 32px rgba(59, 130, 246, 0.25),
      0 6px 16px rgba(147, 197, 253, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 1),
      inset 0 -2px 4px rgba(59, 130, 246, 0.1),
      0 0 60px rgba(147, 197, 253, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.9);
  }

  .mh-btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: linear-gradient(135deg,
      rgba(59, 130, 246, 0.15),
      rgba(6, 182, 212, 0.15));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .mh-btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow:
      0 20px 50px rgba(59, 130, 246, 0.35),
      0 10px 25px rgba(147, 197, 253, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 1),
      inset 0 -2px 4px rgba(59, 130, 246, 0.15),
      0 0 80px rgba(147, 197, 253, 0.25);
  }

  .mh-btn-primary:hover::before {
    opacity: 1;
  }

  .mh-btn-secondary {
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.75) 100%);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 2px solid rgba(59, 130, 246, 0.3);
    color: #1e3a8a;
    box-shadow:
      0 8px 24px rgba(59, 130, 246, 0.15),
      inset 0 1px 2px rgba(255, 255, 255, 0.9);
  }

  .mh-btn-secondary:hover {
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 100%);
    border-color: rgba(59, 130, 246, 0.5);
    transform: translateY(-2px);
    box-shadow:
      0 12px 32px rgba(59, 130, 246, 0.25),
      inset 0 1px 2px rgba(255, 255, 255, 1),
      0 0 40px rgba(147, 197, 253, 0.2);
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
    font-family: 'Poppins', 'Lexend', sans-serif;
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: 0.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
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
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 100%);
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border-radius: 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow:
      0 12px 40px rgba(59, 130, 246, 0.15),
      0 4px 12px rgba(147, 197, 253, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 1),
      inset 0 -2px 4px rgba(59, 130, 246, 0.05),
      0 0 60px rgba(147, 197, 253, 0.1);
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
      rgba(59, 130, 246, 0.08) 0%,
      rgba(6, 182, 212, 0.08) 50%,
      rgba(147, 197, 253, 0.06) 100%
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
    transform: translateY(-10px) scale(1.02);
    box-shadow:
      0 28px 70px rgba(59, 130, 246, 0.3),
      0 14px 30px rgba(147, 197, 253, 0.25),
      0 0 0 2px rgba(59, 130, 246, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 1),
      inset 0 -2px 4px rgba(59, 130, 246, 0.1),
      0 0 80px rgba(147, 197, 253, 0.2);
    border-color: rgba(59, 130, 246, 0.5);
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.92) 100%);
  }

  .mh-card:hover::before {
    opacity: 1;
  }

  .mh-card:hover::after {
    opacity: 0.6;
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 0.5) 0%,
      rgba(6, 182, 212, 0.4) 30%,
      rgba(147, 197, 253, 0.3) 60%,
      transparent 100%
    );
    pointer-events: none;
    animation: ripple 0.8s cubic-bezier(0, 0, 0.2, 1);
    z-index: 1;
  }

  .mh-card h3 {
    font-family: 'Poppins', 'Lexend', sans-serif;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.01em;
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
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    color: #ffffff;
    border-color: #3b82f6;
    box-shadow:
      0 4px 12px rgba(59, 130, 246, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.3);
  }

  .mh-tab-active:hover {
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    box-shadow:
      0 6px 20px rgba(59, 130, 246, 0.5),
      inset 0 1px 2px rgba(255, 255, 255, 0.4);
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

  /* What's Coming Next Section */
  .whats-next-section {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    color: white;
    padding: 4rem 0;
    position: relative;
    z-index: 2;
    overflow: hidden;
  }

  .whats-next-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.12) 0%, transparent 50%);
    pointer-events: none;
  }

  .whats-next-grid {
    display: grid;
    gap: 2rem;
    margin-top: 3rem;
    position: relative;
    z-index: 1;
  }

  @media (min-width: 768px) {
    .whats-next-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .whats-next-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1.5rem;
    padding: 2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .whats-next-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .whats-next-card:hover {
    transform: translateY(-8px);
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: 0 20px 60px rgba(99, 102, 241, 0.3);
  }

  .whats-next-card:hover::before {
    opacity: 1;
  }

  .whats-next-icon {
    width: 60px;
    height: 60px;
    border-radius: 1rem;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    display: grid;
    place-items: center;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .whats-next-card h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: white;
    position: relative;
    z-index: 1;
  }

  .whats-next-card p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.7;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .whats-next-features {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    z-index: 1;
  }

  .whats-next-feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
  }

  .whats-next-badge {
    background: linear-gradient(135deg, var(--warning), var(--accent));
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .modal-content {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border-radius: 1.5rem;
    max-width: 600px;
    width: 100%;
    max-height: 85vh;
    overflow-y: auto;
    padding: 2.5rem;
    box-shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.8);
    position: relative;
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .modal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(99, 102, 241, 0.2);
  }

  .modal-icon {
    width: 50px;
    height: 50px;
    border-radius: 1rem;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    display: grid;
    place-items: center;
    color: white;
    flex-shrink: 0;
  }

  .modal-header h3 {
    margin: 0;
    font-size: 1.75rem;
    color: #0f172a;
  }

  .modal-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(15, 23, 42, 0.08);
    border: none;
    border-radius: 0.5rem;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: all 0.2s;
    color: #475569;
  }

  .modal-close:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    transform: rotate(90deg);
  }

  .modal-description {
    color: #475569;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
  }

  .modal-functions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .modal-function-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(99, 102, 241, 0.05);
    border-radius: 0.75rem;
    border-left: 3px solid var(--primary);
    transition: all 0.2s;
  }

  .modal-function-item:hover {
    background: rgba(99, 102, 241, 0.1);
    transform: translateX(4px);
  }

  .modal-function-name {
    font-weight: 700;
    color: var(--primary);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.95rem;
  }

  .modal-function-desc {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.6;
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
        <Gift size={32} color="#3b82f6" />
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

// Category descriptions for modal - Extracted from actual functionsData.js
const categoryDescriptions = {
  'Core': {
    title: 'Core Functions',
    description: 'Essential database operations that form the foundation of any application. Execute raw SQL and retrieve single records.',
    icon: <Database size={24} />,
    functions: [
      { name: 'query()', desc: 'Execute raw SQL queries with optional caching' },
      { name: 'getOne()', desc: 'Get a single row from query results' }
    ]
  },
  'Aggregation': {
    title: 'Aggregation Functions',
    description: 'Statistical and mathematical operations on your data. Perfect for analytics dashboards, reports, and data analysis.',
    icon: <Sparkles size={24} />,
    functions: [
      { name: 'count()', desc: 'Count records matching conditions' },
      { name: 'countBy()', desc: 'Count records grouped by a column' },
      { name: 'exists()', desc: 'Check if a record exists' },
      { name: 'aggregate()', desc: 'Perform multiple aggregation functions' },
      { name: 'min()', desc: 'Find minimum value in a column' },
      { name: 'max()', desc: 'Find maximum value in a column' },
      { name: 'avg()', desc: 'Calculate average of a column' },
      { name: 'sum()', desc: 'Calculate sum of a column' },
      { name: 'median()', desc: 'Calculate median value (MySQL 8.0+)' },
      { name: 'percentile()', desc: 'Calculate percentile value' },
      { name: 'distinctValues()', desc: 'Get distinct values from a column' },
      { name: 'pluck()', desc: 'Extract a single column as an array' },
      { name: 'groupConcat()', desc: 'Concatenate column values grouped by another column' }
    ]
  },
  'Analytics': {
    title: 'Analytics Functions',
    description: 'Advanced analytics for business intelligence. Create pivot tables, rank records, analyze time series, and perform conditional aggregations.',
    icon: <Brain size={24} />,
    functions: [
      { name: 'pivotTable()', desc: 'Create pivot tables for data analysis' },
      { name: 'rank()', desc: 'Rank records with tie handling' },
      { name: 'movingAverage()', desc: 'Calculate moving average for time series' },
      { name: 'conditionalAggregate()', desc: 'Aggregate with conditional logic' }
    ]
  },
  'Cache': {
    title: 'Cache Functions',
    description: 'Caching utilities to improve query performance and reduce database load. Clear cache, get statistics, and warm frequently accessed data.',
    icon: <Zap size={24} />,
    functions: [
      { name: 'clearCache()', desc: 'Clear query cache for table or all' },
      { name: 'getCacheStats()', desc: 'Get cache statistics' },
      { name: 'warmCache()', desc: 'Pre-load frequently accessed data' }
    ]
  },
  'Database': {
    title: 'Database Management',
    description: 'Database-level operations for backup, versioning, and cascading updates across related records.',
    icon: <Database size={24} />,
    functions: [
      { name: 'snapshot()', desc: 'Create a backup snapshot of a table' },
      { name: 'createVersion()', desc: 'Create a version history entry' },
      { name: 'cascadeUpdate()', desc: 'Update record and all related records' }
    ]
  },
  'Date': {
    title: 'Date & Time Functions',
    description: 'Work with temporal data easily. Filter and analyze records based on dates, times, and time periods.',
    icon: <Star size={24} />,
    functions: [
      { name: 'whereDateBetween()', desc: 'Select records where date is between two dates' },
      { name: 'whereDate()', desc: 'Select records for a specific date' },
      { name: 'whereYear()', desc: 'Select records for a specific year' },
      { name: 'whereMonth()', desc: 'Select records for a specific month' },
      { name: 'whereDay()', desc: 'Select records for a specific day of month' },
      { name: 'createdToday()', desc: 'Select records created today' },
      { name: 'createdThisWeek()', desc: 'Select records created this week' },
      { name: 'createdThisMonth()', desc: 'Select records created this month' },
      { name: 'createdThisYear()', desc: 'Select records created this year' }
    ]
  },
  'Delete': {
    title: 'Delete Operations',
    description: 'Safe deletion functions with various strategies. Includes hard deletes, soft deletes, batch operations, and restore capabilities.',
    icon: <Shield size={24} />,
    functions: [
      { name: 'deleteById()', desc: 'Delete a record by ID (supports soft delete)' },
      { name: 'deleteWhere()', desc: 'Delete all records matching conditions' },
      { name: 'batchDelete()', desc: 'Delete multiple records by IDs' },
      { name: 'truncate()', desc: 'Remove all rows from a table (reset auto-increment)' },
      { name: 'restore()', desc: 'Restore a soft-deleted record' },
      { name: 'restoreWhere()', desc: 'Restore multiple soft-deleted records' }
    ]
  },
  'Hooks': {
    title: 'Lifecycle Hooks',
    description: 'Event-driven hooks that run before or after database operations. Perfect for validation, logging, and automation.',
    icon: <Zap size={24} />,
    functions: [
      { name: 'addHook()', desc: 'Add before/after hooks for operations' },
      { name: 'removeHook()', desc: 'Remove a registered hook' }
    ]
  },
  'Insert': {
    title: 'Insert Operations',
    description: 'Functions to add new records to your database. Supports single inserts, bulk inserts, and upsert operations.',
    icon: <Database size={24} />,
    functions: [
      { name: 'insert()', desc: 'Insert a single record and return the ID' },
      { name: 'insertAndReturn()', desc: 'Insert a record and return the complete row' },
      { name: 'bulkInsert()', desc: 'Insert multiple records at once for better performance' },
      { name: 'bulkInsertAndReturn()', desc: 'Bulk insert and return all inserted records' },
      { name: 'upsert()', desc: 'Insert or update record if it already exists' },
      { name: 'bulkUpsert()', desc: 'Bulk upsert multiple records efficiently' }
    ]
  },
  'JSON': {
    title: 'JSON Functions',
    description: 'Work with JSON data types and columns. Query, extract, and manipulate JSON data stored in your database.',
    icon: <Code2 size={24} />,
    functions: [
      { name: 'jsonExtract()', desc: 'Extract values from JSON columns' },
      { name: 'jsonContains()', desc: 'Find records where JSON contains value' }
    ]
  },
  'Monitoring': {
    title: 'Monitoring & Observability',
    description: 'Monitor query performance, check database health, analyze connection pools, and maintain audit trails.',
    icon: <Shield size={24} />,
    functions: [
      { name: 'healthCheck()', desc: 'Check database connection health' },
      { name: 'getDatabaseStats()', desc: 'Get overall database statistics' },
      { name: 'getPoolInfo()', desc: 'Get connection pool information' },
      { name: 'queryStats()', desc: 'Analyze query performance patterns' },
      { name: 'logAudit()', desc: 'Log audit trail for actions' }
    ]
  },
  'Pagination': {
    title: 'Pagination Functions',
    description: 'Paginate large result sets efficiently. Includes cursor-based and offset-based pagination, plus chunking for processing.',
    icon: <Users size={24} />,
    functions: [
      { name: 'paginate()', desc: 'Offset-based pagination with metadata' },
      { name: 'cursorPaginate()', desc: 'Cursor-based pagination for infinite scroll' },
      { name: 'chunk()', desc: 'Process large datasets in chunks' }
    ]
  },
  'Raw': {
    title: 'Raw SQL Functions',
    description: 'Execute raw SQL when you need full control. Safely bind parameters and handle complex queries with or without safety checks.',
    icon: <Code2 size={24} />,
    functions: [
      { name: 'raw()', desc: 'Execute raw SQL (with safety checks)' },
      { name: 'rawUnsafe()', desc: 'Execute raw SQL (no safety checks)' }
    ]
  },
  'Relations': {
    title: 'Relationship Functions',
    description: 'Handle related data across tables. Support for one-to-one, one-to-many, many-to-many, and table joins.',
    icon: <Users size={24} />,
    functions: [
      { name: 'join()', desc: 'Perform table joins' },
      { name: 'multiJoin()', desc: 'Join multiple tables at once' },
      { name: 'hasOne()', desc: 'Get related record (one-to-one)' },
      { name: 'hasMany()', desc: 'Get related records (one-to-many)' },
      { name: 'belongsTo()', desc: 'Get parent record (inverse of hasMany)' },
      { name: 'belongsToMany()', desc: 'Get many-to-many relationships via pivot table' }
    ]
  },
  'Schema': {
    title: 'Schema Management',
    description: 'Database schema operations for inspecting table structures, indexes, and optimizing performance.',
    icon: <Database size={24} />,
    functions: [
      { name: 'getTableSchema()', desc: 'Get table structure information' },
      { name: 'getTableIndexes()', desc: 'Get table indexes' },
      { name: 'getTableInfo()', desc: 'Get table metadata (size, rows, etc)' },
      { name: 'listTables()', desc: 'List all tables in database' },
      { name: 'tableExists()', desc: 'Check if a table exists' },
      { name: 'optimizeTable()', desc: 'Optimize table for better performance' },
      { name: 'analyzeTable()', desc: 'Analyze table statistics' }
    ]
  },
  'Search': {
    title: 'Search Functions',
    description: 'Full-text search and advanced search capabilities. Find data quickly with fuzzy matching and relevance scoring.',
    icon: <Shield size={24} />,
    functions: [
      { name: 'search()', desc: 'Simple keyword search across multiple fields' },
      { name: 'advancedSearch()', desc: 'Advanced search with operators (LIKE, IN, BETWEEN, etc)' },
      { name: 'fullTextSearch()', desc: 'Full-text search with relevance scoring' },
      { name: 'fuzzySearch()', desc: 'Find approximate matches with scoring' }
    ]
  },
  'Select': {
    title: 'Select & Query Functions',
    description: 'Flexible data retrieval with powerful querying options. Find, filter, and retrieve records with various strategies.',
    icon: <Shield size={24} />,
    functions: [
      { name: 'select()', desc: 'Advanced select with filtering, ordering, grouping, and pagination' },
      { name: 'selectWhere()', desc: 'Simple select with WHERE conditions' },
      { name: 'findOne()', desc: 'Find a single record by conditions' },
      { name: 'findOrCreate()', desc: 'Find existing record or create new one' },
      { name: 'findOneAndUpdate()', desc: 'Find and update a record in one operation' },
      { name: 'findOneAndDelete()', desc: 'Find and delete a record' },
      { name: 'getByIds()', desc: 'Get multiple records by their IDs' },
      { name: 'first()', desc: 'Get the first record in the table' },
      { name: 'last()', desc: 'Get the last record in the table' },
      { name: 'random()', desc: 'Get random record(s) from table' }
    ]
  },
  'Soft Delete': {
    title: 'Soft Delete Functions',
    description: 'Soft deletion keeps records in the database but marks them as deleted. Query and restore soft-deleted records.',
    icon: <Shield size={24} />,
    functions: [
      { name: 'withTrashed()', desc: 'Include soft-deleted records in results' },
      { name: 'onlyTrashed()', desc: 'Get only soft-deleted records' }
    ]
  },
  'Transaction': {
    title: 'Transaction Functions',
    description: 'Ensure data consistency with atomic operations. Critical for financial and e-commerce applications where data integrity is essential.',
    icon: <Shield size={24} />,
    functions: [
      { name: 'transaction()', desc: 'Execute multiple operations in a transaction' }
    ]
  },
  'Update': {
    title: 'Update Operations',
    description: 'Modify existing records with flexible update strategies. Support for single updates, batch updates, and atomic increments/decrements.',
    icon: <Zap size={24} />,
    functions: [
      { name: 'updateById()', desc: 'Update a record by its ID' },
      { name: 'updateByIdAndReturn()', desc: 'Update by ID and return the updated record' },
      { name: 'updateWhere()', desc: 'Update all records matching conditions' },
      { name: 'batchUpdate()', desc: 'Update multiple records with different values in a transaction' },
      { name: 'increment()', desc: 'Increment a numeric field atomically' },
      { name: 'decrement()', desc: 'Decrement a numeric field atomically' },
      { name: 'incrementMany()', desc: 'Increment multiple fields at once' },
      { name: 'decrementMany()', desc: 'Decrement multiple fields at once' }
    ]
  },
  'Utilities': {
    title: 'Utility Functions',
    description: 'Helper functions for comparing records, cloning, finding duplicates, time travel queries, and smart data operations.',
    icon: <Zap size={24} />,
    functions: [
      { name: 'diff()', desc: 'Compare two records and show differences' },
      { name: 'clone()', desc: 'Clone a record with optional overrides' },
      { name: 'isDuplicate()', desc: 'Check if a record would be a duplicate' },
      { name: 'findDuplicates()', desc: 'Find duplicate records by fields' },
      { name: 'weightedRandom()', desc: 'Get random records with weighted probability' },
      { name: 'batchTransform()', desc: 'Transform all records with a function' },
      { name: 'bulkConditionalUpdate()', desc: 'Update multiple records with different conditions' },
      { name: 'timeTravel()', desc: 'Query records as they were at a timestamp' },
      { name: 'smartMerge()', desc: 'Merge data from multiple tables' }
    ]
  },
  'Where': {
    title: 'Where Clause Functions',
    description: 'Build complex WHERE conditions with intuitive syntax. Support for IN, BETWEEN, NULL checks, comparisons, and pattern matching.',
    icon: <Shield size={24} />,
    functions: [
      { name: 'whereIn()', desc: 'Select records where column is in array' },
      { name: 'whereNotIn()', desc: 'Select records where column is NOT in array' },
      { name: 'whereBetween()', desc: 'Select records where column is between two values' },
      { name: 'whereNotBetween()', desc: 'Select records where column is NOT between values' },
      { name: 'whereNull()', desc: 'Select records where column is NULL' },
      { name: 'whereNotNull()', desc: 'Select records where column is NOT NULL' },
      { name: 'whereGreaterThan()', desc: 'Select records where column > value' },
      { name: 'whereLessThan()', desc: 'Select records where column < value' },
      { name: 'whereStartsWith()', desc: 'Select records where column starts with value' },
      { name: 'whereEndsWith()', desc: 'Select records where column ends with value' },
      { name: 'whereContains()', desc: 'Select records where column contains value' },
      { name: 'whereLike()', desc: 'Select records with LIKE pattern' }
    ]
  }
};

// Modal Component
function CategoryModal({ category, onClose }) {
  const info = categoryDescriptions[category];

  if (!info) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            {info.icon}
          </div>
          <h3>{info.title}</h3>
        </div>

        <p className="modal-description">{info.description}</p>

        <div className="modal-functions-list">
          <h4 style={{ margin: '0 0 1rem 0', color: '#0f172a', fontSize: '1.1rem' }}>
            Key Functions:
          </h4>
          {info.functions.map((func, index) => (
            <div key={index} className="modal-function-item">
              <CheckCircle size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div className="modal-function-name">{func.name}</div>
                <div className="modal-function-desc">{func.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// What's Coming Next Section
function WhatsComingNext() {
  return (
    <section className="whats-next-section">
      <div className="mh-container">
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="whats-next-badge">Coming Soon</span>
          <h2 style={{ fontSize: '2.5rem', margin: '1rem 0', color: 'white' }}>
            What's Coming Next?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            We're constantly evolving to bring you the most innovative database tools. Here's what we're working on next.
          </p>
        </div>

        <div className="whats-next-grid">
          <div className="whats-next-card">
            <div className="whats-next-icon">
              <Brain size={32} color="white" />
            </div>
            <h3>AI-Powered Error Debugging</h3>
            <p>
              Intelligent error analysis and automatic debugging suggestions powered by AI.
              Get instant fixes for common database errors, query optimization tips, and
              performance recommendations in real-time.
            </p>
            <div className="whats-next-features">
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>Automatic error detection and diagnosis</span>
              </div>
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>AI-suggested fixes with code examples</span>
              </div>
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>Query optimization recommendations</span>
              </div>
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>Performance bottleneck identification</span>
              </div>
            </div>
          </div>

          <div className="whats-next-card">
            <div className="whats-next-icon">
              <Cpu size={32} color="white" />
            </div>
            <h3>Python Release</h3>
            <p>
              MySQL2 Helper Lite is coming to Python! Experience the same powerful
              functionality with Pythonic syntax. Perfect for Django, Flask, and FastAPI applications.
            </p>
            <div className="whats-next-features">
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>Full feature parity with Node.js version</span>
              </div>
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>Type hints and async/await support</span>
              </div>
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>Integration with popular Python frameworks</span>
              </div>
              <div className="whats-next-feature">
                <CheckCircle size={18} color="#10b981" />
                <span>Comprehensive documentation and examples</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem', position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
            Want to be notified when these features launch? Follow us on GitHub!
          </p>
          <a
            href="https://github.com/piyaldeb/mysql2-helper-lite"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: '#0f172a',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.3s',
              boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.2)';
            }}
          >
            <Star size={18} /> Star on GitHub
          </a>
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
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      // Handle both /admin paths and #admin hash
      if (pathname === '/admin' || pathname.endsWith('/admin') || hash === '#admin') {
        return 'admin';
      }
    }
    return 'home';
  }); // 'home', 'docs', 'creator', or 'admin'

  // Listen for hash changes to support #admin navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [adminSecret, setAdminSecret] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [pageLoadTime] = useState(() => Date.now());
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      // Fallback to 'admin123' for development if no env variable is set
      const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD ||
                           (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMIN_PASSWORD) ||
                           'admin123'; // Default password for development

      if (secret === adminPassword) {
        setAdminSecret(adminPassword);
      } else if (secret) {
        alert('Invalid password. Hint: Try "admin123" for development.');
        setCurrentView('home');
        return null;
      } else {
        // User cancelled the prompt
        setCurrentView('home');
        return null;
      }
    }

    return (
      <AdminDashboard
        onBack={() => {
          setCurrentView('home');
          setAdminSecret('');
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
                <div key={category} style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    type="button"
                    className={`mh-tab ${categoryFilter === category ? 'mh-tab-active' : ''}`}
                    onClick={(e) => {
                      createRipple(e);
                      setCategoryFilter(category);
                    }}
                    style={{ paddingRight: category !== 'All' ? '2.5rem' : '1.3rem' }}
                  >
                    {category}
                  </button>
                  {category !== 'All' && categoryDescriptions[category] && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                      }}
                      style={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: categoryFilter === category ? 'rgba(255, 255, 255, 0.8)' : 'rgba(100, 116, 139, 0.6)',
                        transition: 'color 0.2s',
                        zIndex: 10
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = categoryFilter === category ? 'white' : '#3b82f6'}
                      onMouseOut={(e) => e.currentTarget.style.color = categoryFilter === category ? 'rgba(255, 255, 255, 0.8)' : 'rgba(100, 116, 139, 0.6)'}
                      title={`Learn more about ${category} functions`}
                    >
                      <Info size={16} />
                    </button>
                  )}
                </div>
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

      <WhatsComingNext />

      <CreatorGlimpse onViewFull={() => setCurrentView('creator')} />

      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}

      <footer className="mh-footer">
        <div className="mh-container">
          <div className="mh-footer-inner">
            <span>MIT Licensed. Made for the developer community.</span>
            <div className="mh-footer-links">
              <a href="https://github.com/piyaldeb">GitHub</a>
              <a href="mailto:piyaldeb87@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
