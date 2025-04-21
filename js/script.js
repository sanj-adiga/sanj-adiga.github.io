
////////*  Bounce animation for dock icons on click *//////
document.querySelectorAll('.dock-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.add('bounce');
      icon.addEventListener('animationend', () => {
        icon.classList.remove('bounce');
      }, { once: true });
    });
});

// UNIVERSAL FUNCTIONS
/// * Updating user's current time in the menu */
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById("current-time");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    timeElement.textContent = `${hours}:${minutes}`;
}
setInterval(updateTime, 1000);
updateTime(); // initial call


/// * Function to create a new window with a random position */
function randomizePosition(win) {
    const padding = 20; // for right/left spacing
    const menuBarHeight = 24;
    const dockHeight = 80; // 60px dock + 20px buffer
    const maxLeft = window.innerWidth - win.offsetWidth - padding;
    const maxTop = window.innerHeight - win.offsetHeight - dockHeight;

    const left = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * (maxTop - menuBarHeight)) + menuBarHeight; // below menu bar

    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
}

// * Bring clicked window to front */
let zstack = 100; // base z-index for windows
let stack = []; // stack of windows
function bringToFront(win) {
     win.style.zIndex = zstack++;
     win.classList.add("focused");
     topWindow = win;
 
     // update menu bar app name
     const title = win.querySelector('.app-title')?.textContent?.split(" ")[0] || "App";
     document.getElementById('active-app-name').textContent = title;
}

document.querySelectorAll('.data-window').forEach(win => {
    win.addEventListener('mousedown', () => bringToFront(win));
});


///* Draggable Window */
function makeDraggable(windowEl, headerEl) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
  
    headerEl.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = windowEl.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'none';
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const minTop = document.querySelector('.menu-bar')?.offsetHeight || 24;
        const maxLeft = window.innerWidth - windowEl.offsetWidth;
        const maxTop = window.innerHeight - windowEl.offsetHeight;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Contain window within screen bounds
        if (newTop < minTop) newTop = minTop;
        if (newLeft < 0) newLeft = 0;
        if (newLeft > maxLeft) newLeft = maxLeft;
        if (newTop > maxTop) newTop = maxTop;

        windowEl.style.left = `${newLeft}px`;
        windowEl.style.top = `${newTop}px`;
        windowEl.style.transform = 'none'; // disable original center transform while dragging
      }
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    });
  }

///////* Menu Bar Dropdown functionality *//////
const logoBtn = document.getElementById('logo');
const dropdown = document.getElementById('apple-dropdown');
const shutdownOption = document.getElementById('shutdown');

logoBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
});

// Close dropdown on outside click
document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
});

// Shutdown option triggers terminal window with typewriter effect
const shutdownWindow = document.getElementById('shutdown-window');
const shutdownContainer = document.getElementById('shutdown-content');
const shutdownHeader = document.getElementById('shutdown-header');
const shutdownCloseBtn = shutdownWindow.querySelector('.btn.red');

 // define the typewriter effect function
function typewriterEffect(containerId, lines, speed = 30, onComplete = null) {
    const container = document.getElementById(containerId);

    let lineIndex = 0;
    let charIndex = 0;

    function typeNextChar() {
        if (lineIndex >= lines.length) {
            if (onComplete) onComplete();
            return;
        }

        if (charIndex === 0) {
            const p = document.createElement('p');
            container.appendChild(p);
        }

        const currentLine = container.children[container.children.length - 1];
        currentLine.textContent += lines[lineIndex][charIndex];
        charIndex++;

        if (charIndex < lines[lineIndex].length) {
            setTimeout(typeNextChar, speed);
        } else {
            charIndex = 0;
            lineIndex++;
            setTimeout(typeNextChar, speed * 4);
        }
    }

    typeNextChar();
}

shutdownOption.addEventListener('click', () => {
    dropdown.classList.add('hidden');

    // Show window
    shutdownWindow.classList.remove('hidden');
    bringToFront(shutdownWindow);
    randomizePosition(shutdownWindow);
    makeDraggable(shutdownWindow, shutdownHeader);

    // Reset terminal text with static lines
    shutdownContainer.innerHTML = `
        <p>Mac OS X Version (10.2)</p>
        <p>Last Login: Thu Apr 10 06:41:19 on console</p>
    `;

    const dynamicLines = [
        "[sanjanas-macbook:~] sanjana% shutdown.exe init",
        "shutdown: No such process",
        "[sanjanas-macbook:~] sanjana% sudo shutdown -h now",
        "shutdown: Thanks for visiting!"
    ];

    typewriterEffect('shutdown-content', dynamicLines, 25, () => {
        const finalPrompt = document.createElement('p');
        finalPrompt.textContent = "[sanjanas-macbook:~] sanjana% ";
        shutdownContainer.appendChild(finalPrompt);
    });
});
shutdownCloseBtn.addEventListener('click', () => {
    document.getElementById('shutdown-window').classList.add('hidden');
    shutdownContainer.innerHTML = "";
});

