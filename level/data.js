/* English Placement Test (CEFR A1 / A2 / B1): questions, passages, answer key and scoring.
   Shared by the student page (index.html) and the teacher page (teacher.html).
   Each question: [text, options, index of the correct option]. */
const SECTIONS = [
 {name:"Grammar", ar:"القواعد", qs:[
  ["She ___ to school every day.",["go","goes","going","gone"],1],
  ["Look! The children ___ in the garden.",["play","plays","are playing","played"],2],
  ["We ___ a great film last night.",["watch","watched","watching","watches"],1],
  ["While I ___ dinner, the phone rang.",["cook","cooked","was cooking","am cooking"],2],
  ["I ___ never ___ to Japan.",["have / been","has / been","had / been","am / being"],0],
  ["He has worked here ___ 2015.",["for","since","during","ago"],1],
  ["I think it ___ rain tomorrow.",["will","is","was","does"],0],
  ["Look at those clouds! It ___ rain.",["will","is going to","goes","going"],1],
  ["___ you like coffee?",["Are","Do","Does","Is"],1],
  ["There isn't ___ milk in the fridge.",["many","much","a few","several"],1],
  ["She has ___ friends in this city.",["much","a little","a few","any"],2],
  ["He is ___ student in the class.",["more intelligent","the most intelligent","intelligent","intelligentest"],1],
  ["You look tired. You ___ take a break.",["should","must","can","shall"],0],
  ["The meeting is ___ Monday ___ 9 a.m.",["on / at","in / on","at / in","on / in"],0],
  ["If it rains tomorrow, we ___ the picnic.",["cancel","will cancel","cancelled","would cancel"],1],
  ["She enjoys ___ new recipes.",["try","trying","to try","tried"],1],
  ["This house ___ in 1990.",["built","was built","builds","is building"],1],
  ["The man ___ lives next door is a doctor.",["which","who","whom","whose"],1],
  ["She said that she ___ tired.",["is","was","be","has been"],1],
  ["I stayed home ___ it was raining heavily.",["although","because","so","despite"],1]
 ]},
 {name:"Vocabulary", ar:"المفردات", qs:[
  ["Which word means “a usual way of doing things”?",["routine","holiday","decision","surprise"],0],
  ["My mother's sister is my ___.",["cousin","aunt","niece","grandmother"],1],
  ["She works as a ___ in a hospital, taking care of patients.",["nurse","waiter","pilot","farmer"],0],
  ["I need to buy some vegetables and fruit, so I'm going to the ___.",["bank","supermarket","library","pharmacy"],1],
  ["We missed our flight because the ___ to the airport was very heavy.",["traffic","train","taxi","road"],0],
  ["He goes to the gym every day to stay ___.",["fit","sick","bored","tired"],0],
  ["I need to ___ my phone; the battery is almost empty.",["charge","switch","print","delete"],0],
  ["She was very ___ when she heard the good news.",["excited","bored","angry","tired"],0],
  ["Can you ___ the form before you submit it?",["fill in","look up","turn off","give up"],0],
  ["“The weather was terrible, so we decided to stay indoors.” What does “terrible” mean here?",["very good","very bad","very hot","very cold"],1]
 ]},
 {name:"Reading", ar:"القراءة", qs:[
  ["Passage 1: What time does Omar wake up?",["Six o'clock","Seven o'clock","Eight o'clock","Ten o'clock"],1],
  ["Passage 1: True or False — Omar goes to school by car.",["True","False"],1],
  ["Passage 1: What is the main idea of the passage?",["Omar's school subjects","Omar's daily routine","Omar's football team","Omar's family members"],1],
  ["Passage 1: What is Omar's favorite subject?",["Math","Science","English","Football"],2],
  ["Passage 1: The word “simple” means:",["difficult","easy and not complicated","expensive","boring"],1],
  ["Passage 2: How long did the family drive to reach the mountains?",["One hour","Two hours","Three hours","Four hours"],2],
  ["Passage 2: True or False — The family stayed in a hotel.",["True","False"],1],
  ["Passage 2: What is the main idea of the passage?",["How to go hiking","A family's enjoyable mountain trip","Layla's brother's fears","Cooking dinner outdoors"],1],
  ["Passage 2: What did Layla's brother feel at first?",["Excited","Afraid","Tired","Angry"],1],
  ["Passage 2: The word “scenery” means:",["food","the natural view of a place","a type of boat","a kind of weather"],1],
  ["Passage 3: Why did remote work become common, according to the passage?",["Companies wanted smaller offices","Many offices closed for health reasons","Employees asked for higher salaries","Commuting became too expensive"],1],
  ["Passage 3: True or False — All employees prefer to work only from home.",["True","False"],1],
  ["Passage 3: What is the main idea of the passage?",["The history of office design","The growth and effects of remote work","How to communicate with colleagues","The cost of commuting"],1],
  ["Passage 3: What problem did some employees have?",["They missed public transport","They found it hard to separate work and home life","They had to travel more","They lost their jobs"],1],
  ["Passage 3: The word “isolated” means:",["very busy","feeling alone and disconnected from others","very relaxed","extremely tired"],1]
 ]},
 {name:"Functional English", ar:"اللغة في المواقف", qs:[
  ["A: “Hi, I don't think we've met. I'm Sarah.” B: ___",["Nice to meet you, I'm Tom.","You're welcome.","See you later.","I'm sorry."],0],
  ["A: “Excuse me, ___?” B: “Sure, go straight and turn left at the bank.”",["how are you","could you tell me the way to the station","what time is it","do you like this city"],1],
  ["A: “___ open the window? It's hot in here.” B: “Of course, no problem.”",["Could you","Are you","Do you","Would you like"],0],
  ["A: “Are you ready to order?” B: ___",["I'll have the chicken sandwich, please.","I don't have any money.","I'm going home now.","It was delicious."],0],
  ["A: “___ going to the beach this weekend?” B: “That sounds great!”",["How about","Do you have","Are you sure","What time"],0],
  ["A: “What do you think of the new policy?” B: ___",["In my opinion, it's a good idea.","I went there yesterday.","See you tomorrow.","It's five o'clock."],0],
  ["A: “I think online classes are better than in-person classes.” B: ___ I prefer meeting my teacher face to face.",["I totally agree","I'm not sure I agree","That's wonderful","Congratulations"],1],
  ["A: “You're twenty minutes late!” B: ___ The traffic was terrible.",["I'm so sorry","Thank you very much","Well done","Good idea"],0],
  ["A: “I feel very stressed about my exams. ___?” B: “You should try to relax and study a little every day.”",["What should I do","Where are you going","How much is it","What's your name"],0],
  ["A: “Would you like some more tea?” B: ___",["Yes, please, that would be lovely.","I don't know him.","It's Monday today.","Nice to meet you."],0]
 ]}
];

