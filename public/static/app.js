// ==================== YAQEEN STORE SPA - COMPLETE ====================
const LOGO='/static/images/logo.jpg';
const FB_LINK='https://www.facebook.com/share/1B59zvfZV7/';
const TT_LINK='https://www.tiktok.com/@yaqeen.778?_r=1&_t=ZS-954yzyw1NYH';
const WA_PHONE='201108484119';
const PHONE='01108484119';
const CONTACT_EMAIL='infoyaqeen77@gmail.com';

// STATE
const Store={
  user:null,token:localStorage.getItem('yq_token'),cart:[],wishlist:JSON.parse(localStorage.getItem('yq_wish')||'[]'),
  lang:localStorage.getItem('yq_lang')||'ar',
  theme:localStorage.getItem('yq_theme')||'dark',products:[],categories:[],listeners:[],
  subscribe(fn){this.listeners.push(fn)},notify(){this.listeners.forEach(fn=>fn())},
  setUser(u,t){this.user=u;this.token=t;t?localStorage.setItem('yq_token',t):localStorage.removeItem('yq_token');this.notify()},
  setLang(l){this.lang=l;localStorage.setItem('yq_lang',l);document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';this.notify()},
  setTheme(t){this.theme=t;localStorage.setItem('yq_theme',t);document.documentElement.setAttribute('data-theme',t);this.notify()},
  isAdmin(){return this.user&&this.user.role==='admin'},isLoggedIn(){return!!this.token&&!!this.user},
  toggleWish(id){const i=this.wishlist.indexOf(id);if(i>-1)this.wishlist.splice(i,1);else this.wishlist.push(id);localStorage.setItem('yq_wish',JSON.stringify(this.wishlist))},
  isWished(id){return this.wishlist.includes(id)}
};

// i18n
const T={
ar:{home:'الرئيسية',shop:'المتجر',categories:'الأقسام',about:'عن يقين',signin:'دخول',register:'حساب جديد',signout:'خروج',admin:'لوحة التحكم',
cart:'السلة',addToCart:'أضف للسلة',removeFromCart:'حذف',viewDetails:'التفاصيل',price:'السعر',total:'الإجمالي',currency:'ج.م',checkout:'إتمام الطلب',
email:'البريد الإلكتروني',password:'كلمة المرور',name:'الاسم',username:'اسم المستخدم',
heroTitle:'تسوق بثقة',heroHighlight:'جودة بلا حدود',heroDesc:'اكتشف أفضل المنتجات بأسعار لا تُقاوم مع خدمة عملاء متميزة وتجربة تسوق فريدة.',shopNow:'تسوق الآن',learnMore:'اعرف أكثر',
featuredProducts:'منتجات مميزة',allProducts:'جميع المنتجات',recommended:'مقترح لك',newArrivals:'وصل حديثاً',
addProduct:'إضافة منتج',editProduct:'تعديل المنتج',deleteProduct:'حذف المنتج',updateProduct:'تحديث',
productTitleAr:'اسم المنتج (عربي)',productTitleEn:'اسم المنتج (إنجليزي)',productPrice:'السعر',productOldPrice:'السعر القديم',
productDescAr:'الوصف (عربي)',productDescEn:'الوصف (إنجليزي)',productDetailsAr:'التفاصيل (عربي)',productDetailsEn:'التفاصيل (إنجليزي)',
productCategory:'القسم',productBrand:'الماركة',productSKU:'كود المنتج',productStock:'المخزون',productFeatured:'مميز',
specifications:'المواصفات',details:'التفاصيل',description:'الوصف',
noProducts:'لا توجد منتجات',emptyCart:'السلة فارغة',emptyCartMsg:'أضف منتجات للسلة وابدأ التسوق',continueShopping:'تابع التسوق',
orderSummary:'ملخص الطلب',subtotal:'المجموع',shipping:'الشحن',
prayer:'﷽ | اللهم صلِّ وسلم على نبينا محمد ﷺ',
welcome:'مرحباً',products:'المنتجات',users:'المستخدمين',orders:'الطلبات',revenue:'الإيرادات',
loading:'جاري التحميل...',error:'حدث خطأ',success:'تم بنجاح',
allFieldsRequired:'جميع الحقول مطلوبة',invalidCredentials:'بيانات غير صحيحة',emailExists:'الإيميل موجود بالفعل',accountCreated:'تم إنشاء الحساب',
productAdded:'تم إضافة المنتج',productUpdated:'تم تحديث المنتج',productDeleted:'تم حذف المنتج',
addedToCart:'تم الإضافة للسلة',removedFromCart:'تم الحذف',orderPlaced:'تم تأكيد الطلب بنجاح! شكراً لك',
fullName:'الاسم بالكامل',phone:'رقم الموبايل',phone2:'رقم موبايل ثاني (اختياري)',address:'العنوان التفصيلي',notes:'ملاحظات',emailOptional:'الإيميل (اختياري)',governorate:'المحافظة',city:'المدينة',selectGovernorate:'اختر المحافظة',selectCity:'اختر المدينة',deliveryInfo:'بيانات التوصيل',personalInfo:'البيانات الشخصية',additionalNotes:'ملاحظات إضافية',
inStock:'متوفر',outOfStock:'غير متوفر',quantity:'الكمية',
securePayment:'دفع آمن',securePaymentDesc:'حماية كاملة لبياناتك',support247:'دعم 24/7',support247Desc:'فريق الدعم متاح دائماً',
qualityGuarantee:'ضمان الجودة',qualityGuaranteeDesc:'جميع منتجاتنا أصلية ومضمونة',
aboutTitle:'عن يقين',aboutDesc:'يقين متجر إلكتروني متخصص في تقديم أفضل المنتجات بأعلى جودة وأفضل سعر. نسعى لتوفير تجربة تسوق مميزة وفريدة لعملائنا الكرام.',
allCategories:'كل الأقسام',searchProducts:'ابحث عن منتجات...',noAccount:'معندكش حساب؟',haveAccount:'عندك حساب؟',
confirmDelete:'هل أنت متأكد من الحذف؟',yes:'نعم',no:'لا',cancel:'إلغاء',save:'حفظ',back:'رجوع',
darkMode:'داكن',lightMode:'فاتح',language:'اللغة',manageProducts:'إدارة المنتجات',manageOrders:'إدارة الطلبات',imgUrl:'رابط الصورة',
pending:'قيد الانتظار',processing:'جاري التجهيز',shipped:'تم الشحن',completed:'مكتمل',cancelled:'ملغي',
rightsReserved:'جميع الحقوق محفوظة',dashboard:'لوحة التحكم',todayOrders:'طلبات اليوم',todayRevenue:'إيرادات اليوم',
pendingOrders:'طلبات منتظرة',completedOrders:'طلبات مكتملة',orderDetails:'تفاصيل الطلب',editOrder:'تعديل الطلب',
deleteOrder:'حذف الطلب',orderStatus:'حالة الطلب',orderDeleted:'تم حذف الطلب',orderUpdated:'تم تحديث الطلب',
customerInfo:'بيانات العميل',orderItems:'المنتجات المطلوبة',noOrders:'لا توجد طلبات',
lowStock:'مخزون منخفض',outOfStockCount:'نفدت',topSelling:'الأكثر مبيعاً',recentOrders:'آخر الطلبات',
quickActions:'إجراءات سريعة',viewAll:'عرض الكل',sold:'مبيع',overview:'نظرة عامة',
manageUsers:'المستخدمين',totalRevenue:'إجمالي الإيرادات',orderAnalysis:'تحليل الطلبات',
profile:'الملف الشخصي',myAccount:'حسابي',myOrders:'طلباتي',accountInfo:'معلومات الحساب',memberSince:'عضو منذ',
contactUs:'تواصل معنا',contactEmail:'البريد الإلكتروني للتواصل',
discount:'الخصم',discountPercent:'نسبة الخصم',galleryImages:'صور إضافية',addImage:'إضافة صورة',
invoice:'فاتورة',downloadInvoice:'تحميل الفاتورة',invoiceNumber:'رقم الفاتورة',
orderDate:'تاريخ الطلب',unitPrice:'سعر الوحدة',itemTotal:'إجمالي الصنف',grandTotal:'الإجمالي الكلي',
avgOrderValue:'متوسط قيمة الطلب',
sizes:'المقاسات',colors:'الألوان',enableSizes:'تفعيل المقاسات',enableColors:'تفعيل الألوان',
addSize:'إضافة مقاس',addColor:'إضافة لون',selectSize:'اختر المقاس',selectColor:'اختر اللون',
deleteUser:'حذف المستخدم',userDeleted:'تم حذف المستخدم',cannotDeleteAdmin:'لا يمكن حذف المسؤول',
phoneMustBe11:'رقم الموبايل يجب أن يكون 11 رقم',
orderInfo:'بيانات الطلب',paymentMethod:'طريقة الدفع',cashOnDelivery:'الدفع عند الاستلام',
confirmOrder:'تأكيد الطلب',orderNumber:'رقم الطلب',
backToSite:'العودة للموقع',adminPanel:'لوحة الإدارة',
uploadImage:'رفع صورة',uploadMainImage:'رفع الصورة الرئيسية',uploadGalleryImages:'رفع صور إضافية',dragDropHere:'اسحب الصور هنا أو اضغط للاختيار',uploading:'جاري الرفع...',uploadSuccess:'تم رفع الصورة',uploadError:'فشل رفع الصورة',maxFileSize:'الحد الأقصى 5MB',orEnterUrl:'أو أدخل رابط',
wishlist:'المفضلة',addToWishlist:'أضف للمفضلة',removeFromWishlist:'حذف من المفضلة',emptyWishlist:'المفضلة فارغة',
variantStock:'مخزون المتغيرات',stockPerVariant:'المخزون حسب اللون/المقاس',
freeShipping:'شحن مجاني',fastDelivery:'توصيل سريع',fastDeliveryDesc:'توصيل خلال 2-5 أيام عمل',
loginRequired:'يجب تسجيل الدخول أولاً',
manageCategories:'إدارة الأقسام',
filterByCategory:'فلتر بالقسم',filterByStatus:'فلتر بالحالة',filterByStock:'فلتر بالمخزون',searchByName:'بحث بالاسم...',searchOrders:'بحث بالاسم أو الرقم...',allStatuses:'كل الحالات',allStock:'كل المنتجات',lowStockOnly:'مخزون منخفض',outOfStockOnly:'نفدت من المخزون',inStockOnly:'متوفر فقط',sortBy:'ترتيب',sortNewest:'الأحدث',sortOldest:'الأقدم',sortPriceHigh:'السعر: الأعلى',sortPriceLow:'السعر: الأقل',sortNameAZ:'الاسم: أ-ي',priceRange:'نطاق السعر',priceFrom:'من',priceTo:'إلى',applyFilter:'تطبيق',resetFilter:'مسح',shareProduct:'مشاركة المنتج',addItemToOrder:'إضافة منتج للطلب',removeItemFromOrder:'حذف من الطلب',selectProduct:'اختر منتج',itemAdded:'تم إضافة المنتج للطلب',itemRemoved:'تم حذف المنتج من الطلب',confirmRemoveItem:'هل أنت متأكد من حذف هذا المنتج من الطلب؟',shareVia:'مشاركة عبر',copyLink:'نسخ الرابط',linkCopied:'تم نسخ الرابط',
coupons:'أكواد الخصم',manageCoupons:'إدارة أكواد الخصم',addCoupon:'إضافة كود خصم',editCoupon:'تعديل كود الخصم',couponCode:'كود الخصم',couponDiscount:'قيمة الخصم',couponType:'نوع الخصم',percentage:'نسبة مئوية',fixedAmount:'مبلغ ثابت',minOrder:'حد أدنى للطلب',maxUses:'الحد الأقصى للاستخدام',usedCount:'مرات الاستخدام',expiresAt:'تاريخ الانتهاء',unlimited:'غير محدود',active:'مفعل',inactive:'غير مفعل',couponAdded:'تم إضافة كود الخصم',couponUpdated:'تم تحديث كود الخصم',couponDeleted:'تم حذف كود الخصم',applyCoupon:'تطبيق الكود',couponApplied:'تم تطبيق كود الخصم',invalidCoupon:'كود خصم غير صحيح',couponExpired:'كود الخصم منتهي الصلاحية',couponMaxed:'كود الخصم وصل للحد الأقصى',couponInactive:'كود الخصم غير مفعل',minOrderNotMet:'الطلب أقل من الحد الأدنى',discountApplied:'الخصم المطبق',noCoupons:'لا توجد أكواد خصم',enterCoupon:'أدخل كود الخصم',removeCoupon:'إزالة الكود',
},
en:{home:'Home',shop:'Shop',categories:'Categories',about:'About',signin:'Sign In',register:'Register',signout:'Sign Out',admin:'Admin',
cart:'Cart',addToCart:'Add to Cart',removeFromCart:'Remove',viewDetails:'Details',price:'Price',total:'Total',currency:'EGP',checkout:'Checkout',
email:'Email',password:'Password',name:'Name',username:'Username',
heroTitle:'Shop with Confidence',heroHighlight:'Quality without Limits',heroDesc:'Discover the best products at unbeatable prices with excellent customer service and a unique shopping experience.',shopNow:'Shop Now',learnMore:'Learn More',
featuredProducts:'Featured Products',allProducts:'All Products',recommended:'Recommended',newArrivals:'New Arrivals',
addProduct:'Add Product',editProduct:'Edit Product',deleteProduct:'Delete',updateProduct:'Update',
productTitleAr:'Name (Arabic)',productTitleEn:'Name (English)',productPrice:'Price',productOldPrice:'Old Price',
productDescAr:'Description (Arabic)',productDescEn:'Description (English)',productDetailsAr:'Details (Arabic)',productDetailsEn:'Details (English)',
productCategory:'Category',productBrand:'Brand',productSKU:'SKU',productStock:'Stock',productFeatured:'Featured',
specifications:'Specifications',details:'Details',description:'Description',
noProducts:'No products found',emptyCart:'Cart is Empty',emptyCartMsg:'Add products to start shopping',continueShopping:'Continue Shopping',
orderSummary:'Order Summary',subtotal:'Subtotal',shipping:'Shipping',
prayer:'﷽ | O Allah, send blessings upon Prophet Muhammad ﷺ',
welcome:'Welcome',products:'Products',users:'Users',orders:'Orders',revenue:'Revenue',
loading:'Loading...',error:'Error',success:'Success',
allFieldsRequired:'All fields required',invalidCredentials:'Invalid credentials',emailExists:'Email already exists',accountCreated:'Account created successfully',
productAdded:'Product added',productUpdated:'Product updated',productDeleted:'Product deleted',
addedToCart:'Added to cart',removedFromCart:'Removed',orderPlaced:'Order placed successfully! Thank you',
fullName:'Full Name',phone:'Phone Number',phone2:'Second Phone (optional)',address:'Detailed Address',notes:'Notes',emailOptional:'Email (optional)',governorate:'Governorate',city:'City',selectGovernorate:'Select Governorate',selectCity:'Select City',deliveryInfo:'Delivery Info',personalInfo:'Personal Info',additionalNotes:'Additional Notes',
inStock:'In Stock',outOfStock:'Out of Stock',quantity:'Quantity',
securePayment:'Secure Payment',securePaymentDesc:'Complete data protection',support247:'24/7 Support',support247Desc:'Support available anytime',
qualityGuarantee:'Quality Guarantee',qualityGuaranteeDesc:'All our products are original and guaranteed',
aboutTitle:'About Yaqeen',aboutDesc:'Yaqeen is an online store specializing in the best products with highest quality and best prices. We aim to provide a unique shopping experience.',
allCategories:'All Categories',searchProducts:'Search products...',noAccount:"Don't have an account?",haveAccount:'Already have an account?',
confirmDelete:'Are you sure you want to delete?',yes:'Yes',no:'No',cancel:'Cancel',save:'Save',back:'Back',
darkMode:'Dark',lightMode:'Light',language:'Language',manageProducts:'Manage Products',manageOrders:'Manage Orders',imgUrl:'Image URL',
pending:'Pending',processing:'Processing',shipped:'Shipped',completed:'Completed',cancelled:'Cancelled',
rightsReserved:'All rights reserved',dashboard:'Dashboard',todayOrders:'Today Orders',todayRevenue:'Today Revenue',
pendingOrders:'Pending Orders',completedOrders:'Completed Orders',orderDetails:'Order Details',editOrder:'Edit Order',
deleteOrder:'Delete Order',orderStatus:'Order Status',orderDeleted:'Order deleted',orderUpdated:'Order updated',
customerInfo:'Customer Info',orderItems:'Ordered Items',noOrders:'No orders yet',
lowStock:'Low Stock',outOfStockCount:'Out of Stock',topSelling:'Top Selling',recentOrders:'Recent Orders',
quickActions:'Quick Actions',viewAll:'View All',sold:'sold',overview:'Overview',
manageUsers:'Users',totalRevenue:'Total Revenue',orderAnalysis:'Order Analysis',
profile:'Profile',myAccount:'My Account',myOrders:'My Orders',accountInfo:'Account Info',memberSince:'Member Since',
contactUs:'Contact Us',contactEmail:'Contact Email',
discount:'Discount',discountPercent:'Discount %',galleryImages:'Gallery Images',addImage:'Add Image',
invoice:'Invoice',downloadInvoice:'Download Invoice',invoiceNumber:'Invoice Number',
orderDate:'Order Date',unitPrice:'Unit Price',itemTotal:'Item Total',grandTotal:'Grand Total',
avgOrderValue:'Avg Order Value',
sizes:'Sizes',colors:'Colors',enableSizes:'Enable Sizes',enableColors:'Enable Colors',
addSize:'Add Size',addColor:'Add Color',selectSize:'Select Size',selectColor:'Select Color',
deleteUser:'Delete User',userDeleted:'User deleted',cannotDeleteAdmin:'Cannot delete admin',
phoneMustBe11:'Phone must be exactly 11 digits',
orderInfo:'Order Info',paymentMethod:'Payment Method',cashOnDelivery:'Cash on Delivery',
confirmOrder:'Confirm Order',orderNumber:'Order Number',
backToSite:'Back to Site',adminPanel:'Admin Panel',
uploadImage:'Upload Image',uploadMainImage:'Upload Main Image',uploadGalleryImages:'Upload Gallery Images',dragDropHere:'Drag images here or click to select',uploading:'Uploading...',uploadSuccess:'Image uploaded',uploadError:'Upload failed',maxFileSize:'Max 5MB',orEnterUrl:'Or enter URL',
wishlist:'Wishlist',addToWishlist:'Add to Wishlist',removeFromWishlist:'Remove from Wishlist',emptyWishlist:'Wishlist is empty',
variantStock:'Variant Stock',stockPerVariant:'Stock per Color/Size',
freeShipping:'Free Shipping',fastDelivery:'Fast Delivery',fastDeliveryDesc:'Delivery within 2-5 business days',
loginRequired:'Please login first',
manageCategories:'Manage Categories',
filterByCategory:'Filter by Category',filterByStatus:'Filter by Status',filterByStock:'Filter by Stock',searchByName:'Search by name...',searchOrders:'Search by name or number...',allStatuses:'All Statuses',allStock:'All Products',lowStockOnly:'Low Stock',outOfStockOnly:'Out of Stock',inStockOnly:'In Stock Only',sortBy:'Sort By',sortNewest:'Newest',sortOldest:'Oldest',sortPriceHigh:'Price: High',sortPriceLow:'Price: Low',sortNameAZ:'Name: A-Z',priceRange:'Price Range',priceFrom:'From',priceTo:'To',applyFilter:'Apply',resetFilter:'Reset',shareProduct:'Share Product',addItemToOrder:'Add Item to Order',removeItemFromOrder:'Remove from Order',selectProduct:'Select Product',itemAdded:'Item added to order',itemRemoved:'Item removed from order',confirmRemoveItem:'Are you sure you want to remove this item from the order?',shareVia:'Share via',copyLink:'Copy Link',linkCopied:'Link Copied',
coupons:'Coupons',manageCoupons:'Manage Coupons',addCoupon:'Add Coupon',editCoupon:'Edit Coupon',couponCode:'Coupon Code',couponDiscount:'Discount Value',couponType:'Discount Type',percentage:'Percentage',fixedAmount:'Fixed Amount',minOrder:'Min Order',maxUses:'Max Uses',usedCount:'Used Count',expiresAt:'Expires At',unlimited:'Unlimited',active:'Active',inactive:'Inactive',couponAdded:'Coupon added',couponUpdated:'Coupon updated',couponDeleted:'Coupon deleted',applyCoupon:'Apply',couponApplied:'Coupon applied',invalidCoupon:'Invalid coupon code',couponExpired:'Coupon expired',couponMaxed:'Coupon usage limit reached',couponInactive:'Coupon is inactive',minOrderNotMet:'Order below minimum',discountApplied:'Discount applied',noCoupons:'No coupons',enterCoupon:'Enter coupon code',removeCoupon:'Remove coupon',
}};

const t=k=>T[Store.lang][k]||k;
const getTitle=p=>Store.lang==='ar'?(p.title_ar||p.title_en):(p.title_en||p.title_ar);
const getDesc=p=>Store.lang==='ar'?(p.description_ar||p.description_en):(p.description_en||p.description_ar);
const getDetails=p=>Store.lang==='ar'?(p.details_ar||p.details_en):(p.details_en||p.details_ar);
const getCatName=c=>Store.lang==='ar'?(c.name_ar||c.name_en):(c.name_en||c.name_ar);
const formatPrice=p=>`${Number(p).toLocaleString()} ${t('currency')}`;
const arrow=()=>Store.lang==='ar'?'left':'right';
const chevron=()=>Store.lang==='ar'?'left':'right';

// API
const API={
  h(){const h={'Content-Type':'application/json'};if(Store.token)h['Authorization']=`Bearer ${Store.token}`;return h},
  async get(u){try{const r=await fetch(u,{headers:this.h()});const d=await r.json();if(!r.ok&&d.error)console.warn('API:',d.error);return d}catch(e){console.error('API get error:',e);return{error:e.message}}},
  async post(u,b){const r=await fetch(u,{method:'POST',headers:this.h(),body:JSON.stringify(b)});return{data:await r.json(),ok:r.ok}},
  async put(u,b){const r=await fetch(u,{method:'PUT',headers:this.h(),body:JSON.stringify(b)});return{data:await r.json(),ok:r.ok}},
  async del(u){const r=await fetch(u,{method:'DELETE',headers:this.h()});return{data:await r.json(),ok:r.ok}}
};

// ==================== IMAGE UPLOAD HELPER ====================
function compressImage(file, maxWidth=800, quality=0.7){
  return new Promise((resolve,reject)=>{
    if(!file.type.startsWith('image/')){reject(new Error('Not an image'));return}
    if(file.size>10*1024*1024){reject(new Error('File too large'));return}
    const img=new Image();const url=URL.createObjectURL(file);
    img.onload=()=>{URL.revokeObjectURL(url);let w=img.width,h=img.height;
      if(w>maxWidth){h=Math.round(h*(maxWidth/w));w=maxWidth}
      const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
      const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,w,h);
      let result=canvas.toDataURL('image/jpeg',quality);let attempts=0;
      while(result.length>900000&&attempts<5){quality-=0.1;if(quality<0.2)quality=0.2;
        if(attempts>=3){w=Math.round(w*0.75);h=Math.round(h*0.75);canvas.width=w;canvas.height=h;ctx.drawImage(img,0,0,w,h)}
        result=canvas.toDataURL('image/jpeg',quality);attempts++}
      resolve(result)};
    img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('Failed'))};img.src=url})
}
async function uploadImageFile(file){
  try{const base64=await compressImage(file);const{ok,data}=await API.post('/api/upload',{image:base64});
    if(ok&&data.url)return data.url;throw new Error(data.error||'Upload failed')}
  catch(e){showToast(e.message||t('uploadError'),'error');return null}
}
async function handleFileUpload(input,targetId,isGallery=false){
  const files=input.files;if(!files||!files.length)return;
  let uploadZone=null;if(input.closest){uploadZone=input.closest('.upload-zone')}
  const btn=uploadZone?.querySelector('.upload-status');
  for(let i=0;i<files.length;i++){
    const file=files[i];if(!file.type.startsWith('image/')){showToast('Only images allowed','error');continue}
    if(btn)btn.innerHTML=`<div class="loading-spinner" style="width:16px;height:16px;display:inline-block;vertical-align:middle;margin-inline-end:6px"></div> ${t('uploading')} (${i+1}/${files.length})`;
    const url=await uploadImageFile(file);
    if(url){if(isGallery){galleryUrls.push(url);renderGalleryPreview()}else{const target=document.getElementById(targetId);if(target)target.value=url;previewMainImg()}showToast(t('uploadSuccess'))}
    if(btn)btn.textContent=''}
  try{input.value=''}catch(e){}
}

