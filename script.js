const files = {
    'index.html': '<h1>Bienvenue sur NexusCode</h1>\n<p>Ceci est un rendu en direct.</p>\n<button id="btn">Clique moi</button>',
    'style.css': 'body { font-family: sans-serif; text-align: center; padding-top: 50px; }\nh1 { color: #8b5cf6; }\nbutton { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }',
    'main.js': 'document.getElementById("btn").onclick = () => {\n  alert("Le JavaScript fonctionne !");\n};'
};

let currentFile = 'index.html';
const editor = document.getElementById('editor');

window.onload = () => {
    editor.value = files[currentFile];
    addMessage("🤖 **Nexus :** Studio prêt. Cliquez sur 'Voir le Rendu' pour tester votre code.");
};

function switchFile(filename, element) {
    files[currentFile] = editor.value;
    currentFile = filename;
    editor.value = files[currentFile];
    document.getElementById('current-filename').innerText = filename;
    document.querySelectorAll('.file-item').forEach(item => item.classList.remove('file-active'));
    element.classList.add('file-active');
}

function openPreview() {
    files[currentFile] = editor.value; // Sync
    const modal = document.getElementById('preview-modal');
    const frame = document.getElementById('preview-frame');
    
    // Construction du document final
    const finalHTML = `
        <html>
            <head><style>${files['style.css']}</style></head>
            <body>
                ${files['index.html']}
                <script>${files['main.js']}<\/script>
            </body>
        </html>
    `;
    
    const blob = new Blob([finalHTML], {type: 'text/html'});
    frame.src = URL.createObjectURL(blob);
    modal.style.display = 'flex';
}

function closePreview() {
    document.getElementById('preview-modal').style.display = 'none';
}

function addMessage(text) {
    const chatBox = document.getElementById('ia-chat-box');
    const div = document.createElement('div');
    div.innerHTML = `<div style="background: #0d0d12; border: 1px solid #23232f; border-radius: 8px; padding: 10px; margin-bottom: 10px;">${text}</div>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function downloadProject() {
    const blob = new Blob([editor.value], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = currentFile;
    a.click();
}
