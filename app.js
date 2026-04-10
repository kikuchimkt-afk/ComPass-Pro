// ComPass Pro — App Logic
(function () {
    'use strict';

    // ===== CONFIG =====
    // Google Apps Script デプロイURL
    const GAS_URL = localStorage.getItem('writepass-gas-url') || 'https://script.google.com/macros/s/AKfycbxRyQIL6e1Tdg3aVWg10BoY5KGafKm1SYci8Voouxg9GEn7wnOGT0NUgxNr0sBUjXY0Tw/exec';

    // 語数・タイマー設定（WRITEPASS_CONFIGがあればそちらを使用）
    const WP_MIN_WORDS = (typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.minWords) || 25;
    const WP_MAX_WORDS = (typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.maxWords) || 35;
    const WP_TIMER_SEC = ((typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.timerMinutes) || 15) * 60;
    const isOpinion = (typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.taskType === 'Opinion');

    // ===== STATE =====
    let currentStep = 1;
    let currentThemeId = 1;
    let step1Answers = {};
    let step1Checked = false;
    let step2ChunkIndex = 0;
    let step2ChunkAnswers = [];
    let transDrillIndex = 0;
    let transDrillScores = [];
    let transDrillChecked = false;
    let timerInterval = null;
    let timerSeconds = WP_TIMER_SEC;
    let timerRunning = false;
    let showJa = false;
    let isGrading = false;

    // ===== HELPERS =====
    function getTheme() {
        return THEMES.find(t => t.id === currentThemeId);
    }

    function countWords(text) {
        return text.trim().split(/\s+/).filter(w => w.length > 0).length;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function $(id) { return document.getElementById(id); }

    // ===== THEME TOGGLE =====
    function initThemeToggle() {
        const btn = $('themeToggle');
        const saved = localStorage.getItem('writepass-theme');
        if (saved === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            btn.querySelector('.material-symbols-rounded').textContent = 'light_mode';
        }
        btn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                btn.querySelector('.material-symbols-rounded').textContent = 'dark_mode';
                localStorage.setItem('writepass-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                btn.querySelector('.material-symbols-rounded').textContent = 'light_mode';
                localStorage.setItem('writepass-theme', 'light');
            }
        });
    }

    // ===== STEP NAV =====
    function initStepNav() {
        const nav = $('stepNav');
        nav.querySelectorAll('.step-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentStep = parseInt(btn.dataset.step);
                nav.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.step-pane').forEach(p => p.classList.remove('active'));
                $('step' + currentStep).classList.add('active');
                renderCurrentStep();
            });
        });
    }

    // ===== THEME SELECTOR =====
    function renderThemeSelector() {
        const container = $('themeSelector');
        const pastExams = THEMES.filter(t => t.exam !== '類題' && t.exam !== 'オリジナル').sort((a, b) => a.exam.localeCompare(b.exam));
        const practiceExams = THEMES.filter(t => t.exam === '類題' || t.exam === 'オリジナル');

        const renderOptions = (themes) => themes.map(t =>
            `<option value="${t.id}"${t.id === currentThemeId ? ' selected' : ''}>${t.title}　${t.exam}</option>`
        ).join('');

        container.innerHTML = `
            <div class="theme-select-row">
                <select class="theme-select" id="themeSelect">
                    <optgroup label="📋 過去問（${pastExams.length}問）">
                        ${renderOptions(pastExams)}
                    </optgroup>
                    <optgroup label="✏️ オリジナル類題（${practiceExams.length}問）">
                        ${renderOptions(practiceExams)}
                    </optgroup>
                </select>
                <button class="print-btn" id="printBtn" title="問題用紙を印刷">
                    <span class="material-symbols-rounded">print</span>
                </button>
            </div>
        `;

        $('themeSelect').addEventListener('change', (e) => {
            currentThemeId = parseInt(e.target.value);
            resetAllSteps();
            renderCurrentStep();
        });

        $('printBtn').addEventListener('click', () => printWorksheet());
    }

    // ===== PRINT WORKSHEET =====
    function printWorksheet() {
        const theme = getTheme();
        const cfg = typeof WRITEPASS_CONFIG !== 'undefined' ? WRITEPASS_CONFIG : {};
        const gradeLabel = cfg.gradeLabel || '準2級プラス';
        const taskLabel = cfg.taskLabel || '英文要約';
        const minWords = cfg.minWords || 45;
        const maxWords = cfg.maxWords || 55;
        const wordsPerRow = 10;
        const totalRows = Math.ceil(maxWords * 1.3 / wordsPerRow);

        // 解答欄の行を生成（1行10語、5語目太線、右端に10ごとカウント）
        const answerRows = [];
        for (let row = 0; row < totalRows; row++) {
            const rowNum = (row + 1) * wordsPerRow;
            const cells = [];
            for (let col = 1; col <= wordsPerRow; col++) {
                const isBold = col === 5 || col === 10;
                cells.push(`<span class="word-cell${isBold ? ' bold' : ''}"></span>`);
            }
            answerRows.push(`<div class="word-row">${cells.join('')}<span class="row-count">${rowNum}</span></div>`);
        }

        // QR code URL
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const qrUrl = `https://com-pass-pro.vercel.app/${currentPage}?theme=${currentThemeId}`;

        const printHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>${gradeLabel} ${taskLabel} — ${theme.title}</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
<style>
${getPrintStyles(minWords, maxWords)}
</style>
</head>
<body>

<!-- ===== PAGE 1: 問題 ===== -->
<div class="page">
    <div class="header">
        <span class="header-title">英語資格検定${gradeLabel} ${taskLabel}</span>
        <span class="header-meta">${theme.title}${theme.exam !== 'オリジナル' ? '（' + theme.exam + '）' : ''}</span>
    </div>

    <div class="qr-section">
        <div class="qr-container" id="qrCode" data-url="${qrUrl}"></div>
        <div class="qr-text">📱 QRコードをスマホ・タブレットで読み取って学習しましょう<br><strong>ComPass Pro</strong> でStep 1〜3の練習ができます</div>
    </div>

    ${isOpinion ? `
    <div class="instructions">
        <p>Read the question below and write your opinion in English.</p>
        <p>Your answer should include two reasons to support your opinion.</p>
        <p>Suggested length: ${minWords}–${maxWords} words</p>
        <p>Write your answer in the space provided on the answer sheet. <span class="underline">Any writing outside the space will not be graded.</span></p>
    </div>

    <div class="passage-label">Question</div>
    <div class="passage" style="font-size:12pt; line-height:2; padding: 14px 18px; border: 2px solid #000; text-indent: 0;">
        <p style="text-indent:0; font-weight: bold;">${theme.question}</p>
    </div>
    ` : `
    <div class="instructions">
        <p>Read the article below and summarize it in your own words as far as possible in English.</p>
        <p>Suggested length: ${minWords}–${maxWords} words</p>
        <p>Write your summary in the space provided on the answer sheet. <span class="underline">Any writing outside the space will not be graded.</span></p>
    </div>

    <div class="passage-label">Article</div>
    <div class="passage">
        <p>${theme.passage.intro}</p>
        <p>${theme.passage.merit}</p>
        <p>${theme.passage.demerit}</p>
    </div>
    `}

    <div class="footer">© ECCベストワン藍住：北島中央</div>
</div>

<!-- ===== PAGE 2: 解答用紙 ===== -->
<div class="page">
    <div class="header">
        <span class="header-title">Answer Sheet — 解答用紙</span>
        <span class="header-meta">英語資格検定${gradeLabel} ${taskLabel}</span>
    </div>

    <div class="name-row">
        Name: <span class="name-field"></span>
    </div>

    <div class="answer-subtitle">${isOpinion ? 'Opinion' : 'Summary'}（目安: ${minWords}〜${maxWords}語）</div>

    <div class="answer-grid">
        ${answerRows.join('\n        ')}
    </div>

    <div class="word-count-guide">
        <span class="target-range">目安語数: ${minWords}–${maxWords} words</span>
    </div>

    <div class="footer">© ECCベストワン藍住：北島中央</div>
</div>

</body>
</html>`;

        openPrintWindow(printHtml);
    }

    // ===== 印刷用共通スタイル =====
    function getPrintStyles(minWords, maxWords) {
        return `
@page { size: A4; margin: 18mm 15mm 15mm 15mm; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Times New Roman', 'Noto Serif JP', serif; font-size: 11pt; line-height: 1.6; color: #000; }

.page { page-break-after: always; min-height: 247mm; position: relative; }
.page:last-child { page-break-after: auto; }

.header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 2px solid #000; padding-bottom: 6px; margin-bottom: 12px; }
.header-title { font-size: 14pt; font-weight: bold; }
.header-meta { font-size: 9pt; color: #444; }

.instructions { margin-bottom: 14px; padding: 10px 14px; border: 1px solid #000; background: #f9f9f9; }
.instructions p { margin-bottom: 4px; font-size: 10pt; }
.instructions p::before { content: "● "; font-weight: bold; }
.instructions .underline { text-decoration: underline; }

.passage-label { font-size: 10pt; font-weight: bold; margin-bottom: 6px; border-left: 4px solid #000; padding-left: 8px; }
.passage { font-size: 10.5pt; line-height: 1.75; text-align: justify; }

/* QR code */
.qr-section { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px 12px; border: 1px solid #ccc; background: #fafafa; }
.qr-container { flex-shrink: 0; width: 80px; height: 80px; }
.qr-container canvas, .qr-container img { width: 80px !important; height: 80px !important; }
.qr-text { font-size: 9pt; line-height: 1.5; color: #333; }
.passage p { text-indent: 1.5em; margin-bottom: 8px; }

.footer { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; font-size: 8pt; color: #888; }

/* ===== ANSWER SHEET ===== */
.name-row { display: flex; justify-content: center; margin-bottom: 10px; font-size: 11pt; font-weight: bold; }
.name-field { border-bottom: 1px solid #000; width: 200px; margin-left: 8px; }
.answer-subtitle { font-size: 10pt; text-align: center; color: #333; margin-bottom: 12px; }

.answer-grid { padding: 4px 0; }
.word-row { display: flex; align-items: flex-end; margin-bottom: 20px; }
.word-cell { flex: 1; height: 0; border-bottom: 1px solid #999; margin: 0 2px; }
.word-cell.bold { border-bottom: 2.5px solid #000; }
.row-count { width: 30px; text-align: right; font-size: 9pt; font-weight: bold; color: #333; padding-left: 6px; flex-shrink: 0; }

.word-count-guide { margin-top: 10px; font-size: 9pt; color: #555; text-align: right; }
.target-range { display: inline-block; padding: 4px 12px; border: 2px solid #000; font-size: 10pt; font-weight: bold; }

/* ===== GRADE RESULT PRINT ===== */
.grade-section { margin-bottom: 14px; }
.grade-total { text-align: center; margin-bottom: 10px; }
.grade-total .score { font-size: 32pt; font-weight: bold; }
.grade-total .max { font-size: 14pt; color: #666; }
.grade-total .label { font-size: 12pt; margin-top: 2px; }
.grade-total .comment { font-size: 9pt; color: #555; margin-top: 4px; max-width: 500px; margin-left: auto; margin-right: auto; }

.student-answer-box { margin-bottom: 14px; padding: 10px 14px; border: 1px solid #333; background: #fafafa; }
.student-answer-box .sa-label { font-size: 9pt; font-weight: bold; margin-bottom: 4px; }
.student-answer-box .sa-text { font-size: 10pt; line-height: 1.7; }
.student-answer-box .sa-count { font-size: 8pt; color: #666; margin-top: 4px; text-align: right; }

.cat-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
.cat-table th, .cat-table td { border: 1px solid #333; padding: 6px 10px; text-align: left; font-size: 10pt; vertical-align: top; }
.cat-table th { background: #eee; font-weight: bold; }
.cat-table .cat-score { text-align: center; font-weight: bold; font-size: 12pt; width: 60px; }
.cat-table .bar-cell { width: 70px; }
.bar-visual { height: 14px; background: #e0e0e0; position: relative; }
.bar-fill { height: 100%; background: #333; }

.improved-box { padding: 10px 14px; border: 2px solid #333; background: #f5f5f5; }
.improved-box .imp-label { font-size: 9pt; font-weight: bold; margin-bottom: 4px; }
.improved-box .imp-text { font-size: 10pt; line-height: 1.7; }
.improved-box .imp-count { font-size: 8pt; color: #666; margin-top: 4px; text-align: right; }

.errors-section { margin-top: 14px; }
.errors-title { font-size: 10pt; font-weight: bold; margin-bottom: 6px; }
.errors-table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
.errors-table th, .errors-table td { border: 1px solid #333; padding: 4px 8px; text-align: left; font-size: 9pt; vertical-align: top; }
.errors-table th { background: #eee; font-weight: bold; font-size: 8pt; }
.errors-table .err-type { width: 45px; text-align: center; font-weight: bold; font-size: 8pt; }
.errors-table .err-original { color: #c00; text-decoration: line-through; }
.errors-table .err-arrow { text-align: center; width: 20px; }
.errors-table .err-corrected { color: #060; font-weight: bold; }
.errors-table .err-explanation { font-size: 8pt; color: #555; }

@media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}`;
    }

    // ===== 印刷ウィンドウを開く =====
    function openPrintWindow(html) {
        const printWin = window.open('', '_blank');
        printWin.document.write(html);
        printWin.document.close();
        printWin.onload = () => {
            // Generate QR codes if qrcodejs is loaded
            try {
                const qrContainers = printWin.document.querySelectorAll('.qr-container[data-url]');
                qrContainers.forEach(container => {
                    new printWin.QRCode(container, {
                        text: container.dataset.url,
                        width: 80,
                        height: 80,
                        colorDark: '#1a1a1a',
                        colorLight: '#ffffff',
                        correctLevel: printWin.QRCode.CorrectLevel.M
                    });
                });
            } catch (e) {
                console.error('QR generation error:', e);
            }
            setTimeout(() => printWin.print(), 500);
        };
    }

    // ===== AI採点結果を印刷 =====
    let lastGradeData = {}; // prefix -> { result, studentAnswer }

    function printGradeResult(prefix) {
        const data = lastGradeData[prefix];
        if (!data) return;
        const { result, studentAnswer } = data;
        const theme = getTheme();
        const cfg = typeof WRITEPASS_CONFIG !== 'undefined' ? WRITEPASS_CONFIG : {};
        const gradeLabel = cfg.gradeLabel || '準2級プラス';
        const taskLabel = cfg.taskLabel || '英文要約';
        const minWords = cfg.minWords || 45;
        const maxWords = cfg.maxWords || 55;
        const maxTotal = result.categories.reduce((sum, c) => sum + c.maxScore, 0);
        const pct = Math.round(result.totalScore / maxTotal * 100);

        const catRows = result.categories.map(cat => {
            const barPct = Math.round(cat.score / cat.maxScore * 100);
            return `<tr>
                <td>${cat.name}</td>
                <td class="cat-score">${cat.score} / ${cat.maxScore}</td>
                <td class="bar-cell"><div class="bar-visual"><div class="bar-fill" style="width:${barPct}%"></div></div></td>
                <td>${cat.comment}</td>
            </tr>`;
        }).join('');

        const printHtml = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>採点結果 — ${theme.title}</title>
<style>
${getPrintStyles(minWords, maxWords)}
</style>
</head>
<body>

<div class="page">
    <div class="header">
        <span class="header-title">AI採点レポート</span>
        <span class="header-meta">英語資格検定${gradeLabel} ${taskLabel} / ${theme.title}</span>
    </div>

    <div class="grade-total">
        <div class="score">${result.totalScore}<span class="max"> / ${maxTotal}</span></div>
        <div class="label">${pct >= 80 ? '🌟 素晴らしい！' : pct >= 60 ? '👍 良い！' : pct >= 40 ? '📝 もう少し！' : '💪 がんばろう！'}</div>
        <div class="comment">${result.overallComment}</div>
    </div>

    <div class="student-answer-box">
        <div class="sa-label">▼ 受験者の解答</div>
        <div class="sa-text">${studentAnswer}</div>
        <div class="sa-count">語数: ${countWords(studentAnswer)}語</div>
    </div>

    <table class="cat-table">
        <thead>
            <tr><th>観点</th><th>スコア</th><th>達成度</th><th>講評</th></tr>
        </thead>
        <tbody>
            ${catRows}
        </tbody>
    </table>

    ${result.improvedVersion ? `
    <div class="improved-box">
        <div class="imp-label">💡 改善例</div>
        <div class="imp-text">${result.improvedVersion}</div>
        <div class="imp-count">語数: ${countWords(result.improvedVersion)}語</div>
    </div>` : ''}

    ${result.errors && result.errors.length > 0 ? `
    <div class="errors-section">
        <div class="errors-title">✏️ 添削 (${result.errors.length}件)</div>
        <table class="errors-table">
            <thead>
                <tr><th>種類</th><th>原文</th><th></th><th>修正</th><th>説明</th></tr>
            </thead>
            <tbody>
                ${result.errors.map(err => {
            const typeLabels = { spelling: 'スペル', grammar: '文法', vocabulary: '語法', punctuation: '句読点' };
            return `<tr>
                    <td class="err-type">${typeLabels[err.type] || err.type}</td>
                    <td class="err-original">${err.original}</td>
                    <td class="err-arrow">→</td>
                    <td class="err-corrected">${err.corrected}</td>
                    <td class="err-explanation">${err.explanation}</td>
                </tr>`;
        }).join('')}
            </tbody>
        </table>
    </div>` : (result.errors ? `
    <div class="errors-section">
        <div class="errors-title">✅ 添削：ミスはありません</div>
    </div>` : '')}

    <div class="footer">© ECCベストワン藍住：北島中央</div>
</div>

</body>
</html>`;

        openPrintWindow(printHtml);
    }

    function resetAllSteps() {
        step1Answers = {};
        step1Checked = false;
        step2ChunkIndex = 0;
        step2ChunkAnswers = [];
        transDrillIndex = 0;
        transDrillScores = [];
        transDrillChecked = false;
        if ($('step2Writing')) $('step2Writing').value = '';
        if ($('step3Writing')) $('step3Writing').value = '';
        if ($('step2ModelAnswer')) $('step2ModelAnswer').style.display = 'none';
        if ($('step3ModelAnswer')) $('step3ModelAnswer').style.display = 'none';
        resetChecklist();
        resetTimer();
    }

    function renderCurrentStep() {
        switch (currentStep) {
            case 1: renderStep1(); break;
            case 2: renderStep2(); break;
            case 3: renderStep3(); break;
        }
    }

    // ===== STEP 1: 型を知る =====
    function renderStep1() {
        const theme = getTheme();
        if (isOpinion) {
            renderOpinionQuestion('step1PassageContent', theme);
        } else {
            renderPassage('step1PassageContent', theme, true);
        }
        renderFillBlanks(theme);
    }

    function renderPassage(containerId, theme, withColors) {
        const container = $(containerId);
        const parts = [
            { key: 'intro', label: '導入', class: 'intro', dot: 'var(--color-intro)' },
            { key: 'merit', label: 'メリット', class: 'merit', dot: 'var(--color-merit)' },
            { key: 'demerit', label: 'デメリット', class: 'demerit', dot: 'var(--color-demerit)' }
        ];

        container.innerHTML = parts.map(p => `
            <div class="passage-section">
                ${withColors ? `
                <div class="passage-label">
                    <span class="passage-dot" style="background:${p.dot}"></span>
                    <span style="color:${p.dot}">${p.label}</span>
                </div>` : ''}
                <div class="passage-block ${withColors ? p.class : ''}" style="${!withColors ? 'background:var(--bg-secondary);border-left-color:var(--border)' : ''}">
                    ${theme.passage[p.key]}
                </div>
                <div class="passage-ja ${showJa ? '' : 'hidden'}" data-part="${p.key}">
                    ${theme.passageJa[p.key]}
                </div>
            </div>
        `).join('');
    }

    // ===== 意見文用 Question 表示 =====
    function renderOpinionQuestion(containerId, theme) {
        const container = $(containerId);
        container.innerHTML = `
            <div class="passage-section">
                <div class="passage-label">
                    <span class="passage-dot" style="background:var(--color-intro)"></span>
                    <span style="color:var(--color-intro)">QUESTION</span>
                </div>
                <div class="passage-block intro" style="padding:16px">
                    <div style="font-size:1.05rem;font-weight:600;line-height:1.7">${theme.question}</div>
                </div>
                <div class="passage-ja ${showJa ? '' : 'hidden'}" data-part="question">
                    ${theme.questionJa}
                </div>
            </div>
        `;
    }

    function renderFillBlanks(theme) {
        const fb = theme.fillBlanks;
        const container = $('step1Fill');

        // Build the template with clickable blanks
        let html = fb.template;
        fb.blanks.forEach(blank => {
            const val = step1Answers[blank.id] || `[${blank.id}]`;
            const statusClass = step1Checked
                ? (step1Answers[blank.id] === blank.answer ? 'correct' : 'wrong')
                : (step1Answers[blank.id] ? 'filled' : '');
            html = html.replace(
                `[_${blank.id}_]`,
                `<span class="blank-slot ${statusClass}" data-blank="${blank.id}">${val}</span>`
            );
        });

        container.innerHTML = html;

        // Update progress
        const filled = Object.keys(step1Answers).length;
        $('step1Progress').style.width = (filled / fb.blanks.length * 100) + '%';
        $('step1ProgressText').textContent = `${filled} / ${fb.blanks.length}`;

        // Show check button when all filled
        $('step1Check').style.display = filled === fb.blanks.length && !step1Checked ? '' : 'none';
        $('step1Reset').style.display = step1Checked ? '' : 'none';

        // Add click handlers
        if (!step1Checked) {
            container.querySelectorAll('.blank-slot').forEach(slot => {
                slot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeAllDropdowns();
                    showBlankOptions(slot, theme);
                });
            });
        }

        // Result
        if (step1Checked) {
            const correct = fb.blanks.filter(b => step1Answers[b.id] === b.answer).length;
            const total = fb.blanks.length;
            $('step1Result').innerHTML = `
                <div class="result-banner ${correct === total ? 'success' : 'error'}">
                    <span class="material-symbols-rounded">${correct === total ? 'celebration' : 'info'}</span>
                    ${correct} / ${total} 正解！${correct === total ? ' パーフェクト！🎉' : ' もう一度挑戦してみましょう。'}
                </div>
                <div class="model-answer" style="margin-top:14px">
                    <div class="label">📝 模範解答</div>
                    <div class="text-en">${theme.modelAnswer}</div>
                    <div class="text-ja">${theme.modelAnswerJa}</div>
                </div>
            `;
        } else {
            $('step1Result').innerHTML = '';
        }
    }

    let currentDropdown = null;
    function showBlankOptions(slot, theme) {
        const blankId = parseInt(slot.dataset.blank);
        const blank = theme.fillBlanks.blanks.find(b => b.id === blankId);

        const dropdown = document.createElement('div');
        dropdown.className = 'blank-options show';

        const shuffled = shuffleArray(blank.options);
        shuffled.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'blank-option';
            btn.textContent = opt;
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                step1Answers[blankId] = opt;
                closeAllDropdowns();
                renderFillBlanks(theme);
            });
            dropdown.appendChild(btn);
        });

        const rect = slot.getBoundingClientRect();
        dropdown.style.position = 'fixed';
        dropdown.style.top = (rect.bottom + 4) + 'px';
        dropdown.style.left = rect.left + 'px';
        document.body.appendChild(dropdown);
        currentDropdown = dropdown;
    }

    function closeAllDropdowns() {
        if (currentDropdown) {
            currentDropdown.remove();
            currentDropdown = null;
        }
    }

    document.addEventListener('click', closeAllDropdowns);

    // Step1 Check & Reset
    function initStep1Buttons() {
        $('step1Check').addEventListener('click', () => {
            step1Checked = true;
            renderFillBlanks(getTheme());
        });
        $('step1Reset').addEventListener('click', () => {
            step1Answers = {};
            step1Checked = false;
            $('step1Result').innerHTML = '';
            renderFillBlanks(getTheme());
        });
        $('step1ToggleJa').addEventListener('click', () => {
            showJa = !showJa;
            document.querySelectorAll('.passage-ja').forEach(el => {
                el.classList.toggle('hidden', !showJa);
            });
        });
    }

    // ===== STEP 2: 言い換え力 =====
    function renderStep2() {
        const theme = getTheme();
        if (isOpinion) {
            renderKeyExpressions(theme);
        } else {
            renderParaphraseTable(theme);
        }
        renderChunkExercise(theme);
        renderTransDrill(theme);
        renderStep2Hints(theme);
        updateWordCounter('step2');
    }

    function renderParaphraseTable(theme) {
        const container = $('step2Paraphrases');
        container.innerHTML = `
            <table class="paraphrase-table">
                <thead>
                    <tr><th>原文の表現</th><th class="paraphrase-arrow"></th><th>要約での言い換え</th></tr>
                </thead>
                <tbody>
                    ${theme.paraphrases.map(p => `
                        <tr>
                            <td class="paraphrase-original">${p.original}</td>
                            <td class="paraphrase-arrow">→</td>
                            <td class="paraphrase-summary">${p.summary}</td>
                        </tr>
                        ${p.originalJa ? `<tr class="paraphrase-ja-row">
                            <td class="paraphrase-ja">${p.originalJa}</td>
                            <td class="paraphrase-arrow"></td>
                            <td class="paraphrase-ja">${p.summaryJa || ''}</td>
                        </tr>` : ''}
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // ===== 意見文用 キー表現対応表 =====
    function renderKeyExpressions(theme) {
        const container = $('step2Paraphrases');
        if (!theme.keyExpressions || theme.keyExpressions.length === 0) {
            container.innerHTML = '<p style="color:var(--text-secondary)">キー表現データがありません。</p>';
            return;
        }
        container.innerHTML = `
            <table class="paraphrase-table">
                <thead>
                    <tr><th>英語表現</th><th class="paraphrase-arrow"></th><th>意味・使い方</th></tr>
                </thead>
                <tbody>
                    ${theme.keyExpressions.map(k => `
                        <tr>
                            <td class="paraphrase-original">${k.en}</td>
                            <td class="paraphrase-arrow">→</td>
                            <td class="paraphrase-summary">${k.ja}</td>
                        </tr>
                        ${k.note ? `<tr class="paraphrase-ja-row">
                            <td colspan="3" class="paraphrase-ja" style="padding-left:16px">💡 ${k.note}</td>
                        </tr>` : ''}
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    function renderChunkExercise(theme) {
        const container = $('step2Chunks');
        const chunks = theme.chunks;
        const idx = step2ChunkIndex;

        if (idx >= chunks.length) {
            // All done
            container.innerHTML = `
                <div class="score-display">
                    <div class="score-num">${step2ChunkAnswers.filter(Boolean).length} / ${chunks.length}</div>
                    <div class="score-label">チャンク並べ替え完了！</div>
                </div>
                <div class="btn-group" style="justify-content:center">
                    <button class="btn btn-secondary" id="step2ChunkReset">
                        <span class="material-symbols-rounded">refresh</span> もう一度
                    </button>
                </div>
            `;
            $('step2ChunkReset').addEventListener('click', () => {
                step2ChunkIndex = 0;
                step2ChunkAnswers = [];
                renderChunkExercise(theme);
            });
            $('step2Progress').style.width = '100%';
            $('step2ProgressText').textContent = `${chunks.length} / ${chunks.length}`;
            return;
        }

        const chunk = chunks[idx];
        const shuffled = shuffleArray(chunk.pieces);

        $('step2Progress').style.width = (idx / chunks.length * 100) + '%';
        $('step2ProgressText').textContent = `${idx + 1} / ${chunks.length}`;

        container.innerHTML = `
            <div class="chunk-exercise fade-in">
                <div class="chunk-ja">${chunk.sentenceJa}</div>
                <div class="chunk-dropzone" id="chunkDropzone">
                    <span style="color:var(--text-secondary);font-size:0.78rem;opacity:0.5">ここにチャンクを並べる</span>
                </div>
                <div class="chunk-pool" id="chunkPool">
                    ${shuffled.map((p, i) => `<button class="chunk-piece" data-idx="${i}" data-text="${escapeHtml(p)}">${p}</button>`).join('')}
                </div>
                <div class="btn-group">
                    <button class="btn btn-primary" id="chunkCheckBtn" style="display:none">
                        <span class="material-symbols-rounded">check</span> 確認
                    </button>
                </div>
                <div id="chunkResult"></div>
            </div>
        `;

        initChunkInteraction(chunk);
    }

    function escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function initChunkInteraction(chunk) {
        const pool = $('chunkPool');
        const dropzone = $('chunkDropzone');
        const checkBtn = $('chunkCheckBtn');
        let placed = [];
        let checked = false;

        pool.querySelectorAll('.chunk-piece').forEach(piece => {
            piece.addEventListener('click', () => {
                if (checked) return;
                const text = piece.dataset.text;
                placed.push(text);
                piece.classList.add('placed');
                piece.style.display = 'none';
                updateDropzone();
            });
        });

        function updateDropzone() {
            if (checked) return;
            if (placed.length === 0) {
                dropzone.innerHTML = '<span style="color:var(--text-secondary);font-size:0.78rem;opacity:0.5">ここにチャンクを並べる</span>';
            } else {
                dropzone.innerHTML = placed.map((t, i) =>
                    `<button class="chunk-piece placed" data-placed="${i}">${t}</button>`
                ).join('');
                dropzone.querySelectorAll('.chunk-piece').forEach(p => {
                    p.addEventListener('click', () => {
                        if (checked) return;
                        const idx = parseInt(p.dataset.placed);
                        const text = placed[idx];
                        placed.splice(idx, 1);
                        // Show piece back in pool
                        pool.querySelectorAll('.chunk-piece').forEach(pp => {
                            if (pp.dataset.text === text && pp.style.display === 'none') {
                                pp.style.display = '';
                                pp.classList.remove('placed');
                            }
                        });
                        updateDropzone();
                    });
                });
            }
            dropzone.classList.toggle('active', placed.length > 0);
            checkBtn.style.display = placed.length === chunk.pieces.length ? '' : 'none';
        }

        checkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (checked) return;
            checked = true;

            const userAnswer = placed.join(' ');
            const correct = userAnswer === chunk.answer;
            step2ChunkAnswers.push(correct);

            dropzone.classList.remove('active');
            dropzone.classList.add(correct ? 'correct' : 'wrong');
            // Freeze dropzone - make pieces non-interactive
            dropzone.querySelectorAll('.chunk-piece').forEach(p => {
                p.style.pointerEvents = 'none';
            });
            checkBtn.style.display = 'none';

            $('chunkResult').innerHTML = `
                <div class="result-banner ${correct ? 'success' : 'error'}">
                    <span class="material-symbols-rounded">${correct ? 'check_circle' : 'cancel'}</span>
                    ${correct ? '正解！🎉' : '不正解'}
                </div>
                ${!correct ? `<div class="model-answer"><div class="label">正解</div><div class="text-en">${chunk.answer}</div></div>` : ''}
                <div class="btn-group">
                    <button class="btn btn-primary" id="chunkNextBtn">
                        <span class="material-symbols-rounded">arrow_forward</span> 次へ
                    </button>
                </div>
            `;

            $('chunkNextBtn').addEventListener('click', () => {
                step2ChunkIndex++;
                renderChunkExercise(getTheme());
            });
        });
    }

    function renderStep2Hints(theme) {
        const container = $('step2Hints');
        if (isOpinion) {
            // 意見文：ヒントとしてQuestionと構造ガイドを表示
            container.innerHTML = `
                <div style="margin-bottom:8px;padding:8px 12px;border-left:3px solid var(--color-intro);border-radius:0 6px 6px 0;background:rgba(255,255,255,0.02)">
                    <span style="font-size:0.72rem;font-weight:700;color:var(--color-intro)">第1文のヒント</span>
                    <span style="font-size:0.78rem;color:var(--text-secondary);margin-left:8px">I think / I do not think it is ... で意見を述べる</span>
                </div>
                <div style="margin-bottom:8px;padding:8px 12px;border-left:3px solid var(--color-merit);border-radius:0 6px 6px 0;background:rgba(255,255,255,0.02)">
                    <span style="font-size:0.72rem;font-weight:700;color:var(--color-merit)">第2文のヒント</span>
                    <span style="font-size:0.78rem;color:var(--text-secondary);margin-left:8px">First, ... で1つ目の理由を述べる</span>
                </div>
                <div style="margin-bottom:8px;padding:8px 12px;border-left:3px solid var(--color-demerit);border-radius:0 6px 6px 0;background:rgba(255,255,255,0.02)">
                    <span style="font-size:0.72rem;font-weight:700;color:var(--color-demerit)">第3文のヒント</span>
                    <span style="font-size:0.78rem;color:var(--text-secondary);margin-left:8px">Second, ... で2つ目の理由を述べる</span>
                </div>
            `;
            return;
        }
        const parts = [
            { key: 'intro', label: '第1文のヒント', color: 'var(--color-intro)' },
            { key: 'merit', label: '第2文のヒント', color: 'var(--color-merit)' },
            { key: 'demerit', label: '第3文のヒント', color: 'var(--color-demerit)' }
        ];
        container.innerHTML = parts.map(p => `
            <div style="margin-bottom:8px;padding:8px 12px;border-left:3px solid ${p.color};border-radius:0 6px 6px 0;background:rgba(255,255,255,0.02)">
                <span style="font-size:0.72rem;font-weight:700;color:${p.color}">${p.label}</span>
                <span style="font-size:0.78rem;color:var(--text-secondary);margin-left:8px">${theme.passageJa[p.key].substring(0, 40)}…</span>
            </div>
        `).join('');
    }

    // ===== TRANSLATION DRILL (日→英変換ドリル) =====
    function renderTransDrill(theme) {
        const container = $('transDrill');
        if (!container) return;
        const chunks = theme.chunks;
        const idx = transDrillIndex;

        // Update progress bar
        const progressFill = $('transDrillProgress');
        const progressText = $('transDrillProgressText');
        if (progressFill && progressText) {
            const pct = Math.round(((idx) / chunks.length) * 100);
            progressFill.style.width = pct + '%';
            progressText.textContent = `${Math.min(idx + 1, chunks.length)} / ${chunks.length}`;
        }

        if (idx >= chunks.length) {
            // All done — show score
            const correct = transDrillScores.filter(s => s >= 80).length;
            const partial = transDrillScores.filter(s => s >= 40 && s < 80).length;
            const emoji = correct === chunks.length ? '🎉' : correct >= chunks.length / 2 ? '👍' : '💪';
            container.innerHTML = `
                <div class="trans-drill-score fade-in">
                    <div class="score-circle">
                        <div class="score-num">${correct}</div>
                        <div class="score-max">/ ${chunks.length}</div>
                    </div>
                    <div class="score-label">${emoji} 日英変換ドリル完了！</div>
                    <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:6px">
                        完全一致: ${correct}文 ／ 部分一致: ${partial}文
                    </div>
                    <div class="btn-group" style="justify-content:center;margin-top:14px">
                        <button class="btn btn-secondary" id="transDrillReset">
                            <span class="material-symbols-rounded">refresh</span> もう一度
                        </button>
                    </div>
                </div>
            `;
            $('transDrillReset').addEventListener('click', () => {
                transDrillIndex = 0;
                transDrillScores = [];
                transDrillChecked = false;
                renderTransDrill(theme);
            });
            return;
        }

        const chunk = chunks[idx];
        transDrillChecked = false;

        container.innerHTML = `
            <div class="trans-drill fade-in">
                <div class="trans-drill-step-label">
                    <span class="step-badge">${idx + 1}</span>
                    ${chunks.length}文中 ${idx + 1}文目
                </div>
                <div class="trans-drill-prompt">
                    <div class="trans-drill-prompt-label">日本語</div>
                    <div class="trans-drill-prompt-text">${chunk.sentenceJa}</div>
                    ${chunk.literalJa ? `
                        <div class="trans-drill-ja-literal" style="margin-top: 8px; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px dashed var(--border-color); padding-top: 8px;">
                            <span class="material-symbols-rounded" style="font-size:14px; vertical-align:middle; color:var(--accent-primary)">translate</span> 
                            <strong style="color:var(--text-secondary)">ヒント（英語の語順）:</strong> ${chunk.literalJa}
                        </div>
                    ` : ''}
                </div>
                <textarea class="trans-drill-input" id="transDrillInput" 
                    placeholder="上の日本語を英語で書いてみましょう..."></textarea>
                <div class="trans-drill-hint" id="transDrillHintBtn">
                    <span class="material-symbols-rounded" style="font-size:16px">lightbulb</span>
                    ヒントを見る（最初の数語）
                    <div class="trans-drill-hint-text" id="transDrillHintText">
                        ${chunk.answer.split(' ').slice(0, 3).join(' ')} ...
                    </div>
                </div>
                <div class="btn-group" style="margin-top:12px">
                    <button class="btn btn-primary" id="transDrillCheck">
                        <span class="material-symbols-rounded">check</span> 確認
                    </button>
                </div>
                <div id="transDrillResult"></div>
            </div>
        `;

        // Hint toggle
        $('transDrillHintBtn').addEventListener('click', () => {
            $('transDrillHintText').classList.toggle('visible');
        });

        // Check answer with Gemini API
        $('transDrillCheck').addEventListener('click', async () => {
            if (transDrillChecked) return;
            const userAnswer = $('transDrillInput').value.trim();
            if (!userAnswer) return;
            
            const gasUrl = GAS_URL || localStorage.getItem('writepass-gas-url');
            if (!gasUrl) {
                showGasSetup('step2'); // Reuse step2 modal if API key is missing
                return;
            }

            transDrillChecked = true;
            
            // UI state: loading
            const checkBtn = $('transDrillCheck');
            const resultDiv = $('transDrillResult');
            const originalBtnText = checkBtn.innerHTML;
            checkBtn.disabled = true;
            checkBtn.innerHTML = '<span class="material-symbols-rounded spinner">progress_activity</span> 先生が添削中...';
            resultDiv.innerHTML = `<div class="grade-loading" style="margin-top:12px"><div class="grade-loading-dots"><span></span><span></span><span></span></div><div>文法と自然さを丁寧にチェックしています...</div></div>`;

            try {
                const payload = {
                    action: 'grade_sentence',
                    sentenceJa: chunk.sentenceJa,
                    modelAnswer: chunk.answer,
                    studentAnswer: userAnswer,
                    gradeId: (typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.gradeId) || 'grade_pre2plus'
                };

                const response = await fetch(gasUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                if (result.error) {
                    throw new Error(result.error);
                }

                // If success, store score
                transDrillScores.push(result.score);
                const isCorrect = result.isCorrect;

                let diffLabel = isCorrect ? 'correct' : 'wrong';
                let diffIcon = isCorrect ? 'check_circle' : 'info';
                let resultTitle = isCorrect ? '🎉 いいですね！' : '💪 もう一息です！';

                resultDiv.innerHTML = `
                    <div class="trans-drill-diff fade-in">
                        <div class="trans-drill-diff-label ${diffLabel}">
                            <span class="material-symbols-rounded" style="font-size:18px">${diffIcon}</span>
                            ${resultTitle}（スコア: ${result.score}/100）
                        </div>
                        
                        <!-- 先生のコメント -->
                        <div class="trans-drill-answer-row" style="margin-top:8px; margin-bottom:12px">
                            <div class="row-label">👩‍🏫 先生からのフィードバック</div>
                            <div class="row-text" style="background:rgba(108, 99, 255, 0.08); border-left:3px solid var(--accent-primary); line-height:1.6">
                                ${escapeHtml(result.comment).replace(/\n/g, '<br>')}
                            </div>
                        </div>

                        ${result.subjectVerb ? `
                            <!-- 主語と動詞の骨格 -->
                            <div class="trans-drill-answer-row" style="margin-bottom:12px">
                                <div class="row-label">💡 この文の骨格（主語と述語の関係）</div>
                                <div class="row-text" style="background:var(--bg-card); border: 1px dashed var(--accent-primary); display:flex; gap:16px; align-items:center">
                                    <div><strong style="color:var(--accent-primary)">主語(S):</strong> ${escapeHtml(result.subjectVerb.subject)}</div>
                                    <span class="material-symbols-rounded" style="color:var(--text-secondary); font-size:16px">arrow_right_alt</span>
                                    <div><strong style="color:var(--accent-secondary)">動詞(V):</strong> ${escapeHtml(result.subjectVerb.verb)}</div>
                                </div>
                            </div>
                        ` : ''}

                        ${(!isCorrect || result.corrected !== userAnswer) ? `
                            <div class="trans-drill-answer-row">
                                <div class="row-label">あなたの解答</div>
                                <div class="row-text user-text">${escapeHtml(userAnswer)}</div>
                            </div>
                            <div class="trans-drill-answer-row">
                                <div class="row-label">✍️ 修正案（文法的な訂正）</div>
                                <div class="row-text model-text">${escapeHtml(result.corrected)}</div>
                            </div>
                        ` : `
                            <div class="trans-drill-answer-row">
                                <div class="row-text correct-text">${escapeHtml(userAnswer)}</div>
                            </div>
                        `}

                        ${result.betterExpression ? `
                            <div class="trans-drill-answer-row" style="margin-top:8px">
                                <div class="row-label">💡 さらに自然な表現の例</div>
                                <div class="row-text" style="background:var(--bg-card); border: 1px solid var(--accent-secondary); color:var(--text-primary)">
                                    ${escapeHtml(result.betterExpression)}
                                </div>
                            </div>
                        ` : ''}

                        <div class="btn-group" style="margin-top:16px">
                            <button class="btn btn-primary" id="transDrillNext">
                                <span class="material-symbols-rounded">arrow_forward</span>
                                ${idx + 1 < chunks.length ? '次の文へ' : '結果を見る'}
                            </button>
                        </div>
                    </div>
                `;

                $('transDrillInput').readOnly = true;
                checkBtn.style.display = 'none';

                $('transDrillNext').addEventListener('click', () => {
                    transDrillIndex++;
                    renderTransDrill(getTheme());
                });

            } catch (err) {
                // Return generic error state
                transDrillChecked = false;
                checkBtn.disabled = false;
                checkBtn.innerHTML = originalBtnText;
                resultDiv.innerHTML = `
                    <div class="grade-error" style="margin-top:12px; padding:12px; background:rgba(248,113,113,0.1); border-left:3px solid var(--error); border-radius:4px; font-size:0.85rem">
                        <span class="material-symbols-rounded" style="vertical-align:middle; font-size:16px">error</span>
                        通信エラーが発生しました: ${escapeHtml(err.message)}<br>
                        ネットワーク設定やAPIキー設定を確認してもう一度お試しください。
                    </div>
                `;
            }
        });

        // Enter key to submit
        $('transDrillInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                $('transDrillCheck').click();
            }
        });
    }

    // キーワード一致率で翻訳スコアを計算
    function compareTranslation(userAnswer, modelAnswer) {
        const normalize = (str) => str.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(w => w.length > 0);

        const userWords = normalize(userAnswer);
        const modelWords = normalize(modelAnswer);

        if (userWords.length === 0 || modelWords.length === 0) return 0;

        // Bi-gram matching for better accuracy
        const getBigrams = (words) => {
            const bigrams = [];
            for (let i = 0; i < words.length - 1; i++) {
                bigrams.push(words[i] + ' ' + words[i + 1]);
            }
            return bigrams;
        };

        // Word-level matching
        const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'it', 'to', 'of', 'in', 'for', 'and', 'or', 'but']);
        const meaningfulModel = modelWords.filter(w => !stopWords.has(w));
        const meaningfulUser = userWords.filter(w => !stopWords.has(w));

        let matchCount = 0;
        const usedIndices = new Set();
        meaningfulModel.forEach(mw => {
            const idx = meaningfulUser.findIndex((uw, i) => !usedIndices.has(i) && uw === mw);
            if (idx !== -1) {
                matchCount++;
                usedIndices.add(idx);
            }
        });

        const wordScore = meaningfulModel.length > 0 ? matchCount / meaningfulModel.length : 0;

        // Bigram matching
        const modelBigrams = getBigrams(modelWords);
        const userBigrams = getBigrams(userWords);
        let bigramMatch = 0;
        modelBigrams.forEach(mb => {
            if (userBigrams.includes(mb)) bigramMatch++;
        });
        const bigramScore = modelBigrams.length > 0 ? bigramMatch / modelBigrams.length : 0;

        // Combined score (word + bigram)
        const combined = wordScore * 0.5 + bigramScore * 0.5;
        return Math.round(combined * 100);
    }

    // ===== STEP 3: 本番力 =====
    function renderStep3() {
        const theme = getTheme();
        renderStep3Passage(theme);
        updateWordCounter('step3');
    }

    function renderStep3Passage(theme) {
        const container = $('step3PassageContent');
        if (isOpinion) {
            container.innerHTML = `
                <div class="passage-block" style="background:var(--bg-secondary);border-left:4px solid var(--border);padding:16px">
                    <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:8px;font-weight:600">QUESTION</div>
                    <div style="font-size:1rem;font-weight:600;line-height:1.6">${theme.question}</div>
                </div>
            `;
            return;
        }
        container.innerHTML = `
            <div class="passage-block" style="background:var(--bg-secondary);border-left:4px solid var(--border)">
                ${theme.passage.intro}
            </div>
            <div class="passage-block" style="background:var(--bg-secondary);border-left:4px solid var(--border);margin-top:8px">
                ${theme.passage.merit}
            </div>
            <div class="passage-block" style="background:var(--bg-secondary);border-left:4px solid var(--border);margin-top:8px">
                ${theme.passage.demerit}
            </div>
        `;
    }

    // ===== WORD COUNTER =====
    function updateWordCounter(prefix) {
        const textarea = $(prefix + 'Writing');
        const num = $(prefix + 'WordNum');
        const bar = $(prefix + 'WordBar');

        if (!textarea) return;

        const count = countWords(textarea.value);
        const pct = Math.min(count / WP_MAX_WORDS * 100, 100);
        const status = count < WP_MIN_WORDS ? 'under' : count <= WP_MAX_WORDS ? 'ok' : 'over';

        num.textContent = count;
        num.className = 'word-count-num ' + status;
        bar.style.width = pct + '%';
        bar.className = 'word-bar-fill ' + status;
    }

    function initWordCounters() {
        ['step2', 'step3'].forEach(prefix => {
            const textarea = $(prefix + 'Writing');
            if (textarea) {
                textarea.addEventListener('input', () => updateWordCounter(prefix));
            }
        });
    }

    // ===== MODEL ANSWER =====
    function initModelAnswerButtons() {
        $('step2ShowModel').addEventListener('click', () => {
            const theme = getTheme();
            $('step2ModelAnswer').style.display = '';
            $('step2ModelAnswer').innerHTML = `
                <div class="model-answer fade-in">
                    <div class="label">📝 模範解答</div>
                    <div class="text-en">${theme.modelAnswer}</div>
                    <div class="text-ja">${theme.modelAnswerJa}</div>
                    <div style="margin-top:8px;font-size:0.75rem;color:var(--text-secondary)">語数: ${countWords(theme.modelAnswer)}語</div>
                </div>
            `;
        });

        $('step2AiGrade').addEventListener('click', () => gradeWriting('step2'));

        $('step3Submit').addEventListener('click', () => {
            const theme = getTheme();
            if (timerRunning) pauseTimer();
            $('step3ModelAnswer').style.display = '';
            $('step3ModelAnswer').innerHTML = `
                <div class="model-answer fade-in">
                    <div class="label">📝 模範解答</div>
                    <div class="text-en">${theme.modelAnswer}</div>
                    <div class="text-ja">${theme.modelAnswerJa}</div>
                    <div style="margin-top:8px;font-size:0.75rem;color:var(--text-secondary)">語数: ${countWords(theme.modelAnswer)}語</div>
                </div>
            `;
        });

        $('step3AiGrade').addEventListener('click', () => gradeWriting('step3'));

        // 画像入力ボタン
        ['step2', 'step3'].forEach(prefix => {
            const cameraBtn = $(prefix + 'CameraBtn');
            const pasteBtn = $(prefix + 'PasteBtn');
            const fileInput = $(prefix + 'CameraInput');
            const preview = $(prefix + 'ImagePreview');

            if (cameraBtn && fileInput) {
                cameraBtn.addEventListener('click', () => fileInput.click());
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) handleImageFile(file, prefix);
                });
            }

            // ファイル選択ボタン（captureなし）
            const fileBtn = $(prefix + 'FileBtn');
            const filePickInput = $(prefix + 'FileInput');
            if (fileBtn && filePickInput) {
                fileBtn.addEventListener('click', () => filePickInput.click());
                filePickInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if (file) handleImageFile(file, prefix);
                });
            }

            if (pasteBtn) {
                pasteBtn.addEventListener('click', async () => {
                    try {
                        const items = await navigator.clipboard.read();
                        for (const item of items) {
                            const imageType = item.types.find(t => t.startsWith('image/'));
                            if (imageType) {
                                const blob = await item.getType(imageType);
                                handleImageFile(blob, prefix);
                                return;
                            }
                        }
                        showGradeError(prefix, 'クリップボードに画像がありません。スクリーンショットをコピーしてから試してください。');
                    } catch (err) {
                        showGradeError(prefix, 'クリップボードの読み取りに失敗しました。ブラウザの権限を確認してください。');
                    }
                });
            }

            // textareaへのペーストでも画像対応
            const textarea = $(prefix + 'Writing');
            if (textarea) {
                textarea.addEventListener('paste', (e) => {
                    const items = e.clipboardData?.items;
                    if (!items) return;
                    for (const item of items) {
                        if (item.type.startsWith('image/')) {
                            e.preventDefault();
                            const blob = item.getAsFile();
                            handleImageFile(blob, prefix);
                            return;
                        }
                    }
                });
            }
        });
    }

    // ===== IMAGE INPUT HELPERS =====
    function handleImageFile(file, prefix) {
        const preview = $(prefix + 'ImagePreview');
        resizeImage(file, 1200, (base64, mimeType) => {
            // トリミング・回転モーダルを表示
            showCropModal(base64, mimeType, (croppedBase64, croppedMime) => {
                // プレビュー表示
                preview.style.display = '';
                preview.innerHTML = `
                    <div class="image-preview-card fade-in">
                        <img src="data:${croppedMime};base64,${croppedBase64}" alt="入力画像">
                        <div class="image-preview-actions">
                            <button class="btn btn-success" id="${prefix}ImageGrade">
                                <span class="material-symbols-rounded">auto_awesome</span> この画像でAI採点
                            </button>
                            <button class="btn btn-secondary" id="${prefix}ImageClear">
                                <span class="material-symbols-rounded">close</span> 取り消し
                            </button>
                        </div>
                    </div>
                `;

                $(prefix + 'ImageGrade').addEventListener('click', () => {
                    gradeWriting(prefix, croppedBase64, croppedMime);
                });
                $(prefix + 'ImageClear').addEventListener('click', () => {
                    preview.style.display = 'none';
                    preview.innerHTML = '';
                });
            });
        });
    }

    function resizeImage(file, maxSize, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let w = img.width, h = img.height;
                if (w > maxSize || h > maxSize) {
                    const ratio = Math.min(maxSize / w, maxSize / h);
                    w = Math.round(w * ratio);
                    h = Math.round(h * ratio);
                }
                canvas.width = w;
                canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                const base64 = dataUrl.split(',')[1];
                callback(base64, 'image/jpeg');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // ===== CROP & ROTATE MODAL =====
    function showCropModal(base64, mimeType, onConfirm) {
        let rotation = 0; // 0, 90, 180, 270
        let cropStart = null;
        let cropEnd = null;
        let isDragging = false;
        let sourceImg = null;
        let displayCanvas = null;
        let displayCtx = null;
        // Canvas上の画像の描画位置・サイズ
        let imgDrawX = 0, imgDrawY = 0, imgDrawW = 0, imgDrawH = 0;

        // モーダル DOM を構築
        const modal = document.createElement('div');
        modal.className = 'crop-modal';
        modal.innerHTML = `
            <div class="crop-header">
                <div class="crop-header-title">
                    <span class="material-symbols-rounded">crop</span>
                    トリミング・回転
                </div>
                <div class="crop-header-hint">ドラッグで範囲選択</div>
            </div>
            <div class="crop-canvas-wrap" id="cropCanvasWrap">
                <canvas id="cropCanvas"></canvas>
            </div>
            <div class="crop-toolbar">
                <button class="crop-tb-btn cancel" id="cropCancel">
                    <span class="material-symbols-rounded">close</span>
                    取消
                </button>
                <div class="crop-tb-sep"></div>
                <button class="crop-tb-btn rotate" id="cropRotateLeft">
                    <span class="material-symbols-rounded">rotate_left</span>
                </button>
                <button class="crop-tb-btn rotate" id="cropRotateRight">
                    <span class="material-symbols-rounded">rotate_right</span>
                </button>
                <div class="crop-tb-sep"></div>
                <button class="crop-tb-btn confirm" id="cropConfirm">
                    <span class="material-symbols-rounded">check</span>
                    確定
                </button>
            </div>
        `;
        document.body.appendChild(modal);

        displayCanvas = modal.querySelector('#cropCanvas');
        displayCtx = displayCanvas.getContext('2d');
        const wrap = modal.querySelector('#cropCanvasWrap');

        // 画像をロード
        sourceImg = new Image();
        sourceImg.onload = () => {
            drawAll();
        };
        sourceImg.src = `data:${mimeType};base64,${base64}`;

        function getRotatedSize() {
            const w = sourceImg.width;
            const h = sourceImg.height;
            if (rotation === 90 || rotation === 270) return { w: h, h: w };
            return { w, h };
        }

        function drawAll() {
            if (!sourceImg || !sourceImg.complete) return;
            const container = wrap;
            const cw = container.clientWidth;
            const ch = container.clientHeight;

            const rotSize = getRotatedSize();
            // 画像をコンテナにフィットさせるスケール
            const scale = Math.min(cw / rotSize.w, ch / rotSize.h, 1);
            imgDrawW = Math.round(rotSize.w * scale);
            imgDrawH = Math.round(rotSize.h * scale);
            imgDrawX = Math.round((cw - imgDrawW) / 2);
            imgDrawY = Math.round((ch - imgDrawH) / 2);

            displayCanvas.width = cw;
            displayCanvas.height = ch;

            displayCtx.clearRect(0, 0, cw, ch);

            // 回転して描画
            displayCtx.save();
            displayCtx.translate(imgDrawX + imgDrawW / 2, imgDrawY + imgDrawH / 2);
            displayCtx.rotate(rotation * Math.PI / 180);
            if (rotation === 90 || rotation === 270) {
                displayCtx.drawImage(sourceImg, -imgDrawH / 2, -imgDrawW / 2, imgDrawH, imgDrawW);
            } else {
                displayCtx.drawImage(sourceImg, -imgDrawW / 2, -imgDrawH / 2, imgDrawW, imgDrawH);
            }
            displayCtx.restore();

            // クロップ矩形描画
            if (cropStart && cropEnd) {
                const x = Math.min(cropStart.x, cropEnd.x);
                const y = Math.min(cropStart.y, cropEnd.y);
                const w = Math.abs(cropEnd.x - cropStart.x);
                const h = Math.abs(cropEnd.y - cropStart.y);

                if (w > 3 && h > 3) {
                    // 暗い領域（選択外）
                    displayCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                    // 上
                    displayCtx.fillRect(0, 0, cw, y);
                    // 下
                    displayCtx.fillRect(0, y + h, cw, ch - y - h);
                    // 左
                    displayCtx.fillRect(0, y, x, h);
                    // 右
                    displayCtx.fillRect(x + w, y, cw - x - w, h);

                    // 選択枠
                    displayCtx.strokeStyle = '#fff';
                    displayCtx.lineWidth = 2;
                    displayCtx.strokeRect(x, y, w, h);

                    // コーナーマーク
                    const cLen = 16;
                    displayCtx.strokeStyle = 'rgba(108, 99, 255, 1)';
                    displayCtx.lineWidth = 3;
                    // 左上
                    displayCtx.beginPath();
                    displayCtx.moveTo(x, y + cLen); displayCtx.lineTo(x, y); displayCtx.lineTo(x + cLen, y);
                    displayCtx.stroke();
                    // 右上
                    displayCtx.beginPath();
                    displayCtx.moveTo(x + w - cLen, y); displayCtx.lineTo(x + w, y); displayCtx.lineTo(x + w, y + cLen);
                    displayCtx.stroke();
                    // 左下
                    displayCtx.beginPath();
                    displayCtx.moveTo(x, y + h - cLen); displayCtx.lineTo(x, y + h); displayCtx.lineTo(x + cLen, y + h);
                    displayCtx.stroke();
                    // 右下
                    displayCtx.beginPath();
                    displayCtx.moveTo(x + w - cLen, y + h); displayCtx.lineTo(x + w, y + h); displayCtx.lineTo(x + w, y + h - cLen);
                    displayCtx.stroke();
                }
            }
        }

        // イベント座標を取得（タッチ/マウス共通）
        function getPointerPos(e) {
            const rect = displayCanvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        function onPointerDown(e) {
            e.preventDefault();
            isDragging = true;
            const pos = getPointerPos(e);
            cropStart = pos;
            cropEnd = pos;
        }

        function onPointerMove(e) {
            if (!isDragging) return;
            e.preventDefault();
            cropEnd = getPointerPos(e);
            drawAll();
        }

        function onPointerUp(e) {
            if (!isDragging) return;
            isDragging = false;
            if (e.changedTouches) {
                const rect = displayCanvas.getBoundingClientRect();
                cropEnd = {
                    x: e.changedTouches[0].clientX - rect.left,
                    y: e.changedTouches[0].clientY - rect.top
                };
            }
            drawAll();
        }

        displayCanvas.addEventListener('mousedown', onPointerDown);
        displayCanvas.addEventListener('mousemove', onPointerMove);
        displayCanvas.addEventListener('mouseup', onPointerUp);
        displayCanvas.addEventListener('touchstart', onPointerDown, { passive: false });
        displayCanvas.addEventListener('touchmove', onPointerMove, { passive: false });
        displayCanvas.addEventListener('touchend', onPointerUp);

        // 回転
        modal.querySelector('#cropRotateLeft').addEventListener('click', () => {
            rotation = (rotation + 270) % 360;
            cropStart = null;
            cropEnd = null;
            drawAll();
        });

        modal.querySelector('#cropRotateRight').addEventListener('click', () => {
            rotation = (rotation + 90) % 360;
            cropStart = null;
            cropEnd = null;
            drawAll();
        });

        // 取消
        modal.querySelector('#cropCancel').addEventListener('click', () => {
            modal.remove();
        });

        // 確定
        modal.querySelector('#cropConfirm').addEventListener('click', () => {
            const rotSize = getRotatedSize();
            // 実際のスケール比率
            const scaleX = rotSize.w / imgDrawW;
            const scaleY = rotSize.h / imgDrawH;

            // 出力用Canvas
            const outCanvas = document.createElement('canvas');
            const outCtx = outCanvas.getContext('2d');

            if (cropStart && cropEnd) {
                const cx = Math.min(cropStart.x, cropEnd.x);
                const cy = Math.min(cropStart.y, cropEnd.y);
                const cw = Math.abs(cropEnd.x - cropStart.x);
                const ch = Math.abs(cropEnd.y - cropStart.y);

                if (cw > 3 && ch > 3) {
                    // 選択範囲を画像座標に変換
                    const srcX = (cx - imgDrawX) * scaleX;
                    const srcY = (cy - imgDrawY) * scaleY;
                    const srcW = cw * scaleX;
                    const srcH = ch * scaleY;

                    outCanvas.width = Math.round(srcW);
                    outCanvas.height = Math.round(srcH);

                    // 回転済み画像をまず中間Canvasに描画
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = rotSize.w;
                    tempCanvas.height = rotSize.h;
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCtx.translate(rotSize.w / 2, rotSize.h / 2);
                    tempCtx.rotate(rotation * Math.PI / 180);
                    if (rotation === 90 || rotation === 270) {
                        tempCtx.drawImage(sourceImg, -sourceImg.width / 2, -sourceImg.height / 2);
                    } else {
                        tempCtx.drawImage(sourceImg, -sourceImg.width / 2, -sourceImg.height / 2);
                    }

                    // 中間Canvasからクロップ範囲を切り出し
                    outCtx.drawImage(tempCanvas, srcX, srcY, srcW, srcH, 0, 0, outCanvas.width, outCanvas.height);

                    const dataUrl = outCanvas.toDataURL('image/jpeg', 0.85);
                    const outBase64 = dataUrl.split(',')[1];
                    modal.remove();
                    onConfirm(outBase64, 'image/jpeg');
                    return;
                }
            }

            // クロップ範囲なし → 回転のみ適用
            if (rotation === 0) {
                // 何も変更なし
                modal.remove();
                onConfirm(base64, mimeType);
                return;
            }

            // 回転のみ
            outCanvas.width = rotSize.w;
            outCanvas.height = rotSize.h;
            outCtx.translate(rotSize.w / 2, rotSize.h / 2);
            outCtx.rotate(rotation * Math.PI / 180);
            if (rotation === 90 || rotation === 270) {
                outCtx.drawImage(sourceImg, -sourceImg.width / 2, -sourceImg.height / 2);
            } else {
                outCtx.drawImage(sourceImg, -sourceImg.width / 2, -sourceImg.height / 2);
            }

            const dataUrl = outCanvas.toDataURL('image/jpeg', 0.85);
            const outBase64 = dataUrl.split(',')[1];
            modal.remove();
            onConfirm(outBase64, 'image/jpeg');
        });

        // ウィンドウリサイズ時再描画
        function onResize() {
            if (!modal.parentNode) return;
            drawAll();
        }
        window.addEventListener('resize', onResize);

        // クリーンアップ
        const observer = new MutationObserver(() => {
            if (!modal.parentNode) {
                window.removeEventListener('resize', onResize);
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true });
    }

    // ===== AI GRADING =====
    async function gradeWriting(prefix, imageBase64, imageMimeType) {
        if (isGrading) return;

        const gasUrl = GAS_URL || localStorage.getItem('writepass-gas-url');
        if (!gasUrl) {
            showGasSetup(prefix);
            return;
        }

        const textarea = $(prefix + 'Writing');
        const studentAnswer = textarea.value.trim();

        // テキストも画像もない場合はエラー
        if (!studentAnswer && !imageBase64) {
            showGradeError(prefix, '要約を入力するか、写真を撮影してから採点してください。');
            return;
        }

        const theme = getTheme();
        const fullPassage = theme.passage.intro + '\n\n' + theme.passage.merit + '\n\n' + theme.passage.demerit;
        const fullPassageJa = theme.passageJa.intro + '\n\n' + theme.passageJa.merit + '\n\n' + theme.passageJa.demerit;

        isGrading = true;
        const gradeBtn = $(prefix + 'AiGrade');
        const resultContainer = $(prefix + 'GradeResult');
        gradeBtn.disabled = true;

        const loadingMsg = imageBase64 ? '📷 手書き文字を読み取り中...' : 'AIが採点しています...';
        gradeBtn.innerHTML = '<span class="material-symbols-rounded spinner">progress_activity</span> 採点中...';
        resultContainer.style.display = '';
        resultContainer.innerHTML = `<div class="grade-loading"><div class="grade-loading-dots"><span></span><span></span><span></span></div><div>${loadingMsg}</div></div>`;

        try {
            const payload = {
                passage: fullPassage,
                passageJa: fullPassageJa,
                modelAnswer: theme.modelAnswer,
                gradeId: (typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.gradeId) || 'grade_pre2plus',
                taskType: (typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.taskType) || 'Summary'
            };

            if (imageBase64) {
                payload.imageBase64 = imageBase64;
                payload.imageMimeType = imageMimeType;
            } else {
                payload.studentAnswer = studentAnswer;
            }

            const response = await fetch(gasUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.error) {
                showGradeError(prefix, result.error);
            } else {
                // OCR結果をテキストエリアに反映
                const answeredText = result.ocrText || studentAnswer;
                if (result.ocrText) {
                    textarea.value = result.ocrText;
                    updateWordCounter(prefix);
                    // 画像プレビューをOCR結果表示に更新
                    const preview = $(prefix + 'ImagePreview');
                    if (preview) {
                        preview.innerHTML = `
                            <div class="ocr-result fade-in">
                                <div class="ocr-result-label">📷 読み取り結果</div>
                                <div class="ocr-result-text">${escapeHtml(result.ocrText)}</div>
                            </div>
                        `;
                    }
                }
                renderGradeResult(prefix, result, answeredText);
            }
        } catch (err) {
            showGradeError(prefix, 'ネットワークエラー: ' + err.message);
        } finally {
            isGrading = false;
            gradeBtn.disabled = false;
            gradeBtn.innerHTML = '<span class="material-symbols-rounded">auto_awesome</span> AI採点';
        }
    }

    function renderGradeResult(prefix, result, studentAnswer) {
        // 印刷用にデータを保存
        lastGradeData[prefix] = { result, studentAnswer };

        const container = $(prefix + 'GradeResult');
        const maxTotal = 16;
        const pct = Math.round(result.totalScore / maxTotal * 100);
        const grade = pct >= 80 ? 'excellent' : pct >= 60 ? 'good' : pct >= 40 ? 'fair' : 'poor';
        const gradeLabels = { excellent: '🌟 素晴らしい！', good: '👍 良い！', fair: '📝 もう少し！', poor: '💪 がんばろう！' };
        const gradeColors = { excellent: 'var(--success)', good: 'var(--color-merit)', fair: 'var(--warning)', poor: 'var(--error)' };

        container.innerHTML = `
            <div class="grade-card fade-in">
                <div class="grade-header">
                    <div class="grade-score-ring" style="--score-pct: ${pct}%; --score-color: ${gradeColors[grade]}">
                        <span class="grade-score-num">${result.totalScore}</span>
                        <span class="grade-score-max">/ ${maxTotal}</span>
                    </div>
                    <div class="grade-label" style="color:${gradeColors[grade]}">${gradeLabels[grade]}</div>
                    <div class="grade-comment">${result.overallComment}</div>
                </div>

                <div class="grade-highlight-hint">
                    <span class="material-symbols-rounded" style="font-size:16px">touch_app</span>
                    各項目をタップすると該当箇所がハイライトされます
                </div>

                <div class="grade-highlight-view" id="${prefix}HighlightView" style="display:none"></div>

                <div class="grade-categories">
                    ${result.categories.map((cat, idx) => {
            const catPct = cat.score / cat.maxScore * 100;
            return `
                        <div class="grade-cat clickable" data-cat-idx="${idx}">
                            <div class="grade-cat-header">
                                <span class="grade-cat-name">${cat.name}</span>
                                <span class="grade-cat-score">${cat.score} / ${cat.maxScore}</span>
                            </div>
                            <div class="grade-cat-bar">
                                <div class="grade-cat-bar-fill" style="width:${catPct}%;background:${catPct >= 75 ? 'var(--success)' : catPct >= 50 ? 'var(--warning)' : 'var(--error)'}"></div>
                            </div>
                            <div class="grade-cat-comment">${cat.comment}</div>
                        </div>`;
        }).join('')}
                </div>

                ${result.improvedVersion ? `
                <div class="grade-improved">
                    <div class="grade-improved-label">
                        <span class="material-symbols-rounded" style="font-size:18px">lightbulb</span>
                        改善例
                    </div>
                    <div class="grade-improved-text">${result.improvedVersion}</div>
                    <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:4px">語数: ${countWords(result.improvedVersion)}語</div>
                </div>` : ''}

                ${result.errors && result.errors.length > 0 ? `
                <div class="grade-errors">
                    <div class="grade-errors-label">
                        <span class="material-symbols-rounded" style="font-size:18px">edit_note</span>
                        添削 (${result.errors.length}件)
                    </div>
                    <div class="grade-errors-list">
                        ${result.errors.map(err => {
            const typeLabels = { spelling: 'スペル', grammar: '文法', vocabulary: '語法', punctuation: '句読点' };
            const typeColors = { spelling: '#ef4444', grammar: '#f59e0b', vocabulary: '#8b5cf6', punctuation: '#6b7280' };
            return `
                        <div class="grade-error-item">
                            <div class="grade-error-header">
                                <span class="grade-error-type" style="background:${typeColors[err.type] || '#666'}">${typeLabels[err.type] || err.type}</span>
                                <span class="grade-error-original">${err.original}</span>
                                <span class="grade-error-arrow">→</span>
                                <span class="grade-error-corrected">${err.corrected}</span>
                            </div>
                            <div class="grade-error-explanation">${err.explanation}</div>
                        </div>`;
        }).join('')}
                    </div>
                </div>` : (result.errors ? `
                <div class="grade-errors">
                    <div class="grade-errors-label">
                        <span class="material-symbols-rounded" style="font-size:18px">check_circle</span>
                        添削：ミスはありません 🎉
                    </div>
                </div>` : '')}

                <button class="grade-print-btn" id="${prefix}PrintGrade">
                    <span class="material-symbols-rounded" style="font-size:18px">print</span>
                    採点レポートを印刷
                </button>
            </div>
        `;

        // Add click handlers for highlight
        container.querySelectorAll('.grade-cat.clickable').forEach(catEl => {
            catEl.addEventListener('click', () => {
                const idx = parseInt(catEl.dataset.catIdx);
                const cat = result.categories[idx];

                // Toggle active state
                const wasActive = catEl.classList.contains('active');
                container.querySelectorAll('.grade-cat').forEach(c => c.classList.remove('active'));

                const highlightView = $(prefix + 'HighlightView');

                if (wasActive) {
                    highlightView.style.display = 'none';
                    return;
                }

                catEl.classList.add('active');
                highlightView.style.display = '';
                highlightView.innerHTML = buildHighlightedText(studentAnswer, cat);
                highlightView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });

        // 印刷ボタン
        const printGradeBtn = $(prefix + 'PrintGrade');
        if (printGradeBtn) {
            printGradeBtn.addEventListener('click', () => printGradeResult(prefix));
        }
    }

    function buildHighlightedText(studentAnswer, cat) {
        const highlights = cat.highlightTexts || [];
        if (highlights.length === 0) {
            return `<div class="highlight-text-display">${escapeHtml(studentAnswer)}</div>`;
        }

        // Parse highlights: +text = good, -text = bad
        const parsed = highlights.map(h => {
            if (h.startsWith('+')) return { text: h.substring(1).trim(), type: 'good' };
            if (h.startsWith('-')) return { text: h.substring(1).trim(), type: 'bad' };
            return { text: h.trim(), type: 'neutral' };
        }).filter(h => h.text.length > 0);

        // Build highlighted HTML
        let html = escapeHtml(studentAnswer);

        // Sort by length (longest first) to avoid partial matches
        const sorted = [...parsed].sort((a, b) => b.text.length - a.text.length);

        sorted.forEach(h => {
            const escaped = escapeHtml(h.text);
            const regex = new RegExp(escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            html = html.replace(regex, match =>
                `<mark class="hl-${h.type}">${match}</mark>`
            );
        });

        // Legend
        const hasGood = parsed.some(h => h.type === 'good');
        const hasBad = parsed.some(h => h.type === 'bad');

        return `
            <div class="highlight-cat-label">
                <span class="material-symbols-rounded" style="font-size:18px">format_ink_highlighter</span>
                ${cat.name}のハイライト
            </div>
            <div class="highlight-text-display">${html}</div>
            <div class="highlight-legend">
                ${hasGood ? '<span class="hl-legend-item"><mark class="hl-good">良い点</mark></span>' : ''}
                ${hasBad ? '<span class="hl-legend-item"><mark class="hl-bad">改善点</mark></span>' : ''}
            </div>
        `;
    }

    function showGradeError(prefix, message) {
        const container = $(prefix + 'GradeResult');
        container.style.display = '';
        container.innerHTML = `
            <div class="result-banner error fade-in">
                <span class="material-symbols-rounded">error</span>
                ${message}
            </div>
        `;
    }

    function showGasSetup(prefix) {
        const container = $(prefix + 'GradeResult');
        container.style.display = '';
        container.innerHTML = `
            <div class="grade-setup fade-in">
                <div class="card-title">
                    <span class="material-symbols-rounded">settings</span>
                    AI採点のセットアップ
                </div>
                <p class="section-desc" style="margin-bottom:12px">
                    AI採点を利用するには、Google Apps ScriptのデプロイURLを設定してください。
                    <br>詳細は <code>gas-grader.js</code> のコメントを参照してください。
                </p>
                <input type="url" class="gas-url-input" id="${prefix}GasUrl" placeholder="https://script.google.com/macros/s/...../exec">
                <div class="btn-group">
                    <button class="btn btn-primary" id="${prefix}GasSave">
                        <span class="material-symbols-rounded">save</span> 保存
                    </button>
                </div>
            </div>
        `;

        $(`${prefix}GasSave`).addEventListener('click', () => {
            const url = $(`${prefix}GasUrl`).value.trim();
            if (url && url.startsWith('https://script.google.com/')) {
                localStorage.setItem('writepass-gas-url', url);
                container.innerHTML = '<div class="result-banner success fade-in"><span class="material-symbols-rounded">check_circle</span> 保存しました！もう一度「AI採点」を押してください。</div>';
            } else {
                container.innerHTML = '<div class="result-banner error fade-in"><span class="material-symbols-rounded">error</span> 正しいGoogle Apps Script URLを入力してください。</div>';
            }
        });
    }

    // ===== CHECKLIST =====
    function initChecklist() {
        $('step2Checklist').querySelectorAll('.check-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('checked');
                const icon = item.querySelector('.material-symbols-rounded');
                icon.style.display = item.classList.contains('checked') ? '' : 'none';
            });
        });
    }

    function resetChecklist() {
        const checklist = $('step2Checklist');
        if (checklist) {
            checklist.querySelectorAll('.check-item').forEach(item => {
                item.classList.remove('checked');
                item.querySelector('.material-symbols-rounded').style.display = 'none';
            });
        }
    }

    // ===== TIMER =====
    function initTimer() {
        $('timerStart').addEventListener('click', startTimer);
        $('timerPause').addEventListener('click', pauseTimer);
        $('timerReset').addEventListener('click', resetTimer);
    }

    function startTimer() {
        if (timerRunning) return;
        timerRunning = true;
        $('timerStart').style.display = 'none';
        $('timerPause').style.display = '';

        timerInterval = setInterval(() => {
            timerSeconds--;
            if (timerSeconds <= 0) {
                timerSeconds = 0;
                pauseTimer();
            }
            updateTimerDisplay();
        }, 1000);
    }

    function pauseTimer() {
        timerRunning = false;
        clearInterval(timerInterval);
        $('timerStart').style.display = '';
        $('timerStart').innerHTML = '<span class="material-symbols-rounded" style="font-size:16px;vertical-align:middle">play_arrow</span> 再開';
        $('timerPause').style.display = 'none';
    }

    function resetTimer() {
        pauseTimer();
        timerSeconds = WP_TIMER_SEC;
        $('timerStart').innerHTML = '<span class="material-symbols-rounded" style="font-size:16px;vertical-align:middle">play_arrow</span> スタート';
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        const m = Math.floor(timerSeconds / 60);
        const s = timerSeconds % 60;
        const val = $('timerValue');
        val.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

        // Progress
        const pct = timerSeconds / WP_TIMER_SEC * 100;
        $('timerProgressFill').style.width = pct + '%';

        // Warning states
        val.classList.remove('warning', 'danger');
        if (timerSeconds <= 60) val.classList.add('danger');
        else if (timerSeconds <= 180) val.classList.add('warning');
    }

    // ===== INIT =====
    function init() {
        // URLパラメータからテーマを自動選択
        const params = new URLSearchParams(window.location.search);
        const themeParam = params.get('theme');
        if (themeParam) {
            const themeId = parseInt(themeParam);
            if (THEMES.some(t => t.id === themeId)) {
                currentThemeId = themeId;
            }
        }

        initThemeToggle();
        initStepNav();
        renderThemeSelector();
        initStep1Buttons();
        initWordCounters();
        initModelAnswerButtons();
        initChecklist();
        initTimer();
        renderStep1();

        // GAS URL indicator
        if (GAS_URL || localStorage.getItem('writepass-gas-url')) {
            document.querySelectorAll('.ai-grade-btn').forEach(btn => {
                btn.title = 'AI採点 (接続済み)';
            });
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
