// Base de données des fichiers du Studio
const files = {
    'main.js': '// JavaScript\nconsole.log("NexusCode Online");',
    'script.py': '# Python Mode\ndef nexus():\n    print("Hello from Python")\n\nnexus()',
    'style.css': '/* Styles */\nbody {\n  background: #0d0d12;\n}',
    'index.html': '\n<h1>Nexus Studio</h1>'
};

let currentFile = 'main.js';
const editor = document.getElementById('editor');

// Initialisation au chargement
window.onload = () => {
    editor.value = files[currentFile];
    addMessage("🤖 **Système :** Bienvenue dans votre Studio Pro. Tout est prêt.");
};

// Navigation entre les fichiers
function switchFile(filename, element) {
    files[currentFile] = editor.value; // Sauvegarder le fichier actuel
    currentFile = filename;
    editor.value = files[currentFile];
    document.getElementById('current-filename').innerText = filename;
    
    document.querySelectorAll('.file-item').forEach(item => item.classList.remove('file-active'));
    element.classList.add('file-active');
    addMessage(`📁 Ouverture de <b>${filename}</b>`);
}

// Actions de l'IA
function askIA(action) {
    const responses = {
        'expliquer': `🔬 Analyse de <b>${currentFile}</b> : Votre structure est propre et optimisée.`,
        'deboguer': `✅ Debug : Aucune erreur détectée dans <b>${currentFile}</b>.`
    };
    addMessage(responses[action]);
}

function addMessage(text) {
    const chatBox = document.getElementById('ia-chat-box');
    const div = document.createElement('div');
    div.className = 'chat-bubble';
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('user-input');
    if(input.value.trim()) {
        addMessage(`💬 <b>Toi :</b> ${input.value}`);
        input.value = "";
        setTimeout(() => addMessage("🤖 **Nexus :** Je traite votre demande..."), 500);
    }
}

function downloadProject() {
    const element = document.createElement('a');
    const file = new Blob([editor.value], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = currentFile;
    document.body.appendChild(element);
    element.click();
}

function runCode() {
    alert("Exécution de " + currentFile + " en cours...");
}
