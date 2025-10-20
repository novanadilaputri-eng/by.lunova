import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PurchaseFlowchart from "@/components/PurchaseFlowchart";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div
        className="relative text-center bg-white p-8 rounded-lg shadow-xl max-w-lg w-full mb-8 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1581044777550-4cfa607037dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, // Placeholder image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white opacity-70 rounded-lg"></div> {/* Overlay for text readability */}
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Selamat Datang di Fashionista!
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Temukan Gaya Fashion Wanita Impian Anda
          </p>
          <Button asChild size="lg" className="px-8 py-3 text-lg bg-rose-500 hover:bg-rose-600 text-white">
            <Link to="/products">Mulai Belanja Sekarang</Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-4xl mt-8">
        <PurchaseFlowchart />
      </div>

      <MadeWithDyad />
    </div>
  );
};

export default Index;