/* Student page: sign-in is required. After sending, the student sees the score and every mistake,
   and later the teacher's level and feedback (updates live). One attempt per account. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = document.getElementById('app');
if (!isConfigured()) { app.innerHTML = `<div class="card"><p>The website is not connected to Firebase yet.</p></div>`; throw new Error('not configured'); }
const fb = initializeApp(window.FIREBASE_CONFIG);
const auth = getAuth(fb);
const db = getFirestore(fb);

let user = null, view = 'loading', mode = 'signup', msg = '', result = null, unsub = null, showAll = false;
let answers = {}, writing = { w1: '', w2: '', w3: '' }, name = '';

const draftKey = () => 'cefr-draft-' + (user ? user.uid : '');
function loadDraft() { try { const d = JSON.parse(localStorage.getItem(draftKey()) || 'null'); if (d) { answers = d.answers || {}; writing = Object.assign(writing, d.writing || {}); name = d.name || name; } } catch (e) {} }
let dt = null;
function saveDraft() { clearTimeout(dt); dt = setTimeout(() => { try { localStorage.setItem(draftKey(), JSON.stringify({ answers, writing, name })); } catch (e) {} }, 400); }

onAuthStateChanged(auth, async u => {
  if (unsub) { unsub(); unsub = null; }
  user = u; result = null; msg = '';
  if (!u) { view = 'login'; render(); return; }
  view = 'loading'; render();
  answers = {}; writing = { w1: '', w2: '', w3: '' }; name = u.displayName || '';
  loadDraft();
  unsub = onSnapshot(doc(db, 'cefr_results', u.uid), snap => {
    if (snap.exists()) { result = snap.data(); view = 'result'; }
    else if (view !== 'test') { view = 'test'; }
    render();
  }, () => { view = 'error'; render(); });
});

/* ---------- views ---------- */
const G = `<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" style="vertical-align:-3px;margin-inline-end:6px"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;
const head = `<h1>English Placement Test</h1><p class="sub">CEFR A1 / A2 / B1 — Grammar, Vocabulary, Reading, Functional English &amp; Writing</p>`;

function vLogin() {
  const su = mode === 'signup';
  return head + `<div class="card">
    <h2>Sign in to start · سجّل الدخول لتبدأ</h2>
    <button class="btn ghost block" data-act="google">${G}Sign in with Google · الدخول بحساب Google</button>
    <div class="or">or · أو</div>
    <div class="tabs" role="tablist"><button role="tab" aria-selected="${su}" data-act="mode" data-m="signup">Create account · حساب جديد</button><button role="tab" aria-selected="${!su}" data-act="mode" data-m="signin">Sign in · دخول</button></div>
    <label class="field" for="em">Email · البريد الإلكتروني<input class="f" id="em" type="email" autocomplete="email" inputmode="email"></label>
    <label class="field" for="pw">Password · كلمة المرور<input class="f" id="pw" type="password" autocomplete="${su ? 'new-password' : 'current-password'}"></label>
    ${su ? '<p class="note">At least 6 characters. Remember it to see your results later. · 6 أحرف على الأقل، احفظها لترى نتيجتك لاحقاً.</p>' : ''}
    <div class="row"><button class="btn" data-act="email">${su ? 'Create account · إنشاء الحساب' : 'Sign in · دخول'}</button>${su ? '' : '<button class="link" data-act="reset">Forgot password? · نسيت كلمة المرور؟</button>'}</div>
    ${msg ? `<p class="notice" role="alert">${msg}</p>` : ''}
    <p class="ar" style="margin-top:10px">إذا فتحت الرابط من واتساب ولم يعمل زر Google، افتحه في Chrome أو Safari، أو استخدم البريد وكلمة المرور.</p>
  </div>`;
}
function vTest() {
  let h = head + `<div class="row between" style="margin-bottom:12px"><span class="muted" style="font-size:.9rem">${esc(user.email || '')}</span><button class="link" data-act="logout">Sign out</button></div>
  <div class="card"><label class="field" for="sname">Your full name · اسمك الكامل<input class="f" id="sname" value="${esc(name)}" autocomplete="name" placeholder="Enter your full name"></label>
  <p class="note">Answer every question. Your answers are kept on this device while you work. After you press <b>Submit</b> you will see your score and your mistakes.<br><span class="ar">أجب عن كل الأسئلة. بعد الضغط على Submit سترى علامتك وأخطاءك.</span></p></div>`;
  SECTIONS.forEach((sec, si) => {
    h += `<div class="card"><h2>${sec.name} <span class="muted" style="font-weight:400;font-size:.9rem">· ${sec.ar}</span></h2>`;
    sec.qs.forEach((q, qi) => {
      if (sec.name === 'Reading') { const p = PASSAGES.find(x => x.before === qi); if (p) h += `<div class="passage"><h3>${esc(p.title)}</h3>${p.text.map(t => `<p>${esc(t)}</p>`).join('')}</div>`; }
      const key = `s${si}q${qi}`;
      h += `<div class="q"><p>${qi + 1}. ${esc(q[0])}</p>${q[1].map((o, oi) => `<label class="opt"><input type="radio" name="${key}" value="${oi}" ${String(answers[key]) === String(oi) ? 'checked' : ''}>${esc(o)}</label>`).join('')}</div>`;
    });
    h += `</div>`;
  });
  h += `<div class="card"><h2>Writing <span class="muted" style="font-weight:400;font-size:.9rem">· الكتابة</span></h2>${WRITING.map(w => `<div class="q"><p>${w.level} — ${esc(w.task)}</p><p class="ar">${w.ar}</p><textarea id="${w.id}" data-w="${w.id}" spellcheck="false">${esc(writing[w.id] || '')}</textarea><p class="note" id="wc-${w.id}">${wordCount(writing[w.id])} words</p></div>`).join('')}</div>`;
  const left = SECTIONS.reduce((a, s, si) => a + s.qs.filter((q, qi) => answers[`s${si}q${qi}`] === undefined).length, 0);
  h += `<div id="submitbox">${msg ? `<p class="notice" role="alert">${msg}</p>` : ''}<button class="btn block" data-act="submit">Submit · أرسل الاختبار</button><p class="note" style="text-align:center;margin-top:8px" id="leftnote">${left ? `${left} questions not answered yet` : 'All questions answered'}</p></div>`;
  return h;
}
function vResult() {
  const r = result, s = scoreAnswers(r.answers), t = r.teacher || {};
  const pct = Math.round(s.total / s.max * 100);
  let h = head + `<div class="row between" style="margin-bottom:12px"><span class="muted" style="font-size:.9rem">${esc(r.name)} · ${esc(user.email || '')}</span><button class="link" data-act="logout">Sign out</button></div>`;
  h += `<div class="card"><h2>Your results · نتيجتك</h2>${s.sections.map(x => `<div class="score-row"><span>${x.name} <span class="muted">· ${x.ar}</span></span><b>${x.correct} / ${x.max}</b></div><div class="bar"><i style="width:${Math.round(x.correct / x.max * 100)}%"></i></div>`).join('')}
    <div class="total">Total: ${s.total} / ${s.max} (${pct}%)</div>
    <p class="note">This score covers Grammar, Vocabulary, Reading and Functional English. Your teacher will read your writing, assess listening and speaking, and give your final level.<br><span class="ar">هذه العلامة للقواعد والمفردات والقراءة واللغة في المواقف. سيقرأ المعلم كتابتك ويقيّم الاستماع والمحادثة ثم يحدد مستواك النهائي.</span></p></div>`;
  h += `<div class="card"><h2>Your teacher's feedback · ملاحظات المعلم</h2>${t.level || t.feedback ? `${t.level ? `<p style="font-size:1.15rem"><b>Your level: ${esc(t.level)}</b></p>` : ''}${t.feedback ? `<div class="writing">${esc(t.feedback)}</div>` : ''}` : `<p class="muted">Your teacher has not added feedback yet. It will appear here by itself.</p><p class="ar">لم يضف المعلم ملاحظاته بعد. ستظهر هنا تلقائياً.</p>`}</div>`;
  const wrong = s.sections.reduce((a, x) => a + x.items.filter(i => !i.ok).length, 0);
  h += `<div class="card"><div class="row between"><h2 style="border:0;margin:0;padding:0">${showAll ? 'All questions' : `Your mistakes (${wrong})`} · ${showAll ? 'كل الأسئلة' : 'أخطاؤك'}</h2><button class="btn ghost small" data-act="toggle">${showAll ? 'Show mistakes only' : 'Show all questions'}</button></div><div style="height:10px"></div>`;
  s.sections.forEach(x => {
    const list = x.items.filter(i => showAll || !i.ok); if (!list.length) return;
    h += `<h3 style="margin-top:12px">${x.name}</h3>`;
    list.forEach(i => {
      h += `<div class="review ${i.ok ? 'good' : 'bad'}"><div class="qt">${i.n}. ${esc(i.text)}</div>`
        + (i.ok ? `<div class="right">✓ ${esc(i.opts[i.answer])}</div>`
          : `<div class="yours">✗ Your answer: ${i.chosen === null ? '<i>no answer</i>' : esc(i.opts[i.chosen])}</div><div class="right">✓ Correct answer: ${esc(i.opts[i.answer])}</div>`) + `</div>`;
    });
  });
  if (!wrong && !showAll) h += `<p class="okbox">No mistakes. Excellent!</p>`;
  h += `</div>`;
  h += `<div class="card"><h2>Your writing · كتابتك</h2>${WRITING.map(w => `<h3>${w.level} — ${esc(w.task)}</h3><div class="writing" style="margin-bottom:12px">${r.writing && r.writing[w.id] ? esc(r.writing[w.id]) : '<i class="muted">Nothing written</i>'}</div>`).join('')}</div>`;
  h += `<details class="card"><summary>Reading passages</summary>${PASSAGES.map(p => `<div class="passage"><h3>${esc(p.title)}</h3>${p.text.map(x => `<p>${esc(x)}</p>`).join('')}</div>`).join('')}</details>`;
  return h;
}
function render() {
  if (view === 'loading') app.innerHTML = `<div class="card"><p>Loading… · جارٍ التحميل…</p></div>`;
  else if (view === 'login') app.innerHTML = vLogin();
  else if (view === 'test') app.innerHTML = vTest();
  else if (view === 'result') app.innerHTML = vResult();
  else app.innerHTML = `<div class="card"><h2>Connection problem</h2><p>Check the internet and reload the page.</p><p class="ar">تحقق من الإنترنت ثم أعد تحميل الصفحة.</p></div>`;
}
function updateLeft() { const el = document.getElementById('leftnote'); if (!el) return; const left = SECTIONS.reduce((a, s, si) => a + s.qs.filter((q, qi) => answers[`s${si}q${qi}`] === undefined).length, 0); el.textContent = left ? `${left} questions not answered yet` : 'All questions answered'; }

