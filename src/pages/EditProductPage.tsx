import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HomePageHeader from "@/components/HomePageHeader";
import { products as mockProducts } from "@/data/products";
import { showSuccess, showError } from "@/utils/toast";
import { Product } from "@/types/product";

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewProduct = id === "new";

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [colors, setColors] = useState<string[]>([]); // For simplicity, manage as comma-separated string
  const [sizes, setSizes] = useState<string[]>([]); // For simplicity, manage as comma-separated string
  const [colorImages, setColorImages] = useState<{ color: string; imageUrl: string }[]>([]);

  useEffect(() => {
    if (!isNewProduct) {
      const foundProduct = mockProducts.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setName(foundProduct.name);
        setDescription(foundProduct.description);
        setPrice(foundProduct.price);
        setStock(foundProduct.stock);
        setCategory(foundProduct.category);
        setMainImageUrl(foundProduct.mainImageUrl);
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
      setColors([]);
      setSizes([]);
      setColorImages([]);
    }
  }, [id, isNewProduct, navigate]);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || price <= 0 || stock <= 0 || !category || !mainImageUrl) {
      showError("Mohon lengkapi semua bidang yang wajib diisi.");
      return;
    }

    const updatedProduct: Product = {
      id: isNewProduct ? `prod-${Date.now()}` : id!,
      name,
      description,
      price,
      stock,
      category,
      mainImageUrl,
      colors,
      sizes,
      colorImages,
      rating: product?.rating || 0, // Keep existing rating for edits, 0 for new
      reviewsCount: product?.reviewsCount || 0, // Keep existing reviews for edits, 0 for new
      storeName: product?.storeName || "By.Lunova Official", // Default store name
      storeReputation: product?.storeReputation || "New Seller", // Default reputation
    };

    // In a real application, you would send this data to a backend API
    // For this demo, we'll just show a success message.
    if (isNewProduct) {
      // mockProducts.push(updatedProduct); // In a real app, add to data source
      showSuccess("Produk baru berhasil ditambahkan!");
    } else {
      // Find and update product in mockProducts array
      const productIndex = mockProducts.findIndex(p => p.id === id);
      if (productIndex > -1) {
        // mockProducts[productIndex] = updatedProduct; // In a real app, update data source
      }
      showSuccess("Produk berhasil diperbarui!");
    }

    navigate("/seller/dashboard");
  };

  const handleColorChange = (index: number, newColor: string) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
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
        <h1 className="text-4xl font-playfair font-bold text-center mb-10 text-gray-900">
          {isNewProduct ? "Tambah Produk Baru" : `Edit Produk: ${product?.name}`}
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form onSubmit={handleSaveProduct} className="space-y-6">
            <div>
              <Label htmlFor="product-name" className="text-base font-poppins font-medium">Nama Produk</Label>
              <Input
                id="product-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama produk"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins"
                required
              />
            </div>

            <div>
              <Label htmlFor="product-description" className="text-base font-poppins font-medium">Deskripsi Produk</Label>
              <Textarea
                id="product-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tulis deskripsi lengkap produk..."
                rows={5}
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-price" className="text-base font-poppins font-medium">Harga (Rp)</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  min="0"
                  className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product-stock" className="text-base font-poppins font-medium">Stok</Label>
                <Input
                  id="product-stock"
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  min="0"
                  className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="product-category" className="text-base font-poppins font-medium">Kategori</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="product-category" className="w-full mt-2 border-soft-pink focus:ring-soft-pink font-poppins">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Atasan Wanita">Atasan Wanita</SelectItem>
                  <SelectItem value="Dress">Dress</SelectItem>
                  <SelectItem value="Hijab">Hijab</SelectItem>
                  <SelectItem value="Celana">Celana</SelectItem>
                  <SelectItem value="Sepatu">Sepatu</SelectItem>
                  <SelectItem value="Tas">Tas</SelectItem>
                  <SelectItem value="Aksesoris">Aksesoris</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="main-image-url" className="text-base font-poppins font-medium">URL Gambar Utama</Label>
              <Input
                id="main-image-url"
                type="url"
                value={mainImageUrl}
                onChange={(e) => setMainImageUrl(e.target.value)}
                placeholder="https://example.com/main-image.jpg"
                className="mt-2 border-soft-pink focus:ring-soft-pink font-poppins"
                required
              />
              {mainImageUrl && (
                <img src={mainImageUrl} alt="Preview Gambar Utama" className="mt-4 w-32 h-32 object-cover rounded-md border" />
              )}
            </div>

            {/* Color Variants */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-base font-poppins font-medium">Varian Warna & Gambar</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddColor} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins">
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
                        className="border-soft-pink focus:ring-soft-pink font-poppins"
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
                        className="border-soft-pink focus:ring-soft-pink font-poppins"
                      />
                    </div>
                    {colorImages[index]?.imageUrl && (
                      <img src={colorImages[index].imageUrl} alt={`Preview ${color}`} className="h-10 w-10 object-cover rounded-md border" />
                    )}
                    <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveColor(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Variants */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="text-base font-poppins font-medium">Varian Ukuran</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSize} className="border-gold-rose text-gold-rose hover:bg-gold-rose hover:text-white font-poppins">
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
                      className="flex-1 border-soft-pink focus:ring-soft-pink font-poppins"
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
          <Button asChild variant="outline" className="border-soft-pink text-soft-pink hover:bg-soft-pink hover:text-white font-poppins">
            <Link to="/seller/dashboard">Kembali ke Dashboard</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;