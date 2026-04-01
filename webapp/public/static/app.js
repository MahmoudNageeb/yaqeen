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
  const g=document.getElementById('featuredProducts');
  if(g)g.innerHTML=products.length?products.slice(0,8).map((p,i)=>productCard(p,i)).join(''):`<p style="text-align:center;grid-column:1/-1">${t('noProducts')}</p>`;
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
  const up=new URLSearchParams(location.search),cat=up.get('category')||'',srch=up.get('search')||'';
  if(!Store.categories.length){const _c=await API.get('/api/categories');Store.categories=Array.isArray(_c)?_c:[]}
  renderPage(`<section class="section"><div class="section-header"><h2 class="section-title">${t('allProducts')}</h2></div>
    <div style="margin-bottom:1.2rem;display:flex;gap:.8rem;flex-wrap:wrap;align-items:center">
      <div style="flex:1;min-width:180px;position:relative"><i class="fas fa-search" style="position:absolute;top:50%;transform:translateY(-50%);${Store.lang==='ar'?'right':'left'}:12px;color:var(--text-secondary)"></i>
      <input type="text" class="form-input" id="shopSearch" placeholder="${t('searchProducts')}" value="${srch}" style="padding-${Store.lang==='ar'?'right':'left'}:2.4rem" onkeyup="if(event.key==='Enter')doShopFilter()"></div>
      <select class="form-input" id="shopCat" onchange="doShopFilter()" style="max-width:200px"><option value="">${t('allCategories')}</option>
      ${Store.categories.map(c=>`<option value="${c.name_en}" ${cat===c.name_en?'selected':''}>${getCatName(c)}</option>`).join('')}</select>
    </div><div class="products-grid" id="shopProducts">${skeletons(8)}</div></section>`);
  let url='/api/products?';if(cat)url+=`category=${encodeURIComponent(cat)}&`;if(srch)url+=`search=${encodeURIComponent(srch)}&`;
  const _sp=await API.get(url);const products=Array.isArray(_sp)?_sp:[];Store.products=products;
  const g=document.getElementById('shopProducts');
  if(g)g.innerHTML=products.length?products.map((p,i)=>productCard(p,i)).join(''):`<div class="empty-state" style="grid-column:1/-1"><i class="fas fa-search"></i><h3>${t('noProducts')}</h3></div>`;
  initScrollAnimations()}
