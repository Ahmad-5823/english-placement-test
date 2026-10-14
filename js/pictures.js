/* Original illustrations drawn as inline SVG (no external images). */
const K={ink:'#22304A',skin:'#F7D3B5',brown:'#7A4A2A',dark:'#3E2E24',blond:'#E9C25A',grey:'#C3C8D0',red:'#E5484D',blue:'#3B7BE8',navy:'#2B4C8C',yellow:'#FFC83D',green:'#3DA35D',purple:'#8E5BD6',orange:'#F28C28',pink:'#F27DB1',wood:'#C98B4E',woodL:'#E3B27A',grass:'#9BD27A',sky:'#DDEFFF',light:'#EEF2F7',white:'#FFFFFF'};
const g=s=>`<g stroke="${K.ink}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round">${s}</g>`;
const place=(s,x,y,k)=>`<g transform="translate(${x} ${y}) scale(${k})">${s}</g>`;
const bg=(c,w=140)=>`<rect x="0" y="0" width="${w}" height="100" fill="${c}" stroke="none"/>`;
const eye=(x,y,r=1.9)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${K.ink}" stroke="none"/>`;

function person(o={}){
  const hc=o.hc||K.brown, sh=o.shirt||K.blue; let back='',front='',body='',extra='';
  if(o.hair==='long'){back=`<path d="M33 38 Q32 19 50 19 Q68 19 67 38 L70 70 Q62 73 58 64 L42 64 Q38 73 30 70 Z" fill="${hc}"/>`;front=`<path d="M34 37 Q35 23 50 23 Q65 23 66 37 Q59 29 50 30 Q41 29 34 37 Z" fill="${hc}"/>`}
  else if(o.hair==='curly'){front=[[35,34],[39,26],[47,22],[55,22],[62,27],[66,35]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${hc}"/>`).join('')}
  else if(o.hair==='bald'){front=`<circle cx="34" cy="40" r="4.5" fill="${hc}"/><circle cx="66" cy="40" r="4.5" fill="${hc}"/>`}
  else if(o.hair==='bun'){back=`<circle cx="50" cy="21" r="7" fill="${hc}"/>`;front=`<path d="M34 39 Q33 23 50 23 Q67 23 66 39 Q62 30 50 31 Q38 30 34 39 Z" fill="${hc}"/>`}
  else {front=`<path d="M34 38 Q33 22 50 22 Q67 22 66 38 Q62 30 52 31 Q42 30 34 38 Z" fill="${hc}"/>`}
  if(o.coat){body=`<path d="M24 100 Q24 66 50 63 Q76 66 76 100 Z" fill="${K.white}"/><path d="M42 64 L50 76 L58 64 Z" fill="${sh}"/><path d="M50 76 L50 100" fill="none"/><path d="M40 66 Q38 84 50 86 Q62 84 60 66" fill="none" stroke-width="2"/><circle cx="50" cy="88" r="3" fill="${K.grey}"/>`}
  else {body=`<path d="M24 100 Q24 66 50 63 Q76 66 76 100 Z" fill="${sh}"/>`}
  if(o.tie) body+=`<path d="M50 64 L46.5 71 L50 88 L53.5 71 Z" fill="${K.red}"/><path d="M36 76 L44 76 M56 76 L64 76" stroke="${K.yellow}" stroke-width="3"/>`;
  if(o.overalls) body+=`<path d="M36 100 L36 80 L64 80 L64 100 Z" fill="${K.blue}"/><path d="M38 80 L40 65 M62 80 L60 65" fill="none" stroke-width="3"/>`;
  if(o.glasses) extra+=`<circle cx="44" cy="40" r="4.6" fill="none" stroke-width="1.8"/><circle cx="56" cy="40" r="4.6" fill="none" stroke-width="1.8"/><path d="M48.6 40 L51.4 40" stroke-width="1.8"/>`;
  if(o.mustache) extra+=`<path d="M43 46.5 Q50 42.5 57 46.5 Q50 48.5 43 46.5 Z" fill="${K.grey}"/>`;
  if(o.cap) extra+=`<path d="M33 31 Q34 16 50 16 Q66 16 67 31 Z" fill="${K.navy}"/><rect x="30" y="29" width="40" height="5" rx="2" fill="${K.navy}"/><circle cx="50" cy="23" r="3" fill="${K.yellow}"/>`;
  if(o.straw) extra+=`<ellipse cx="50" cy="28" rx="25" ry="5" fill="${K.yellow}"/><path d="M38 28 Q38 13 50 13 Q62 13 62 28 Z" fill="${K.yellow}"/><path d="M38.5 24 L61.5 24" stroke="${K.red}" stroke-width="3"/>`;
  const smile=o.mustache?`<path d="M45 50 Q50 53 55 50" fill="none" stroke-width="2"/>`:`<path d="M44 47 Q50 52 56 47" fill="none" stroke-width="2"/>`;
  return g(back+body+`<circle cx="50" cy="40" r="16" fill="${K.skin}"/>`+eye(44,40)+eye(56,40)+smile+front+extra);
}
function face(part){
  const ring={eyes:`<ellipse cx="50" cy="45" rx="23" ry="10"/>`,nose:`<circle cx="50" cy="55" r="9.5"/>`,ears:`<circle cx="16" cy="52" r="11.5"/><circle cx="84" cy="52" r="11.5"/>`}[part];
  return g(`<ellipse cx="18" cy="52" rx="6" ry="10" fill="${K.skin}"/><ellipse cx="82" cy="52" rx="6" ry="10" fill="${K.skin}"/><circle cx="50" cy="52" r="31" fill="${K.skin}"/><path d="M20 46 Q18 18 50 18 Q82 18 80 46 Q72 30 50 30 Q30 30 20 46 Z" fill="${K.brown}"/><ellipse cx="39" cy="45" rx="6" ry="4" fill="#fff"/><ellipse cx="61" cy="45" rx="6" ry="4" fill="#fff"/>${eye(39,45,2.5)}${eye(61,45,2.5)}<path d="M50 48 Q46 59 50 60 Q53 60 55 58" fill="none"/><path d="M41 68 Q50 75 59 68" fill="none"/><g fill="none" stroke="${K.red}" stroke-width="3.2" stroke-dasharray="5 4">${ring}</g>`);
}
const tree=(x,y,k=1)=>place(`<rect x="-6" y="-40" width="12" height="40" fill="${K.wood}"/><circle cx="-18" cy="-44" r="13" fill="${K.green}"/><circle cx="18" cy="-44" r="13" fill="${K.green}"/><circle cx="0" cy="-56" r="22" fill="${K.green}"/>`,x,y,k);
const hand=()=>[[-11,38,16],[-5.5,33,20],[0.5,34,19],[6,40,14]].map(([x,y,h])=>`<rect x="${x}" y="${y}" width="5.5" height="${h+8}" rx="2.75" fill="${K.skin}"/>`).join('')+`<rect x="9" y="56" width="6" height="18" rx="3" fill="${K.skin}" transform="rotate(42 12 65)"/><rect x="-11" y="52" width="23" height="30" rx="9" fill="${K.skin}"/>`;
const shoe=c=>`<path d="M4 64 L6 46 Q8 40 14 40 L24 40 Q26 50 36 52 L46 55 Q52 58 52 64 Z" fill="${c}"/><rect x="3" y="63" width="50" height="6" rx="3" fill="#fff"/><path d="M15 44 L21 48 M13 49 L19 52" fill="none" stroke-width="1.5"/>`;
const sock=c=>`<path d="M30 12 L50 12 L50 54 Q50 62 58 66 L72 72 Q82 76 78 86 Q74 94 62 92 L42 86 Q28 80 30 64 Z" fill="${c}"/><rect x="30" y="12" width="20" height="10" fill="#fff"/>`;
const slideG=`<path d="M22 30 L22 88 M34 30 L34 88" fill="none" stroke-width="3"/><path d="M22 42 L34 42 M22 54 L34 54 M22 66 L34 66 M22 78 L34 78" fill="none" stroke-width="2"/><rect x="18" y="24" width="22" height="7" rx="2" fill="${K.wood}"/><path d="M38 26 Q64 32 76 64 Q82 80 94 82 L94 89 Q76 89 69 70 Q58 42 38 33 Z" fill="${K.yellow}"/>`;
const ballG=(cx,cy,r,c=K.red)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/><path d="M${cx-r*.9} ${cy-r*.25} Q${cx} ${cy+r*.3} ${cx+r*.9} ${cy-r*.25}" fill="none" stroke="#fff" stroke-width="${r*.22}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none"/>`;

const D={
  ruler:()=>{let t='';for(let i=0;i<15;i++){const x=15+i*5;t+=`<path d="M${x} 40 L${x} ${i%2?46:51}" stroke-width="1.5"/>`}return g(`<g transform="rotate(-20 50 50)"><rect x="10" y="40" width="80" height="20" rx="2" fill="${K.yellow}"/>${t}</g>`)},
  pen:()=>g(`<g transform="rotate(-30 50 50)"><path d="M22 44 L9 50 L22 56 Z" fill="${K.grey}"/><rect x="22" y="43" width="50" height="14" rx="3" fill="${K.blue}"/><rect x="62" y="41" width="24" height="18" rx="4" fill="${K.navy}"/><path d="M66 41 L66 36 L84 36" fill="none" stroke-width="2"/></g>`),
  pencil:()=>g(`<g transform="rotate(-30 50 50)"><path d="M24 43 L8 50 L24 57 Z" fill="${K.woodL}"/><path d="M13 48 L8 50 L13 52 Z" fill="${K.ink}"/><rect x="24" y="43" width="50" height="14" fill="${K.yellow}"/><rect x="74" y="43" width="6" height="14" fill="${K.grey}"/><rect x="80" y="43" width="10" height="14" rx="3" fill="${K.pink}"/></g>`),
  teddy:()=>{const b='#B5835A',l='#E9C9A3';return g(`<ellipse cx="50" cy="76" rx="21" ry="18" fill="${b}"/><ellipse cx="50" cy="79" rx="11" ry="10" fill="${l}"/><ellipse cx="28" cy="70" rx="7" ry="11" fill="${b}"/><ellipse cx="72" cy="70" rx="7" ry="11" fill="${b}"/><circle cx="33" cy="22" r="9" fill="${b}"/><circle cx="67" cy="22" r="9" fill="${b}"/><circle cx="50" cy="38" r="20" fill="${b}"/><ellipse cx="50" cy="45" rx="9" ry="7" fill="${l}"/><ellipse cx="50" cy="42" rx="3.5" ry="2.5" fill="${K.ink}"/>${eye(43,33,2)}${eye(57,33,2)}<path d="M47 48 Q50 51 53 48" fill="none" stroke-width="2"/>`)},
  banana:()=>g(`<path d="M18 30 Q22 78 72 76 Q86 74 88 66 Q52 70 30 30 Q26 24 18 30 Z" fill="${K.yellow}"/><path d="M18 30 L15 23 L22 24 Z" fill="${K.dark}"/><path d="M34 42 Q46 64 76 70" fill="none" stroke-width="1.5"/>`),
  apple:()=>g(`<path d="M50 34 C35 26 18 36 22 58 C26 80 42 86 50 80 C58 86 74 80 78 58 C82 36 65 26 50 34 Z" fill="${K.red}"/><path d="M50 34 Q50 24 54 17" fill="none" stroke-width="3"/><ellipse cx="62" cy="22" rx="8" ry="4" fill="${K.green}" transform="rotate(-25 62 22)"/>`),
  pear:()=>g(`<path d="M50 22 C44 22 43 34 40 42 C30 52 28 70 36 80 C44 88 56 88 64 80 C72 70 70 52 60 42 C57 34 56 22 50 22 Z" fill="#B9D45A"/><path d="M50 22 Q50 14 54 10" fill="none" stroke-width="3"/><ellipse cx="60" cy="16" rx="7" ry="3.5" fill="${K.green}" transform="rotate(-25 60 16)"/>`),
  grapes:()=>{const pts=[[36,40],[48,40],[60,40],[72,40],[42,51],[54,51],[66,51],[48,62],[60,62],[54,73]];return g(`<path d="M56 32 Q56 22 62 16" fill="none" stroke-width="3"/><ellipse cx="68" cy="24" rx="9" ry="5" fill="${K.green}" transform="rotate(-20 68 24)"/>`+pts.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="${K.purple}"/>`).join(''))},
  sandwich:()=>g(`<path d="M16 76 L84 76 L50 22 Z" fill="#D9A35A"/><path d="M27 70 L73 70 L50 33 Z" fill="#F6E2B8"/><path d="M14 80 Q20 76 26 80 Q32 76 38 80 Q44 76 50 80 Q56 76 62 80 Q68 76 74 80 Q80 76 86 80 L84 84 L16 84 Z" fill="${K.green}"/>`),
  bag:()=>g(`<path d="M40 30 Q40 16 50 16 Q60 16 60 30" fill="none" stroke-width="4"/><rect x="20" y="28" width="60" height="60" rx="12" fill="${K.red}"/><path d="M20 48 Q20 28 36 28 L64 28 Q80 28 80 48 L80 56 L20 56 Z" fill="#B8323A"/><rect x="44" y="52" width="12" height="10" rx="2" fill="${K.yellow}"/>`),
  kite:()=>g(`<path d="M50 72 Q40 80 52 85 Q64 90 54 97" fill="none" stroke-width="2"/><path d="M50 10 L76 40 L50 72 L24 40 Z" fill="${K.yellow}"/><path d="M50 10 L50 72 L24 40 Z" fill="${K.red}"/><path d="M24 40 L76 40" fill="none" stroke-width="2"/><path d="M45 84 L57 80 L55 89 Z" fill="${K.blue}"/>`),
  ball:()=>g(ballG(50,52,30)),
  doll:()=>g(`<path d="M42 92 L42 80 M58 92 L58 80" fill="none" stroke-width="3"/><path d="M30 82 L40 46 L60 46 L70 82 Z" fill="${K.pink}"/><path d="M40 52 L26 66 M60 52 L74 66" fill="none" stroke-width="3"/><circle cx="34" cy="24" r="7" fill="${K.yellow}"/><circle cx="66" cy="24" r="7" fill="${K.yellow}"/><circle cx="50" cy="30" r="15" fill="${K.skin}"/><path d="M35 28 Q36 14 50 14 Q64 14 65 28 Q58 21 50 22 Q42 21 35 28 Z" fill="${K.yellow}"/>${eye(45,31)}${eye(55,31)}<path d="M45 37 Q50 40 55 37" fill="none" stroke-width="2"/>`),
  car:()=>g(`<path d="M8 70 L10 54 Q12 48 20 47 L30 46 L40 33 Q42 31 46 31 L66 31 Q70 31 72 35 L79 46 L86 48 Q92 50 92 58 L92 70 Z" fill="${K.blue}"/><path d="M43 36 L36 46 L55 46 L55 36 Z" fill="${K.sky}"/><path d="M59 36 L59 46 L75 46 L69 36 Z" fill="${K.sky}"/><circle cx="28" cy="72" r="9" fill="${K.ink}"/><circle cx="72" cy="72" r="9" fill="${K.ink}"/><circle cx="28" cy="72" r="3.5" fill="${K.grey}"/><circle cx="72" cy="72" r="3.5" fill="${K.grey}"/>`),
  van:()=>g(`<path d="M8 72 L8 32 Q8 26 14 26 L62 26 Q67 26 70 31 L80 46 L88 50 Q92 52 92 58 L92 72 Z" fill="${K.green}"/><path d="M64 32 L64 48 L78 48 L70 32 Z" fill="${K.sky}"/><rect x="16" y="34" width="40" height="14" rx="2" fill="${K.sky}"/><circle cx="26" cy="74" r="9" fill="${K.ink}"/><circle cx="74" cy="74" r="9" fill="${K.ink}"/><circle cx="26" cy="74" r="3.5" fill="${K.grey}"/><circle cx="74" cy="74" r="3.5" fill="${K.grey}"/>`),
  dog:()=>{const f='#D9A066',e='#8A5A32';return g(`<circle cx="50" cy="50" r="24" fill="${f}"/><ellipse cx="28" cy="50" rx="8" ry="17" fill="${e}" transform="rotate(15 28 50)"/><ellipse cx="72" cy="50" rx="8" ry="17" fill="${e}" transform="rotate(-15 72 50)"/><ellipse cx="50" cy="62" rx="12" ry="9" fill="#F3D6AE"/><ellipse cx="50" cy="57" rx="5" ry="3.5" fill="${K.ink}"/>${eye(41,45,2.3)}${eye(59,45,2.3)}<path d="M45 66 Q50 70 55 66" fill="none" stroke-width="2"/>`)},
  hat:()=>g(`<ellipse cx="50" cy="66" rx="38" ry="10" fill="${K.blue}"/><path d="M28 66 Q28 30 50 30 Q72 30 72 66 Z" fill="${K.blue}"/><path d="M29.5 56 L70.5 56" stroke="${K.yellow}" stroke-width="6"/><path d="M28 66 Q50 72 72 66" fill="none"/>`),
  rabbit:()=>g(`<ellipse cx="38" cy="28" rx="7" ry="20" fill="#F4F4F4"/><ellipse cx="62" cy="28" rx="7" ry="20" fill="#F4F4F4"/><ellipse cx="38" cy="30" rx="3" ry="13" fill="${K.pink}" stroke="none"/><ellipse cx="62" cy="30" rx="3" ry="13" fill="${K.pink}" stroke="none"/><circle cx="50" cy="62" r="24" fill="#F4F4F4"/>${eye(41,57,2.4)}${eye(59,57,2.4)}<path d="M47 64 L53 64 L50 68 Z" fill="${K.pink}"/><path d="M50 68 L50 72 M28 64 L40 66 M28 70 L40 69 M72 64 L60 66 M72 70 L60 69" fill="none" stroke-width="1.5"/><rect x="47" y="72" width="6" height="6" rx="1" fill="#fff" stroke-width="1.5"/>`),
  fish:()=>g(`<path d="M66 50 L88 34 L86 66 Z" fill="${K.orange}"/><path d="M14 50 Q38 22 70 50 Q38 78 14 50 Z" fill="${K.orange}"/><path d="M38 37 Q48 25 58 40" fill="${K.yellow}"/>${eye(28,47,3)}<path d="M44 42 Q50 50 44 58" fill="none" stroke-width="2"/>`),
  lion:()=>g(`<circle cx="50" cy="50" r="34" fill="#D9822B"/><circle cx="35" cy="31" r="6" fill="${K.yellow}"/><circle cx="65" cy="31" r="6" fill="${K.yellow}"/><circle cx="50" cy="52" r="22" fill="${K.yellow}"/>${eye(42,46,2.4)}${eye(58,46,2.4)}<path d="M45 54 L55 54 L50 60 Z" fill="${K.dark}"/><path d="M50 60 Q46 66 42 63 M50 60 Q54 66 58 63" fill="none" stroke-width="2"/>`),
  umbrella:()=>g(`<path d="M50 54 L50 82 Q50 90 42 88 Q37 87 38 82" fill="none" stroke-width="3.5"/><path d="M12 54 Q14 18 50 16 Q86 18 88 54 Q79 47 69 54 Q60 47 50 54 Q40 47 31 54 Q22 47 12 54 Z" fill="${K.purple}"/><path d="M50 16 L50 10" fill="none" stroke-width="3"/><path d="M31 54 Q34 28 50 16 M69 54 Q66 28 50 16" fill="none" stroke-width="1.5"/>`),
  shoes:()=>g(`<g transform="translate(2 4)">${shoe(K.red)}</g><g transform="translate(44 18)">${shoe(K.red)}</g>`),
  chair:()=>g(`<rect x="30" y="58" width="6" height="32" fill="${K.wood}"/><rect x="64" y="58" width="6" height="32" fill="${K.wood}"/><rect x="30" y="10" width="40" height="44" rx="4" fill="${K.wood}"/><rect x="38" y="18" width="24" height="28" rx="2" fill="${K.woodL}"/><rect x="24" y="52" width="52" height="9" rx="2" fill="${K.wood}"/>`),
  three:()=>g(`<text x="50" y="76" text-anchor="middle" font-family="'Baloo 2',Arial,sans-serif" font-weight="800" font-size="80" fill="${K.blue}" paint-order="stroke" stroke-width="3">3</text><circle cx="36" cy="90" r="4" fill="${K.yellow}"/><circle cx="50" cy="90" r="4" fill="${K.yellow}"/><circle cx="64" cy="90" r="4" fill="${K.yellow}"/>`),
  socks:()=>g(`<g transform="translate(-10 4)">${sock(K.blue)}</g><g transform="translate(14 2)">${sock(K.red)}</g>`),
  tshirt:(c=K.green)=>g(`<path d="M30 20 L42 15 Q50 24 58 15 L70 20 L88 34 L78 47 L70 41 L70 86 L30 86 L30 41 L22 47 L12 34 Z" fill="${c}"/>`),
  dress:()=>g(`<path d="M40 12 L44 12 L46 26 L54 26 L56 12 L60 12 L62 30 L58 37 L80 86 L20 86 L42 37 L38 30 Z" fill="${K.pink}"/><path d="M42 37 L58 37" fill="none" stroke-width="3"/>`),
  coat:()=>{const c='#9C6B3E';return g(`<path d="M30 18 L14 62 L24 66 L34 40 Z" fill="${c}"/><path d="M70 18 L86 62 L76 66 L66 40 Z" fill="${c}"/><path d="M30 18 L44 14 L50 26 L56 14 L70 18 L76 88 L24 88 Z" fill="${c}"/><path d="M50 26 L50 88" fill="none"/><path d="M44 14 L40 32 L50 26 M56 14 L60 32 L50 26" fill="none"/><circle cx="55" cy="42" r="2.6" fill="${K.yellow}"/><circle cx="55" cy="56" r="2.6" fill="${K.yellow}"/><circle cx="55" cy="70" r="2.6" fill="${K.yellow}"/>`)},
  shorts:()=>g(`<path d="M22 24 L78 24 L84 74 L58 76 L50 46 L42 76 L16 74 Z" fill="${K.blue}"/><path d="M22 32 L78 32" fill="none"/>`),
  trousers:()=>g(`<path d="M28 12 L72 12 L76 90 L56 90 L50 36 L44 90 L24 90 Z" fill="#3A4E86"/><path d="M28 20 L72 20" fill="none"/>`),
  window:()=>g(`<rect x="22" y="12" width="56" height="70" rx="2" fill="${K.sky}"/><path d="M50 12 L50 82 M22 47 L78 47" fill="none" stroke-width="4"/><path d="M14 8 L30 8 Q26 50 34 86 L14 86 Z" fill="${K.red}"/><path d="M86 8 L70 8 Q74 50 66 86 L86 86 Z" fill="${K.red}"/><rect x="12" y="82" width="76" height="8" rx="2" fill="${K.wood}"/><path d="M10 8 L90 8" fill="none" stroke-width="3"/>`),
  slide:()=>g(slideG+`<path d="M6 89 L96 89" fill="none"/>`),
  swing:()=>g(`<path d="M18 14 L8 90 M18 14 L28 90 M82 14 L72 90 M82 14 L92 90" fill="none" stroke-width="3.5"/><rect x="12" y="10" width="76" height="7" rx="3" fill="${K.wood}"/><path d="M40 17 L40 66 M60 17 L60 66" fill="none" stroke-width="2"/><rect x="34" y="64" width="32" height="7" rx="2" fill="${K.red}"/>`),
  seesaw:()=>g(`<path d="M40 86 L50 60 L60 86 Z" fill="${K.red}"/><g transform="rotate(-15 50 58)"><rect x="8" y="54" width="84" height="8" rx="3" fill="${K.wood}"/><path d="M16 54 L16 46 L22 46 M84 54 L84 46 L78 46" fill="none" stroke-width="3"/></g><path d="M6 88 L94 88" fill="none"/>`),
  triangle:()=>g(`<path d="M50 14 L88 84 L12 84 Z" fill="${K.orange}" stroke-width="3.5"/>`),
  faceEyes:()=>face('eyes'), faceNose:()=>face('nose'), faceEars:()=>face('ears'),
  hands:()=>g(`<g transform="translate(30 4)">${hand()}</g><g transform="translate(70 4) scale(-1 1)">${hand()}</g>`),
  farmer:()=>person({hair:'short',hc:K.brown,shirt:K.red,straw:true,overalls:true}),
  pilot:()=>person({hair:'short',hc:K.dark,shirt:K.navy,cap:true,tie:true}),
  doctor:()=>person({hair:'long',hc:K.dark,shirt:K.blue,coat:true}),
  dad:()=>person({hair:'short',hc:K.brown,shirt:K.blue}),
  mum:()=>person({hair:'long',hc:K.brown,shirt:K.purple}),
  grandpa:()=>person({hair:'bald',hc:K.grey,shirt:K.green,glasses:true,mustache:true}),
  grandma:()=>person({hair:'bun',hc:K.grey,shirt:K.pink,glasses:true}),
  girlCurly:()=>person({hair:'curly',hc:K.brown,shirt:K.green}),
  girlLong:()=>person({hair:'long',hc:K.blond,shirt:K.pink}),
  lucy:()=>person({hair:'long',hc:K.brown,shirt:K.orange}),
  boyCurly:()=>person({hair:'curly',hc:K.brown,shirt:K.green}),
  boyStraight:()=>person({hair:'short',hc:K.blond,shirt:K.red}),
  lunch:(a,b)=>g(`<path d="M38 38 Q38 26 50 26 Q62 26 62 38" fill="none" stroke-width="4"/><rect x="10" y="36" width="80" height="54" rx="9" fill="${K.blue}"/><rect x="16" y="42" width="68" height="42" rx="6" fill="${K.light}"/>`)+place(D[a](),15,45,.36)+place(D[b](),49,45,.36),
  lbSA:()=>D.lunch('sandwich','apple'), lbSB:()=>D.lunch('sandwich','banana'), lbAB:()=>D.lunch('apple','banana'), lbSG:()=>D.lunch('sandwich','grapes'),
  /* wide scenes (140 x 100) */
  kitchen:()=>g(bg(K.light)+`<rect x="8" y="8" width="38" height="22" rx="2" fill="${K.woodL}"/><rect x="46" y="8" width="38" height="22" rx="2" fill="${K.woodL}"/><rect x="8" y="50" width="36" height="40" rx="2" fill="#fff"/><rect x="13" y="62" width="26" height="22" rx="2" fill="${K.grey}"/><path d="M19 67 L33 67" fill="none"/><circle cx="16" cy="56" r="2" fill="${K.ink}"/><circle cx="26" cy="56" r="2" fill="${K.ink}"/><circle cx="36" cy="56" r="2" fill="${K.ink}"/><path d="M14 36 L38 36 L36 50 L16 50 Z" fill="${K.red}"/><path d="M10 38 L14 38 M38 38 L42 38" fill="none"/><rect x="46" y="54" width="36" height="5" fill="${K.grey}"/><rect x="46" y="59" width="36" height="31" fill="${K.woodL}"/><path d="M64 59 L64 90" fill="none"/><path d="M64 54 L64 45 L56 45" fill="none" stroke-width="3"/><path d="M2 90 L138 90" fill="none"/>`)+place(D.mum(),84,36,.54),
  garden:()=>g(bg(K.sky)+`<circle cx="124" cy="16" r="9" fill="${K.yellow}"/><rect x="0" y="70" width="140" height="30" fill="${K.grass}"/>`+[8,26,44,62,80,98,116].map(x=>`<rect x="${x}" y="50" width="9" height="22" fill="#fff"/>`).join('')+`<path d="M0 58 L140 58" fill="none"/>`+tree(30,78,.8)+[[10,86,K.red],[22,92,K.yellow],[48,90,K.pink]].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${c}"/>`).join(''))+place(D.grandpa(),70,34,.62),
  girlBedroom:()=>g(bg(K.light)+`<rect x="98" y="12" width="30" height="26" fill="${K.sky}"/><path d="M113 12 L113 38" fill="none"/><path d="M0 88 L140 88" fill="none"/><rect x="74" y="42" width="8" height="48" rx="2" fill="${K.wood}"/><rect x="80" y="62" width="56" height="14" rx="3" fill="#fff"/><rect x="98" y="58" width="38" height="20" rx="3" fill="${K.blue}"/><ellipse cx="92" cy="60" rx="10" ry="5" fill="#fff"/><rect x="130" y="76" width="5" height="12" fill="${K.wood}"/>`)+place(person({hair:'long',hc:K.brown,shirt:K.yellow}),2,22,.7),
  parkOn:()=>park('on'), parkUnder:()=>park('under'),
  rosyBag:()=>place(person({hair:'long',hc:K.dark,shirt:K.pink}),0,8,.92)+place(D.bag(),82,30,.56),
  tomShirt:()=>place(person({hair:'short',hc:K.brown,shirt:K.blue}),0,8,.92)+place(D.tshirt(K.green),82,30,.56),
  boySocks:()=>place(person({hair:'short',hc:K.dark,shirt:K.orange}),0,8,.92)+place(D.socks(),84,32,.54),
  noPear:()=>place(D.lbSA(),0,6,.9)+place(D.pear(),92,24,.44)+`<path d="M96 30 L132 66 M132 30 L96 66" stroke="${K.red}" stroke-width="5" stroke-linecap="round" fill="none"/>`,
  ben:()=>g(bg(K.sky)+`<rect x="0" y="84" width="140" height="16" fill="${K.grass}"/><path d="M111 38 Q96 60 74 92" fill="none" stroke-width="1.5"/>`)+place(person({hair:'short',hc:K.brown,shirt:K.red}),4,14,.86)+place(D.kite(),86,2,.5),
  /* extra wide scenes (160 x 100) */
  reading:()=>g(bg(K.sky,160)+`<rect x="0" y="80" width="160" height="20" fill="${K.grass}"/>`+tree(104,86,1.05)+ballG(124,84,6))+place(D.kite(),99,4,.3)+place(D.dad(),2,34,.62)+place(D.boyCurly(),46,52,.46),
  family:()=>g(bg(K.light,160)+`<path d="M0 92 L160 92" fill="none"/>`)+place(D.dad(),0,30,.62)+place(D.mum(),38,30,.62)+place(D.lucy(),80,48,.46)+place(D.boyCurly(),114,48,.46)
};
function park(pos){
  const ball=pos==='on'?ballG(75,30,7):ballG(80,81,7);
  return g(bg(K.sky)+`<circle cx="124" cy="16" r="9" fill="${K.yellow}"/><rect x="0" y="88" width="140" height="12" fill="${K.grass}"/>`+tree(122,90,.7)+place(slideG,10,0,1)+ball);
}
const VB={kitchen:'0 0 140 100',garden:'0 0 140 100',girlBedroom:'0 0 140 100',parkOn:'0 0 140 100',parkUnder:'0 0 140 100',rosyBag:'0 0 140 100',tomShirt:'0 0 140 100',boySocks:'0 0 140 100',noPear:'0 0 140 100',ben:'0 0 140 100',reading:'0 0 160 100',family:'0 0 160 100'};
const CACHE={};
function pic(n){ if(!CACHE[n]) CACHE[n]=`<svg viewBox="${VB[n]||'0 0 100 100'}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">${D[n]()}</svg>`; return CACHE[n]; }
const picClass=n=>VB[n]?(VB[n].includes('160')?'xwide':'wide'):'';