///////* About window functionality *//////
const aboutWindow = document.getElementById('about-window')
const aboutHeader = document.getElementById('about-header')
makeDraggable(aboutWindow, aboutHeader);


///////* Sticky note functionality *//////
const stickies = document.querySelectorAll('.sticky-note');
const stickiesIcon = document.querySelector('[alt="stickies"]');
const introNote = document.getElementById('intro-note');

document.querySelectorAll('.sticky-note').forEach(note => {
    const header = note.querySelector('.stickies-header');
    makeDraggable(note, header);
  
});

stickiesIcon.addEventListener('click', () => {
    stickies.forEach((note) => {
        // If note is hidden, show and randomize its position
        if (note.classList.contains('hidden')) {
            randomizePosition(note);
            note.classList.remove('hidden');
        }
        
        // Make it draggable
        const header = note.querySelector('.stickies-header');
        makeDraggable(note, header);

        // Close button functionality
        const closeBtn = note.querySelector('.btn.close');
        closeBtn.onclick = () => note.classList.add('hidden');
    });
});



///////* TextEdit window functionality (projects) *//////
const textEditIcon = document.querySelector('[alt="textedit"]');
const textEditWindow = document.getElementById('textedit-window');
const textEditHeader = document.getElementById('textedit-header');
const textEditCloseBtn = textEditWindow.querySelector('.btn.red');

textEditIcon.addEventListener('click', () => {
    const isOpen = !textEditWindow.classList.contains('hidden');
    // If it's open, bring it to the front
    if (isOpen) {
        bringToFront(textEditWindow);
        return;
    }
    // If it's not open, randomize its position and show it
    randomizePosition(textEditWindow);

    textEditWindow.classList.remove('hidden');
    bringToFront(textEditWindow);
});
  
textEditCloseBtn.addEventListener('click', () => {
    document.getElementById('textedit-window').classList.add('hidden');
  });
  
  // initialize draggable functionality
  makeDraggable(textEditWindow, textEditHeader);

///////* Explorer window functionality *//////
const explorerIcon = document.querySelector('[alt="safari"]');
const explorerWindow = document.getElementById('explorer-window');
const explorerHeader = document.getElementById('explorer-header');
const explorerCloseBtn = explorerWindow.querySelector('.btn.red');

explorerIcon.addEventListener('click', () => {
    const isOpen = !explorerWindow.classList.contains('hidden');
    // If it's open, bring it to the front
    if (isOpen) {
        bringToFront(explorerWindow);
        return;
    }
    // If it's not open, randomize its position and show it
    randomizePosition(explorerWindow);

    explorerWindow.classList.remove('hidden');
    bringToFront(explorerWindow);
});