// TOAST
function showToast(msg,type='success'){
  let c=document.querySelector('.toast-container');
  if(!c){c=document.createElement('div');c.className='toast-container';document.body.appendChild(c)}
  const ic=type==='success'?'fa-check-circle':type==='error'?'fa-times-circle':'fa-exclamation-triangle';
  const el=document.createElement('div');el.className=`toast ${type}`;
  el.innerHTML=`<i class="fas ${ic}"></i><span>${msg}</span>`;c.appendChild(el);
  setTimeout(()=>{el.classList.add('hiding');setTimeout(()=>el.remove(),300)},3000)}

// ROUTER
const Router={routes:{},current:'',
  register(p,h){this.routes[p]=h},
  navigate(p){history.pushState(null,'',p);this.resolve()},
  resolve(){const path=location.pathname;this.current=path;
    for(const[pattern,handler]of Object.entries(this.routes)){
      const regex=new RegExp('^'+pattern.replace(/:\w+/g,'([^/]+)')+'$');
      const match=path.match(regex);if(match){handler(...match.slice(1));return}}
    renderPage(render404())}
};
document.addEventListener('click',e=>{const l=e.target.closest('a[href]');if(l&&l.getAttribute('href')?.startsWith('/')&&!l.getAttribute('target')){e.preventDefault();Router.navigate(l.getAttribute('href'))}});
window.addEventListener('popstate',()=>Router.resolve());
function isAdminRoute(){return Router.current.startsWith('/admin')}

