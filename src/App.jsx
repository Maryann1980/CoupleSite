// App.jsx
import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Timeline from "./Timeline";
import Gallery from "./Gallery";
import Guestbook from "./Guestbook";
import LoveLetters from "./LoveLetters";
import Locker from "./Locker";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";

export default function App() {
  return (
    <div id="page-wrapper">
      <Header />
      <main id="main-content">
        <HeroSection />
        <Timeline />
        <Gallery />
        <Guestbook />
        <LoveLetters />
        <Locker />
      </main>
      <ChatBubble />
      
    </div>
  );
}
