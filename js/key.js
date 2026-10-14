/* TEACHER FILE: answer key, rubrics, advice and scoring. Loaded only by teacher.html. */
const KEY={
 "A1a": {
  "ans": "ruler"
 },
 "A1b": {
  "ans": "teddy"
 },
 "A1c": {
  "ans": "farmer"
 },
 "A1d": {
  "ans": "banana"
 },
 "A2a": {
  "ans": "faceEyes"
 },
 "A2b": {
  "ans": "slide"
 },
 "A2c": {
  "ans": "grandpa"
 },
 "A2d": {
  "ans": "dress"
 },
 "A3a": {
  "ans": "kitchen"
 },
 "A3b": {
  "ans": "garden"
 },
 "A3c": {
  "ans": "triangle"
 },
 "A3d": {
  "ans": "curly"
 },
 "A4a": {
  "accept": [
   "window"
  ]
 },
 "A4b": {
  "accept": [
   "trousers"
  ]
 },
 "A4c": {
  "accept": [
   "grapes"
  ]
 },
 "B1a": {
  "ans": "It's a pen."
 },
 "B1b": {
  "ans": "These"
 },
 "B1c": {
  "ans": "an"
 },
 "B1d": {
  "ans": "He's"
 },
 "B2a": {
  "ans": "on"
 },
 "B2b": {
  "ans": "Rosy's"
 },
 "B2c": {
  "ans": "his"
 },
 "B2d": {
  "ans": "No, she isn't."
 },
 "B3a": {
  "ans": "This is my bag"
 },
 "B3b": {
  "ans": "Is this your kite"
 },
 "B4a": {
  "ans": "She's got long hair"
 },
 "B4b": {
  "ans": "I haven't got a pear"
 },
 "B4c": {
  "ans": "Are these his socks"
 },
 "C1a": {
  "ans": "Yes"
 },
 "C1b": {
  "ans": "No"
 },
 "C2a": {
  "ans": "In the kitchen."
 },
 "C2b": {
  "ans": "boyCurly"
 },
 "C2c": {
  "ans": "lbSA"
 },
 "C3a": {
  "accept": "tree-rule",
  "model": "It's in the tree.",
  "acceptNote": "Any answer that puts the kite in the tree: It's in the tree. / In the tree. / in tree"
 },
 "D1a": {
  "ans": "d"
 },
 "D1b": {
  "ans": "h"
 },
 "D1c": {
  "ans": "r"
 },
 "D2a": {
  "ans": "f"
 },
 "D2b": {
  "ans": "l"
 },
 "D2c": {
  "ans": "u"
 },
 "D2d": {
  "ans": "v"
 },
 "D3a": {
  "ans": "sh"
 },
 "D3b": {
  "ans": "ch"
 },
 "D3c": {
  "ans": "th"
 },
 "D4a": {
  "ans": "kite"
 },
 "D4b": {
  "ans": "fish"
 },
 "D4c": {
  "ans": "doll"
 },
 "E1a": {
  "accept": [
   "car",
   "blue car",
   "a car",
   "a blue car"
  ],
  "model": "car"
 },
 "E1b": {
  "accept": [
   "shoes"
  ],
  "model": "shoes"
 }
};
const SPEAK=[
 {
  "id": "S1",
  "level": "A",
  "q": "What's your name?",
  "exp": "My name's …",
  "focus": "s-intro"
 },
 {
  "id": "S2",
  "level": "A",
  "q": "How old are you?",
  "exp": "I'm (nine).",
  "focus": "s-intro"
 },
 {
  "id": "S3",
  "level": "A",
  "pic": "pencil",
  "q": "(Show the picture.) What's this?",
  "exp": "It's a pencil.",
  "focus": "g-whats"
 },
 {
  "id": "S4",
  "level": "A",
  "pic": "ball",
  "q": "What colour is it?",
  "exp": "It's red.",
  "focus": "s-colour"
 },
 {
  "id": "S5",
  "level": "A",
  "pic": "faceEyes",
  "q": "(Point to your eyes.) What are these?",
  "exp": "These are my eyes.",
  "focus": "g-these"
 },
 {
  "id": "S6",
  "level": "B",
  "pic": "doctor",
  "q": "Is she a teacher?",
  "exp": "No, she isn't. She's a doctor.",
  "focus": "g-short"
 },
 {
  "id": "S7",
  "level": "B",
  "pic": "parkUnder",
  "q": "Where's the ball?",
  "exp": "It's under the slide.",
  "focus": "g-prep"
 },
 {
  "id": "S8",
  "level": "B",
  "pic": "lbSG",
  "q": "This is your lunch box. What have you got?",
  "exp": "I've got a sandwich and grapes.",
  "focus": "g-havegot"
 },
 {
  "id": "S9",
  "level": "C",
  "pic": "girlLong",
  "q": "Tell me about her hair.",
  "exp": "She's got long, blond hair.",
  "focus": "s-describe"
 },
 {
  "id": "S10",
  "level": "C",
  "pic": "family",
  "q": "Tell me about your family.",
  "exp": "This is my mum. I've got a brother. My dad is a …",
  "focus": "s-family"
 }
];
const RUB={
 "E2": [
  "0 – no sentence, single words only, or not understandable",
  "For EACH of the 2 sentences: 2 = correct and matches the picture; 1 = meaning clear but with mistakes (spelling, missing a / 's, no capital or full stop); 0 = not a sentence",
  "Maximum 4 (2 sentences × 2)"
 ],
 "E3": [
  "4 – three sentences, mostly correct, at least two different patterns (My name's… / I'm… / I've got… / My mum is…)",
  "3 – three sentences with small mistakes, or two fully correct sentences",
  "2 – two sentences with mistakes, or one correct sentence",
  "1 – words or phrases only",
  "0 – nothing written / not understandable"
 ],
 "S": [
  "2 – answers correctly in a full sentence (or the expected short answer) without help",
  "1 – one word, needs the question repeated, or a sentence with mistakes",
  "0 – no answer, or answers only in the first language"
 ]
};
const ADV={
 "v-school": "School things (Unit 1): pen, pencil, rubber, ruler, book, bag, door, window. Use flashcard games such as Slow reveal and What's missing?",
 "v-toys": "Toys (Unit 2): doll, ball, teddy, puzzle, car, kite, bike, train. Picture–word matching and Bingo.",
 "v-body": "My body (Unit 3): arms, nose, face, legs, ears, fingers, hands, eyes. Use Simon says… with pointing.",
 "v-jobs": "Jobs (Unit 4): teacher, pupil, fireman, pilot, doctor, policeman, farmer. Mime the word.",
 "v-park": "The park (Unit 5): seesaw, slide, net, swing, tree, pool, ice cream, frisbee. Label a park picture.",
 "v-family": "My family (Unit 6): mum, dad, sister, brother, grandma, grandpa, aunt, uncle, cousin. Make a family tree with photos.",
 "v-clothes": "My clothes (Unit 7): dress, socks, T-shirt, trousers, shorts, shoes, coat, hat. Dress-the-doll and spelling practice.",
 "v-house": "My house (Unit 8): kitchen, living room, dining room, bedroom, bathroom, garden. Draw and label a house plan.",
 "v-food": "My lunch box (Unit 9): sandwich, drinks, apple, banana, biscuit, tomato, pear, grapes. Sort real or picture items into a lunch box.",
 "v-shapes": "Shapes (Unit 10): square, circle, triangle, rectangle. Shape hunt in the classroom.",
 "v-describe": "Describing people (Unit 10): long, short, blond, brown, curly, straight hair. Guess who? with picture cards.",
 "g-whats": "What's this? It's a … (Unit 1). Drill the full answer with \"a\".",
 "g-these": "This is … / These are … (Unit 3). One thing vs. two things, with body parts.",
 "g-aan": "a / an (Unit 9): \"an\" before a, e, i, o, u – an apple, an egg.",
 "g-hesshe": "He's / She's a … (Unit 4): boy = he, girl = she. Job flashcards with Is he/she a …?",
 "g-prep": "in / on / under (Unit 5): Where's the …? Practise with a box and real objects.",
 "g-poss": "Possessive 's (Unit 6): Rosy's bag, Mum's book. Collect pupils' things: \"This is Ali's pen.\"",
 "g-hisher": "his / her (Unit 7): his for a boy, her for a girl. Clothes flashcards.",
 "g-short": "Short answers (Units 2, 4, 8): Yes, she is. / No, she isn't. Quick-fire yes/no questions about pictures.",
 "g-order": "Word order (Units 1–3): This is my … / Is this your …? Use cut-up sentence strips.",
 "g-havegot": "have got (Units 9–10): I've got / I haven't got / She's got … Lunch-box and Guess who? games.",
 "g-plq": "Plural questions (Unit 7): Are these his socks? Yes, they are. / No, they aren't.",
 "r-detail": "Reading for detail: short texts with picture checks; underline names, numbers and places before answering.",
 "r-write": "Writing short answers to reading questions: model It's in / on / under the …",
 "p-letters": "Capital and small letters, especially b / d / p and h / n: letter-matching cards and tracing.",
 "p-abc": "Alphabet order (Unit 7): alphabet song and \"What comes next?\" games.",
 "p-initial": "Initial sounds a–z (Units 1–6): phonics cards, I spy, sound sorting.",
 "p-digraph": "sh, ch, th (Units 8–10): sort picture cards by sound; chant the phonics words.",
 "p-spell": "Spelling familiar words: letter tiles and look – say – cover – write – check.",
 "w-word": "Copying and spelling key words inside a sentence frame.",
 "w-sent": "Simple sentences: capital letter, full stop, and frames such as This is … / He's got … / I've got …",
 "s-intro": "Personal questions (Starter): What's your name? How old are you? Practise in pairs every lesson.",
 "s-colour": "Colours (Starter): What colour is it? It's red. Colour flashcards and Point to something red.",
 "s-describe": "Describing people aloud (Unit 10): She's got long, blond hair. Guess who? in pairs.",
 "s-family": "Talking about family (Unit 6): This is my … / I've got a brother. Show-and-tell with a family drawing."
};
const PLACE={
 "1": {
  "t": "Level A – Foundation group",
  "d": "Start Family and Friends 1 from the Starter Unit. Rebuild letters, initial sounds and core words before moving on to sentence patterns."
 },
 "2": {
  "t": "Level B – Developing group",
  "d": "Stay in Family and Friends 1: quick review of Units 1–5, then teach Units 6–10 carefully, with extra work on the weak points listed below."
 },
 "3": {
  "t": "Level C – Stronger group",
  "d": "Starter–Unit 10 is secure. Short review of the weak points below, then continue to Unit 11 onwards."
 }
};