// RENDER
function renderPage(html){
  const app=document.getElementById('app');
  if(isAdminRoute()&&Store.isAdmin()){app.innerHTML=renderAdminLayout(html);bindAdminEvents()}
  else{app.innerHTML=renderPrayerBanner()+renderHeader()+`<main class="page-transition">${html}</main>`+renderFooter()}
  bindGlobalEvents();initScrollAnimations();window.scrollTo({top:0,behavior:'smooth'})}

function renderPrayerBanner(){return`<div class="prayer-banner"><div class="prayer-text"><i class="fas fa-mosque"></i><span>${t('prayer')}</span><i class="fas fa-star sparkle-icon"></i></div></div>`}

// HEADER
function renderHeader(){
  const isA=Store.isAdmin(),isL=Store.isLoggedIn(),cc=Store.cart.length,wc=Store.wishlist.length;
  return`<header class="main-header" id="mainHeader"><div class="header-inner">
    <a href="/" class="logo-link"><img src="${LOGO}" alt="يقين"><span class="logo-text">يقين</span></a>
    <nav class="nav-links" id="navLinks">
      <a href="/" class="nav-link ${Router.current==='/'?'active':''}">${t('home')}</a>
      <a href="/shop" class="nav-link ${Router.current==='/shop'?'active':''}">${t('shop')}</a>
      <a href="/categories" class="nav-link ${Router.current==='/categories'?'active':''}">${t('categories')}</a>
      <a href="/about" class="nav-link ${Router.current==='/about'?'active':''}">${t('about')}</a>
      ${isA?`<a href="/admin" class="nav-link admin-nav-link ${Router.current.startsWith('/admin')?'active':''}"><i class="fas fa-shield-halved"></i> ${t('admin')}</a>`:''}
    </nav>
    <div class="header-actions">
      <button class="icon-btn" onclick="toggleTheme()" title="${Store.theme==='dark'?t('lightMode'):t('darkMode')}"><i class="fas ${Store.theme==='dark'?'fa-sun':'fa-moon'}"></i></button>
      <button class="icon-btn" onclick="toggleLang()" title="${t('language')}"><span style="font-size:.7rem;font-weight:700">${Store.lang==='ar'?'EN':'عر'}</span></button>
      ${isL?`
        <a href="/wishlist" class="icon-btn" style="text-decoration:none" title="${t('wishlist')}"><i class="fas fa-heart"></i>${wc>0?`<span class="cart-badge wish-badge">${wc}</span>`:''}</a>
        <a href="/cart" class="icon-btn" style="text-decoration:none"><i class="fas fa-shopping-cart"></i>${cc>0?`<span class="cart-badge">${cc}</span>`:''}</a>
        <a href="/profile" class="icon-btn" style="text-decoration:none" title="${t('profile')}"><i class="fas fa-user-circle"></i></a>`
       :`<a href="/signin" class="btn-primary btn-sm" style="text-decoration:none"><i class="fas fa-sign-in-alt"></i> <span class="auth-text">${t('signin')}</span></a>`}
      <button class="mobile-menu-btn icon-btn" onclick="toggleMobileMenu()"><i class="fas fa-bars"></i></button>
    </div></div></header>`}

