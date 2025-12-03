import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


export const metadata = {
  title: "CourseMaster",
  description: "E-learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
          <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
