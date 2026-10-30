/* Teacher page: only emails in TEACHER_EMAILS (and in firestore.rules) can read results.
   The level and feedback saved here are shown to the student on their results page. */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, updateDoc, deleteDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const app = document.getElementById('app');
if (!isConfigured()) { app.innerHTML = `<div class="card"><p>The website is not connected to Firebase yet.</p></div>`; throw new Error('not configured'); }
const fb = initializeApp(window.FIREBASE_CONFIG);
const auth = getAuth(fb);
const db = getFirestore(fb);
const TEACHERS = (window.TEACHER_EMAILS || []).map(e => e.toLowerCase().trim());

let user = null, view = 'loading', records = [], openId = null, loadErr = '', authMsg = '', unsub = null, editing = false, showAll = false;

onAuthStateChanged(auth, u => {
  if (unsub) { unsub(); unsub = null; }
  user = u; records = []; openId = null;
  if (!u) { view = 'login'; render(); return; }
  if (!TEACHERS.includes((u.email || '').toLowerCase())) { view = 'denied'; render(); return; }
  view = 'list'; render();
  unsub = onSnapshot(collection(db, 'cefr_results'), snap => {
    records = snap.docs.map(d => Object.assign({ id: d.id }, d.data())).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    loadErr = ''; if (!editing) rerender();
  }, () => { loadErr = 'Results could not be loaded. Check that the Firestore rules include the cefr_results part and your email.'; rerender(); });
});
function rerender() { const y = window.scrollY; render(); window.scrollTo(0, y); }

