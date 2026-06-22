
import { useEffect } from 'react';
import styles from '../styles/Chatbase.module.css';

export default function ChatbaseWidget() {
  useEffect(() => {
    // TODO: Add your Chatbase integration script here
    // Example:
    // window.embeddedChatbotConfig = {
    //   chatbotId: "YOUR_CHATBOT_ID",
    //   domain: "www.chatbase.co"
    // }
    // const script = document.createElement('script');
    // script.src = "https://www.chatbase.co/embed.min.js";
    // script.defer = true;
    // document.body.appendChild(script);
  }, []);

  return (
    <section id="ai-assistant" className={styles.chatbase}>
      <h2>AI Assistant for Farmers</h2>
      <div className={styles.chatContainer}>
        {/* Chatbase widget will be embedded here */}
        <p className={styles.placeholder}>Chatbase AI integration space - Add your chatbot ID in ChatbaseWidget.jsx</p>
      </div>
    </section>
  );
}
