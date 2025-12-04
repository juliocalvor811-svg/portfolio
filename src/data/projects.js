const projects = [
  {
    id: 1,
    // Card Preview Data
    title: 'veraOS: Building a Full-Stack Productivity Platform from Scratch',
    subtitle: 'Drag-and-drop widgets, interactive highlights, real-time chat, and a library system — all integrated with AI',
    name: 'veraOS',
    category: 'FULLSTACK · AI INTEGRATION',
    type: 'Full-Stack Product',
    year: '2025',
    content: `What started as a project to learn how to truly integrate AI into a product 
      became a full productivity platform. Not just calling an API — building features 
      where AI understands your notes, flashcards, and schedule to give contextual answers.`,
    fullContent: `veraOS is an AI-powered productivity platform featuring a drag-and-drop widget 
      dashboard, interactive chat with semantic highlighting, a library system with folders 
      and search, and academic tools with spaced repetition. Built over 12 months as a way 
      to learn modern frontend development and AI integration.`,
    pullQuote: '"The best way to learn frontend is to build something too ambitious and figure it out."',
    tech: {
      languages: [
        { name: 'JavaScript', percentage: 80.7 },
        { name: 'HTML', percentage: 10.6 },
        { name: 'TypeScript', percentage: 6.5 },
        { name: 'PLpgSQL', percentage: 2.2 },
      ],
      backend: ['Supabase', 'Edge Functions', 'Stripe'],
      ai: ['6 LLM Providers', 'Embeddings Server']
    },
    features: [
      '100K+ lines codebase',
      'Interactive Highlight System',
      'Drag-and-Drop Widgets',
      'Chat Library with Folders',
      'Real-time Streaming',
      'Flashcards with Spaced Repetition'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvorios/veraos',
      npm: 'https://npmjs.com/package/react-ai-highlight-parser'
    },

    // Full Article Data
    date: 'January 2025',
    readTime: '10',
    image: '/images/veraOS-project/vera-interface.png',
    imageCaption: 'The veraOS dashboard with customizable widgets and AI chat integration.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '12 months',
    role: 'Solo Developer & Designer',

    lede: `veraOS started with a simple question: how do you actually build a product where AI isn't just a chatbot, but something deeply integrated into the experience? Not just "call the OpenAI API and display the response" — but AI that understands your data, responds in context, and enhances the interface itself. Twelve months later, the answer is a full productivity platform with drag-and-drop widgets, interactive highlights, a library system, and academic tools. This is what I learned building it.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Interactive Highlight System'
      },
      {
        type: 'text',
        content: 'Most AI chat interfaces just render text. veraOS does something different: as the AI responds, it applies semantic highlighting in real-time. Users can choose between color highlights, underlines, or both — with customizable palettes that update instantly. This wasn\'t a simple CSS trick. It required building a token-based parser that processes the AI\'s response stream, identifies highlight codes, handles nested formatting, protects code blocks from being highlighted, and cleans up malformed tags without breaking the content. The parser is available as an open source npm package: react-ai-highlight-parser.'
      },
      {
        type: 'list',
        items: [
          'Token parser that handles nested highlight tags correctly',
          'Real-time application during streaming responses',
          'Multiple modes: highlights only, underlines only, or both combined',
          'Customizable color palettes that apply instantly',
          'Code block protection — syntax highlighting isn\'t affected',
          'Graceful handling of malformed or orphaned tags'
        ]
      },
      {
        type: 'highlight-showcase',
        caption: 'Live demonstration: The highlight system cycles through modes (highlights, underline, both) and palettes (vibrant, natural) — exactly as implemented in veraOS.'
      },
      {
        type: 'pullquote',
        content: 'The highlight system taught me that the best features often live at the intersection of backend logic and frontend polish.',
        attribution: 'Development Reflection'
      },
      {
        type: 'subheading',
        content: 'Drag-and-Drop Widget Dashboard'
      },
      {
        type: 'text',
        content: 'The main interface is a customizable dashboard inspired by Notion and Linear. Users can add widgets — pomodoro timer, flashcards, study goals, focus zone, schedule — and arrange them freely. Dragging a widget shows visual feedback, other widgets shift to make room, and layouts persist across sessions. Each widget is completely independent with its own state, but they can communicate through a shared context when needed.'
      },
      {
        type: 'text',
        content: 'The technical challenge was making this feel smooth. Collision detection runs on every drag frame — I used spatial hashing to keep it O(n) instead of O(n²). Widgets respond to resize events through ResizeObserver, adapting their internal layouts. The whole system lazy-loads: widgets only mount when added, reducing the initial bundle by over 400KB.'
      },
      {
        type: 'video',
        src: '/videos/Drag-Drop-Widgets-Video.mp4',
        caption: 'Widgets can be dragged, resized, and customized. Layouts persist per user.'
      },
      {
        type: 'subheading',
        content: 'Chat Library with Folders'
      },
      {
        type: 'text',
        content: 'Every chat is saved to a library that works like a file manager. Users can create folders (and subfolders), drag chats between them, pin favorites, search across all conversations, and archive old ones. This sounds simple until you implement it: optimistic updates that revert on failure, real-time sync with Supabase, undo/redo history that persists to the database, and a UI that feels instant even when network requests are in flight.'
      },
      {
        type: 'list',
        items: [
          'Nested folder structure with drag-and-drop organization',
          'Optimistic UI updates with automatic rollback on failure',
          'Undo/redo history persisted to Supabase — survives page refresh',
          'Full-text search across all chats and folders',
          'Pin, favorite, and archive functionality',
          'Tier-based limits with clear upgrade prompts'
        ]
      },
      {
        type: 'video',
        src: '/videos/libraryinterfacevideo.mp4',
        caption: 'The library system: folders, drag-and-drop, search, and real-time sync.'
      },
      {
        type: 'subheading',
        content: 'Academic Mode: AI That Knows Your Data'
      },
      {
        type: 'text',
        content: 'This is where the AI integration gets interesting. In Academic Mode, the AI doesn\'t just answer questions — it has context from your widgets. Ask "what should I study today?" and it checks your flashcards due for review, your upcoming exams in the schedule widget, and your study goals. The response isn\'t generic advice; it\'s specific to your data.'
      },
      {
        type: 'text',
        content: 'Under the hood, this uses embeddings. When you ask a question, the system generates a vector representation and compares it against pre-computed embeddings for each widget type. Only relevant widgets get queried for their data, keeping the context focused and the token count reasonable. The embedding model runs on a Render server — moving this computation off the client was necessary for performance.'
      },
      {
        type: 'pullquote',
        content: 'Academic Mode isn\'t "AI plus widgets." It\'s AI that understands widgets. That difference took months to get right.',
        attribution: 'Architecture Decision'
      },
      {
        type: 'academic-flow',
        caption: 'Interactive demo: Watch how user queries flow through the embedding system to generate contextual responses.'
      },
      {
        type: 'subheading',
        content: 'Upgrade Plans & Internationalization'
      },
      {
        type: 'text',
        content: 'veraOS offers tiered subscription plans integrated with Stripe: Free, Pro, Student, and Annual. The upgrade flow includes animated pricing cards and seamless checkout. The entire app supports English, Spanish, French, and German through i18next, with all UI elements adapting when you switch languages.'
      },
      {
        type: 'video',
        src: '/videos/settings-upgrade.mp4',
        caption: 'Settings panel with upgrade flow, Stripe integration, and language switching.'
      },
      {
        type: 'subheading',
        content: 'Flashcards with Study Sessions'
      },
      {
        type: 'text',
        content: 'The flashcard widget implements spaced repetition using the SM-2 algorithm. But beyond the algorithm, the UX required careful thought: study sessions that can be paused and resumed (with time tracking), flip animations that feel tactile, progress indicators that motivate without overwhelming, and an expanded view for serious study sessions with full keyboard navigation.'
      },
      {
        type: 'text',
        content: 'Study session state persists to localStorage, so closing the browser mid-session doesn\'t lose progress. Color palettes can be migrated between themes automatically — if you switch from "vibrant" to "natural" colors, your deck colors translate to the new palette rather than looking wrong.'
      },
      {
        type: 'video',
        src: '/videos/flashcards-widget-video.mp4',
        caption: 'Flashcards in action: spaced repetition, study sessions, flip animations, and progress tracking.'
      },

      {
        type: 'subheading',
        content: 'Technical Architecture'
      },
      {
        type: 'text',
        content: 'The app uses five React Contexts with clear separation: WidgetsContext for layout positions, WidgetDataContext for widget state, ThemeContext for appearance, SubscriptionContext for tier limits, and ExpandedWidgetContext for modal state. This isn\'t over-engineering — it\'s what happens when you actually need to share state across a complex app without prop drilling into madness.'
      },
      {
        type: 'text',
        content: 'The animated circle in the center of the dashboard uses Three.js with Simplex Noise for organic movement. It responds to user interactions and system state — pulsing faster during AI responses, changing color based on the active theme. This detail cost days to get right, but it\'s what makes the interface feel alive rather than static.'
      },
      {
        type: 'text',
        content: 'For AI-powered features, I built a separate embeddings server on Render running the paraphrase-multilingual-MiniLM-L12-v2 model. Originally I tried running transformers.js in the browser, but 25MB of downloads for each user was unacceptable. Moving this to a dedicated server reduced client-side overhead to zero while keeping embedding generation fast (~50ms per query).'
      },
      {
        type: 'list',
        items: [
          'Multi-provider AI routing across OpenAI, Claude, Gemini, Groq, Mistral, and Scaleway — with automatic fallbacks and region-aware routing for EU compliance',
          'Supabase for auth, PostgreSQL database, real-time subscriptions, and file storage',
          'Stripe integration for subscriptions with webhook handling and tier-based feature gating',
          'Custom embeddings server on Render (MiniLM-L12-v2, 384 dimensions)',
          'Three.js + Simplex Noise for the animated central circle',
          'AES-256-GCM encryption for sensitive message data (client-side)',
          'i18next for internationalization (English, Spanish, French, German)',
          'DOMPurify for XSS protection on all user-generated content',
          'Lazy loading for all widgets and modals (400KB bundle reduction)',
          '20+ Supabase Edge Functions as secure API proxies'
        ]
      },
      {
        type: 'tech-stack',
        caption: 'Interactive architecture diagram: Hover over nodes to see details, watch data flow between services.'
      },
      {
        type: 'subheading',
        content: 'What This Project Taught Me'
      },
      {
        type: 'text',
        content: 'Building veraOS taught me that production code is fundamentally different from tutorial code. Tutorials show you how to make something work. Production requires thinking about what happens when it doesn\'t work — network failures, malformed data, user mistakes, edge cases. Every feature in veraOS has error handling, loading states, and fallback behavior. That\'s not paranoia; it\'s professionalism.'
      },
      {
        type: 'text',
        content: 'More importantly, I learned how to work effectively with AI tools. Not as a crutch, but as a collaborator. I can look at any part of this codebase and explain why it works, modify it confidently, and debug it when it breaks. The AI accelerated my learning; it didn\'t replace it.'
      },
      {
        type: 'pullquote',
        content: 'Using AI to build made me better at building. That\'s the skill that matters now.',
        attribution: 'Final Reflection'
      }
    ],

    technicalDetails: [
      {
        title: 'Frontend Stack',
        description: 'React 18 + Vite 7, TypeScript for critical paths, Tailwind CSS for styling, Framer Motion for animations. Three.js powers the animated circle with Simplex Noise.'
      },
      {
        title: 'AI Infrastructure',
        description: 'Groq API for LLM inference (sub-second responses). Custom embeddings server on Render using MiniLM-L12-v2 (384 dimensions). Replaced 25MB transformers.js with 0-byte client overhead.'
      },
      {
        title: 'Data Layer',
        description: 'Supabase for auth, PostgreSQL, real-time sync, and storage. AES-256-GCM client-side encryption. Optimistic updates with rollback. Debounced writes with change detection.'
      },
      {
        title: 'Widget System',
        description: 'Drag-and-drop with O(n) collision detection via spatial hashing. ResizeObserver for responsive layouts. 10+ lazy-loaded widgets (400KB bundle reduction).'
      },
      {
        title: 'Highlight Parser',
        description: 'Token-based streaming parser published as npm package (react-ai-highlight-parser). Handles nested tags, protects code blocks, cleans malformed markup.'
      },
      {
        title: 'Security',
        description: 'DOMPurify for XSS protection. Magic byte file validation. Path traversal prevention. Incognito mode for zero-persistence chats.'
      }
    ],

    conclusion: 'veraOS isn\'t just a portfolio project — it\'s proof that modern development looks different than it did five years ago. AI tools are part of the workflow now. The question isn\'t whether to use them, but how to use them well. Twelve months of building this platform taught me React deeply, exposed me to real architectural decisions, and showed me what it takes to ship something that works reliably. That\'s the experience I\'m bringing to my next role.'
  },
  {
    id: 2,
    // Card Preview Data
    title: 'Ontario Flag Time Machine: Where Vexillology Meets Vintage Tech',
    subtitle: 'An interactive journey through 260 years of Ontario\'s flag history with retro hardware aesthetics',
    name: 'Flag Time Machine',
    category: 'FRONTEND · HISTORY',
    type: 'Interactive Experience',
    year: '2025',
    content: `What if exploring history felt like operating a vintage piece of equipment?
      This time machine lets you travel from 1763 to today, watching Ontario's flag evolve
      through colonial rule, confederation, and provincial identity — all through brass
      levers, nixie tube displays, and toggle switches.`,
    fullContent: `An interactive web experience built with Next.js and TypeScript that visualizes
      the evolution of Ontario's flag from 1763 to present day. Features a vintage control panel
      aesthetic with functional brass levers, glowing nixie tube year displays, and historically
      accurate flag renderings for each era.`,
    pullQuote: '"The best interfaces don\'t feel like interfaces. They feel like instruments."',
    tech: {
      languages: [
        { name: 'TypeScript', percentage: 85 },
        { name: 'CSS', percentage: 15 }
      ],
      frontend: ['Next.js 14', 'React 18', 'Tailwind CSS'],
      tools: ['SVG Rendering', 'CSS Animations', 'Custom Hooks']
    },
    features: [
      'Vintage Control Panel UI',
      'Nixie Tube Year Display',
      'Historical Flag Accuracy',
      'Keyboard Navigation',
      'PNG/SVG Export',
      '8 Distinct Historical Eras'
    ],
    links: {
      live: 'https://ontario-flag.juliocalvo.dev',
      github: 'https://github.com/juliocalvorios/ontario-flag-time-machine'
    },

    // Full Article Data
    date: 'December 2025',
    readTime: '8',
    image: '/images/ontario-flag-project/time-machine-hero.png',
    imageCaption: 'The Ontario Flag Time Machine interface with brass controls and nixie tube display.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '2 weeks',
    role: 'Solo Developer & Designer',

    lede: `Most history websites present information like textbooks — walls of text, maybe a timeline, definitely boring. I wanted to build something different: an experience where exploring Ontario's flag history felt like operating a piece of vintage laboratory equipment. Brass levers you actually drag. Nixie tubes that glow orange as years tick by. Toggle switches with satisfying clicks. The result is a time machine that spans 260 years of Canadian history, from British colonial rule to the present day.`,

    bodyParagraphs: [
      {
        type: 'subheading',
        content: 'The Vintage Hardware Aesthetic'
      },
      {
        type: 'text',
        content: 'The interface draws inspiration from 1960s scientific instruments — the kind you\'d find in a physics lab or radio station. Every element reinforces this theme: the bakelite panel backgrounds with subtle noise textures, brass fixtures that catch the light with CSS gradients, indicator LEDs that glow with actual blur filters, and engraved plate labels in monospace uppercase. The attention to material authenticity makes the digital feel physical.'
      },
      {
        type: 'list',
        items: [
          'Bakelite-textured panels with SVG noise overlays at 3% opacity',
          'Brass gradients using 4-stop linear gradients (#e8d4b0 → #d4b896 → #c9a86c → #8b7355)',
          'LED indicators with feGaussianBlur SVG filters for authentic glow',
          'JetBrains Mono for plate labels — monospace uppercase with 0.15em letter-spacing',
          'Inset box-shadows simulating panel depth and worn edges'
        ]
      },
      {
        type: 'video',
        src: '/videos/ontario-flag/vintage-controls-demo.mp4',
        caption: 'The control panel in action: brass lever slides through years while nixie tubes update with characteristic orange glow.'
      },
      {
        type: 'subheading',
        content: 'The Year Lever: Draggable Time Travel'
      },
      {
        type: 'text',
        content: 'The year control isn\'t a slider — it\'s a brass lever that slides along a track with notched positions at historically significant years. As you drag, a nixie tube display updates with that characteristic orange glow. The interaction feels mechanical: there\'s visual resistance at era boundaries, and the lever snaps to key years like 1867 (Confederation) and 1965 (flag adoption).'
      },
      {
        type: 'text',
        content: 'Building this required separating visual state from data state. The lever position updates on every mouse move for smooth 60fps dragging, but the year value only changes when crossing thresholds. CSS transitions handle the lever movement while React state manages the actual year — preventing the flag from flickering during rapid dragging while keeping the lever responsive.'
      },
      {
        type: 'video',
        src: '/videos/ontario-flag/lever-interaction.mp4',
        caption: 'Drag the brass lever to navigate through 260 years. Notice how the flag transitions smoothly between historical eras.'
      },
      {
        type: 'pullquote',
        content: 'The best interfaces don\'t feel like interfaces. They feel like instruments.',
        attribution: 'Design Philosophy'
      },
      {
        type: 'subheading',
        content: 'Nixie Tube Display: Typography That Glows'
      },
      {
        type: 'text',
        content: 'The year display uses the nixie tube aesthetic — those vacuum tubes from the 1950s-70s where digits glow orange behind glass. In CSS, this required layered effects: the base text in #ff6b35, a Gaussian blur filter creating the glow halo, and a subtle radial gradient simulating the glass tube curvature. Each digit sits in its own "tube" container with dark backgrounds and brass bezels.'
      },
      {
        type: 'nixie-showcase',
        caption: 'Interactive demonstration: Watch how the nixie tubes transition between years with authentic glow effects and digit animations.'
      },
      {
        type: 'subheading',
        content: 'Toggle Switches: State with Physicality'
      },
      {
        type: 'text',
        content: 'The Union Jack and Shield toggles use a vintage switch design. Each switch has a brass toggle that slides in a recessed track, with embossed grip lines for visual texture. When toggled, the LED indicator above glows green (on) or stays dark (off). The switch state affects the flag render in real-time — toggle off the Union Jack and the canton disappears, revealing what a modified ensign might have looked like.'
      },
      {
        type: 'video',
        src: '/videos/ontario-flag/toggle-switches.mp4',
        caption: 'Toggle the Union Jack and Shield elements on/off. LED indicators provide immediate visual feedback.'
      },
      {
        type: 'subheading',
        content: 'Historical Accuracy: 8 Distinct Eras'
      },
      {
        type: 'text',
        content: 'Ontario\'s flag history is more complex than most people realize. Before the current flag (adopted in 1965), the province used variations of the Canadian Red Ensign — itself evolving through multiple versions as Canada\'s coat of arms changed in 1868, 1922, and 1957. Go back further and you reach Upper Canada (1791-1867), and before that, British colonial administration under the Royal Proclamation of 1763.'
      },
      {
        type: 'era-timeline',
        caption: 'Interactive timeline: Click any era to jump directly to that period and see the corresponding flag.'
      },
      {
        type: 'list',
        items: [
          '1763-1791: British Colonial Period — Union Jack flies over the new Province of Quebec',
          '1791-1867: Upper Canada Era — Constitutional Act creates distinct province',
          '1867: Confederation — Ontario becomes founding province of Canada',
          '1868-1921: First Red Ensign — Original Canadian coat of arms on red field',
          '1922-1956: Updated Red Ensign — Revised arms with new provincial shields',
          '1957-1964: Final Red Ensign — Simplified maple leaf design',
          '1965: The Vote — Ontario officially adopts its own provincial flag',
          '1965-Present: Current Flag — Red Ensign with Ontario shield'
        ]
      },
      {
        type: 'text',
        content: 'Each era in the time machine shows the historically accurate flag with proper proportions, correct heraldic elements, and appropriate weathering based on the selected texture mode. The contextual text updates to explain what was happening politically — why the flag changed, what it represented, and how Ontario\'s identity evolved.'
      },
      {
        type: 'pullquote',
        content: 'I spent hours studying actual flag specifications and historical photographs. The Union Jack diagonal stripes alone have specific offsets to maintain proper counterchanging when quartered.',
        attribution: 'On Historical Research'
      },
      {
        type: 'subheading',
        content: 'SVG Flag Rendering: Scalable Heraldry'
      },
      {
        type: 'text',
        content: 'The flags are rendered entirely in SVG for crisp scaling at any resolution. This sounds simple until you try to build a Union Jack correctly — the diagonal stripes must be offset from center, the red Cross of St. Patrick sits counterchanged (different position above/below, left/right), and the proportions must be exactly 1:2. The Ontario shield adds another layer: the Cross of St. George, three maple leaves in proper arrangement, and heraldic coloring that changes based on the selected palette.'
      },
      {
        type: 'flag-anatomy',
        caption: 'Interactive diagram: Hover over flag elements to see their heraldic names, proportions, and historical significance.'
      },
      {
        type: 'text',
        content: 'The rendering system supports two texture modes: "solid" for clean, modern appearance, and "aged" which applies subtle weathering effects — SVG filters that add noise and slight color desaturation to simulate historical artifacts. Users can also cycle through color palettes, from accurate historical tones to stylized options, letting them customize the aesthetic while maintaining design accuracy.'
      },
      {
        type: 'video',
        src: '/videos/ontario-flag/texture-palette-demo.mp4',
        caption: 'Cycle through texture modes (solid/aged) and color palettes. The flag adapts while maintaining historical accuracy.'
      },
      {
        type: 'subheading',
        content: 'Keyboard Navigation: Power User Experience'
      },
      {
        type: 'text',
        content: 'Every control in the interface is accessible via keyboard. Arrow keys move through years (shift for decades), up/down arrows jump between historical eras. Home and End jump to 1763 and present day. Letter keys toggle interface elements: U for Union Jack, S for shield, P for palette, T for texture. Press ? to see all shortcuts in a modal. This makes the experience accessible and efficient for repeated exploration.'
      },
      {
        type: 'keyboard-map',
        caption: 'Full keyboard shortcut reference. Every control is accessible without a mouse.'
      },
      {
        type: 'list',
        items: [
          '← → : Navigate years (±1 year)',
          'Shift + ← → : Navigate decades (±10 years)',
          '↑ ↓ : Jump to next/previous historical era',
          'Home / End : Jump to 1763 or 2025',
          'U : Toggle Union Jack visibility',
          'S : Toggle Shield visibility',
          'P : Cycle through color palettes',
          'T : Toggle texture mode (solid/aged)',
          '? : Show keyboard shortcuts help'
        ]
      },
      {
        type: 'subheading',
        content: 'Export System: PNG & SVG Downloads'
      },
      {
        type: 'text',
        content: 'Any flag configuration can be downloaded as PNG or SVG. The export preserves the current year\'s flag design, selected color palette, and texture mode. Filenames are automatically generated with the year and era (e.g., "ontario-flag-1965-adoption.png") for easy organization. The PNG export uses Canvas API for rasterization at 2x resolution for retina displays; SVG exports the raw vector for infinite scaling.'
      },
      {
        type: 'video',
        src: '/videos/ontario-flag/export-demo.mp4',
        caption: 'Download any flag configuration as PNG (raster) or SVG (vector). Filenames include year and era automatically.'
      },
      {
        type: 'subheading',
        content: 'Technical Architecture'
      },
      {
        type: 'text',
        content: 'The project is built with Next.js 14 and TypeScript in strict mode, using the App Router for clean project structure. Tailwind CSS handles styling with CSS custom properties for the vintage color palette — changing a single variable updates brass tones across every component. The flag component tree is memoized aggressively to prevent unnecessary re-renders during lever dragging.'
      },
      {
        type: 'tech-stack',
        caption: 'Architecture diagram: See how components connect, from user input through state management to SVG rendering.'
      },
      {
        type: 'list',
        items: [
          'Next.js 14 with App Router and TypeScript strict mode',
          'Tailwind CSS with custom design tokens for vintage palette',
          'Custom branded Year type preventing invalid year values',
          'useCallback hooks with proper dependency arrays for keyboard events',
          'SVG filters (feGaussianBlur, feTurbulence) for nixie glow and texture effects',
          'Canvas API for PNG export at 2x resolution',
          'CSS transitions with cubic-bezier easing for lever movement',
          'ResizeObserver for responsive flag scaling'
        ]
      },
      {
        type: 'text',
        content: 'State management uses React hooks exclusively — no external libraries. The year is stored as a branded TypeScript type that prevents invalid values at compile time. Palette and texture state use simple useState with localStorage persistence, so preferences survive page refresh. The keyboard handler uses useCallback with proper dependencies to avoid stale closures while maintaining 60fps responsiveness.'
      },
      {
        type: 'pullquote',
        content: 'History becomes interesting when you can interact with it. The goal was making 260 years of vexillology feel like discovery, not homework.',
        attribution: 'Project Reflection'
      },
      {
        type: 'subheading',
        content: 'CSS Details: Making Digital Feel Physical'
      },
      {
        type: 'text',
        content: 'The vintage aesthetic required obsessive attention to CSS details. The noise texture overlay uses an inline SVG with feTurbulence, applied at 3% opacity so it\'s felt more than seen. Brass components use 4-stop gradients with highlights and shadows baked in. The panel backgrounds combine linear gradients with inset box-shadows to simulate depth and wear. Every element has the same material language — brass, bakelite, glass — creating a cohesive instrument rather than a collection of UI widgets.'
      },
      {
        type: 'list',
        items: [
          'Noise overlay: feTurbulence SVG filter at baseFrequency="0.9" with fractalNoise',
          'Brass gradient: linear-gradient(180deg, #e8d4b0 0%, #d4b896 20%, #c9a86c 60%, #8b7355 100%)',
          'Panel depth: inset box-shadow 0 2px 4px rgba(0,0,0,0.5) combined with outer shadow',
          'Screw details: radial gradients with pseudo-element slot lines',
          'LED glow: feGaussianBlur stdDeviation="0.8" with feMerge for layered effect'
        ]
      },
      {
        type: 'subheading',
        content: 'Why This Project Matters'
      },
      {
        type: 'text',
        content: 'I built this because I wanted to prove that "serious" subjects don\'t require boring interfaces. Canadian provincial history could be a Wikipedia article. Instead, it\'s an instrument you operate — and operating it teaches you something. The vintage aesthetic isn\'t just decoration; it creates a sense of occasion, of handling something significant. That emotional engagement is what makes information stick.'
      },
      {
        type: 'text',
        content: 'This project also demonstrates frontend range beyond typical SaaS interfaces. Historical data visualization. Custom component design with attention to material authenticity. Full keyboard accessibility. SVG mastery for complex heraldic rendering. CSS craftsmanship that makes digital feel physical. Not every project needs a vintage theme, but every project benefits from this level of intentionality about how the interface feels, not just how it functions.'
      },
      {
        type: 'text',
        content: 'For a Toronto-based role, there\'s also a local angle: Ontario\'s flag represents the province where I\'m building my career. Understanding its history — from British colony to Confederation founding member to distinct provincial identity — grounds my work in the place where I live. The time machine isn\'t just a portfolio piece; it\'s a love letter to Ontario, built with the best frontend tools available.'
      }
    ],

    technicalDetails: [
      {
        title: 'Framework',
        description: 'Next.js 14 with App Router. TypeScript in strict mode. Tailwind CSS with custom design tokens for the vintage aesthetic.'
      },
      {
        title: 'Flag Rendering',
        description: 'Pure SVG components with accurate heraldic proportions. Supports solid and aged texture modes. Multiple color palettes.'
      },
      {
        title: 'Vintage UI Components',
        description: 'Custom brass lever, nixie tube display, and toggle switches. CSS gradients simulate metal surfaces. SVG filters create glow effects.'
      },
      {
        title: 'Interaction Design',
        description: 'Full keyboard navigation with era jumping. Touch-friendly lever control. Responsive layout adapts vintage aesthetic to mobile.'
      },
      {
        title: 'Export System',
        description: 'PNG export via Canvas API. Native SVG export. Auto-generated filenames with year and era metadata.'
      },
      {
        title: 'Historical Data',
        description: '8 distinct eras from 1763-present. Contextual descriptions for each period. Accurate flag specifications per era.'
      }
    ],

    conclusion: 'The Ontario Flag Time Machine proves that educational tools can have personality. By treating history as something worth designing for — not just displaying — the project turns passive reading into active exploration. The vintage interface isn\'t nostalgic whimsy; it\'s a deliberate choice to make 260 years of vexillology feel tangible. Sometimes the best way to understand the past is to build a machine that takes you there.'
  },
  {
    id: 3,
    // Card Preview Data
    title: 'Flashcards Study System: Spaced Repetition with Modern UX',
    subtitle: 'SM-2 algorithm meets thoughtful interface design',
    name: 'Flashcards',
    category: 'EDUCATION',
    type: 'Study Tool',
    year: '2024',
    content: `Study apps often sacrifice usability for features. This flashcard system 
      focuses on what actually matters: smooth card interactions, persistent sessions, 
      and the proven SM-2 algorithm for optimal retention.`,
    fullContent: `A flashcard study system implementing the SM-2 spaced repetition algorithm 
      with pause/resume sessions, progress tracking, deck organization, and keyboard 
      navigation. Part of veraOS but designed as a standalone experience.`,
    pullQuote: '"The best study tool is one you actually want to use."',
    tech: ['React', 'Tailwind CSS', 'LocalStorage', 'SM-2 Algorithm'],
    features: [
      'Spaced Repetition',
      'Session Persistence',
      'Keyboard Navigation',
      'Progress Analytics',
      'Deck Organization'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvorios/veraos'
    },

    // Full Article Data
    date: 'November 2024',
    readTime: '6',
    image: '/images/flashcards-project/study-view.png',
    imageCaption: 'The flashcard study interface with progress indicators and keyboard shortcuts.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '6 weeks',
    role: 'Developer & Designer',

    lede: `Anki is powerful but looks like it was designed in 2005. Quizlet is pretty but dumbed-down. I wanted something in between: the proven effectiveness of spaced repetition with an interface that feels modern and responds to how people actually study — in sessions that get interrupted, on devices that vary, with progress that should persist automatically.`,

    bodyParagraphs: [
      {
        type: 'text',
        content: 'The SM-2 algorithm is the foundation. Each card tracks its ease factor, interval, and repetition count. Rate a card easy and you won\'t see it for weeks. Rate it hard and it comes back tomorrow. This isn\'t new — it\'s been proven effective since the 1980s. What\'s new is making it feel good to use.'
      },
      {
        type: 'subheading',
        content: 'Sessions That Survive'
      },
      {
        type: 'text',
        content: 'Real studying gets interrupted. Phone calls, coffee breaks, closing the laptop. The session system saves state to localStorage continuously — current card, time elapsed, cards remaining. Close the browser mid-session and pick up exactly where you left off. Pause tracking even accounts for break time separately from study time.'
      },
      {
        type: 'pullquote',
        content: 'The best study tool is one you actually want to use.',
        attribution: 'Design Philosophy'
      },
      {
        type: 'subheading',
        content: 'Keyboard-First Design'
      },
      {
        type: 'text',
        content: 'Power users don\'t want to click. Space flips the card, 1-4 rates difficulty, arrow keys navigate. The entire study flow is possible without touching the mouse. This sounds minor until you\'re 50 cards deep and realize how much faster keyboard navigation feels.'
      },
      {
        type: 'list',
        items: [
          'SM-2 algorithm with proper interval calculations',
          'Session state persisted to localStorage',
          'Pause/resume with separate time tracking',
          'Full keyboard navigation for study flow',
          'Deck organization with color coding',
          'Progress analytics per deck and overall'
        ]
      },
      {
        type: 'subheading',
        content: 'Visual Feedback'
      },
      {
        type: 'text',
        content: 'Cards flip with a satisfying animation. Progress bars fill smoothly. Completion triggers a subtle celebration. These microinteractions don\'t affect learning outcomes directly, but they affect whether someone opens the app tomorrow. Motivation matters as much as algorithm.'
      }
    ],

    technicalDetails: [
      {
        title: 'SM-2 Implementation',
        description: 'Full SuperMemo 2 algorithm with ease factors, intervals, and repetition tracking per card.'
      },
      {
        title: 'Session Persistence',
        description: 'Continuous state saves to localStorage. Survives browser close, tracks paused time separately.'
      },
      {
        title: 'Keyboard Navigation',
        description: 'Complete study flow via keyboard. Space to flip, number keys for rating, arrows for navigation.'
      },
      {
        title: 'State Management',
        description: 'React context for deck and card state. Optimistic updates with proper error handling.'
      }
    ],

    conclusion: 'Effective learning tools need two things: proven methodology and pleasant experience. The SM-2 algorithm provides the methodology. Thoughtful interface design provides the experience. Together, they create a study tool that people actually use consistently — which is the only kind that works.'
  },
  {
    id: 4,
    // Card Preview Data
    title: 'Chat Interface: Streaming, Markdown, and Real-Time Highlights',
    subtitle: 'What happens when you take AI chat UX seriously',
    name: 'Chat UI',
    category: 'INTERFACE',
    type: 'AI Experience',
    year: '2024',
    content: `Most AI chat interfaces are glorified text boxes. This one handles streaming 
      responses, full markdown rendering, syntax highlighting, file attachments, and 
      a custom highlight system — all while feeling fast and responsive.`,
    fullContent: `A sophisticated chat interface featuring streaming AI responses, complete 
      markdown support with syntax highlighting, drag-and-drop file attachments, draft 
      auto-save, and an interactive highlight system applied in real-time.`,
    pullQuote: '"The interface is the product. Make it feel like it."',
    tech: ['React', 'Groq API', 'Tailwind CSS', 'Custom Markdown Parser'],
    features: [
      'Streaming Responses',
      'Syntax Highlighting',
      'File Attachments',
      'Draft Auto-save',
      'Interactive Highlights'
    ],
    links: {
      live: 'https://veraos.ai',
      github: 'https://github.com/juliocalvorios/veraos'
    },

    // Full Article Data
    date: 'October 2024',
    readTime: '7',
    image: '/images/chat-project/streaming-demo.png',
    imageCaption: 'The chat interface with streaming response and syntax-highlighted code.',
    author: {
      name: 'Julio Calvo',
      title: 'Frontend Developer'
    },
    duration: '8 weeks',
    role: 'Lead Developer',

    lede: `ChatGPT proved that AI chat could be mainstream. But its interface is basic — responses appear as monolithic text blocks, code highlighting is inconsistent, and there's no personality. Building veraOS's chat interface meant asking: what would AI chat look like if we designed it like a premium product?`,

    bodyParagraphs: [
      {
        type: 'text',
        content: 'Streaming was the first requirement. Watching tokens appear word-by-word feels conversational; waiting for a complete response feels like talking to a server. The implementation uses Server-Sent Events with careful handling of partial markdown — you can\'t render a code block until you know it\'s complete, but you can\'t wait for the whole message either.'
      },
      {
        type: 'subheading',
        content: 'Markdown Done Right'
      },
      {
        type: 'text',
        content: 'The markdown renderer handles tables, nested lists, code blocks with syntax highlighting, checkboxes, and blockquotes. But it also integrates with the highlight system — colored backgrounds and underlines applied by the AI don\'t break the markdown formatting. Getting this right required building a custom parser that processes highlights at the token level, before markdown rendering.'
      },
      {
        type: 'pullquote',
        content: 'The interface is the product. Make it feel like it.',
        attribution: 'Development Mantra'
      },
      {
        type: 'subheading',
        content: 'File Handling'
      },
      {
        type: 'text',
        content: 'Drag a file onto the chat and it attaches with a preview. But behind the scenes, the system validates more than just the extension. Magic byte verification confirms files are what they claim to be. Filename sanitization prevents path traversal. Size limits are enforced with clear feedback. Security isn\'t visible, but it\'s there.'
      },
      {
        type: 'list',
        items: [
          'Token-by-token streaming with SSE',
          'Full markdown: tables, code, lists, blockquotes',
          'Syntax highlighting for 50+ languages',
          'Drag-and-drop file attachments',
          'Magic byte verification for security',
          'Draft auto-save per conversation',
          'Model selector with tier gating'
        ]
      },
      {
        type: 'subheading',
        content: 'The Details'
      },
      {
        type: 'text',
        content: 'Drafts save automatically as you type, keyed per conversation. Switch chats and your unsent message waits for you. Copy buttons on code blocks provide feedback. The input expands as you type. Keyboard shortcuts work throughout. None of these are hard individually; together they create an experience that feels polished.'
      }
    ],

    technicalDetails: [
      {
        title: 'Streaming Pipeline',
        description: 'Server-Sent Events with partial markdown state management. Renders progressively without breaking formatting.'
      },
      {
        title: 'Markdown Parser',
        description: 'Custom tokenizer and AST parser. Integrates with highlight system at token level. Handles all common markdown features.'
      },
      {
        title: 'File Validation',
        description: 'MIME type checking plus magic byte verification. Filename sanitization. Size limits with user feedback.'
      },
      {
        title: 'State Management',
        description: 'Draft persistence per conversation. Optimistic message updates. Error recovery with user notification.'
      }
    ],

    conclusion: 'AI chat interfaces have room to grow. Most still feel like demos — functional but not refined. This interface demonstrates what\'s possible when you treat the chat experience as a product worth polishing. Streaming that feels natural, markdown that renders correctly, and dozens of small details that add up to something that feels professional.'
  }
]

export default projects
