const fs = require("fs-extra");
const path = require("path");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// Add anchor plugin for headers
md.use(require("markdown-it-anchor"), {
  permalinks: true,
});

// Navigation structure
const pages = [
  { title: "Introduction", file: "intro.md", url: "index" },
  {
    title: "Getting Started",
    file: "getting-started.md",
    url: "getting-started",
  },
  {
    title: "Authentication",
    file: "authentication.md",
    url: "authentication",
  },
  { title: "Badges", file: "badges.md", url: "badges" },
  { title: "Conditions", file: "conditions.md", url: "conditions" },
  { title: "Relationships", file: "relationships.md", url: "relationships" },
  { title: "Rewards", file: "rewards.md", url: "rewards" },
  { title: "Users", file: "users.md", url: "users" },
  { title: "Events", file: "events.md", url: "events" },
  { title: "Webhooks", file: "webhooks.md", url: "webhooks" },
  { title: "Billing", file: "billing.md", url: "billing" },
  {
    title: "API Reference",
    file: "api-reference.md",
    url: "api-reference",
  },
  { title: "Terms", file: "terms.md", url: "terms", hidden: true },
  { title: "Privacy", file: "privacy.md", url: "privacy", hidden: true },
];

// HTML template
function generateHTML(content, title, currentPage) {
  const navigation = pages
    .filter((page) => !page.hidden)
    .map((page) => {
      const active = page.url === currentPage ? "active" : "";
      return `<a href="${page.url}" class="${active}">${page.title}</a>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - Badger Documentation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Geist', Arial, Helvetica, sans-serif;
            line-height: 1.6;
            background: #f8f5f0;
            color: #171717;
            display: flex;
            min-height: 100vh;
        }
        
        .sidebar {
            width: 280px;
            background: #72a276;
            color: #ffffff;
            padding: 2rem 0;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
        }
        
        .sidebar-header {
            padding: 0 2rem 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 1rem;
        }
        
        .sidebar-header h1 {
            font-size: 1.5rem;
            color: #ffffff;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        .sidebar-header p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
        }
        
        .nav {
            padding: 0 2rem;
        }
        
        .nav a {
            display: block;
            padding: 0.75rem 1rem;
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            border-radius: 6px;
            margin-bottom: 0.25rem;
            transition: all 0.2s;
            font-weight: 400;
        }
        
        .nav a:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }
        
        .nav a.active {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
            font-weight: 500;
        }
        
        .main {
            flex: 1;
            margin-left: 280px;
            padding: 3rem;
            max-width: calc(100vw - 280px);
        }
        
        .content {
            max-width: 800px;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #171717;
            font-weight: 600;
        }
        
        h2 {
            font-size: 1.8rem;
            margin: 2rem 0 1rem;
            color: #171717;
            border-bottom: 2px solid #72a276;
            padding-bottom: 0.5rem;
            font-weight: 600;
        }
        
        h3 {
            font-size: 1.4rem;
            margin: 1.5rem 0 0.75rem;
            color: #171717;
            font-weight: 500;
        }
        
        h4 {
            font-size: 1.2rem;
            margin: 1rem 0 0.5rem;
            color: #171717;
            font-weight: 500;
        }
        
        p {
            margin-bottom: 1rem;
            color: #444444;
        }
        
        ul, ol {
            margin-bottom: 1rem;
            padding-left: 2rem;
            color: #444444;
        }
        
        li {
            margin-bottom: 0.5rem;
        }
        
        code {
            background: rgba(114, 162, 118, 0.1);
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Geist Mono', 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 0.9em;
            color: #72a276;
        }
        
        pre {
            background: rgba(114, 162, 118, 0.05);
            padding: 1rem;
            border-radius: 6px;
            overflow-x: auto;
            margin: 1rem 0;
            border: 1px solid rgba(114, 162, 118, 0.2);
        }
        
        pre code {
            background: none;
            padding: 0;
            color: #171717;
        }
        
        blockquote {
            border-left: 4px solid #72a276;
            padding-left: 1rem;
            margin: 1rem 0;
            color: #666b6a;
            background: rgba(114, 162, 118, 0.05);
            padding: 1rem;
            border-radius: 0 6px 6px 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }
        
        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid rgba(114, 162, 118, 0.2);
        }
        
        th {
            background: rgba(114, 162, 118, 0.1);
            font-weight: 600;
            color: #171717;
        }
        
        a {
            color: #72a276;
            text-decoration: none;
            font-weight: 500;
        }
        
        a:hover {
            text-decoration: underline;
            color: #5a8a5e;
        }
        
        /* Anchor link styling */
        .header-anchor {
            color: #72a276;
            text-decoration: none;
            margin-right: 0.5rem;
            opacity: 0;
            transition: opacity 0.2s;
        }
        
        h1:hover .header-anchor,
        h2:hover .header-anchor,
        h3:hover .header-anchor,
        h4:hover .header-anchor,
        h5:hover .header-anchor,
        h6:hover .header-anchor {
            opacity: 1;
        }
        
        .header-anchor:hover {
            color: #5a8a5e;
        }
        
        .highlight {
            background: rgba(232, 116, 97, 0.1);
            padding: 1rem;
            border-radius: 6px;
            border: 1px solid rgba(232, 116, 97, 0.3);
            margin: 1rem 0;
        }
        
        strong {
            color: #171717;
            font-weight: 600;
        }
        
        em {
            color: #666b6a;
        }
        
        @media (max-width: 768px) {
            .sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s;
            }
            
            .sidebar.open {
                transform: translateX(0);
            }
            
            .main {
                margin-left: 0;
                max-width: 100vw;
                padding: 2rem 1rem;
            }
            
            .mobile-toggle {
                display: block;
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1000;
                background: #72a276;
                color: white;
                border: none;
                padding: 0.5rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1.2rem;
            }
        }
        
        .mobile-toggle {
            display: none;
        }
    </style>
</head>
<body>
    <button class="mobile-toggle" onclick="toggleSidebar()">☰</button>
    
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <h1>Badger</h1>
            <p>Documentation</p>
        </div>
        <nav class="nav">
            ${navigation}
        </nav>
    </div>
    
    <main class="main">
        <div class="content">
            ${content}
        </div>
    </main>
    
    <script>
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
        }
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('sidebar');
                const toggle = document.querySelector('.mobile-toggle');
                if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    </script>
</body>
</html>`;
}

async function build() {
  try {
    // Create docs directory
    await fs.ensureDir("docs");

    // Copy any static assets
    if (await fs.pathExists("assets")) {
      await fs.copy("assets", "docs/assets");
    }

    // Build each page
    for (const page of pages) {
      const markdownPath = path.join("src", page.file);
      const htmlPath = path.join("docs", page.url + ".html");

      if (await fs.pathExists(markdownPath)) {
        const markdown = await fs.readFile(markdownPath, "utf8");
        const html = md.render(markdown);
        const fullHTML = generateHTML(html, page.title, page.url);

        await fs.writeFile(htmlPath, fullHTML);
        console.log(`Built: ${page.url}.html`);
      } else {
        console.warn(`Warning: ${markdownPath} not found`);
      }
    }

    console.log("Build complete! Files generated in docs/");
  } catch (error) {
    console.error("Build failed:", error);
    process.exit(1);
  }
}

build();