///* ASCII Art Animation *//////
    const canvas = document.getElementById("ascii-canvas");
    const ctx = canvas.getContext("2d");

    const fontSize = 12;
    const padding = 8;
    ctx.font = `bold ${fontSize}px monospace`;

    const asciiArt = `                                                            
_ ,,         ,,          ,, gp                              
'7MM         db          db \//                              
  MM                        '                              
  MMpMMMb. '7MM        '7MM   '7MMpMMMb.pMMMb.              
  MM    MM   MM          MM     MM    MM    MM              
  MM    MM   MM          MM     MM    MM    MM              
  MM    MM   MM  ,,      MM     MM    MM    MM              
.JMML  JMML.JMML.dg    .JMML. .JMML  JMML  JMML.            
                 ,j         ,,                              
                ,'          db                              
                                                            
,pP"Ybd  ,6"Yb. '7MMpMMMb.'7MM  ,6"Yb. '7MMpMMMb.   ,6"Yb.  
8I   '" 8)   MM   MM    MM  MM 8)   MM   MM    MM  8)   MM  
'YMMMa.  ,pm9MM   MM    MM  MM  ,pm9MM   MM    MM   ,pm9MM  
L.   I8 8M   MM   MM    MM  MM 8M   MM   MM    MM  8M   MM  
M9mmmP' 'Moo9^Yo.JMML  JMML.MM 'Moo9^Yo.JMML  JMML.'Moo9^Yo.
                         QO MP                              
                         'bmP                               
`;
    

    const lines = asciiArt.trim().split("\n");
    const cols = Math.max(...lines.map(line => line.length));
    const rows = lines.length;

    const dpr = window.devicePixelRatio || 1;
    const desiredWidth = 800;
    const desiredHeight = 230;
    canvas.width = desiredWidth * dpr;
    canvas.height = desiredHeight * dpr;
    canvas.style.width = desiredWidth + 'px';
    canvas.style.height = desiredHeight + 'px';

    // canvas.width = cols * fontSize + padding * 2;
    // canvas.height = rows * fontSize + padding * 2;

    // Preprocess each character into a particle
    const particles = [];
    for (let y = 0; y < rows; y++) {
      const line = lines[y];
      for (let x = 0; x < cols; x++) {
        const char = line[x] || ' ';
        particles.push({
          char,
          x: x * fontSize + padding,
          y: y * fontSize + padding,
          ox: x * fontSize + padding,
          oy: y * fontSize + padding,
          offsetX: 0,
          offsetY: 0
        });
      }
    }

    let mouseX = -999, mouseY = -999;
    canvas.addEventListener("mousemove", e => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    canvas.addEventListener("mouseleave", () => {
      mouseX = -999;
      mouseY = -999;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 100;

        if (dist < repelRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (repelRadius - dist) / repelRadius;
          p.offsetX = Math.cos(angle) * force * 10;
          p.offsetY = Math.sin(angle) * force * 10;
        } else {
          p.offsetX *= 0.9; // smooth return
          p.offsetY *= 0.9;
        }

        ctx.fillStyle = "#111";
        ctx.fillText(p.char, p.ox + p.offsetX, p.oy + p.offsetY);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // crisp text!
      }

      requestAnimationFrame(animate);
    }

    animate();
  



explorerCloseBtn.addEventListener('click', () => {
    document.getElementById('explorer-window').classList.add('hidden');
});
// make explorer window draggable
makeDraggable(explorerWindow, explorerHeader);


///////* Terminal window functionality *//////
const terminalIcon = document.querySelector('[alt="terminal"]');
const terminalWindow = document.getElementById('terminal-window');
const terminalHeader = document.getElementById('terminal-header');
const terminalCloseBtn = terminalWindow.querySelector('.btn.red');

makeDraggable(terminalWindow, terminalHeader);
terminalCloseBtn.addEventListener('click', () => {
    document.getElementById('terminal-window').classList.add('hidden');
});

//// spotify
const musicIcon = document.querySelector('[alt="music"]');

function openSpotify() {
    window.open('https://open.spotify.com/user/sanjana.adiga');
}

//// Resume Desktop Icon 
const resumeIcon = document.getElementById('resume-icon');
resumeIcon.addEventListener('dblclick', () => {
    window.open('assets/docs/resume.pdf');
});

//// LinkedIn Desktop Icon
const linkedInIcon = document.getElementById('linkedin-icon');
linkedInIcon.addEventListener('dblclick', () => {
    window.open('https://www.linkedin.com/in/sanjana-adiga/');
});
//// GitHub Desktop Icon
const gitHubIcon = document.getElementById('github-icon');
gitHubIcon.addEventListener('dblclick', () => {
    window.open('https://www.github.com/sanj-adiga');
});

/////* Contact Me */////
const contactIcon = document.querySelector('[alt="address-book"]');
const contactWindow = document.getElementById('contact-window');
const contactHeader = document.getElementById('contact-header');
const contactCloseBtn = contactWindow.querySelector('.btn.red');
contactIcon.addEventListener('click', () => {
    const isOpen = !contactWindow.classList.contains('hidden');
    // If it's open, bring it to the front
    if (isOpen) {
        bringToFront(contactWindow);
        return;
    }
    // If it's not open, randomize its position and show it
    randomizePosition(contactWindow);

    contactWindow.classList.remove('hidden');
    bringToFront(contactWindow);
});
contactWindow.addEventListener('click', (e) => {
    bringToFront(contactWindow);
});
contactCloseBtn.addEventListener('click', () => {
    document.getElementById('contact-window').classList.add('hidden');
});
makeDraggable(contactWindow, contactHeader);


console.log("Inspired by MacOS X Jaguar and the Aqua interface era.");