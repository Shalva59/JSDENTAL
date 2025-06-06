import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Page";
import Footer from "./components/Footer/Page";
import { Inter } from "next/font/google";
import Script from 'next/script';
import { LanguageProvider } from "../context/LanguageContext";
import { AuthProvider } from './providers/AuthProvider';
import { NotificationsProvider } from "../context/NotificationsContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "JC Dental",
  description: "JC Dental website",
  icons: {
    icon: "/favicon.ico",
  },
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        {/* ქართული ფონტების ჩატვირთვა */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={inter.className} style={{ background: "white" }}>
        {/* Wrap everything with SessionProvider */}
        <AuthProvider>
          {/* Language context provider */}
          <LanguageProvider>
            {/* Notifications context provider */}
            <NotificationsProvider>
              <Header />
              {children}
              <Footer />
            </NotificationsProvider>
          </LanguageProvider>
        </AuthProvider>

        {/* LiveChat script */}
        <Script
          id="livechat-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 19095868;
              window.__lc.integration_name = "manual_channels";
              window.__lc.product_name = "livechat";
              (function(n, t, c) {
                function i(n) {
                  return e._h ? e._h.apply(null, n) : e._q.push(n);
                }
                var e = {
                  _q: [], _h: null, _v: "2.0",
                  on: function() { i(["on", c.call(arguments)]); },
                  once: function() { i(["once", c.call(arguments)]); },
                  off: function() { i(["off", c.call(arguments)]); },
                  get: function() {
                    if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
                    return i(["get", c.call(arguments)]);
                  },
                  call: function() { i(["call", c.call(arguments)]); },
                  init: function() {
                    var n = t.createElement("script");
                    n.async = !0;
                    n.type = "text/javascript";
                    n.src = "https://cdn.livechatinc.com/tracking.js";
                    t.head.appendChild(n);
                  }
                };
                !n.__lc.asyncInit && e.init(),
                n.LiveChatWidget = n.LiveChatWidget || e;
              })(window, document, [].slice);
            `,
          }}
        />
        <noscript>
          <a href="https://www.livechat.com/chat-with/19095868/" rel="nofollow">
            Chat with us
          </a>, powered by
          <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">
            LiveChat
          </a>
        </noscript>
      </body>
    </html>
  );
}