import { Poppins } from "next/font/google";
import "./globals.css";
import CartProviderWrapper from '@/components/CartProviderWrapper';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'], 
  subsets: ['latin'],
  variable: '--font-poppins', 
});

export const metadata = {
  title: "Shopeasy",
  description: "Toko online mudah dan terpercaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-white`}
      >
        <CartProviderWrapper>
          {children}
        </CartProviderWrapper>
      </body>
    </html>
  );
}