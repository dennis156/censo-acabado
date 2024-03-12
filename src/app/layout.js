import { Inter } from "next/font/google";
import "../styles/styles.css";
import "../styles/misEstilos.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Censo Web",
  description: "Sitio para censar a damnificados del huracán Otis en Acapulco",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