// ADMIN LAYOUT
function renderAdminLayout(content){
  const currentPath=Router.current;
  const menuItems=[
    {path:'/admin',icon:'fa-chart-line',label:t('dashboard')},
    {path:'/admin/products',icon:'fa-boxes-stacked',label:t('manageProducts')},
    {path:'/admin/add-product',icon:'fa-plus-circle',label:t('addProduct')},
    {path:'/admin/orders',icon:'fa-clipboard-list',label:t('manageOrders')},
    {path:'/admin/coupons',icon:'fa-ticket',label:t('manageCoupons')},
    {path:'/admin/users',icon:'fa-users',label:t('manageUsers')},
  ];
  return`<div class="admin-layout">
    <aside class="admin-sidebar" id="adminSidebar">
      <div class="admin-sidebar-header">
        <a href="/" class="admin-sidebar-logo"><img src="${LOGO}" alt="يقين"><span>يقين</span></a>
        <button class="admin-sidebar-close" onclick="toggleAdminSidebar()"><i class="fas fa-times"></i></button>
      </div>
      <nav class="admin-sidebar-nav">
        ${menuItems.map(m=>`<a href="${m.path}" class="admin-sidebar-link ${currentPath===m.path||(m.path!=='/admin'&&currentPath.startsWith(m.path))?'active':''}"><i class="fas ${m.icon}"></i><span>${m.label}</span></a>`).join('')}
      </nav>
      <div class="admin-sidebar-footer">
        <a href="/" class="admin-sidebar-link back-link"><i class="fas fa-arrow-${arrow()}"></i><span>${t('backToSite')}</span></a>
        <div class="admin-sidebar-user"><div class="admin-sidebar-avatar"><i class="fas fa-user-shield"></i></div><div><strong>${Store.user?.name||'Admin'}</strong><small>${Store.user?.email||''}</small></div></div>
      </div>
    </aside>
    <div class="admin-main">
      <header class="admin-topbar">
        <button class="admin-menu-toggle" onclick="toggleAdminSidebar()"><i class="fas fa-bars"></i></button>
        <h1 class="admin-topbar-title"><i class="fas fa-shield-halved"></i> ${t('adminPanel')}</h1>
        <div class="admin-topbar-actions">
          <button class="icon-btn" onclick="toggleTheme()"><i class="fas ${Store.theme==='dark'?'fa-sun':'fa-moon'}"></i></button>
          <button class="icon-btn" onclick="toggleLang()"><span style="font-size:.7rem;font-weight:700">${Store.lang==='ar'?'EN':'عر'}</span></button>
          <a href="/" class="btn-secondary btn-sm" style="text-decoration:none"><i class="fas fa-store"></i> <span class="hide-mobile">${t('backToSite')}</span></a>
        </div>
      </header>
      <main class="admin-content page-transition">${content}</main>
    </div></div>`}

