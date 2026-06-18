# Cyber Security Academy — موقع مستقل

موقع تعليمي كامل بنظام تسجيل دخول حقيقي (Firebase Authentication) وحفظ تقدم دائم لكل مستخدم (Firestore Database).

## التشغيل محليًا (لتجربة الموقع على جهازك قبل النشر)

1. ثبّت Node.js لو لسه مش مثبت عندك: https://nodejs.org (اختار النسخة LTS)
2. افتح Terminal / Command Prompt في مجلد المشروع ده، واكتب:

```
npm install
npm run dev
```

3. هيفتح لك رابط محلي زي `http://localhost:5173` افتحه في المتصفح وجرّب.

## ضبط حماية Firestore (مهم قبل النشر الحقيقي)

دلوقتي الداتابيز شغالة على "test mode" يعني أي حد يقدر يقرأ/يكتب — ده خطر لو الموقع بقى عام. لازم تروح:

Firebase Console → Firestore Database → تاب "Rules"، واستبدل المحتوى بده:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

ده معناه كل مستخدم يقدر يقرأ ويكتب بياناته الشخصية بس، ومحدش غيره يقدر يشوفها. اضغط "Publish" بعد ما تلصق الكود.

## النشر على الإنترنت (مجاني)

### الطريقة الأسهل: Vercel

1. اعمل حساب مجاني على https://vercel.com (تقدر تسجل بحساب GitHub أو Google مباشرة)
2. ارفع المجلد ده كمشروع على GitHub (أو اسحب المجلد مباشرة في صفحة Vercel "Add New Project" لو بيدعم drag & drop)
3. Vercel هيكتشف إنه مشروع Vite تلقائيًا، اضغط "Deploy"
4. بعد دقيقة هيديك رابط جاهز زي `cyber-security-academy.vercel.app`

### بديل: Netlify
نفس الخطوات تقريبًا على https://netlify.com

## ملاحظات أمان مهمة

- ملف `src/firebase.js` فيه مفاتيح Firebase الخاصة بمشروعك. الـ `apiKey` ده ليس سري بشكل خطير (Firebase مصمم كده، الحماية الحقيقية في Firestore Rules فوق)، لكن لو حابب تخفيه أكتر ممكن نستخدم Environment Variables بعدين.
- متنساش تطبق الـ Firestore Rules فوق قبل ما تشارك الرابط مع أي حد، وإلا أي حد يقدر يتلاعب ببيانات أي مستخدم.

## بنية المشروع

- `src/firebase.js` — اتصال Firebase (تسجيل دخول + قاعدة بيانات)
- `src/data.js` — كل محتوى الدروس، أسئلة CTF، التمارين، الشهادات
- `src/App.jsx` — الواجهة الكاملة ومنطق التطبيق
- `src/main.jsx` — نقطة بداية React
