const fs = require('fs');
const appjs = fs.readFileSync('app.js', 'utf8');

const startTransDrill = appjs.indexOf('    function renderTransDrill(theme) {');
const endTransDrill = appjs.indexOf('    // ===== STEP 3: 本番力 =====');
let transDrillCode = appjs.substring(startTransDrill, endTransDrill);

transDrillCode = transDrillCode.replace(/gradeId: \(typeof.*?\|\| 'grade_pre2plus'/g, 
    "gradeId: typeof WRITEPASS_CONFIG !== 'undefined' ? (WRITEPASS_CONFIG.gradeId || 'grade_pre2plus') : 'grade_pre2plus'");

let emailjs = fs.readFileSync('app-grade3-email.js', 'utf8');
const lines = emailjs.split('\n');
const idx = lines.findIndex(l => l.trim() === '})();');

if (idx !== -1) {
    let cleanEmail = lines.slice(0, idx).join('\n');
    
    const duplicateIdx = cleanEmail.indexOf('    function renderTransDrill');
    if(duplicateIdx !== -1) {
        cleanEmail = cleanEmail.substring(0, duplicateIdx);
    }
    
    cleanEmail += '\n' + transDrillCode + '\n})();\n';
    
    fs.writeFileSync('app-grade3-email.js', cleanEmail, 'utf8');
    console.log('Appended successfully');
} else {
    console.log('Could not find })();');
}
