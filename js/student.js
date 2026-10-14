/* Pupil page: sign-in is required before the test. Answers are saved to Firestore.
   Pupils never see marks: the page has no answer key and cannot read results. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = document.getElementById('app');
if (!isConfigured()) { app.innerHTML = SETUP_MSG; throw new Error('Firebase not configured'); }
const fb = initializeApp(window.FIREBASE_CONFIG);
const auth = getAuth(fb);
const db = getFirestore(fb);

let user = null, prof = null, rec = null, step = 0, view = 'loading', confirming = false, authMode = 'signup', authMsg = '', errMsg = '';

/* ---------- auth state ---------- */
onAuthStateChanged(auth, async u => {
  user = u;
  if (!u) { view = 'login'; render(); return; }
  view = 'loading'; render();
  try {
    const ps = await getDoc(doc(db, 'students', u.uid));
    prof = ps.exists() ? ps.data() : null;
    if (prof && prof.submitted) { view = 'done'; render(); return; }
    if (!prof || !prof.name) { view = 'profile'; render(); return; }
    await startOrResume();
  } catch (e) { errMsg = 'Could not connect. Check the internet and reload the page.'; view = 'error'; render(); }
});

async function startOrResume() {
  let d = null;
  try { const ds = await getDoc(doc(db, 'drafts', user.uid)); if (ds.exists()) d = ds.data(); } catch (e) {}
  rec = { answers: (d && d.answers) || {}, startedAt: (d && d.startedAt) || new Date().toISOString() };
  step = (d && d.step) || 0; confirming = false; view = 'test'; render(); window.scrollTo(0, 0);
}

/* ---------- draft saving (so a pupil can continue later) ---------- */
let draftTimer = null, draftChain = Promise.resolve();
function saveDraft() {
  clearTimeout(draftTimer);
  draftTimer = setTimeout(() => {
    const data = { answers: JSON.parse(JSON.stringify(rec.answers)), step, startedAt: rec.startedAt, updated: serverTimestamp() };
    draftChain = draftChain.then(() => setDoc(doc(db, 'drafts', user.uid), data)).catch(() => {});
  }, 1200);
}

