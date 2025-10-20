import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (
    productId: string,
    size: string,
    color: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = Number(e.target.value);
    updateQuantity(productId, size, color, newQuantity);
  };

  const handleCheckout = () => {
    // Placeholder for actual checkout logic
    navigate("/checkout"); // Assuming a /checkout route will be created later
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">Keranjang Belanja Anda</h1>

      {cartItems.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
          <p className="text-xl text-gray-600 mb-6">Keranjang Anda kosong.</p>
          <Button asChild className="px-8 py-3 text-lg bg-rose-500 hover:bg-rose-600 text-white">
            <Link to="/products">Mulai Belanja</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-6">
            {cartItems.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex items-center border-b pb-4 last:border-b-0 last:pb-0">
                <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                </Link>
                <div className="flex-grow">
                  <Link to={`/products/${item.product.id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors">
                      {item.product.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-gray-600">Ukuran: {item.size}, Warna: {item.color}</p>
                  <p className="text-md font-medium text-gray-900 mt-1">
                    Rp{item.product.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex items-center space-x-4 ml-auto">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.product.id, item.size, item.color, e)
                    }
                    className="w-20 text-center"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Hapus</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ringkasan Belanja</h2>
            <div className="flex justify-between items-center text-lg font-medium mb-4 border-b pb-4">
              <span>Total Harga:</span>
              <span>Rp{getTotalPrice().toLocaleString("id-ID")}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full py-3 text-lg bg-rose-500 hover:bg-rose-600 text-white">
              Lanjutkan ke Pembayaran
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;