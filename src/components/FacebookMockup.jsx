import React, { useState, useRef, useEffect } from 'react';
import { 
  Download, Upload, ThumbsUp, MessageCircle, Share2, MoreHorizontal, 
  Globe, Layout, Smartphone, Monitor, Plus, Trash2, Image as ImageIcon, Layers,
  Zap, BookOpen, BarChart2
} from 'lucide-react';

// --- BRAND GUIDELINE CONSTANTS ---
// Red: #DA251D
// Charcoal: #1E1E2A
// Neutral: #F2F2F7
// White: #FFFFFF

// Main Application Component
export default function App() {
  const previewRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);
  const [loadingLib, setLoadingLib] = useState(true);
  
  // 'single' | 'carousel' | 'album'
  const [adFormat, setAdFormat] = useState('single'); 

  // Default State for Ad Content - Updated for Bình Vương AI
  const [adData, setAdData] = useState({
    pageName: 'Bình Vương AI Marketing',
    avatar: '', 
    primaryText: 'Simple but Optimal - Đơn giản nhưng Tối ưu. \n\nGiúp doanh nghiệp vận hành marketing dễ dàng và hiệu quả bằng sức mạnh của AI và Automation. 🚀',
    // Single Image Data
    headline: 'Bình Vương - AI Marketing Dễ Dàng',
    description: 'binhvuong.vn',
    websiteUrl: 'BINHVUONG.VN',
    ctaText: 'Gửi tin nhắn',
    postImage: '',
    // Carousel Data
    carouselCards: [
      { id: 1, image: '', headline: 'Tự động hóa', description: 'Tiết kiệm 10h/tuần', url: 'BINHVUONG.VN' },
      { id: 2, image: '', headline: 'Tối ưu quảng cáo', description: 'Tăng hiệu quả X3', url: 'BINHVUONG.VN' },
      { id: 3, image: '', headline: 'Quy trình chuẩn', description: 'Dễ dàng áp dụng', url: 'BINHVUONG.VN' },
    ],
    // Album Data
    albumImages: [] 
  });

  // Load html2canvas
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
    script.async = true;
    script.onload = () => setLoadingLib(false);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // -- Handlers --

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAdData(prev => ({ ...prev, [field]: imageUrl }));
    }
  };

  // Carousel Handlers
  const handleCarouselChange = (id, field, value) => {
    setAdData(prev => ({
      ...prev,
      carouselCards: prev.carouselCards.map(card => 
        card.id === id ? { ...card, [field]: value } : card
      )
    }));
  };

  const handleCarouselImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleCarouselChange(id, 'image', imageUrl);
    }
  };

  const addCarouselCard = () => {
    const newId = Math.max(...adData.carouselCards.map(c => c.id), 0) + 1;
    setAdData(prev => ({
      ...prev,
      carouselCards: [...prev.carouselCards, { id: newId, image: '', headline: 'Tiêu đề mới', description: 'Mô tả', url: 'BINHVUONG.VN' }]
    }));
  };

  const removeCarouselCard = (id) => {
    if (adData.carouselCards.length <= 1) return;
    setAdData(prev => ({
      ...prev,
      carouselCards: prev.carouselCards.filter(c => c.id !== id)
    }));
  };

  // Album Handlers
  const handleAlbumUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setAdData(prev => ({
      ...prev,
      albumImages: [...prev.albumImages, ...newImages].slice(0, 5) // Limit to 5 for demo
    }));
  };

  const removeAlbumImage = (index) => {
    setAdData(prev => ({
      ...prev,
      albumImages: prev.albumImages.filter((_, i) => i !== index)
    }));
  };

  const handleDownload = async () => {
    if (!window.html2canvas) {
      alert("Đang tải thư viện, vui lòng thử lại sau giây lát...");
      return;
    }

    if (previewRef.current) {
      try {
        window.scrollTo(0, 0); 
        
        const canvas = await window.html2canvas(previewRef.current, {
          scale: 2, 
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          scrollY: -window.scrollY, 
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight,
          onclone: (clonedDoc) => {
            const element = clonedDoc.querySelector('[data-preview-container]');
            if (element) {
                element.style.overflow = 'visible'; 
                element.style.height = 'auto';
            }
            
            // Fix oklch colors - convert to rgb for html2canvas compatibility
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach(el => {
              const computed = window.getComputedStyle(el);
              const propsToCheck = ['color', 'background-color', 'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'outline-color'];
              
              propsToCheck.forEach(prop => {
                const value = computed.getPropertyValue(prop);
                if (value && value.includes('oklch')) {
                  // Fallback colors
                  const camelProp = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                  if (prop.includes('background')) {
                    el.style[camelProp] = 'transparent';
                  } else if (prop === 'color') {
                    el.style[camelProp] = '#000000';
                  } else {
                    el.style[camelProp] = '#e5e7eb';
                  }
                }
              });
            });
          }
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `binhvuong-ad-${adFormat}-${Date.now()}.png`;
        link.click();
      } catch (err) {
        console.error("Lỗi khi tải ảnh:", err);
        alert("Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại.");
      }
    }
  };

  // -- Render Helpers --

  const renderAlbumLayout = () => {
    const images = adData.albumImages;
    const count = images.length;

    if (count === 0) {
      return (
        <div className="w-full bg-gray-100 aspect-video flex flex-col items-center justify-center border-y border-gray-200 text-gray-400">
           <ImageIcon size={48} className="mb-2 opacity-50" />
           <p>Chưa có ảnh nào trong album</p>
        </div>
      );
    }

    if (count === 1) {
      return <img src={images[0]} className="w-full h-auto object-cover" alt="Album 1" />;
    }

    if (count === 2) {
      return (
        <div className="flex gap-1 h-[300px]">
          <img src={images[0]} className="w-1/2 h-full object-cover" alt="Album 1" />
          <img src={images[1]} className="w-1/2 h-full object-cover" alt="Album 2" />
        </div>
      );
    }

    if (count === 3) {
      return (
        <div className="flex gap-1 h-[360px]">
          <div className="w-2/3 h-full">
            <img src={images[0]} className="w-full h-full object-cover" alt="Album 1" />
          </div>
          <div className="w-1/3 flex flex-col gap-1 h-full">
            <img src={images[1]} className="w-full h-1/2 object-cover" alt="Album 2" />
            <img src={images[2]} className="w-full h-1/2 object-cover" alt="Album 3" />
          </div>
        </div>
      );
    }

    if (count >= 4) {
      return (
        <div className="flex flex-col gap-1">
          <div className="w-full h-[300px]">
             <img src={images[0]} className="w-full h-full object-cover" alt="Album 1" />
          </div>
          <div className="flex gap-1 h-[120px]">
            {images.slice(1, 4).map((img, idx) => (
               <div key={idx} className="w-1/3 h-full relative">
                  <img src={img} className="w-full h-full object-cover" alt={`Album ${idx+2}`} />
                  {idx === 2 && count > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xl font-bold">
                      +{count - 4}
                    </div>
                  )}
               </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const ctaOptions = ["Gửi tin nhắn", "Mua ngay", "Đăng ký", "Xem thêm", "Tải xuống", "Liên hệ"];

  return (
    <div className="min-h-screen bg-[#F2F2F7] p-4 md:p-8 font-sans text-[#1E1E2A]">
      
      {/* HEADER THEO BRAND GUIDELINE */}
      <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-3">
          {/* Logo Bình Vương Style */}
          <div className="w-10 h-10 rounded-full border-2 border-[#DA251D] flex items-center justify-center bg-white shadow-sm">
             <div className="w-5 h-5 rounded-full bg-[#DA251D]"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E1E2A] leading-tight">
              Bình Vương AI
            </h1>
            <p className="text-sm text-gray-500 font-medium tracking-wide">AI Marketing Dễ Dàng</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white p-1.5 rounded-lg shadow-sm border border-gray-200">
            <button 
                onClick={() => setIsMobile(true)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all font-medium ${isMobile ? 'bg-[#DA251D] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                <Smartphone size={18} /> <span className="hidden sm:inline">Mobile</span>
            </button>
            <button 
                onClick={() => setIsMobile(false)}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all font-medium ${!isMobile ? 'bg-[#1E1E2A] text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            >
                <Monitor size={18} /> <span className="hidden sm:inline">Desktop</span>
            </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: CONTROLS --- */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Format Selector */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label className="block text-sm font-bold text-[#1E1E2A] mb-4 uppercase tracking-wider">Chọn định dạng quảng cáo</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'single', label: 'Một hình ảnh', icon: <ImageIcon size={20}/> },
                { id: 'carousel', label: 'Băng chuyền', icon: <Layers size={20}/> },
                { id: 'album', label: 'Bộ sưu tập', icon: <Layout size={20}/> }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setAdFormat(type.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                    adFormat === type.id 
                    ? 'border-[#DA251D] bg-red-50 text-[#DA251D] ring-1 ring-[#DA251D] font-bold' 
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <div className="mb-2">{type.icon}</div>
                  <span className="text-xs">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Info Input */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Decoration Line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-[#DA251D]"></div>
            
            <h2 className="text-lg font-bold mb-5 flex items-center gap-2 text-[#1E1E2A]">
                <Zap className="text-[#DA251D]" size={20}/>
                Thông tin chiến dịch
            </h2>
            
            <div className="space-y-5">
              <div className="flex gap-4">
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Tên Fanpage</label>
                    <input
                      type="text"
                      name="pageName"
                      value={adData.pageName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#DA251D] focus:border-[#DA251D] focus:outline-none transition-all"
                    />
                 </div>
                 <div className="w-1/3">
                    <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Avatar</label>
                    <div className="relative group">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'avatar')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full px-2 py-2.5 border border-gray-300 border-dashed rounded-lg bg-gray-50 text-center text-xs text-gray-500 truncate group-hover:bg-red-50 group-hover:border-[#DA251D] group-hover:text-[#DA251D] transition-colors">
                            Upload
                        </div>
                    </div>
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Nội dung chính (Primary Text)</label>
                <textarea
                  name="primaryText"
                  rows={4}
                  value={adData.primaryText}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#DA251D] focus:border-[#DA251D] focus:outline-none transition-all"
                  placeholder="Nhập nội dung quảng cáo..."
                />
              </div>

              {/* Conditional Inputs based on Format */}
              
              {adFormat === 'single' && (
                <div className="space-y-4 border-t border-gray-100 pt-5 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#DA251D]"></span>
                        <p className="text-xs font-bold text-[#1E1E2A] uppercase">Cấu hình Single Image</p>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Hình ảnh (1200x628 / 1080x1080)</label>
                        <div className="relative">
                             <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'postImage')} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#DA251D] file:text-white hover:file:bg-[#b91c15] cursor-pointer"/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Tiêu đề (Headline)</label>
                            <input type="text" name="headline" value={adData.headline} onChange={handleInputChange} placeholder="Nhập tiêu đề..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#DA251D] focus:outline-none"/>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                             <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Website URL</label>
                                <input type="text" name="websiteUrl" value={adData.websiteUrl} onChange={handleInputChange} placeholder="WEBSITE.COM" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm uppercase focus:ring-2 focus:ring-[#DA251D] focus:outline-none"/>
                             </div>
                             <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">CTA Button</label>
                                <select name="ctaText" value={adData.ctaText} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#DA251D] focus:outline-none">
                                    {ctaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                             </div>
                        </div>
                         <div>
                             <label className="block text-xs font-medium text-gray-500 mb-1">Mô tả link (Optional)</label>
                             <input type="text" name="description" value={adData.description} onChange={handleInputChange} placeholder="Mô tả phụ..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#DA251D] focus:outline-none"/>
                        </div>
                    </div>
                </div>
              )}

              {adFormat === 'carousel' && (
                <div className="space-y-4 border-t border-gray-100 pt-5 mt-2">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#DA251D]"></span>
                            <p className="text-xs font-bold text-[#1E1E2A] uppercase">Thẻ Carousel</p>
                        </div>
                        <button onClick={addCarouselCard} className="text-xs flex items-center gap-1 text-[#DA251D] font-bold hover:underline bg-red-50 px-2 py-1 rounded-full border border-red-100"><Plus size={14}/> Thêm thẻ</button>
                    </div>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                        {adData.carouselCards.map((card, idx) => (
                            <div key={card.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 relative group hover:border-[#DA251D] transition-colors">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => removeCarouselCard(card.id)} className="p-1.5 text-red-500 hover:bg-white rounded-full shadow-sm"><Trash2 size={14}/></button>
                                </div>
                                <p className="text-xs font-bold text-gray-500 mb-2">Thẻ #{idx + 1}</p>
                                <div className="flex gap-3 mb-2">
                                     <div className="w-16 h-16 bg-white flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
                                        {card.image ? <img src={card.image} className="w-full h-full object-cover"/> : <ImageIcon size={20} className="text-gray-300"/>}
                                     </div>
                                     <div className="flex-1 space-y-2">
                                        <div className="relative">
                                            <input type="file" accept="image/*" onChange={(e) => handleCarouselImageUpload(card.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                                            <div className="text-[10px] text-[#DA251D] font-bold cursor-pointer hover:underline">Thay đổi ảnh</div>
                                        </div>
                                        <input 
                                            value={card.headline} 
                                            onChange={(e) => handleCarouselChange(card.id, 'headline', e.target.value)}
                                            placeholder="Tiêu đề thẻ"
                                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:border-[#DA251D] focus:outline-none"
                                        />
                                     </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                         <label className="block text-xs font-medium text-gray-500 mb-1">Nút kêu gọi (Chung)</label>
                         <select name="ctaText" value={adData.ctaText} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#DA251D] focus:outline-none">
                            {ctaOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                         </select>
                    </div>
                </div>
              )}

              {adFormat === 'album' && (
                 <div className="space-y-4 border-t border-gray-100 pt-5 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-[#DA251D]"></span>
                        <p className="text-xs font-bold text-[#1E1E2A] uppercase">Hình ảnh Album</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-[#DA251D] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#b91c15] transition-colors flex items-center gap-2 shadow-sm shadow-red-200">
                            <Upload size={16}/> Upload nhiều ảnh
                            <input type="file" multiple accept="image/*" onChange={handleAlbumUpload} className="hidden"/>
                        </label>
                        <span className="text-xs text-gray-500 italic ml-2">{adData.albumImages.length} ảnh đã chọn</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {adData.albumImages.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200">
                                <img src={img} className="w-full h-full object-cover"/>
                                <button 
                                    onClick={() => removeAlbumImage(idx)}
                                    className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        ))}
                    </div>
                 </div>
              )}

            </div>
          </div>

          <button
              onClick={handleDownload}
              disabled={loadingLib}
              className="w-full bg-[#DA251D] hover:bg-[#b91c15] text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={20} />
              {loadingLib ? 'Đang tải thư viện...' : 'Tải hình ảnh demo xuống'}
          </button>
          
          <p className="text-center text-xs text-gray-400 font-medium">Bình Vương AI - Simple but Optimal</p>
        </div>

        {/* --- RIGHT COLUMN: PREVIEW --- */}
        <div className="lg:col-span-7 flex flex-col items-center bg-[#E4E6EB] p-4 md:p-8 rounded-xl border border-gray-300 min-h-[600px] overflow-auto relative">
          
          {/* Label Preview */}
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm border border-white">
            Preview Mode: {isMobile ? 'Mobile' : 'Desktop'}
          </div>

          {/* THE PREVIEW CARD */}
          <div 
            ref={previewRef}
            data-preview-container
            className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-shrink-0 transition-all duration-300 mx-auto mt-6 ${isMobile ? 'w-[375px]' : 'w-[500px]'}`}
            style={{ 
                minHeight: 'fit-content',
                transformOrigin: 'top center'
            }}
          >
            {/* Header */}
            <div className="p-3 flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-100 relative">
                  {adData.avatar ? (
                    <img src={adData.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    // Default Avatar Bình Vương placeholder if no image
                    <div className="w-full h-full flex items-center justify-center bg-white">
                        <div className="w-8 h-8 rounded-full border border-[#DA251D] flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#DA251D]"></div>
                        </div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#050505] leading-snug">
                    {adData.pageName || 'Tên Trang'}
                  </h3>
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <span>Được tài trợ</span>
                    <span aria-hidden="true">·</span>
                    <Globe size={10} className="text-gray-500" />
                  </div>
                </div>
              </div>
              <MoreHorizontal className="text-gray-500" size={20} />
            </div>

            {/* Primary Text */}
            <div className="px-3 pb-3 text-[15px] text-[#050505] whitespace-pre-wrap leading-normal font-normal">
              {adData.primaryText || 'Nội dung quảng cáo sẽ hiển thị ở đây...'}
            </div>

            {/* --- MEDIA AREA BASED ON FORMAT --- */}
            
            {/* 1. SINGLE IMAGE FORMAT */}
            {adFormat === 'single' && (
                <>
                    <div className="w-full bg-gray-100 relative border-t border-b border-gray-100">
                    {adData.postImage ? (
                        <img 
                        src={adData.postImage} 
                        alt="Ad Creative" 
                        className="w-full h-auto object-cover max-h-[600px]" 
                        />
                    ) : (
                        <div className="aspect-video w-full flex flex-col items-center justify-center bg-gray-50 text-gray-300">
                            <ImageIcon size={48} className="opacity-20"/>
                            <p className="text-xs mt-2 font-medium">1200 x 628 px</p>
                        </div>
                    )}
                    </div>
                    {/* CTA Section for Single */}
                    <div className="bg-[#F0F2F5] p-3 flex justify-between items-center border-b border-gray-200">
                        <div className="flex-1 pr-4 overflow-hidden">
                            <div className="text-xs text-gray-500 uppercase truncate mb-0.5">
                                {adData.websiteUrl || 'WEBSITE.COM'}
                            </div>
                            <div className="text-[16px] font-bold text-[#050505] leading-tight line-clamp-2">
                                {adData.headline || 'Tiêu đề quảng cáo'}
                            </div>
                            {adData.description && (
                                <div className="text-xs text-gray-500 truncate mt-1">
                                    {adData.description}
                                </div>
                            )}
                        </div>
                        <button className="bg-[#E4E6EB] text-[#050505] font-semibold text-[15px] px-4 py-2 rounded-md whitespace-nowrap border border-gray-300/50 flex-shrink-0">
                            {adData.ctaText}
                        </button>
                    </div>
                </>
            )}

            {/* 2. CAROUSEL FORMAT */}
            {adFormat === 'carousel' && (
                <div className="w-full overflow-hidden pb-2">
                    <div className="flex gap-3 px-3 overflow-x-auto no-scrollbar pb-2" style={{ scrollSnapType: 'x mandatory' }}>
                        {adData.carouselCards.map((card, idx) => (
                            <div key={card.id} className="w-[280px] flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm" style={{ scrollSnapAlign: 'start' }}>
                                <div className="aspect-square bg-gray-100 relative">
                                    {card.image ? (
                                        <img src={card.image} className="w-full h-full object-cover"/>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                            <ImageIcon size={32} opacity={0.5}/>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <div className="text-xs text-gray-500 uppercase truncate mb-1">
                                        {card.url || 'WEBSITE.COM'}
                                    </div>
                                    <div className="font-bold text-[#050505] text-[16px] leading-tight line-clamp-2 mb-1">
                                        {card.headline || 'Tiêu đề thẻ'}
                                    </div>
                                    <div className="text-xs text-gray-500 line-clamp-1 mb-3">
                                        {card.description}
                                    </div>
                                    <button className="w-full bg-[#E4E6EB] text-[#050505] font-semibold text-[14px] py-2 rounded-md border border-gray-300/50">
                                        {adData.ctaText}
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* See more card simulation */}
                        <div className="w-[100px] flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200 aspect-square mt-0">
                             <div className="text-center text-gray-500 text-xs font-medium px-2">
                                <div className="w-8 h-8 rounded-full border border-gray-200 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                                     {adData.avatar ? (
                                        <img src={adData.avatar} className="w-full h-full object-cover"/>
                                     ) : (
                                        <div className="w-full h-full bg-gray-100"></div>
                                     )}
                                </div>
                                Xem thêm tại trang cá nhân
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 3. ALBUM FORMAT */}
            {adFormat === 'album' && (
                <div className="w-full border-t border-gray-100">
                    {renderAlbumLayout()}
                    <div className="bg-[#F0F2F5] px-3 py-2 flex justify-between items-center border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                            Gửi tin nhắn cho trang
                        </div>
                         <button className="bg-[#E4E6EB] text-[#050505] font-semibold text-[14px] px-3 py-1.5 rounded-md whitespace-nowrap border border-gray-300/50">
                            Gửi tin nhắn
                        </button>
                    </div>
                </div>
            )}

            {/* Engagement Footer */}
            <div className="px-3 py-2 border-t border-gray-200 bg-white">
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                            <div className="w-4 h-4 rounded-full bg-[#DA251D] flex items-center justify-center ring-2 ring-white">
                                <ThumbsUp size={8} className="text-white fill-white" />
                            </div>
                        </div>
                        <span>1.2K</span>
                    </div>
                    <div className="flex gap-3">
                        <span>45 bình luận</span>
                        <span>12 chia sẻ</span>
                    </div>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200">
                    <button className="flex-1 flex items-center justify-center gap-2 py-1 text-gray-500 font-semibold hover:bg-gray-100 rounded-md transition-colors text-sm">
                        <ThumbsUp size={18} /> <span className="hidden sm:inline">Thích</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1 text-gray-500 font-semibold hover:bg-gray-100 rounded-md transition-colors text-sm">
                        <MessageCircle size={18} /> <span className="hidden sm:inline">Bình luận</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-1 text-gray-500 font-semibold hover:bg-gray-100 rounded-md transition-colors text-sm">
                        <Share2 size={18} /> <span className="hidden sm:inline">Chia sẻ</span>
                    </button>
                </div>
            </div>

          </div>
          
          <div className="mt-8 text-center space-y-2">
             <span className="inline-block px-3 py-1 bg-red-100 text-[#DA251D] text-xs font-bold rounded-full uppercase tracking-wider">
                Bình Vương AI Marketing
             </span>
             <p className="text-gray-400 text-xs italic">
                *Hình ảnh demo được tạo tự động
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}