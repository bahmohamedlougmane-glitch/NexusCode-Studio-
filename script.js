// Données initiales du studio
const files = {
    'index.html': '<!DOCTYPE html>\n<html>\n<head>\n  <title>Nexus App</title>\n</head>\n<body>\n  <h1>NexusCode Studio</h1>\n  <p>Modifiez le code et cliquez sur Voir le Rendu.</p>\n  <button id="monBouton">Tester JS</button>\n</body>\n</html>',
    'style.css': 'body {\n  font-family: system-ui;\n  text-align: center;\n  padding-top: 100px;\n  background: #f0f4f8;\n}\nh1 {\n  color: #2563eb;\n}\nbutton {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n}',
    'main.js': 'document.getElementById("monBouton").onclick = () => {\n  alert("Le JavaScript de Nexus fonctionne !");\n};'
};

let currentFile = 'index.html';
const editor = document.getElementById('editor');

// Chargement initial
window.onload = () => {
    editor.value = files[currentFile];
};

// Navigation entre les fichiers
function switchFile(filename, element) {
    // Sauvegarde auto du fichier quitté
    files[currentFile] = editor.value;
    
    // Changement vers le nouveau
    currentFile = filename;
    editor.value = files[currentFile];
    document.getElementById('current-filename').innerText = filename;
    
    // UI : Mise à jour de l'explorateur
    document.querySelectorAll('.file-item').forEach(item => item.classList.remove('file-active'));
    element.classList.add('file-active');
    
    addMessage(`📁 Fichier <b>${filename}</b> chargé.`);
}

// Système d'aperçu (Pop-up)
function openPreview() {
    files[currentFile] = editor.value; // Sync le contenu actuel
    const modal = document.getElementById('preview-modal');
    const frame = document.getElementById('preview-frame');
    
    // Assemblage final du code pour l'iframe
    const finalRender = `
        <html>
            <head>
                <meta charset="UTF-8">
                <style>${files['style.css']}</style>
            </head>
            <body>
                ${files['index.html']}
                <script>${files['main.js']}<\/script>
            </body>
        </html>
    `;
    
    const blob = new Blob([finalRender], {type: 'text/html'});
    frame.src = URL.createObjectURL(blob);
    modal.style.display = 'flex';
    addMessage("👁️ Génération du rendu réussie.");
}

function closePreview() {
    document.getElementById('preview-modal').style.display = 'none';
}

// Assistant IA
function addMessage(text) {
    const chatBox = document.getElementById('ia-chat-box');
    const div = document.createElement('div');
    div.className = "bg-[#0d0d12] border border-white/5 p-3 rounded-lg text-slate-300";
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('user-input');
    if(input.value.trim()) {
        addMessage(`<b>Toi :</b> ${input.value}`);
        const userText = input.value.toLowerCase();
        input.value = "";
        
        setTimeout(() => {
            let reply = "Je peux vous aider à optimiser votre " + currentFile;
            if(userText.includes("aide")) reply = "Utilisez les onglets à gauche pour naviguer et le bouton bleu pour voir votre site.";
            addMessage(`🤖 <b>Nexus :</b> ${reply}`);
        }, 600);
    }
}

// Exportation
function downloadProject() {
    files[currentFile] = editor.value;
    const blob = new Blob([editor.value], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = currentFile;
    a.click();
}
