const fs = require('fs');

try {
    const appCode = fs.readFileSync('app.js', 'utf8');

    const searchFn = '    function renderTransDrill(theme) {';
    const startIndex = appCode.indexOf(searchFn);
    if (startIndex === -1) {
        console.log('Not found');
        process.exit(1);
    }

    let braceCount = 0;
    let endIndex = -1;
    let started = false;

    // Scan for matching brace
    for (let i = startIndex; i < appCode.length; i++) {
        const char = appCode[i];
        if (char === '{') {
            braceCount++;
            started = true;
        } else if (char === '}') {
            braceCount--;
            if (started && braceCount === 0) {
                endIndex = i + 1;
                break;
            }
        }
    }

    if (endIndex === -1) {
        console.log('Could not parse function body');
        process.exit(1);
    }

    let fnCode = appCode.substring(startIndex, endIndex);

    // Replace the WRITEPASS_CONFIG.gradeId fallback
    fnCode = fnCode.replace(/gradeId: \(typeof.*?\|\| 'grade_pre2plus'/g, "gradeId: typeof WRITEPASS_CONFIG !== 'undefined' ? (WRITEPASS_CONFIG.gradeId || 'grade_pre2plus') : 'grade_pre2plus'");

    let targetCode = fs.readFileSync('app-grade3-email.js', 'utf8');

    // First remove any existing broken renderTransDrill to avoid duplicates
    // Using regex to remove from 'function renderTransDrill' to 'function renderStep3' or end of file
    targetCode = targetCode.replace(/\s*function renderTransDrill[\s\S]*?(?=\s*\/\/ ===== STEP 3)/, '');

    // Note: My previous powershell script might have already destroyed the syntax around line 1064, so let's verify if `targetCode` has SyntaxError.
} catch (e) {
    console.error(e);
}