function toggleAdminSidebar(){document.getElementById('adminSidebar')?.classList.toggle('open')}
function bindAdminEvents(){document.querySelectorAll('.admin-sidebar-link').forEach(l=>{l.addEventListener('click',()=>{if(window.innerWidth<=1024)document.getElementById('adminSidebar')?.classList.remove('open')})})}

// FOOTER
function renderFooter(){
  return`<footer class="main-footer"><div class="footer-inner">
    <div class="footer-main">
      <div class="footer-brand"><img src="${LOGO}" alt="يقين"><span>يقين | Yaqeen</span></div>
      <div class="footer-social">
        <a href="${FB_LINK}" target="_blank" class="social-link fb" title="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="${TT_LINK}" target="_blank" class="social-link tt" title="TikTok"><i class="fab fa-tiktok"></i></a>
        <a href="https://wa.me/${WA_PHONE}" target="_blank" class="social-link wa" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
      </div>
      <div class="footer-contact-info">
        <a href="tel:${PHONE}" class="footer-phone"><i class="fas fa-phone"></i><span>${PHONE}</span></a>
        <a href="mailto:${CONTACT_EMAIL}" class="footer-email-link"><i class="fas fa-envelope"></i><span>${CONTACT_EMAIL}</span></a>
      </div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 يقين | Yaqeen - ${t('rightsReserved')}</p></div>
  </div></footer>`}

function bindGlobalEvents(){const h=document.getElementById('mainHeader');if(h){const fn=()=>{h.classList.toggle('scrolled',window.scrollY>50)};window.removeEventListener('scroll',fn);window.addEventListener('scroll',fn);fn()}}
function toggleMobileMenu(){document.getElementById('navLinks')?.classList.toggle('open')}
function toggleTheme(){Store.setTheme(Store.theme==='dark'?'light':'dark');Router.resolve()}
function toggleLang(){Store.setLang(Store.lang==='ar'?'en':'ar');Router.resolve()}
function handleSignout(){Store.setUser(null,null);Store.cart=[];Router.navigate('/')}
function initScrollAnimations(){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});document.querySelectorAll('.animate-on-scroll').forEach(el=>obs.observe(el))}

