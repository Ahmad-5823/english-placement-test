/* Test questions shown to pupils. Answers are NOT in this file. */
const SEC=[
 {
  "id": "A",
  "skill": "vocab",
  "title": "Vocabulary",
  "ar": "المفردات",
  "ex": [
   {
    "level": "A",
    "instr": "Look and choose the word.",
    "ar": "انظر إلى الصورة واختر الكلمة.",
    "items": [
     {
      "id": "A1a",
      "type": "mcq",
      "pic": "ruler",
      "opts": [
       "rubber",
       "ruler",
       "pencil"
      ],
      "focus": "v-school"
     },
     {
      "id": "A1b",
      "type": "mcq",
      "pic": "teddy",
      "opts": [
       "teddy",
       "kite",
       "doll"
      ],
      "focus": "v-toys"
     },
     {
      "id": "A1c",
      "type": "mcq",
      "pic": "farmer",
      "opts": [
       "doctor",
       "pilot",
       "farmer"
      ],
      "focus": "v-jobs"
     },
     {
      "id": "A1d",
      "type": "mcq",
      "pic": "banana",
      "opts": [
       "pear",
       "banana",
       "apple"
      ],
      "focus": "v-food"
     }
    ]
   },
   {
    "level": "A",
    "instr": "Read the word. Choose the right picture.",
    "ar": "اقرأ الكلمة واختر الصورة الصحيحة.",
    "items": [
     {
      "id": "A2a",
      "type": "pick",
      "prompt": "eyes",
      "opts": [
       "faceEars",
       "faceEyes",
       "faceNose"
      ],
      "focus": "v-body"
     },
     {
      "id": "A2b",
      "type": "pick",
      "prompt": "slide",
      "opts": [
       "slide",
       "swing",
       "seesaw"
      ],
      "focus": "v-park"
     },
     {
      "id": "A2c",
      "type": "pick",
      "prompt": "grandpa",
      "opts": [
       "dad",
       "grandma",
       "grandpa"
      ],
      "focus": "v-family"
     },
     {
      "id": "A2d",
      "type": "pick",
      "prompt": "dress",
      "opts": [
       "dress",
       "coat",
       "shorts"
      ],
      "focus": "v-clothes"
     }
    ]
   },
   {
    "level": "B",
    "instr": "Look and complete. Choose a word.",
    "ar": "انظر وأكمل الجملة. اختر كلمة.",
    "bank": [
     "kitchen",
     "garden",
     "triangle",
     "curly"
    ],
    "items": [
     {
      "id": "A3a",
      "type": "mcq",
      "pic": "kitchen",
      "prompt": "Mum is in the ___ .",
      "opts": [
       "kitchen",
       "garden",
       "triangle",
       "curly"
      ],
      "focus": "v-house"
     },
     {
      "id": "A3b",
      "type": "mcq",
      "pic": "garden",
      "prompt": "Grandpa is in the ___ .",
      "opts": [
       "kitchen",
       "garden",
       "triangle",
       "curly"
      ],
      "focus": "v-house"
     },
     {
      "id": "A3c",
      "type": "mcq",
      "pic": "triangle",
      "prompt": "It's a ___ .",
      "opts": [
       "kitchen",
       "garden",
       "triangle",
       "curly"
      ],
      "focus": "v-shapes"
     },
     {
      "id": "A3d",
      "type": "mcq",
      "pic": "girlCurly",
      "prompt": "She's got ___ hair.",
      "opts": [
       "kitchen",
       "garden",
       "triangle",
       "curly"
      ],
      "focus": "v-describe"
     }
    ]
   },
   {
    "level": "C",
    "instr": "Look and write the word.",
    "ar": "انظر واكتب الكلمة.",
    "items": [
     {
      "id": "A4a",
      "type": "type",
      "pic": "window",
      "hint": "6 letters",
      "focus": "v-school"
     },
     {
      "id": "A4b",
      "type": "type",
      "pic": "trousers",
      "hint": "8 letters",
      "focus": "v-clothes"
     },
     {
      "id": "A4c",
      "type": "type",
      "pic": "grapes",
      "hint": "6 letters",
      "focus": "v-food"
     }
    ]
   }
  ]
 },
 {
  "id": "B",
  "skill": "grammar",
  "title": "Grammar",
  "ar": "القواعد",
  "ex": [
   {
    "level": "A",
    "instr": "Look and choose.",
    "ar": "انظر واختر.",
    "items": [
     {
      "id": "B1a",
      "type": "mcq",
      "pic": "pen",
      "prompt": "What's this?",
      "opts": [
       "It's pen.",
       "It's a pen.",
       "This a pen."
      ],
      "focus": "g-whats"
     },
     {
      "id": "B1b",
      "type": "mcq",
      "pic": "hands",
      "prompt": "___ are my hands.",
      "opts": [
       "This",
       "These"
      ],
      "focus": "g-these"
     },
     {
      "id": "B1c",
      "type": "mcq",
      "pic": "apple",
      "prompt": "I've got ___ apple.",
      "opts": [
       "an",
       "a"
      ],
      "focus": "g-aan"
     },
     {
      "id": "B1d",
      "type": "mcq",
      "pic": "pilot",
      "prompt": "___ a pilot.",
      "opts": [
       "She's",
       "It's",
       "He's"
      ],
      "focus": "g-hesshe"
     }
    ]
   },
   {
    "level": "B",
    "instr": "Read and choose the right words.",
    "ar": "اقرأ واختر الكلمات الصحيحة.",
    "items": [
     {
      "id": "B2a",
      "type": "mcq",
      "pic": "parkOn",
      "prompt": "Where's the ball? It's ___ the slide.",
      "opts": [
       "in",
       "on",
       "under"
      ],
      "focus": "g-prep"
     },
     {
      "id": "B2b",
      "type": "mcq",
      "pic": "rosyBag",
      "prompt": "This is Rosy. This is ___ bag.",
      "opts": [
       "Rosy's",
       "Rosy",
       "Rosys"
      ],
      "focus": "g-poss"
     },
     {
      "id": "B2c",
      "type": "mcq",
      "pic": "tomShirt",
      "prompt": "This is Tom. This is ___ T-shirt.",
      "opts": [
       "her",
       "his"
      ],
      "focus": "g-hisher"
     },
     {
      "id": "B2d",
      "type": "mcq",
      "pic": "girlBedroom",
      "prompt": "Is she in the kitchen?",
      "opts": [
       "No, she isn't.",
       "Yes, she is."
      ],
      "focus": "g-short"
     }
    ]
   },
   {
    "level": "B",
    "instr": "Put the words in order.",
    "ar": "رتّب الكلمات لتكوين جملة.",
    "items": [
     {
      "id": "B3a",
      "type": "build",
      "pic": "bag",
      "tiles": [
       "my",
       "This",
       "bag",
       "is"
      ],
      "end": ".",
      "focus": "g-order"
     },
     {
      "id": "B3b",
      "type": "build",
      "pic": "kite",
      "tiles": [
       "your",
       "Is",
       "kite",
       "this"
      ],
      "end": "?",
      "focus": "g-order"
     }
    ]
   },
   {
    "level": "C",
    "instr": "Put the words in order.",
    "ar": "رتّب الكلمات لتكوين جملة.",
    "items": [
     {
      "id": "B4a",
      "type": "build",
      "pic": "girlLong",
      "tiles": [
       "long",
       "She's",
       "hair",
       "got"
      ],
      "end": ".",
      "focus": "g-havegot"
     },
     {
      "id": "B4b",
      "type": "build",
      "pic": "noPear",
      "tiles": [
       "a",
       "haven't",
       "pear",
       "I",
       "got"
      ],
      "end": ".",
      "focus": "g-havegot"
     },
     {
      "id": "B4c",
      "type": "build",
      "pic": "boySocks",
      "tiles": [
       "his",
       "Are",
       "socks",
       "these"
      ],
      "end": "?",
      "focus": "g-plq"
     }
    ]
   }
  ]
 },
 {
  "id": "C",
  "skill": "reading",
  "title": "Reading",
  "ar": "القراءة",
  "passage": true,
  "ex": [
   {
    "level": "A",
    "instr": "Read the story. Choose Yes or No.",
    "ar": "اقرأ القصة واختر: نعم أو لا.",
    "items": [
     {
      "id": "C1a",
      "type": "mcq",
      "pic": "lucy",
      "prompt": "Lucy is eight.",
      "opts": [
       "Yes",
       "No"
      ],
      "focus": "r-detail"
     },
     {
      "id": "C1b",
      "type": "mcq",
      "pic": "dad",
      "prompt": "Lucy's dad is a teacher.",
      "opts": [
       "Yes",
       "No"
      ],
      "focus": "r-detail"
     }
    ]
   },
   {
    "level": "B",
    "instr": "Read the story again. Choose the answer.",
    "ar": "اقرأ القصة مرة أخرى واختر الإجابة.",
    "items": [
     {
      "id": "C2a",
      "type": "mcq",
      "pic": "mum",
      "prompt": "Where's Lucy's mum?",
      "opts": [
       "In the garden.",
       "In the bedroom.",
       "In the kitchen."
      ],
      "focus": "r-detail"
     },
     {
      "id": "C2b",
      "type": "pick",
      "prompt": "Which picture is Sam?",
      "opts": [
       "boyStraight",
       "lucy",
       "boyCurly"
      ],
      "focus": "r-detail"
     },
     {
      "id": "C2c",
      "type": "pick",
      "prompt": "Which is Lucy's lunch box?",
      "opts": [
       "lbSB",
       "lbSA",
       "lbAB"
      ],
      "focus": "r-detail"
     }
    ]
   },
   {
    "level": "C",
    "instr": "Read and write the answer.",
    "ar": "اقرأ واكتب الإجابة.",
    "items": [
     {
      "id": "C3a",
      "type": "type",
      "pic": "kite",
      "prompt": "Where's Lucy's kite?",
      "wide": true,
      "focus": "r-write"
     }
    ]
   }
  ]
 },
 {
  "id": "D",
  "skill": "phonics",
  "title": "Phonics and spelling",
  "ar": "الأصوات والتهجئة",
  "ex": [
   {
    "level": "A",
    "instr": "Find the small letter.",
    "ar": "ابحث عن الحرف الصغير.",
    "items": [
     {
      "id": "D1a",
      "type": "mcq",
      "big": "D",
      "pic": "dog",
      "opts": [
       "b",
       "d",
       "p"
      ],
      "focus": "p-letters"
     },
     {
      "id": "D1b",
      "type": "mcq",
      "big": "H",
      "pic": "hat",
      "opts": [
       "h",
       "n",
       "k"
      ],
      "focus": "p-letters"
     },
     {
      "id": "D1c",
      "type": "mcq",
      "pic": "rabbit",
      "prompt": "Which letter is missing?  p  q  ___  s  t",
      "opts": [
       "n",
       "u",
       "r"
      ],
      "focus": "p-abc"
     }
    ]
   },
   {
    "level": "A",
    "instr": "Look. Which letter does it start with?",
    "ar": "انظر. بأي حرف تبدأ الكلمة؟",
    "items": [
     {
      "id": "D2a",
      "type": "mcq",
      "pic": "fish",
      "opts": [
       "v",
       "f",
       "s"
      ],
      "focus": "p-initial"
     },
     {
      "id": "D2b",
      "type": "mcq",
      "pic": "lion",
      "opts": [
       "l",
       "i",
       "r"
      ],
      "focus": "p-initial"
     },
     {
      "id": "D2c",
      "type": "mcq",
      "pic": "umbrella",
      "opts": [
       "a",
       "o",
       "u"
      ],
      "focus": "p-initial"
     },
     {
      "id": "D2d",
      "type": "mcq",
      "pic": "van",
      "opts": [
       "f",
       "v",
       "w"
      ],
      "focus": "p-initial"
     }
    ]
   },
   {
    "level": "B",
    "instr": "Look and choose: sh, ch or th?",
    "ar": "انظر واختر: sh أو ch أو th",
    "items": [
     {
      "id": "D3a",
      "type": "mcq",
      "pic": "shoes",
      "prompt": "___ oes",
      "opts": [
       "ch",
       "sh",
       "th"
      ],
      "focus": "p-digraph"
     },
     {
      "id": "D3b",
      "type": "mcq",
      "pic": "chair",
      "prompt": "___ air",
      "opts": [
       "ch",
       "th",
       "sh"
      ],
      "focus": "p-digraph"
     },
     {
      "id": "D3c",
      "type": "mcq",
      "pic": "three",
      "prompt": "___ ree",
      "opts": [
       "sh",
       "ch",
       "th"
      ],
      "focus": "p-digraph"
     }
    ]
   },
   {
    "level": "C",
    "instr": "Make the word. Tap the letters.",
    "ar": "كوّن الكلمة. اضغط على الحروف.",
    "items": [
     {
      "id": "D4a",
      "type": "build",
      "letters": true,
      "pic": "kite",
      "tiles": [
       "t",
       "i",
       "k",
       "e"
      ],
      "focus": "p-spell"
     },
     {
      "id": "D4b",
      "type": "build",
      "letters": true,
      "pic": "fish",
      "tiles": [
       "s",
       "h",
       "f",
       "i"
      ],
      "focus": "p-spell"
     },
     {
      "id": "D4c",
      "type": "build",
      "letters": true,
      "pic": "doll",
      "tiles": [
       "l",
       "o",
       "d",
       "l"
      ],
      "focus": "p-spell"
     }
    ]
   }
  ]
 },
 {
  "id": "E",
  "skill": "writing",
  "title": "Writing",
  "ar": "الكتابة",
  "ex": [
   {
    "level": "A",
    "instr": "Look and write one word.",
    "ar": "انظر واكتب كلمة واحدة.",
    "items": [
     {
      "id": "E1a",
      "type": "type",
      "pic": "car",
      "prompt": "It's a ___ .",
      "focus": "w-word"
     },
     {
      "id": "E1b",
      "type": "type",
      "pic": "shoes",
      "prompt": "These are my ___ .",
      "focus": "w-word"
     }
    ]
   },
   {
    "level": "B",
    "instr": "Look at Ben. Write 2 sentences about him.",
    "ar": "انظر إلى بن. اكتب جملتين عنه.",
    "items": [
     {
      "id": "E2",
      "type": "write",
      "max": 4,
      "pic": "ben",
      "helper": [
       "Ben",
       "eight",
       "kite",
       "T-shirt",
       "red",
       "short",
       "hair"
      ],
      "frames": "He's … / He's got … / This is his …",
      "focus": "w-sent"
     }
    ]
   },
   {
    "level": "C",
    "instr": "Write about you and your family. Write 2 or 3 sentences.",
    "ar": "اكتب عن نفسك وعن عائلتك. اكتب جملتين أو ثلاث جمل.",
    "items": [
     {
      "id": "E3",
      "type": "write",
      "max": 4,
      "pic": "family",
      "helper": [
       "name",
       "years old",
       "mum",
       "dad",
       "brother",
       "sister"
      ],
      "frames": "My name's … / I'm … / I've got a … / My mum is …",
      "focus": "w-sent"
     }
    ]
   }
  ]
 }
];
const PASSAGE=[
 "Hello! My name's Lucy. I'm eight. This is my family. My mum is a teacher and my dad is a doctor. This is my brother, Sam. He's six. He's got short, curly hair. My hair is long and straight.",
 "Look! Dad and Sam are in the garden. Sam's ball is under the tree. My kite is in the tree! Mum is in the kitchen.",
 "This is my lunch box. I've got a sandwich and an apple. I haven't got a banana."
];