/* ---------- views ---------- */
function vLogin() {
  const deco = ['pencil', 'teddy', 'kite', 'apple', 'dress', 'dog'].map((n, i) => `<figure class="pic" style="--r:${[-4,3,-2,4,-3,2][i]}deg">${pic(n)}</figure>`).join('');
  const signup = authMode === 'signup';
  return `<div class="hero">
   <span class="badge" style="color:var(--accent);justify-self:start">Teacher-Created Diagnostic Assessment</span>
   <div><h1>My English Check</h1><p class="sub">Placement test · Family and Friends 1 · Starter Unit to Unit 10 · Grades 4–5</p></div>
   <div class="cards">${deco}</div>
   <div class="authbox">
     <h2 style="font-size:1.4rem">Sign in to start the test</h2>
     <p class="ar">سجّل الدخول لتبدأ الاختبار.</p>
     <button class="btn google" data-act="google">${GOOGLE_G} Sign in with Google · الدخول بحساب Google</button>
     <div class="or"><span>or · أو</span></div>
     <div class="tabs" role="tablist" style="margin:0">
       <button role="tab" aria-selected="${signup}" data-act="mode" data-m="signup">Create account · حساب جديد</button>
       <button role="tab" aria-selected="${!signup}" data-act="mode" data-m="signin">Sign in · تسجيل الدخول</button>
     </div>
     <label class="fl" for="em">Email · البريد الإلكتروني <input class="f" id="em" type="email" autocomplete="email" inputmode="email"></label>
     <label class="fl" for="pw">Password · كلمة المرور <input class="f" id="pw" type="password" autocomplete="${signup ? 'new-password' : 'current-password'}" minlength="6"></label>
     ${signup ? '<p class="hint">At least 6 characters. Remember it! · 6 أحرف على الأقل، احفظها جيداً.</p>' : ''}
     <div class="row"><button class="btn primary" data-act="email">${signup ? 'Create account · إنشاء الحساب' : 'Sign in · دخول'}</button>${signup ? '' : '<button class="link" data-act="reset">Forgot password? · نسيت كلمة المرور؟</button>'}</div>
     ${authMsg ? `<p class="notice" role="alert">${authMsg}</p>` : ''}
     <p class="hint ar">إذا فتحت الرابط من داخل واتساب ولم يعمل زر Google، افتحه في متصفح Chrome أو Safari، أو استخدم البريد وكلمة المرور.</p>
   </div>
   <p class="disclaim">A teacher-made diagnostic test based on the published syllabus of <i>Family and Friends 1</i> (1st edition, Oxford University Press). It is not an official Oxford University Press test. All pictures and the reading text are original.</p>
  </div>`;
}
function vProfile() {
  return `<div class="panel" style="max-width:560px;margin:30px auto">
   <h2>Hello! Tell us about you.</h2><p class="ar">مرحباً! اكتب اسمك وصفّك.</p>
   <label class="fl" for="sname">Your full name · اسمك الكامل <input class="f" id="sname" autocomplete="name" value="${esc(user.displayName || '')}"></label>
   <label class="fl" for="sclass">Class or group · الصف أو المجموعة <input class="f" id="sclass" autocomplete="off" placeholder="e.g. 4B"></label>
   <p class="notice">The test has 5 parts (about 30 minutes). Some questions say <b>Challenge</b> – try them if you can, it is OK to skip them. Your answers are saved as you go.<br><span class="ar">الاختبار 5 أجزاء (نحو 30 دقيقة). الأسئلة المكتوب عليها Challenge اختيارية. إجاباتك تُحفظ تلقائياً.</span></p>
   ${authMsg ? `<p class="notice" role="alert">${authMsg}</p>` : ''}
   <div class="row"><button class="btn primary" data-act="saveprof">Start the test · ابدأ الاختبار</button><button class="link" data-act="logout">Sign out</button></div>
  </div>`;
}
function vDone() {
  return `<div class="panel" style="text-align:center;justify-items:center;margin-top:20px"><div class="done-pic">${['kite','teddy','ball'].map(n => `<figure class="pic">${pic(n)}</figure>`).join('')}</div>
   <h1 style="font-size:2.3rem">Well done${prof && prof.name ? ', ' + esc(prof.name.split(' ')[0]) : ''}!</h1>
   <p>You finished the test. Your teacher will check it and talk to you about the speaking part.</p>
   <p class="ar" style="text-align:center">أحسنت! انتهيت من الاختبار. سيراجعه معلمك ويتواصل معك من أجل جزء المحادثة.</p>
   <button class="btn" data-act="logout">Sign out · خروج</button></div>`;
}
function stepsBar() { return `<div class="steps" aria-label="Test progress">${SEC.map((s, i) => `<i class="${i === step ? 'on' : i < step ? 'done' : ''}" style="--sec:var(--s${s.id})">${s.id}</i>`).join('')}</div>`; }
function itemHTML(it, n) {
  const v = rec.answers[it.id]; let body = '';
  if (it.type === 'mcq') body = `<div class="opts" role="group">${it.opts.map(o => `<button type="button" class="opt" data-act="pick" data-id="${it.id}" data-v="${esc(o)}" aria-pressed="${v === o}">${esc(o)}</button>`).join('')}</div>`;
  if (it.type === 'pick') body = `<div class="pickgrid" role="group">${it.opts.map((p, i) => `<button type="button" class="pickopt" data-act="pick" data-id="${it.id}" data-v="${p}" aria-pressed="${v === p}" aria-label="Picture ${'abc'[i]}"><span class="pl">${'abc'[i]}</span>${pic(p)}</button>`).join('')}</div>`;
  if (it.type === 'type') body = `<input class="tin" id="in-${it.id}" data-id="${it.id}" value="${esc(v || '')}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="write here" aria-label="Answer ${n}" style="${it.wide ? 'width:min(100%,420px)' : ''}">${it.hint ? `<span class="hint">${it.hint}</span>` : ''}`;
  if (it.type === 'build') {
    const sel = Array.isArray(v) ? v : [];
    body = `<div class="bline ${it.letters ? 'letters' : ''}" aria-label="Your answer">${sel.length ? sel.map((ti, k) => `<button type="button" class="tile on" data-act="untile" data-id="${it.id}" data-k="${k}">${esc(it.tiles[ti])}</button>`).join('') + (it.end ? `<span class="end">${it.end}</span>` : '') : `<span class="ph">Tap the ${it.letters ? 'letters' : 'words'} below</span>`}</div>
    <div class="bbank ${it.letters ? 'letters' : ''}">${it.tiles.map((t, ti) => `<button type="button" class="tile" data-act="tile" data-id="${it.id}" data-t="${ti}" ${sel.includes(ti) ? 'disabled' : ''}>${esc(t)}</button>`).join('')}</div>
    ${sel.length ? `<button type="button" class="link" data-act="cleartile" data-id="${it.id}" style="justify-self:start">Start again</button>` : ''}`;
  }
  if (it.type === 'write') body = `<div class="helper">${it.helper.map(h => `<span>${esc(h)}</span>`).join('')}</div><p class="frames">Help: ${esc(it.frames)}</p><textarea class="wr" id="in-${it.id}" data-id="${it.id}" rows="4" spellcheck="false" aria-label="Your sentences">${esc(v || '')}</textarea>`;
  const prompt = it.prompt ? `<p class="prompt">${fmtPrompt(it.prompt, (it.type === 'mcq' && it.prompt.includes('___')) ? v : '')}</p>` : '';
  return `<div class="item ${it.big ? 'hasbig' : ''} ${it.pic || it.big ? '' : 'nopic'}" id="it-${it.id}"><div class="qn">${n}</div>${it.pic ? `<figure class="pic ${picClass(it.pic)}">${pic(it.pic)}</figure>` : ''}${it.big ? `<div class="big" aria-label="Capital letter ${it.big}">${it.big}</div>` : ''}<div class="qb">${prompt}${body}</div></div>`;
}
function vTest() {
  const s = SEC[step]; let n = 0;
  let h = `<div class="topbar"><span class="who">${esc(prof.name)}${prof.cls ? ` · ${esc(prof.cls)}` : ''} <button class="link" data-act="logout">Sign out</button></span>${stepsBar()}</div>
   <header class="sechead" style="--sec:var(--s${s.id})"><span class="tab">${s.id}</span><div class="grow"><h2>${s.title}</h2><p class="ar">${s.ar}</p></div><span class="muted" style="font-size:.9rem">Part ${step + 1} of ${SEC.length}</span></header>`;
  if (s.passage) h += `<article class="passage"><div class="text"><h3>Lucy's family</h3>${PASSAGE.map(p => `<p>${esc(p)}</p>`).join('')}</div><figure class="pic xwide">${pic('reading')}</figure></article>`;
  s.ex.forEach((ex, ei) => {
    h += `<section class="ex lv${ex.level}"><div class="exhead"><span class="lvl ${ex.level}">${LVN[ex.level]}</span><h3>${s.id}${ei + 1}. ${ex.instr}</h3><p class="ar">${ex.ar}</p>${ex.level === 'C' ? `<span class="challenge-note">Challenge – try it if you can. You can skip it. · تحدٍّ: حاول إن استطعت</span>` : ''}</div>`;
    if (ex.bank) h += `<div class="bank" aria-label="Word box">${ex.bank.map(w => `<span>${esc(w)}</span>`).join('')}</div>`;
    h += `<div class="items">${ex.items.map(it => itemHTML(it, ++n)).join('')}</div></section>`;
  });
  const last = step === SEC.length - 1;
  h += `<div class="navbar"><button class="btn" data-act="prev" ${step ? '' : 'disabled'}>← Back</button><button class="btn ${last ? 'sun' : 'primary'}" data-act="next">${last ? 'Finish the test' : 'Next part →'}</button></div>`;
  return h;
}
function vConfirm() {
  const core = allItems().filter(x => x.ex.level !== 'C'); const miss = core.filter(x => !answered(x.it, rec)).length;
  return `<div class="panel" style="margin-top:20px"><h2>Are you finished?</h2><p>You answered <b>${core.length - miss}</b> of <b>${core.length}</b> main questions.${miss ? ` <b>${miss}</b> main questions are empty.` : ''}</p><p class="ar">هل انتهيت؟ بعد الإرسال لا يمكنك تغيير إجاباتك.</p>${errMsg ? `<p class="notice" role="alert">${esc(errMsg)}</p>` : ''}<div class="row"><button class="btn" data-act="backtotest">← Check my answers</button><button class="btn sun" data-act="submit">Send my test · أرسل الاختبار</button></div></div>`;
}
const GOOGLE_G = `<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;

function render() {
  let h = '';
  if (view === 'loading') h = `<div class="panel" style="margin-top:40px"><p>Loading… · جارٍ التحميل…</p></div>`;
  else if (view === 'login') h = vLogin();
  else if (view === 'profile') h = vProfile();
  else if (view === 'test') h = confirming ? vConfirm() : vTest();
  else if (view === 'done') h = vDone();
  else if (view === 'error') h = `<div class="panel" style="margin-top:40px"><h2>Sorry</h2><p>${esc(errMsg)}</p><p class="ar">تعذّر الاتصال. تحقق من الإنترنت ثم أعد تحميل الصفحة.</p></div>`;
  app.innerHTML = h;
}
function rerenderItem(id) { const it = allItems().find(x => x.it.id === id).it; const el = document.getElementById('it-' + id); if (!el) return; el.outerHTML = itemHTML(it, el.querySelector('.qn').textContent); }

/* ---------- actions ---------- */
async function doSubmit(btn) {
  btn.disabled = true; errMsg = '';
  clearTimeout(draftTimer);
  const data = { uid: user.uid, email: user.email || '', name: prof.name, cls: prof.cls || '', answers: JSON.parse(JSON.stringify(rec.answers)), startedAt: rec.startedAt, date: new Date().toISOString(), submittedAt: serverTimestamp() };
  try {
    await setDoc(doc(db, 'results', user.uid), data);
  } catch (e) {
    if (e && e.code === 'permission-denied') { /* already sent before */ }
    else { errMsg = 'The test was not sent. Check the internet and press Send again.'; btn.disabled = false; render(); return; }
  }
  try { await setDoc(doc(db, 'students', user.uid), { submitted: true }, { merge: true }); } catch (e) {}
  try { await deleteDoc(doc(db, 'drafts', user.uid)); } catch (e) {}
  prof = Object.assign({}, prof, { submitted: true }); view = 'done'; render(); window.scrollTo(0, 0);
}
app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act, id = b.dataset.id;
  if (a === 'google') {
    authMsg = '';
    try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch (err) { authMsg = authError(err); render(); }
  } else if (a === 'mode') { authMode = b.dataset.m; authMsg = ''; render(); }
  else if (a === 'email') {
    const em = document.getElementById('em').value.trim(), pw = document.getElementById('pw').value;
    authMsg = ''; b.disabled = true;
    try { if (authMode === 'signup') await createUserWithEmailAndPassword(auth, em, pw); else await signInWithEmailAndPassword(auth, em, pw); }
    catch (err) { authMsg = authError(err); render(); const x = document.getElementById('em'); if (x) x.value = em; }
  } else if (a === 'reset') {
    const em = document.getElementById('em').value.trim();
    if (!em) { authMsg = 'Write your email first, then press "Forgot password?".<br><span class="ar">اكتب بريدك أولاً ثم اضغط «نسيت كلمة المرور».</span>'; render(); return; }
    try { await sendPasswordResetEmail(auth, em); authMsg = 'We sent you an email to make a new password.<br><span class="ar">أرسلنا لك رسالة لتغيير كلمة المرور.</span>'; } catch (err) { authMsg = authError(err); }
    render(); const x = document.getElementById('em'); if (x) x.value = em;
  } else if (a === 'saveprof') {
    const nm = document.getElementById('sname').value.trim(), cl = document.getElementById('sclass').value.trim();
    if (nm.length < 2) { authMsg = 'Please write your name. · اكتب اسمك من فضلك.'; render(); return; }
    b.disabled = true;
    try { await setDoc(doc(db, 'students', user.uid), { name: nm, cls: cl, email: user.email || '', submitted: false, created: serverTimestamp() }, { merge: true }); prof = { name: nm, cls: cl, submitted: false }; authMsg = ''; await startOrResume(); }
    catch (err) { authMsg = 'Could not save. Check the internet and try again. · تعذّر الحفظ.'; render(); }
  } else if (a === 'logout') { clearTimeout(draftTimer); await signOut(auth); }
  else if (a === 'pick') { rec.answers[id] = b.dataset.v; saveDraft(); rerenderItem(id); }
  else if (a === 'tile') { const arr = Array.isArray(rec.answers[id]) ? rec.answers[id] : []; arr.push(+b.dataset.t); rec.answers[id] = arr; saveDraft(); rerenderItem(id); }
  else if (a === 'untile') { const arr = rec.answers[id] || []; arr.splice(+b.dataset.k, 1); rec.answers[id] = arr; saveDraft(); rerenderItem(id); }
  else if (a === 'cleartile') { rec.answers[id] = []; saveDraft(); rerenderItem(id); }
  else if (a === 'next') { if (step < SEC.length - 1) { step++; saveDraft(); render(); window.scrollTo(0, 0); } else { confirming = true; errMsg = ''; render(); window.scrollTo(0, 0); } }
  else if (a === 'prev') { if (step > 0) { step--; saveDraft(); render(); window.scrollTo(0, 0); } }
  else if (a === 'backtotest') { confirming = false; render(); }
  else if (a === 'submit') { doSubmit(b); }
});
app.addEventListener('input', e => { const t = e.target; if (t.dataset.id && rec && view === 'test') { rec.answers[t.dataset.id] = t.value; saveDraft(); } });
app.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.target.id === 'pw' || e.target.id === 'em')) { e.preventDefault(); app.querySelector('[data-act="email"]')?.click(); } });
render();