// ==================== HOME ====================
async function loadHomePage(){
  renderPage(`
    <section class="hero"><div class="hero-bg"></div><div class="hero-overlay"></div>
    <div class="hero-particles">${Array(8).fill(0).map((_,i)=>`<div class="hero-particle" style="top:${10+Math.random()*80}%;left:${5+Math.random()*90}%;animation-delay:${i*.5}s;animation-duration:${3+Math.random()*3}s;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px"></div>`).join('')}</div>
    <div class="hero-decoration d1"></div><div class="hero-decoration d2"></div>
    <div class="hero-content"><div class="hero-grid"><div>
      <div class="hero-badge"><i class="fas fa-bolt"></i> ${t('newArrivals')}</div>
      <h1 class="hero-title">${t('heroTitle')}<br><span class="highlight">${t('heroHighlight')}</span></h1>
      <p class="hero-desc">${t('heroDesc')}</p>
      <div class="hero-buttons"><a href="/shop" class="btn-primary" style="text-decoration:none;font-size:1rem;padding:.7rem 1.8rem"><i class="fas fa-shopping-bag"></i> ${t('shopNow')}</a><a href="/about" class="btn-secondary" style="text-decoration:none;font-size:.95rem;padding:.7rem 1.5rem"><i class="fas fa-info-circle"></i> ${t('learnMore')}</a></div>
    </div><div class="hero-visual"><div class="hero-logo-container"><img src="${LOGO}" alt="Yaqeen"></div></div></div></div></section>
    <section class="section"><div class="features-grid">
      <div class="feature-card animate-on-scroll"><div class="feature-icon"><i class="fas fa-shield-alt"></i></div><h3>${t('securePayment')}</h3><p>${t('securePaymentDesc')}</p></div>
      <div class="feature-card animate-on-scroll"><div class="feature-icon"><i class="fas fa-headset"></i></div><h3>${t('support247')}</h3><p>${t('support247Desc')}</p></div>
      <div class="feature-card animate-on-scroll"><div class="feature-icon"><i class="fas fa-certificate"></i></div><h3>${t('qualityGuarantee')}</h3><p>${t('qualityGuaranteeDesc')}</p></div>
    </div></section>
    <section class="section"><div class="section-header"><h2 class="section-title">${t('featuredProducts')}</h2><p class="section-subtitle">${t('recommended')}</p></div>
    <div class="products-grid" id="featuredProducts">${skeletons(4)}</div>
    <div style="text-align:center;margin-top:2rem"><a href="/shop" class="btn-primary" style="text-decoration:none;font-size:.95rem;padding:.6rem 2rem"><i class="fas fa-th"></i> ${t('allProducts')}</a></div></section>
    <section class="section"><div class="section-header"><h2 class="section-title">${t('categories')}</h2></div><div class="categories-scroll" id="homeCats">${skeletons(6,'skeleton-card','height:100px;min-width:130px;flex-shrink:0')}</div></section>
  `);
  const[_prods,_cats]=await Promise.all([API.get('/api/products?featured=1'),API.get('/api/categories')]);
  const products=Array.isArray(_prods)?_prods:[];const cats=Array.isArray(_cats)?_cats:[];
  Store.products=products;Store.categories=cats;
  // Shuffle featured products randomly
  const shuffled=[...products].sort(()=>Math.random()-0.5);
  const g=document.getElementById('featuredProducts');
  if(g)g.innerHTML=shuffled.length?shuffled.slice(0,8).map((p,i)=>productCard(p,i)).join(''):`<p style="text-align:center;grid-column:1/-1">${t('noProducts')}</p>`;
  const cs=document.getElementById('homeCats');
  if(cs)cs.innerHTML=cats.map(c=>`<a href="/shop?category=${encodeURIComponent(c.name_en)}" class="category-card" style="text-decoration:none"><i class="fas ${c.icon||'fa-tag'}"></i><span>${getCatName(c)}</span></a>`).join('');
  initScrollAnimations()}
function skeletons(n,c='skeleton-card',s=''){return Array(n).fill(0).map(()=>`<div class="skeleton ${c}" style="${s}"></div>`).join('')}

// ==================== PRODUCT CARD ====================
function productCard(p,i=0){
  const disc=p.old_price?Math.round((1-p.price/p.old_price)*100):0;
  const wished=Store.isWished(p.id);
  return`<div class="product-card animate-on-scroll" style="animation-delay:${i*.06}s"><a href="/product/${p.id}" class="product-img-wrapper">
    ${disc>0?`<span class="product-badge">-${disc}%</span>`:''}
    <button class="wish-btn ${wished?'wished':''}" onclick="event.preventDefault();event.stopPropagation();toggleWishProd('${p.id}',this)" title="${t('wishlist')}"><i class="fas fa-heart"></i></button>
    <img src="${p.product_img||'/static/images/1.png'}" alt="${getTitle(p)}" loading="lazy" onerror="this.src='/static/images/1.png'">
    <div class="product-quick-actions"><button class="quick-action-btn" onclick="event.preventDefault();event.stopPropagation();addToCartQ('${p.id}')"><i class="fas fa-cart-plus"></i></button><a href="/product/${p.id}" class="quick-action-btn"><i class="fas fa-eye"></i></a></div>
  </a><div class="product-info"><div class="product-category">${p.category||''}</div><h3 class="product-title">${getTitle(p)}</h3><p class="product-desc">${getDesc(p)}</p>
  <div class="product-footer"><div><span class="product-price">${formatPrice(p.price)}</span>${p.old_price?`<span class="product-old-price">${formatPrice(p.old_price)}</span>`:''}</div>
  <button class="add-to-cart-btn" onclick="addToCartQ('${p.id}')"><i class="fas fa-plus"></i></button></div></div></div>`}

function toggleWishProd(id,btn){Store.toggleWish(id);if(btn){btn.classList.toggle('wished');showToast(Store.isWished(id)?t('addToWishlist'):t('removeFromWishlist'))}}
async function addToCartQ(id){if(!Store.isLoggedIn()){showToast(t('loginRequired'),'warning');Router.navigate('/signin');return}
  const{ok}=await API.post('/api/cart',{product_id:id,quantity:1});if(ok){showToast(t('addedToCart'));await loadCartData();Router.resolve()}}
async function loadCartData(){if(!Store.isLoggedIn())return;const _c=await API.get('/api/cart');Store.cart=Array.isArray(_c)?_c:[]}

// ==================== SHOP ====================
async function loadShopPage(){
  const up=new URLSearchParams(location.search),cat=up.get('category')||'',srch=up.get('search')||'',sort=up.get('sort')||'',pmin=up.get('min')||'',pmax=up.get('max')||'';
  if(!Store.categories.length){const _c=await API.get('/api/categories');Store.categories=Array.isArray(_c)?_c:[]}
  renderPage(`<section class="section"><div class="section-header"><h2 class="section-title">${t('allProducts')}</h2></div>
    <div class="shop-filter-bar">
      <div class="shop-search-wrap"><i class="fas fa-search"></i>
      <input type="text" class="form-input" id="shopSearch" placeholder="${t('searchProducts')}" value="${srch}" onkeyup="if(event.key==='Enter')doShopFilter()"></div>
      <select class="form-input shop-filter-select" id="shopCat" onchange="doShopFilter()"><option value="">${t('allCategories')}</option>
      ${Store.categories.map(c=>`<option value="${c.name_en}" ${cat===c.name_en?'selected':''}>${getCatName(c)}</option>`).join('')}</select>
      <select class="form-input shop-filter-select" id="shopSort" onchange="doShopFilter()"><option value="">${t('sortBy')}</option><option value="newest" ${sort==='newest'?'selected':''}>${t('sortNewest')}</option><option value="oldest" ${sort==='oldest'?'selected':''}>${t('sortOldest')}</option><option value="price_high" ${sort==='price_high'?'selected':''}>${t('sortPriceHigh')}</option><option value="price_low" ${sort==='price_low'?'selected':''}>${t('sortPriceLow')}</option></select>
      <div class="price-range-wrap">
        <span class="price-range-label"><i class="fas fa-wallet"></i> ${t('priceRange')}</span>
        <input type="number" class="form-input price-input" id="shopMinPrice" placeholder="${t('priceFrom')}" value="${pmin}" min="0" onkeyup="if(event.key==='Enter')doShopFilter()">
        <span class="price-range-sep">—</span>
        <input type="number" class="form-input price-input" id="shopMaxPrice" placeholder="${t('priceTo')}" value="${pmax}" min="0" onkeyup="if(event.key==='Enter')doShopFilter()">
        <button class="btn-primary btn-sm price-go-btn" onclick="doShopFilter()"><i class="fas fa-filter"></i></button>
      </div>
    </div><div class="products-grid" id="shopProducts">${skeletons(8)}</div></section>`);
  let url='/api/products?';if(cat)url+=`category=${encodeURIComponent(cat)}&`;if(srch)url+=`search=${encodeURIComponent(srch)}&`;
  const _sp=await API.get(url);let products=Array.isArray(_sp)?_sp:[];
  if(pmin)products=products.filter(p=>p.price>=Number(pmin));
  if(pmax)products=products.filter(p=>p.price<=Number(pmax));
  if(sort==='price_high')products.sort((a,b)=>b.price-a.price);
  else if(sort==='price_low')products.sort((a,b)=>a.price-b.price);
  else if(sort==='oldest')products.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
  Store.products=products;
  const g=document.getElementById('shopProducts');
  if(g)g.innerHTML=products.length?products.map((p,i)=>productCard(p,i)).join(''):`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-search"></i><h3>${t('noProducts')}</h3></div>`;
  initScrollAnimations()}