function doShopFilter(){const s=document.getElementById('shopSearch')?.value||'',c=document.getElementById('shopCat')?.value||'';
  let u='/shop?';if(s)u+=`search=${s}&`;if(c)u+=`category=${c}&`;Router.navigate(u)}

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
      <button class="icon-btn wish-detail-btn ${Store.isWished(p.id)?'wished':''}" onclick="toggleWishProd('${p.id}',this)" title="${t('wishlist')}"><i class="fas fa-heart"></i></button></div>
      ${Store.isAdmin()?`<div style="margin-top:1.5rem;display:flex;gap:.8rem;flex-wrap:wrap"><a href="/admin/edit-product/${p.id}" class="btn-secondary" style="text-decoration:none"><i class="fas fa-edit"></i> ${t('editProduct')}</a><button class="btn-danger" onclick="delProdDetail('${p.id}')"><i class="fas fa-trash"></i> ${t('deleteProduct')}</button></div>`:''}</div></div>
    <div class="detail-mobile-bar" id="detailMobileBar">
      <span class="mobile-bar-price">${formatPrice(p.price)}</span>
      <button class="btn-primary" onclick="addFromDetail('${p.id}',${hasSizes?1:0},${hasColors?1:0})" ${p.stock<=0?'disabled style="opacity:.5"':''}><i class="fas fa-cart-plus"></i> ${t('addToCart')}</button>
    </div></div>`)}

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
    let touchStartX=0;
    overlay.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX},{passive:true});
    overlay.addEventListener('touchend',e=>{const diff=e.changedTouches[0].screenX-touchStartX;if(Math.abs(diff)>50)lightboxNav(diff>0?(Store.lang==='ar'?1:-1):(Store.lang==='ar'?-1:1))},{passive:true})}
  updateLightbox();overlay.classList.add('open');document.body.style.overflow='hidden'}
function closeLightbox(){document.getElementById('imgLightbox')?.classList.remove('open');document.body.style.overflow=''}
function lightboxNav(dir){lightboxIndex+=dir;if(lightboxIndex<0)lightboxIndex=lightboxImages.length-1;if(lightboxIndex>=lightboxImages.length)lightboxIndex=0;updateLightbox()}
function updateLightbox(){
  const img=document.getElementById('lightboxImg'),counter=document.getElementById('lightboxCounter'),thumbsC=document.getElementById('lightboxThumbs');
  if(img)img.src=lightboxImages[lightboxIndex];if(counter)counter.textContent=`${lightboxIndex+1} / ${lightboxImages.length}`;
  if(thumbsC&&lightboxImages.length>1)thumbsC.innerHTML=lightboxImages.map((src,i)=>`<img src="${src}" class="lightbox-thumb ${i===lightboxIndex?'active':''}" onclick="lightboxIndex=${i};updateLightbox()" onerror="this.style.display='none'">`).join('');
  else if(thumbsC)thumbsC.innerHTML='';
  const prev=document.querySelector('.lightbox-prev'),next=document.querySelector('.lightbox-next');
  if(prev)prev.style.display=lightboxImages.length>1?'':'none';if(next)next.style.display=lightboxImages.length>1?'':'none'}
function chgQty(d){const i=document.getElementById('detQty');if(!i)return;let v=+i.value+d;if(v<1)v=1;if(v>+i.max)v=+i.max;i.value=v}
async function addFromDetail(id,hasSizes,hasColors){
  if(!Store.isLoggedIn()){showToast(t('loginRequired'),'warning');Router.navigate('/signin');return}
  const q=+(document.getElementById('detQty')?.value||1);let selected_size='',selected_color='';
  if(hasSizes){selected_size=document.querySelector('#sizeSelector .sc-option.selected')?.dataset.value||''}
  if(hasColors){selected_color=document.querySelector('#colorSelector .sc-option.selected')?.dataset.value||''}
  const{ok}=await API.post('/api/cart',{product_id:id,quantity:q,selected_size,selected_color});
  if(ok){showToast(t('addedToCart'));await loadCartData()}}
async function delProdDetail(id){if(!confirm(t('confirmDelete')))return;const{ok}=await API.del(`/api/products/${id}`);if(ok){showToast(t('productDeleted'));Router.navigate('/shop')}}

// ==================== CART ====================
async function loadCartPage(){
  if(!Store.isLoggedIn()){Router.navigate('/signin');return}
  renderPage(`<div class="cart-page"><div class="loading-spinner" style="margin:2rem auto"></div></div>`);
  const _ci=await API.get('/api/cart');const items=Array.isArray(_ci)?_ci:[];Store.cart=items;
  if(!items.length){renderPage(`<div class="cart-page"><div class="section-header"><h2 class="section-title">${t('cart')}</h2></div><div class="empty-state"><i class="fas fa-shopping-cart"></i><h3>${t('emptyCart')}</h3><p>${t('emptyCartMsg')}</p><a href="/shop" class="btn-primary" style="text-decoration:none"><i class="fas fa-shopping-bag"></i> ${t('continueShopping')}</a></div></div>`);return}
  const total=items.reduce((s,i)=>s+i.price*i.quantity,0);
  renderPage(`<div class="cart-page"><div class="section-header"><h2 class="section-title">${t('cart')}</h2></div><div class="cart-grid"><div id="cartItems">
    ${items.map((it,idx)=>`<div class="cart-item" style="animation-delay:${idx*.08}s"><img src="${it.product_img||'/static/images/1.png'}" class="cart-item-img" onerror="this.src='/static/images/1.png'"><div class="cart-item-info"><h4 class="cart-item-title">${Store.lang==='ar'?it.title_ar:it.title_en}</h4><p class="cart-item-price">${formatPrice(it.price)}</p>
    ${it.selected_size?`<span class="cart-item-tag"><i class="fas fa-ruler"></i> ${it.selected_size}</span>`:''}
    ${it.selected_color?`<span class="cart-item-tag"><i class="fas fa-palette"></i> ${it.selected_color}</span>`:''}
    <div style="display:flex;align-items:center;gap:.4rem;margin-top:.4rem"><div class="quantity-control" style="transform:scale(.85);transform-origin:${Store.lang==='ar'?'right':'left'}"><button class="quantity-btn" onclick="updCartQty('${it.id}',${it.quantity-1})">-</button><input type="number" class="quantity-value" value="${it.quantity}" readonly><button class="quantity-btn" onclick="updCartQty('${it.id}',${it.quantity+1})">+</button></div>
    <button class="btn-danger btn-sm" onclick="rmCartItem('${it.id}')"><i class="fas fa-trash"></i></button></div></div>
    <div style="text-align:end;font-weight:700;color:var(--accent);white-space:nowrap;font-size:.95rem">${formatPrice(it.price*it.quantity)}</div></div>`).join('')}
  </div><div class="cart-summary"><h3><i class="fas fa-receipt" style="color:var(--accent);margin-inline-end:.4rem"></i>${t('orderSummary')}</h3><div class="summary-row"><span>${t('subtotal')}</span><span>${formatPrice(total)}</span></div>
  <div class="summary-total"><span>${t('total')}</span><span class="price">${formatPrice(total)}</span></div>
  <button class="btn-primary" style="width:100%;margin-top:1.2rem;justify-content:center" onclick="showCheckout()"><i class="fas fa-check-circle"></i> ${t('checkout')}</button>
  <a href="/shop" class="btn-secondary" style="width:100%;margin-top:.6rem;justify-content:center;text-decoration:none"><i class="fas fa-arrow-${arrow()}"></i> ${t('continueShopping')}</a></div></div></div>`)}
async function updCartQty(id,q){if(q<1){rmCartItem(id);return}await API.put(`/api/cart/${id}`,{quantity:q});loadCartPage()}
async function rmCartItem(id){await API.del(`/api/cart/${id}`);showToast(t('removedFromCart'));loadCartPage()}

// Egypt Governorates
const EGYPT_GOVERNORATES=[{ar:'القاهرة',en:'Cairo'},{ar:'الجيزة',en:'Giza'},{ar:'الإسكندرية',en:'Alexandria'},{ar:'الدقهلية',en:'Dakahlia'},{ar:'البحر الأحمر',en:'Red Sea'},{ar:'البحيرة',en:'Beheira'},{ar:'الفيوم',en:'Fayoum'},{ar:'الغربية',en:'Gharbia'},{ar:'الإسماعيلية',en:'Ismailia'},{ar:'المنوفية',en:'Menofia'},{ar:'المنيا',en:'Minya'},{ar:'القليوبية',en:'Qalyubia'},{ar:'الوادي الجديد',en:'New Valley'},{ar:'السويس',en:'Suez'},{ar:'أسوان',en:'Aswan'},{ar:'أسيوط',en:'Asyut'},{ar:'بني سويف',en:'Beni Suef'},{ar:'بورسعيد',en:'Port Said'},{ar:'دمياط',en:'Damietta'},{ar:'الشرقية',en:'Sharkia'},{ar:'جنوب سيناء',en:'South Sinai'},{ar:'كفر الشيخ',en:'Kafr El Sheikh'},{ar:'مطروح',en:'Matrouh'},{ar:'الأقصر',en:'Luxor'},{ar:'قنا',en:'Qena'},{ar:'شمال سيناء',en:'North Sinai'},{ar:'سوهاج',en:'Sohag'}];

// ==================== CHECKOUT ====================
function showCheckout(){
  const govOptions=EGYPT_GOVERNORATES.map(g=>`<option value="${g.en}">${Store.lang==='ar'?g.ar:g.en}</option>`).join('');
  const cartItems=Store.cart;const total=cartItems.reduce((s,i)=>s+i.price*i.quantity,0);
  const m=document.createElement('div');m.className='modal-overlay';m.onclick=e=>{if(e.target===m)m.remove()};
  m.innerHTML=`<div class="modal-content checkout-modal">
    <div class="checkout-header"><i class="fas fa-clipboard-check"></i><h2>${t('checkout')}</h2></div>
    <div class="checkout-section checkout-summary-section">
      <div class="checkout-section-title"><i class="fas fa-shopping-bag"></i><span>${t('orderSummary')}</span></div>
      <div class="checkout-items-list">${cartItems.map(it=>`<div class="checkout-item"><img src="${it.product_img||'/static/images/1.png'}" onerror="this.src='/static/images/1.png'"><div class="checkout-item-info"><span class="checkout-item-name">${Store.lang==='ar'?it.title_ar:it.title_en}</span>${it.selected_size?`<small><i class="fas fa-ruler"></i> ${it.selected_size}</small>`:''}${it.selected_color?`<small><i class="fas fa-palette"></i> ${it.selected_color}</small>`:''}<small>${t('quantity')}: ${it.quantity}</small></div><span class="checkout-item-price">${formatPrice(it.price*it.quantity)}</span></div>`).join('')}</div>
      <div class="checkout-total-row"><span>${t('total')}</span><span class="checkout-total-price">${formatPrice(total)}</span></div>
    </div>
    <div class="checkout-section"><div class="checkout-section-title"><i class="fas fa-user"></i><span>${t('personalInfo')}</span></div>
      <div class="checkout-form-grid">
        <div class="form-group"><label>${t('fullName')} *</label><input type="text" id="coName" class="form-input" required></div>
        <div class="form-group"><label>${t('phone')} *</label><input type="tel" id="coPhone" class="form-input" placeholder="01xxxxxxxxx" maxlength="11" required oninput="validatePhoneInput(this)"></div>
        <div class="form-group"><label>${t('phone2')}</label><input type="tel" id="coPhone2" class="form-input" placeholder="01xxxxxxxxx" maxlength="11" oninput="validatePhoneInput(this)"></div>
        <div class="form-group"><label>${t('emailOptional')}</label><input type="email" id="coEmail" class="form-input"></div>
      </div></div>
    <div class="checkout-section"><div class="checkout-section-title"><i class="fas fa-map-marker-alt"></i><span>${t('deliveryInfo')}</span></div>
      <div class="checkout-form-grid">
        <div class="form-group"><label>${t('governorate')} *</label><select id="coGov" class="form-input" required><option value="">${t('selectGovernorate')}</option>${govOptions}</select></div>
        <div class="form-group"><label>${t('city')} *</label><input type="text" id="coCity" class="form-input" required></div>
        <div class="form-group" style="grid-column:1/-1"><label>${t('address')} *</label><textarea id="coAddr" class="form-input" rows="2" required></textarea></div>
      </div></div>
    <div class="checkout-section"><div class="checkout-section-title"><i class="fas fa-credit-card"></i><span>${t('paymentMethod')}</span></div>
      <div class="payment-option selected"><i class="fas fa-money-bill-wave"></i><div><strong>${t('cashOnDelivery')}</strong><small>${Store.lang==='ar'?'ادفع عند استلام طلبك':'Pay when you receive your order'}</small></div></div></div>
    <div class="checkout-section"><div class="checkout-section-title"><i class="fas fa-sticky-note"></i><span>${t('additionalNotes')}</span></div>
      <div class="form-group"><textarea id="coNotes" class="form-input" rows="2"></textarea></div></div>
    <div id="coError" class="form-error"></div>
    <div class="checkout-actions"><button class="btn-primary" id="coBtn" onclick="placeOrder()"><i class="fas fa-check-circle"></i> ${t('confirmOrder')}</button><button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()"><i class="fas fa-times"></i> ${t('cancel')}</button></div>
  </div>`;document.body.appendChild(m)}

function validatePhoneInput(input){input.value=input.value.replace(/\D/g,'');const valid=input.value.length===11;input.style.borderColor=input.value.length>0?(valid?'var(--success)':'var(--error)'):''}

async function placeOrder(){
  const fn=document.getElementById('coName')?.value?.trim(),ph=document.getElementById('coPhone')?.value?.trim(),
    ph2=document.getElementById('coPhone2')?.value?.trim()||'',em=document.getElementById('coEmail')?.value?.trim(),
    gov=document.getElementById('coGov')?.value,city=document.getElementById('coCity')?.value?.trim(),
    addr=document.getElementById('coAddr')?.value?.trim(),notes=document.getElementById('coNotes')?.value?.trim();
  const errEl=document.getElementById('coError');
  if(!fn||!ph||!gov||!city||!addr){errEl.textContent=t('allFieldsRequired');return}
  if(ph.replace(/\D/g,'').length!==11){errEl.textContent=t('phoneMustBe11');return}
  if(ph2&&ph2.replace(/\D/g,'').length!==11){errEl.textContent=t('phoneMustBe11')+' (2)';return}
  const btn=document.getElementById('coBtn');btn.innerHTML='<div class="loading-spinner" style="width:18px;height:18px;margin:0 auto"></div>';
  const{ok,data}=await API.post('/api/orders',{full_name:fn,phone:ph,phone2:ph2,email:em,governorate:gov,city:city,address:addr,notes});
  document.querySelector('.modal-overlay')?.remove();
  if(ok){showToast(t('orderPlaced'));Store.cart=[];if(data.orderId)showInvoicePrompt(data.orderId);Router.navigate('/')}
  else{showToast(data.error||t('error'),'error');btn.innerHTML=`<i class="fas fa-check-circle"></i> ${t('confirmOrder')}`}}

function showInvoicePrompt(orderId){
  const m=document.createElement('div');m.className='modal-overlay';m.onclick=e=>{if(e.target===m)m.remove()};
  m.innerHTML=`<div class="modal-content" style="text-align:center">
    <i class="fas fa-check-circle" style="font-size:3.5rem;color:var(--success);margin-bottom:1rem;display:block"></i>
    <h2 style="margin-bottom:.5rem">${t('orderPlaced')}</h2>
    <p style="color:var(--text-secondary);margin-bottom:1.5rem">${t('orderNumber')} #${orderId}</p>
    <div style="display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
      <button class="btn-primary" onclick="generateInvoicePDF('${orderId}');this.closest('.modal-overlay').remove()"><i class="fas fa-file-pdf"></i> ${t('downloadInvoice')}</button>
      <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">${t('cancel')}</button>
    </div></div>`;document.body.appendChild(m)}

// ==================== PDF INVOICE ====================
async function generateInvoicePDF(orderId){
  showToast(Store.lang==='ar'?'جاري تجهيز الفاتورة...':'Preparing invoice...','warning');
  const order=await API.get(`/api/orders/${orderId}`);if(order.error){showToast(t('error'),'error');return}
  const items=order.items||[];
  const date=new Date(order.created_at).toLocaleDateString(Store.lang==='ar'?'ar-EG':'en-US',{year:'numeric',month:'long',day:'numeric'});
  const invoiceHTML=`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>Invoice #${orderId}</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Tahoma,sans-serif;color:#1a2744;padding:20px;background:#fff}.invoice{max-width:800px;margin:0 auto;padding:30px;border:2px solid #c9a84c}.invoice-header{display:flex;justify-content:space-between;align-items:center;padding-bottom:20px;border-bottom:3px solid #c9a84c;margin-bottom:20px}.brand h1{font-size:28px;color:#c9a84c;margin-bottom:4px}.brand p{color:#666;font-size:13px}.invoice-info{text-align:left;direction:ltr}.invoice-info h2{font-size:22px;color:#c9a84c;margin-bottom:5px}.invoice-info p{color:#666;font-size:13px}.invoice-body{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px}.info-box h3{font-size:14px;color:#c9a84c;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #eee}.info-box p{font-size:13px;color:#444;margin-bottom:4px;line-height:1.6}.info-box p strong{color:#1a2744}table{width:100%;border-collapse:collapse;margin-bottom:20px}th{background:#c9a84c;color:#fff;padding:10px 12px;text-align:right;font-size:13px}td{padding:10px 12px;border-bottom:1px solid #eee;font-size:13px}tr:nth-child(even){background:#fafafa}.total-section{text-align:left;direction:ltr;padding:15px;background:#f8f6f0;border-radius:8px;border:1px solid #c9a84c}.total-section .grand{font-size:20px;font-weight:800;color:#c9a84c;margin-top:8px}.footer{text-align:center;margin-top:25px;padding-top:15px;border-top:2px solid #c9a84c;color:#888;font-size:12px}@media print{body{padding:0}.invoice{border:none;padding:15px}}</style></head>
