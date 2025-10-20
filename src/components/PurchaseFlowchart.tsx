import React from 'react';
import { cn } from '@/lib/utils';

interface FlowchartNodeProps {
  type: 'start' | 'end' | 'process' | 'decision';
  text: string;
  className?: string;
}

const FlowchartNode: React.FC<FlowchartNodeProps> = ({ type, text, className }) => {
  let shapeClasses = "p-4 text-center shadow-md border border-rose-300 text-rose-900 font-medium max-w-xs mx-auto";
  let content = text;

  switch (type) {
    case 'start':
    case 'end':
      shapeClasses += " rounded-full bg-rose-200 w-40 h-40 flex items-center justify-center text-lg";
      break;
    case 'process':
      shapeClasses += " rounded-lg bg-rose-100 w-64 min-h-20 flex items-center justify-center text-base";
      break;
    case 'decision':
      shapeClasses += " bg-rose-100 w-48 h-48 flex items-center justify-center relative text-base";
      content = (
        <div className="transform -rotate-45 max-w-[80%] leading-tight">
          {text}
        </div>
      );
      return (
        <div className={cn("transform rotate-45", shapeClasses, className)}>
          {content}
        </div>
      );
  }

  return (
    <div className={cn(shapeClasses, className)}>
      {content}
    </div>
  );
};

const FlowchartArrow: React.FC<{ label?: string; className?: string }> = ({ label, className }) => (
  <div className={cn("flex flex-col items-center my-2", className)}>
    {label && <span className="text-rose-700 text-sm mb-1">{label}</span>}
    <div className="w-0 h-8 border-l-2 border-rose-400 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-rose-400"></div>
    </div>
  </div>
);

const PurchaseFlowchart: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-rose-50 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-rose-900 mb-10">Alur Pembelian Produk Fashion Wanita</h2>

      <FlowchartNode type="start" text="Saat membuka aplikasi" />
      <FlowchartArrow />

      <FlowchartNode
        type="process"
        text="Pengguna membuka beranda atau fitur pencarian untuk mencari produk atasan wanita berdasarkan kata kunci atau filter seperti harga dan popularitas."
      />
      <FlowchartArrow />

      <div className="relative flex flex-col items-center">
        <FlowchartNode type="decision" text="Apakah pengguna menemukan produk yang diminati?" />
        <div className="absolute top-1/2 right-full mr-4 flex items-center -translate-y-1/2">
          <span className="text-rose-700 text-sm mr-2">Tidak</span>
          <div className="h-0 w-8 border-t-2 border-rose-400 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-rose-400"></div>
          </div>
          <span className="text-rose-700 text-sm ml-2">Kembali ke pencarian</span>
        </div>
        <FlowchartArrow label="Ya" />
      </div>

      <FlowchartNode
        type="process"
        text="Pengguna melihat deskripsi, harga, ulasan, dan reputasi toko, lalu memilih ukuran, warna, dan jumlah beli."
      />
      <FlowchartArrow />

      <div className="relative flex flex-col items-center">
        <FlowchartNode type="decision" text="Apakah pengguna yakin untuk membeli?" />
        <div className="absolute top-1/2 right-full mr-4 flex items-center -translate-y-1/2">
          <span className="text-rose-700 text-sm mr-2">Tidak</span>
          <div className="h-0 w-8 border-t-2 border-rose-400 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-rose-400"></div>
          </div>
          <span className="text-rose-700 text-sm ml-2">Kembali ke pencarian</span>
        </div>
        <FlowchartArrow label="Ya" />
      </div>

      <FlowchartNode type="process" text="Produk dimasukkan ke keranjang belanja." />
      <FlowchartArrow />

      <FlowchartNode
        type="process"
        text="Pengguna membuka keranjang, mengecek atau mengubah alamat pengiriman, serta memilih opsi pengiriman."
      />
      <FlowchartArrow />

      <FlowchartNode
        type="process"
        text="Pengguna memilih metode pembayaran: COD, Transfer Bank, atau E-Wallet (Gopay, Shopeepay, Dana)."
      />
      <FlowchartArrow />

      <div className="relative flex flex-col items-center">
        <FlowchartNode type="decision" text="Apakah pembayaran berhasil diverifikasi atau pesanan COD dikonfirmasi?" />
        <div className="absolute top-1/2 right-full mr-4 flex items-center -translate-y-1/2">
          <span className="text-rose-700 text-sm mr-2">Tidak</span>
          <div className="h-0 w-8 border-t-2 border-rose-400 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-rose-400"></div>
          </div>
          <span className="text-rose-700 text-sm ml-2">Gagal Bayar / Menunggu Pembayaran</span>
        </div>
        <FlowchartArrow label="Ya" />
      </div>

      <FlowchartNode
        type="process"
        text="Sistem mencatat pesanan dan mengirim notifikasi ke penjual."
      />
      <FlowchartArrow />

      <FlowchartNode
        type="process"
        text="Pengguna menunggu barang datang, lalu mengonfirmasi penerimaan dan memberi ulasan (opsional)."
      />
      <FlowchartArrow />

      <FlowchartNode type="end" text="Selesai" />
    </div>
  );
};

export default PurchaseFlowchart;