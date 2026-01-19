import './globals.css';

export const metadata = {
  title: 'Primetrade Web App',
  description: 'Scalable web app with authentication and dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}