/* ============================================================
   Parth — 0D Technologies assistant (v2)
   Single-file, dependency-free. Scored intent matching,
   conversation context, guided lead capture, persistence.
   ============================================================ */
(function () {
    'use strict';

    var EMAIL = 'shampanchal66@gmail.com';
    var MAILTO = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + EMAIL;
    var STORE = '0d_parth_v2';
    var MAX_HISTORY = 40;

    /* ---------------------------------------------------------
       Knowledge base
       re      : strong patterns (score 100)
       kw      : weighted keywords
       a       : answer HTML
       more    : optional deeper answer for "tell me more"
       q       : suggested follow-up chips
       --------------------------------------------------------- */
    var KB = [
        {
            id: 'greeting',
            re: [/^(hi|hii+|hey+|hello+|yo|namaste|good\s*(morning|afternoon|evening)|howdy)\b/i],
            kw: { hi: 4, hello: 4, hey: 4, namaste: 4, morning: 2, evening: 2 },
            a: 'Hey! I\'m <strong>Parth</strong>, the 0D Technologies assistant. I can help with services, products, pricing, timelines or starting a project. What would you like to know?',
            q: ['What services do you offer?', 'Show me your products', 'How much does a website cost?', 'Start a project']
        },
        {
            id: 'identity',
            re: [/\b(who are you|your name|what are you|are you (a )?(bot|human|real)|introduce yourself)\b/i],
            kw: { bot: 4, human: 3, robot: 3, assistant: 4, name: 2, parth: 4 },
            a: 'I\'m <strong>Parth</strong> — a virtual assistant built by 0D Technologies. I answer instantly, 24/7. For anything I can\'t solve, I\'ll hand you straight to the team at <a href="' + MAILTO + '" target="_blank" rel="noopener">' + EMAIL + '</a>.',
            q: ['What can you help with?', 'How can I contact you?']
        },
        {
            id: 'capabilities',
            re: [/\b(what can you (do|help)|how can you help|what do you know|help me)\b/i],
            kw: { help: 3, assist: 3, capabilities: 4 },
            a: 'I can help you with:<ul><li><strong>Services</strong> — apps, software, websites, backend, UI/UX</li><li><strong>Products</strong> — 0D Billing, 0D Tailor, AURA</li><li><strong>Pricing &amp; timelines</strong></li><li><strong>Starting a project</strong> — I\'ll collect the brief for you</li><li><strong>Downloads &amp; installs</strong></li></ul>Just ask in your own words.',
            q: ['What services do you offer?', 'Show me your products', 'Pricing', 'Start a project']
        },
        {
            id: 'services',
            re: [/\b(what (do|can) you (do|offer)|your services|services (do )?you offer|what do you offer)\b/i],
            kw: { services: 5, service: 4, offer: 2, solutions: 3, provide: 2 },
            a: 'We build end-to-end digital products:<ul><li><strong>Custom applications</strong> — Android, iOS, Windows, macOS</li><li><strong>Custom software</strong> — internal tools, automation, dashboards</li><li><strong>Websites &amp; web apps</strong> — landing pages to full platforms</li><li><strong>Backend &amp; APIs</strong> — Node.js, Python, Firebase</li><li><strong>UI/UX design</strong> — research, prototypes, design systems</li></ul>Every project gets one focused team from concept to launch.',
            more: 'A typical engagement runs in four stages: <strong>Discover</strong> (requirements and scope), <strong>Design</strong> (wireframes and prototypes), <strong>Develop</strong> (clean, tested code), <strong>Deliver</strong> (deployment plus handover). You get progress updates at every stage and full ownership of the code.',
            q: ['How much does it cost?', 'How long does it take?', 'See your work', 'Start a project']
        },
        {
            id: 'apps',
            re: [/\b(app|apps|android|ios|iphone|mobile app|flutter|react native)\b/i],
            kw: { app: 4, apps: 4, android: 4, ios: 4, iphone: 3, mobile: 4, flutter: 3, native: 2, playstore: 3, 'play store': 3 },
            a: 'We build mobile apps for <strong>Android</strong> and <strong>iOS</strong>:<ul><li>Flutter and React Native for cross-platform</li><li>Native Android (Kotlin/Java) and iOS (Swift) when performance matters</li><li>Offline-first storage, push notifications, payments, analytics</li></ul>Timeline is usually 4–8 weeks for a first release.',
            q: ['Show me an app you built', 'How much does an app cost?', 'Start a project']
        },
        {
            id: 'websites',
            re: [/\b(website|web ?site|web development|landing page|web app|frontend|front-end)\b/i],
            kw: { website: 5, sites: 3, site: 3, webpage: 3, landing: 4, web: 3, frontend: 4, seo: 2 },
            a: 'We build fast, responsive websites:<ul><li>Landing pages and marketing sites</li><li>Business and portfolio sites</li><li>Web apps and dashboards</li><li>E-commerce with secure payments</li></ul>All sites are mobile-first, accessible and SEO-ready.',
            more: 'Every site ships with: responsive layouts down to 360px, structured data, a sitemap, Open Graph tags, image optimisation and a Lighthouse pass. Hosting can be set up on Vercel or Firebase with your domain.',
            q: ['How much does a website cost?', 'Do you do SEO?', 'See your work']
        },
        {
            id: 'software',
            re: [/\b(custom software|software development|desktop app|windows app|internal tool|erp|crm|automation)\b/i],
            kw: { software: 5, custom: 3, desktop: 4, windows: 4, internal: 3, automation: 4, erp: 4, crm: 4, tool: 2 },
            a: 'Yes — custom software is our core work. Examples:<ul><li>Billing and inventory systems</li><li>Windows desktop tools (like <a href="aura.html">AURA</a>)</li><li>Internal dashboards and reporting</li><li>Automations that replace manual spreadsheets</li></ul>We handle architecture, UI, data migration and deployment.',
            q: ['How long does custom software take?', 'Pricing', 'Start a project']
        },
        {
            id: 'backend',
            re: [/\b(backend|back-end|api|server|database|firebase|node|python|graphql|rest)\b/i],
            kw: { backend: 5, api: 4, server: 4, database: 4, firebase: 4, node: 3, python: 3, graphql: 4, sql: 3, hosting: 2 },
            a: 'Backend services we deliver:<ul><li>REST and GraphQL APIs</li><li>Node.js, Python (FastAPI/Flask)</li><li>Firebase Auth, Firestore, Cloud Functions</li><li>SQL and NoSQL data modelling</li><li>Auth, roles, rate limiting and backups</li></ul>',
            q: ['Do you handle hosting?', 'Is my data secure?', 'Start a project']
        },
        {
            id: 'design',
            re: [/\b(ui|ux|ui\/ux|design|figma|prototype|wireframe|branding|logo)\b/i],
            kw: { design: 5, ui: 4, ux: 4, figma: 4, prototype: 4, wireframe: 4, branding: 4, logo: 3, interface: 3 },
            a: 'Our design process:<ul><li>Research and user flows</li><li>Wireframes, then high-fidelity screens in <strong>Figma</strong></li><li>Clickable prototypes for feedback</li><li>Design system with reusable components</li></ul>You get source files and developer-ready specs.',
            q: ['Do you build what you design?', 'Pricing', 'Start a project']
        },
        {
            id: 'seo',
            re: [/\b(seo|search engine optimisation|search engine optimization|google ranking|meta tags|rank on google)\b/i],
            kw: { seo: 6, ranking: 4, google: 2, meta: 3, keywords: 3 },
            a: 'Yes — SEO is built into every site we ship:<ul><li>Semantic HTML and clean heading structure</li><li>Meta titles, descriptions and Open Graph tags</li><li><code>sitemap.xml</code> and <code>robots.txt</code></li><li>Fast loads (optimised images, minimal JS)</li><li>Google Search Console setup</li></ul>We do not promise rankings — we make sure Google can read and trust the page.',
            q: ['How much does a website cost?', 'Start a project']
        },
        {
            id: 'pricing',
            re: [/\b(price|pricing|cost|how much|rates|charges|budget|quote|quotation|expensive|cheap)\b/i],
            kw: { price: 6, pricing: 6, cost: 6, much: 2, rate: 3, rates: 4, charge: 4, charges: 4, budget: 4, quote: 4, quotation: 4, expensive: 3, cheap: 3, fee: 3 },
            boost: 10,
            a: 'Indicative pricing:<ul><li><strong>Starter</strong> — from <strong>$499</strong> · landing page or single-screen app</li><li><strong>Growth</strong> — from <strong>$1,499</strong> · multi-page site or small app</li><li><strong>Enterprise</strong> — custom quote · platforms, integrations, ongoing support</li></ul>Final quotes depend on scope and features.',
            more: 'How we quote: we list every screen/feature, estimate design and development hours, then give a fixed price with milestones. Payments are usually split 40% to start, 40% at review, 20% on delivery. No hidden charges.',
            q: ['What is included in Starter?', 'How long does it take?', 'Get a quote', 'See full pricing']
        },
        {
            id: 'pricing-starter',
            re: [/\b(starter|basic|cheapest|small (site|website|project)|499)\b/i],
            kw: { starter: 5, basic: 4, cheapest: 4, 499: 5 },
            a: '<strong>Starter — from $499</strong><ul><li>One landing page or a single-screen app</li><li>Mobile + desktop responsive</li><li>Contact form and basic SEO</li><li>Delivered in 3–7 days</li></ul>',
            q: ['What about Growth?', 'Get a quote']
        },
        {
            id: 'pricing-growth',
            re: [/\b(growth|standard|1499|1,499|multi ?page)\b/i],
            kw: { growth: 5, standard: 4, 1499: 5, multipage: 4 },
            a: '<strong>Growth — from $1,499</strong><ul><li>Up to 8 pages or a small application</li><li>Custom design, CMS or admin panel</li><li>Animations, forms, analytics</li><li>Delivered in 2–4 weeks</li></ul>',
            q: ['What about Enterprise?', 'Get a quote']
        },
        {
            id: 'pricing-enterprise',
            re: [/\b(enterprise|custom quote|large (project|app)|platform)\b/i],
            kw: { enterprise: 6, custom: 3, platform: 4, large: 3 },
            a: '<strong>Enterprise — custom quote</strong><ul><li>Multi-platform products and integrations</li><li>Dedicated team and SLA</li><li>Security review, testing and documentation</li><li>Ongoing maintenance plans</li></ul>Tell me the scope and I\'ll pass it to the team.',
            q: ['Start a project', 'How can I contact you?']
        },
        {
            id: 'timeline',
            re: [/\b(how long|timeline|duration|deadline|turnaround|delivery time|when can you|eta)\b/i],
            kw: { long: 3, timeline: 5, duration: 5, deadline: 4, turnaround: 5, delivery: 3, time: 2, eta: 4, weeks: 3, days: 3 },
            a: 'Typical timelines:<ul><li><strong>Landing page</strong> — 3–7 days</li><li><strong>Website / web app</strong> — 2–6 weeks</li><li><strong>Mobile app</strong> — 4–8 weeks</li><li><strong>Custom software</strong> — 6–12 weeks</li></ul>Rush delivery is possible for smaller scopes.',
            q: ['What affects the timeline?', 'Start a project']
        },
        {
            id: 'process',
            re: [/\b(your process|how (do|does) (you|it) work|workflow|steps|how you work|what happens next)\b/i],
            kw: { process: 5, workflow: 5, steps: 4, work: 2, approach: 3 },
            a: 'Four stages, no surprises:<ol><li><strong>Discover</strong> — goals, users, scope, success metrics</li><li><strong>Design</strong> — wireframes and clickable prototype</li><li><strong>Develop</strong> — weekly builds you can test</li><li><strong>Deliver</strong> — launch, handover, documentation</li></ol>',
            q: ['How long does it take?', 'What do you need from me?', 'Start a project']
        },
        {
            id: 'requirements',
            re: [/\b(what do you need|requirements|to start|what information|brief)\b/i],
            kw: { need: 3, requirements: 5, start: 3, information: 3, brief: 4, provide: 2 },
            a: 'To quote accurately I need:<ul><li>What the product does and who uses it</li><li>Key features (even a rough list)</li><li>Any designs, references or existing systems</li><li>Target launch date and budget range</li></ul>I can collect all of that right here — just say <strong>start a project</strong>.',
            q: ['Start a project', 'Pricing']
        },
        {
            id: 'products',
            re: [/\b(products|your apps|what have you (built|made)|showcase|portfolio|your work)\b/i],
            kw: { products: 5, product: 4, apps: 3, built: 3, portfolio: 5, showcase: 4, work: 2 },
            a: 'Our products:<ul><li><strong><a href="zdt-billing.html">0D Billing</a></strong> — invoicing, inventory and payments for small businesses (Android + Windows)</li><li><strong><a href="zdt-tailor.html">0D Tailor</a></strong> — measurements, orders and billing for tailor shops (Android)</li><li><strong><a href="aura.html">AURA</a></strong> — free Windows app that detects cyberbullying and harmful content on screen, fully on-device</li></ul>All are free to download.',
            q: ['Tell me about AURA', 'Tell me about 0D Billing', 'See all projects']
        },
        {
            id: 'billing',
            re: [/\b(0d ?billing|billing app|invoic(e|ing)|zdt ?billing|bill(ing)? software)\b/i],
            kw: { billing: 5, invoice: 4, invoices: 4, invoicing: 5, zdt: 2, bills: 4 },
            a: '<strong>0D Billing</strong> — invoicing for small businesses:<ul><li>Create bills with auto-calculation</li><li>Product and stock management</li><li>Bill history and search</li><li>Share bills via WhatsApp, Telegram or SMS</li><li>Owner dashboard and business profile</li></ul>Available for <strong>Android</strong> and <strong>Windows</strong>.',
            more: 'Download it from the <a href="zdt-billing.html">0D Billing page</a>. Windows uses the installer; Android uses the APK (allow "install unknown apps" once). Data stays on your device — no cloud account needed.',
            q: ['Download 0D Billing', 'Is my data private?', 'Pricing']
        },
        {
            id: 'tailor',
            re: [/\b(0d ?tailor|tailor app|tailor shop|measurements|zdt ?tailor|boutique)\b/i],
            kw: { tailor: 5, tailoring: 5, measurements: 4, boutique: 4, stitching: 3 },
            a: '<strong>0D Tailor</strong> — built for tailor shops:<ul><li>Customer profiles and measurement history</li><li>Order tracking from booking to delivery</li><li>Automatic bill generation</li><li>Delivery reminders</li></ul>Available on <strong>Android</strong>.',
            more: 'Everything is stored locally on the phone, so it works without internet. Install it from the <a href="zdt-tailor.html">0D Tailor page</a>.',
            q: ['Download 0D Tailor', 'See other products']
        },
        {
            id: 'aura',
            re: [/\b(aura|cyber ?bullying|bully|harassment|toxic|nsfw|online safety|child safety)\b/i],
            kw: { aura: 6, bullying: 5, cyberbullying: 6, harassment: 4, toxic: 4, nsfw: 4, safety: 3, harmful: 4, detector: 4 },
            a: '<strong>AURA</strong> — free Windows app that watches on-screen text and images and warns you about cyberbullying, threats and harmful content:<ul><li>Runs a toxic-bert model on your own CPU</li><li>Flags harmful images with an on-device classifier</li><li>Instant alerts, system tray, optional autostart</li><li>No account, no cloud, nothing uploaded</li></ul>',
            more: 'Install in about a minute: download <code>AURA_Setup_Windows.exe</code> (266 MB) from the <a href="aura.html">AURA page</a>, run it, and approve the SmartScreen prompt if it appears. Needs Windows 10/11 64-bit, ~4 GB RAM and ~350 MB disk.',
            q: ['Download AURA', 'Is AURA really free?', 'How does it work?']
        },
        {
            id: 'downloads',
            re: [/\b(download|install|apk|exe|setup|get the app)\b/i],
            kw: { download: 5, install: 4, apk: 5, exe: 5, setup: 4, installer: 4 },
            a: 'Direct downloads:<ul><li><a href="zdt-billing.html">0D Billing</a> — APK (Android) or EXE (Windows)</li><li><a href="zdt-tailor.html">0D Tailor</a> — APK (Android)</li><li><a href="aura.html">AURA</a> — EXE (Windows, free)</li></ul>If a download does not start, the product page has a Releases fallback link.',
            q: ['AURA install steps', 'Is it safe to install?']
        },
        {
            id: 'privacy',
            re: [/\b(privacy|data|gdpr|secure|security|track(ing)?|sell my data|stored)\b/i],
            kw: { privacy: 6, data: 3, gdpr: 5, secure: 4, security: 4, tracking: 4, stored: 3, safe: 3 },
            a: 'Privacy in plain terms:<ul><li><strong>Products</strong> — billing and tailor data stays on your device; no cloud sync</li><li><strong>AURA</strong> — all detection runs locally, nothing is uploaded or logged</li><li><strong>This website</strong> — no ad trackers, no third-party analytics</li></ul>',
            q: ['Read the privacy policy', 'Contact the team']
        },
        {
            id: 'tech',
            re: [/\b(tech stack|technologies|what tech|frameworks|languages|stack)\b/i],
            kw: { stack: 5, technology: 5, technologies: 5, framework: 4, frameworks: 4, languages: 4, flutter: 3, react: 3 },
            a: 'Our stack:<ul><li><strong>Web</strong> — HTML/CSS/JS, React, Node.js</li><li><strong>Mobile</strong> — Flutter, React Native, Kotlin, Swift</li><li><strong>Backend</strong> — Node.js, Python, Firebase, SQL</li><li><strong>AI/ML</strong> — ONNX Runtime, transformers, OpenCV</li><li><strong>Deploy</strong> — Vercel, Firebase, GitHub Actions</li></ul>',
            q: ['Do you build AI features?', 'Start a project']
        },
        {
            id: 'ai',
            re: [/\b(ai|artificial intelligence|machine learning|ml|chatbot|automation)\b/i],
            kw: { ai: 5, artificial: 4, intelligence: 3, machine: 3, learning: 3, ml: 4, chatbot: 5, automation: 4 },
            a: 'Yes — AI is one of our strengths:<ul><li>Chatbots and assistants (like me)</li><li>Text classification and moderation (AURA)</li><li>Image recognition and OCR</li><li>Recommendations and document automation</li></ul>We ship on-device models where privacy matters.',
            q: ['Tell me about AURA', 'Start a project']
        },
        {
            id: 'support',
            re: [/\b(support|maintenance|after launch|bug|updates|warranty|sla)\b/i],
            kw: { support: 5, maintenance: 5, bug: 4, bugs: 4, updates: 3, warranty: 4, sla: 4, after: 2 },
            a: 'After launch you get:<ul><li>30 days of free bug fixes on every project</li><li>Optional monthly maintenance (updates, backups, monitoring)</li><li>Priority support plans for business-critical apps</li></ul>',
            q: ['Pricing', 'Contact the team']
        },
        {
            id: 'contact',
            re: [/\b(contact|email|phone|whatsapp|reach you|talk to (a )?(human|person|team)|call)\b/i],
            kw: { contact: 6, email: 5, phone: 5, whatsapp: 5, reach: 3, human: 4, call: 3, talk: 2 },
            a: 'Reach us any time:<ul><li>Email — <a href="' + MAILTO + '" target="_blank" rel="noopener">' + EMAIL + '</a></li><li><a href="contact.html">Contact page</a></li><li><a href="hire-us.html">Project brief form</a></li></ul>We usually reply within 24 hours.',
            q: ['Start a project', 'Pricing']
        },
        {
            id: 'hire',
            re: [/\b(start a project|start project|get a quote|request a quote|hire (you|0d)|work with you|i have (a|an) (project|idea)|i want to (build|start)|build (me|for me)|need a developer|send (you )?(a )?brief)\b/i],
            kw: { hire: 5, project: 3, quote: 4, idea: 3, build: 3, developer: 4, work: 2 },
            boost: 20,
            a: 'Great — let\'s get your project moving. I\'ll ask three quick questions, then prepare an email you can send in one click.',
            action: 'lead',
            q: []
        },
        {
            id: 'work',
            re: [/\b(portfolio|case study|case studies|examples|see your work|projects you)\b/i],
            kw: { portfolio: 6, case: 4, examples: 4, work: 2, projects: 4 },
            a: 'A few things we\'ve shipped:<ul><li><a href="work-billing.html">0D Billing</a> — invoicing platform, Android + Windows</li><li><a href="work-tailor.html">0D Tailor</a> — tailor shop management</li><li><a href="work-caapify.html">Caapify</a> — AI photo captioning</li><li><a href="work-creatorbridge.html">CreatorBridge India</a> — influencer marketplace</li></ul>',
            q: ['Tell me about AURA', 'Start a project']
        },
        {
            id: 'location',
            re: [/\b(where are you|location|based|office|address|city|country)\b/i],
            kw: { location: 5, based: 4, office: 4, address: 4, city: 3, country: 3, where: 2 },
            a: 'We\'re based in <strong>India</strong> and work remotely with clients worldwide. Meetings happen over Google Meet or WhatsApp — time zones have never been a blocker.',
            q: ['How can I contact you?', 'Pricing']
        },
        {
            id: 'team',
            re: [/\b(team|how many (people|employees)|staff|who works)\b/i],
            kw: { team: 5, employees: 4, staff: 4, people: 2, size: 2 },
            a: 'We\'re a small, senior team of developers and designers. For larger builds we bring in trusted specialists, but you always have one point of contact.',
            q: ['See your work', 'Start a project']
        },
        {
            id: 'careers',
            re: [/\b(job|jobs|career|careers|internship|hiring|vacancy|resume|cv)\b/i],
            kw: { job: 5, jobs: 5, career: 5, careers: 5, internship: 5, vacancy: 4, resume: 4, cv: 4, hiring: 6 },
            a: 'We\'re always open to meeting good people. Send your portfolio or CV to <a href="' + MAILTO + '" target="_blank" rel="noopener">' + EMAIL + '</a> with a short note about what you like building.',
            q: ['See your work']
        },
        {
            id: 'payment',
            re: [/\b(payment|pay|razorpay|stripe|upi|paypal|invoice me|advance)\b/i],
            kw: { payment: 5, pay: 4, razorpay: 5, stripe: 5, upi: 5, paypal: 5, advance: 4, invoice: 3 },
            a: 'Payments we support:<ul><li><strong>Razorpay</strong>, <strong>Stripe</strong>, <strong>UPI</strong>, <strong>PayPal</strong></li><li>Bank transfer for larger projects</li><li>Milestone billing — typically 40/40/20</li></ul>',
            q: ['Pricing', 'Get a quote']
        },
        {
            id: 'thanks',
            re: [/\b(thanks|thank you|thx|ty|appreciate|great|awesome|perfect|cool)\b/i],
            kw: { thanks: 5, thank: 5, thx: 4, appreciate: 4, awesome: 3, perfect: 3, great: 3 },
            a: 'Happy to help! If anything else comes up, just ask — or email <a href="' + MAILTO + '" target="_blank" rel="noopener">' + EMAIL + '</a>.',
            q: ['What services do you offer?', 'Start a project']
        },
        {
            id: 'bye',
            re: [/\b(bye|goodbye|see you|talk later|good night)\b/i],
            kw: { bye: 5, goodbye: 5, later: 3, night: 3 },
            a: 'Thanks for stopping by — come back any time. 👋',
            q: ['Start a project']
        },
        {
            id: 'yes',
            re: [/^(yes|yeah|yep|sure|ok|okay|sounds good|go ahead|please do)\b/i],
            kw: { yes: 4, sure: 3, okay: 3, ok: 3 },
            a: 'Great — what would you like to do next?',
            q: ['Start a project', 'Pricing', 'See your work']
        },
        {
            id: 'no',
            re: [/^(no|nope|not now|maybe later)\b/i],
            kw: { no: 3, nope: 3 },
            a: 'No problem. I\'m here whenever you need — you can also email <a href="' + MAILTO + '" target="_blank" rel="noopener">' + EMAIL + '</a>.',
            q: ['What services do you offer?']
        }
    ];

    /* follow-up phrases reuse the previous answer */
    var MORE_RE = /\b(tell me more|more details?|elaborate|go on|continue|explain (that|this|it))\b|^(more|details?|explain)\b/i;
    var FALLBACK = 'I don\'t have that one yet — but the team does. Ask me about <strong>services</strong>, <strong>pricing</strong>, <strong>timelines</strong>, <strong>products</strong>, <strong>AURA</strong>, <strong>downloads</strong> or <strong>starting a project</strong>, or email <a href="' + MAILTO + '" target="_blank" rel="noopener">' + EMAIL + '</a>.';

    /* ---------------------------------------------------------
       Text normalisation + scoring
       --------------------------------------------------------- */
    var SYNONYMS = {
        cost: 'price', costs: 'price', pricing: 'price', priced: 'price', fee: 'price', fees: 'price',
        charges: 'price', charge: 'price', rate: 'price', rates: 'price', budget: 'price', quote: 'price',
        bill: 'billing', bills: 'billing', invoice: 'billing', invoicing: 'billing', zdt: 'billing',
        app: 'apps', application: 'apps', applications: 'apps', android: 'apps', ios: 'apps',
        site: 'website', sites: 'website', webpage: 'website', web: 'website', landing: 'website',
        long: 'timeline', duration: 'timeline', deadline: 'timeline', turnaround: 'timeline', eta: 'timeline',
        phone: 'contact', email: 'contact', whatsapp: 'contact', reach: 'contact',
        bully: 'bullying', cyberbully: 'bullying', cyberbullying: 'bullying', harassment: 'bullying',
        privacy: 'privacy', data: 'privacy', secure: 'privacy', security: 'privacy',
        hire: 'hire', project: 'hire', build: 'hire', develop: 'hire'
    };

    function norm(s) {
        return String(s || '')
            .toLowerCase()
            .replace(/[^\w\s@.+-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function tokens(s) {
        return norm(s).split(' ').filter(function (t) { return t.length > 1; });
    }

    function lev(a, b) {
        if (a === b) return 0;
        if (Math.abs(a.length - b.length) > 2) return 3;
        var m = a.length, n = b.length, prev = [], i, j;
        for (j = 0; j <= n; j++) prev[j] = j;
        for (i = 1; i <= m; i++) {
            var cur = [i];
            for (j = 1; j <= n; j++) {
                cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
            }
            prev = cur;
        }
        return prev[n];
    }

    function scoreIntent(intent, text, toks) {
        var score = 0;
        var regexHit = false;
        if (intent.re) {
            for (var i = 0; i < intent.re.length; i++) {
                if (intent.re[i].test(text)) { score += 100; regexHit = true; break; }
            }
        }
        // A boost only applies when the strong pattern matched, so an intent
        // can never win on its boost alone.
        if (regexHit && intent.boost) score += intent.boost;
        var kw = intent.kw || {};
        for (var key in kw) {
            if (!Object.prototype.hasOwnProperty.call(kw, key)) continue;
            var w = kw[key];
            var parts = key.split(' ');
            var hit = parts.every(function (p) { return toks.indexOf(p) > -1; });
            if (hit) { score += w; continue; }
            // fuzzy: tolerate one typo on longer words
            if (key.length >= 5 && key.indexOf(' ') === -1) {
                for (var t = 0; t < toks.length; t++) {
                    if (toks[t].length >= 4 && lev(toks[t], key) <= 1) { score += w * 0.9; break; }
                }
            }
        }
        return score;
    }

    function match(text) {
        var clean = norm(text);
        var toks = tokens(text).map(function (t) { return SYNONYMS[t] || t; });
        var best = null, bestScore = 0;
        for (var i = 0; i < KB.length; i++) {
            var s = scoreIntent(KB[i], text, toks);
            if (s > bestScore) { bestScore = s; best = KB[i]; }
        }
        if (!best || bestScore < 3.5) return null;
        return { intent: best, score: bestScore };
    }

    /* ---------------------------------------------------------
       State
       --------------------------------------------------------- */
    var state = {
        lastIntent: null,
        messages: [],
        chips: [],
        greeted: false,
        lead: null,
        open: false
    };

    function loadState() {
        try {
            var raw = localStorage.getItem(STORE);
            if (!raw) return;
            var saved = JSON.parse(raw);
            if (saved && Array.isArray(saved.messages)) {
                state.messages = saved.messages.slice(-MAX_HISTORY);
                state.chips = Array.isArray(saved.chips) ? saved.chips.slice(0, 6) : [];
                state.greeted = !!saved.greeted;
                state.lastIntent = saved.lastIntent || null;
                // Resume an unfinished brief so a reload doesn't strand the user.
                state.lead = saved.lead && saved.lead.step && saved.lead.data ? saved.lead : null;
            }
        } catch (e) { /* storage unavailable */ }
    }

    function saveState() {
        try {
            localStorage.setItem(STORE, JSON.stringify({
                messages: state.messages.slice(-MAX_HISTORY),
                chips: state.chips,
                greeted: state.greeted,
                lastIntent: state.lastIntent,
                lead: state.lead
            }));
        } catch (e) { /* ignore quota/private mode */ }
    }

    /* ---------------------------------------------------------
       Styles
       --------------------------------------------------------- */
    var CSS = [
        '.chat-fab{position:fixed;bottom:26px;right:26px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#ec4899);border:0;cursor:pointer;z-index:10000;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px -8px rgba(124,58,237,.65);transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s,opacity .2s,visibility .2s}',
        '.chat-fab:hover{transform:translateY(-2px) scale(1.05)}',
        '.chat-fab:active{transform:scale(.97)}',
        '.chat-fab i{font-size:1.35rem;color:#fff;transition:transform .3s}',
        '.chat-fab.open i{transform:none}',
        '.chat-fab .notif{position:absolute;top:2px;right:2px;width:13px;height:13px;background:#ef4444;border-radius:50%;border:2px solid #0a0e1a;animation:cp 2s infinite}',
        '.chat-fab .ring{position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(167,139,250,.45);animation:ringPulse 3s ease-out infinite;pointer-events:none}',
        '@keyframes ringPulse{0%{transform:scale(.9);opacity:.7}70%{transform:scale(1.25);opacity:0}100%{opacity:0}}',
        '@keyframes cp{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.45)}50%{box-shadow:0 0 0 7px rgba(239,68,68,0)}}',
        '.chat-win{position:fixed;bottom:100px;right:26px;width:400px;max-width:calc(100vw - 32px);height:600px;max-height:calc(100vh - 140px);background:#0f1524;border:1px solid rgba(255,255,255,.09);border-radius:22px;z-index:9999;display:flex;flex-direction:column;overflow:hidden;opacity:0;visibility:hidden;transform:translateY(16px) scale(.97);transition:opacity .3s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1),visibility .3s;box-shadow:0 30px 80px -20px rgba(0,0,0,.75)}',
        '.chat-win.show{opacity:1;visibility:visible;transform:none}',
        '.chat-hdr{padding:16px 18px;background:linear-gradient(135deg,rgba(124,58,237,.28),rgba(236,72,153,.16));border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:12px;flex-shrink:0}',
        '.chat-hdr .av{width:40px;height:40px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:#fff;flex-shrink:0}',
        '.chat-hdr .inf{flex:1;min-width:0}',
        '.chat-hdr .nm{font-weight:700;font-size:.9rem;color:#f8fafc;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
        '.chat-hdr .st{font-size:.72rem;color:#84cc16;display:flex;align-items:center;gap:6px}',
        '.chat-hdr .st::before{content:"";width:6px;height:6px;background:#84cc16;border-radius:50%}',
        '.chat-hdr button{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:#cbd5e1;width:34px;height:34px;border-radius:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.85rem;transition:background .2s,color .2s}',
        '.chat-hdr button:hover{background:rgba(255,255,255,.12);color:#fff}',
        '.chat-body{flex:1;overflow-y:auto;padding:18px 16px 8px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.15) transparent}',
        '.chat-body::-webkit-scrollbar{width:5px}',
        '.chat-body::-webkit-scrollbar-thumb{background:rgba(255,255,255,.14);border-radius:5px}',
        '.cm{display:flex;gap:8px;max-width:92%;animation:cmIn .28s cubic-bezier(.16,1,.3,1)}',
        '.cm.bot{align-self:flex-start}.cm.usr{align-self:flex-end;flex-direction:row-reverse}',
        '@keyframes cmIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
        '.cm .ma{width:26px;height:26px;border-radius:9px;background:linear-gradient(135deg,#7c3aed,#ec4899);display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:800;color:#fff;flex-shrink:0;margin-top:2px}',
        '.cm.usr .ma{display:none}',
        '.cm .bb{padding:11px 15px;font-size:.86rem;line-height:1.62;border-radius:16px;word-break:break-word;font-family:Outfit,system-ui,sans-serif;min-width:0}',
        '.cm.bot .bb{background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.06);color:#cbd5e1;border-bottom-left-radius:5px}',
        '.cm.usr .bb{background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;border-bottom-right-radius:5px}',
        '.cm .bb ul,.cm .bb ol{margin:8px 0 2px;padding-left:18px}',
        '.cm .bb li{margin:4px 0}',
        '.cm .bb li::marker{color:#a78bfa}',
        '.cm .bb strong{color:#f1f5f9}',
        '.cm.usr .bb strong{color:#fff}',
        '.cm .bb a{color:#c4b5fd;text-decoration:underline;text-underline-offset:2px}',
        '.cm.usr .bb a{color:#fff}',
        '.cm .bb code{background:rgba(0,0,0,.35);padding:1px 5px;border-radius:5px;font-size:.8em}',
        '.cm .ts{font-size:.62rem;color:#64748b;margin-top:4px;text-align:right}',
        '.cm.usr .ts{color:rgba(255,255,255,.65)}',
        '.ctyp{display:flex;gap:4px;padding:12px 16px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.06);border-radius:16px;border-bottom-left-radius:5px;width:fit-content;align-self:flex-start}',
        '.ctyp span{width:6px;height:6px;background:#94a3b8;border-radius:50%;animation:td .9s infinite}',
        '.ctyp span:nth-child(2){animation-delay:.15s}.ctyp span:nth-child(3){animation-delay:.3s}',
        '@keyframes td{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-4px);opacity:1}}',
        '.cqr{display:flex;flex-wrap:wrap;gap:6px;padding:4px 16px 10px;align-self:flex-start;max-width:100%}',
        '.cqr button{padding:7px 13px;border-radius:100px;border:1px solid rgba(167,139,250,.25);background:rgba(124,58,237,.1);color:#c4b5fd;font-size:.75rem;font-family:Outfit,system-ui,sans-serif;cursor:pointer;transition:all .18s;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}',
        '.cqr button:hover{background:rgba(124,58,237,.22);border-color:rgba(167,139,250,.5);color:#fff}',
        '.cft{padding:8px 16px;border-top:1px solid rgba(255,255,255,.04);text-align:center;font-size:.68rem;color:#64748b;flex-shrink:0}',
        '.cft a{color:#a78bfa;text-decoration:none}',
        '.cin{display:flex;gap:8px;padding:12px 14px calc(12px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.06);background:#0c1220;flex-shrink:0}',
        '.cin input{flex:1;min-width:0;padding:11px 16px;border-radius:100px;border:1px solid rgba(255,255,255,.09);background:#0a0e1a;color:#f8fafc;font-family:Outfit,system-ui,sans-serif;font-size:.86rem;outline:none;transition:border-color .2s}',
        '.cin input:focus{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.15)}',
        '.cin input::placeholder{color:#64748b}',
        '.cin .send{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#ec4899);border:0;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;transition:transform .2s,opacity .2s;flex-shrink:0}',
        '.cin .send:hover{transform:scale(1.06)}',
        '.cin .send:disabled{opacity:.5;cursor:not-allowed;transform:none}',
        '.chat-src{position:absolute;right:14px;bottom:74px;width:34px;height:34px;border-radius:50%;background:#1a2237;border:1px solid rgba(255,255,255,.1);color:#cbd5e1;display:none;align-items:center;justify-content:center;cursor:pointer;font-size:.75rem;z-index:2}',
        '.chat-src.on{display:flex}',
        '@media(max-width:600px){',
        '.chat-win{inset:0;width:100%;max-width:none;height:100%;max-height:none;border-radius:0;border:0;transform:translateY(12px)}',
        '.chat-hdr{padding-top:calc(12px + env(safe-area-inset-top))}',
        '.chat-fab{bottom:calc(16px + env(safe-area-inset-bottom));right:16px}',
        /* the sheet covers the whole screen — the launcher would sit on top of the send button */
        '.chat-open .chat-fab{opacity:0;visibility:hidden;pointer-events:none;transform:scale(.85)}',
        '.chat-body{padding:14px 12px 6px}',
        '.cqr{padding:2px 12px 8px}',
        '}',
        '@media(prefers-reduced-motion:reduce){.chat-win,.cm,.ctyp span,.chat-fab .ring{animation:none!important;transition:none!important}}'
    ].join('');

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    /* ---------------------------------------------------------
       Markup
       --------------------------------------------------------- */
    var fab = document.createElement('button');
    fab.className = 'chat-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Open chat with Parth');
    fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '<span class="ring"></span><i class="fas fa-comments"></i><span class="notif" style="display:none"></span>';

    var win = document.createElement('div');
    win.className = 'chat-win';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat with Parth');
    win.innerHTML = [
        '<div class="chat-hdr">',
        '  <div class="av">P</div>',
        '  <div class="inf"><div class="nm">Parth — 0D Technologies</div><div class="st">Online now</div></div>',
        '  <button type="button" class="cx-reset" aria-label="Start a new conversation" title="New conversation"><i class="fas fa-rotate-left"></i></button>',
        '  <button type="button" class="cx" aria-label="Close chat" title="Close"><i class="fas fa-times"></i></button>',
        '</div>',
        '<div class="chat-body" id="chatBody" role="log" aria-live="polite" aria-relevant="additions"></div>',
        '<div class="chat-src" role="button" tabindex="0" aria-label="Scroll to latest message"><i class="fas fa-arrow-down"></i></div>',
        '<div class="cft">Detailed queries? <a href="' + MAILTO + '" target="_blank" rel="noopener">' + EMAIL + '</a></div>',
        '<div class="cin"><input type="text" id="chatIn" placeholder="Ask me anything…" aria-label="Type your message" autocomplete="off"><button type="button" class="send" id="chatSend" aria-label="Send message"><i class="fas fa-paper-plane"></i></button></div>'
    ].join('');

    document.body.appendChild(fab);
    document.body.appendChild(win);

    var body = win.querySelector('#chatBody');
    var inp = win.querySelector('#chatIn');
    var sbtn = win.querySelector('#chatSend');
    var closeBtn = win.querySelector('.cx');
    var resetBtn = win.querySelector('.cx-reset');
    var scrollBtn = win.querySelector('.chat-src');
    var ntf = fab.querySelector('.notif');
    var fabIcon = fab.querySelector('i');

    function setFabIcon(open) {
        if (fabIcon) fabIcon.className = open ? 'fas fa-times' : 'fas fa-comments';
    }

    /* ---------------------------------------------------------
       Rendering
       --------------------------------------------------------- */
    function esc(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function nowLabel() {
        var d = new Date();
        return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
    }

    function nearBottom() {
        return body.scrollHeight - body.scrollTop - body.clientHeight < 80;
    }

    function scrollDown(force) {
        if (force || nearBottom()) body.scrollTop = body.scrollHeight;
        scrollBtn.classList.toggle('on', !nearBottom());
    }

    function addMessage(html, who, opts) {
        opts = opts || {};
        var row = document.createElement('div');
        row.className = 'cm ' + (who === 'usr' ? 'usr' : 'bot');
        var ts = opts.time || nowLabel();
        row.innerHTML = (who === 'usr' ? '' : '<div class="ma">P</div>') +
            '<div><div class="bb">' + html + '</div><div class="ts">' + ts + '</div></div>';
        body.appendChild(row);
        if (!opts.silent) {
            state.messages.push({ html: html, who: who, time: ts });
            saveState();
        }
        scrollDown(opts.force);
    }

    function addChips(list) {
        body.querySelectorAll('.cqr').forEach(function (el) { el.remove(); });
        state.chips = list && list.length ? list.slice() : [];
        saveState();
        if (!state.chips.length) return;
        var wrap = document.createElement('div');
        wrap.className = 'cqr';
        state.chips.forEach(function (label) {
            var b = document.createElement('button');
            b.type = 'button';
            b.textContent = label;
            b.addEventListener('click', function () {
                wrap.remove();
                send(label);
            });
            wrap.appendChild(b);
        });
        body.appendChild(wrap);
        scrollDown(true);
    }

    function typing(on) {
        var existing = body.querySelector('.ctyp');
        if (!on) { if (existing) existing.remove(); return; }
        if (existing) return;
        var t = document.createElement('div');
        t.className = 'ctyp';
        t.innerHTML = '<span></span><span></span><span></span>';
        body.appendChild(t);
        scrollDown(true);
    }

    /* ---------------------------------------------------------
       Lead capture
       --------------------------------------------------------- */
    function startLead() {
        state.lead = { step: 'name', data: {} };
        return stepPrompt('name');
    }

    function stepPrompt(step) {
        if (step === 'name') return 'First — what\'s your <strong>name</strong>?';
        if (step === 'email') return 'What\'s the best <strong>email</strong> to reach you on?';
        if (step === 'project') return 'What kind of <strong>project</strong> is it?';
        if (step === 'budget') return 'Rough <strong>budget</strong>? (e.g. under $500, $500–1500, $1500+, not sure)';
        if (step === 'notes') return 'Last one — anything else I should tell the team? (deadline, links, features)';
        return '';
    }

    function leadStep(text) {
        var lead = state.lead;
        var val = text.trim();

        if (lead.step === 'name') {
            if (val.length < 2) return 'That looks a little short — what name should I use?';
            lead.data.name = val.slice(0, 60);
            lead.step = 'email';
            return 'Thanks, <strong>' + esc(lead.data.name) + '</strong>. What\'s the best <strong>email</strong> to reach you on?';
        }

        if (lead.step === 'email') {
            var ok = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(val);
            if (!ok) return 'That email doesn\'t look right. Could you type it again? (e.g. name@company.com)';
            lead.data.email = val;
            lead.step = 'project';
            return 'Got it. What kind of <strong>project</strong> is it?';
        }

        if (lead.step === 'project') {
            lead.data.project = val.slice(0, 300);
            lead.step = 'budget';
            return 'Rough <strong>budget</strong>? (e.g. under $500, $500–1500, $1500+, not sure)';
        }

        if (lead.step === 'budget') {
            lead.data.budget = val.slice(0, 80);
            lead.step = 'notes';
            return 'Last one — anything else I should tell the team? (deadline, links, features)';
        }

        // notes → summary
        lead.data.notes = val.slice(0, 500);
        lead.step = 'confirm';
        return summaryCard(lead.data);
    }

    function summaryCard(d) {
        var subject = encodeURIComponent('Project enquiry — ' + d.name);
        var text = encodeURIComponent(
            'Name: ' + d.name + '\n' +
            'Email: ' + d.email + '\n' +
            'Project: ' + d.project + '\n' +
            'Budget: ' + d.budget + '\n' +
            'Notes: ' + d.notes + '\n\n' +
            'Sent from the 0D Technologies website chat.'
        );
        var href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + text;
        return '<strong>Here\'s your brief</strong>' +
            '<ul><li><strong>Name</strong> — ' + esc(d.name) + '</li>' +
            '<li><strong>Email</strong> — ' + esc(d.email) + '</li>' +
            '<li><strong>Project</strong> — ' + esc(d.project) + '</li>' +
            '<li><strong>Budget</strong> — ' + esc(d.budget) + '</li>' +
            '<li><strong>Notes</strong> — ' + esc(d.notes) + '</li></ul>' +
            '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
            '<a href="' + href + '" style="display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:10px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;font-weight:700;font-size:.78rem;text-decoration:none">Send by email</a>' +
            '<button type="button" class="copy-brief" data-brief="' + esc(JSON.stringify(d)) + '" style="padding:9px 14px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#e2e8f0;font-size:.78rem;cursor:pointer">Copy details</button>' +
            '</div>' +
            '<div style="margin-top:8px;font-size:.72rem;color:#94a3b8">Prefer the form? <a href="hire-us.html">Open the project form</a>.</div>';
    }

    function bindBriefActions() {
        body.querySelectorAll('.copy-brief').forEach(function (btn) {
            if (btn.dataset.bound) return;
            btn.dataset.bound = '1';
            btn.addEventListener('click', function () {
                var data;
                try { data = JSON.parse(btn.getAttribute('data-brief')); } catch (e) { data = null; }
                var text = data ? ('Name: ' + data.name + '\nEmail: ' + data.email + '\nProject: ' + data.project + '\nBudget: ' + data.budget + '\nNotes: ' + data.notes) : '';
                var done = function () {
                    btn.textContent = 'Copied';
                    setTimeout(function () { btn.textContent = 'Copy details'; }, 1800);
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done, done);
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = text; document.body.appendChild(ta); ta.select();
                    try { document.execCommand('copy'); } catch (e) { }
                    document.body.removeChild(ta); done();
                }
            });
        });
    }

    /* ---------------------------------------------------------
       Reply pipeline
       --------------------------------------------------------- */
    function respond(text) {
        var clean = text.trim();

        // Let the user abandon a brief at any point.
        if (state.lead && /\b(cancel|stop|quit|never ?mind|forget it)\b/i.test(clean)) {
            state.lead = null;
            state.lastIntent = null;
            saveState();
            return {
                html: 'No problem — I\'ve cleared that. Anything else I can help with?',
                chips: ['What services do you offer?', 'Pricing', 'Start a project']
            };
        }

        // active lead flow takes priority
        if (state.lead && state.lead.step !== 'confirm') {
            // Don't swallow a genuine question as a name/project answer:
            // answer it, then re-ask the pending question.
            var looksQuestion = /\?|^(what|how|why|who|when|where|which|can|do|does|is|are|will|should|tell me|show me)\b/i.test(clean);
            if (looksQuestion && clean.indexOf('@') === -1) {
                var aside = match(clean);
                if (aside && aside.score >= 100) {
                    return {
                        html: aside.intent.a + '<br><br>' + stepPrompt(state.lead.step),
                        chips: null
                    };
                }
            }
            return { html: leadStep(clean), chips: null };
        }
        if (state.lead && state.lead.step === 'confirm') {
            if (/\b(yes|send|ok|looks good|submit)\b/i.test(clean)) {
                state.lead = null;
                return { html: 'Perfect — hit <strong>Send by email</strong> above and it lands in our inbox. You\'ll hear back within 24 hours.', chips: ['See your work', 'Pricing'] };
            }
            if (/\b(no|edit|change|wrong)\b/i.test(clean)) {
                state.lead = { step: 'name', data: {} };
                return { html: 'No problem — let\'s redo it. What\'s your <strong>name</strong>?', chips: null };
            }
            state.lead = null;
        }

        // "tell me more" reuses the previous answer
        if (MORE_RE.test(clean) && state.lastIntent) {
            var prev = state.lastIntent;
            return {
                html: prev.more || prev.a,
                chips: prev.q,
                keep: true
            };
        }

        var found = match(clean);
        if (!found) {
            return { html: FALLBACK, chips: ['What services do you offer?', 'Pricing', 'Start a project'] };
        }

        var intent = found.intent;

        if (intent.action === 'lead') {
            state.lastIntent = intent;
            return { html: intent.a + '<br><br>' + startLead(), chips: null };
        }

        state.lastIntent = intent;
        return { html: intent.a, chips: intent.q };
    }

    function send(text) {
        var value = String(text || '').trim();
        if (!value) return;

        addChips(null);
        addMessage(esc(value), 'usr', { force: true });
        inp.value = '';
        inp.focus();
        sbtn.disabled = true;

        var delay = Math.min(1100, 380 + value.length * 8 + Math.random() * 250);
        typing(true);

        setTimeout(function () {
            typing(false);
            var out = respond(value);
            addMessage(out.html, 'bot', { force: true });
            bindBriefActions();
            if (out.chips) addChips(out.chips);
            sbtn.disabled = false;
            scrollDown(true);
        }, delay);
    }

    /* ---------------------------------------------------------
       Open / close / reset
       --------------------------------------------------------- */
    function openChat() {
        state.open = true;
        win.classList.add('show');
        fab.classList.add('open');
        setFabIcon(true);
        fab.setAttribute('aria-expanded', 'true');
        ntf.style.display = 'none';
        document.body.classList.add('chat-open');
        if (!state.greeted) {
            state.greeted = true;
            typing(true);
            setTimeout(function () {
                typing(false);
                addMessage('Hi! I\'m <strong>Parth</strong> from 0D Technologies. I can help with <strong>services</strong>, <strong>products</strong>, <strong>pricing</strong>, <strong>timelines</strong> — or collect a project brief for the team.', 'bot', { force: true });
                addChips(['What services do you offer?', 'Show me your products', 'How much does a website cost?', 'Start a project']);
                saveState();
            }, 520);
        } else {
            scrollDown(true);
        }
        setTimeout(function () { inp.focus({ preventScroll: true }); }, 120);
    }

    function closeChat() {
        state.open = false;
        win.classList.remove('show');
        fab.classList.remove('open');
        setFabIcon(false);
        fab.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('chat-open');
        fab.focus({ preventScroll: true });
    }

    function resetChat() {
        state.messages = [];
        state.lastIntent = null;
        state.lead = null;
        state.greeted = false;
        try { localStorage.removeItem(STORE); } catch (e) { }
        body.innerHTML = '';
        addChips(null);
        state.greeted = true;
        addMessage('Fresh start! What would you like to know about 0D Technologies?', 'bot', { force: true });
        addChips(['What services do you offer?', 'Show me your products', 'Pricing', 'Start a project']);
        saveState();
        inp.focus({ preventScroll: true });
    }

    fab.addEventListener('click', function () {
        if (state.open) closeChat(); else openChat();
    });
    closeBtn.addEventListener('click', closeChat);
    resetBtn.addEventListener('click', resetChat);

    sbtn.addEventListener('click', function (e) { e.preventDefault(); send(inp.value); });
    inp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); send(inp.value); }
        if (e.key === 'Escape') closeChat();
    });

    win.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeChat();
    });

    scrollBtn.addEventListener('click', function () { scrollDown(true); });
    scrollBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollDown(true); }
    });
    body.addEventListener('scroll', function () {
        scrollBtn.classList.toggle('on', !nearBottom());
    });

    /* ---------------------------------------------------------
       Boot: restore history or greet on first open
       --------------------------------------------------------- */
    loadState();

    if (state.messages.length) {
        state.messages.forEach(function (m) {
            addMessage(m.html, m.who, { silent: true, time: m.time });
        });
        bindBriefActions();
        if (state.chips.length) addChips(state.chips);
        scrollDown(true);
    } else {
        setTimeout(function () {
            if (!state.open) ntf.style.display = 'block';
        }, 3000);
    }
})();
