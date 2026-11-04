export default function SocialLinks() {
  return (
    <div className="ap-cta-socials">
      <a href="https://www.instagram.com/hapcraftmedia?utm_source=qr&igsh=cHdmNHExMjQ2aWQ=" target="_blank" rel="noopener noreferrer" className="ap-social-btn" aria-label="Instagram">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a href="https://x.com/HapcraftMedia" target="_blank" rel="noopener noreferrer" className="ap-social-btn" aria-label="X (Twitter)">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a href="https://www.linkedin.com/company/hapcraftmedia/" target="_blank" rel="noopener noreferrer" className="ap-social-btn" aria-label="LinkedIn">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
        </svg>
      </a>
      <a href="mailto:support@hapcraftmedia.com" className="ap-social-btn" aria-label="Email">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
        </svg>
      </a>
    </div>
  );
}
