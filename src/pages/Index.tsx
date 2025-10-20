import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Temukan Gaya Fashion Wanita Impian Anda
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Jelajahi koleksi atasan wanita terbaru dan terlengkap.
        </p>
        <Button asChild size="lg" className="px-8 py-3 text-lg">
          <Link to="/products">Mulai Belanja Sekarang</Link>
        </Button>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;