function doShopFilter(){const s=document.getElementById('shopSearch')?.value||'',c=document.getElementById('shopCat')?.value||'',sort=document.getElementById('shopSort')?.value||'',mn=document.getElementById('shopMinPrice')?.value||'',mx=document.getElementById('shopMaxPrice')?.value||'';
  let u='/shop?';if(s)u+=`search=${s}&`;if(c)u+=`category=${c}&`;if(sort)u+=`sort=${sort}&`;if(mn)u+=`min=${mn}&`;if(mx)u+=`max=${mx}&`;Router.navigate(u)}

// ==================== WISHLIST ====================
async function loadWishlistPage(){
  if(!Store.wishlist.length){renderPage(`<div class="cart-page"><div class="section-header"><h2 class="section-title">${t('wishlist')}</h2></div><div class="empty-state"><i class="fas fa-heart"></i><h3>${t('emptyWishlist')}</h3><a href="/shop" class="btn-primary" style="text-decoration:none;margin-top:1rem"><i class="fas fa-shopping-bag"></i> ${t('shopNow')}</a></div></div>`);return}
  const _ap=await API.get('/api/products');const all=Array.isArray(_ap)?_ap:[];
  const wished=all.filter(p=>Store.isWished(p.id));
  renderPage(`<section class="section"><div class="section-header"><h2 class="section-title"><i class="fas fa-heart" style="color:var(--error);margin-inline-end:.5rem"></i>${t('wishlist')} (${wished.length})</h2></div>
  <div class="products-grid">${wished.length?wished.map((p,i)=>productCard(p,i)).join(''):`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-heart"></i><h3>${t('emptyWishlist')}</h3></div>`}</div></section>`);
  initScrollAnimations()}

// ==================== PRODUCT DETAILS ====================
async function loadProductDetails(id){
  renderPage(`<div class="section" style="text-align:center;padding:3rem"><div class="loading-spinner" style="margin:0 auto"></div></div>`);
  const p=await API.get(`/api/products/${id}`);if(p.error){renderPage(render404());return}
  let specs=[];try{specs=JSON.parse(p.specifications||'[]')}catch(e){}
  let gallery=[];try{gallery=JSON.parse(p.gallery||'[]')}catch(e){}
  let sizes=[];try{sizes=JSON.parse(p.sizes||'[]')}catch(e){}
  let colors=[];try{colors=JSON.parse(p.colors||'[]')}catch(e){}
  const disc=p.old_price?Math.round((1-p.price/p.old_price)*100):0;
  const det=getDetails(p),detList=det?det.split(' - ').filter(Boolean):[];
  const allImages=[p.product_img,...gallery].filter(Boolean);
  window._detailAllImages=allImages;window._detailProduct=p;
  const hasSizes=p.enable_sizes&&sizes.length>0;
  const hasColors=p.enable_colors&&colors.length>0;
  // Get stock for selected variant
  const variants=p.variants||[];
  
  renderPage(`<div class="product-details-page"><div class="product-detail-grid">
    <div class="detail-gallery animate-fadeInLeft">
      <div class="detail-main-img" onclick="openLightbox(_detailAllImages,_detailAllImages.indexOf(document.getElementById('mainProductImg')?.src)||0)" style="cursor:zoom-in"><img id="mainProductImg" src="${p.product_img||'/static/images/1.png'}" alt="${getTitle(p)}" onerror="this.src='/static/images/1.png'"><div class="zoom-hint"><i class="fas fa-search-plus"></i></div></div>
      ${allImages.length>1?`<div class="detail-thumbs">${allImages.map((img,idx)=>`<img src="${img}" class="detail-thumb ${idx===0?'active':''}" onclick="switchMainImg('${img}',this);event.stopPropagation()" onerror="this.style.display='none'">`).join('')}</div>`:''}
    </div>
    <div class="detail-info animate-fadeInRight">
      <div class="detail-breadcrumb"><a href="/">${t('home')}</a><i class="fas fa-chevron-${chevron()}" style="font-size:.65rem"></i><a href="/shop">${t('shop')}</a><i class="fas fa-chevron-${chevron()}" style="font-size:.65rem"></i><span style="color:var(--accent)">${getTitle(p)}</span></div>
      <h1 class="detail-title">${getTitle(p)}</h1>
      ${p.sku?`<p class="detail-sku"><i class="fas fa-barcode"></i>SKU: ${p.sku}</p>`:''}
      ${p.brand?`<p class="detail-sku"><i class="fas fa-tag"></i>${t('productBrand')}: ${p.brand}</p>`:''}
      <div class="detail-price-row"><span class="detail-price">${formatPrice(p.price)}</span>${p.old_price?`<span class="detail-old-price">${formatPrice(p.old_price)}</span>`:''} ${disc>0?`<span class="detail-discount">-${disc}%</span>`:''}</div>
      <p class="detail-desc">${getDesc(p)}</p>
      ${detList.length?`<div class="detail-section-title"><i class="fas fa-list-ul" style="color:var(--accent)"></i>${t('details')}</div><ul style="list-style:none;margin-bottom:1.2rem">${detList.map(d=>`<li style="padding:.35rem 0;font-size:.85rem;color:var(--text-secondary);display:flex;gap:.4rem;align-items:baseline"><i class="fas fa-check-circle" style="color:var(--accent);font-size:.7rem;flex-shrink:0"></i>${d}</li>`).join('')}</ul>`:''}
      ${specs.length?`<div class="detail-section-title"><i class="fas fa-cogs" style="color:var(--accent)"></i>${t('specifications')}</div><div class="specs-table">${specs.map(s=>`<div class="specs-row"><div class="specs-key">${Store.lang==='ar'?(s.key_ar||s.key_en):(s.key_en||s.key_ar)}</div><div class="specs-value">${Store.lang==='ar'?(s.value_ar||s.value_en):(s.value_en||s.value_ar)}</div></div>`).join('')}</div>`:''}
      
      ${hasSizes?`<div class="detail-section-title"><i class="fas fa-ruler" style="color:var(--accent)"></i>${t('sizes')}</div>
      <div class="size-color-selector" id="sizeSelector">${sizes.map((s,i)=>`<button class="sc-option size-opt ${i===0?'selected':''}" onclick="selectOption(this,'size');updateStockDisplay()" data-value="${s}">${s}</button>`).join('')}</div>`:''}
      
      ${hasColors?`<div class="detail-section-title"><i class="fas fa-palette" style="color:var(--accent)"></i>${t('colors')}</div>
      <div class="size-color-selector" id="colorSelector">${colors.map((c,i)=>`<button class="sc-option color-opt ${i===0?'selected':''}" onclick="selectOption(this,'color');updateStockDisplay()" data-value="${c.name||c}" style="--swatch:${c.hex||'var(--accent)'}"><span class="color-swatch" style="background:${c.hex||'var(--accent)'}"></span><span>${c.name||c}</span></button>`).join('')}</div>`:''}
      
      <div class="stock-info ${p.stock>0?'in-stock':'out-of-stock'}" id="stockDisplay"><i class="fas ${p.stock>0?'fa-check-circle':'fa-times-circle'}"></i><span id="stockText">${p.stock>0?`${t('inStock')} (${p.stock})`:t('outOfStock')}</span></div>
      <div class="detail-actions"><div class="quantity-control"><button class="quantity-btn" onclick="chgQty(-1)">-</button><input type="number" class="quantity-value" id="detQty" value="1" min="1" max="${p.stock||99}" readonly><button class="quantity-btn" onclick="chgQty(1)">+</button></div>
      <button class="btn-primary" onclick="addFromDetail('${p.id}',${hasSizes?1:0},${hasColors?1:0})" ${p.stock<=0?'disabled style="opacity:.5"':''}><i class="fas fa-cart-plus"></i> ${t('addToCart')}</button>
      <button class="icon-btn wish-detail-btn ${Store.isWished(p.id)?'wished':''}" onclick="toggleWishProd('${p.id}',this)" title="${t('wishlist')}"><i class="fas fa-heart"></i></button>
      <button class="icon-btn share-detail-btn" onclick="shareProduct('${p.id}','${getTitle(p).replace(/'/g,"\\'")}','${p.product_img||''}')" title="${t('shareProduct')}"><i class="fas fa-share-alt"></i></button></div>
      ${Store.isAdmin()?`<div style="margin-top:1.5rem;display:flex;gap:.8rem;flex-wrap:wrap"><a href="/admin/edit-product/${p.id}" class="btn-secondary" style="text-decoration:none"><i class="fas fa-edit"></i> ${t('editProduct')}</a><button class="btn-danger" onclick="delProdDetail('${p.id}')"><i class="fas fa-trash"></i> ${t('deleteProduct')}</button></div>`:''}</div></div></div>`)}

function updateStockDisplay(){
  const p=window._detailProduct;if(!p)return;
  const selSize=document.querySelector('#sizeSelector .sc-option.selected')?.dataset.value||'';
  const selColor=document.querySelector('#colorSelector .sc-option.selected')?.dataset.value||'';
  const variants=p.variants||[];
  const v=variants.find(v=>{
    const sM=!selSize||v.size===selSize;const cM=!selColor||v.color_name===selColor;return sM&&cM});
  const stock=v?v.stock:p.stock;
  const el=document.getElementById('stockDisplay');const txt=document.getElementById('stockText');
  if(el&&txt){el.className=`stock-info ${stock>0?'in-stock':'out-of-stock'}`;
    el.querySelector('i').className=`fas ${stock>0?'fa-check-circle':'fa-times-circle'}`;
    txt.textContent=stock>0?`${t('inStock')} (${stock})`:t('outOfStock')}}

function selectOption(btn,type){btn.closest('.size-color-selector').querySelectorAll('.sc-option').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected')}
function switchMainImg(src,thumb){const main=document.getElementById('mainProductImg');if(main)main.src=src;document.querySelectorAll('.detail-thumb').forEach(t=>t.classList.remove('active'));if(thumb)thumb.classList.add('active')}

// ==================== SHARE PRODUCT ====================
function shareProduct(id,title,img){
  const url=window.location.origin+'/product/'+id;
  const text=title+' - '+t('heroTitle');
  // Try native share first (mobile)
  if(navigator.share){
    navigator.share({title:title,text:text,url:url}).catch(()=>{});
    return}
  // Desktop: show share modal
  const m=document.createElement('div');m.className='modal-overlay';m.id='shareModal';
  m.onclick=e=>{if(e.target===m)m.remove()};
  m.innerHTML=`<div class="share-modal">
    <div class="share-modal-header"><h3><i class="fas fa-share-alt" style="color:var(--accent)"></i> ${t('shareVia')}</h3><button class="modal-close-btn" onclick="document.getElementById('shareModal').remove()"><i class="fas fa-times"></i></button></div>
    <div class="share-buttons">
      <a href="https://wa.me/?text=${encodeURIComponent(text+' '+url)}" target="_blank" class="share-btn share-whatsapp"><i class="fab fa-whatsapp"></i><span>WhatsApp</span></a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank" class="share-btn share-facebook"><i class="fab fa-facebook-f"></i><span>Facebook</span></a>
      <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}" target="_blank" class="share-btn share-twitter"><i class="fab fa-x-twitter"></i><span>X</span></a>
      <a href="https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}" target="_blank" class="share-btn share-telegram"><i class="fab fa-telegram-plane"></i><span>Telegram</span></a>
      <button class="share-btn share-copy" onclick="copyProductLink('${url}')"><i class="fas fa-link"></i><span>${t('copyLink')}</span></button>
    </div>
  </div>`;
  document.body.appendChild(m)}
function copyProductLink(url){
  navigator.clipboard.writeText(url).then(()=>{showToast(t('linkCopied'));document.getElementById('shareModal')?.remove()}).catch(()=>{
    const i=document.createElement('input');i.value=url;document.body.appendChild(i);i.select();document.execCommand('copy');document.body.removeChild(i);showToast(t('linkCopied'));document.getElementById('shareModal')?.remove()})}

// ==================== LIGHTBOX ====================
let lightboxImages=[],lightboxIndex=0;
function openLightbox(images,startIdx=0){
  lightboxImages=images;lightboxIndex=startIdx;
  let overlay=document.getElementById('imgLightbox');
  if(!overlay){
    overlay=document.createElement('div');overlay.id='imgLightbox';overlay.className='lightbox-overlay';
    overlay.innerHTML=`<button class="lightbox-close" onclick="closeLightbox()"><i class="fas fa-times"></i></button>
      <button class="lightbox-nav lightbox-prev" onclick="lightboxNav(-1)"><i class="fas fa-chevron-left"></i></button>
      <div class="lightbox-img-wrap"><img id="lightboxImg" src="" alt=""><div class="lightbox-counter" id="lightboxCounter"></div></div>
      <button class="lightbox-nav lightbox-next" onclick="lightboxNav(1)"><i class="fas fa-chevron-right"></i></button>
      <div class="lightbox-thumbs" id="lightboxThumbs"></div>`;
    overlay.addEventListener('click',e=>{if(e.target===overlay)closeLightbox()});
    document.body.appendChild(overlay);
    document.addEventListener('keydown',e=>{if(!document.getElementById('imgLightbox')?.classList.contains('open'))return;
      if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')lightboxNav(Store.lang==='ar'?1:-1);if(e.key==='ArrowRight')lightboxNav(Store.lang==='ar'?-1:1)});
   