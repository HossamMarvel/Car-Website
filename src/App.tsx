import { Wrench, FileText, Car, Shield, CheckCircle, Zap, Search, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface CarType {
  brand: string;
  model: string;
  year: number;
  price: number;
  speed: string;
  image: string;
  specs: string;
}

export default function App() {
  const navItems = ["الرئيسية", "السيارات", "عروض", "خدمات", "تواصل معنا"];
  
  // بيانات السيارات المحلية
  const carsDatabase: CarType[] = [
    { brand: "Hyundai", model: "Elantra", year: 2019, price: 950000, speed: "180-200", image: "/photos/elntra.jpg", specs: "النترا قوية وموفرة للوقود" },
    { brand: "Hyundai", model: "Tucson", year: 2020, price: 1200000, speed: "190-210", image: "/photos/tucson.png", specs: "SUV عملية وآمنة" },
    { brand: "Volkswagen", model: "Beetle", year: 2018, price: 250000, speed: "145-140", image: "/photos/Vibrant-Beetle.png", specs: "سيارة كلاسيكية أيقونية" },
    { brand: "Porsche", model: "356", year: 2020, price: 4342472, speed: "160-200", image: "/photos/porsche356.png", specs: "سيارة رياضية فاخرة" },
    { brand: "Mini", model: "Cooper John Cooper", year: 2021, price: 1950000, speed: "240-250", image: "/photos/Mini-Cooper.png", specs: "سيارة سباق ديناميكية" },
    { brand: "Toyota", model: "Corolla", year: 2019, price: 850000, speed: "175-190", image: "/photos/corolla.jpg", specs: "سيارة موثوقة وفعالة" },
    { brand: "Toyota", model: "Fortuner", year: 2020, price: 2500000, speed: "185-200", image: "/photos/toyota-fortuner.jpg", specs: "SUV قوية وفسيحة" },
    { brand: "Kia", model: "Cerato", year: 2021, price: 800000, speed: "180-195", image: "/photos/kia-cerato.jpg", specs: "سيدان حديثة وأنيقة" },
    { brand: "Nissan", model: "Sunny", year: 2019, price: 700000, speed: "170-185", image: "/photos/nissan-sunny.jpg", specs: "سيارة اقتصادية موثوقة" },
    { brand: "MG", model: "RX5", year: 2020, price: 1100000, speed: "190-210", image: "/photos/mg-RX5.jpg", specs: "SUV صينية حديثة" },
  ];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [searchResults, setSearchResults] = useState<CarType[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "results" | "finance" | "contact">("home");
  const [selectedCar, setSelectedCar] = useState<CarType | null>(null);
  const [downPayment, setDownPayment] = useState(0);
  const [years, setYears] = useState(1);
  const [interestRate, setInterestRate] = useState(1); // نسبة الفائدة الشهرية٪
  const [activeCar, setActiveCar] = useState<string | null>(null);


  const resetToHome = () => {
    setCurrentPage("home");
    setSelectedCar(null);
    setDownPayment(0);
    setYears(1);
  };

  const getCarImage = (car: CarType) => {
    const query = encodeURIComponent(`${car.brand} ${car.model} car`);
    return `https://source.unsplash.com/featured/800x500/?${query}`;
  };

  const handleSearch = async () => {
    if (!selectedBrand || !selectedModel) {
      alert("الرجاء اختيار ماركة وموديل");
      return;
    }

    setIsSearching(true);
    
    try {
      // البحث في قاعدة البيانات المحلية
      const results = carsDatabase.filter(
        car => car.brand === selectedBrand && car.model === selectedModel
      );

      // عرض النتائج بعد تأخير صغير
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (results.length > 0) {
        setSearchResults(results);
      } else {
        // إذا لم توجد نتائج، عرض سيارات من نفس الماركة
        const sameBrand = carsDatabase.filter(car => car.brand === selectedBrand);
        setSearchResults(sameBrand);
      }
      
      setSelectedCar(null);
      setDownPayment(0);
      setYears(1);
      setCurrentPage("results");
    } catch (error) {
      console.error("خطأ في البحث:", error);
      alert("حدث خطأ في البحث. الرجاء المحاولة مرة أخرى");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div dir="rtl" className="font-[Cairo] bg-gray-100">
      {currentPage === "contact" ? (
        // صفحة التواصل معنا
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          <div className="bg-[#0b1a2b] text-white flex items-center px-8 py-4">
            <button
              onClick={() => setCurrentPage("home")}
              className="text-sm bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-bold"
            >
              ← العودة للرئيسية
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-extrabold">
                <span className="text-yellow-400">تواصل</span> معنا
              </h1>
            </div>
            <div className="w-24"></div>
          </div>

          <div className="p-10">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">نحن هنا لمساعدتك</h2>
                <p className="text-xl text-gray-600">تواصل معنا عبر أحد القنوات التالية</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* WhatsApp Card */}
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-l-4 border-green-500 flex flex-col h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-green-100 p-6 rounded-full">
                      <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.781 1.18c-1.429.738-2.772 1.846-3.823 3.12-1.05 1.273-1.88 2.758-2.385 4.338-.506 1.578-.734 3.215-.686 4.858.024 1.643.278 3.276.76 4.82.482 1.543 1.184 3.003 2.08 4.318l-2.213 8.104a.75.75 0 00.973.973l8.104-2.213c1.315.896 2.775 1.598 4.318 2.08 1.544.482 3.177.736 4.82.76 1.643-48.686 2.675 3.28 2.175 4.858-.505 1.58-1.335 3.065-2.385 4.338-1.05 1.273-2.394 2.382-3.823 3.12a9.87 9.87 0 01-4.781 1.18c-1.687-.02-3.368-.195-5.009-.527l-.01.001z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">WhatsApp</h3>
                  <p className="text-center text-gray-600 mb-6 flex-grow">تواصل معنا عبر الواتس مباشرة</p>
                  <a
                    href="https://wa.me/201550591923"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-3 px-6 rounded-xl text-center hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-lg">01550591923</span>
                  </a>
                </div>

                {/* Facebook Card */}
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-l-4 border-blue-600 flex flex-col h-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-blue-100 p-6 rounded-full">
                      <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">Facebook</h3>
                  <p className="text-center text-gray-600 mb-2">تابعنا على صفحتنا الرسمية</p>
                  <p className="text-center text-orange-500 font-bold mb-6 flex-grow">AGENCY</p>
                  <a
                    href="https://www.facebook.com/profile.php?id=61560657785138"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-6 rounded-xl text-center hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-lg">زيارة الصفحة</span>
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">ساعات العمل</h3>
                <p className="text-lg mb-2">السبت - الخميس: 9:00 صباحاً - 10:00 مساءً</p>
                <p className="text-lg">الجمعة: 2:00 مساءً - 10:00 مساءً</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0b1a2b] text-white text-center py-6 mt-10">
            © 2026 جميع الحقوق محفوظة
          </div>
        </div>
      ) : currentPage === "finance" ? (
        // صفحة التمويل
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          <div className="bg-[#0b1a2b] text-white flex items-center px-8 py-4">
            <button
              onClick={() => setCurrentPage(searchResults.length ? "results" : "home")}
              className="text-sm bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-bold"
            >
              ← العودة
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-extrabold">
                <span className="text-yellow-400">تمويل</span> السيارة
              </h1>
            </div>
            <div className="w-24"></div>
          </div>

          <div className="p-10">
            {!selectedCar ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-xl mb-4">من فضلك اختر سيارة من نتائج البحث أولاً.</p>
                <button
                  onClick={() => (searchResults.length ? setCurrentPage("results") : resetToHome())}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-bold"
                >
                  العودة
                </button>
              </div>
            ) : (
              (() => {
                const loanAmount = Math.max(selectedCar.price - downPayment, 0);
                const monthlyRate = interestRate / 100;
                const totalMonths = Math.max(years, 1) * 12;
                const isZeroRate = Math.abs(monthlyRate) < Number.EPSILON;
                const monthlyPayment =
                  isZeroRate
                    ? loanAmount / totalMonths
                    : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));

                return (
                  <>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">تفاصيل السيارة</h2>
                        <img
                          src={getCarImage(selectedCar)}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = selectedCar.image;
                          }}
                          className="w-full h-56 object-cover rounded-lg mb-4"
                          alt={`${selectedCar.brand} ${selectedCar.model}`}
                        />
                        <p className="mb-1">الماركة والموديل: {selectedCar.brand} {selectedCar.model}</p>
                        <p className="mb-1">السنة: {selectedCar.year}</p>
                        <p className="mb-1">السعر: {selectedCar.price.toLocaleString()} جنيه</p>
                        <p className="mb-1">المواصفات: {selectedCar.specs}</p>
                      </div>

                      <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-2xl font-bold mb-4">حاسبة التمويل</h2>
                        <div className="mb-4">
                          <label className="block mb-2">الدفعة الأولى (جنيه)</label>
                          <input
                            type="number"
                            min={0}
                            value={downPayment}
                            onChange={(e) => setDownPayment(Number(e.target.value))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">المدة (سنوات)</label>
                          <input
                            type="number"
                            min={1}
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">نسبة الفائدة الشهرية (%)</label>
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>

                        <div className="bg-gray-50 border rounded p-4">
                          <p className="mb-2">المبلغ المطلوب تمويله: {loanAmount.toLocaleString()} جنيه</p>
                          <p className="mb-2">مدة التمويل: {years} سنوات ({totalMonths} شهر)</p>
                          <p className="mb-2">الدفعة الشهرية المتوقعة: {monthlyPayment.toFixed(2)} جنيه</p>
                          <p className="text-xs text-gray-500">نسبة الفائدة الشهرية مفترضة 1% (يمكن تعديلها لاحقاً).</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                      <button
                        onClick={() => setCurrentPage("results")}
                        className="px-5 py-3 bg-gray-300 hover:bg-gray-400 rounded font-semibold"
                      >
                        العودة لنتائج البحث
                      </button>
                      <button
                        onClick={resetToHome}
                        className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded font-semibold"
                      >
                        العودة للرئيسية
                      </button>
                    </div>
                  </>
                );
              })()
            )}
          </div>

          <div className="bg-[#0b1a2b] text-white text-center py-6 mt-10">
            © 2026 جميع الحقوق محفوظة
          </div>
        </div>
      ) : currentPage === "results" ? (
        // صفحة نتائج البحث المنفصلة
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          {/* Navbar */}
          <div className="bg-[#0b1a2b] text-white flex items-center px-8 py-4">
            <button 
              onClick={resetToHome}
              className="text-sm bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-bold"
            >
              ← العودة للرئيسية
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-3xl font-extrabold">
                <span className="text-yellow-400">المــ</span>يــــداني
              </h1>
            </div>
            <div className="w-24"></div>
          </div>

          {/* Search Results Header */}
          <div className="p-10">
            <h2 className="text-4xl font-bold text-center mb-2">نتائج البحث</h2>
            <p className="text-center text-gray-600 text-lg mb-8">
              البحث عن: <span className="font-bold text-blue-600">{selectedBrand} {selectedModel}</span>
            </p>

            {searchResults.length > 0 ? (
              <>
                <p className="text-center text-gray-500 mb-8">
                  وجدنا <span className="font-bold text-orange-500">{searchResults.length}</span> سيارة مطابقة
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {searchResults.map((car, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={car.image}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.onerror = null;
                            target.src = `https://source.unsplash.com/featured/800x500/?${encodeURIComponent(car.brand + ' ' + car.model + ' car')}`;
                          }}
                          className="w-full h-full object-cover"
                          alt={`${car.brand} ${car.model}`}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">{car.brand}</h3>
                        <h4 className="text-lg text-blue-600 font-semibold mb-3">{car.model}</h4>
                        <p className="text-sm text-gray-600 mb-2">📅 سنة {car.year}</p>
                        <p className="text-sm text-gray-500 mb-3">✨ {car.specs}</p>
                        <div className="border-t pt-3 mb-3">
                          <p className="text-sm text-blue-600 font-semibold">⚡ السرعة: {car.speed} كم/س</p>
                        </div>
                        <p className="text-orange-500 font-bold text-2xl mb-4">
                          {car.price.toLocaleString()} جنيه
                        </p>
                        <button
                          onClick={() => {
                            setSelectedCar(car);
                            setCurrentPage("finance");
                          }}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
                        >
                          عرض التفاصيل
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-2xl mb-4">للأسف، لا توجد نتائج مطابقة</p>
                <button 
                  onClick={resetToHome}
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-white font-bold"
                >
                  العودة والبحث مرة أخرى
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-[#0b1a2b] text-white text-center py-6 mt-10">
            © 2026 جميع الحقوق محفوظة
          </div>
        </div>
      ) : (
        // الصفحة الرئيسية
        <>

      {/* Navbar */}
      <div className="bg-[#0b1a2b] text-white flex items-center px-8 py-4">
        <div className="flex-1 flex justify-center gap-10 text-base font-semibold">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (item === "تواصل معنا") {
                  setCurrentPage("contact");
                } else if (item === "الرئيسية") {
                  setCurrentPage("home");
                }
              }}
              className="relative group"
            >
              <span className="group-hover:text-yellow-400 transition duration-300">
                {item}
              </span>
              <span className="absolute right-0 -bottom-1 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <div className="text-3xl md:text-4xl font-extrabold tracking-widest ml-6">
          <span className="text-yellow-400">المــ</span>
          <span className="mx-1">يــــ</span>
          <span>داني</span>
        </div>
      </div>

      {/* Hero */}
      <div
        className="relative h-[520px]"
        style={{
          backgroundImage: "url('/photos/silver-suv.jpg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex items-center px-16 text-white z-10">
          <div className="max-w-xl text-right">
            <h1 className="text-6xl font-extrabold mb-4">
              <span className="text-yellow-400">المــ</span>يــــداني
            </h1>

            <p className="text-lg mb-6">
              دليلك لبيع وشراء بأفضل الأسعار
            </p>

            <div className="bg-white p-2 rounded-xl flex gap-2 items-center shadow-lg w-fit">
              <select 
                className="px-3 py-2 rounded text-black border"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel("");
                }}
              >
                <option value="">اختر الماركة</option>
                <option>Hyundai</option>
                <option>Kia</option>
                <option>Toyota</option>
                <option>Nissan</option>
                <option>Chevrolet</option>
                <option>MG</option>
                <option>Chery</option>
                <option>BYD</option>
                <option>Peugeot</option>
                <option>Renault</option>
                <option>Skoda</option>
                <option>Mercedes-Benz</option>
                <option>BMW</option>
                <option>Audi</option>
                <option>Lexus</option>
                <option>Porsche</option>
                <option>Land Rover</option>
                <option>Jaguar</option>
                <option>Volkswagen</option>
                <option>Mitsubishi</option>
                <option>Suzuki</option>
                <option>Opel</option>
                <option>Geely</option>
                <option>Jetour</option>
                <option>Haval</option>
                <option>Changan</option>
                <option>Dongfeng</option>
              </select>
              <select 
                className="px-3 py-2 rounded text-black border"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="">اختر الموديل</option>
                {selectedBrand === "Hyundai" && (
                  <>
                    <option>Elantra</option>
                    <option>Accent RB</option>
                    <option>Tucson</option>
                    <option>Creta</option>
                    <option>Santa Fe</option>
                  </>
                )}
                {selectedBrand === "Kia" && (
                  <>
                    <option>Cerato</option>
                    <option>Sportage</option>
                    <option>Seltos</option>
                    <option>Sorento</option>
                  </>
                )}
                {selectedBrand === "Toyota" && (
                  <>
                    <option>Corolla</option>
                    <option>Camry</option>
                    <option>Fortuner</option>
                    <option>Land Cruiser</option>
                  </>
                )}
                {selectedBrand === "Nissan" && (
                  <>
                    <option>Sunny</option>
                    <option>Sentra</option>
                    <option>Qashqai</option>
                    <option>X-Trail</option>
                  </>
                )}
                {selectedBrand === "MG" && (
                  <>
                    <option>MG5</option>
                    <option>MG6</option>
                    <option>RX5</option>
                    <option>ZS</option>
                  </>
                )}
                {selectedBrand === "Volkswagen" && (
                  <>
                    <option>Beetle</option>
                    <option>Golf</option>
                    <option>Jetta</option>
                    <option>Passat</option>
                  </>
                )}
                {selectedBrand === "Porsche" && (
                  <>
                    <option>356</option>
                    <option>911</option>
                    <option>Cayenne</option>
                  </>
                )}
                {selectedBrand === "Mini" && (
                  <>
                    <option>Cooper</option>
                    <option>Cooper John Cooper</option>
                  </>
                )}
              </select>
              <select className="px-3 py-2 rounded text-black border">
                <option>اختر معرضك</option>
                <option>Toyota Egypt</option>
                <option>Nissan Egypt</option>
                <option>Mercedes-Benz Egypt</option>
                <option>Abou Ghali Automotive</option>
                <option>Abo Gresha Motors</option>
                <option>Abo Aleez Showroom</option>
                <option>Abdullah Car Company</option>
              </select>

              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 px-6 py-2 rounded text-white font-bold whitespace-nowrap flex items-center gap-2"
              >
                {isSearching ? "جاري البحث..." : "ابحث الآن"}
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Services Bar */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[92%] z-20">
          <div className="bg-white rounded-2xl shadow-xl flex justify-between items-center p-6">

            <div className="flex items-center gap-3 cursor-default select-none">
              <Wrench size={40} className="text-orange-500" />
              <div>
                <h3 className="font-bold">خدمات الصيانة</h3>
                <p className="text-sm text-gray-500">فحص واصلاح شامل</p>
              </div>
            </div>

            <div className="w-px h-12 bg-gray-300"></div>

            <div className="flex items-center gap-3 cursor-default select-none">
              <FileText size={40} className="text-blue-500" />
              <div>
                <h3 className="font-bold">تقارير وفحص السيارات</h3>
                <p className="text-sm text-gray-500">حتى 3000 كم</p>
              </div>
            </div>

            <div className="w-px h-12 bg-gray-300"></div>

            <div className="flex items-center gap-3 cursor-default select-none">
              <Car size={40} className="text-red-500" />
              <div>
                <h3 className="font-bold">سيارات للبيع</h3>
                <p className="text-sm text-gray-500">أفضل العروض</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-28"></div>

      {/* Cars */}
      <div className="p-10">
        <h2 className="text-2xl font-bold text-center mb-6">أحدث السيارات</h2>

        <div className="grid grid-cols-4 gap-6">

          {/* Porsche */}
          <div onClick={() => setActiveCar("porsche")} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer">
            <div className="h-40 rounded mb-4 overflow-hidden">
              <img src="/photos/porsche356.png" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-lg">Porsche 356</h3>
            <p className="text-sm text-gray-500 mt-1">من 160 - 200 كم/س</p>
            <p className="text-orange-500 font-bold mt-2">السعر 4٬342٬472٫00 [جنيه]</p>
          </div>

          {/* Beetle */}
          <div onClick={() => setActiveCar("beetle")} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer">
            <div className="h-40 rounded mb-4 overflow-hidden">
              <img src="/photos/Vibrant-Beetle.png" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-lg">Volkswagen Beetle</h3>
            <p className="text-sm text-gray-500 mt-1">من 145 - 140 كم /س</p>
            <p className="text-orange-500 font-bold mt-2">السعر 250,000 [جنيه]</p>
          </div>

          {/* Hyundai */}
          <div onClick={() => setActiveCar("hyundai")} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer">
            <div className="h-40 rounded mb-4 overflow-hidden">
              <img src="/photos/Hyundai-Elantra.png" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-lg">Hyundai Elantra 2019</h3>
            <p className="text-sm text-gray-500 mt-1">من 180 - 200 كم /س</p>
            <p className="text-orange-500 font-bold mt-2">السعر 950,000 [جنيه]</p>
          </div>

          {/* Mini Cooper */}
          <div onClick={() => setActiveCar("mini")} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer">
            <div className="h-40 rounded mb-4 overflow-hidden">
              <img src="/photos/Mini-Cooper.png" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold text-lg">Mini Cooper John Cooper</h3>
            <p className="text-sm text-gray-500 mt-1">من 240 - 250 كم/ س</p>
            <p className="text-orange-500 font-bold mt-2">السعر 1,950,000 [جنيه]</p>
          </div>

        </div>
      </div>

      {/* Offers */}
      <div className="px-10 pb-10">
        <h2 className="text-2xl font-bold text-center mb-6">عروض مميزة</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow hover:scale-105 transition">
            <img
              src="/photos/money-without-deposit.png"
              onClick={() => setCurrentPage("finance")}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>

          <div className="rounded-2xl overflow-hidden shadow hover:scale-105 transition">
            <img src="/photos/caroffer.jpg" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="p-10">
        <h2 className="text-2xl font-bold text-center mb-6">خدماتنا</h2>

        <div className="grid grid-cols-4 gap-6">
          {[{name: "تأمين السيارات", icon: Shield}, {name: "تسجيل وترخيص", icon: CheckCircle}, {name: "تمويل السيارات", icon: Zap}, {name: "فحص السيارات", icon: FileText}].map((item,i)=>(
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition">
              <div className="mb-2">{<item.icon size={32} className="mx-auto text-orange-500" />}</div>
              <p className="font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#0b1a2b] text-white text-center py-6">
        © 2026 جميع الحقوق محفوظة
      </div>

      {/* 🔥 Overlay */}
      {activeCar && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-3xl rounded-2xl p-8 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveCar(null)}
              className="absolute top-4 left-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              ✕
            </button>

            {/* ================= PORSCHE ================= */}
            {activeCar === "porsche" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold mb-4 text-center text-orange-500">Porsche 356</h2>
                <p className="text-gray-700 text-center">أول عربية رياضية تنتجها شركة بورش</p>

                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-2">⚙️ المواصفات</h3>
                  <ul className="text-gray-600 space-y-1 mr-4">
                    <li>• محرك: 4 سلندر (بوكسر)</li>
                    <li>• 1300cc – 1600cc</li>
                    <li>• 60 – 90 حصان</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">🚀 الأداء</h3>
                  <p className="text-gray-600">160 – 200 كم/س</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">💰 السعر</h3>
                  <p className="text-gray-700">80,000 – 500,000 دولار</p>
                </div>
              </div>
            )}

            {/* ================= MINI ================= */}
            {activeCar === "mini" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold mb-4 text-center text-orange-500">Mini Cooper JCW</h2>
                <p className="text-gray-700 text-center">أعلى فئة رياضية من ميني كوبر</p>

                <div>
                  <h3 className="font-bold text-lg mb-2">🏎️ النوع</h3>
                  <p className="text-gray-600">هاتشباك رياضية - دفع أمامي</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">⚙️ المواصفات</h3>
                  <ul className="text-gray-600 space-y-1 mr-4">
                    <li>• 2.0L Turbo</li>
                    <li>• 228 – 231 حصان</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">🚀 الأداء</h3>
                  <p className="text-gray-600">240 – 250 كم/س</p>
                  <p className="text-gray-600">0 → 100 في 6 ثواني 🔥</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">💰 السعر</h3>
                  <p className="text-gray-700">1,800,000 – 2,400,000 جنيه</p>
                </div>
              </div>
            )}

            {/* ================= HYUNDAI ================= */}
            {activeCar === "hyundai" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold mb-4 text-center text-orange-500">Hyundai Elantra</h2>

                <div>
                  <h3 className="font-bold text-lg mb-2">🏎️ النوع</h3>
                  <p className="text-gray-600">سيدان عائلية (FWD)</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">⚙️ المواصفات</h3>
                  <ul className="text-gray-600 space-y-1 mr-4">
                    <li>• 1600cc – 2000cc</li>
                    <li>• 127 – 152 حصان</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">🚀 الأداء</h3>
                  <p className="text-gray-600">180 – 200 كم/س</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">💰 السعر</h3>
                  <p className="text-gray-700">700,000 – 950,000 جنيه</p>
                </div>
              </div>
            )}

            {/* ================= BEETLE ================= */}
            {activeCar === "beetle" && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold mb-4 text-center text-orange-500">Volkswagen Beetle</h2>
                <p className="text-gray-700 text-center">الخنفسة الكلاسيك</p>

                <div>
                  <h3 className="font-bold text-lg mb-2">⚙️ المواصفات</h3>
                  <ul className="text-gray-600 space-y-1 mr-4">
                    <li>• 1200cc – 1600cc</li>
                    <li>• 40 – 60 حصان</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">🚀 السرعة</h3>
                  <p className="text-gray-600">115 – 140 كم/س</p>
                </div>

                <div className="bg-gray-100 p-4 rounded-xl">
                  <h3 className="font-bold text-lg mb-2">💰 ملاحظات</h3>
                  <p className="text-gray-700">النسخ المعدلة ممكن توصل 160+ كم/س</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

        </>
      )}
    </div>
  );
}