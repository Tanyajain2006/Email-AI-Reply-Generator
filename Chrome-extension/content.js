    // console.log("Email Writer Extension - Content Script Loaded")

    // function createAIButton() {
    //     const button = document.createElement('div');
    //     button.className = 'T-J J-J5 Ji ao0 v7 T-I-atl L3';
    //     button.style.marginRight = '8px';
    //     button.innerHTML = 'AI Reply';
    //     button.setAttribute('role', 'button');
    //     button.setAttribute('data-tooltip', 'Generate AI Reply');
    //     return button;
    // }

    // function findComposeToolbar() {
    //     const selectors = [
    //         '.btC',
    //         '.aDh',
    //         '[role="dialog"].In',
    //         'gU.Up'
    //     ];

    //     for (const selector of selectors) {
    //         const toolbar = document.querySelector(selector);
    //         if (toolbar) {
    //             console.log("Toolbar found with selector:", selector);
    //             return toolbar;
    //         }
    //         else {
    //             console.log("Toolbar not found after checking all selectors.");
    //             return null;
    //         }
    //     }
    // }

    // function getEmailContent() {
    //     const selectors = [
    //         '.h7',
    //         '.a3s.aiL',
    //         '.gmail_quote',
    //         '.gs .aXjCH',
    //         '[role="presentation"]'
    //     ];

    //     for (const selector of selectors) {
    //         const content = document.querySelector(selector);
    //         if (content) {
    //             return content.innerText.trim();
    //         }
    //         else {
    //             return '';
    //         }
    //     }

    // }

    // function injectButton() {
    //     const existingButton = document.querySelector('.ai-reply-button');
    //     if (existingButton) existingButton.remove();

    //     const toolbar = findComposeToolbar();
    //     if (!toolbar) {
    //         console.log("Toolbar not found");
    //         return;
    //     }

    //     console.log("Toolbar found, creating AI button");

    //     const button = createAIButton();
    //     button.classList.add('ai-reply-button');

    //     button.addEventListener('click', async () => {
    //         try {
    //             button.innerHTML = 'Generating...';
    //             button.disabled = true;

    //             const emailContent = getEmailContent();
    //             const response = await fetch('http://localhost:8080/api/email/generate', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     emailContent: emailContent,
    //                     tone: "professional"
    //                 })
    //             });

    //             if (!response.ok) {
    //                 throw new Error('API request failed');
    //             }

    //             const generatedReply = await response.text();
    //             const composeBox = document.querySelector('[aria-label="Message Body"][role="textbox"] [g_editable="true"]');

    //             if (composeBox) {
    //                 composeBox.focus();
    //                 document.execCommand('insertText', false, generatedReply);
    //             } else {
    //                 console.log("Compose box was not found");
    //             }
    //         } catch (error) {
    //             console.error("Error during AI reply generation:", error);
    //             alert("Failed to generate AI reply. Please try again.");
    //         } finally {
    //             button.innerHTML = 'AI Reply';
    //             button.disabled = false;
    //         }
    //     });

    //     toolbar.insertBefore(button, toolbar.firstChild);
    // }

    // const observer = new MutationObserver((mutations) => {
    //     for (const mutation of mutations) {
    //         const addedNodes = Array.from(mutation.addedNodes);

    //         const hasComposeElements = addedNodes.some(node =>
    //             node.nodeType === Node.ELEMENT_NODE &&
    //             (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
    //         );

    //         if (hasComposeElements) {
    //             console.log("Compose Window Detected");
    //             setTimeout(injectButton, 500);
    //         }
    //     }
    // });

    // observer.observe(document.body, {
    //     childList: true,
    //     subtree: true
    // });

    console.log("Email Writer Extension - Content Script Loaded");

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-J J-J5 Ji ao0 v7 T-I-atl L3'; // Using Gmail's classes
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function findComposeToolbar() {
    const selectors = [
        '.btC',  // Toolbar in a reply/forward
        '.aDh',  // Toolbar in a new compose window
        '.gU.Up', // Another possible toolbar container
        '[role="dialog"] .In' // Toolbar within the dialog popup
    ];

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        // If we find one, return it immediately
        if (toolbar) {
            console.log("Toolbar found with selector:", selector);
            return toolbar;
        }
    }
    
    // **FIX: Only return null AFTER checking all selectors**
    console.log("Toolbar not found after checking all selectors.");
    return null;
}

function getEmailContent() {
    const selectors = [
        '.a3s.aiL',         // Main email content
        '.gmail_quote',     // Quoted text in a reply
        '.gs .aXjCH'        // Another common content wrapper
    ];

    let fullContent = '';

    // **FIX: Loop through all selectors and use querySelectorAll**
    for (const selector of selectors) {
        // Find ALL elements matching the selector, not just the first
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(el => {
            if (el && el.innerText) {
                // Add the text and a newline
                fullContent += el.innerText.trim() + "\n\n";
            }
        });
    }

    // **FIX: Only return AFTER checking all selectors**
    if (fullContent) {
        console.log("Found email content:", fullContent.trim());
        return fullContent.trim();
    }

    console.log("No email content found after checking all selectors.");
    return ''; // Return empty string if nothing was found
}

function injectButton() {
    // Check if our button already exists
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found, skipping injection.");
        return;
    }

    console.log("Toolbar found, creating AI button");

    const button = createAIButton();
    button.classList.add('ai-reply-button'); // Add a unique class

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();

            // **FIX: Add a check for empty content to prevent 500 error**
            if (!emailContent) {
                alert("Could not find any email content to reply to.");
                throw new Error("Empty email content, aborting API call.");
            }

            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                // Get more error info from the server if possible
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const generatedReply = await response.text();
            
            // **FIX: Use the simple, reliable selector for the compose box**
            const composeBox = document.querySelector('[aria-label="Message Body"]');

            if (composeBox) {
                composeBox.focus();
                // Insert text at the current cursor position
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.log("Compose box was not found");
                alert("Could not find the compose box to insert text.");
            }
        } catch (error) {
            console.error("Error during AI reply generation:", error);
            // Don't show an alert if we're the one who aborted the call
            if (error.message !== "Empty email content, aborting API call.") {
                 alert("Failed to generate AI reply. Check the console for details.");
            }
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    // Prepend the button to the toolbar
    toolbar.insertBefore(button, toolbar.firstChild);
}

// This observer code looks good.
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);

        // Check if any added nodes match our criteria
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements) {
            console.log("Compose Window Detected");
            // Use a short delay to ensure the DOM is fully ready
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});