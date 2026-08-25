/* Parth Chat v3 — word-boundary matching */
(function(){
var E='shampanchal66@gmail.com';
var EL='<a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to='+E+'" target="_blank">'+E+'</a>';
var CN='<div style="margin-top:10px;padding:8px 14px;background:rgba(124,58,237,.12);border:1px solid rgba(124,58,237,.2);border-radius:12px;font-size:.8rem;color:#a78bfa;font-weight:600">For more details, contact us at '+EL+'</div>';

var KB=[
[/\b(hello|hi|hey|good\s*morning|good\s*evening|namaste|howdy)\b/i,'Hey there! I am **Parth**, your assistant at 0D Technologies. I can help you with our services, products, pricing, or getting started with a project. What would you like to know?'],
[/\b(who\s+are\s+you|your\s+name|what\s+are\s+you|tell\s+me\s+about\s+yourself|introduce)\b/i,'I am **Parth** \u2014 the virtual assistant for 0D Technologies. I am here 24/7 to answer your questions. What can I assist you with?'],
[/\b(services|what\s+do\s+you\s+do|what\s+you\s+offer|what\s+do\s+you\s+offer|offerings|solutions)\b/i,'We provide a full range of digital solutions:\n\n\u2022 **Custom Applications** \u2014 Android, iOS, Windows\n\u2022 **Custom Software** \u2014 end-to-end development\n\u2022 **Custom Websites** \u2014 modern, fast, responsive\n\u2022 **Backend and APIs** \u2014 scalable server architecture\n\u2022 **UI/UX Design** \u2014 user-centered interfaces\n\nEach project gets our full attention from concept to deployment.'+CN],
[/\b(0d\s*billing|billing\s*app|billing\s*software|zdt\s*billing|invoic(e|ing))\b/i,'**0D Billing** is our streamlined invoicing app for businesses:\n\n\u2022 Generate invoices quickly\n\u2022 Manage inventory\n\u2022 Track payments\n\u2022 Available on **Android** and **Windows**\n\n<a href="zdt-billing.html">Check it out \u2192</a>'+CN],
[/\b(0d\s*tailor|tailor\s*app|tailor\s*software|zdt\s*tailor)\b/i,'**0D Tailor** is built specifically for tailor shops:\n\n\u2022 Track customer measurements\n\u2022 Manage orders end-to-end\n\u2022 Generate bills\n\u2022 Available on **Android**\n\n<a href="zdt-tailor.html">Learn more \u2192</a>'+CN],
[/\b(how\s+much|pricing|price|cost|rates|budget|charges|expensive|affordable)\b/i,'Pricing depends on the project scope:\n\n\u2022 **Starter** \u2014 from $499\n\u2022 **Growth** \u2014 from $1,499\n\u2022 **Enterprise** \u2014 custom quote\n\n<a href="hire-us.html">See full pricing details \u2192</a>'+CN],
[/\b(contact|how\s+to\s+contact|how\s+can\s+i\s+contact|reach\s+you|get\s+in\s+touch|email|phone|whatsapp)\b/i,'You can reach us anytime:\n\n\u2022 Email: '+EL+'\n\u2022 <a href="contact.html">Contact Page \u2192</a>\n\u2022 <a href="hire-us.html">Hire Us Page \u2192</a>\n\nWe typically respond within 24 hours!'],
[/\b(hire|hire\s+you|start\s+a\s+project|how\s+to\s+start|i\s+want\s+to\s+hire|i\s+have\s+a\s+project|work\s+with\s+you|commission)\b/i,'Great! Here is how to get started:\n\n1. Visit our <a href="hire-us.html">Hire Us</a> page\n2. Fill out the project form\n3. We will get back to you within 24 hours\n\nOr email us directly \u2014 we would love to hear about your idea!'+CN],
[/\b(portfolio|your\s+work|show\s+me|what\s+have\s+you\s+built|past\s+projects|case\s+studies)\b/i,'Here are some of our projects:\n\n\u2022 **0D Billing** \u2014 invoicing app\n\u2022 **0D Tailor** \u2014 tailor shop management\n\u2022 **Caapify** \u2014 AI photo captioning\n\u2022 **CreatorBridge India** \u2014 influencer marketing\n\n<a href="work.html">See full portfolio \u2192</a>'+CN],
[/\b(who\s+is\s+0d|what\s+is\s+0d|about\s+0d|0d\s+technologies|0th\s+dimension|company)\b/i,'**0D Technologies** (0th Dimension Technologies) builds custom software, mobile apps, and websites. We focus on clean code, thoughtful design, and real business impact.\n\nWe are based in India, serving clients worldwide.\n\n<a href="about.html">Learn more \u2192</a>'+CN],
[/\b(where\s+are\s+you|location|based|office|address|which\s+city|which\s+country)\b/i,'We are based in **India** and work with clients worldwide. Everything is remote \u2014 so location is never a barrier!'+CN],
[/\b(tech\s+stack|technology\s+stack|what\s+technologies|what\s+tech|which\s+technologies|frameworks|languages)\b/i,'Our tech stack:\n\n\u2022 **Frontend:** HTML, CSS, JavaScript, Flutter, React Native\n\u2022 **Backend:** Node.js, Python, Firebase\n\u2022 **Mobile:** Android (Java/Kotlin), iOS (Swift)\n\u2022 **Design:** Figma\n\u2022 **Deploy:** Vercel, Firebase Hosting'+CN],
[/\b(how\s+long|timeline|duration|deadline|turnaround|delivery\s+time)\b/i,'Typical timelines:\n\n\u2022 **Landing page:** 3\u20135 days\n\u2022 **Web app:** 2\u20136 weeks\n\u2022 **Mobile app:** 4\u20138 weeks\n\u2022 **Custom software:** 6\u201312 weeks'+CN],
[/\b(after\s+launch|maintenance|ongoing\s+support|bug\s+fix|support)\b/i,'We provide ongoing support after launch:\n\n\u2022 Bug fixes\n\u2022 Feature updates\n\u2022 Performance optimization\n\u2022 Hosting management'+CN],
[/\b(thanks|thank\s+you|thx|appreciate)\b/i,'You are welcome! Happy to help. If you have more questions, just ask \u2014 or reach us at '+EL],
[/\b(goodbye|bye|see\s+you|talk\s+later)\b/i,'Goodbye! Have a great day. Feel free to come back anytime \u2014 I am always here to help.'+CN],
[/\b(team|how\s+many\s+people|employees|staff)\b/i,'We are a focused team of developers and designers. We scale up with trusted collaborators for larger projects.'+CN],
[/\b(mobile\s+app|android\s+app|ios\s+app|app\s+development|build\s+an?\s+app|flutter|react\s+native)\b/i,'We build mobile apps for **Android** and **iOS** using:\n\n\u2022 **Flutter** (cross-platform)\n\u2022 **React Native**\n\u2022 **Native Android** (Java/Kotlin)\n\u2022 **Native iOS** (Swift)\n\nGot an app idea?'+CN],
[/\b(website|web\s+development|build\s+a?\s*website|landing\s+page|business\s+website|web\s+app)\b/i,'We build modern, fast, responsive websites:\n\n\u2022 Landing pages\n\u2022 Business websites\n\u2022 Web applications\n\u2022 E-commerce\n\n<a href="hire-us.html">Get a quote \u2192</a>'+CN],
[/\b(ui\s*\/?\s*ux|design|interface|figma|prototype|wireframe|user\s+experience)\b/i,'Our UI/UX process:\n\n1. Research and wireframing\n2. High-fidelity prototypes in **Figma**\n3. User testing\n4. Design systems'+CN],
[/\b(backend|api|server|database|firebase|rest|graphql)\b/i,'We build scalable backends with:\n\n\u2022 **Node.js** and **Python** APIs\n\u2022 **Firebase** (Auth, Firestore, Hosting)\n\u2022 **SQL** databases\n\u2022 RESTful and GraphQL APIs'+CN],
[/\b(mvp|startup|saas|minimum\s+viable)\b/i,'We help startups build MVPs fast:\n\n\u2022 Rapid prototyping\n\u2022 Core feature development\n\u2022 Scalable architecture\n\u2022 Ready for investors\n\n<a href="hire-us.html">Let us talk \u2192</a>'+CN],
[/\b(ecommerce|e-commerce|online\s+store|online\s+shop|shopping\s+cart)\b/i,'We can build e-commerce solutions:\n\n\u2022 Custom storefronts\n\u2022 Payment integration\n\u2022 Inventory management\n\u2022 Admin dashboards'+CN],
[/\b(security|secure|privacy|encryption|data\s+protection)\b/i,'Security is built into everything we do:\n\n\u2022 Secure authentication\n\u2022 Data encryption\n\u2022 Regular security audits\n\u2022 GDPR-aware practices'+CN],
[/\b(razorpay|stripe|upi|paypal|payment\s*gateway|integrate\s+payment)\b/i,'We integrate payment systems:\n\n\u2022 **Razorpay**\n\u2022 **Stripe**\n\u2022 **UPI**\n\u2022 **PayPal**\n\nBoth 0D Billing and custom projects support secure payments.'+CN],
[/\b(deploy|hosting|domain|vercel|netlify|go\s+live|launch)\b/i,'We handle deployment end-to-end:\n\n\u2022 **Vercel** for web apps\n\u2022 **Firebase Hosting** for full-stack\n\u2022 **Google Play** and **App Store** for mobile'+CN],
[/\b(your\s+process|how\s+does\s+it\s+work|workflow|steps\s+involved|how\s+you\s+work)\b/i,'Our process:\n\n1. **Discover** \u2014 We understand your needs\n2. **Design** \u2014 Wireframes and prototypes\n3. **Develop** \u2014 Clean, scalable code\n4. **Deliver** \u2014 Testing and deployment'+CN],
[/\b(why\s+should\s+i|why\s+choose|what\s+makes\s+you|reason\s+to\s+choose)\b/i,'Why choose 0D Technologies?\n\n\u2022 Clean, maintainable code\n\u2022 Modern tech stack\n\u2022 On-time delivery\n\u2022 Transparent communication\n\u2022 Competitive pricing'+CN],
[/\b(chatbot|ai|artificial\s+intelligence|machine\s+learning|automation)\b/i,'We can build AI-powered features:\n\n\u2022 Chatbots and virtual assistants\n\u2022 Image/text recognition\n\u2022 Recommendation engines\n\u2022 Process automation\n\nWant to add AI to your project?'+CN],
[/\b(wordpress|cms|content\s+management|blog\s+website)\b/i,'We primarily build custom solutions (not WordPress). Our approach gives you:\n\n\u2022 Faster performance\n\u2022 Better security\n\u2022 Full control over features'+CN],
[/\b(hiring|job|career|internship|join\s+your\s+team)\b/i,'We are always looking for talented people! Send your portfolio to '+EL+' \u2014 we would love to connect.'+CN],
[/\b(platform|which\s+platform|android\s+or\s+ios|windows\s+app|cross\s*platform)\b/i,'We develop for all major platforms:\n\n\u2022 **Android** \u2014 Java/Kotlin, Flutter\n\u2022 **iOS** \u2014 Swift, Flutter\n\u2022 **Windows** \u2014 Desktop apps\n\u2022 **Web** \u2014 Any browser'+CN]
];

var FB='I am not sure I understand that. For any queries, feel free to contact us at '+EL+' \u2014 we are always happy to help!';
var G='Hi there! I am **Parth** from 0D Technologies. I can help you with:\n\n\u2022 Our **services** and **products**\n\u2022 **Pricing** and timelines\n\u2022 How to **start a project**\n\u2022 Any other questions\n\nWhat would you like to know?';
var Q=['What services do you offer?','Tell me about 0D Billing','How much does it cost?','How can I contact you?'];

var css=document.createElement('style');
css.textContent='.chat-fab{position:fixed;bottom:28px;right:28px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#ec4899);border:none;cursor:pointer;z-index:10000;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(124,58,237,.4);transition:transform .3s,box-shadow .3s}.chat-fab:hover{transform:scale(1.08)}.chat-fab i{font-size:1.4rem;color:#fff}.chat-fab.open i{transform:rotate(90deg)}.chat-fab .notif{position:absolute;top:-2px;right:-2px;width:14px;height:14px;background:#ef4444;border-radius:50%;border:2px solid #0a0e1a;animation:cp 2s infinite}@keyframes cp{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{box-shadow:0 0 0 6px rgba(239,68,68,0)}}.chat-win{position:fixed;bottom:100px;right:28px;width:420px;max-height:560px;background:#111827;border:1px solid rgba(255,255,255,.06);border-radius:24px;z-index:9999;display:flex;flex-direction:column;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(20px) scale(.95);transition:all .35s cubic-bezier(.16,1,.3,1);box-shadow:0 20px 60px rgba(0,0,0,.5)}.chat-win.show{opacity:1;visibility:visible;transform:translateY(0) scale(1)}.chat-hdr{padding:18px 20px;background:linear-gradient(135deg,rgba(124,58,237,.15),rgba(236,72,153,.1));border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:12px}.chat-hdr .av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:#fff;flex-shrink:0;box-shadow:0 2px 12px rgba(124,58,237,.3)}.chat-hdr .inf{flex:1}.chat-hdr .nm{font-weight:700;font-size:.9rem;color:#f8fafc}.chat-hdr .st{font-size:.75rem;color:#84cc16;display:flex;align-items:center;gap:5px}.chat-hdr .st::before{content:"";width:6px;height:6px;background:#84cc16;border-radius:50%}.chat-hdr .cx{background:none;border:none;color:#64748b;font-size:1.1rem;cursor:pointer;padding:4px}.chat-hdr .cx:hover{color:#f8fafc}.chat-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}.chat-body::-webkit-scrollbar{width:4px}.chat-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}.cm{display:flex;gap:8px;max-width:88%;animation:cmIn .3s cubic-bezier(.16,1,.3,1)}.cm.bot{align-self:flex-start}.cm.usr{align-self:flex-end;flex-direction:row-reverse}@keyframes cmIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.cm .bb{padding:12px 16px;font-size:.85rem;line-height:1.65;border-radius:20px;word-break:break-word;font-family:Outfit,sans-serif}.cm.bot .bb{background:#1a1f35;color:#cbd5e1;border-bottom-left-radius:4px}.cm.usr .bb{background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;border-bottom-right-radius:4px}.cm .ma{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;color:#fff;flex-shrink:0;margin-top:2px}.cm.usr .ma{display:none}.cm .bb a{color:#a78bfa;text-decoration:underline;text-underline-offset:2px}.cm.usr .bb a{color:#fff}.ctyp{display:flex;gap:4px;padding:12px 16px;background:#1a1f35;border-radius:20px;border-bottom-left-radius:4px;width:fit-content;align-self:flex-start}.ctyp span{width:6px;height:6px;background:#64748b;border-radius:50%;animation:td .8s infinite}.ctyp span:nth-child(2){animation-delay:.15s}.ctyp span:nth-child(3){animation-delay:.3s}@keyframes td{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-4px);opacity:1}}.cqr{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 8px;align-self:flex-start}.cqr button{padding:7px 14px;border-radius:100px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:#94a3b8;font-size:.75rem;font-family:Outfit,sans-serif;cursor:pointer;transition:all .2s;white-space:nowrap}.cqr button:hover{border-color:#7c3aed;color:#a78bfa}.cft{padding:10px 16px;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.7rem;color:#475569}.cft a{color:#7c3aed;text-decoration:none}.cin{display:flex;gap:8px;padding:14px 16px;border-top:1px solid rgba(255,255,255,.06);background:#1a1f35}.cin input{flex:1;padding:10px 16px;border-radius:100px;border:1px solid rgba(255,255,255,.08);background:#0a0e1a;color:#f8fafc;font-family:Outfit,sans-serif;font-size:.85rem;outline:none}.cin input:focus{border-color:#7c3aed}.cin input::placeholder{color:#475569}.cin .send{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#ec4899);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;transition:transform .2s;flex-shrink:0}.cin .send:hover{transform:scale(1.05)}@media(max-width:480px){.chat-win{right:10px;left:10px;bottom:80px;width:auto;max-height:72vh;border-radius:20px}.chat-fab{bottom:18px;right:18px;width:54px;height:54px}}';
document.head.appendChild(css);

var fab=document.createElement('button');
fab.className='chat-fab';
fab.innerHTML='<i class="fas fa-comments"></i><span class="notif" style="display:none"></span>';
document.body.appendChild(fab);

var win=document.createElement('div');
win.className='chat-win';
win.innerHTML='<div class="chat-hdr"><div class="av">P</div><div class="inf"><div class="nm">Parth \u2014 0D Technologies</div><div class="st">Online now</div></div><button class="cx" aria-label="Close"><i class="fas fa-times"></i></button></div><div class="chat-body" id="chatBody"></div><div class="cft">For detailed queries, email us at <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to='+E+'" target="_blank">'+E+'</a></div><div class="cin"><input type="text" id="chatIn" placeholder="Ask me anything..."><button class="send" id="chatSend"><i class="fas fa-paper-plane"></i></button></div>';
document.body.appendChild(win);

var body=document.getElementById('chatBody');
var inp=document.getElementById('chatIn');
var sbtn=document.getElementById('chatSend');
var cbtn=win.querySelector('.cx');
var ntf=fab.querySelector('.notif');
var open=false, greeted=false;

function sd(){body.scrollTop=body.scrollHeight}

function msg(t,u){
var d=document.createElement('div');
d.className='cm '+(u?'usr':'bot');
d.innerHTML=(u?'':'<div class="ma">P</div>')+'<div class="bb">'+t+'</div>';
body.appendChild(d);
sd();
}

function qr(arr){
var w=document.createElement('div');
w.className='cqr';
for(var i=0;i<arr.length;i++){
(function(t){
var b=document.createElement('button');
b.textContent=t;
b.onclick=function(){send(t);if(w.parentNode)w.parentNode.removeChild(w);};
w.appendChild(b);
})(arr[i]);
}
body.appendChild(w);
sd();
}

function typ(){
var t=document.createElement('div');
t.className='ctyp';t.id='ctyp';
t.innerHTML='<span></span><span></span><span></span>';
body.appendChild(t);sd();
}

function htyp(){var t=document.getElementById('ctyp');if(t)t.parentNode.removeChild(t);}

function reply(txt){
for(var i=0;i<KB.length;i++){
if(KB[i][0].test(txt))return KB[i][1];
}
return FB;
}

function send(txt){
if(!txt||!txt.trim())return;
msg(txt,true);
inp.value='';inp.focus();
typ();
setTimeout(function(){htyp();msg(reply(txt),false);},500+Math.random()*500);
}

sbtn.addEventListener('click',function(e){e.preventDefault();send(inp.value);});
inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();send(inp.value);}});

fab.addEventListener('click',function(){
open=!open;
win.classList.toggle('show',open);
fab.classList.toggle('open',open);
ntf.style.display='none';
if(open&&!greeted){greeted=true;typ();setTimeout(function(){htyp();msg(G,false);qr(Q);},500);}
if(open)inp.focus();
});
cbtn.addEventListener('click',function(){open=false;win.classList.remove('show');fab.classList.remove('open');});

setTimeout(function(){if(!greeted)ntf.style.display='block';},3000);
})();
