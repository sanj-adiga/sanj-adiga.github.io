
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
    const padding = 50;
    const maxLeft = window.innerWidth - win.offsetWidth - padding;
    const maxTop = window.innerHeight - win.offsetHeight - padding;

    const left = Math.floor(Math.random() * maxLeft);
    const top = Math.floor(Math.random() * maxTop);

    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
}

// * Bring clicked window to front */
function bringToFront(win) {
     // lower all other windows
     document.querySelectorAll('.app-window').forEach(w => w.style.zIndex = 200);
     win.style.zIndex = 300;
 
     // update menu bar app name
     const title = win.querySelector('.app-title')?.textContent?.split(" ")[0] || "App";
     document.getElementById('active-app-name').textContent = title;
}

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

///////* About window functionality *//////
const aboutWindow = document.getElementById('about-window')
const aboutHeader = document.getElementById('about-header')
makeDraggable(aboutWindow, aboutHeader);
aboutWindow.addEventListener('click', (e) => {
    bringToFront(aboutWindow);
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

textEditWindow.addEventListener('click', (e) => {
    bringToFront(textEditWindow);
});
  
textEditCloseBtn.addEventListener('click', () => {
    document.getElementById('textedit-window').classList.add('hidden');
  });
  
  // initialize draggable functionality
  makeDraggable(textEditWindow, textEditHeader);

///////* Explorer window functionality *//////
const explorerIcon = document.querySelector('[alt="explorer"]');
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

explorerWindow.addEventListener('click', (e) => {
    bringToFront(explorerWindow);
});

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

terminalIcon.addEventListener('click', () => {
    const isOpen = !terminalWindow.classList.contains('hidden');
    // If it's open, bring it to the front
    if (isOpen) {
        bringToFront(terminalWindow);
        return;
    }
    // If it's not open, randomize its position and show it
    randomizePosition(terminalWindow);

    terminalWindow.classList.remove('hidden');
    bringToFront(terminalWindow);
});

terminalWindow.addEventListener('click', (e) => {
    bringToFront(terminalWindow);
});

makeDraggable(terminalWindow, terminalHeader);
terminalCloseBtn.addEventListener('click', () => {
    document.getElementById('terminal-window').classList.add('hidden');
});

//// spotify
const musicIcon = document.querySelector('[alt="music"]');

function openSpotify() {
    window.open('https://open.spotify.com/user/sanjana.adiga');
}

//// Resume document 
const resumeIcon = document.getElementById('resume-icon');

resumeIcon.addEventListener('dblclick', () => {
    window.open('assets/docs/resume.pdf');
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