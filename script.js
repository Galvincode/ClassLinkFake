// --- Element variables (will be assigned when DOM is ready) ---
    let overlay, modal, modalTitle, messageEl, frameEl, closeBtn;

    // --- Modal & UI Functions ---
    
    /**
     * Shows a simple message in the modal (replaces alert())
     */
    function showMessage(title, message) {
      if (modalTitle) modalTitle.textContent = title;
      if (messageEl) messageEl.innerHTML = message; // Use innerHTML to allow <br> and <b> tags
      
      if (messageEl) messageEl.style.display = 'block';
      if (frameEl) frameEl.style.display = 'none';
      if (frameEl) frameEl.src = 'about:blank'; // Stop any loading
      
      if (overlay) overlay.style.display = 'flex'; // Show the modal
    }

    /**
     * Shows an iframe portal in the modal (replaces window.open())
     */
    function showPortal(title, url) {
      if (modalTitle) modalTitle.textContent = title;
      if (frameEl) frameEl.src = url;

      if (frameEl) frameEl.style.display = 'block';
      if (messageEl) messageEl.style.display = 'none';
      
      if (overlay) overlay.style.display = 'flex'; // Show the modal
    }

    /**
     * Hides the modal and resets it
     */
    function closeModal() {
      if (overlay) overlay.style.display = 'none';
      if (frameEl) frameEl.src = 'about:blank'; // Stop video/audio/loading
      if (messageEl) messageEl.innerHTML = '';
      if (modalTitle) modalTitle.textContent = '';
    }

    // --- Classroom Data ---
    const classrooms = {
      "pizza": {
        type: "portal",
        title: "Pizza Hub",
        content: "https://the-pizza-editiongames.github.io/#google_vignette"
      },
      "help": {
        type: "message",
        title: "Help",
        content: "You can do the following things:<br><br>1. Type <b>poki</b> to open Poki.<br>2. Type <b>pizza</b> to open the Pizza game hub.<br> 3. Type <b>sz</b> to open SZ games <br> 4. Type <b>minecraft</b> to open a minecraft clone<br> 5. You can also type <b>cloudmoom</b> to open CloudMoon.<br> 6. You can also type <b>a-z</b> to open A-Z games <br >7. Type <b>stick man</b> to open a special version of Stick Man Hook"
      },
      "poki": {
        type: "message",
        title: "Open Poki",
        
        content: "Poki's website cannot be loaded inside a portal.<br><br>" + 
                 "You can open it in a new tab by clicking the link below:<br><br>" +
                 // Added Tailwind classes to this link
                 "<a href='https://poki.com/' target='_blank' rel='noopener noreferrer' class='portal-link'>Open Poki in New Tab</a>"
        
      },
      "test": {
        type: "message",
        title: "Test",
        content: "It works!"
      },
      "minecraft": {
        type: "portal",
        title: "Minecraft",
        content: "https://minecraft.kelvinzhang.ca/"
      },
      "sz": {
        type: "portal",
        title:"SZ Games",
        content:"https://sz-games.github.io/#google_vignette"
      },
      "cloudmoon": {
        type:"portal",
        title: "CloudMoon",
        content: "https://web.cloudmoonapp.com/"
      },
      "a-z": {
        type: "portal",
        title: "A-Z Games",
        content: "https://azgames.io/"
      },
      "poker": {
        type: "portal",
        title: "Fake Poker",
        content: "https://www.247freepoker.com/"
      },
      "stick man": {
        type: "portal",
        title: "Stick Man Hook",
        content: "https://play.famobi.com/wrapper/neon-swing/A1000-10"
      },
      "html5": {
        type:"portal",
        title:"HTML 5 Games",
        content:"https://html5games.com/"
      },
      "chat": {
        type:"portal",
        title:"Chat Room",
        content:"https://galvin-games-coder-2.github.io/Chatroom/"
      }
    };

    /**
     * Original function to check for a class code
     */
    function checkValue() {
      // This is safe to call anytime, as it finds the element on-demand
      let value = document.getElementById("text").value;
      const cleanedValue = value.toLowerCase().trim();
      
      const entry = classrooms[cleanedValue]; // Try to find the code in our database

      if (entry) {
        // We found a matching code!
        if (entry.type === "portal") {
          showPortal(entry.title, entry.content);
        } else if (entry.type === "message") {
          showMessage(entry.title, entry.content);
        }
      } else {
        // No matching code was found
        showMessage("Error", "Invalid class code. (Try 'help'!)");
      }
    }


    // --- === INITIALIZATION === ---
    // Wait for the DOM to be fully loaded before finding elements and attaching listeners
    document.addEventListener("DOMContentLoaded", function() {
      // --- Assign elements to variables ---
      overlay = document.getElementById('portal-overlay');
      modal = document.getElementById('portal-modal');
      modalTitle = document.getElementById('portal-title');
      messageEl = document.getElementById('portal-message');
      frameEl = document.getElementById('portal-frame');
      closeBtn = document.getElementById('portal-close-btn');
      
      // --- Attach modal close listeners ---
      if (closeBtn) {
        closeBtn.onclick = closeModal;
      }
      if (overlay) {
        overlay.onclick = function(event) {
          if (event.target == overlay) {
            closeModal();
          }
        }
      }

      // --- Attach 'Enter' key listener ---
      const textInput = document.getElementById("text");
      if (textInput) {
        textInput.addEventListener('keypress', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault(); // Stop default form submission
            checkValue();
          }
        });
      }
      
      // --- Attach Find Class button listener ---
      const findClassBtn = document.getElementById('find-class-btn');
      if (findClassBtn) {
        findClassBtn.onclick = checkValue;
      }
    });
