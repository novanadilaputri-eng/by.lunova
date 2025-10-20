import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ShoppingCart } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import HomePageHeader from "@/components/HomePageHeader"; // For consistent header

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Select all items by default when cart items change
    const allItemIds = new Set(cartItems.map(item => `${item.product.id}-${item.size}-${item.color}`));
    setSelectedItems(allItemIds);
  }, [cartItems]);

  const handleQuantityChange = (
    productId: string,
    size: string,
    color: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = Number(e.target.value);
    updateQuantity(productId, size, color, newQuantity);
  };

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allItemIds = new Set(cartItems.map(item => `${item.product.id}-${item.size}-${item.color}`));
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  const getSelectedItemsCount = () => {
    return cartItems.filter(item => selectedItems.has(`${item.product.id}-${item.size}-${item.color}`)).length;
  };

  const getSelectedTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.has(`${item.product.id}-${item.size}-${item.color}`)) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      alert("Mohon pilih setidaknya satu produk untuk checkout.");
      return;
    }
    // In a real app, you'd pass selectedItems data to checkout
    navigate("/checkout");
  };

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">Keranjang Belanja Anda</h1>

        {cartItems.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <ShoppingCart className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <p className="text-xl text-gray-600 font-poppins mb-6">Keranjang Anda kosong.</p>
            <Button asChild className="px-8 py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              <Link to="/products">Mulai Belanja</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md space-y-6">
              <div className="flex items-center pb-4 border-b border-beige">
                <Checkbox
                  id="select-all"
                  checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                  onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                  className="mr-3 border-soft-pink data-[state=checked]:bg-soft-pink data-[state=checked]:text-white"
                />
                <Label htmlFor="select-all" className="text-lg font-poppins font-semibold text-gray-800">
                  Pilih Semua ({cartItems.length} produk)
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (window.confirm("Apakah Anda yakin ingin menghapus semua produk yang dipilih dari keranjang?")) {
                      cartItems.forEach(item => {
                        const itemId = `${item.product.id}-${item.size}-${item.color}`;
                        if (selectedItems.has(itemId)) {
                          removeFromCart(item.product.id, item.size, item.color);
                        }
                      });
                      setSelectedItems(new Set()); // Clear selected items after removal
                    }
                  }}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Hapus yang Dipilih
                </Button>
              </div>

              {cartItems.map((item) => {
                const itemId = `${item.product.id}-${item.size}-${item.color}`;
                const isSelected = selectedItems.has(itemId);
                return (
                  <div key={itemId} className="flex items-center border-b pb-4 last:border-b-0 last:pb-0">
                    <Checkbox
                      id={itemId}
                      checked={isSelected}
                      onCheckedChange={(checked: boolean) => handleCheckboxChange(itemId, checked)}
                      className="mr-3 border-soft-pink data-[state=checked]:bg-soft-pink data-[state=checked]:text-white"
                    />
                    <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-md mr-4"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/products/${item.product.id}`}>
                        <h2 className="text-lg font-playfair font-semibold text-gray-800 hover:text-soft-pink transition-colors">
                          {item.product.name}
                        </h2>
                      </Link>
                      <p className="text-sm text-gray-600 font-poppins">Ukuran: {item.size}, Warna: {item.color}</p>
                      <p className="text-md font-poppins font-medium text-gold-rose mt-1">
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
                        className="w-20 text-center border-soft-pink focus:ring-soft-pink font-poppins"
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
                );
              })}
            </div>

            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Ringkasan Belanja</h2>
              <div className="flex justify-between items-center text-lg font-poppins font-medium mb-4 border-b pb-4">
                <span>Total Harga ({getSelectedItemsCount()} produk):</span>
                <span className="text-gold-rose">Rp{getSelectedTotalPrice().toLocaleString("id-ID")}</span>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins"
                disabled={getSelectedItemsCount() === 0}
              >
                Checkout ({getSelectedItemsCount()})
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;