/* put the answers back onto the questions (teacher page only) */
allItems().forEach(({it})=>Object.assign(it,KEY[it.id]||{}));
const BANDN={1:'Foundation',2:'Developing',3:'Stronger'};
const norm=s=>String(s||'').toLowerCase().replace(/[’`´]/g,"'").replace(/[.!?,]/g,' ').replace(/\s+/g,' ').trim();
function itemScore(it,r){
  const v=(r.answers||{})[it.id];
  if(it.type==='mcq'||it.type==='pick') return v===it.ans?1:0;
  if(it.type==='type'){ if(!v) return 0; const n=norm(v);
    if(it.accept==='tree-rule') return (/\btree\b/.test(n)&&!/\b(under|on)\b/.test(n))?1:0;
    return it.accept.map(norm).includes(n)?1:0 }
  if(it.type==='build') return builtText(it,v)===it.ans?1:0;
  if(it.type==='write'){ const s=r.teacher?.w?.[it.id]; return typeof s==='number'?s:null }
  return 0;
}
function band(p){ if(p.A.p||p.B.p||p.C.p) return null; const f=x=>x.m?x.g/x.m:1; if(f(p.A)<.7) return 1; if(f(p.B)<.7) return 2; return f(p.C)>=.5?3:2 }
function profile(r){
  const P={}; Object.keys(SK).forEach(k=>P[k]={A:{g:0,m:0,p:0},B:{g:0,m:0,p:0},C:{g:0,m:0,p:0},wrong:[]});
  allItems().forEach(({it,ex,s})=>{const c=P[s.skill][ex.level],mx=it.max||1,sc=itemScore(it,r);c.m+=mx;if(sc===null)c.p++;else{c.g+=sc;if(sc<mx)P[s.skill].wrong.push(it.focus)}});
  SPEAK.forEach(q=>{const c=P.speaking[q.level];c.m+=2;const v=r.teacher?.s?.[q.id];if(typeof v!=='number')c.p++;else{c.g+=v;if(v<2)P.speaking.wrong.push(q.focus)}});
  Object.values(P).forEach(p=>p.band=band(p)); return P;
}
function overall(P){const b=Object.values(P).map(p=>p.band).filter(Boolean).sort();if(!b.length)return null;return{level:b[Math.floor((b.length-1)/2)],n:b.length,spread:b[b.length-1]-b[0]}}
function totals(){const T={};Object.keys(SK).forEach(k=>T[k]={A:0,B:0,C:0});allItems().forEach(({it,ex,s})=>T[s.skill][ex.level]+=(it.max||1));SPEAK.forEach(q=>T.speaking[q.level]+=2);return T}
