/* Shared helpers for the pupil page and the teacher page. */
const SK={vocab:'Vocabulary',grammar:'Grammar',reading:'Reading',phonics:'Phonics & spelling',writing:'Writing',speaking:'Speaking'};
const LVN={A:'Level A · Foundation',B:'Level B · Developing',C:'Level C · Challenge'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function fmtPrompt(p,fill){return esc(p).replace('___',`<span class="gap">${fill?esc(fill):'&nbsp;'}</span>`)}
const fmtDate=d=>{try{const x=d&&d.toDate?d.toDate():new Date(d);return x.toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})}catch(e){return ''}};
const allItems=()=>SEC.flatMap(s=>s.ex.flatMap(ex=>ex.items.map(it=>({it,ex,s}))));
const builtText=(it,v)=>Array.isArray(v)?v.map(i=>it.tiles[i]).join(it.letters?'':' '):'';
const answered=(it,r)=>{const v=(r.answers||{})[it.id];return Array.isArray(v)?v.length>0:!!(v&&String(v).trim())};
const isConfigured=()=>{const c=window.FIREBASE_CONFIG;return !!(c&&c.apiKey&&!String(c.apiKey).startsWith('PASTE'))};
const SETUP_MSG=`<div class="panel" style="margin-top:30px"><h2>The website is not connected yet</h2><p>Open <b>js/firebase-config.js</b> and paste your Firebase settings, as shown in the setup guide (README-AR.md).</p><p class="ar">الموقع غير مربوط بعد. افتح الملف js/firebase-config.js والصق إعدادات Firebase كما في دليل الإعداد.</p></div>`;
function authError(e){
  const c=(e&&e.code)||'';
  const m={
    'auth/invalid-email':['This email is not correct.','البريد الإلكتروني غير صحيح.'],
    'auth/email-already-in-use':['This email already has an account. Choose "Sign in".','هذا البريد له حساب. اختر «تسجيل الدخول».'],
    'auth/weak-password':['The password needs at least 6 characters.','كلمة المرور يجب أن تكون 6 أحرف على الأقل.'],
    'auth/invalid-credential':['Email or password is not right.','البريد أو كلمة المرور غير صحيحة.'],
    'auth/wrong-password':['Email or password is not right.','البريد أو كلمة المرور غير صحيحة.'],
    'auth/user-not-found':['There is no account with this email. Choose "Create account".','لا يوجد حساب بهذا البريد. اختر «إنشاء حساب».'],
    'auth/too-many-requests':['Too many tries. Wait a few minutes and try again.','محاولات كثيرة. انتظر قليلاً ثم حاول مجدداً.'],
    'auth/network-request-failed':['No internet connection. Check it and try again.','لا يوجد اتصال بالإنترنت.'],
    'auth/popup-closed-by-user':['The Google window was closed. Try again.','أُغلقت نافذة Google. حاول مرة أخرى.'],
    'auth/popup-blocked':['The browser blocked the Google window. Allow pop-ups, or use email and password.','المتصفح منع نافذة Google. اسمح بالنوافذ المنبثقة أو استخدم البريد وكلمة المرور.'],
    'auth/unauthorized-domain':['This website address is not allowed in Firebase yet (see the setup guide, step 6).','عنوان الموقع غير مضاف في Firebase بعد (انظر الخطوة 6 في الدليل).'],
    'auth/operation-not-allowed':['This sign-in method is not turned on in Firebase (see the setup guide, step 3).','طريقة الدخول هذه غير مفعّلة في Firebase (الخطوة 3).']
  }[c]||['Something went wrong. Please try again.','حدث خطأ. حاول مرة أخرى.'];
  return `${esc(m[0])}<br><span class="ar">${esc(m[1])}</span>`;
}
function flash(t){let el=document.getElementById('flash');if(!el){el=document.createElement('div');el.id='flash';el.className='flash';el.setAttribute('role','status');document.body.appendChild(el)}el.textContent=t;el.hidden=false;clearTimeout(flash._t);flash._t=setTimeout(()=>el.hidden=true,2200)}
