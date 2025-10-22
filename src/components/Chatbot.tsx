"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User as UserIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface ChatbotOption {
  question: string;
  answer: string;
}

const chatbotOptions: ChatbotOption[] = [
  { question: "Bagaimana cara melacak pesanan saya?", answer: "Anda bisa melacak pesanan Anda melalui menu 'Akun Saya' > 'Pesanan Saya' dan pilih pesanan yang ingin dilacak." },
  { question: "Bagaimana cara mengajukan pengembalian barang?", answer: "Untuk mengajukan pengembalian barang, silakan kunjungi menu 'Akun Saya' > 'Pesanan Saya', pilih pesanan yang relevan, lalu klik 'Ajukan Pengembalian'." },
  { question: "Metode pembayaran apa saja yang tersedia?", answer: "Kami menerima pembayaran melalui Transfer Bank (BCA, BRI, Mandiri, BNI), E-Wallet (Dana, Gopay, ShopeePay), dan Cash On Delivery (COD)." },
  { question: "Bagaimana cara menggunakan voucher?", answer: "Voucher dapat digunakan saat proses checkout. Masukkan kode voucher Anda di kolom yang tersedia sebelum menyelesaikan pembayaran." },
  { question: "Apakah ada gratis ongkir?", answer: "Ya, kami menyediakan gratis ongkir untuk pengiriman menggunakan ByLuno Express." },
  { question: "Bagaimana cara menghubungi penjual?", answer: "Anda dapat menghubungi penjual melalui fitur chat di halaman detail produk atau melalui halaman chat ini dengan memilih opsi 'Hubungi Penjual'." },
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial bot message
    if (messages.length === 0) {
      setTimeout(() => {
        setMessages([
          { id: "bot-welcome", sender: "bot", text: "Halo! Selamat datang di By.Lunova. Ada yang bisa saya bantu?" },
        ]);
      }, 500);
    }
  }, [messages]);

  useEffect(() => {
    // Scroll to bottom on new message
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string, sender: "user" | "bot" = "user") => {
    if (text.trim() === "") return;

    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      sender,
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");

    if (sender === "user") {
      // Simulate bot response
      setTimeout(() => {
        const matchedOption = chatbotOptions.find(opt =>
          text.toLowerCase().includes(opt.question.toLowerCase().replace("?", ""))
        );

        if (matchedOption) {
          setMessages((prev) => [
            ...prev,
            { id: `bot-res-${Date.now()}`, sender: "bot", text: matchedOption.answer },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { id: `bot-res-${Date.now()}`, sender: "bot", text: "Maaf, saya tidak mengerti pertanyaan Anda. Apakah ada pertanyaan lain dari daftar di bawah ini yang bisa saya bantu?" },
          ]);
        }
      }, 1000);
    }
  };

  const handleOptionClick = (option: ChatbotOption) => {
    handleSendMessage(option.question, "user");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Bot className="h-6 w-6 text-soft-pink mr-3" />
        <h2 className="text-xl font-playfair font-bold text-gray-900 dark:text-gray-100">By.Lunova Chatbot</h2>
      </div>

      <ScrollArea className="flex-1 p-4 space-y-4" viewportRef={scrollAreaRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end",
              msg.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.sender === "bot" && (
              <Bot className="h-6 w-6 text-soft-pink mr-2 flex-shrink-0" />
            )}
            <div
              className={cn(
                "max-w-[70%] p-3 rounded-lg",
                msg.sender === "user"
                  ? "bg-soft-pink text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
              )}
            >
              <p className="font-poppins text-sm">{msg.text}</p>
            </div>
            {msg.sender === "user" && (
              <UserIcon className="h-6 w-6 text-gray-500 ml-2 flex-shrink-0" />
            )}
          </div>
        ))}
        {messages.length > 1 && messages[messages.length - 1].sender === "bot" && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pilihan Cepat:</p>
            <div className="flex flex-wrap gap-2">
              {chatbotOptions.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleOptionClick(option)}
                  className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white"
                >
                  {option.question}
                </Button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
        <Input
          placeholder="Ketik pesan Anda..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage(inputMessage);
            }
          }}
          className="flex-1 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
        />
        <Button onClick={() => handleSendMessage(inputMessage)} className="bg-soft-pink hover:bg-rose-600 text-white font-poppins">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Chatbot;