const pctTag = (c, m) => { const p = m ? c / m : 0; return `<span class="tag ${p >= .7 ? 'good' : p >= .4 ? 'wait' : 'bad'}">${c}/${m}</span>`; };
function vLogin() { return `<div class="card" style="max-width:460px;margin:30px auto"><h2>Teacher area</h2><p>Sign in with your teacher Google account.</p><button class="btn block" data-act="google">Sign in with Google</button>${authMsg ? `<p class="notice">${authMsg}</p>` : ''}</div>`; }
function vDenied() { return `<div class="card" style="max-width:520px;margin:30px auto"><h2>This account is not a teacher account</h2><p>You are signed in as <b>${esc(user.email || '')}</b>.</p><p class="ar">هذا الحساب ليس حساب معلم.</p><button class="btn ghost" data-act="logout">Sign out</button></div>`; }
function top() { return `<div class="row between" style="margin-bottom:14px"><div><h1>Placement results</h1><p class="sub" style="margin:0">English Placement Test · CEFR A1 / A2 / B1</p></div><div class="row"><span class="muted" style="font-size:.85rem">${esc(user.email)}</span><button class="btn ghost small" data-act="logout">Sign out</button></div></div>${loadErr ? `<p class="notice">${esc(loadErr)}</p>` : ''}`; }
function vList() {
  if (!records.length) return top() + `<div class="card"><h2>No results yet</h2><p>Send the student link to your students. Each result appears here as soon as a student presses Submit.</p></div>`;
  return top() + `<div class="row between" style="margin-bottom:8px"><span class="muted" style="font-size:.9rem">${records.length} student${records.length > 1 ? 's' : ''} · updates live</span><button class="btn ghost small" data-act="csv">Download all results (CSV)</button></div>
  <div class="tscroll"><table><thead><tr><th>Student</th><th>Sent</th>${SECTIONS.map(s => `<th class="num">${s.name}</th>`).join('')}<th class="num">Total</th><th>Level</th><th></th></tr></thead><tbody>${records.map(r => {
    const s = scoreAnswers(r.answers); const lv = r.teacher && r.teacher.level;
    return `<tr><td><b>${esc(r.name || '—')}</b><br><span class="muted" style="font-size:.8rem">${esc(r.email || '')}</span></td><td>${fmtDate(r.submittedAt || r.date)}</td>${s.sections.map(x => `<td class="num">${pctTag(x.correct, x.max)}</td>`).join('')}<td class="num"><b>${s.total}/${s.max}</b></td><td>${lv ? `<span class="tag good">${esc(lv)}</span>` : '<span class="tag wait">to decide</span>'}</td><td><button class="btn small" data-act="open" data-id="${r.id}">Open</button></td></tr>`;
  }).join('')}</tbody></table></div>`;
}
function vOne(r) {
  const s = scoreAnswers(r.answers), t = r.teacher || {};
  let h = top() + `<div class="row" style="margin-bottom:12px"><button class="btn ghost small" data-act="close">← All results</button></div>
  <div class="card"><h2>${esc(r.name)} <span class="muted" style="font-weight:400;font-size:.9rem">· ${esc(r.email || '')} · sent ${fmtDate(r.submittedAt || r.date)}</span></h2>
  ${s.sections.map(x => `<div class="score-row"><span>${x.name}</span><b>${x.correct} / ${x.max}</b></div><div class="bar"><i style="width:${Math.round(x.correct / x.max * 100)}%"></i></div>`).join('')}
  <div class="total">Total: ${s.total} / ${s.max} (${Math.round(s.total / s.max * 100)}%)</div></div>
  <div class="card"><h2>Level and feedback for the student</h2><p class="note">The student sees this on their results page as soon as you press Save. · يرى الطالب هذا فور الحفظ.</p>
  <label class="field" for="lvl">Final level<select class="f" id="lvl"><option value="">— choose —</option>${LEVELS.map(l => `<option ${t.level === l ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
  <label class="field" for="fbk">Feedback (writing, speaking, what to work on)<textarea id="fbk" rows="5">${esc(t.feedback || '')}</textarea></label>
  <div class="row"><button class="btn" data-act="save">Save and show to the student</button><span class="muted" id="savemsg" style="font-size:.9rem"></span></div></div>`;
  h += `<div class="card"><h2>Writing</h2>${WRITING.map(w => { const txt = r.writing && r.writing[w.id]; return `<h3>${w.level} — ${esc(w.task)} <span class="muted" style="font-weight:400">(${wordCount(txt)} words)</span></h3><div class="writing" style="margin-bottom:12px">${txt ? esc(txt) : '<i class="muted">Nothing written</i>'}</div>`; }).join('')}</div>`;
  const wrong = s.sections.reduce((a, x) => a + x.items.filter(i => !i.ok).length, 0);
  h += `<div class="card"><div class="row between"><h2 style="border:0;margin:0;padding:0">${showAll ? 'All answers' : `Mistakes (${wrong})`}</h2><button class="btn ghost small" data-act="toggle">${showAll ? 'Show mistakes only' : 'Show all answers'}</button></div><div style="height:10px"></div>`;
  s.sections.forEach(x => {
    const list = x.items.filter(i => showAll || !i.ok); if (!list.length) return;
    h += `<h3 style="margin-top:12px">${x.name} <span class="muted" style="font-weight:400">· ${x.max - x.correct} wrong</span></h3>`;
    list.forEach(i => { h += `<div class="review ${i.ok ? 'good' : 'bad'}"><div class="qt">${i.n}. ${esc(i.text)}</div>${i.ok ? `<div class="right">✓ ${esc(i.opts[i.answer])}</div>` : `<div class="yours">✗ Student: ${i.chosen === null ? '<i>no answer</i>' : esc(i.opts[i.chosen])}</div><div class="right">✓ Correct: ${esc(i.opts[i.answer])}</div>`}</div>`; });
  });
  h += `</div><div class="row" id="delrow"><button class="btn ghost small" data-act="askdel">Delete this result and allow a new attempt</button></div>`;
  return h;
}
function render() {
  const r = openId && records.find(x => x.id === openId);
  if (view === 'loading') app.innerHTML = `<div class="card"><p>Loading…</p></div>`;
  else if (view === 'login') app.innerHTML = vLogin();
  else if (view === 'denied') app.innerHTML = vDenied();
  else app.innerHTML = r ? vOne(r) : vList();
}
function downloadCSV() {
  const rows = [['Name', 'Email', 'Sent', ...SECTIONS.map(s => `${s.name} (/${s.qs.length})`), 'Total', 'Level', 'Feedback', ...WRITING.map(w => `Writing ${w.level}`)]];
  records.forEach(r => { const s = scoreAnswers(r.answers); rows.push([r.name || '', r.email || '', fmtDate(r.submittedAt || r.date), ...s.sections.map(x => x.correct), `${s.total}/${s.max}`, (r.teacher && r.teacher.level) || '', (r.teacher && r.teacher.feedback) || '', ...WRITING.map(w => (r.writing && r.writing[w.id]) || '')]); });
  const csv = '﻿' + rows.map(x => x.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = 'placement-results-cefr.csv'; document.body.appendChild(a); a.click(); a.remove();
}
app.addEventListener('focusin', e => { if (e.target.id === 'fbk' || e.target.id === 'lvl') editing = true; });
app.addEventListener('focusout', e => { if (e.target.id === 'fbk' || e.target.id === 'lvl') editing = false; });
app.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
  if (a === 'google') { authMsg = ''; try { await signInWithPopup(auth, new GoogleAuthProvider()); } catch (err) { authMsg = authError(err); render(); } }
  else if (a === 'logout') { await signOut(auth); }
  else if (a === 'open') { openId = b.dataset.id; showAll = false; render(); window.scrollTo(0, 0); }
  else if (a === 'close') { openId = null; render(); window.scrollTo(0, 0); }
  else if (a === 'toggle') { showAll = !showAll; rerender(); }
  else if (a === 'csv') { downloadCSV(); }
  else if (a === 'save') {
    const level = document.getElementById('lvl').value, feedback = document.getElementById('fbk').value.trim(), m = document.getElementById('savemsg');
    b.disabled = true; m.textContent = 'Saving…';
    try { await updateDoc(doc(db, 'cefr_results', openId), { teacher: { level, feedback, updated: new Date().toISOString() } }); editing = false; flash('Saved – the student can see it now'); rerender(); }
    catch (err) { m.textContent = 'Not saved. Check the internet and try again.'; b.disabled = false; }
  }
  else if (a === 'askdel') { document.getElementById('delrow').innerHTML = `<span>Delete the result for <b>${esc(records.find(x => x.id === openId)?.name || '')}</b>? The student can then take the test again. This cannot be undone.</span><button class="btn small" data-act="dodel">Yes, delete</button><button class="btn ghost small" data-act="nodel">Keep it</button>`; }
  else if (a === 'nodel') { rerender(); }
  else if (a === 'dodel') { b.disabled = true; try { await deleteDoc(doc(db, 'cefr_results', openId)); openId = null; flash('Result deleted'); render(); } catch (err) { flash('Could not delete – check the internet'); b.disabled = false; } }
});
render();