/* ---------- actions ---------- */
let confirmSkip = false;
async function submit(btn) {
  name = (document.getElementById('sname').value || '').trim();
  const box = document.getElementById('submitbox');
  if (name.length < 2) { msg = 'Please write your full name at the top. · اكتب اسمك الكامل في الأعلى.'; render(); document.getElementById('sname').focus(); return; }
  const left = SECTIONS.reduce((a, s, si) => a + s.qs.filter((q, qi) => answers[`s${si}q${qi}`] === undefined).length, 0);
  if (left && !confirmSkip) { confirmSkip = true; msg = `${left} questions are not answered. Press Submit again to send anyway. · ${left} سؤالاً بلا إجابة. اضغط Submit مرة أخرى للإرسال على أي حال.`; box.querySelector('.notice')?.remove(); box.insertAdjacentHTML('afterbegin', `<p class="notice" role="alert">${msg}</p>`); return; }
  btn.disabled = true; btn.textContent = 'Sending…';
  const s = scoreAnswers(answers);
  const data = { uid: user.uid, email: user.email || '', name, answers: Object.assign({}, answers), writing: Object.assign({}, writing),
    scores: Object.fromEntries(s.sections.map(x => [x.name, x.correct])), total: s.total, max: s.max, date: new Date().toISOString(), submittedAt: serverTimestamp() };
  try { await setDoc(doc(db, 'cefr_results', user.uid), data); try { localStorage.removeItem(draftKey()); } catch (e) {} msg = ''; window.scrollTo(0, 0); }
  catch (e) { msg = 'The test was not sent. Check the internet and press Submit again. · لم يُرسل الاختبار، تحقق من الإنترنت وأعد المحاولة.'; btn.disabled = false; btn.textContent = 'Submit · أرسل الاختبار'; box.querySelector('.notice')?.remove(); box.insertAdjacentHTML('afterbegin', `<p class="notice" role="alert">${msg}</p>`); }
}
app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
  if (a === 'google') { msg = ''; try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch (err) { msg = authError(err); render(); } }
  else if (a === 'mode') { mode = b.dataset.m; msg = ''; render(); }
  else if (a === 'email') {
    const em = document.getElementById('em').value.trim(), pw = document.getElementById('pw').value; msg = ''; b.disabled = true;
    try { if (mode === 'signup') await createUserWithEmailAndPassword(auth, em, pw); else await signInWithEmailAndPassword(auth, em, pw); }
    catch (err) { msg = authError(err); render(); document.getElementById('em').value = em; }
  }
  else if (a === 'reset') {
    const em = document.getElementById('em').value.trim();
    if (!em) msg = 'Write your email first. · اكتب بريدك أولاً.';
    else { try { await sendPasswordResetEmail(auth, em); msg = 'We sent you an email to make a new password. · أرسلنا لك رسالة لتغيير كلمة المرور.'; } catch (err) { msg = authError(err); } }
    render(); document.getElementById('em').value = em;
  }
  else if (a === 'logout') { await signOut(auth); }
  else if (a === 'submit') { submit(b); }
  else if (a === 'toggle') { showAll = !showAll; const y = window.scrollY; render(); window.scrollTo(0, y); }
});
app.addEventListener('change', e => { const t = e.target; if (t.type === 'radio' && view === 'test') { answers[t.name] = Number(t.value); confirmSkip = false; saveDraft(); updateLeft(); } });
app.addEventListener('input', e => {
  const t = e.target; if (view !== 'test') return;
  if (t.dataset.w) { writing[t.dataset.w] = t.value; const wc = document.getElementById('wc-' + t.dataset.w); if (wc) wc.textContent = wordCount(t.value) + ' words'; saveDraft(); }
  if (t.id === 'sname') { name = t.value; saveDraft(); }
});
app.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.target.id === 'pw' || e.target.id === 'em')) { e.preventDefault(); app.querySelector('[data-act="email"]')?.click(); } });
render();
