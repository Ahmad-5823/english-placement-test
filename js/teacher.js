/* Teacher page: only emails in TEACHER_EMAILS (and in firestore.rules) can read results. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, updateDoc, deleteDoc, setDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = document.getElementById('app');
if (!isConfigured()) { app.innerHTML = SETUP_MSG; throw new Error('Firebase not configured'); }
const fb = initializeApp(window.FIREBASE_CONFIG);
const auth = getAuth(fb);
const db = getFirestore(fb);
const TEACHERS = (window.TEACHER_EMAILS || []).map(e => e.toLowerCase().trim());

let user = null, view = 'loading', tTab = 'results', openId = null, records = [], students = [], loadErr = '', authMsg = '', unsubs = [];

onAuthStateChanged(auth, u => {
  unsubs.forEach(f => f()); unsubs = []; records = []; students = []; openId = null; loadErr = '';
  user = u;
  if (!u) { view = 'login'; render(); return; }
  if (!TEACHERS.includes((u.email || '').toLowerCase())) { view = 'denied'; render(); return; }
  view = 'teacher'; render();
  unsubs.push(onSnapshot(collection(db, 'results'), snap => {
    records = snap.docs.map(d => Object.assign({ id: d.id }, d.data())).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    loadErr = ''; if (!document.activeElement || !document.activeElement.matches('textarea')) rerender();
  }, err => { loadErr = 'Results could not be loaded. Check that firestore.rules has your email (setup guide, step 5).'; rerender(); }));
  unsubs.push(onSnapshot(collection(db, 'students'), snap => {
    students = snap.docs.map(d => Object.assign({ id: d.id }, d.data())); rerender();
  }, () => {}));
});
function rerender() { if (view !== 'teacher') return; const y = window.scrollY; render(); window.scrollTo(0, y); }

/* ---------- saving teacher marks ---------- */
const timers = {}; let chain = Promise.resolve();
function saveMarks(r) {
  clearTimeout(timers[r.id]);
  timers[r.id] = setTimeout(() => {
    const t = JSON.parse(JSON.stringify(r.teacher || {}));
    chain = chain.then(() => updateDoc(doc(db, 'results', r.id), { teacher: t })).then(() => flash('Saved'), () => flash('Not saved – check the internet'));
  }, 700);
}

/* ---------- views ---------- */
const BAND_CHIP = b => b ? `<span class="chip b${b}">${BANDN[b]}</span>` : `<span class="chip b0">Needs marking</span>`;
function bar(c) { const pct = c.m ? Math.round(c.g / c.m * 100) : 0; return c.p ? `<span class="muted" style="font-size:.85rem">to mark</span>` : `<div class="bar"><div class="track"><div class="fill" style="width:${pct}%"></div></div><small>${c.g}/${c.m}</small></div>`; }
function vLogin() {
  return `<div class="panel" style="max-width:480px;margin:40px auto"><span class="badge" style="color:var(--sF);justify-self:start">Teacher area</span><h2>Sign in with your teacher Google account</h2><p class="ar">سجّل الدخول بحساب Google الخاص بالمعلم.</p><button class="btn google" data-act="google">Sign in with Google</button>${authMsg ? `<p class="notice">${authMsg}</p>` : ''}</div>`;
}
function vDenied() {
  return `<div class="panel" style="max-width:520px;margin:40px auto"><h2>This account is not a teacher account</h2><p>You are signed in as <b>${esc(user.email || '')}</b>. Only the emails in <i>js/firebase-config.js</i> and <i>firestore.rules</i> can open this page.</p><p class="ar">هذا الحساب ليس حساب معلم.</p><button class="btn" data-act="logout">Sign out</button></div>`;
}
function vTeacher() {
  const r = openId && records.find(x => x.id === openId);
  const tabs = [['results', 'Results'], ['key', 'Answer key & marks'], ['guide', 'Speaking, rubrics & advice']];
  let h = `<div class="topbar"><div><span class="badge" style="color:var(--sF)">Teacher area</span><h1 style="font-size:2rem;margin-top:6px">Placement results</h1></div><div class="row"><span class="status">${esc(user.email)}</span><button class="btn small" data-act="logout">Sign out</button></div></div>
  <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" aria-selected="${tTab === k && !r}" data-act="tab" data-tab="${k}">${l}</button>`).join('')}</div>`;
  if (loadErr) h += `<p class="notice">${esc(loadErr)}</p>`;
  if (r) return h + vReport(r);
  if (openId && !r) openId = null;
  if (tTab === 'results') return h + vResults();
  if (tTab === 'key') return h + vKey();
  return h + vGuide();
}
function vResults() {
  const waiting = students.filter(s => !s.submitted);
  let h = '';
  if (!records.length) h += `<div class="box"><h3>No finished tests yet</h3><p>Share the website link with your pupils. Each pupil must sign in, then finish and send the test. Results appear here by themselves.</p></div>`;
  else h += `<div class="row" style="margin-bottom:8px;justify-content:space-between"><span class="status">${records.length} finished test${records.length > 1 ? 's' : ''} · updates live</span><button class="btn small" data-act="csv">Download all results (CSV)</button></div>
  <div class="tscroll"><table><thead><tr><th>Pupil</th><th>Class</th><th>Email</th><th>Sent</th><th>Placement</th><th>Writing / speaking</th><th></th></tr></thead><tbody>${records.map(r => { const P = profile(r), o = overall(P); const pend = P.writing.band === null || P.speaking.band === null; return `<tr><td><b>${esc(r.name || '—')}</b></td><td>${esc(r.cls || '')}</td><td style="font-size:.85rem">${esc(r.email || '')}</td><td>${fmtDate(r.submittedAt || r.date)}</td><td>${o ? BAND_CHIP(o.level) + (o.n < 6 ? ' <span class="muted" style="font-size:.8rem">provisional</span>' : '') : '—'}</td><td>${pend ? '<span class="chip b0">To mark</span>' : '<span class="chip b3">Marked</span>'}</td><td><button class="btn small" data-act="open" data-id="${r.id}">Open</button></td></tr>`; }).join('')}</tbody></table></div>`;
  if (waiting.length) h += `<h3 class="keyhead">Signed in, not finished yet (${waiting.length})</h3><div class="tscroll"><table><thead><tr><th>Pupil</th><th>Class</th><th>Email</th></tr></thead><tbody>${waiting.map(s => `<tr><td>${esc(s.name || '(no name yet)')}</td><td>${esc(s.cls || '')}</td><td style="font-size:.85rem">${esc(s.email || '')}</td></tr>`).join('')}</tbody></table></div>`;
  return h;
}
function vReport(r) {
  const P = profile(r), o = overall(P);
  const tags = {}; Object.values(P).forEach(p => p.wrong.forEach(t => tags[t] = (tags[t] || 0) + 1));
  const tagList = Object.entries(tags).sort((a, b) => b[1] - a[1]);
  return `<div class="row" style="margin-bottom:12px"><button class="btn small" data-act="close">← All results</button><span class="status">${esc(r.email || '')}</span></div>
  <div class="rec"><span class="muted">${esc(r.name)} · ${esc(r.cls || 'no class')} · sent ${fmtDate(r.submittedAt || r.date)}</span>${o ? `<h3>${PLACE[o.level].t}${o.n < 6 ? ' <span class="chip b0">provisional</span>' : ''}</h3><p>${PLACE[o.level].d}</p>${o.n < 6 ? `<p class="status">Mark the writing and speaking below to complete the profile (${o.n} of 6 skills ready).</p>` : ''}${o.spread >= 2 ? `<p class="notice">Uneven profile: one skill is two levels apart from another. Use the skill table, not the total, to decide the group, and give targeted support in the weakest skill.</p>` : ''}` : `<h3>Profile not ready</h3>`}<p class="status">Placement uses the middle level across the six skills, not the total score. Teacher judgement decides.</p></div>
  <h3 class="keyhead">Skill by skill</h3><div class="tscroll"><table><thead><tr><th>Skill</th><th>Level A · Foundation</th><th>Level B · Developing</th><th>Level C · Challenge</th><th>Result</th></tr></thead><tbody>${Object.keys(SK).map(k => `<tr><td><b>${SK[k]}</b></td><td>${bar(P[k].A)}</td><td>${bar(P[k].B)}</td><td>${bar(P[k].C)}</td><td>${BAND_CHIP(P[k].band)}</td></tr>`).join('')}</tbody></table></div>
  <p class="status" style="margin-top:6px">Rule per skill: Level A under 70% → Foundation · A secure but B under 70% → Developing · A and B secure and Challenge 50%+ → Stronger (otherwise Developing).</p>
  <div class="grid2" style="margin-top:16px"><div class="box"><h3>What to teach again</h3>${tagList.length ? `<ul class="adv">${tagList.slice(0, 8).map(([t, c]) => `<li>${esc(ADV[t] || t)} <span class="muted">(${c} error${c > 1 ? 's' : ''})</span></li>`).join('')}</ul>` : '<p>No errors recorded so far.</p>'}</div>
  <div class="box"><h3>Teacher notes</h3><textarea class="f" id="tnotes" data-tnote="1" rows="5" placeholder="Confidence, first-language support, final decision…">${esc(r.teacher?.notes || '')}</textarea></div></div>
  <h3 class="keyhead">F. Speaking – on a video call, share your screen, ask each question, then tap a mark</h3><div class="box"><div class="rub">${RUB.S.map(x => `<span>${esc(x)}</span>`).join('')}</div>${SPEAK.map((q, i) => { const v = r.teacher?.s?.[q.id]; return `<div class="sp">${q.pic ? `<figure class="pic ${picClass(q.pic)}">${pic(q.pic)}</figure>` : `<div class="noimg">No picture – ask directly</div>`}<div><span class="lvl ${q.level}" style="display:inline-block">${LVN[q.level]}</span><p><b>${i + 1}. ${esc(q.q)}</b></p><p class="muted">Expected: ${esc(q.exp)}</p></div><div class="score" role="group" aria-label="Mark for speaking ${i + 1}">${[0, 1, 2].map(m => `<button type="button" data-act="smark" data-q="${q.id}" data-m="${m}" aria-pressed="${v === m}">${m}</button>`).join('')}</div></div>`; }).join('')}</div>
  <h3 class="keyhead">E. Writing – read and mark</h3>${['E2', 'E3'].map(id => { const v = r.teacher?.w?.[id]; return `<div class="box" style="margin-bottom:12px"><h3>${id === 'E2' ? 'E2 (Level B) Sentences about Ben' : 'E3 (Level C) About me and my family'}</h3><div class="studentwrite">${(r.answers || {})[id] ? esc(r.answers[id]) : '<em class="muted">Nothing written</em>'}</div><div class="rub">${RUB[id].map(x => `<span>${esc(x)}</span>`).join('')}</div><div class="score" role="group" aria-label="Mark for ${id}">${[0, 1, 2, 3, 4].map(m => `<button type="button" data-act="wmark" data-q="${id}" data-m="${m}" aria-pressed="${v === m}">${m}</button>`).join('')}</div></div>`; }).join('')}
  <h3 class="keyhead">Answers question by question</h3>${SEC.map(s => { let n = 0; const rows = s.ex.flatMap((ex, ei) => ex.items.map(it => { n++; const sc = itemScore(it, r); return `<tr><td>${s.id}${ei + 1} · Q${n}</td><td><span class="lvl ${ex.level}">${ex.level}</span></td><td>${it.prompt ? esc(it.prompt) : (it.pic ? `<span class="mini">${pic(it.pic)}</span>` : '')}</td><td>${ansText(it, r)}</td><td>${keyText(it)}</td><td class="num">${sc === null ? '<span class="muted">—</span>' : `<span class="${sc >= (it.max || 1) ? 'ok' : 'no'}">${sc}/${it.max || 1}</span>`}</td></tr>`; })); return `<details><summary>${s.id}. ${s.title}</summary><div class="tscroll" style="margin-top:8px"><table><thead><tr><th>Exercise · Q</th><th>Lv</th><th>Question</th><th>Pupil</th><th>Key</th><th class="num">Mark</th></tr></thead><tbody>${rows.join('')}</tbody></table></div></details>`; }).join('')}
  <div class="row" style="margin-top:18px" id="delrow"><button class="btn small" data-act="askdel">Delete this result and allow a new attempt</button></div>`;
}
function ansText(it, r) { const v = (r.answers || {})[it.id]; if (!answered(it, r)) return '<em class="muted">no answer</em>'; if (it.type === 'pick') return `<span class="mini">${pic(v)}</span>`; if (it.type === 'build') return esc(builtText(it, v) + (it.end || '')); if (it.type === 'write') return '<span class="muted">see Writing above</span>'; return esc(String(v)); }
function keyText(it) { if (it.type === 'pick') return `<span class="mini">${pic(it.ans)}</span>`; if (it.type === 'build') return esc(it.ans + (it.end || '')); if (it.type === 'type') return esc(it.model || it.accept[0]); if (it.type === 'write') return 'Rubric (0–4)'; return esc(it.ans); }
function vKey() {
  const T = totals(); const s = { A: 0, B: 0, C: 0 };
  let h = `<div class="box"><h3>Marks</h3><div class="tscroll"><table><thead><tr><th>Skill</th><th class="num">Level A</th><th class="num">Level B</th><th class="num">Core (A+B)</th><th class="num">Challenge (C)</th><th class="num">Total</th></tr></thead><tbody>`;
  Object.keys(SK).forEach(k => { const t = T[k]; s.A += t.A; s.B += t.B; s.C += t.C; h += `<tr><td>${SK[k]}</td><td class="num">${t.A}</td><td class="num">${t.B}</td><td class="num">${t.A + t.B}</td><td class="num">${t.C}</td><td class="num"><b>${t.A + t.B + t.C}</b></td></tr>`; });
  h += `<tr><td><b>All skills</b></td><td class="num"><b>${s.A}</b></td><td class="num"><b>${s.B}</b></td><td class="num"><b>${s.A + s.B}</b></td><td class="num"><b>${s.C}</b></td><td class="num"><b>${s.A + s.B + s.C}</b></td></tr></tbody></table></div><p class="status">1 mark per question unless shown. Writing E2 and E3 use the rubric (0–4 each). Speaking: 10 prompts × 2 marks. Sections A–D and E1 are marked automatically.</p></div>`;
  SEC.forEach(sec => {
    let n = 0; h += `<h3 class="keyhead">${sec.id}. ${sec.title}</h3>`;
    if (sec.passage) h += `<details style="margin-bottom:10px"><summary>Reading text: Lucy's family</summary>${PASSAGE.map(p => `<p style="margin-top:8px">${esc(p)}</p>`).join('')}</details>`;
    h += `<div class="tscroll"><table><thead><tr><th>Exercise · Q</th><th>Lv</th><th>Picture / question</th><th>Answer</th><th>Also accept / notes</th><th class="num">Marks</th></tr></thead><tbody>`;
    sec.ex.forEach((ex, ei) => ex.items.forEach(it => {
      n++; let acc = '—';
      if (it.type === 'type') acc = it.acceptNote || (Array.isArray(it.accept) && it.accept.length > 1 ? it.accept.slice(1).join(' · ') : 'Exact spelling; capital letters ignored');
      if (it.type === 'build') acc = it.letters ? 'Letters in this order' : 'Words in this order; final punctuation is added automatically';
      if (it.type === 'write') acc = 'Teacher marks with the rubric';
      h += `<tr><td>${sec.id}${ei + 1} · Q${n}</td><td><span class="lvl ${ex.level}">${ex.level}</span></td><td>${it.pic ? `<span class="mini">${pic(it.pic)}</span> ` : ''}${it.big ? `<b>${it.big}</b> ` : ''}${it.prompt ? esc(it.prompt) : ''}</td><td><b>${keyText(it)}</b></td><td>${esc(acc)}</td><td class="num">${it.max || 1}</td></tr>`;
    }));
    h += `</tbody></table></div>`;
  });
  return h;
}
function vGuide() {
  return `<div class="box"><h3>How to run the test online</h3><ol class="adv"><li>Send pupils the website link (the main page, not this teacher page).</li><li>Each pupil signs in (Google, or email and password), writes name and class, and does parts A–E (about 30 minutes). Answers are saved as they go, so a pupil can continue later on the same account.</li><li>Pupils see no marks. When they press <b>Send</b>, the result appears in <b>Results</b> here.</li><li>Do the speaking part on a short video call: open the pupil's result, share your screen to show each picture, and tap 0, 1 or 2. Then mark the two writing tasks.</li><li>Use the skill table and the advice to choose the group. Do not place a pupil by the total score alone.</li></ol></div>
  <h3 class="keyhead">F. Speaking prompts</h3><div class="tscroll"><table><thead><tr><th>No.</th><th>Lv</th><th>Picture</th><th>Teacher asks</th><th>Expected answer</th></tr></thead><tbody>${SPEAK.map((q, i) => `<tr><td>${i + 1}</td><td><span class="lvl ${q.level}">${q.level}</span></td><td>${q.pic ? `<span class="mini">${pic(q.pic)}</span>` : '—'}</td><td>${esc(q.q)}</td><td>${esc(q.exp)}</td></tr>`).join('')}</tbody></table></div>
  <div class="grid2" style="margin-top:16px"><div class="box"><h3>Speaking rubric (each prompt)</h3><div class="rub">${RUB.S.map(x => `<span>${esc(x)}</span>`).join('')}</div><p class="status">Overall guide: 0–9 of 20 usually Foundation · 10–15 Developing · 16–20 Stronger.</p></div>
  <div class="box"><h3>Writing rubrics</h3><p><b>E2 – Ben (0–4)</b></p><div class="rub">${RUB.E2.map(x => `<span>${esc(x)}</span>`).join('')}</div><p><b>E3 – About me (0–4)</b></p><div class="rub">${RUB.E3.map(x => `<span>${esc(x)}</span>`).join('')}</div></div></div>
  <h3 class="keyhead">Placement groups</h3><div class="grid2">${[1, 2, 3].map(k => `<div class="box"><h3>${PLACE[k].t}</h3><p>${PLACE[k].d}</p></div>`).join('')}<div class="box"><h3>Syllabus covered</h3><p style="font-size:.92rem">Starter: names, numbers 1–10, colours · U1 What's this? school things · U2 my / your, toys · U3 This is / These are, body · U4 He's / She's a…, jobs · U5 in / on / under, park · U6 possessive 's, family · U7 his / her, clothes, alphabet · U8 Is she in the…?, house, sh · U9 I've got / haven't got, a / an, lunch box · U10 He's / She's got, hair, shapes, th. Initial sounds a–z and ch are included. Not tested: like / don't like, can / can't, CVC words (later units).</p></div></div>
  <h3 class="keyhead">What to teach again – full list</h3><div class="box"><ul class="adv">${Object.values(ADV).map(a => `<li>${esc(a)}</li>`).join('')}</ul></div>`;
}
function render() {
  let h = '';
  if (view === 'loading') h = `<div class="panel" style="margin-top:40px"><p>Loading…</p></div>`;
  else if (view === 'login') h = vLogin();
  else if (view === 'denied') h = vDenied();
  else h = vTeacher();
  app.innerHTML = h;
}

/* ---------- CSV export ---------- */
function downloadCSV() {
  const head = ['Name', 'Class', 'Email', 'Sent', 'Placement'];
  Object.values(SK).forEach(n => head.push(n + ' level', n + ' score'));
  head.push('Notes');
  const rows = [head];
  records.forEach(r => {
    const P = profile(r), o = overall(P);
    const row = [r.name || '', r.cls || '', r.email || '', fmtDate(r.submittedAt || r.date), o ? PLACE[o.level].t + (o.n < 6 ? ' (provisional)' : '') : ''];
    Object.keys(SK).forEach(k => { const p = P[k]; const g = p.A.g + p.B.g + p.C.g, m = p.A.m + p.B.m + p.C.m; row.push(p.band ? BANDN[p.band] : 'to mark', `${g}/${m}`); });
    row.push(r.teacher?.notes || '');
    rows.push(row);
  });
  const csv = '﻿' + rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = 'placement-results.csv'; document.body.appendChild(a); a.click(); a.remove();
}

/* ---------- actions ---------- */
app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
  const cur = () => records.find(x => x.id === openId);
  if (a === 'google') { authMsg = ''; try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch (err) { authMsg = authError(err); render(); } }
  else if (a === 'logout') { await signOut(auth); }
  else if (a === 'tab') { tTab = b.dataset.tab; openId = null; render(); window.scrollTo(0, 0); }
  else if (a === 'open') { openId = b.dataset.id; render(); window.scrollTo(0, 0); }
  else if (a === 'close') { openId = null; render(); window.scrollTo(0, 0); }
  else if (a === 'csv') { downloadCSV(); }
  else if (a === 'smark' || a === 'wmark') {
    const r = cur(); if (!r) return; r.teacher = r.teacher || {}; const k = a === 'smark' ? 's' : 'w'; r.teacher[k] = r.teacher[k] || {};
    const m = +b.dataset.m; if (r.teacher[k][b.dataset.q] === m) delete r.teacher[k][b.dataset.q]; else r.teacher[k][b.dataset.q] = m;
    rerender(); saveMarks(r);
  }
  else if (a === 'askdel') { document.getElementById('delrow').innerHTML = `<span>Delete the result for <b>${esc(cur()?.name || '')}</b>? The pupil can then take the test again. This cannot be undone.</span><button class="btn small" data-act="dodel">Yes, delete</button><button class="btn small" data-act="nodel">Keep it</button>`; }
  else if (a === 'nodel') { rerender(); }
  else if (a === 'dodel') {
    const id = openId; b.disabled = true;
    try { await deleteDoc(doc(db, 'results', id)); await setDoc(doc(db, 'students', id), { submitted: false }, { merge: true }); try { await deleteDoc(doc(db, 'drafts', id)); } catch (x) {} openId = null; flash('Result deleted. The pupil can take the test again.'); render(); }
    catch (err) { flash('Could not delete – check the internet'); b.disabled = false; }
  }
});
app.addEventListener('input', e => { const t = e.target; if (t.dataset.tnote) { const r = records.find(x => x.id === openId); if (r) { r.teacher = r.teacher || {}; r.teacher.notes = t.value; saveMarks(r); } } });
render();
