import React from 'react';
import { CustomerReviews } from './CustomerReviews';
import { StoreReviews } from './StoreReviews';

// مكون تجريبي لاختبار نظام المراجعات المحدث
const ReviewsDemo = () => {
  // بيانات تجريبية للمنتج
  const mockProductReviews = [
    {
      id: 1,
      user: "Alice Johnson",
      rating: 5,
      comment: "Absolutely love the quality and style! The customer service is exceptional and shipping was faster than expected.",
      date: "2024-02-15",
      overallFit: "True to Size",
      size: "M",
      color: "Black",
      helpfulCount: 12,
      images: ["review_1708012800000_abc123.jpg", "review_1708012801000_def456.jpg"], // أسماء الصور
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      user: "Bob Smith",
      rating: 4,
      comment: "Great product with excellent quality. Shipping was quick!",
      date: "2024-02-14",
      overallFit: "Runs Small",
      size: "L",
      color: "Navy",
      helpfulCount: 8,
      images: [],
      avatar: "/placeholder.svg"
    }
  ];

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const availableColors = ["Black", "White", "Navy", "Red", "Forest Green", "Hot Pink"];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">مراجعات النظام المحدث</h1>
      
      {/* مراجعات المنتج */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">مراجعات المنتج</h2>
        <div className="bg-white rounded-lg shadow">
          <CustomerReviews
            reviews={mockProductReviews}
            availableSizes={availableSizes}
            availableColors={availableColors}
          />
        </div>
      </div>

      {/* مراجعات المتجر */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">مراجعات المتجر</h2>
        <StoreReviews
          storeId="store123"
          storeName="متجر الأزياء الرياضية"
        />
      </div>

      {/* معلومات النظام */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">ميزات النظام المحدث</h3>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>رفع الصور:</strong> يمكن للمستخدمين رفع صور مع مراجعاتهم</li>
          <li><strong>إدارة الصور:</strong> النظام يرسل أسماء الصور فقط ويستقبلها بنفس الطريقة</li>
          <li><strong>مراجعات المتجر:</strong> نظام منفصل لمراجعات المتاجر</li>
          <li><strong>تصفية وترتيب:</strong> إمكانية تصفية المراجعات حسب التقييم</li>
          <li><strong>تفاعل المستخدمين:</strong> تسجيل المراجعات كمفيدة</li>
          <li><strong>Mock Data:</strong> يعمل مع البيانات التجريبية ويحفظها في localStorage</li>
          <li><strong>إدارة الحالة:</strong> معالجة محسنة للأخطاء وحالات التحميل</li>
        </ul>
      </div>

      {/* واجهات API المطلوبة */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">واجهات API المطلوبة للتطبيق الحقيقي</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">مراجعات المنتجات:</h4>
            <ul className="text-sm space-y-1">
              <li>GET /api/reviews/:productId</li>
              <li>POST /api/reviews</li>
              <li>PUT /api/reviews/:reviewId/helpful</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">مراجعات المتاجر:</h4>
            <ul className="text-sm space-y-1">
              <li>GET /api/stores/:storeId/reviews</li>
              <li>POST /api/stores/:storeId/reviews</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">إدارة الصور:</h4>
            <ul className="text-sm space-y-1">
              <li>POST /api/images/upload</li>
              <li>GET /api/images/:imageName</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsDemo;