import '../app/globals.css';  // Ensure correct path to global CSS

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