/* Reading passages, shown before question 1, 6 and 11 of the Reading section. */
const PASSAGES = [
 {before:0, title:"Passage 1 — Omar's Day (A1)", text:[
  "Omar is twelve years old. He lives in a small town with his family. Every day, he wakes up at seven o'clock. He washes his face, gets dressed and eats breakfast with his sister.",
  "Omar goes to school by bus. His school starts at eight o'clock. He studies Math, Science and English. English is his favorite subject because he likes learning new words.",
  "After school, Omar plays football with his friends in the park. In the evening, he does his homework and reads a book. He goes to bed at ten o'clock. Omar's life is simple, but he is happy."]},
 {before:5, title:"Passage 2 — A Trip to the Mountains (A2)", text:[
  "Last summer, Layla and her family went on a trip to the mountains. They left home early in the morning and drove for three hours. When they arrived, the air was fresh and cool.",
  "They did not stay in a hotel. Instead, they put up two tents near a small lake. In the afternoon, they went hiking. Layla's little brother was afraid at first because the path was high and narrow, but his father held his hand and soon he started to enjoy the walk.",
  "In the evening, they cooked dinner outdoors and watched the sun go down behind the mountains. Layla took many photos of the beautiful scenery. Everyone agreed that it was one of their best holidays."]},
 {before:10, title:"Passage 3 — Working from Home (B1)", text:[
  "In the past, most people travelled to an office every day. However, remote work became much more common a few years ago, when many offices closed for health reasons. Companies had to find new ways for their employees to work, and many people started working from home.",
  "For many workers, this change had clear benefits. They no longer spent hours commuting, and they could organise their day more freely. Some also said they were more productive in a quiet home environment.",
  "However, remote work also brought problems. Some employees found it hard to separate their work and home life, because their office was also their living room. Others felt isolated, as they missed chatting with their colleagues. Today, not all employees want to work only from home; many prefer a mix of working at home and in the office."]}
];

const WRITING = [
 {id:"w1", level:"A1", task:"Write 5–6 sentences about yourself, your family, or your daily routine.", ar:"اكتب 5–6 جمل عن نفسك أو عائلتك أو روتينك اليومي."},
 {id:"w2", level:"A2", task:"Write a paragraph of 60–80 words about a familiar topic.", ar:"اكتب فقرة من 60–80 كلمة عن موضوع مألوف."},
 {id:"w3", level:"B1", task:"Write an email or paragraph of 100–120 words expressing an opinion or describing an experience.", ar:"اكتب رسالة أو فقرة من 100–120 كلمة تعبّر فيها عن رأيك أو تصف تجربة."}
];
const LEVELS = ["Pre-A1","A1","A2","B1","B1+ / B2"];

/* answers: {"s0q3": 2, ...} (index of the chosen option) */
function scoreAnswers(answers) {
  answers = answers || {};
  const sections = SECTIONS.map((sec, si) => {
    let correct = 0; const items = [];
    sec.qs.forEach((q, qi) => {
      const key = `s${si}q${qi}`; const v = answers[key];
      const chosen = (v === undefined || v === null || v === '') ? null : Number(v);
      const ok = chosen === q[2]; if (ok) correct++;
      items.push({ key, n: qi + 1, text: q[0], opts: q[1], answer: q[2], chosen, ok });
    });
    return { name: sec.name, ar: sec.ar, correct, max: sec.qs.length, items };
  });
  const total = sections.reduce((a, s) => a + s.correct, 0), max = sections.reduce((a, s) => a + s.max, 0);
  return { sections, total, max };
}
const wordCount = s => (String(s || '').trim().match(/\S+/g) || []).length;