<body><div class="invoice">
<div class="invoice-header"><div class="brand"><h1>يقين | Yaqeen</h1><p>${PHONE} | ${CONTACT_EMAIL}</p></div><div class="invoice-info"><h2>${t('invoice')} #${orderId}</h2><p>${date}</p><p>${t('orderStatus')}: ${t(order.status||'pending')}</p></div></div>
<div class="invoice-body"><div class="info-box"><h3>${t('customerInfo')}</h3><p><strong>${t('fullName')}:</strong> ${order.full_name||''}</p><p><strong>${t('phone')}:</strong> ${order.phone||''}</p>${order.phone2?`<p><strong>${t('phone2')}:</strong> ${order.phone2}</p>`:''}${order.email?`<p><strong>${t('email')}:</strong> ${order.email}</p>`:''}<p><strong>${t('governorate')}:</strong> ${order.governorate||''}</p><p><strong>${t('city')}:</strong> ${order.city||''}</p><p><strong>${t('address')}:</strong> ${order.address||''}</p></div>
<div class="info-box"><h3>${t('orderSummary')}</h3><p><strong>${t('invoiceNumber')}:</strong> YQ-${String(orderId).slice(-6)}</p><p><strong>${t('orderDate')}:</strong> ${date}</p><p><strong>${t('quantity')}:</strong> ${items.reduce((s,i)=>s+i.quantity,0)} ${Store.lang==='ar'?'قطعة':'items'}</p></div></div>
<table><thead><tr><th>#</th><th>${Store.lang==='ar'?'المنتج':'Product'}</th><th>${t('quantity')}</th><th>${t('unitPrice')}</th><th>${t('itemTotal')}</th></tr></thead>
<tbody>${items.map((it,idx)=>`<tr><td>${idx+1}</td><td>${Store.lang==='ar'?it.title_ar:it.title_en}${it.selected_size?' - '+it.selected_size:''}${it.selected_color?' - '+it.selected_color:''}</td><td>${it.quantity}</td><td>${formatPrice(it.price)}</td><td>${formatPrice(it.price*it.quantity)}</td></tr>`).join('')}</tbody></table>
<div class="total-section"><p>${t('subtotal')}: ${formatPrice(order.total)}</p><p>${t('shipping')}: ${Store.lang==='ar'?'حسب المنطقة':'Based on location'}</p><p class="grand">${t('grandTotal')}: ${formatPrice(order.total)}</p></div>
<div class="footer"><p>يقين | Yaqeen - ${t('rightsReserved')} &copy; 2026</p><p>${CONTACT_EMAIL} | ${PHONE}</p></div></div></body></html>`;
  const printWin=window.open('','_blank','width=900,height=700');printWin.document.write(invoiceHTML);printWin.document.close();setTimeout(()=>printWin.print(),500)}

// ==================== AUTH ====================
function loadSigninPage(){if(Store.isLoggedIn()){Router.navigate('/');return}
  renderPage(`<div class="auth-page"><div class="auth-card animate-scaleIn"><div style="text-align:center;margin-bottom:1rem"><img src="${LOGO}" style="width:70px;height:70px;margin:0 auto;border-radius:14px"></div>
    <h2>${t('signin')}</h2><p class="subtitle">${t('heroTitle')}</p>
    <form onsubmit="doSignin(event)"><div class="form-group"><label>${t('email')}</label><input type="email" id="siEmail" class="form-input" required></div>
    <div class="form-group"><label>${t('password')}</label><input type="password" id="siPass" class="form-input" required></div>
    <div id="siErr" class="form-error" style="margin-bottom:.6rem"></div>
    <button type="submit" class="btn-primary" style="width:100%;justify-content:center" id="siBtn"><i class="fas fa-sign-in-alt"></i> ${t('signin')}</button></form>
    <p class="auth-link">${t('noAccount')} <a href="/register">${t('register')}</a></p></div></div>`)}
async function doSignin(e){e.preventDefault();const em=document.getElementById('siEmail').value,pw=document.getElementById('siPass').value,btn=document.getElementById('siBtn'),err=document.getElementById('siErr');
  btn.innerHTML='<div class="loading-spinner" style="width:18px;height:18px;margin:0 auto"></div>';err.textContent='';
  const{data,ok}=await API.post('/api/login',{email:em,password:pw});
  if(ok){Store.setUser(data.user,data.token);await loadCartData();showToast(`${t('welcome')} ${data.user.name}`);Router.navigate('/')}
  else{err.textContent=t('invalidCredentials');btn.innerHTML=`<i class="fas fa-sign-in-alt"></i> ${t('signin')}`}}

function loadRegisterPage(){if(Store.isLoggedIn()){Router.navigate('/');return}
  renderPage(`<div class="auth-page"><div class="auth-card animate-scaleIn"><div style="text-align:center;margin-bottom:1rem"><img src="${LOGO}" style="width:70px;height:70px;margin:0 auto;border-radius:14px"></div>
    <h2>${t('register')}</h2>
    <form onsubmit="doRegister(event)"><div class="form-group"><label>${t('username')}</label><input type="text" id="regName" class="form-input" required></div>
    <div class="form-group"><label>${t('email')}</label><input type="email" id="regEmail" class="form-input" required></div>
    <div class="form-group"><label>${t('password')}</label><input type="password" id="regPass" class="form-input" required></div>
    <div id="regErr" class="form-error" style="margin-bottom:.6rem"></div>
    <button type="submit" class="btn-primary" style="width:100%;justify-content:center" id="regBtn"><i class="fas fa-user-plus"></i> ${t('register')}</button></form>
    <p class="auth-link">${t('haveAccount')} <a href="/signin">${t('signin')}</a></p></div></div>`)}
async function doRegister(e){e.preventDefault();const nm=document.getElementById('regName').value,em=document.getElementById('regEmail').value,pw=document.getElementById('regPass').value,btn=document.getElementById('regBtn'),err=document.getElementById('regErr');
  if(!nm||!em||!pw){err.textContent=t('allFieldsRequired');return}
  btn.innerHTML='<div class="loading-spinner" style="width:18px;height:18px;margin:0 auto"></div>';err.textContent='';
  const{data,ok}=await API.post('/api/register',{name:nm,email:em,password:pw});
  if(ok){showToast(t('accountCreated'));Router.navigate('/signin')}else{err.textContent=data.error==='Email already exists'?t('emailExists'):data.error;btn.innerHTML=`<i class="fas fa-user-plus"></i> ${t('register')}`}}

// ==================== PROFILE ====================
async function loadProfilePage(){
  if(!Store.isLoggedIn()){Router.navigate('/signin');return}
  renderPage(`<div class="section" style="text-align:center;padding:3rem"><div class="loading-spinner" style="margin:0 auto"></div></div>`);
  const r=await API.get('/api/me');const user=r.user||r;if(!user||!user.id){Router.navigate('/signin');return}
  let orders=[];try{const _o=await API.get('/api/orders');orders=Array.isArray(_o)?_o:[]}catch(e){}
  const memberDate=user.created_at?new Date(user.created_at).toLocaleDateString(Store.lang==='ar'?'ar-EG':'en-US',{year:'numeric',month:'long',day:'numeric'}):'';
  renderPage(`<div class="profile-page"><div class="section-header"><h2 class="section-title">${t('myAccount')}</h2></div>
    <div class="profile-grid">
      <div class="profile-card animate-fadeInLeft">
        <div class="profile-avatar"><i class="fas ${user.role==='admin'?'fa-user-shield':'fa-user-circle'}"></i></div>
        <h3 class="profile-name">${user.name}</h3><p class="profile-email"><i class="fas fa-envelope"></i> ${user.email}</p>
        <p class="profile-role"><span class="status-badge ${user.role==='admin'?'status-completed':'status-processing'}">${user.role}</span></p>
        ${memberDate?`<p class="profile-since"><i class="fas fa-calendar-alt"></i> ${t('memberSince')}: ${memberDate}</p>`:''}
        <div class="profile-actions"><button class="btn-danger" onclick="handleSignout()" style="width:100%;justify-content:center;margin-top:1rem"><i class="fas fa-sign-out-alt"></i> ${t('signout')}</button></div>
      </div>
      <div class="profile-orders animate-fadeInRight"><div class="dash-section">
        <div class="dash-section-header"><h3><i class="fas fa-shopping-bag"></i> ${t('myOrders')}</h3></div>
        ${orders.length?`<div class="admin-list">${orders.map(o=>`<div class="admin-row">
          <div style="width:40px;height:40px;border-radius:10px;background:rgba(201,168,76,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-receipt" style="color:var(--accent)"></i></div>
          <div class="admin-row-info"><h4>#${o.id} - ${new Date(o.created_at).toLocaleDateString(Store.lang==='ar'?'ar-EG':'en-US')}</h4><p>${o.full_name||''}</p></div>
          <span class="admin-row-price">${formatPrice(o.total)}</span>
          <span class="status-badge status-${o.status||'pending'}">${t(o.status||'pending')}</span>
          <button class="btn-secondary btn-sm" onclick="event.stopPropagation();generateInvoicePDF('${o.id}')" title="${t('downloadInvoice')}"><i class="fas fa-file-pdf"></i></button>
        </div>`).join('')}</div>`
        :`<div class="empty-state" style="padding:1.5rem"><i class="fas fa-shopping-bag" style="font-size:2rem"></i><p>${t('noOrders')}</p><a href="/shop" class="btn-primary" style="text-decoration:none;margin-top:.8rem"><i class="fas fa-shopping-bag"></i> ${t('shopNow')}</a></div>`}
      </div></div>
    </div></div>`)}

// ==================== ADMIN DASHBOARD ====================
async function loadAdminPage(){
  if(!Store.isAdmin()){Router.navigate('/signin');return}
  renderPage(`<div class="admin-page-inner"><div class="loading-spinner" style="margin:3rem auto"></div></div>`);
  const stats=await API.get('/api/admin/stats');
  const recOrders=stats.recentOrders||[],topProds=stats.topProducts||[];
  const avgOrder=stats.orders>0?Math.round(stats.revenue/stats.orders):0;
  const statusData=[{label:t('pending'),value:stats.pending||0,color:'#f59e0b'},{label:t('processing'),value:stats.processing||0,color:'#3b82f6'},{label:t('shipped'),value:stats.shipped||0,color:'#a855f7'},{label:t('completed'),value:stats.completed||0,color:'#22c55e'},{label:t('cancelled'),value:stats.cancelled||0,color:'#ef4444'}];
  const maxStat=Math.max(...statusData.map(s=>s.value),1);
  
  renderPage(`<div class="admin-page-inner">
    <div class="admin-welcome"><h2><i class="fas fa-chart-line"></i> ${t('dashboard')}</h2><p>${Store.lang==='ar'?'مرحباً بك في لوحة إدارة يقين':'Welcome to Yaqeen Admin Panel'}</p></div>
    <div class="admin-stats-grid">
      <div class="stat-card animate-on-scroll" style="--accent-clr:#c9a84c"><div class="stat-card-icon"><i class="fas fa-box"></i></div><div class="stat-card-body"><div class="stat-card-value">${stats.products}</div><div class="stat-card-label">${t('products')}</div></div></div>
      <div class="stat-card animate-on-scroll" style="--accent-clr:#3b82f6"><div class="stat-card-icon" style="background:rgba(59,130,246,.1);color:#3b82f6"><i class="fas fa-users"></i></div><div class="stat-card-body"><div class="stat-card-value">${stats.users}</div><div class="stat-card-label">${t('users')}</div></div></div>
      <div class="stat-card animate-on-scroll" style="--accent-clr:#a855f7"><div class="stat-card-icon" style="background:rgba(168,85,247,.1);color:#a855f7"><i class="fas fa-shopping-bag"></i></div><div class="stat-card-body"><div class="stat-card-value">${stats.orders}</div><div class="stat-card-label">${t('orders')}</div></div></div>
      <div class="stat-card animate-on-scroll" style="--accent-clr:#22c55e"><div class="stat-card-icon" style="background:rgba(34,197,94,.1);color:#22c55e"><i class="fas fa-coins"></i></div><div class="stat-card-body"><div class="stat-card-value">${formatPrice(stats.revenue)}</div><div class="stat-card-label">${t('totalRevenue')}</div></div></div>
    </div>
    <div class="admin-stats-grid five-cols">
      ${statusData.map(s=>`<div class="stat-card mini animate-on-scroll"><div class="stat-mini-icon" style="color:${s.color}"><i class="fas fa-circle"></i></div><div class="stat-card-value">${s.value}</div><div class="stat-card-label">${s.label}</div></div>`).join('')}
    </div>
    <div class="dash-section animate-on-scroll" style="margin-bottom:1.5rem">
      <div class="dash-section-header"><h3><i class="fas fa-chart-bar"></i> ${t('orderAnalysis')}</h3></div>
      <div class="chart-bar">${statusData.map(s=>`<div class="chart-col" data-label="${s.label}" data-value="${s.value}" style="height:${Math.max((s.value/maxStat)*100,5)}%;background:linear-gradient(to top,${s.color},${s.color}aa)"></div>`).join('')}</div>
    </div>
    <div class="dash-grid">
      <div class="dash-section animate-on-scroll">
        <div class="dash-section-header"><h3><i class="fas fa-clock-rotate-left"></i> ${t('recentOrders')}</h3><a href="/admin/orders" style="font-size:.8rem;color:var(--accent)">${t('viewAll')} <i class="fas fa-arrow-${arrow()}"></i></a></div>
        ${recOrders.length?`<div class="admin-list">${recOrders.map(o=>`<div class="admin-row" onclick="Router.navigate('/admin/orders/${o.id}')" style="cursor:pointer">
          <div style="width:40px;height:40px;border-radius:10px;background:rgba(201,168,76,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-receipt" style="color:var(--accent)"></i></div>
          <div class="admin-row-info"><h4>#${o.id} - ${o.full_name||o.user_name||'—'}</h4><p>${o.phone||''}</p></div>
          <span class="admin-row-price">${formatPrice(o.total)}</span>
          <span class="status-badge status-${o.status||'pending'}">${t(o.status||'pending')}</span></div>`).join('')}</div>`
        :`<div class="empty-state" style="padding:1.5rem"><i class="fas fa-clipboard-list" style="font-size:2rem"></i><p>${t('noOrders')}</p></div>`}
      </div>
      <div>
        <div class="dash-section animate-on-scroll" style="margin-bottom:1rem">
          <div class="dash-section-header"><h3><i class="fas fa-calendar-day"></i> ${t('todayOrders')}</h3></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem">
            <div style="text-align:center;padding:.8rem;border-radius:var(--radius-sm);background:rgba(201,168,76,.05)"><div style="font-size:1.6rem;font-weight:800;color:var(--accent)">${stats.todayOrders}</div><div style="font-size:.75rem;color:var(--text-secondary)">${t('orders')}</div></div>
            <div style="text-align:center;padding:.8rem;border-radius:var(--radius-sm);background:rgba(34,197,94,.05)"><div style="font-size:1.2rem;font-weight:800;color:var(--success)">${formatPrice(stats.todayRevenue)}</div><div style="font-size:.75rem;color:var(--text-secondary)">${t('revenue')}</div></div>
          </div>
        </div>
        <div class="dash-section animate-on-scroll" style="margin-bottom:1rem">
          <div class="dash-section-header"><h3><i class="fas fa-exclamation-triangle"></i> ${Store.lang==='ar'?'تنبيهات المخزون':'Stock Alerts'}</h3></div>
          <div style="display:flex;gap:.6rem"><div style="flex:1;padding:.6rem;border-radius:var(--radius-sm);background:rgba(245,158,11,.08);text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#f59e0b">${stats.lowStock||0}</div><div style="font-size:.7rem;color:var(--text-secondary)">${t('lowStock')}</div></div><div style="flex:1;padding:.6rem;border-radius:var(--radius-sm);background:rgba(239,68,68,.08);text-align:center"><div style="font-size:1.3rem;font-weight:800;color:#ef4444">${stats.outOfStock||0}</div><div style="font-size:.7rem;color:var(--text-secondary)">${t('outOfStockCount')}</div></div></div>
        </div>
        <div class="dash-section animate-on-scroll">
          <div class="dash-section-header"><h3><i class="fas fa-fire"></i> ${t('topSelling')}</h3></div>
          ${topProds.length?`<div class="admin-list">${topProds.map(p=>`<div class="admin-row"><img src="${p.product_img||'/static/images/1.png'}" onerror="this.src='/static/images/1.png'" style="width:36px;height:36px;border-radius:6px"><div class="admin-row-info"><h4 style="font-size:.8rem">${getTitle(p)}</h4><p style="font-size:.7rem">${p.sold||0} ${t('sold')}</p></div><span style="color:var(--accent);font-weight:600;font-size:.8rem">${formatPrice(p.price)}</span></div>`).join('')}</div>`
          :`<p style="text-align:center;padding:.8rem;color:var(--text-secondary);font-size:.85rem">${t('noProducts')}</p>`}
        </div>
      </div>
    </div></div>`);initScrollAnimations()}

// ==================== ADMIN PRODUCTS ====================
async function loadAdminProductsPage(){
  if(!Store.isAdmin()){Router.navigate('/signin');return}
  const _ap=await API.get('/api/products');const products=Array.isArray(_ap)?_ap:[];
  renderPage(`<div class="admin-page-inner">
    <div class="admin-page-header"><h2><i class="fas fa-boxes-stacked"></i> ${t('manageProducts')}</h2>
    <a href="/admin/add-product" class="btn-primary btn-sm" style="text-decoration:none"><i class="fas fa-plus"></i> ${t('addProduct')}</a></div>
    <div class="admin-list">${products.map(p=>{
      const disc=p.old_price?Math.round((1-p.price/p.old_price)*100):0;
      return`<div class="admin-row">
      <img src="${p.product_img||'/static/images/1.png'}" onerror="this.src='/static/images/1.png'">
      <div class="admin-row-info"><h4>${getTitle(p)}</h4><p>${p.category||''} ${p.brand?'· '+p.brand:''} · ${t('productStock')}: ${p.stock}${disc>0?` · <span style="color:var(--error)">-${disc}%</span>`:''}</p></div>
      <span class="admin-row-price">${formatPrice(p.price)}</span>
      <div class="admin-row-actions">
        <a href="/admin/edit-product/${p.id}" class="icon-btn" style="width:32px;height:32px;font-size:.75rem;text-decoration:none" title="${t('editProduct')}"><i class="fas fa-edit"></i></a>
        <button class="icon-btn" style="width:32px;height:32px;font-size:.75rem;background:rgba(239,68,68,.1);color:var(--error);border-color:rgba(239,68,68,.2)" onclick="delProdAdmin('${p.id}')" title="${t('deleteProduct')}"><i class="fas fa-trash"></i></button>
      </div></div>`}).join('')}${!products.length?`<div class="empty-state"><i class="fas fa-box-open"></i><h3>${t('noProducts')}</h3></div>`:''}</div></div>`)}
async function delProdAdmin(id){if(!confirm(t('confirmDelete')))return;const{ok}=await API.del(`/api/products/${id}`);if(ok){showToast(t('productDeleted'));loadAdminProductsPage()}}

// ==================== ADMIN ADD/EDIT PRODUCT ====================
function loadAddProductPage(){if(!Store.isAdmin()){Router.navigate('/signin');return}renderPage(productForm())}
async function loadEditProductPage(id){if(!Store.isAdmin()){Router.navigate('/signin');return}
  if(!Store.categories.length){const _c=await API.get('/api/categories');Store.categories=Array.isArray(_c)?_c:[]}
  const p=await API.get(`/api/products/${id}`);if(p.error){renderPage(render404());return}renderPage(productForm(p))}

let galleryUrls=[],productSizes=[],productColors=[],variantStocks={};

function productForm(p=null){
  const isE=!!p;if(!Store.categories.length)Store.categories=[];
  let existingGallery=[];try{existingGallery=JSON.parse(p?.gallery||'[]')}catch(e){}
  galleryUrls=[...existingGallery];
  try{productSizes=JSON.parse(p?.sizes||'[]')}catch(e){productSizes=[]}
  try{productColors=JSON.parse(p?.colors||'[]')}catch(e){productColors=[]}
  // Build variant stock map from existing variants
  variantStocks={};
  if(p&&p.variants){const variants=Array.isArray(p.variants)?p.variants:(typeof p.variants==='string'?JSON.parse(p.variants):p.variants);
    if(Array.isArray(variants)){variants.forEach(v=>{
      const key=v.size&&v.color_name?`${v.size}|${v.color_name}`:v.size?v.size:v.color_name?v.color_name:'default';
      variantStocks[key]=v.stock||0})}}
  const enableSizes=p?.enable_sizes||0;const enableColors=p?.enable_colors||0;
  
  return`<div class="admin-page-inner">
  <div class="admin-page-header"><h2><i class="fas ${isE?'fa-edit':'fa-plus-circle'}"></i> ${isE?t('editProduct'):t('addProduct')}</h2>
  <a href="/admin/products" class="btn-secondary btn-sm" style="text-decoration:none"><i class="fas fa-arrow-${arrow()}"></i> ${t('back')}</a></div>
  <div class="admin-form"><form onsubmit="${isE?`doUpdateProduct(event,'${p.id}')`:'doAddProduct(event)'}"><div class="form-grid">
    <div class="form-group"><label>${t('productTitleAr')}</label><input type="text" id="pTAr" class="form-input" value="${p?.title_ar||''}" required></div>
    <div class="form-group"><label>${t('productTitleEn')}</label><input type="text" id="pTEn" class="form-input" value="${p?.title_en||''}" required></div>
    <div class="form-group"><label>${t('productPrice')} (${t('currency')})</label><input type="number" id="pPr" class="form-input" value="${p?.price||''}" step="0.01" required oninput="calcDiscount()"></div>
    <div class="form-group"><label>${t('productOldPrice')} (${t('currency')})</label><input type="number" id="pOP" class="form-input" value="${p?.old_price||''}" step="0.01" oninput="calcDiscount()"></div>
    <div class="form-group form-full"><div class="discount-display" id="discountDisplay" style="display:none"><i class="fas fa-tag" style="color:var(--error)"></i><span>${t('discount')}: <strong id="discountValue">0%</strong></span></div></div>
    <div class="form-group form-full"><label>${t('productDescAr')}</label><textarea id="pDAr" class="form-input" rows="2">${p?.description_ar||''}</textarea></div>
    <div class="form-group form-full"><label>${t('productDescEn')}</label><textarea id="pDEn" class="form-input" rows="2">${p?.description_en||''}</textarea></div>
    <div class="form-group form-full"><label>${t('productDetailsAr')}</label><textarea id="pDtAr" class="form-input" rows="2" placeholder="ميزة 1 - ميزة 2 - ميزة 3">${p?.details_ar||''}</textarea></div>
    <div class="form-group form-full"><label>${t('productDetailsEn')}</label><textarea id="pDtEn" class="form-input" rows="2">${p?.details_en||''}</textarea></div>
    <div class="form-group"><label>${t('productCategory')}</label><select id="pCat" class="form-input">${Store.categories.map(c=>`<option value="${c.name_en}" ${p?.category===c.name_en?'selected':''}>${getCatName(c)}</option>`).join('')}<option value="general" ${!p||p?.category==='general'?'selected':''}>General</option></select></div>
    <div class="form-group"><label>${t('productBrand')}</label><input type="text" id="pBr" class="form-input" value="${p?.brand||''}"></div>
    <div class="form-group"><label>${t('productSKU')}</label><input type="text" id="pSKU" class="form-input" value="${p?.sku||''}"></div>
    <div class="form-group"><label>${t('productFeatured')}</label><select id="pFt" class="form-input"><option value="0" ${!p?.featured?'selected':''}>${t('no')}</option><option value="1" ${p?.featured?'selected':''}>${t('yes')}</option></select></div>
    
    <!-- MAIN IMAGE -->
    <div class="form-group form-full">
      <label><i class="fas fa-image" style="color:var(--accent);margin-inline-end:.3rem"></i>${t('uploadMainImage')}</label>
      <div class="upload-zone" id="mainUploadZone" ondrop="handleDrop(event,'pImg',false)" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')">
        <input type="file" id="mainImgFile" accept="image/*" style="display:none" onchange="handleFileUpload(this,'pImg',false)">
        <div class="upload-zone-inner" onclick="document.getElementById('mainImgFile').click()">
          <div id="mainImgPreview" class="upload-preview" style="${p?.product_img?'':'display:none'}"><img id="mainImgPrev" src="${p?.product_img||''}" onerror="this.style.display='none'"></div>
          <div class="upload-placeholder" id="mainUploadPlaceholder" style="${p?.product_img?'display:none':''}"><i class="fas fa-cloud-upload-alt"></i><span>${t('dragDropHere')}</span><small>${t('maxFileSize')}</small></div>
        </div><div class="upload-status"></div>
      </div>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;align-items:center"><span style="font-size:.75rem;color:var(--text-secondary);white-space:nowrap">${t('orEnterUrl')}:</span>
        <input type="text" id="pImg" class="form-input" value="${p?.product_img||''}" placeholder="https://..." oninput="previewMainImg()" style="flex:1;font-size:.8rem"></div>
    </div>
    
    <!-- Gallery -->
    <div class="form-group form-full">
      <label><i class="fas fa-images" style="color:var(--accent);margin-inline-end:.3rem"></i>${t('uploadGalleryImages')}</label>
      <div id="galleryContainer" class="gallery-edit-container">${galleryUrls.map((url,i)=>`<div class="gallery-edit-item" id="gal_${i}"><img src="${url}" onerror="this.src='/static/images/1.png'"><button type="button" class="gallery-remove-btn" onclick="removeGalleryImg(${i})"><i class="fas fa-times"></i></button></div>`).join('')}</div>
      <div class="upload-zone gallery-upload-zone" ondrop="handleDrop(event,'',true)" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')">
        <input type="file" id="galleryImgFile" accept="image/*" multiple style="display:none" onchange="handleFileUpload(this,'',true)">
        <div class="upload-zone-inner upload-zone-sm" onclick="document.getElementById('galleryImgFile').click()">
          <i class="fas fa-plus-circle" style="font-size:1.2rem;color:var(--accent)"></i><span style="font-size:.8rem">${t('addImage')}</span></div>
        <div class="upload-status"></div>
      </div>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;align-items:center"><span style="font-size:.75rem;color:var(--text-secondary);white-space:nowrap">${t('orEnterUrl')}:</span>
        <input type="text" id="newGalleryUrl" class="form-input" placeholder="URL" style="flex:1;font-size:.8rem"><button type="button" class="btn-secondary btn-sm" onclick="addGalleryImg()"><i class="fas fa-plus"></i></button></div>
    </div>
    
    <!-- SIZES -->
    <div class="form-group form-full">
      <div class="toggle-section"><label class="toggle-label"><input type="checkbox" id="pEnableSizes" ${enableSizes?'checked':''} onchange="toggleSizesSection();renderVariantStockTable()"><span class="toggle-switch"></span><span><i class="fas fa-ruler"></i> ${t('enableSizes')}</span></label></div>
      <div id="sizesSection" style="display:${enableSizes?'block':'none'};margin-top:.8rem">
        <div id="sizesContainer" class="tags-container">${productSizes.map((s,i)=>`<span class="tag-item">${s}<button type="button" onclick="removeSize(${i})"><i class="fas fa-times"></i></button></span>`).join('')}</div>
        <div style="display:flex;gap:.5rem;margin-top:.5rem"><input type="text" id="newSize" class="form-input" placeholder="S, M, L, XL" style="flex:1" onkeydown="if(event.key==='Enter'){event.preventDefault();addSize()}"><button type="button" class="btn-secondary btn-sm" onclick="addSize()"><i class="fas fa-plus"></i> ${t('addSize')}</button></div>
      </div>
    </div>
    
    <!-- COLORS -->
    <div class="form-group form-full">
      <div class="toggle-section"><label class="toggle-label"><input type="checkbox" id="pEnableColors" ${enableColors?'checked':''} onchange="toggleColorsSection();renderVariantStockTable()"><span class="toggle-switch"></span><span><i class="fas fa-palette"></i> ${t('enableColors')}</span></label></div>
      <div id="colorsSection" style="display:${enableColors?'block':'none'};margin-top:.8rem">
        <div id="colorsContainer" class="tags-container">${productColors.map((c,i)=>`<span class="tag-item color-tag"><span class="mini-swatch" style="background:${c.hex||'#ccc'}"></span>${c.name||c}<button type="button" onclick="removeColor(${i})"><i class="fas fa-times"></i></button></span>`).join('')}</div>
        <div style="display:flex;gap:.5rem;margin-top:.5rem;flex-wrap:wrap"><input type="text" id="newColorName" class="form-input" placeholder="${Store.lang==='ar'?'اسم اللون':'Color name'}" style="flex:1;min-width:120px"><input type="color" id="newColorHex" value="#c9a84c" style="width:45px;height:38px;border:1px solid var(--border);border-radius:var(--radius-sm);cursor:pointer;padding:2px"><button type="button" class="btn-secondary btn-sm" onclick="addColor()"><i class="fas fa-plus"></i> ${t('addColor')}</button></div>
      </div>
    </div>
    
    <!-- VARIANT STOCK TABLE -->
    <div class="form-group form-full" id="variantStockSection">
      <div class="detail-section-title" style="margin-top:.5rem"><i class="fas fa-warehouse" style="color:var(--accent)"></i>${t('stockPerVariant')}</div>
      <div id="variantStockTable"></div>
    </div>
    
    <div class="form-group form-full"><label>${t('specifications')} (JSON)</label><textarea id="pSpec" class="form-input" rows="3" placeholder='[{"key_ar":"المادة","key_en":"Material","value_ar":"جلد","value_en":"Leather"}]'>${p?.specifications||'[]'}</textarea></div>
  </div><div id="pfErr" class="form-error" style="margin:.6rem 0"></div>
  <button type="submit" class="btn-primary" id="pfBtn" style="margin-top:.8rem"><i class="fas ${isE?'fa-save':'fa-plus'}"></i> ${isE?t('updateProduct'):t('addProduct')}</button></form></div></div>`;
}

// After form renders, build variant stock table
function afterFormRender(){renderVariantStockTable();calcDiscount()}

function renderVariantStockTable(){
  const hasSizes=document.getElementById('pEnableSizes')?.checked;
  const hasColors=document.getElementById('pEnableColors')?.checked;
  const section=document.getElementById('variantStockSection');
  const table=document.getElementById('variantStockTable');
  if(!table)return;
  
  if(!hasSizes&&!hasColors){
    // Single stock input
    table.innerHTML=`<div style="display:flex;align-items:center;gap:.8rem;padding:.6rem;background:rgba(201,168,76,.03);border-radius:var(--radius-sm);border:1px solid var(--border)">
      <span style="font-weight:600;font-size:.85rem">${t('productStock')}</span>
      <input type="number" class="form-input" id="vs_default" value="${variantStocks['default']||0}" min="0" style="width:100px;text-align:center" onchange="variantStocks['default']=+this.value">
    </div>`;return}
  
  let rows='';
  if(hasSizes&&hasColors&&productSizes.length&&productColors.length){
    rows=`<table class="variant-stock-grid"><thead><tr><th>${t('sizes')} / ${t('colors')}</th>${productColors.map(c=>`<th><span class="mini-swatch" style="background:${c.hex||'#ccc'};display:inline-block;vertical-align:middle;margin-inline-end:4px"></span>${c.name||c}</th>`).join('')}</tr></thead><tbody>`;
    productSizes.forEach(s=>{
      rows+=`<tr><td style="font-weight:700">${s}</td>`;
      productColors.forEach(c=>{const cn=c.name||c;const key=`${s}|${cn}`;
        rows+=`<td><input type="number" class="form-input vs-input" data-key="${key}" value="${variantStocks[key]||0}" min="0" onchange="variantStocks['${key}']=+this.value"></td>`});
      rows+=`</tr>`});
    rows+=`</tbody></table>`}
  else if(hasSizes&&productSizes.length){
    rows=productSizes.map(s=>`<div class="vs-row"><span>${s}</span><input type="number" class="form-input vs-input" data-key="${s}" value="${variantStocks[s]||0}" min="0" onchange="variantStocks['${s}']=+this.value"></div>`).join('')}
  else if(hasColors&&productColors.length){
    rows=productColors.map(c=>{const cn=c.name||c;return`<div class="vs-row"><span><span class="mini-swatch" style="background:${c.hex||'#ccc'};display:inline-block;vertical-align:middle;margin-inline-end:4px"></span>${cn}</span><input type="number" class="form-input vs-input" data-key="${cn}" value="${variantStocks[cn]||0}" min="0" onchange="variantStocks['${cn}']=+this.value"></div>`}).join('')}
  else{rows=`<p style="color:var(--text-secondary);font-size:.8rem;padding:.5rem">${Store.lang==='ar'?'أضف مقاسات أو ألوان أولاً':'Add sizes or colors first'}</p>`}
  
  table.innerHTML=rows}

function toggleSizesSection(){document.getElementById('sizesSection').style.display=document.getElementById('pEnableSizes').checked?'block':'none'}
function toggleColorsSection(){document.getElementById('colorsSection').style.display=document.getElementById('pEnableColors').checked?'block':'none'}
function addSize(){const input=document.getElementById('newSize');const v=input?.value?.trim();if(!v)return;productSizes.push(v);input.value='';renderSizes();renderVariantStockTable()}
function removeSize(i){productSizes.splice(i,1);renderSizes();renderVariantStockTable()}
function renderSizes(){const c=document.getElementById('sizesContainer');if(c)c.innerHTML=productSizes.map((s,i)=>`<span class="tag-item">${s}<button type="button" onclick="removeSize(${i})"><i class="fas fa-times"></i></button></span>`).join('')}
function addColor(){const nameInput=document.getElementById('newColorName'),hexInput=document.getElementById('newColorHex');const name=nameInput?.value?.trim(),hex=hexInput?.value;if(!name)return;productColors.push({name,hex});nameInput.value='';renderColors();renderVariantStockTable()}
function removeColor(i){productColors.splice(i,1);renderColors();renderVariantStockTable()}
function renderColors(){const c=document.getElementById('colorsContainer');if(c)c.innerHTML=productColors.map((c,i)=>`<span class="tag-item color-tag"><span class="mini-swatch" style="background:${c.hex||'#ccc'}"></span>${c.name||c}<button type="button" onclick="removeColor(${i})"><i class="fas fa-times"></i></button></span>`).join('')}
function calcDiscount(){const price=+document.getElementById('pPr')?.value||0;const oldPrice=+document.getElementById('pOP')?.value||0;const display=document.getElementById('discountDisplay');const discVal=document.getElementById('discountValue');if(oldPrice>price&&price>0){display.style.display='flex';discVal.textContent=Math.round((1-price/oldPrice)*100)+'%'}else{display.style.display='none'}}
function previewMainImg(){const url=document.getElementById('pImg')?.value;const prev=document.getElementById('mainImgPreview');const img=document.getElementById('mainImgPrev');const placeholder=document.getElementById('mainUploadPlaceholder');if(url){prev.style.display='';img.src=url;img.style.display='';if(placeholder)placeholder.style.display='none'}else{prev.style.display='none';if(placeholder)placeholder.style.display=''}}
function handleDrop(event,targetId,isGallery){event.preventDefault();const zone=event.currentTarget;zone.classList.remove('drag-over');const files=event.dataTransfer?.files;if(!files||!files.length)return;const fakeInput={files:files,value:'',closest:function(sel){return zone.closest?zone.closest(sel):zone}};handleFileUpload(fakeInput,targetId,isGallery)}
function addGalleryImg(){const input=document.getElementById('newGalleryUrl');const url=input?.value?.trim();if(!url)return;galleryUrls.push(url);input.value='';renderGalleryPreview()}
function removeGalleryImg(idx){galleryUrls.splice(idx,1);renderGalleryPreview()}
function renderGalleryPreview(){const container=document.getElementById('galleryContainer');if(!container)return;container.innerHTML=galleryUrls.map((url,i)=>`<div class="gallery-edit-item" id="gal_${i}"><img src="${url}" onerror="this.src='/static/images/1.png'"><button type="button" class="gallery-remove-btn" onclick="removeGalleryImg(${i})"><i class="fas fa-times"></i></button></div>`).join('')}

function collectVariantStocks(){
  // Read current values from inputs
  document.querySelectorAll('.vs-input').forEach(inp=>{variantStocks[inp.dataset.key]=+inp.value||0});
  return variantStocks}

function getPFData(){
  collectVariantStocks();
  return{title_ar:document.getElementById('pTAr').value,title_en:document.getElementById('pTEn').value,price:+document.getElementById('pPr').value||0,old_price:+document.getElementById('pOP').value||null,description_ar:document.getElementById('pDAr').value,description_en:document.getElementById('pDEn').value,details_ar:document.getElementById('pDtAr').value,details_en:document.getElementById('pDtEn').value,category:document.getElementById('pCat').value,brand:document.getElementById('pBr').value,sku:document.getElementById('pSKU').value,featured:+document.getElementById('pFt').value||0,product_img:document.getElementById('pImg').value,gallery:JSON.stringify(galleryUrls),specifications:document.getElementById('pSpec').value||'[]',sizes:JSON.stringify(productSizes),colors:JSON.stringify(productColors),enable_sizes:document.getElementById('pEnableSizes').checked?1:0,enable_colors:document.getElementById('pEnableColors').checked?1:0,variant_stocks:variantStocks}}

async function doAddProduct(e){e.preventDefault();document.getElementById('pfBtn').innerHTML='<div class="loading-spinner" style="width:18px;height:18px"></div>';
  const{ok,data}=await API.post('/api/products',getPFData());if(ok){showToast(t('productAdded'));Router.navigate('/admin/products')}else{document.getElementById('pfErr').textContent=data.error||t('error');document.getElementById('pfBtn').innerHTML=`<i class="fas fa-plus"></i> ${t('addProduct')}`}}
async function doUpdateProduct(e,id){e.preventDefault();document.getElementById('pfBtn').innerHTML='<div class="loading-spinner" style="width:18px;height:18px"></div>';
  const{ok,data}=await API.put(`/api/products/${id}`,getPFData());if(ok){showToast(t('productUpdated'));Router.navigate('/admin/products')}else{document.getElementById('pfErr').textContent=data.error||t('error');document.getElementById('pfBtn').innerHTML=`<i class="fas fa-save"></i> ${t('updateProduct')}`}}

// ==================== ADMIN ORDERS ====================
async function loadAdminOrdersPage(){
  if(!Store.isAdmin()){Router.navigate('/signin');return}
  const _ao=await API.get('/api/orders');const orders=Array.isArray(_ao)?_ao:[];
  renderPage(`<div class="admin-page-inner">
    <div class="admin-page-header"><h2><i class="fas fa-clipboard-list"></i> ${t('manageOrders')}</h2></div>
    <div class="admin-list">${orders.map(o=>`<div class="admin-row" style="cursor:pointer" onclick="Router.navigate('/admin/orders/${o.id}')">
      <div style="width:44px;height:44px;border-radius:10px;background:rgba(201,168,76,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fas fa-receipt" style="color:var(--accent)"></i></div>
      <div class="admin-row-info"><h4>#${o.id} - ${o.full_name||o.user_name||'—'}</h4><p>${o.phone||''} · ${o.governorate||''}, ${o.city||''}</p></div>
      <span class="admin-row-price">${formatPrice(o.total)}</span>
      <span class="status-badge status-${o.status||'pending'}">${t(o.status||'pending')}</span>
      <div class="admin-row-actions" onclick="event.stopPropagation()">
        <button class="icon-btn" style="width:32px;height:32px;font-size:.75rem" onclick="generateInvoicePDF('${o.id}')" title="${t('downloadInvoice')}"><i class="fas fa-file-pdf"></i></button>
        <button class="icon-btn" style="width:32px;height:32px;font-size:.75rem;background:rgba(239,68,68,.1);color:var(--error);border-color:rgba(239,68,68,.2)" onclick="delOrder('${o.id}')" title="${t('deleteOrder')}"><i class="fas fa-trash"></i></button>
      </div></div>`).join('')}${!orders.length?`<div class="empty-state"><i class="fas fa-clipboard-list"></i><h3>${t('noOrders')}</h3></div>`:''}</div></div>`)}
async function delOrder(id){if(!confirm(t('confirmDelete')))return;const{ok}=await API.del(`/api/orders/${id}`);if(ok){showToast(t('orderDeleted'));if(Router.current.startsWith('/admin/orders'))loadAdminOrdersPage();else loadAdminPage()}}

// ==================== ADMIN ORDER DETAIL ====================
async function loadOrderDetailPage(id){
  if(!Store.isAdmin()){Router.navigate('/signin');return}
  const order=await API.get(`/api/orders/${id}`);if(order.error){renderPage(render404());return}
  const statuses=['pending','processing','shipped','completed','cancelled'];
  renderPage(`<div class="admin-page-inner">
    <div class="admin-page-header">
      <h2><i class="fas fa-receipt"></i> ${t('orderDetails')} #${order.id}</h2>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
        <button class="btn-primary btn-sm" onclick="generateInvoicePDF('${order.id}')"><i class="fas fa-file-pdf"></i> ${t('downloadInvoice')}</button>
        <span class="status-badge status-${order.status||'pending'}" style="font-size:.85rem;padding:.35rem 1.2rem">${t(order.status||'pending')}</span>
      </div></div>
    <div class="order-detail-grid">
      <div class="admin-form animate-fadeInLeft"><h3 style="margin-bottom:1rem;font-size:1rem;display:flex;align-items:center;gap:.4rem"><i class="fas fa-user" style="color:var(--accent)"></i>${t('customerInfo')}</h3>
        <form onsubmit="doUpdateOrder(event,'${order.id}')"><div class="form-grid">
        <div class="form-group"><label>${t('fullName')}</label><input type="text" id="oName" class="form-input" value="${order.full_name||''}"></div>
        <div class="form-group"><label>${t('phone')}</label><input type="tel" id="oPhone" class="form-input" value="${order.phone||''}"></div>
        <div class="form-group"><label>${t('phone2')}</label><input type="tel" id="oPhone2" class="form-input" value="${order.phone2||''}"></div>
        <div class="form-group"><label>${t('email')}</label><input type="email" id="oEmail" class="form-input" value="${order.email||''}"></div>
        <div class="form-group"><label>${t('governorate')}</label><input type="text" id="oGov" class="form-input" value="${order.governorate||''}"></div>
        <div class="form-group"><label>${t('city')}</label><input type="text" id="oCity" class="form-input" value="${order.city||''}"></div>
        <div class="form-group form-full"><label>${t('address')}</label><textarea id="oAddr" class="form-input" rows="2">${order.address||''}</textarea></div>
        <div class="form-group form-full"><label>${t('notes')}</label><textarea id="oNotes" class="form-input" rows="2">${order.notes||''}</textarea></div>
        <div class="form-group"><label>${t('orderStatus')}</label><select id="oStatus" class="form-input">${statuses.map(s=>`<option value="${s}" ${order.status===s?'selected':''}>${t(s)}</option>`).join('')}</select></div>
        </div><div style="display:flex;gap:.5rem;margin-top:1rem"><button type="submit" class="btn-success"><i class="fas fa-save"></i> ${t('save')}</button>
        <button type="button" class="btn-danger" onclick="delOrder('${order.id}')"><i class="fas fa-trash"></i> ${t('deleteOrder')}</button></div></form>
      </div>
      <div class="animate-fadeInRight">
        <div class="admin-form" style="margin-bottom:1rem"><h3 style="margin-bottom:.8rem;font-size:1rem;display:flex;align-items:center;gap:.4rem"><i class="fas fa-shopping-bag" style="color:var(--accent)"></i>${t('orderItems')}</h3>
        ${(order.items||[]).map(it=>`<div style="display:flex;gap:.6rem;padding:.6rem 0;border-bottom:1px solid var(--border);align-items:center">
          <img src="${it.product_img||'/static/images/1.png'}" style="width:44px;height:44px;border-radius:8px;object-fit:cover" onerror="this.src='/static/images/1.png'">
          <div style="flex:1"><p style="font-size:.85rem;font-weight:600">${Store.lang==='ar'?it.title_ar:it.title_en}</p><p style="font-size:.75rem;color:var(--text-secondary)">${t('quantity')}: ${it.quantity} x ${formatPrice(it.price)}${it.selected_size?' | '+it.selected_size:''}${it.selected_color?' | '+it.selected_color:''}</p></div>
          <span style="font-weight:700;color:var(--accent);font-size:.9rem">${formatPrice(it.price*it.quantity)}</span></div>`).join('')}
        <div style="display:flex;justify-content:space-between;margin-top:1rem;padding-top:.8rem;border-top:2px solid var(--accent);font-weight:800;font-size:1.1rem"><span>${t('total')}</span><span style="color:var(--accent)">${formatPrice(order.total)}</span></div></div>
        <div class="admin-form"><h3 style="margin-bottom:.5rem;font-size:.9rem"><i class="fas fa-info-circle" style="color:var(--accent);margin-inline-end:.3rem"></i>${Store.lang==='ar'?'معلومات إضافية':'Additional Info'}</h3>
        <p style="font-size:.8rem;color:var(--text-secondary);margin-bottom:.3rem"><i class="fas fa-calendar" style="margin-inline-end:.3rem;color:var(--accent)"></i>${t('orderDate')}: ${new Date(order.created_at).toLocaleString(Store.lang==='ar'?'ar-EG':'en-US')}</p>
        <p style="font-size:.8rem;color:var(--text-secondary)"><i class="fas fa-user" style="margin-inline-end:.3rem;color:var(--accent)"></i>${order.user_name||''} (${order.user_email||''})</p></div>
      </div></div></div>`)}
async function doUpdateOrder(e,id){e.preventDefault();
  const{ok}=await API.put(`/api/orders/${id}`,{full_name:document.getElementById('oName').value,phone:document.getElementById('oPhone').value,phone2:document.getElementById('oPhone2').value,email:document.getElementById('oEmail').value,governorate:document.getElementById('oGov').value,city:document.getElementById('oCity').value,address:document.getElementById('oAddr').value,notes:document.getElementById('oNotes').value,status:document.getElementById('oStatus').value});
  if(ok){showToast(t('orderUpdated'));loadOrderDetailPage(id)}else showToast(t('error'),'error')}

// ==================== ADMIN USERS ====================
async function loadAdminUsersPage(){
  if(!Store.isAdmin()){Router.navigate('/signin');return}
  const _au=await API.get('/api/admin/users');const users=Array.isArray(_au)?_au:[];
  renderPage(`<div class="admin-page-inner">
    <div class="admin-page-header"><h2><i class="fas fa-users"></i> ${t('manageUsers')}</h2>
    <span class="status-badge status-processing" style="font-size:.85rem;padding:.35rem 1rem">${users.length} ${t('users')}</span></div>
    <div class="admin-list">${users.map(u=>`<div class="admin-row">
      <div style="width:44px;height:44px;border-radius:50%;background:${u.role==='admin'?'linear-gradient(135deg,var(--accent),var(--accent-light))':'rgba(59,130,246,.1)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;color:${u.role==='admin'?'var(--primary-dark)':'#3b82f6'}"><i class="fas ${u.role==='admin'?'fa-user-shield':'fa-user'}"></i></div>
      <div class="admin-row-info"><h4>${u.name}</h4><p>${u.email} · ${u.role} · ${new Date(u.created_at).toLocaleDateString(Store.lang==='ar'?'ar-EG':'en-US')}</p></div>
      <span class="status-badge ${u.role==='admin'?'status-completed':'status-processing'}">${u.role}</span>
      ${u.role!=='admin'?`<button class="icon-btn" style="width:32px;height:32px;font-size:.75rem;background:rgba(239,68,68,.1);color:var(--error);border-color:rgba(239,68,68,.2)" onclick="deleteUser('${u.id}')" title="${t('deleteUser')}"><i class="fas fa-trash"></i></button>`:`<span style="width:32px"></span>`}
    </div>`).join('')}</div></div>`)}
async function deleteUser(id){if(!confirm(t('confirmDelete')))return;const{ok,data}=await API.del(`/api/admin/users/${id}`);if(ok){showToast(t('userDeleted'));loadAdminUsersPage()}else showToast(data.error||t('error'),'error')}

// ==================== ABOUT / CATEGORIES / 404 ====================
function loadAboutPage(){
  renderPage(`<div class="about-hero animate-fadeInUp"><img src="${LOGO}" style="width:100px;height:100px;margin:0 auto 1.5rem;border-radius:20px;animation:float 3s ease-in-out infinite"><h1>${t('aboutTitle')}</h1><p style="margin-top:1rem">${t('aboutDesc')}</p></div>
  <section class="section"><div class="features-grid">
    <div class="feature-card animate-on-scroll"><div class="feature-icon"><i class="fas fa-bullseye"></i></div><h3>${Store.lang==='ar'?'رؤيتنا':'Our Vision'}</h3><p>${Store.lang==='ar'?'أن نكون الوجهة الأولى للتسوق الإلكتروني في مصر':'To be the premier online shopping destination in Egypt'}</p></div>
    <div class="feature-card animate-on-scroll"><div class="feature-icon"><i class="fas fa-heart"></i></div><h3>${Store.lang==='ar'?'قيمنا':'Our Values'}</h3><p>${Store.lang==='ar'?'الجودة والأمانة والثقة أساس عملنا':'Quality, integrity and trust are our foundation'}</p></div>
    <div class="feature-card animate-on-scroll"><div class="feature-icon"><i class="fas fa-rocket"></i></div><h3>${Store.lang==='ar'?'مهمتنا':'Our Mission'}</h3><p>${Store.lang==='ar'?'توفير أفضل المنتجات بأفضل الأسعار مع خدمة متميزة':'Providing the best products at the best prices with excellent service'}</p></div>
  </div></section>`)}

async function loadCategoriesPage(){
  if(!Store.categories.length){const _c=await API.get('/api/categories');Store.categories=Array.isArray(_c)?_c:[]}
  renderPage(`<section class="section"><div class="section-header"><h2 class="section-title">${t('categories')}</h2></div>
  <div class="features-grid">${Store.categories.map((c,i)=>`<a href="/shop?category=${encodeURIComponent(c.name_en)}" class="feature-card animate-on-scroll" style="text-decoration:none;animation-delay:${i*.08}s"><div class="feature-icon"><i class="fas ${c.icon||'fa-tag'}"></i></div><h3>${getCatName(c)}</h3></a>`).join('')}</div></section>`)}

function render404(){return`<div class="empty-state" style="min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center"><i class="fas fa-exclamation-triangle" style="font-size:4rem;color:var(--accent);margin-bottom:1rem;animation:float 2s ease-in-out infinite"></i><h2 style="font-size:2.5rem;font-weight:900">404</h2><p style="font-size:1rem;margin-bottom:1.5rem">${Store.lang==='ar'?'الصفحة غير موجودة':'Page not found'}</p><a href="/" class="btn-primary" style="text-decoration:none"><i class="fas fa-home"></i> ${t('home')}</a></div>`}

// ==================== INIT ====================
async function initApp(){
  document.documentElement.setAttribute('data-theme',Store.theme);
  document.documentElement.lang=Store.lang;document.documentElement.dir=Store.lang==='ar'?'rtl':'ltr';
  if(Store.token){const r=await API.get('/api/me');const user=r.user||r;if(user&&user.id){Store.user=user;await loadCartData()}else Store.setUser(null,null)}
  try{const _cats=await API.get('/api/categories');Store.categories=Array.isArray(_cats)?_cats:[]}catch(e){}
  Router.register('/',loadHomePage);
  Router.register('/shop',loadShopPage);
  Router.register('/product/:id',loadProductDetails);
  Router.register('/cart',loadCartPage);
  Router.register('/wishlist',loadWishlistPage);
  Router.register('/signin',loadSigninPage);
  Router.register('/register',loadRegisterPage);
  Router.register('/profile',loadProfilePage);
  Router.register('/admin',loadAdminPage);
  Router.register('/admin/products',loadAdminProductsPage);
  Router.register('/admin/add-product',()=>{loadAddProductPage();setTimeout(afterFormRender,100)});
  Router.register('/admin/edit-product/:id',(id)=>{loadEditProductPage(id).then(()=>setTimeout(afterFormRender,100))});
  Router.register('/admin/orders',loadAdminOrdersPage);
  Router.register('/admin/orders/:id',loadOrderDetailPage);
  Router.register('/admin/users',loadAdminUsersPage);
  Router.register('/about',loadAboutPage);
  Router.register('/categories',loadCategoriesPage);
  Router.resolve()}
initApp();
