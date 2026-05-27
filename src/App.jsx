import { useState, useEffect } from "react";

const NAV_LINKS = ["Home", "Discussion", "Articles", "Reflection", "About"];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length)
            setTimeout(() => setDeleting(true), pause);
          else setCharIdx((c) => c + 1);
        } else {
          setText(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => w + 1);
            setCharIdx(0);
          } else setCharIdx((c) => c - 1);
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

function NavBar({ active, setActive }) {
  const [open, setOpen] = useState(false);
  const go = (l) => {
    setActive(l);
    setOpen(false);
    window.scrollTo({ top: 0 });
  };
  return (
    <nav className="kl-nav">
      <div className="kl-nav-inner">
        <button className="kl-logo" onClick={() => go("Home")}>
          <span style={{ color: "#ff6b00" }}>KEY</span>
          <span style={{ color: "#ffd700" }}>LOGGERS</span>
          <span className="kl-logo-dot"></span>
        </button>
        <div className="kl-nav-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`kl-nav-btn${active === l ? " active" : ""}`}
              onClick={() => go(l)}
            >
              {l}
            </button>
          ))}
        </div>
        <button
          className="kl-burger"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <span
            style={{
              transform: open ? "rotate(45deg) translate(5px,5px)" : "none",
            }}
          ></span>
          <span style={{ opacity: open ? 0 : 1 }}></span>
          <span
            style={{
              transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none",
            }}
          ></span>
        </button>
      </div>
      {open && (
        <div className="kl-mobile-menu">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`kl-mobile-btn${active === l ? " active" : ""}`}
              onClick={() => go(l)}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer({ setActive }) {
  return (
    <footer className="kl-footer">
      <div className="kl-footer-inner">
        <div className="kl-footer-brand">
          <div className="kl-footer-logo">
            <span style={{ color: "#ff6b00" }}>KEY</span>
            <span style={{ color: "#ffd700" }}>WATCH</span>
          </div>
          <p>
            A cybersecurity awareness project on the silent surveillance threat
            hiding in every keystroke.
          </p>
        </div>
        <div className="kl-footer-col">
          <div className="kl-footer-col-title">Navigate</div>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className="kl-footer-link"
              onClick={() => {
                setActive(l);
                window.scrollTo({ top: 0 });
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="kl-footer-col">
          <div className="kl-footer-col-title">Project</div>
          <p className="kl-footer-note">
            Topic: Keylogger — Keystroke Surveillance
          </p>
          <p className="kl-footer-note">
            Academic Cybersecurity Project · 2026
          </p>
        </div>
      </div>
      <div className="kl-footer-bottom">
        <span>© 2025 KeyLoggers — Cybersecurity Awareness</span>
        <span className="kl-footer-tag">// YOUR KEYSTROKES. STAY SAFE.</span>
      </div>
    </footer>
  );
}

function HomePage({ setActive }) {
  const typed = useTypewriter([
    "passwords stolen silently.",
    "bank PINs captured live.",
    "every keystroke recorded.",
    "your secrets — transmitted.",
  ]);
  const logs = [
    {
      ts: "09:14:22",
      app: "chrome.exe",
      keys: "mybankpass123",
      flag: "CREDENTIAL",
      danger: true,
    },
    {
      ts: "09:15:01",
      app: "outlook.exe",
      keys: "wire $47,000...",
      flag: "SENSITIVE",
      danger: false,
    },
    {
      ts: "09:15:44",
      app: "banking.app",
      keys: "4 1 5 2 ****",
      flag: "PIN",
      danger: true,
    },
    {
      ts: "09:16:22",
      app: "telegram.exe",
      keys: "don't tell anyone",
      flag: "PRIVATE",
      danger: false,
    },
  ];
  return (
    <div>
      {/* SPLIT HERO */}
      <div className="kl-split-hero">
        <div className="kl-hero-left">
          <div className="kl-hero-pill">⚠ THREAT LEVEL: CRITICAL</div>
          <h1 className="kl-hero-h1">
            KEY
            <br />
            <span className="kl-hero-accent">LOGGER</span>
          </h1>
          <p className="kl-hero-tagline">
            Right now, someone's device is typing —<br />
            <span className="kl-typed">
              {typed}
              <span className="kl-cursor">|</span>
            </span>
          </p>
          <p className="kl-hero-desc">
            A keylogger sits invisibly between your fingers and the screen,
            recording every character passwords, messages, PINs and silently
            transmitting them to an attacker.
          </p>
          <div className="kl-hero-btns">
            <button
              className="kl-btn-fill"
              onClick={() => setActive("Discussion")}
            >
              Investigate →
            </button>
            <button
              className="kl-btn-outline"
              onClick={() => setActive("Articles")}
            >
              Real Cases
            </button>
          </div>
        </div>
        <div className="kl-hero-right">
          <div className="kl-live-feed">
            <div className="kl-feed-header">
              <span className="kl-rec-dot"></span>
              <span className="kl-feed-title">LIVE KEYSTROKE FEED</span>
              <span className="kl-feed-sub">keylog_capture.exe</span>
            </div>
            {logs.map((l, i) => (
              <div
                key={i}
                className="kl-feed-row"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <span className="kl-feed-ts">{l.ts}</span>
                <span className="kl-feed-app">{l.app}</span>
                <span className="kl-feed-keys">{l.keys}</span>
                <span
                  className={`kl-feed-flag${l.danger ? " danger" : " warn"}`}
                >
                  {l.flag}
                </span>
              </div>
            ))}
            <div className="kl-feed-blink">
              <span className="kl-blink-cursor">█</span> Transmitting to C&amp;C
              server...
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="kl-stats-bar">
        {[
          { n: "10M+", l: "Infected devices worldwide" },
          { n: "82%", l: "Of breaches involve humans" },
          { n: "1970s", l: "First keylogger recorded" },
          { n: "$4.2B", l: "Annual credential-theft losses" },
        ].map(({ n, l }) => (
          <div key={n} className="kl-stat-item">
            <span className="kl-stat-num">{n}</span>
            <span className="kl-stat-label">{l}</span>
          </div>
        ))}
      </div>

      {/* OVERVIEW */}
      <div className="kl-section">
        <div className="kl-section-tag">// OVERVIEW</div>
        <div className="kl-three-col">
          {[
            {
              icon: "⌨️",
              title: "What It Is",
              body: "A covert tool software or hardware that records every keystroke, capturing passwords, messages, and PINs without the user's knowledge.",
            },
            {
              icon: "👁️",
              title: "Why Dangerous",
              body: "Keyloggers are silent and patient. They operate for weeks undetected, collecting everything typed across every app banking, email, messaging.",
            },
            {
              icon: "🛡️",
              title: "How to Stop It",
              body: "Password managers, 2FA, physical device checks, and anti-keylogger tools are your core defenses. Never type sensitive info on public machines.",
            },
          ].map(({ icon, title, body }) => (
            <div key={title} className="kl-overview-card">
              <div className="kl-overview-icon">{icon}</div>
              <h3 className="kl-overview-title">{title}</h3>
              <p className="kl-overview-body">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="kl-section">
        <div className="kl-section-tag">// HISTORY</div>
        <h2 className="kl-section-h2">How Keyloggers Evolved</h2>
        <div className="kl-h-timeline">
          {[
            {
              year: "1970s",
              label: "Soviet KGB",
              event:
                "Hardware keyloggers hidden inside US Embassy IBM typewriters undetected for 8 years.",
            },
            {
              year: "1994",
              label: "First Crime",
              event:
                "Software keylogger used to steal banking credentials in the first documented case.",
            },
            {
              year: "2007",
              label: "Zeus Released",
              event:
                "Zeus banking trojan integrates keylogger, stealing millions in credentials globally.",
            },
            {
              year: "2010",
              label: "FBI Crackdown",
              event:
                "Operation Trident Breach 100+ arrests, $70M in recovered fraud.",
            },
            {
              year: "2021",
              label: "FinFisher",
              event:
                "Commercial keylogger sold to 32 governments, used against journalists and dissidents.",
            },
            {
              year: "2023",
              label: "LastPass",
              event:
                "Engineer's home PC hit by keylogger millions of user vaults compromised.",
            },
          ].map(({ year, label, event }) => (
            <div key={year} className="kl-ht-item">
              <div className="kl-ht-year">{year}</div>
              <div className="kl-ht-label">{label}</div>
              <p className="kl-ht-event">{event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DEFENSE */}
      <div className="kl-section">
        <div className="kl-section-tag">// DEFENSE</div>
        <h2 className="kl-section-h2">Protect Yourself</h2>
        <div className="kl-check-grid">
          {[
            {
              n: "01",
              tip: "Use a password manager auto-fill means you never type credentials.",
            },
            {
              n: "02",
              tip: "Enable 2FA on every sensitive account immediately.",
            },
            {
              n: "03",
              tip: "Physically inspect USB ports on shared computers before use.",
            },
            {
              n: "04",
              tip: "Use on-screen keyboards when entering PINs on public PCs.",
            },
            {
              n: "05",
              tip: "Keep your OS and all software fully updated and patched.",
            },
            {
              n: "06",
              tip: "Run specialized anti-keylogger tools alongside standard antivirus.",
            },
          ].map(({ n, tip }) => (
            <div key={n} className="kl-check-item">
              <span className="kl-check-num">{n}</span>
              <p className="kl-check-tip">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiscussionPage() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { label: "Definition", icon: "⌨️" },
    { label: "History", icon: "📜" },
    { label: "Types", icon: "🔩" },
    { label: "How It Works", icon: "⚙️" },
    { label: "Defense", icon: "🛡️" },
  ];
  return (
    <div className="kl-disc-page">
      <div className="kl-section-tag"></div>
      <h1 className="kl-page-h1">
        Inside the <span className="kl-accent">Keylogger</span>
      </h1>
      <p className="kl-page-intro">
        Everything you need to know from definition to defense.
      </p>

      <div className="kl-tab-nav">
        {tabs.map((t, i) => (
          <button
            key={i}
            className={`kl-tab-btn${tab === i ? " active" : ""}`}
            onClick={() => setTab(i)}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      <div className="kl-tab-panel">
        {tab === 0 && (
          <div>
            <h3 className="kl-tab-h3">What Is a Keylogger?</h3>
            <p className="kl-tab-p">
              A keylogger short for keystroke logger is a surveillance tool,
              either software or hardware, that secretly records every key
              pressed on a keyboard. Every password, every message, every PIN
              you enter is silently captured and stored for an attacker to
              retrieve later.
            </p>
            <p className="kl-tab-p">
              Unlike other attacks that target systems or networks, keyloggers
              target the most fundamental human action in computing typing. They
              don't need to break your encryption; they just wait for you to
              type the key yourself.
            </p>
            <div className="kl-quote-box">
              <span className="kl-quote-text">
                "With keyloggers, hackers don't need to break in. They just wait
                for you to hand them the keys."
              </span>
              <span className="kl-quote-attr">
                — CrowdStrike Threat Intelligence
              </span>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div>
            <h3 className="kl-tab-h3">A Surprisingly Old Threat</h3>
            <p className="kl-tab-p">
              Keyloggers predate the internet. In the 1970s, Soviet intelligence
              embedded hardware keyloggers inside IBM Selectric typewriters at
              the US Embassy in Moscow undetected for nearly 8 years.
            </p>
            <p className="kl-tab-p">
              By the 1990s, software keyloggers emerged alongside personal
              computers. The early 2000s saw them weaponized Zeus, SpyEye, and
              Ghost Keylogger became notorious banking-theft tools. Today,
              keyloggers appear in state-sponsored malware, ransomware packages,
              and commercial spyware sold to governments.
            </p>
            <div className="kl-history-grid">
              {[
                {
                  era: "1970s",
                  desc: "KGB hardware keyloggers in US Embassy typewriters",
                },
                {
                  era: "1994",
                  desc: "First criminal use of software keylogger",
                },
                {
                  era: "2007",
                  desc: "Zeus trojan mass credential theft via keylogging",
                },
                {
                  era: "2023",
                  desc: "LastPass breach via engineer's home keylogger",
                },
              ].map(({ era, desc }) => (
                <div key={era} className="kl-era-card">
                  <span className="kl-era-year">{era}</span>
                  <span className="kl-era-desc">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 2 && (
          <div>
            <h3 className="kl-tab-h3">Six Forms of Keyloggers</h3>
            <div className="kl-type-grid">
              {[
                {
                  name: "Software",
                  icon: "💻",
                  desc: "Malicious programs installed via phishing or infected downloads. Run silently in the background.",
                },
                {
                  name: "Hardware",
                  icon: "🔌",
                  desc: "Physical devices plugged between keyboard and computer. Store keystrokes on internal memory.",
                },
                {
                  name: "Kernel-Level",
                  icon: "⚙️",
                  desc: "Operate at OS kernel level, intercepting keystrokes before any application sees them.",
                },
                {
                  name: "Browser-Based",
                  icon: "🌐",
                  desc: "Malicious extensions capturing form inputs specifically inside the browser.",
                },
                {
                  name: "Acoustic",
                  icon: "🎙️",
                  desc: "Analyzes the distinct sound of each keypress to reconstruct what was typed.",
                },
                {
                  name: "Mobile",
                  icon: "📱",
                  desc: "Fake apps requesting accessibility permissions to capture touchscreen inputs.",
                },
              ].map(({ name, icon, desc }) => (
                <div key={name} className="kl-type-card">
                  <span className="kl-type-icon">{icon}</span>
                  <span className="kl-type-name">{name}</span>
                  <p className="kl-type-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 3 && (
          <div>
            <h3 className="kl-tab-h3">The Attack Chain</h3>
            <div className="kl-chain-wrap">
              {[
                {
                  step: "01",
                  name: "Delivery",
                  desc: "Bundled inside a fake app, cracked software, or phishing attachment and executed by the victim.",
                },
                {
                  step: "02",
                  name: "Installation",
                  desc: "Embeds into the system via startup entries, process injection, or accessibility permission abuse.",
                },
                {
                  step: "03",
                  name: "Interception",
                  desc: "Hooks into the OS input API, capturing every keystroke before it reaches any application.",
                },
                {
                  step: "04",
                  name: "Logging",
                  desc: "Stores keystrokes in an encrypted local file, organized by window title for context.",
                },
                {
                  step: "05",
                  name: "Exfiltration",
                  desc: "Silently transmits logs to a remote C&C server via HTTP during normal traffic.",
                },
              ].map(({ step, name, desc }) => (
                <div key={step} className="kl-chain-item">
                  <div className="kl-chain-step">{step}</div>
                  <div className="kl-chain-info">
                    <span className="kl-chain-name">{name}</span>
                    <p className="kl-chain-desc">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="kl-log-mock">
              <div className="kl-log-bar">
                <span className="kl-log-rec">⬤ RECORDING</span>
                <span className="kl-log-file">
                  keylog_2024_03_15.txt — 3,842 keystrokes
                </span>
              </div>
              <div className="kl-log-body">
                <div className="kl-log-section">
                  [ chrome.exe — bankofamerica.com — 08:14:22 ]
                </div>
                <div className="kl-log-line">
                  Password:{" "}
                  <span className="kl-log-alert">S3cur3P@ss2024!</span>{" "}
                  <span className="kl-log-tag">⚠ CREDENTIAL</span>
                </div>
                <div
                  className="kl-log-section"
                  style={{ marginTop: "0.75rem" }}
                >
                  [ banking.app — PIN Entry — 09:02:44 ]
                </div>
                <div className="kl-log-line">
                  Input: <span className="kl-log-alert">4 1 5 2</span>{" "}
                  <span className="kl-log-tag">⚠ PIN</span>
                </div>
                <div className="kl-log-divider"></div>
                <div className="kl-log-footer">
                  → Transmitting to 192.168.0.1:4444{" "}
                  <span style={{ color: "#ff4400" }}>ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 4 && (
          <div>
            <h3 className="kl-tab-h3">How to Protect Yourself</h3>
            <div className="kl-defense-list">
              {[
                {
                  icon: "🔑",
                  tip: "Use a password manager",
                  detail:
                    "Auto-fill means you never type passwords manually keyloggers capture nothing.",
                },
                {
                  icon: "📱",
                  tip: "Enable 2FA everywhere",
                  detail:
                    "Even with stolen credentials, attackers can't access accounts without your second factor.",
                },
                {
                  icon: "🔍",
                  tip: "Check USB ports physically",
                  detail:
                    "Before using public computers, inspect the keyboard connection for unfamiliar hardware.",
                },
                {
                  icon: "🖱️",
                  tip: "Use on-screen keyboards",
                  detail:
                    "On-screen keyboards bypass hardware keyloggers and many software API-hooking variants.",
                },
                {
                  icon: "🔄",
                  tip: "Keep everything updated",
                  detail:
                    "Keyloggers often exploit unpatched vulnerabilities — updates close these entry points.",
                },
                {
                  icon: "🛡️",
                  tip: "Use anti-keylogger software",
                  detail:
                    "Tools like Malwarebytes and SpyShelter detect keylogger behavior standard antivirus misses.",
                },
                {
                  icon: "🔥",
                  tip: "Monitor network traffic",
                  detail:
                    "Keyloggers must exfiltrate data firewall monitoring for unusual outbound connections can catch them.",
                },
              ].map(({ icon, tip, detail }) => (
                <div key={tip} className="kl-defense-row">
                  <span className="kl-def-icon">{icon}</span>
                  <div>
                    <span className="kl-def-tip">{tip}</span>
                    <p className="kl-def-detail">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ArticlesPage() {
  const articles = [
    {
      num: "01",
      tag: "CASE STUDY",
      source: "Ars Technica",
      date: "Feb 2023",
      title:
        "LastPass Engineer's Device Hit by Keylogger, Exposing Entire Password Vault",
      summary:
        "A senior LastPass engineer's home computer was compromised via a keylogger installed through an outdated Plex media server. The attacker captured master credentials, exposing encrypted vaults of millions of users.",
      url: "https://arstechnica.com",
    },
    {
      num: "02",
      tag: "RESEARCH",
      source: "Wired",
      date: "Mar 2024",
      title:
        "Apple's Find My Network Exploited to Broadcast Stolen Keystrokes via Bluetooth",
      summary:
        "Rogue Bluetooth chips embedded in keyboards weaponized Apple's vast Find My network to relay keylogged data turning innocent Apple devices into unwitting data mules.",
      url: "https://www.wired.com",
    },
    {
      num: "03",
      tag: "SURVEILLANCE",
      source: "The Guardian",
      date: "Sep 2021",
      title:
        "FinFisher Spyware Sold to 32 Governments, Used Against Journalists",
      summary:
        "Commercial keylogger FinFisher was found deployed against journalists, activists, and dissidents across 32 countries by government clients worldwide.",
      url: "https://www.theguardian.com",
    },
    {
      num: "04",
      tag: "CRIME",
      source: "FBI Cyber",
      date: "Oct 2010",
      title: "Zeus Banking Trojan Keylogger Stole Over $100M Globally",
      summary:
        "Operation Trident Breach dismantled the Zeus keylogger network 100+ arrests across the US, UK, and Europe, $70M in recovered fraud.",
      url: "https://www.fbi.gov",
    },
    {
      num: "05",
      tag: "HARDWARE",
      source: "BBC Tech",
      date: "Jun 2019",
      title:
        "Hardware Keyloggers Found Pre-Installed on University Lab Computers",
      summary:
        "Physical keylogger devices discreetly plugged between keyboards and computers in UK university labs collected student credentials for weeks undetected.",
      url: "https://www.bbc.com",
    },
  ];
  return (
    <div className="kl-art-page">
      <div className="kl-section-tag"></div>
      <h1 className="kl-page-h1">
        Documented <span className="kl-accent">Cases</span>
      </h1>
      <p className="kl-page-intro">
        Real incidents and research reports documenting keyloggers in action
        from Cold War espionage to modern corporate breaches.
      </p>

      <div className="kl-bento-grid">
        <div className="kl-bento-large">
          <div className="kl-bento-top">
            <span className="kl-art-tag">{articles[0].tag}</span>
            <span className="kl-art-num">{articles[0].num}</span>
          </div>
          <div className="kl-bento-source">
            {articles[0].source} · {articles[0].date}
          </div>
          <h2 className="kl-bento-title">{articles[0].title}</h2>
          <p className="kl-bento-summary">{articles[0].summary}</p>
          <a
            href={articles[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="kl-art-link"
          >
            Read Full Report →
          </a>
        </div>
        <div className="kl-bento-small-grid">
          {articles.slice(1).map((a) => (
            <div key={a.num} className="kl-bento-small">
              <div className="kl-bento-top">
                <span className="kl-art-tag">{a.tag}</span>
                <span className="kl-art-num">{a.num}</span>
              </div>
              <div className="kl-bento-source">
                {a.source} · {a.date}
              </div>
              <h3 className="kl-bento-small-title">{a.title}</h3>
              <p className="kl-bento-small-summary">{a.summary}</p>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="kl-art-link"
              >
                View Source →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReflectionPage() {
  const items = [
    {
      num: "01",
      title: "What Studying Keyloggers Revealed",
      text: "When I first heard the word 'keylogger,' I imagined something dramatic a hacker furiously typing commands. The reality is far more unsettling: keyloggers are boring in their patience. They sit silently, collecting everything, never announcing themselves. Studying this topic forced me to rethink how I interact with technology on the most basic level typing. Every password I type, every message I send any of these could be intercepted if a keylogger were present. The case of the LastPass engineer hit me hardest. A senior professional with security expertise, taken down not by a sophisticated exploit, but by a keylogger installed through an outdated media app at home. It underscored that expertise is not armor complacency is a vulnerability.",
    },
    {
      num: "02",
      title: "The Silence of the Threat",
      text: "What makes keyloggers uniquely frightening is their invisibility. Ransomware announces itself with locked screens. Viruses crash systems. But a keylogger? It thrives in silence. You may be under surveillance for weeks, months, even years before realizing it. This patience mirrors the most dangerous forms of real-world espionage the kind that doesn't rush, that waits for the perfect moment. The Soviet keylogger inside US Embassy typewriters went undetected for eight years. That historical example bridges eras and reminds us that surveillance whether analog or digital has always been a tool of control. Understanding keyloggers helped me appreciate not just cybersecurity, but the broader social and political dimensions of privacy itself.",
    },
    {
      num: "03",
      title: "Rethinking Digital Habits",
      text: "The most practical takeaway from this research is behavioral. Technology cannot fully protect us from keyloggers no antivirus catches everything, no firewall blocks every exfiltration path. What changes outcomes is habit: using password managers instead of typing credentials, enabling multi-factor authentication, being physically aware of hardware connected to shared computers. These are not complicated actions, but they require a mindset shift treating every keystroke as potentially observed. This is not paranoia; it is informed digital hygiene. I believe this subject deserves a place in everyday education, not just IT curricula. In an era where we type our lives into devices, understanding who might be listening is essential literacy for the modern world.",
    },
  ];
  return (
    <div className="kl-ref-page">
      <div className="kl-section-tag"></div>
      <h1 className="kl-page-h1">
        What I <span className="kl-accent">Learned</span>
      </h1>
      <div className="kl-ref-layout">
        <aside className="kl-ref-side">
          <div className="kl-ref-side-quote">
            "The most dangerous surveillance is the kind you never notice."
          </div>
          <div className="kl-ref-side-stats">
            {[
              { n: "3", l: "Reflections" },
              { n: "8yr", l: "KGB keylogger undetected" },
              { n: "∞", l: "Keystrokes at risk daily" },
            ].map(({ n, l }) => (
              <div key={n} className="kl-ref-side-stat">
                <span className="kl-ref-stat-n">{n}</span>
                <span className="kl-ref-stat-l">{l}</span>
              </div>
            ))}
          </div>
        </aside>
        <div className="kl-ref-main">
          {items.map(({ num, title, text }) => (
            <div key={num} className="kl-ref-card">
              <div className="kl-ref-card-num">{num}</div>
              <div>
                <h3 className="kl-ref-card-title">{title}</h3>
                <p className="kl-ref-card-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="kl-about-page">
      <div className="kl-section-tag"></div>
      <div className="kl-about-banner">
        <div className="kl-about-photo-wrap">
          <img src="/me.jpg" alt="Profile" className="kl-about-photo" />
          <div className="kl-about-ring"></div>
          <div className="kl-about-online">
            <span className="kl-online-dot"></span>Student · Researcher
          </div>
        </div>
        <div className="kl-about-banner-text">
          <div className="kl-about-role">IT STUDENT</div>
          <h1 className="kl-about-name">
            Hello, I'm Januarene T. Fernandez
            <br />
          </h1>
        </div>
      </div>
      <div className="kl-about-info-grid">
        <div className="kl-about-box">
          <h3 className="kl-about-box-title">About Me</h3>
          <p className="kl-about-box-text">
            I'm a student passionate about understanding the digital threats
            shaping our connected world. This site is part of an academic
            exploration of cybersecurity focused on keyloggers, one of the
            oldest and most insidious surveillance threats in computing history.
          </p>
          <p className="kl-about-box-text">
            The deeper I researched keyloggers, the more I realized this threat
            is profoundly human it exploits the most ordinary act: typing.
          </p>
          <div className="kl-about-tags">
            {["Programmer", "IT Studies", "Research", "Web Dev", "Editing"].map(
              (t) => (
                <span key={t} className="kl-about-tag">
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="kl-about-box">
          <h3 className="kl-about-box-title">Details</h3>
          {[
            {
              label: "Field of Study",
              value: "Information Technology / Web Dev",
            },
            { label: "Focus Area", value: "Understanding Online Threats" },
            { label: "Interests", value: "Video Editing" },
            { label: "Location", value: "Philippines" },
            {
              label: "Project",
              value: "Academic Cybersecurity Awareness Site",
            },
          ].map(({ label, value }) => (
            <div key={label} className="kl-detail-row">
              <span className="kl-detail-label">{label}</span>
              <span className="kl-detail-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="kl-about-box">
          <h3 className="kl-about-box-title">Why Keyloggers?</h3>
          <p className="kl-about-box-text">
            Keyloggers represent the quietest, most patient form of digital
            intrusion. Unlike flashy ransomware, keyloggers operate in complete
            silence making them both underestimated and extremely dangerous.
          </p>
          <p className="kl-about-box-text">
            Raising awareness about this threat is a step toward safer digital
            habits for everyone who types on a device every day.
          </p>
          <div className="kl-about-note">
            💬 Built as a class project all info sourced from reputable
            cybersecurity organizations and news outlets.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Live Capture Background
function LiveCaptureBackground() {
  const words = [
    "mypassword",
    "admin123",
    "secret",
    "4152",
    "login2024",
    "p@ssw0rd",
    "qwerty",
    "letmein",
    "monkey",
    "iloveyou",
    "trustno1",
    "welcome",
    "abc123",
    "shadow",
    "dragon",
  ];
  const [items, setItems] = useState([]);

  useEffect(() => {
    let id = 0;
    const spawn = () => {
      const word = words[Math.floor(Math.random() * words.length)];
      const x = 2 + Math.random() * 88;
      const y = 2 + Math.random() * 88;
      const key = id++;
      setItems((prev) => [
        ...prev.slice(-20),
        { key, word, x, y, phase: "typing" },
      ]);
      setTimeout(() => {
        setItems((prev) =>
          prev.map((i) => (i.key === key ? { ...i, phase: "captured" } : i)),
        );
        setTimeout(() => {
          setItems((prev) => prev.filter((i) => i.key !== key));
        }, 900);
      }, 1100);
    };
    spawn();
    const interval = setInterval(spawn, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="kl-bg-canvas">
      {items.map(({ key, word, x, y, phase }) => (
        <div
          key={key}
          className={"kl-bg-item " + phase}
          style={{ left: x + "%", top: y + "%" }}
        >
          <span className="kl-bg-word">{word}</span>
          {phase === "captured" && <span className="kl-bg-tag">CAPTURED</span>}
        </div>
      ))}
    </div>
  );
}

// ── Loading Screen — Spinner + Icon
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const statuses = [
    "Initializing keylogger module...",
    "Hooking keyboard input API...",
    "Scanning active processes...",
    "Establishing secure channel...",
    "Access granted.",
  ];

  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        const n = p + Math.random() * 16 + 5;
        return n >= 100 ? 100 : Math.round(n);
      });
    }, 260);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * statuses.length),
      statuses.length - 1,
    );
    setStatusIdx(idx);
    if (progress >= 100) setTimeout(onDone, 700);
  }, [progress]);

  return (
    <div className="kl-loader">
      <div className="kl-loader-inner">
        <div className="kl-spinner-wrap">
          <svg className="kl-spinner-svg" viewBox="0 0 90 90">
            <circle
              cx="45"
              cy="45"
              r="38"
              fill="none"
              stroke="#1a1000"
              strokeWidth="4"
            />
            <circle
              cx="45"
              cy="45"
              r="38"
              fill="none"
              stroke="#ff9500"
              strokeWidth="4"
              strokeDasharray="55 185"
              strokeLinecap="round"
              style={{
                transformOrigin: "45px 45px",
                animation: "kl-spin 1.1s linear infinite",
              }}
            />
          </svg>
          <div className="kl-spinner-icon">⌨</div>
        </div>
        <div className="kl-loader-logo">
          <span style={{ color: "#ff6b00" }}>KEY</span>
          <span style={{ color: "#ffd700" }}>WATCH</span>
        </div>
        <div className="kl-loader-status">{statuses[statusIdx]}</div>
        <div className="kl-loader-bar-wrap">
          <div
            className="kl-loader-bar"
            style={{ width: Math.min(progress, 100) + "%" }}
          ></div>
        </div>
        <div className="kl-loader-pct">{Math.min(progress, 100)}%</div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  const [loaded, setLoaded] = useState(false);

  if (!loaded)
    return (
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0c0700; font-family: 'DM Sans', sans-serif; color: #f0d8a0; min-height: 100vh; }
        @keyframes kl-spin { to { transform: rotate(360deg); } }
        @keyframes kl-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes kl-fadeup { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .kl-loader { position:fixed; inset:0; background:#0c0700; display:flex; align-items:center; justify-content:center; z-index:9999; }
        .kl-loader-inner { display:flex; flex-direction:column; align-items:center; gap:1.25rem; }
        .kl-spinner-wrap { position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center; }
        .kl-spinner-svg { position:absolute; inset:0; width:100%; height:100%; }
        .kl-spinner-icon { font-size:1.75rem; position:relative; z-index:1; }
        .kl-loader-logo { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:5px; text-shadow:0 0 20px rgba(255,149,0,0.4); }
        .kl-loader-status { font-family:'Space Mono',monospace; font-size:0.72rem; letter-spacing:1.5px; color:#4a3010; text-align:center; min-height:1.2rem; animation:kl-fadeup 0.3s ease; }
        .kl-loader-bar-wrap { width:220px; height:2px; background:#1a1000; border-radius:2px; overflow:hidden; }
        .kl-loader-bar { height:100%; background:#ff9500; border-radius:2px; transition:width 0.25s ease; box-shadow:0 0 8px rgba(255,149,0,0.4); }
        .kl-loader-pct { font-family:'Space Mono',monospace; font-size:0.65rem; color:#4a3010; letter-spacing:2px; }
      `}</style>
        <LoadingScreen onDone={() => setLoaded(true)} />
      </>
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0c0700; font-family: 'DM Sans', sans-serif; color: #f0d8a0; min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
        body::before { content:''; position:fixed; inset:0; pointer-events:none; z-index:9999;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,120,0,0.015) 3px, rgba(255,120,0,0.015) 4px); }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
        a { text-decoration: none; }
        img { max-width: 100%; display: block; }

        @keyframes kl-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes kl-spin   { to{transform:rotate(360deg)} }
        @keyframes kl-pulse  { 0%,100%{opacity:1;box-shadow:0 0 6px #ff9500} 50%{opacity:0.4;box-shadow:none} }
        @keyframes kl-fadeup { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }

        /* ── NAV ── */
        .kl-nav { position:sticky; top:0; z-index:200; background:rgba(12,7,0,0.95); backdrop-filter:blur(14px); border-bottom:1px solid #2a1a00; box-shadow:0 2px 30px rgba(255,120,0,0.07); }
        .kl-nav-inner { max-width:1200px; margin:0 auto; padding:0 1.25rem; height:62px; display:flex; align-items:center; justify-content:space-between; gap:1rem; }
        .kl-logo { font-family:'Bebas Neue',sans-serif; font-size:1.5rem; letter-spacing:4px; color:#ffd700; text-shadow:0 0 20px rgba(255,180,0,0.35); flex-shrink:0; display:flex; align-items:center; gap:3px; }
        .kl-logo-dot { display:inline-block; width:6px; height:6px; border-radius:50%; background:#ff4400; box-shadow:0 0 6px #ff4400; animation:kl-pulse 2s ease-in-out infinite; margin-left:2px; }
        .kl-nav-links { display:flex; gap:2px; }
        .kl-nav-btn { font-family:'Space Mono',monospace; font-size:0.75rem; letter-spacing:1.5px; text-transform:uppercase; color:#7a5a20; padding:0.4rem 0.85rem; border-radius:4px; transition:all 0.2s; white-space:nowrap; }
        .kl-nav-btn:hover { color:#ff9500; background:rgba(255,149,0,0.06); }
        .kl-nav-btn.active { color:#ff9500; background:rgba(255,149,0,0.1); box-shadow:inset 0 0 0 1px rgba(255,149,0,0.2); }
        .kl-burger { display:none; flex-direction:column; gap:5px; padding:6px; flex-shrink:0; }
        .kl-burger span { display:block; width:22px; height:2px; background:#ff9500; border-radius:2px; transition:all 0.25s; }
        .kl-mobile-menu { background:#0f0900; border-top:1px solid #2a1a00; padding:0.5rem 1rem 1rem; display:flex; flex-direction:column; gap:2px; }
        .kl-mobile-btn { font-family:'Space Mono',monospace; font-size:0.82rem; letter-spacing:1.5px; text-transform:uppercase; color:#7a5a20; padding:0.65rem 0.75rem; text-align:left; border-radius:4px; width:100%; }
        .kl-mobile-btn:hover, .kl-mobile-btn.active { color:#ff9500; background:rgba(255,149,0,0.08); }

        /* ── SHARED ── */
        .kl-main-wrap { max-width:1200px; margin:0 auto; padding:0 1.25rem; }
        .kl-section-tag { font-family:'Space Mono',monospace; font-size:0.68rem; letter-spacing:3px; color:#ff4400; margin-bottom:0.5rem; }
        .kl-section { margin:3.5rem 0; }
        .kl-section-h2 { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:3px; color:#f0d8a0; margin-bottom:1.5rem; }
        .kl-accent { color:#ff9500; text-shadow:0 0 18px rgba(255,149,0,0.3); }
        .kl-page-h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,5vw,3.5rem); letter-spacing:3px; color:#f0d8a0; margin-bottom:0.75rem; line-height:1.1; }
        .kl-page-intro { font-size:0.95rem; color:#7a5a20; line-height:1.75; max-width:600px; margin-bottom:2rem; }

        /* ── HOME HERO ── */
        .kl-split-hero { display:flex; gap:2rem; align-items:flex-start; padding:3.5rem 0 2rem; flex-wrap:wrap; }
        .kl-hero-left { flex:1; min-width:280px; }
        .kl-hero-right { width:420px; flex-shrink:0; min-width:280px; }
        .kl-hero-pill { display:inline-block; font-family:'Space Mono',monospace; font-size:0.65rem; letter-spacing:2.5px; color:#ff4400; border:1px solid rgba(255,68,0,0.4); padding:0.3rem 0.9rem; border-radius:2px; margin-bottom:1.25rem; animation:kl-pulse 2s ease-in-out infinite; }
        .kl-hero-h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(3.5rem,9vw,7rem); line-height:1; letter-spacing:4px; color:#f0d8a0; margin-bottom:0.75rem; }
        .kl-hero-accent { color:#ff9500; text-shadow:0 0 40px rgba(255,149,0,0.4); }
        .kl-hero-tagline { font-family:'Space Mono',monospace; font-size:0.82rem; color:#7a5a20; margin-bottom:1rem; line-height:1.8; }
        .kl-typed { color:#ff9500; text-shadow:0 0 10px rgba(255,149,0,0.3); }
        .kl-cursor { animation:kl-blink 0.8s step-end infinite; color:#ff4400; }
        .kl-hero-desc { font-size:0.95rem; color:#c0a060; line-height:1.8; max-width:480px; margin-bottom:1.75rem; opacity:0.85; }
        .kl-hero-btns { display:flex; gap:0.75rem; flex-wrap:wrap; }
        .kl-btn-fill { background:#ff9500; color:#0c0700; font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:3px; padding:0.6rem 1.75rem; border-radius:4px; box-shadow:0 0 20px rgba(255,149,0,0.3); transition:all 0.2s; }
        .kl-btn-fill:hover { background:#cc7700; box-shadow:0 0 32px rgba(255,149,0,0.5); transform:translateY(-2px); }
        .kl-btn-outline { background:transparent; color:#ff9500; border:1px solid #ff9500; font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:3px; padding:0.6rem 1.75rem; border-radius:4px; transition:all 0.2s; }
        .kl-btn-outline:hover { background:rgba(255,149,0,0.08); }

        /* ── LIVE FEED ── */
        .kl-live-feed { background:#050300; border:1px solid #2a1a00; border-radius:6px; overflow:hidden; box-shadow:0 0 40px rgba(255,100,0,0.06); }
        .kl-feed-header { background:#0a0500; border-bottom:1px solid #2a1a00; padding:0.6rem 1rem; display:flex; align-items:center; gap:0.6rem; }
        .kl-rec-dot { width:8px; height:8px; border-radius:50%; background:#ff4400; box-shadow:0 0 6px #ff4400; animation:kl-pulse 1.2s ease-in-out infinite; flex-shrink:0; }
        .kl-feed-title { font-family:'Space Mono',monospace; font-size:0.68rem; letter-spacing:2px; color:#ff4400; flex:1; }
        .kl-feed-sub { font-family:'Space Mono',monospace; font-size:0.6rem; color:#4a3010; }
        .kl-feed-row { display:flex; gap:0.5rem; align-items:center; padding:0.45rem 1rem; border-bottom:1px solid #150e00; flex-wrap:wrap; animation:kl-fadeup 0.4s ease forwards; opacity:0; }
        .kl-feed-ts { font-family:'Space Mono',monospace; font-size:0.62rem; color:#4a3010; flex-shrink:0; }
        .kl-feed-app { font-family:'Space Mono',monospace; font-size:0.68rem; color:#cc7700; min-width:90px; flex-shrink:0; }
        .kl-feed-keys { font-family:'Space Mono',monospace; font-size:0.7rem; color:#c0a060; flex:1; opacity:0.8; word-break:break-all; }
        .kl-feed-flag { font-family:'Space Mono',monospace; font-size:0.58rem; padding:1px 6px; border-radius:3px; font-weight:700; letter-spacing:0.5px; flex-shrink:0; white-space:nowrap; }
        .kl-feed-flag.danger { background:rgba(255,50,0,0.15); color:#ff4400; border:1px solid rgba(255,50,0,0.3); }
        .kl-feed-flag.warn { background:rgba(255,150,0,0.12); color:#ffaa00; border:1px solid rgba(255,150,0,0.25); }
        .kl-feed-blink { font-family:'Space Mono',monospace; font-size:0.66rem; color:#4a3010; padding:0.5rem 1rem; border-top:1px solid #150e00; }
        .kl-blink-cursor { color:#ff9500; animation:kl-blink 0.8s step-end infinite; }

        /* ── STATS BAR ── */
        .kl-stats-bar { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:1.5rem; margin:2rem 0; }
        .kl-stat-item { display:flex; flex-direction:column; align-items:center; gap:0.25rem; text-align:center; }
        .kl-stat-num { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:2px; color:#ff9500; text-shadow:0 0 14px rgba(255,149,0,0.4); }
        .kl-stat-label { font-family:'Space Mono',monospace; font-size:0.6rem; color:#7a5a20; letter-spacing:0.5px; line-height:1.4; }

        /* ── OVERVIEW CARDS ── */
        .kl-three-col { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
        .kl-overview-card { background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:1.5rem; transition:border-color 0.2s; }
        .kl-overview-card:hover { border-color:#4a2a00; }
        .kl-overview-icon { font-size:1.5rem; margin-bottom:0.65rem; }
        .kl-overview-title { font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:2px; color:#ff9500; margin-bottom:0.5rem; }
        .kl-overview-body { font-size:0.86rem; color:#7a5a20; line-height:1.7; }

        /* ── HORIZONTAL TIMELINE ── */
        .kl-h-timeline { display:grid; grid-template-columns:repeat(6,1fr); gap:0; }
        .kl-ht-item { padding:1.25rem 0.75rem 1.25rem 0; border-top:2px solid #2a1a00; position:relative; }
        .kl-ht-item::before { content:''; position:absolute; top:-6px; left:0; width:10px; height:10px; border-radius:50%; background:#ff9500; box-shadow:0 0 8px #ff9500; }
        .kl-ht-year { font-family:'Bebas Neue',sans-serif; font-size:1.3rem; letter-spacing:2px; color:#ff9500; margin-bottom:0.15rem; }
        .kl-ht-label { font-family:'Space Mono',monospace; font-size:0.62rem; color:#ff4400; letter-spacing:1px; text-transform:uppercase; margin-bottom:0.4rem; display:block; }
        .kl-ht-event { font-size:0.78rem; color:#7a5a20; line-height:1.6; }

        /* ── CHECK GRID ── */
        .kl-check-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
        .kl-check-item { background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:1.1rem 1.25rem; display:flex; gap:1rem; align-items:flex-start; transition:border-color 0.2s; }
        .kl-check-item:hover { border-color:#4a2a00; }
        .kl-check-num { font-family:'Bebas Neue',sans-serif; font-size:1.8rem; color:#1a1000; line-height:1; flex-shrink:0; }
        .kl-check-tip { font-size:0.86rem; color:#7a5a20; line-height:1.65; }

        /* ── DISCUSSION ── */
        .kl-disc-page { padding:2.5rem 0 4rem; }
        .kl-tab-nav { display:flex; gap:0.5rem; margin-bottom:1.75rem; border-bottom:1px solid #2a1a00; flex-wrap:wrap; }
        .kl-tab-btn { font-family:'Space Mono',monospace; font-size:0.72rem; letter-spacing:1px; text-transform:uppercase; color:#7a5a20; padding:0.55rem 1rem; border-bottom:2px solid transparent; margin-bottom:-1px; transition:all 0.2s; display:flex; align-items:center; gap:0.4rem; white-space:nowrap; }
        .kl-tab-btn:hover { color:#ff9500; }
        .kl-tab-btn.active { color:#ff9500; border-bottom-color:#ff9500; }
        .kl-tab-panel { background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:2rem; min-height:300px; }
        .kl-tab-h3 { font-family:'Bebas Neue',sans-serif; font-size:1.6rem; letter-spacing:2px; color:#f0d8a0; margin-bottom:1rem; }
        .kl-tab-p { font-size:0.92rem; color:#c0a060; line-height:1.85; margin-bottom:0.85rem; opacity:0.85; }
        .kl-quote-box { border-left:3px solid #ff9500; padding:1rem 1.25rem; background:rgba(255,149,0,0.04); border-radius:0 4px 4px 0; margin-top:1.5rem; }
        .kl-quote-text { font-family:'Space Mono',monospace; font-size:0.85rem; color:#ff9500; display:block; line-height:1.7; opacity:0.85; }
        .kl-quote-attr { font-family:'Space Mono',monospace; font-size:0.62rem; color:#4a3010; display:block; margin-top:0.4rem; font-style:italic; }

        /* history grid inside tab */
        .kl-history-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0.75rem; margin-top:1.5rem; }
        .kl-era-card { background:#150e00; border:1px solid #2a1a00; border-radius:4px; padding:0.85rem; display:flex; flex-direction:column; gap:0.3rem; }
        .kl-era-year { font-family:'Bebas Neue',sans-serif; font-size:1.2rem; letter-spacing:2px; color:#ff9500; }
        .kl-era-desc { font-size:0.78rem; color:#7a5a20; line-height:1.5; }

        /* type grid */
        .kl-type-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
        .kl-type-card { background:#150e00; border:1px solid #2a1a00; border-radius:4px; padding:1.1rem; display:flex; flex-direction:column; gap:0.4rem; }
        .kl-type-icon { font-size:1.3rem; }
        .kl-type-name { font-family:'Bebas Neue',sans-serif; font-size:1rem; letter-spacing:1.5px; color:#ff9500; }
        .kl-type-desc { font-size:0.82rem; color:#7a5a20; line-height:1.65; }

        /* chain */
        .kl-chain-wrap { display:grid; grid-template-columns:repeat(5,1fr); gap:0.75rem; margin-bottom:2rem; }
        .kl-chain-item { display:flex; flex-direction:column; gap:0.4rem; }
        .kl-chain-step { font-family:'Bebas Neue',sans-serif; font-size:1.8rem; letter-spacing:2px; color:#1a1000; line-height:1; }
        .kl-chain-info { background:#150e00; border:1px solid #2a1a00; border-radius:4px; padding:0.75rem; flex:1; }
        .kl-chain-name { font-family:'Bebas Neue',sans-serif; font-size:0.95rem; letter-spacing:1.5px; color:#ff9500; display:block; margin-bottom:0.25rem; }
        .kl-chain-desc { font-size:0.78rem; color:#7a5a20; line-height:1.6; margin:0; }

        /* log mock */
        .kl-log-mock { background:#050300; border:1px solid #2a1a00; border-radius:6px; overflow:hidden; margin-top:1.5rem; }
        .kl-log-bar { background:#0a0500; border-bottom:1px solid #2a1a00; padding:0.55rem 1rem; display:flex; align-items:center; gap:1rem; flex-wrap:wrap; }
        .kl-log-rec { font-family:'Space Mono',monospace; font-size:0.65rem; color:#ff4400; letter-spacing:1.5px; animation:kl-pulse 1.2s ease-in-out infinite; }
        .kl-log-file { font-family:'Space Mono',monospace; font-size:0.65rem; color:#4a3010; }
        .kl-log-body { padding:1rem 1.25rem; }
        .kl-log-section { font-family:'Space Mono',monospace; font-size:0.68rem; color:#ff4400; margin-bottom:0.35rem; }
        .kl-log-line { font-family:'Space Mono',monospace; font-size:0.76rem; color:#4a3010; padding:0.2rem 0; display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; }
        .kl-log-alert { color:#ff4400; text-shadow:0 0 5px rgba(255,68,0,0.3); }
        .kl-log-tag { font-size:0.6rem; padding:1px 6px; border-radius:3px; background:rgba(255,68,0,0.12); color:#ff4400; border:1px solid rgba(255,68,0,0.25); font-weight:700; white-space:nowrap; }
        .kl-log-divider { height:1px; background:#150e00; margin:0.6rem 0; }
        .kl-log-footer { font-family:'Space Mono',monospace; font-size:0.7rem; color:#4a3010; }

        /* defense */
        .kl-defense-list { display:flex; flex-direction:column; gap:0.75rem; }
        .kl-defense-row { background:#150e00; border:1px solid #2a1a00; border-radius:4px; padding:0.85rem 1rem; display:flex; gap:0.85rem; align-items:flex-start; }
        .kl-def-icon { font-size:1.1rem; flex-shrink:0; margin-top:2px; }
        .kl-def-tip { font-family:'Bebas Neue',sans-serif; font-size:0.95rem; letter-spacing:1.5px; color:#ff9500; display:block; margin-bottom:0.2rem; }
        .kl-def-detail { font-size:0.83rem; color:#7a5a20; line-height:1.6; margin:0; }

        /* ── ARTICLES ── */
        .kl-art-page { padding:2.5rem 0 4rem; }
        .kl-bento-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .kl-bento-large { background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:2rem; display:flex; flex-direction:column; gap:0.75rem; }
        .kl-bento-small-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .kl-bento-small { background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:1.25rem; display:flex; flex-direction:column; gap:0.6rem; transition:border-color 0.2s,transform 0.2s; }
        .kl-bento-small:hover { border-color:#4a2a00; transform:translateY(-2px); }
        .kl-bento-top { display:flex; justify-content:space-between; align-items:center; }
        .kl-bento-source { font-family:'Space Mono',monospace; font-size:0.62rem; color:#4a3010; }
        .kl-bento-title { font-family:'Bebas Neue',sans-serif; font-size:1.3rem; letter-spacing:1.5px; color:#f0d8a0; line-height:1.25; }
        .kl-bento-summary { font-size:0.86rem; color:#7a5a20; line-height:1.7; flex:1; }
        .kl-bento-small-title { font-family:'Bebas Neue',sans-serif; font-size:1rem; letter-spacing:1px; color:#f0d8a0; line-height:1.3; }
        .kl-bento-small-summary { font-size:0.78rem; color:#7a5a20; line-height:1.65; flex:1; }
        .kl-art-tag { font-family:'Space Mono',monospace; font-size:0.6rem; letter-spacing:1px; color:#ff4400; background:rgba(255,68,0,0.08); border:1px solid rgba(255,68,0,0.2); padding:2px 8px; border-radius:3px; text-transform:uppercase; }
        .kl-art-num { font-family:'Space Mono',monospace; font-size:0.65rem; color:#2a1a00; }
        .kl-art-link { font-family:'Space Mono',monospace; font-size:0.72rem; letter-spacing:1px; text-transform:uppercase; color:#ff9500; border-top:1px solid #2a1a00; padding-top:0.65rem; margin-top:auto; display:block; transition:color 0.2s,letter-spacing 0.2s; }
        .kl-art-link:hover { color:#ff4400; letter-spacing:2px; }

        /* ── REFLECTION ── */
        .kl-ref-page { padding:2.5rem 0 4rem; }
        .kl-ref-layout { display:flex; gap:2.5rem; align-items:flex-start; }
        .kl-ref-side { width:190px; flex-shrink:0; position:sticky; top:80px; }
        .kl-ref-side-quote { font-family:'Space Mono',monospace; font-size:0.76rem; color:#ff9500; line-height:1.7; border-left:2px solid #ff9500; padding-left:0.85rem; margin-bottom:2rem; opacity:0.8; }
        .kl-ref-side-stats { display:flex; flex-direction:column; gap:1.25rem; }
        .kl-ref-side-stat { display:flex; flex-direction:column; gap:0.15rem; }
        .kl-ref-stat-n { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:2px; color:#1a1000; line-height:1; }
        .kl-ref-stat-l { font-family:'Space Mono',monospace; font-size:0.6rem; color:#4a3010; line-height:1.4; }
        .kl-ref-main { flex:1; display:flex; flex-direction:column; gap:1.5rem; min-width:0; }
        .kl-ref-card { background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:1.75rem; display:flex; gap:1.5rem; align-items:flex-start; }
        .kl-ref-card-num { font-family:'Bebas Neue',sans-serif; font-size:3rem; letter-spacing:2px; color:#1a1000; line-height:1; flex-shrink:0; }
        .kl-ref-card-title { font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:2px; color:#ff9500; margin-bottom:0.65rem; }
        .kl-ref-card-text { font-size:0.91rem; color:#c0a060; line-height:1.9; opacity:0.82; }

        /* ── ABOUT ── */
        .kl-about-page { padding:2.5rem 0 4rem; }
        .kl-about-banner { display:flex; gap:2.5rem; align-items:center; background:#0f0900; border:1px solid #2a1a00; border-radius:8px; padding:2.5rem; margin-bottom:2rem; flex-wrap:wrap; }
        .kl-about-photo-wrap { position:relative; flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:0.65rem; }
        .kl-about-photo { width:140px; height:140px; border-radius:50%; object-fit:cover; object-position:center 75%; border:3px solid #ff9500; box-shadow:0 0 32px rgba(255,149,0,0.25); }
        .kl-about-ring { position:absolute; inset:-8px; border-radius:50%; border:1px dashed #2a1a00; animation:kl-spin 14s linear infinite; pointer-events:none; }
        .kl-about-online { font-family:'Space Mono',monospace; font-size:0.65rem; color:#7a5a20; display:flex; align-items:center; gap:0.4rem; }
        .kl-online-dot { width:7px; height:7px; border-radius:50%; background:#ff9500; box-shadow:0 0 6px #ff9500; animation:kl-pulse 2s ease-in-out infinite; flex-shrink:0; }
        .kl-about-role { font-family:'Space Mono',monospace; font-size:0.68rem; letter-spacing:3px; color:#ff4400; margin-bottom:0.5rem; }
        .kl-about-name { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,5vw,4rem); letter-spacing:3px; color:#f0d8a0; line-height:1.05; }
        .kl-about-info-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
        .kl-about-box { background:#0f0900; border:1px solid #2a1a00; border-radius:6px; padding:1.5rem; }
        .kl-about-box-title { font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:2px; color:#ff9500; margin-bottom:0.85rem; }
        .kl-about-box-text { font-size:0.87rem; color:#7a5a20; line-height:1.8; margin-bottom:0.65rem; }
        .kl-about-tags { display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:1rem; }
        .kl-about-tag { font-family:'Space Mono',monospace; font-size:0.6rem; letter-spacing:0.5px; color:#4a3010; background:#150e00; border:1px solid #2a1a00; border-radius:3px; padding:3px 10px; text-transform:uppercase; }
        .kl-detail-row { display:flex; flex-direction:column; gap:0.15rem; padding-bottom:0.6rem; border-bottom:1px solid #150e00; margin-bottom:0.6rem; }
        .kl-detail-row:last-child { border-bottom:none; padding-bottom:0; margin-bottom:0; }
        .kl-detail-label { font-family:'Space Mono',monospace; font-size:0.6rem; letter-spacing:1px; color:#4a3010; text-transform:uppercase; }
        .kl-detail-value { font-size:0.87rem; color:#c0a060; }
        .kl-about-note { font-family:'Space Mono',monospace; font-size:0.7rem; color:#4a3010; background:#150e00; border:1px solid #2a1a00; border-radius:4px; padding:0.75rem; line-height:1.65; margin-top:1rem; }

        /* ── FOOTER ── */
        .kl-footer { border-top:1px solid #2a1a00; background:#080500; margin-top:5rem; }
        .kl-footer-inner { max-width:1200px; margin:0 auto; padding:2.5rem 1.25rem; display:grid; grid-template-columns:1fr 1fr 1fr; gap:2rem; }
        .kl-footer-brand p { font-size:0.8rem; color:#4a3010; line-height:1.65; margin-top:0.5rem; }
        .kl-footer-logo { font-family:'Bebas Neue',sans-serif; font-size:1.4rem; letter-spacing:4px; text-shadow:0 0 16px rgba(255,149,0,0.3); }
        .kl-footer-col { display:flex; flex-direction:column; gap:0.4rem; }
        .kl-footer-col-title { font-family:'Space Mono',monospace; font-size:0.62rem; letter-spacing:2px; text-transform:uppercase; color:#ff4400; margin-bottom:0.4rem; }
        .kl-footer-link { font-size:0.82rem; color:#4a3010; text-align:left; padding:0; transition:color 0.2s; }
        .kl-footer-link:hover { color:#ff9500; }
        .kl-footer-note { font-size:0.8rem; color:#4a3010; line-height:1.65; margin-bottom:0.2rem; }
        .kl-footer-bottom { max-width:1200px; margin:0 auto; padding:1rem 1.25rem; border-top:1px solid #1a0e00; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; font-family:'Space Mono',monospace; font-size:0.65rem; color:#2a1a00; }
        .kl-footer-tag { color:#ff9500; opacity:0.45; }


        /* ── LIVE CAPTURE BACKGROUND ── */
        .kl-bg-canvas { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
        .kl-bg-item { position:absolute; display:flex; flex-direction:column; align-items:flex-start; gap:2px; transition:all 0.3s ease; }
        .kl-bg-item.typing .kl-bg-word { font-family:'Space Mono',monospace; font-size:0.72rem; color:#2a1a00; letter-spacing:2px; opacity:0; animation:kl-captype 1.1s ease forwards; }
        .kl-bg-item.captured .kl-bg-word { font-family:'Space Mono',monospace; font-size:0.72rem; color:#3d2200; letter-spacing:2px; opacity:1; }
        .kl-bg-tag { font-family:'Space Mono',monospace; font-size:0.55rem; color:#6a2800; background:rgba(255,68,0,0.08); border:1px solid rgba(255,68,0,0.15); padding:0px 4px; border-radius:2px; letter-spacing:1px; animation:kl-tagpop 0.9s ease forwards; }
        @keyframes kl-captype { 0%{opacity:0;letter-spacing:6px} 30%{opacity:0.6} 100%{opacity:1;letter-spacing:2px} }
        @keyframes kl-tagpop { 0%{opacity:0;transform:translateX(-4px)} 20%{opacity:1;transform:none} 80%{opacity:1} 100%{opacity:0} }

        /* ── LOADING SCREEN ── */
        .kl-loader { position:fixed; inset:0; background:#0c0700; display:flex; align-items:center; justify-content:center; z-index:9999; }
        .kl-loader-inner { display:flex; flex-direction:column; align-items:center; gap:1.25rem; }
        .kl-spinner-wrap { position:relative; width:90px; height:90px; display:flex; align-items:center; justify-content:center; }
        .kl-spinner-svg { position:absolute; inset:0; width:100%; height:100%; }
        .kl-spinner-icon { font-size:1.75rem; position:relative; z-index:1; }
        .kl-loader-logo { font-family:'Bebas Neue',sans-serif; font-size:2rem; letter-spacing:5px; text-shadow:0 0 20px rgba(255,149,0,0.4); }
        .kl-loader-status { font-family:'Space Mono',monospace; font-size:0.72rem; letter-spacing:1.5px; color:#4a3010; text-align:center; min-height:1.2rem; animation:kl-fadeup 0.3s ease; }
        .kl-loader-bar-wrap { width:220px; height:2px; background:#1a1000; border-radius:2px; overflow:hidden; }
        .kl-loader-bar { height:100%; background:#ff9500; border-radius:2px; transition:width 0.25s ease; box-shadow:0 0 8px rgba(255,149,0,0.4); }
        .kl-loader-pct { font-family:'Space Mono',monospace; font-size:0.65rem; color:#4a3010; letter-spacing:2px; }

        /* ensure main content sits above bg canvas */
        .kl-nav { position:sticky; top:0; z-index:200; }
        .kl-main-wrap { position:relative; z-index:1; }
        footer.kl-footer { position:relative; z-index:1; }

        /* ══ RESPONSIVE ══════════════════════════════════════════════════════ */

        /* Tablet ≤ 960px */
        @media (max-width: 960px) {
          .kl-three-col   { grid-template-columns: repeat(2, 1fr); }
          .kl-h-timeline  { grid-template-columns: repeat(3, 1fr); }
          .kl-check-grid  { grid-template-columns: repeat(2, 1fr); }
          .kl-type-grid   { grid-template-columns: repeat(2, 1fr); }
          .kl-chain-wrap  { grid-template-columns: repeat(3, 1fr); }
          .kl-history-grid { grid-template-columns: repeat(2, 1fr); }
          .kl-bento-small-grid { grid-template-columns: 1fr 1fr; }
          .kl-about-info-grid { grid-template-columns: 1fr 1fr; }
          .kl-footer-inner { grid-template-columns: 1fr 1fr; }
          .kl-footer-inner .kl-footer-col:last-child { grid-column: 1 / -1; }
          .kl-ref-side { position: static; width: 100%; }
          .kl-ref-layout { flex-direction: column; gap: 1.5rem; }
          .kl-ref-side-stats { flex-direction: row; flex-wrap: wrap; gap: 1.5rem; }
        }

        /* Mobile ≤ 700px */
        @media (max-width: 700px) {
          .kl-nav-links { display: none; }
          .kl-burger { display: flex; }
          .kl-hero-right { width: 100%; }
          .kl-stats-bar { grid-template-columns: repeat(2, 1fr); }
          .kl-three-col { grid-template-columns: 1fr; }
          .kl-h-timeline { grid-template-columns: repeat(2, 1fr); }
          .kl-check-grid { grid-template-columns: 1fr; }
          .kl-bento-grid { grid-template-columns: 1fr; }
          .kl-bento-small-grid { grid-template-columns: 1fr; }
          .kl-about-banner { flex-direction: column; align-items: flex-start; padding: 1.5rem; gap: 1.25rem; }
          .kl-about-info-grid { grid-template-columns: 1fr; }
          .kl-footer-inner { grid-template-columns: 1fr; }
          .kl-tab-btn { font-size: 0.65rem; padding: 0.4rem 0.6rem; }
          .kl-type-grid { grid-template-columns: 1fr; }
          .kl-chain-wrap { grid-template-columns: 1fr 1fr; }
          .kl-history-grid { grid-template-columns: 1fr 1fr; }
          .kl-ref-card { flex-direction: column; gap: 0.5rem; padding: 1.25rem; }
          .kl-ref-card-num { font-size: 1.5rem; }
          .kl-footer-bottom { flex-direction: column; align-items: flex-start; }
        }

        /* Small mobile ≤ 420px */
        @media (max-width: 420px) {
          .kl-hero-h1 { font-size: 3.2rem; }
          .kl-h-timeline { grid-template-columns: 1fr; }
          .kl-chain-wrap { grid-template-columns: 1fr; }
          .kl-history-grid { grid-template-columns: 1fr; }
          .kl-stats-bar { grid-template-columns: 1fr 1fr; }
          .kl-about-photo { width: 110px; height: 110px; }
          .kl-tab-btn span { display: none; }
        }
      `}</style>

      <LiveCaptureBackground />
      <NavBar active={active} setActive={setActive} />
      <div className="kl-main-wrap">
        {active === "Home" && <HomePage setActive={setActive} />}
        {active === "Discussion" && <DiscussionPage />}
        {active === "Articles" && <ArticlesPage />}
        {active === "Reflection" && <ReflectionPage />}
        {active === "About" && <AboutPage />}
      </div>
      <Footer setActive={setActive} />
    </>
  );
}
