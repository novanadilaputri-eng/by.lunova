import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HomePageHeader from "@/components/HomePageHeader";
import { Camera, ShoppingCart, PlusCircle, Send, Bot, User as UserIcon } from "lucide-react";
import { products as mockProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { showSuccess, showError } from "@/utils/toast";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LiveChatMessage {
  id: string;
  sender: "user" | "seller" | "system";
  text: string;
}

const LunoLivePage: React.FC = () => {
  const { addToCart } = useCart();
  const [isLive, setIsLive] = useState(false);
  const [featuredProduct, setFeaturedProduct] = useState(mockProducts[0]); // Example featured product
  const [liveChatMessages, setLiveChatMessages] = useState<LiveChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTop = chatScrollAreaRef.current.scrollHeight;
    }
  }, [liveChatMessages]);

  const handleStartLive = () => {
    setIsLive(true);
    showSuccess("Anda sekarang sedang live!");
    setLiveChatMessages([
      { id: "sys-welcome", sender: "system", text: "Selamat datang di live By.Lunova! Silakan bertanya atau berbelanja." },
    ]);
    // In a real app, this would initiate camera access and streaming
  };

  const handleEndLive = () => {
    setIsLive(false);
    showSuccess("Live streaming berakhir.");
    setLiveChatMessages([]);
    // In a real app, this would stop streaming
  };

  const handleAddToCartFromLive = () => {
    if (featuredProduct) {
      // For simplicity, assume default size/color for live product
      addToCart(featuredProduct, featuredProduct.sizes[0], featuredProduct.colors[0], 1);
      setLiveChatMessages(prev => [...prev, { id: `sys-add-${Date.now()}`, sender: "system", text: `Produk "${featuredProduct.name}" ditambahkan ke keranjang!` }]);
    } else {
      showError("Tidak ada produk yang ditampilkan.");
    }
  };

  const handleSendChatMessage = () => {
    if (chatInput.trim() === "") return;

    const newMessage: LiveChatMessage = {
      id: `chat-${Date.now()}`,
      sender: "user", // For demo, assume user is sending
      text: chatInput.trim(),
    };
    setLiveChatMessages(prev => [...prev, newMessage]);
    setChatInput("");

    // Simulate seller response
    setTimeout(() => {
      setLiveChatMessages(prev => [...prev, { id: `bot-res-${Date.now()}`, sender: "seller", text: `Terima kasih atas pertanyaannya! Produk ini sangat nyaman.` }]);
    }, 1500);
  };

  // Example YouTube embed URL (replace with actual live stream if available)
  const youtubeEmbedUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1";

  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">LunoLive</h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6 relative">
            {isLive ? (
              <>
                <iframe
                  className="w-full h-full rounded-lg"
                  src={youtubeEmbedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">LIVE</span>
              </>
            ) : (
              <div className="text-center">
                <Camera className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-400 font-poppins">Mulai siaran langsung Anda!</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 mb-6">
            {!isLive ? (
              <Button onClick={handleStartLive} className="py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                <Camera className="h-5 w-5 mr-2" /> Mulai Live
              </Button>
            ) : (
              <Button onClick={handleEndLive} variant="destructive" className="py-3 text-lg font-poppins">
                Akhiri Live
              </Button>
            )}
          </div>

          {isLive && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 border-t pt-6 border-beige dark:border-gray-700">
              {/* Featured Product */}
              {featuredProduct && (
                <div>
                  <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-gray-100 mb-4">Produk Unggulan Live</h2>
                  <Card className="flex items-center p-4 bg-beige dark:bg-gray-700 rounded-lg shadow-sm">
                    <img src={featuredProduct.mainImageUrl} alt={featuredProduct.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                    <div className="flex-grow">
                      <h3 className="text-lg font-poppins font-semibold text-gray-800 dark:text-gray-200">{featuredProduct.name}</h3>
                      <p className="text-md font-playfair font-bold text-gold-rose">Rp{featuredProduct.price.toLocaleString("id-ID")}</p>
                    </div>
                    <Button onClick={handleAddToCartFromLive} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                      <ShoppingCart className="h-4 w-4 mr-2" /> Tambah ke Keranjang
                    </Button>
                  </Card>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                    (Dalam aplikasi nyata, penjual dapat memilih produk untuk ditampilkan dan menambahkan ke keranjang secara real-time.)
                  </p>
                </div>
              )}

              {/* Live Chat */}
              <div className="flex flex-col h-96 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
                <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-playfair font-bold text-gray-900 dark:text-gray-100">Live Chat</h3>
                </div>
                <ScrollArea className="flex-1 p-3 space-y-3" viewportRef={chatScrollAreaRef}>
                  {liveChatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end",
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {msg.sender === "seller" && (
                        <UserIcon className="h-5 w-5 text-soft-pink mr-2 flex-shrink-0" />
                      )}
                      {msg.sender === "system" && (
                        <Bot className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] p-2 rounded-lg",
                          msg.sender === "user"
                            ? "bg-soft-pink text-white rounded-br-none"
                            : msg.sender === "seller"
                            ? "bg-beige dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-bl-none"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-center"
                        )}
                      >
                        <p className="font-poppins text-sm">{msg.text}</p>
                      </div>
                      {msg.sender === "user" && (
                        <UserIcon className="h-5 w-5 text-gray-500 ml-2 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </ScrollArea>
                <div className="p-3 border-t border-gray-200 dark:border-gray-600 flex items-center space-x-2">
                  <Input
                    placeholder="Ketik pesan..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSendChatMessage();
                      }
                    }}
                    className="flex-1 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-600 dark:text-gray-100 dark:border-gold-rose"
                  />
                  <Button onClick={handleSendChatMessage} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LunoLivePage;