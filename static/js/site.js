// Load user selected theme preference on startup
(function() {
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme && ['orange', 'amber', 'blue', 'lab'].indexOf(savedTheme) !== -1) {
    document.body.className = 'theme-' + savedTheme;
  }
})();

// Scroll progress bar
window.addEventListener('scroll', function(){
  var progress = document.getElementById('scroll-progress');
  if (!progress) return;
  var h = document.documentElement.scrollHeight - window.innerHeight;
  var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
  progress.style.width = pct + '%';
});

// Reveal on scroll (IntersectionObserver)
var observer = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (e.isIntersecting) {
      var delay = e.target.dataset.delay || 0;
      setTimeout(function(){ e.target.classList.add('visible'); }, delay);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .card').forEach(function(el){ observer.observe(el); });

// Typing effect
document.querySelectorAll('[data-typing]').forEach(function(el){
  var nodes = [];
  (function walk(parent){
    parent.childNodes.forEach(function(n){
      if (n.nodeType === 3) {
        var txt = n.textContent;
        if (nodes.length === 0) {
          txt = txt.replace(/^\s+/, '');
        }
        for (var c = 0; c < txt.length; c++)
          nodes.push({ ch: txt[c], tag: null });
      } else if (n.nodeType === 1) {
        var tag = n.tagName.toLowerCase();
        if (tag === 'br') {
          nodes.push({ ch: null, tag: 'br' });
        } else if (tag === 'p') {
          if (nodes.length > 0) nodes.push({ ch: null, tag: 'br' });
          walk(n);
        } else {
          walk(n);
          var kids = n.textContent;
          var start = nodes.length - kids.length;
          for (var c = start; c < nodes.length; c++)
            nodes[c].tag = tag;
        }
      }
    });
  })(el);
  el.innerHTML = '';
  var cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  el.appendChild(cursor);
  var i = 0, currentTag = null, currentEl = null;
  function type(){
    if (i < nodes.length) {
      var n = nodes[i];
      if (n.tag === 'br') {
        el.insertBefore(document.createElement('br'), cursor);
        currentEl = null;
        currentTag = null;
      } else {
        if (n.tag && n.tag !== currentTag) {
          currentEl = document.createElement(n.tag);
          el.insertBefore(currentEl, cursor);
          currentTag = n.tag;
        } else if (!n.tag && currentTag) {
          currentEl = null;
          currentTag = null;
        }
        var txt = document.createTextNode(n.ch);
        if (currentEl) currentEl.appendChild(txt);
        else el.insertBefore(txt, cursor);
      }
      i++;
      setTimeout(type, 20 + Math.random() * 25);
    }
  }
  var tObs = new IntersectionObserver(function(entries){
    if (entries[0].isIntersecting) { type(); tObs.disconnect(); }
  }, { threshold: 0.5 });
  tObs.observe(el);
});

// Uptime Ticker
(function() {
  var uptimeEl = document.getElementById('uptime-val');
  if (!uptimeEl) return;
  var start = Date.now();
  setInterval(function() {
    var diff = Math.floor((Date.now() - start) / 1000);
    var mins = Math.floor(diff / 60);
    var secs = diff % 60;
    var padSecs = secs < 10 ? '0' + secs : secs;
    var padMins = mins < 10 ? '0' + mins : mins;
    var padDiff = diff < 10 ? '000' + diff : (diff < 100 ? '00' + diff : (diff < 1000 ? '0' + diff : diff));
    uptimeEl.textContent = ' ' + padDiff + 's ' + padMins + ':' + padSecs;
  }, 1000);
})();

// Boot Screen Simulation
(function() {
  var bootEl = document.getElementById('boot-screen');
  var pageEl = document.getElementById('page-content');
  if (!bootEl || !pageEl) return;

  var hasBooted = sessionStorage.getItem('booted');
  if (hasBooted || !window.runBootScreen) {
    bootEl.style.display = 'none';
    pageEl.style.display = 'block';
    return;
  }

  var bootLogs = [
    { text: "Loading maincode_os kernel image... [  OK  ]", type: "ok" },
    { text: "Detecting CPU cores... [4x ARM Cortex-A72 @ 1.5GHz]", type: "dim" },
    { text: "Allocating virtual memory structures...", type: "dim" },
    { text: "Mounting /dev/sda1 on /root [ext4, read-only]... [  OK  ]", type: "ok" },
    { text: "Initializing cache subsystem (picante)... [  OK  ]", type: "ok" },
    { text: "Loading static site pages and series... [  OK  ]", type: "ok" },
    { text: "Validating navigation and routing nodes... [  OK  ]", type: "ok" },
    { text: "Establishing interactive user terminal /dev/pts/0... [  OK  ]", type: "ok" },
    { text: "guest session initiated. authorization: SESSION_VERIFIED", type: "orng" },
    { text: "system startup ready. entering shell.", type: "ok" }
  ];

  var lineIdx = 0;
  function printLine() {
    if (lineIdx < bootLogs.length) {
      var item = bootLogs[lineIdx];
      var div = document.createElement('div');
      div.className = 'boot-line';
      if (item.type === 'ok') {
        div.innerHTML = '[ <span class="ok"> OK </span> ] ' + item.text;
      } else if (item.type === 'orng') {
        div.innerHTML = '[ <span class="orng">WARN</span> ] ' + item.text;
      } else {
        div.innerHTML = '[ <span class="dim">INFO</span> ] <span class="dim">' + item.text + '</span>';
      }
      bootEl.appendChild(div);
      
      // trigger transition
      setTimeout(function() {
        div.classList.add('visible');
        var output = document.getElementById('main-output');
        if (output) output.scrollTop = output.scrollHeight;
      }, 10);

      lineIdx++;
      setTimeout(printLine, window.bootSpeedMs || 35);
    } else {
      // Boot finished, transition layout
      setTimeout(function() {
        bootEl.style.transition = 'opacity 0.25s ease';
        bootEl.style.opacity = '0';
        setTimeout(function() {
          bootEl.style.display = 'none';
          pageEl.style.display = 'block';
          sessionStorage.setItem('booted', 'true');
        }, 250);
      }, 500);
    }
  }
  printLine();
})();

// Command Bar interactive Shell
(function() {
  var input = document.getElementById('cmd-input');
  var response = document.getElementById('cmd-response');
  if (!input || !response) return;

  var history = [];
  var historyIdx = -1;

  // Click outside closes response box
  document.addEventListener('click', function(e) {
    if (!response.contains(e.target) && e.target !== input) {
      response.classList.remove('open');
    }
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var cmd = input.value.trim();
      input.value = '';
      if (!cmd) return;

      history.push(cmd);
      historyIdx = history.length;

      var output = runCommand(cmd);
      if (output !== null) {
        response.innerHTML = output;
        response.classList.add('open');
        response.scrollTop = 0;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIdx > 0) {
        historyIdx--;
        input.value = history[historyIdx];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length > 0 && historyIdx < history.length - 1) {
        historyIdx++;
        input.value = history[historyIdx];
      } else {
        historyIdx = history.length;
        input.value = '';
      }
    } else if (e.key === 'Escape') {
      response.classList.remove('open');
    }
  });

  function runCommand(rawCmd) {
    var parts = rawCmd.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var arg = parts.slice(1).join(' ').trim();

    if (cmd === 'clear') {
      response.classList.remove('open');
      response.innerHTML = '';
      return null;
    }

    if (cmd === 'help') {
      var helpCount = parseInt(sessionStorage.getItem('helpCount') || '0', 10);
      helpCount++;
      sessionStorage.setItem('helpCount', helpCount);
      var persistenceNotice = '';
      if (helpCount >= 4) {
        persistenceNotice = '\n\n<span style="color:var(--dim);">you\'ve typed help ' + helpCount + ' times. the terminal respects persistence.\ntry: bosskey, singularity, neofetch, cat status.txt</span>';
      }

      return '<span style="color:var(--accent);font-weight:700;">type a command (try: help)</span>\n\n' +
             '<span style="color:var(--accent);">// navigation</span>\n' +
             '  <span style="color:var(--accent);">home</span>       // go home\n' +
             '  <span style="color:var(--accent);">blog</span>       // read articles (alias: posts)\n' +
             '  <span style="color:var(--accent);">series</span>     // view multi-part series\n' +
             '  <span style="color:var(--accent);">projects</span>   // engineering projects\n' +
             '  <span style="color:var(--accent);">about</span>      // about author (alias: whoami)\n' +
             '  <span style="color:var(--accent);">email</span>      // copy email contact\n\n' +
             '<span style="color:var(--accent);">// system</span>\n' +
             '  <span style="color:var(--accent);">theme</span>      // change accent preset (<span style="color:var(--accent);">green</span>, <span style="color:var(--accent);">orange</span>, <span style="color:var(--accent);">amber</span>, <span style="color:var(--accent);">blue</span>, <span style="color:var(--accent);">lab</span>)\n' +
             '  <span style="color:var(--accent);">neofetch</span>   // system card\n' +
             '  <span style="color:var(--accent);">uptime</span>     // session uptime\n' +
             '  <span style="color:var(--accent);">history</span>    // command history\n' +
             '  <span style="color:var(--accent);">clear</span>      // clear response\n\n' +
             '<span style="color:var(--accent);">// explore</span>\n' +
             '  <span style="color:var(--accent);">ls</span>         // list directories (<span style="color:var(--accent);">posts</span>, <span style="color:var(--accent);">series</span>, <span style="color:var(--accent);">projects</span>)\n' +
             '  <span style="color:var(--accent);">cat</span>        // read metadata for a post, series, or project\n\n' +
             '<span style="color:var(--accent);">// dev</span>\n' +
             '  <span style="color:var(--accent);">git status</span> // repo state\n' +
             '  <span style="color:var(--accent);">git log</span>    // commit history\n' +
             '  <span style="color:var(--accent);">docker</span>     // system containers\n' +
             '  <span style="color:var(--accent);">npm</span>        // node packages\n\n' +
             '<span style="color:var(--accent);">// ai</span>\n' +
             '  <span style="color:var(--accent);">model</span>      // active model\n' +
             '  <span style="color:var(--accent);">agents</span>     // specialist agents\n' +
             '  <span style="color:var(--accent);">mcp</span>        // tool connections\n' +
             '  <span style="color:var(--accent);">eval</span>       // benchmarks\n' +
             '  <span style="color:var(--accent);">think</span>      // deep reasoning\n\n' +
             '<span style="color:var(--accent);">// fun</span>\n' +
             '  <span style="color:var(--accent);">fortune</span>    // dev wisdom\n' +
             '  <span style="color:var(--accent);">cowsay</span>     // moo\n' +
             '  <span style="color:var(--accent);">party</span>      // confetti banner' + persistenceNotice;
    }

    if (cmd === 'about' || cmd === 'whoami') {
      return '<span style="color:var(--accent);font-weight:700;">USER_PROFILE: Prem Mallappa</span>\n' +
             'Software engineer with 23 years of experience in systems programming, kernels, operating systems, and virtualization.\n' +
             'Primary Skills: C, Python, Go, Rust, Assembly, Linux kernel, QEMU, KVM, simulators.';
    }

    if (cmd === 'home') {
      window.location.href = '/';
      return 'Navigating to home...';
    }

    if (cmd === 'blog' || cmd === 'posts') {
      return listPosts();
    }

    if (cmd === 'series') {
      return listSeries();
    }

    if (cmd === 'projects') {
      return listProjects();
    }

    if (cmd === 'email') {
      return 'Contact: <a href="mailto:prem.mallappa@gmail.com" style="color:var(--accent);border:none;">prem.mallappa@gmail.com</a>';
    }

    // Handles ls commands
    if (cmd === 'ls') {
      var dir = arg.toLowerCase();
      if (dir === 'posts' || dir === '/posts') {
        return listPosts();
      } else if (dir === 'series' || dir === '/series') {
        return listSeries();
      } else if (dir === 'projects' || dir === '/projects') {
        return listProjects();
      } else if (!dir) {
        return '<span style="color:var(--accent);">posts/   series/   projects/</span>';
      } else {
        return 'Usage: ls [posts|series|projects]';
      }
    }

    if (cmd === 'theme') {
      var color = arg.toLowerCase();
      if (!color) {
        return 'Usage: theme [green|orange|amber|blue|lab]\nCurrent preset: ' + (localStorage.getItem('theme') || 'green');
      }
      if (color === 'green') {
        document.body.className = '';
        localStorage.removeItem('theme');
        return 'Theme updated: <span style="color:var(--accent)">green</span> (default phosphor)';
      } else if (['orange', 'amber', 'blue', 'lab'].indexOf(color) !== -1) {
        document.body.className = 'theme-' + color;
        localStorage.setItem('theme', color);
        return 'Theme updated: <span style="color:var(--accent)">' + color + '</span>';
      } else {
        return 'Unknown theme preset. Options: green, orange, amber, blue, lab';
      }
    }

    if (cmd === 'neofetch') {
      var uptimeVal = document.getElementById('uptime-val') ? document.getElementById('uptime-val').textContent.trim() : '0000s';
      return '<span style="color:var(--accent);font-weight:700;">pmallappa@guest</span>\n' +
             '---------------------\n' +
             'OS: maincode_os/4.1.26-rc2 (aarch64)\n' +
             'Kernel: Linux 4.1.26-rc2\n' +
             'Uptime: ' + uptimeVal + '\n' +
             'Shell: maincode-sh 1.2\n' +
             'Resolution: ' + window.innerWidth + 'x' + window.innerHeight + '\n' +
             'CPU: ARM Cortex-A72 @ 1.5GHz (4 Cores)\n' +
             'Memory: 8GB LPDDR4';
    }

    if (cmd === 'uptime') {
      var uptimeVal = document.getElementById('uptime-val') ? document.getElementById('uptime-val').textContent.trim() : '0000s';
      return 'session uptime: ' + uptimeVal;
    }

    if (cmd === 'history') {
      if (history.length === 0) return 'No command history.';
      return history.map(function(c, idx) { return '  ' + (idx + 1) + '  ' + c; }).join('\n');
    }

    if (cmd === 'git') {
      var gitCmd = arg.toLowerCase();
      if (gitCmd === 'status') {
        return 'On branch main\nYour branch is up to date with \'origin/main\'.\n\nnothing to commit, working tree clean';
      } else if (gitCmd === 'log') {
        return 'commit cf7012bc02a18fb20\nAuthor: Prem Mallappa <prem.mallappa@gmail.com>\nDate:   Sun Jul 12 17:58:14 2026 +0530\n\n    Add projects nav and custom terminal engine';
      } else {
        return 'Usage: git [status|log]';
      }
    }

    if (cmd === 'docker') {
      return 'CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS       PORTS     NAMES\n' +
             'a8d29b019fc2   simics:latest  "/entrypoint.sh"         2 hours ago   Up 2 hours             simics-instance\n' +
             'f8e91c028ea1   qemu-system    "qemu-system-aarch64…"   5 hours ago   Up 5 hours             kernel-debugger';
    }

    if (cmd === 'npm') {
      return 'dodeca-personal-site@1.0.0\n' +
             '├── dodeca-cli@1.4.2\n' +
             '└── tailwindcss@4.0.0-alpha.18';
    }

    if (cmd === 'model') {
      return 'Active Model: Gemini 3.5 Flash (High)\nContext Window: 1M tokens';
    }

    if (cmd === 'agents') {
      return 'Specialist Agents Available:\n' +
             '  - <span style="color:var(--accent);">kernel-assistant</span>    // kernel code auditing\n' +
             '  - <span style="color:var(--accent);">architecture-expert</span> // qemu / gem5 setups\n' +
             '  - <span style="color:var(--accent);">refactoring-bot</span>     // legacy C to Rust translation';
    }

    if (cmd === 'mcp') {
      return 'Model Context Protocol (MCP) Connections:\n' +
             '  [OK] memory-bridge-v2 (local)\n' +
             '  [OK] kernel-source-index (read-only)';
    }

    if (cmd === 'eval') {
      return 'System benchmarks:\n' +
             '  Execution speed: 1.25 TFLOPS (FP16)\n' +
             '  Vibe Score: 10/10\n' +
             '  Benchmark Mode: optimal';
    }

    if (cmd === 'think') {
      return '<span style="color:var(--dim);">&lt;thinking&gt;\nAnalyzing workspace layout...\nVerifying all systems nominal...\nDone.\n&lt;/thinking&gt;</span>\nAll systems operational.';
    }

    if (cmd === 'fortune') {
      var fortunes = [
        "There are only two hard things in Computer Science: cache invalidation and naming things. -- Phil Karlton",
        "To understand recursion, you must first understand recursion.",
        "Simplify, then add lightness. -- Colin Chapman",
        "Talk is cheap. Show me the code. -- Linus Torvalds",
        "The best code is no code at all.",
        "An operating system is a program that acts as an intermediary between a user of a computer and the computer hardware."
      ];
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    }

    if (cmd === 'cowsay') {
      var msg = arg || 'Moo!';
      var dashes = '-'.repeat(msg.length + 2);
      return '  ' + dashes + '\n' +
             '  < ' + msg + ' >\n' +
             '  ' + dashes + '\n' +
             '         \\   ^__^\n' +
             '          \\  (oo)\\_______\n' +
             '             (__)\\       )\\/\\\n' +
             '                 ||----w |\n' +
             '                 ||     ||';
    }

    if (cmd === 'party') {
      return '🎉 🎉 🎉  WELCOME TO THE PARTY  🎉 🎉 🎉\n' +
             '  Let\'s celebrate another successful deployment!';
    }

    if (cmd === 'bosskey') {
      return 'Loading simulated workspace layout... [ OK ]\nNo games detected.';
    }

    if (cmd === 'singularity') {
      return 'The singularity has already occurred. You are in it.';
    }

    if (cmd === 'cat') {
      if (!arg) return 'Usage: cat <post-slug> or cat <series-slug> or cat <project-slug>';
      
      var cleanSlug = arg.replace(/^\/?(posts|series|projects)\//, '').replace(/\/$/, '');
      
      // Search in posts
      if (window.blogPosts) {
        for (var i = 0; i < window.blogPosts.length; i++) {
          var p = window.blogPosts[i];
          if (p.path.indexOf(cleanSlug) !== -1) {
            return '<span style="color:var(--accent);font-weight:700;">POST: ' + p.title + '</span>\n' +
                   'Path: ' + p.path + '\n' +
                   'Summary: ' + (p.desc || 'No summary available.');
          }
        }
      }

      // Search in series
      if (window.blogSeries) {
        for (var i = 0; i < window.blogSeries.length; i++) {
          var s = window.blogSeries[i];
          if (s.path.indexOf(cleanSlug) !== -1) {
            return '<span style="color:var(--accent);font-weight:700;">SERIES: ' + s.title + '</span>\n' +
                   'Path: ' + s.path + '\n' +
                   'Summary: ' + (s.desc || 'No summary available.');
          }
        }
      }

      // Search in projects
      if (window.blogProjects) {
        for (var i = 0; i < window.blogProjects.length; i++) {
          var pr = window.blogProjects[i];
          if (pr.path.indexOf(cleanSlug) !== -1) {
            return '<span style="color:var(--accent);font-weight:700;">PROJECT: ' + pr.title + '</span>\n' +
                   'Path: ' + pr.path + '\n' +
                   'Summary: ' + (pr.desc || 'No summary available.');
          }
        }
      }

      return 'File not found: ' + arg;
    }

    return 'bash: command not found: ' + cmd + '\nType <span style="color:var(--accent);">help</span> to view available operations.';
  }

  function listPosts() {
    if (!window.blogPosts || window.blogPosts.length === 0) return 'No posts found.';
    var lines = ['<span style="color:var(--accent);font-weight:700;">PUBLISHED POSTS:</span>'];
    for (var i = 0; i < window.blogPosts.length; i++) {
      var p = window.blogPosts[i];
      lines.push('  <a href="' + p.path + '" style="color:var(--fg);border:none;">' + p.path + '</a> - ' + p.title);
    }
    return lines.join('\n');
  }

  function listSeries() {
    if (!window.blogSeries || window.blogSeries.length === 0) return 'No series found.';
    var lines = ['<span style="color:var(--accent);font-weight:700;">MULTI-PART SERIES:</span>'];
    for (var i = 0; i < window.blogSeries.length; i++) {
      var s = window.blogSeries[i];
      lines.push('  <a href="' + s.path + '" style="color:var(--fg);border:none;">' + s.path + '</a> - ' + s.title);
    }
    return lines.join('\n');
  }

  function listProjects() {
    if (!window.blogProjects || window.blogProjects.length === 0) return 'No projects found.';
    var lines = ['<span style="color:var(--accent);font-weight:700;">ENGINEERING PROJECTS:</span>'];
    for (var i = 0; i < window.blogProjects.length; i++) {
      var pr = window.blogProjects[i];
      lines.push('  <a href="' + pr.path + '" style="color:var(--fg);border:none;">' + pr.path + '</a> - ' + pr.title);
    }
    return lines.join('\n');
  }
})();

