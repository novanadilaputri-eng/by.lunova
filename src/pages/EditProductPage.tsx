import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HomePageHeader from "@/components/HomePageHeader";
import { products as mockProducts, addProduct, updateProduct } from "@/data/products"; // Import CRUD functions
import { showSuccess, showError } from "@/utils/toast";
import { Product } from "@/types/product";
import { Trash2 } from "lucide-react";

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewProduct = id === "new";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreviewUrl, setMainImagePreviewUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colorImages, setColorImages] = useState<{ color: string; imageUrl: string }[]>([]);

  useEffect(() => {
    if (!isNewProduct) {
      const foundProduct = mockProducts.find((p) => p.id === id);
      if (foundProduct) {
        setName(foundProduct.name);
        setDescription(foundProduct.description);
        setPrice(foundProduct.price);
        setStock(foundProduct.stock);
        setCategory(foundProduct.category);
        setMainImageUrl(foundProduct.mainImageUrl);
        setMainImagePreviewUrl(foundProduct.mainImageUrl); // Set preview for existing image
        setColors(foundProduct.colors);
        setSizes(foundProduct.sizes);
        setColorImages(foundProduct.colorImages);
      } else {
        showError("Produk tidak ditemukan.");
        navigate("/seller/dashboard");
      }
    } else {
      // Initialize for new product
      setName("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setCategory("Atasan Wanita"); // Default category
      setMainImageUrl("");
      setMainImagePreviewUrl(null);
      setMainImageFile(null);
      setColors([]);
      setSizes([]);
      setColorImages([]);
    }
  }, [id, isNewProduct, navigate]);

  const handleMainImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreviewUrl(reader.result as string);
        setMainImageUrl(reader.result as string); // Also update mainImageUrl state for consistency
      };
      reader.readAsDataURL(file);
    } else {
      setMainImageFile(null);
      setMainImagePreviewUrl(null);
      setMainImageUrl("");
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || price <= 0 || stock <= 0 || !category || !mainImageUrl) {
      showError("Mohon lengkapi semua bidang yang wajib diisi.");
      return;
    }

    const productData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'storeName' | 'storeReputation'> = {
      name,
      description,
      price,
      stock,
      category,
      mainImageUrl,
      colors,
      sizes,
      colorImages,
    };

    if (isNewProduct) {
      const newProduct = addProduct(productData);
      showSuccess(`Produk "${newProduct.name}" berhasil ditambahkan!`);
    } else {
      const existingProduct = mockProducts.find(p => p.id === id);
      if (existingProduct) {
        const updatedProduct: Product = {
          ...existingProduct,
          ...productData,
          id: id!,
        };
        updateProduct(updatedProduct);
        showSuccess(`Produk "${updatedProduct.name}" berhasil diperbarui!`);
      }
    }

    navigate("/seller/dashboard");
  };

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);

    const newColorImages = [...colorImages];
    if (newColorImages[index]) {
      newColorImages[index].color = newColor;
    } else {
      newColorImages[index] = { color: newColor, imageUrl: "" };
    }
    setColorImages(newColorImages);
  };

  const handleColorImageUrlChange = (index: number, newImageUrl: string) => {
    const newColorImages = [...colorImages];
    if (newColorImages[index]) {
      newColorImages[index].imageUrl = newImageUrl;
    } else {
      newColorImages[index] = { color: colors[index] || "Unknown", imageUrl: newImageUrl };
    }
    setColorImages(newColorImages);
  };

  const handleAddColor = () => {
    setColors([...colors, ""]);
    setColorImages([...colorImages, { color: "", imageUrl: "" }]);
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
    setColorImages(colorImages.filter((_, i) => i !== index));
  };

  const handleSizeChange = (index: number, newSize: string) => {
    const newSizes = [...sizes];
    newSizes[index] = newSize;
    setSizes(newSizes);
  };

  const handleAddSize = () => {
    setSizes([...sizes, ""]);
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };


  return (
    <>
      <HomePageHeader />
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
          {isNewProduct ? "Tambah Produk Baru" : `Edit Produk: ${name}`}
        </h1>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form onSubmit={handleSaveProduct} className="space-y-6">
            <div>
              <Label htmlFor="product-name" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Nama Produk</Label>
              <Input
                id="product-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama produk"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                required
              />
            </div>

            <div>
              <Label htmlFor="product-description" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Deskripsi Produk</Label>
              <Textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tulis deskripsi lengkap produk..."
                rows={5}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-price" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Harga (Rp)</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min="0"
                  className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-stock" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Stok</Label>
                <Input
                  id="product-stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  min="0"
                  className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="product-category" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Kategori</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="product-category" className="w-full mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gold-rose">
                  <SelectItem value="Atasan Wanita" className="font-poppins">Atasan Wanita</SelectItem>
                  <SelectItem value="Dress" className="font-poppins">Dress</SelectItem>
                  <SelectItem value="Hijab" className="font-poppins">Hijab</SelectItem>
                  <SelectItem value="Celana" className="font-poppins">Celana</SelectItem>
                  <SelectItem value="Sepatu" className="font-poppins">Sepatu</SelectItem>
                  <SelectItem value="Tas" className="font-poppins">Tas</SelectItem>
                  <SelectItem value="Aksesoris" className="font-poppins">Aksesoris</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="main-image-file" className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Gambar Utama Produk</Label>
              <Input
                id="main-image-file"
                type="file"
                accept="image/*"
                onChange={handleMainImageFileChange}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
              />
              {mainImagePreviewUrl && (
                <img src={mainImagePreviewUrl} alt="Preview Gambar Utama" className="mt-4 w-32 h-32 object-cover rounded-md border border-soft-pink dark:border-gold-rose" />
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                (Dalam aplikasi nyata, file akan diunggah ke server dan URL akan disimpan.)
              </p>
            </div>

            {/* Color Variants */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Varian Warna & Gambar</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddColor} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                  Tambah Warna
                </Button>
              </div>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Label htmlFor={`color-${index}`} className="sr-only">Warna</Label>
                      <Input
                        id={`color-${index}`}
                        type="text"
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        placeholder="Nama Warna (e.g., Merah)"
                        className="border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`color-image-${index}`} className="sr-only">URL Gambar Warna</Label>
                      <Input
                        id={`color-image-${index}`}
                        type="url"
                        value={colorImages[index]?.imageUrl || ""}
                        onChange={(e) => handleColorImageUrlChange(index, e.target.value)}
                        placeholder="URL Gambar untuk warna ini"
                        className="border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                      />
                    </div>
                    {colorImages[index]?.imageUrl && (
                      <img src={colorImages[index].imageUrl} alt={`Preview ${color}`} className="h-10 w-10 object-cover rounded-md border border-soft-pink dark:border-gold-rose" />
                    )}
                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveColor(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                (Untuk gambar varian warna, saat ini menggunakan URL. Dalam aplikasi nyata, ini juga bisa diimplementasikan dengan unggah file.)
              </p>
            </div>

            {/* Size Variants */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-base font-poppins font-medium text-gray-800 dark:text-gray-200">Varian Ukuran</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSize} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
                  Tambah Ukuran
                </Button>
              </div>
              <div className="space-y-3">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="text"
                      value={size}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      placeholder="Ukuran (e.g., S, M, L)"
                      className="flex-1 border-soft-pink focus:ring-soft-pink font-poppins dark:bg-gray-700 dark:text-gray-100 dark:border-gold-rose"
                    />
                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveSize(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full py-3 text-lg bg-soft-pink hover:bg-rose-600 text-white font-poppins">
              {isNewProduct ? "Tambah Produk" : "Simpan Perubahan"}
            </Button>
          </form>
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins dark:border-gold-rose dark:text-gold-rose dark:hover:bg-gold-rose dark:hover:text-white">
            <Link to="/seller/dashboard">Kembali ke Dashboard</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;