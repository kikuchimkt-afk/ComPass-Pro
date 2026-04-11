// ComPass Pro — Eメール問題 専用ロジック
(function () {
    'use strict';

    // ===== CONFIG =====
    const GAS_URL = localStorage.getItem('writepass-gas-url') || 'https://script.google.com/macros/s/AKfycbxRyQIL6e1Tdg3aVWg10BoY5KGafKm1SYci8Voouxg9GEn7wnOGT0NUgxNr0sBUjXY0Tw/exec';
    const WP_MIN_WORDS = WRITEPASS_CONFIG.minWords || 40;
    const WP_MAX_WORDS = WRITEPASS_CONFIG.maxWords || 50;
    const WP_TIMER_SEC = (WRITEPASS_CONFIG.timerMinutes || 15) * 60;

    // ===== STATE =====
    let currentStep = 1;
    let currentThemeId = 1;
    let selectedOpinion = null;
    let selectedReason = null;
    let selectedQ1 = null;
    let selectedQ2 = null;
    let timerInterval = null;
    let timerSeconds = WP_TIMER_SEC;
    let timerRunning = false;
    let showJa = false;
    let isGrading = false;
    let lastGradeData = {};
    let transDrillIndex = 0;
    let transDrillChecked = false;

    // ===== HELPERS =====
    function getTheme() { return EMAIL_THEMES.find(t => t.id === currentThemeId) || EMAIL_THEMES[0]; }
    function getSenderName(theme) { return (theme && theme.senderName) || 'Alex'; }
    function countWords(text) { return text.trim().split(/\s+/).filter(w => w.length > 0).length; }
    function $(id) { return document.getElementById(id); }
    function escapeHtml(text) { return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ===== THEME TOGGLE =====
    function initThemeToggle() {
        const toggle = $('themeToggle');
        const saved = localStorage.getItem('writepass-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        toggle.querySelector('.material-symbols-rounded').textContent = saved === 'dark' ? 'light_mode' : 'dark_mode';
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('writepass-theme', next);
            toggle.querySelector('.material-symbols-rounded').textContent = next === 'dark' ? 'light_mode' : 'dark_mode';
        });
    }

    // ===== JA TOGGLE =====
    function initJaToggle() {
        const btn = $('jaToggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            showJa = !showJa;
            document.querySelectorAll('.email-ja').forEach(el => {
                el.classList.toggle('hidden', !showJa);
            });
            btn.querySelector('.material-symbols-rounded').textContent = showJa ? 'visibility_off' : 'translate';
        });
    }

    // ===== STEP NAV =====
    function initStepNav() {
        document.querySelectorAll('.step-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                const step = parseInt(tab.dataset.step);
                if (step) switchStep(step);
            });
        });
    }

    function switchStep(step) {
        currentStep = step;
        document.querySelectorAll('.step-btn').forEach(t => t.classList.toggle('active', parseInt(t.dataset.step) === step));
        document.querySelectorAll('.step-pane').forEach(c => {
            c.classList.toggle('active', c.id === 'step' + step);
        });
        renderCurrentStep();
    }

    // ===== THEME SELECTOR =====
    function renderThemeSelector() {
        const container = $('themeSelector');
        if (!container) return;
        container.innerHTML = `
            <div class="theme-select-row">
                <select class="theme-select" id="themeSelect">
                    ${[...EMAIL_THEMES].sort((a, b) => a.exam.localeCompare(b.exam)).map(t =>
                        `<option value="${t.id}" ${t.id === currentThemeId ? 'selected' : ''}>${t.title}　${t.exam}</option>`
                    ).join('')}
                </select>
                <button class="print-btn" id="printBtn" title="問題用紙を印刷">
                    <span class="material-symbols-rounded">print</span>
                </button>
                <button class="print-btn" id="jaToggle" title="日本語訳表示">
                    <span class="material-symbols-rounded">translate</span>
                </button>
            </div>
        `;
        $('themeSelect').addEventListener('change', () => {
            currentThemeId = parseInt($('themeSelect').value);
            resetSelections();
            renderCurrentStep();
        });
        $('printBtn').addEventListener('click', () => printWorksheet());
        // Re-init JA toggle
        initJaToggle();
    }

    // ===== PRINT WORKSHEET =====
    function printWorksheet() {
        const theme = getTheme();
        const gradeLabel = WRITEPASS_CONFIG.gradeLabel || '準2級';
        const taskLabel = WRITEPASS_CONFIG.taskLabel || 'Eメール';
        const minWords = WP_MIN_WORDS;
        const maxWords = WP_MAX_WORDS;
        const wordsPerRow = 10;
        const totalRows = Math.ceil(maxWords * 1.3 / wordsPerRow);

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

        // 下線語句を太字にする
        const emailText = theme.alexEmail.replace(
            new RegExp(theme.underlinedTopic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
            match => `<strong class="underline">${match}</strong>`
        );

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
.email-box { font-size: 10.5pt; line-height: 1.8; border: 2px solid #000; padding: 14px 18px; margin-bottom: 12px; }
.email-box .underline { text-decoration: underline; font-weight: bold; }
.email-from { font-size: 9pt; color: #666; margin-bottom: 8px; font-style: italic; }
.opinion-q { margin-top: 12px; padding-top: 10px; border-top: 1px dashed #999; font-weight: bold; }

/* QR code */
.qr-section { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px 12px; border: 1px solid #ccc; background: #fafafa; }
.qr-container { flex-shrink: 0; width: 80px; height: 80px; }
.qr-container canvas, .qr-container img { width: 80px !important; height: 80px !important; }
.qr-text { font-size: 9pt; line-height: 1.5; color: #333; }

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

.reply-template { margin-top: 10px; font-size: 10pt; line-height: 1.6; color: #666; }
.reply-template span { color: #000; font-weight: bold; }

@media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
</head>
<body>

<!-- ===== PAGE 1: 問題 ===== -->
<div class="page">
    <div class="header">
        <span class="header-title">英語資格検定${gradeLabel} ${taskLabel}</span>
        <span class="header-meta">${theme.title}（${theme.exam}）</span>
    </div>

    <div class="qr-section">
        <div class="qr-container" id="qrCode" data-url="${qrUrl}"></div>
        <div class="qr-text">📱 QRコードをスマホ・タブレットで読み取って学習しましょう<br><strong>ComPass Pro</strong> でStep 1〜3の練習ができます</div>
    </div>

    <div class="instructions">
        <p>Read the e-mail below from ${getSenderName(theme)}, your friend in another country.</p>
        <p>Write a reply to ${getSenderName(theme)}'s e-mail.</p>
        <p>Include two of the following: a question, your opinion and a reason for your opinion.</p>
        <p>Suggested length: ${minWords}–${maxWords} words</p>
        <p>Write your reply in the space provided on the answer sheet. <span class="underline">Any writing outside the space will not be graded.</span></p>
    </div>

    <div class="passage-label">E-mail from ${getSenderName(theme)}</div>
    <div class="email-box">
        <div class="email-from">From: ${getSenderName(theme)}</div>
        ${emailText}
    </div>

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

    <div class="reply-template">
        <span>Hi, ${getSenderName(theme)}!</span><br>
        Thank you for your e-mail.
    </div>

    <div class="answer-subtitle" style="margin-top: 12px;">E-mail Reply（目安: ${minWords}〜${maxWords}語）</div>

    <div class="answer-grid">
        ${answerRows.join('\n        ')}
    </div>

    <div class="reply-template">
        <span>Best wishes,</span>
    </div>

    <div class="word-count-guide">
        <span class="target-range">目安語数: ${minWords}–${maxWords} words</span>
    </div>

    <div class="footer">© ECCベストワン藍住：北島中央</div>
</div>

</body>
</html>`;

        const printWin = window.open('', '_blank');
        printWin.document.write(printHtml);
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
    function resetSelections() {
        selectedOpinion = null;
        selectedReason = null;
        selectedQ1 = null;
        selectedQ2 = null;
        transDrillIndex = 0;
        transDrillChecked = false;
        if ($('step2Writing')) $('step2Writing').value = '';
        if ($('step3Writing')) $('step3Writing').value = '';
        if ($('step2ModelAnswer')) $('step2ModelAnswer').style.display = 'none';
        if ($('step3ModelAnswer')) $('step3ModelAnswer').style.display = 'none';
        if ($('step2GradeResult')) $('step2GradeResult').style.display = 'none';
        if ($('step3GradeResult')) $('step3GradeResult').style.display = 'none';
        if ($('step2ImagePreview')) { $('step2ImagePreview').style.display = 'none'; $('step2ImagePreview').innerHTML = ''; }
        if ($('step3ImagePreview')) { $('step3ImagePreview').style.display = 'none'; $('step3ImagePreview').innerHTML = ''; }
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

    // ===== STEP 1: テンプレート学習 =====
    function renderStep1() {
        const theme = getTheme();
        renderEmailDisplay(theme);
        renderTemplateGuide(theme);
        renderPartBuilder(theme);
    }

    function renderEmailDisplay(theme) {
        const container = $('emailDisplay');
        // 下線部を強調表示
        const emailHtml = theme.alexEmail.replace(
            new RegExp(`(${theme.underlinedTopic})`, 'i'),
            '<span class="email-underline">$1</span>'
        );
        container.innerHTML = `
            <div class="email-card">
                <div class="email-header">
                    <span class="material-symbols-rounded" style="color:var(--color-intro)">mail</span>
                    <span>From: ${getSenderName(theme)}</span>
                </div>
                <div class="email-body">${emailHtml}</div>
                <div class="email-ja ${showJa ? '' : 'hidden'}" style="margin-top:12px;padding:12px;background:rgba(var(--accent-rgb),0.05);border-radius:8px;font-size:0.82rem;line-height:1.7;color:var(--text-secondary)">${theme.alexEmailJa}</div>
            </div>
        `;
    }

    function renderTemplateGuide(theme) {
        const container = $('templateGuide');
        container.innerHTML = `
            <div class="template-steps">
                <div class="template-step" style="border-left-color:#22c55e">
                    <div class="template-step-label" style="color:#22c55e">1. 挨拶</div>
                    <div class="template-step-text">Hi, ${getSenderName(theme)}!</div>
                </div>
                <div class="template-step" style="border-left-color:#94a3b8">
                    <div class="template-step-label" style="color:#94a3b8">2. 書き出し（定型文）</div>
                    <div class="template-step-text">Thank you for your e-mail.</div>
                </div>
                <div class="template-step" style="border-left-color:#3b82f6">
                    <div class="template-step-label" style="color:#3b82f6">3. 意見質問への回答</div>
                    <div class="template-step-text">I think <span class="template-blank">[意見]</span>.
                    <span class="template-blank">[理由・詳細]</span>.</div>
                </div>
                <div class="template-step" style="border-left-color:#ef4444">
                    <div class="template-step-label" style="color:#ef4444">4. 下線部への2つの質問 ★重要★</div>
                    <div class="template-step-text">I have two questions about <span class="template-blank">${theme.underlinedTopic}</span>.<br/>
                    <span class="template-blank">[質問1]</span>?<br/>
                    <span class="template-blank">[質問2]</span>?</div>
                </div>
                <div class="template-step" style="border-left-color:#22c55e">
                    <div class="template-step-label" style="color:#22c55e">5. 結び</div>
                    <div class="template-step-text">Best wishes,</div>
                </div>
            </div>
        `;
    }

    function renderPartBuilder(theme) {
        const container = $('partBuilder');

        // 意見選択
        const opinionKeys = Object.keys(theme.opinions);
        const opinionHtml = opinionKeys.map(key => {
            const op = theme.opinions[key];
            return `<button class="part-option ${selectedOpinion === key ? 'selected' : ''}" data-type="opinion" data-key="${key}">
                <div class="part-option-ja">${op.ja}</div>
                <div class="part-option-en">${op.text}</div>
                <div class="part-option-ja-text email-ja ${showJa ? '' : 'hidden'}">${op.jaText}</div>
            </button>`;
        }).join('');

        // 理由選択
        const reasonItems = selectedOpinion === 'disagree' ? theme.negativeReasons : theme.reasons;
        const reasonHtml = reasonItems.map((r, i) => `
            <button class="part-option ${selectedReason === i ? 'selected' : ''}" data-type="reason" data-key="${i}">
                <div class="part-option-ja">${r.ja}</div>
                <div class="part-option-en">${r.text}</div>
                <div class="part-option-ja-text email-ja ${showJa ? '' : 'hidden'}">${r.jaText}</div>
            </button>
        `).join('');

        // 質問選択
        const questionHtml = theme.questions.map((q, i) => `
            <button class="part-option ${selectedQ1 === i ? 'selected q1' : ''} ${selectedQ2 === i ? 'selected q2' : ''}" data-type="question" data-key="${i}">
                <div class="part-option-ja">${q.ja}</div>
                <div class="part-option-en">${q.text}?</div>
                <div class="part-option-ja-text email-ja ${showJa ? '' : 'hidden'}">${q.jaText}</div>
            </button>
        `).join('');

        container.innerHTML = `
            <div class="builder-section">
                <h4 class="builder-label" style="color:#3b82f6">
                    <span class="material-symbols-rounded">chat</span>
                    意見を選ぶ
                </h4>
                <div class="builder-options">${opinionHtml}</div>
            </div>

            <div class="builder-section">
                <h4 class="builder-label" style="color:#f59e0b">
                    <span class="material-symbols-rounded">lightbulb</span>
                    理由を選ぶ${selectedOpinion === 'disagree' ? '（反対の理由）' : ''}
                </h4>
                <div class="builder-options">${reasonHtml}</div>
            </div>

            <div class="builder-section">
                <h4 class="builder-label" style="color:#ef4444">
                    <span class="material-symbols-rounded">help</span>
                    質問を2つ選ぶ（${theme.underlinedTopic}について）
                </h4>
                <div class="builder-options">${questionHtml}</div>
            </div>
        `;

        // Preview
        renderPreview(theme);

        // Event listeners
        container.querySelectorAll('.part-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                const key = btn.dataset.key;
                if (type === 'opinion') {
                    selectedOpinion = key;
                    selectedReason = null; // Reset reason when opinion changes
                } else if (type === 'reason') {
                    selectedReason = parseInt(key);
                } else if (type === 'question') {
                    const idx = parseInt(key);
                    if (selectedQ1 === idx) { selectedQ1 = null; }
                    else if (selectedQ2 === idx) { selectedQ2 = null; }
                    else if (selectedQ1 === null) { selectedQ1 = idx; }
                    else if (selectedQ2 === null) { selectedQ2 = idx; }
                    else { selectedQ1 = selectedQ2; selectedQ2 = idx; }
                }
                renderPartBuilder(theme);
            });
        });
    }

    function renderPreview(theme) {
        const container = $('emailPreview');
        const parts = [];

        const sn = getSenderName(theme);
        parts.push(`<span class="preview-fixed">Hi, ${sn}!</span>`);
        parts.push('<span class="preview-fixed">Thank you for your e-mail.</span>');

        if (selectedOpinion) {
            const op = theme.opinions[selectedOpinion];
            parts.push(`<span class="preview-opinion">I think ${op.text}.</span>`);
        } else {
            parts.push('<span class="preview-blank">[意見を選んでください]</span>');
        }

        if (selectedReason !== null) {
            const items = selectedOpinion === 'disagree' ? theme.negativeReasons : theme.reasons;
            parts.push(`<span class="preview-reason">${items[selectedReason].text}.</span>`);
        } else {
            parts.push('<span class="preview-blank">[理由を選んでください]</span>');
        }

        parts.push(`<span class="preview-fixed">I have two questions about ${theme.underlinedTopic}.</span>`);

        if (selectedQ1 !== null) {
            parts.push(`<span class="preview-question">${theme.questions[selectedQ1].text}?</span>`);
        } else {
            parts.push('<span class="preview-blank">[質問1を選んでください]</span>');
        }

        if (selectedQ2 !== null) {
            parts.push(`<span class="preview-question">${theme.questions[selectedQ2].text}?</span>`);
        } else {
            parts.push('<span class="preview-blank">[質問2を選んでください]</span>');
        }

        parts.push('<span class="preview-fixed">Best wishes,</span>');

        // 組み立てた文をカウント
        const fullText = [
            `Hi, ${getSenderName(theme)}!`,
            'Thank you for your e-mail.',
            selectedOpinion ? `I think ${theme.opinions[selectedOpinion].text}.` : '',
            selectedReason !== null ? `${(selectedOpinion === 'disagree' ? theme.negativeReasons : theme.reasons)[selectedReason].text}.` : '',
            `I have two questions about ${theme.underlinedTopic}.`,
            selectedQ1 !== null ? `${theme.questions[selectedQ1].text}?` : '',
            selectedQ2 !== null ? `${theme.questions[selectedQ2].text}?` : '',
            'Best wishes,'
        ].filter(Boolean).join(' ');
        const wc = countWords(fullText);

        container.innerHTML = `
            <div class="email-preview-content">${parts.join('<br/>')}</div>
            <div class="preview-word-count" style="margin-top:12px;font-size:0.82rem;color:var(--text-secondary)">
                組み立て語数: <span style="font-weight:700;color:${wc >= WP_MIN_WORDS && wc <= WP_MAX_WORDS ? 'var(--color-merit)' : wc > WP_MAX_WORDS ? '#ef4444' : 'var(--text-secondary)'}">${wc}語</span>
                / ${WP_MIN_WORDS}〜${WP_MAX_WORDS}語
            </div>
        `;

        // Copy to Step 2 writing area if all parts are selected
        if (selectedOpinion && selectedReason !== null && selectedQ1 !== null && selectedQ2 !== null) {
            const reasonItems = selectedOpinion === 'disagree' ? theme.negativeReasons : theme.reasons;
            const built = `Hi, ${getSenderName(theme)}!\nThank you for your e-mail. I think ${theme.opinions[selectedOpinion].text}. ${reasonItems[selectedReason].text}. I have two questions about ${theme.underlinedTopic}. ${theme.questions[selectedQ1].text}? ${theme.questions[selectedQ2].text}?\nBest wishes,`;
            if ($('step2Writing') && !$('step2Writing').value) {
                $('step2Writing').value = built;
                updateWordCounter('step2');
            }
        }
    }

    // ===== STEP 2: 練習 =====
    function renderStep2() {
        const theme = getTheme();
        renderEmailDisplay2(theme);
        renderChunkExercise(theme);
        renderTransDrill(theme);
        renderGuidedHints(theme);
        updateWordCounter('step2');
    }

    function renderEmailDisplay2(theme) {
        const container = $('step2EmailDisplay');
        if (!container) return;
        const emailHtml = theme.alexEmail.replace(
            new RegExp(`(${theme.underlinedTopic})`, 'i'),
            '<span class="email-underline">$1</span>'
        );
        container.innerHTML = `
            <div class="email-card" style="font-size:0.88rem">
                <div class="email-header">
                    <span class="material-symbols-rounded" style="color:var(--color-intro)">mail</span>
                    <span>From: ${getSenderName(theme)}</span>
                </div>
                <div class="email-body">${emailHtml}</div>
            </div>
        `;
    }

    function renderChunkExercise(theme) {
        const container = $('step2Chunks');
        if (!container) return;

        // Build chunk exercises
        const exercises = [];
        if (theme.chunks && theme.chunks.length > 0) {
            // Direct chunks array (3級 etc.) — use as-is
            theme.chunks.forEach(c => exercises.push({
                sentenceJa: c.sentenceJa,
                answer: c.answer,
                pieces: [...c.pieces]
            }));
        } else {
            // Auto-generate from opinions/reasons/questions (準2級)
            const agreeOp = theme.opinions.agree;
            exercises.push({
                sentenceJa: agreeOp.jaText,
                answer: `I think ${agreeOp.text}.`,
                pieces: ['I think', ...agreeOp.chunks, '.']
            });
            if (theme.reasons.length > 0) {
                const r = theme.reasons[0];
                exercises.push({
                    sentenceJa: r.jaText,
                    answer: `${r.text}.`,
                    pieces: [...r.chunks, '.']
                });
            }
            if (theme.questions.length > 0) {
                const q = theme.questions[0];
                exercises.push({
                    sentenceJa: q.jaText,
                    answer: `${q.text}?`,
                    pieces: [...q.chunks, '?']
                });
            }
        }

        let currentIdx = 0;
        let chunkAnswers = [];

        function renderChunk(idx) {
            // Update progress
            const progressBar = $('step2Progress');
            const progressText = $('step2ProgressText');
            if (progressBar) progressBar.style.width = (idx / exercises.length * 100) + '%';
            if (progressText) progressText.textContent = `${Math.min(idx + 1, exercises.length)} / ${exercises.length}`;

            if (idx >= exercises.length) {
                container.innerHTML = `
                    <div class="score-display">
                        <div class="score-num">${chunkAnswers.filter(Boolean).length} / ${exercises.length}</div>
                        <div class="score-label">チャンク並べ替え完了！</div>
                    </div>
                    <div class="btn-group" style="justify-content:center">
                        <button class="btn btn-secondary" id="step2ChunkReset">
                            <span class="material-symbols-rounded">refresh</span> もう一度
                        </button>
                    </div>
                `;
                $('step2ChunkReset').addEventListener('click', () => {
                    chunkAnswers = [];
                    renderChunk(0);
                });
                if (progressBar) progressBar.style.width = '100%';
                if (progressText) progressText.textContent = `${exercises.length} / ${exercises.length}`;
                return;
            }

            const chunk = exercises[idx];
            const shuffled = shuffleArray(chunk.pieces);
            let placed = [];
            let checked = false;

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

            const pool = $('chunkPool');
            const dropzone = $('chunkDropzone');
            const checkBtn = $('chunkCheckBtn');

            pool.querySelectorAll('.chunk-piece').forEach(piece => {
                piece.addEventListener('click', () => {
                    if (checked) return;
                    placed.push(piece.dataset.text);
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
                            const pidx = parseInt(p.dataset.placed);
                            const text = placed[pidx];
                            placed.splice(pidx, 1);
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

                const userAnswer = placed.join(' ').replace(/ \./g, '.').replace(/ \?/g, '?');
                const correct = userAnswer === chunk.answer;
                chunkAnswers.push(correct);

                dropzone.classList.remove('active');
                dropzone.classList.add(correct ? 'correct' : 'wrong');
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
                    renderChunk(idx + 1);
                });
            });
        }

        renderChunk(0);
    }

    // ===== 日→英 変換ドリル =====
    function renderTransDrill(theme) {
        const sentences = theme.transDrillSentences;
        if (!sentences || sentences.length === 0) return;
        const container = $('transDrill');
        if (!container) return;

        const pFill = $('transDrillProgress');
        const pText = $('transDrillProgressText');
        if (pFill) pFill.style.width = `${(Math.min(transDrillIndex + 1, sentences.length) / sentences.length) * 100}%`;
        if (pText) pText.textContent = `${Math.min(transDrillIndex + 1, sentences.length)} / ${sentences.length}`;

        if (transDrillIndex >= sentences.length) {
            container.innerHTML = `
                <div class="result-banner success" style="margin-top:8px">
                    <span class="material-symbols-rounded">check_circle</span>
                    全${sentences.length}文 完了！🎉
                </div>`;
            return;
        }

        const s = sentences[transDrillIndex];
        transDrillChecked = false;
        const hintWords = s.literalJa || '';

        container.innerHTML = `
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                <span style="background:var(--accent-primary);color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700">${transDrillIndex + 1}</span>
                <span style="font-size:0.82rem;color:var(--text-secondary)">${sentences.length}文中 ${transDrillIndex + 1}文目</span>
            </div>
            <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:2px">日本語</div>
            <div style="font-size:1rem;font-weight:700;margin-bottom:8px;border-left:3px solid var(--accent-primary);padding-left:10px">${escapeHtml(s.sentenceJa)}</div>
            <button class="btn btn-outline" id="transDrillHintBtn" style="margin-bottom:8px;color:var(--warning)">
                <span class="material-symbols-rounded" style="font-size:16px">lightbulb</span> ヒントを見る（英語の語順）
            </button>
            <textarea class="writing-area" id="transDrillInput" rows="2"
                placeholder="英語で書いてみましょう..."></textarea>
            <div class="btn-group" style="margin-top:8px">
                <button class="btn btn-primary" id="transDrillCheck">
                    <span class="material-symbols-rounded">check</span> 確認
                </button>
            </div>
            <div id="transDrillResult"></div>
        `;

        $('transDrillHintBtn').addEventListener('click', () => {
            $('transDrillHintBtn').innerHTML = `<span class="material-symbols-rounded" style="font-size:16px">lightbulb</span> ${escapeHtml(hintWords)}`;
            $('transDrillHintBtn').disabled = true;
        });

        $('transDrillCheck').addEventListener('click', async () => {
            if (transDrillChecked) return;
            const userAnswer = $('transDrillInput').value.trim();
            if (!userAnswer) return;
            transDrillChecked = true;

            const checkBtn = $('transDrillCheck');
            checkBtn.disabled = true;
            checkBtn.innerHTML = '<span class="material-symbols-rounded">hourglass_top</span> 採点中...';

            const resultDiv = $('transDrillResult');

            // Try AI grading
            if (GAS_URL) {
                try {
                    const response = await fetch(GAS_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify({
                            action: 'gradeSentence',
                            sentenceJa: s.sentenceJa,
                            modelAnswer: s.answer,
                            studentAnswer: userAnswer,
                            gradeLabel: WRITEPASS_CONFIG.gradeLabel || '準2級'
                        })
                    });
                    const data = await response.json();
                    if (data.success && data.result) {
                        const r = data.result;
                        const scoreColor = r.totalScore >= 80 ? '#22c55e' : r.totalScore >= 50 ? '#f59e0b' : '#ef4444';
                        resultDiv.innerHTML = `
                            <div style="margin-top:12px;padding:12px;background:rgba(${scoreColor === '#22c55e' ? '34,197,94' : scoreColor === '#f59e0b' ? '245,158,11' : '239,68,68'},0.08);border:1px solid ${scoreColor};border-radius:8px">
                                <div style="font-size:1.1rem;font-weight:700;color:${scoreColor};margin-bottom:6px">
                                    スコア: ${r.totalScore} / 100
                                </div>
                                ${r.teacherFeedback ? `<div style="font-size:0.85rem;margin-bottom:6px">💬 ${escapeHtml(r.teacherFeedback)}</div>` : ''}
                                ${r.corrected ? `<div style="font-size:0.85rem;margin-bottom:4px">✏️ <strong>修正文:</strong> <span style="color:#22c55e">${escapeHtml(r.corrected)}</span></div>` : ''}
                                ${r.natural ? `<div style="font-size:0.85rem;margin-bottom:4px">🌟 <strong>より自然な表現:</strong> ${escapeHtml(r.natural)}</div>` : ''}
                            </div>
                            <div style="margin-top:8px;padding:8px 12px;background:var(--bg-secondary);border-radius:6px;border:1px solid var(--border)">
                                <div style="font-size:0.75rem;font-weight:600;color:var(--text-secondary);margin-bottom:4px">模範解答</div>
                                <div style="font-size:0.92rem;color:#22c55e;font-weight:600">${escapeHtml(s.answer)}</div>
                            </div>
                            <div class="btn-group" style="margin-top:10px">
                                <button class="btn btn-primary" id="transDrillNext">
                                    <span class="material-symbols-rounded">arrow_forward</span>
                                    ${transDrillIndex + 1 < sentences.length ? '次の文へ' : '完了'}
                                </button>
                            </div>
                        `;
                        $('transDrillInput').readOnly = true;
                        $('transDrillNext').addEventListener('click', () => {
                            transDrillIndex++;
                            renderTransDrill(getTheme());
                        });
                        return;
                    }
                } catch (e) {
                    console.warn('AI grading failed, falling back to local:', e);
                }
            }

            // Fallback: local comparison
            const normalize = t => t.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
            const match = normalize(userAnswer) === normalize(s.answer);
            const similarity = (() => {
                const a = normalize(userAnswer).split(' ');
                const b = normalize(s.answer).split(' ');
                let hits = 0;
                b.forEach(w => { if (a.includes(w)) hits++; });
                return Math.round((hits / Math.max(b.length, 1)) * 100);
            })();
            const simColor = match ? '#22c55e' : similarity >= 60 ? '#f59e0b' : '#ef4444';
            resultDiv.innerHTML = `
                <div class="result-banner ${match ? 'success' : 'error'}" style="margin-top:8px">
                    <span class="material-symbols-rounded">${match ? 'check_circle' : 'cancel'}</span>
                    一致率: ${similarity}%
                </div>
                <div style="margin-top:8px;padding:8px 12px;background:var(--bg-secondary);border-radius:6px;border:1px solid var(--border)">
                    <div style="font-size:0.75rem;font-weight:600;color:var(--text-secondary);margin-bottom:4px">模範解答</div>
                    <div style="font-size:0.92rem;color:#22c55e;font-weight:600">${escapeHtml(s.answer)}</div>
                </div>
                <div class="btn-group" style="margin-top:10px">
                    <button class="btn btn-primary" id="transDrillNext">
                        <span class="material-symbols-rounded">arrow_forward</span>
                        ${transDrillIndex + 1 < sentences.length ? '次の文へ' : '完了'}
                    </button>
                </div>
            `;
            $('transDrillInput').readOnly = true;
            $('transDrillNext').addEventListener('click', () => {
                transDrillIndex++;
                renderTransDrill(getTheme());
            });
        });

        $('transDrillInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                $('transDrillCheck').click();
            }
        });
    }

    // ===== ガイド付きヒント描画 =====
    function renderGuidedHints(theme) {
        const container = $('step2Hints');
        if (!container) return;
        const hints = theme.guidedHints;
        if (!hints || hints.length === 0) return;

        const colors = ['#6366f1', '#f59e0b', '#ef4444', '#ec4899'];
        container.innerHTML = hints.map((h, i) => `
            <div style="padding:8px 12px;border-left:3px solid ${colors[i % colors.length]};border-radius:0 6px 6px 0;background:rgba(255,255,255,0.02);margin-bottom:6px">
                <div style="font-size:0.72rem;font-weight:700;color:${colors[i % colors.length]};margin-bottom:2px">${h.label}</div>
                <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:4px">${escapeHtml(h.hintJa)}</div>
                <details style="font-size:0.82rem">
                    <summary style="cursor:pointer;color:var(--accent-primary)">模範文を見る</summary>
                    <div style="margin-top:4px;color:#22c55e;font-weight:600">${escapeHtml(h.modelSentence)}</div>
                </details>
            </div>
        `).join('');
    }

    // ===== STEP 3: 本番 =====
    function renderStep3() {
        const theme = getTheme();
        renderStep3Email(theme);
        updateWordCounter('step3');
    }

    function renderStep3Email(theme) {
        const container = $('step3EmailDisplay');
        if (!container) return;
        const emailHtml = theme.alexEmail.replace(
            new RegExp(`(${theme.underlinedTopic})`, 'i'),
            '<span class="email-underline">$1</span>'
        );
        container.innerHTML = `
            <div class="email-card" style="font-size:0.88rem">
                <div class="email-header">
                    <span class="material-symbols-rounded" style="color:var(--color-intro)">mail</span>
                    <span>From: ${getSenderName(theme)}</span>
                </div>
                <div class="email-body">${emailHtml}</div>
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
                    <div class="text-en" style="white-space:pre-line">${theme.modelAnswer}</div>
                    <div class="text-ja" style="white-space:pre-line">${theme.modelAnswerJa}</div>
                    <div style="margin-top:8px;font-size:0.75rem;color:var(--text-secondary)">語数: ${countWords(theme.modelAnswer)}語</div>
                </div>
            `;
        });

        $('step3Submit').addEventListener('click', () => {
            const theme = getTheme();
            if (timerRunning) pauseTimer();
            $('step3ModelAnswer').style.display = '';
            $('step3ModelAnswer').innerHTML = `
                <div class="model-answer fade-in">
                    <div class="label">📝 模範解答</div>
                    <div class="text-en" style="white-space:pre-line">${theme.modelAnswer}</div>
                    <div class="text-ja" style="white-space:pre-line">${theme.modelAnswerJa}</div>
                    <div style="margin-top:8px;font-size:0.75rem;color:var(--text-secondary)">語数: ${countWords(theme.modelAnswer)}語</div>
                </div>
            `;
        });
    }

    // ===== IMAGE INPUT =====
    function initImageInputs() {
        ['step2', 'step3'].forEach(prefix => {
            const cameraBtn = $(prefix + 'CameraBtn');
            const cameraInput = $(prefix + 'CameraInput');
            const pasteBtn = $(prefix + 'PasteBtn');

            if (cameraBtn && cameraInput) {
                cameraBtn.addEventListener('click', () => cameraInput.click());
                cameraInput.addEventListener('change', (e) => {
                    if (e.target.files && e.target.files[0]) {
                        handleImageFile(e.target.files[0], prefix);
                    }
                });
            }

            if (pasteBtn) {
                pasteBtn.addEventListener('click', async () => {
                    try {
                        const clipboardItems = await navigator.clipboard.read();
                        for (const item of clipboardItems) {
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

    function handleImageFile(file, prefix) {
        const preview = $(prefix + 'ImagePreview');
        resizeImage(file, 1200, (base64, mimeType) => {
            preview.style.display = '';
            preview.innerHTML = `
                <div class="image-preview-card fade-in">
                    <img src="data:${mimeType};base64,${base64}" alt="入力画像">
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
                gradeWriting(prefix, base64, mimeType);
            });
            $(prefix + 'ImageClear').addEventListener('click', () => {
                preview.style.display = 'none';
                preview.innerHTML = '';
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

    // ===== AI GRADING =====
    function initAiGrading() {
        ['step2', 'step3'].forEach(prefix => {
            const btn = $(prefix + 'AiGrade');
            if (btn) {
                btn.addEventListener('click', () => gradeWriting(prefix));
            }
        });
    }

    async function gradeWriting(prefix, imageBase64, imageMimeType) {
        if (isGrading) return;

        const gasUrl = GAS_URL || localStorage.getItem('writepass-gas-url');
        if (!gasUrl) {
            showGasSetup(prefix);
            return;
        }

        const textarea = $(prefix + 'Writing');
        const studentAnswer = textarea.value.trim();

        if (!studentAnswer && !imageBase64) {
            showGradeError(prefix, 'Eメール返信を入力するか、写真を撮影してから採点してください。');
            return;
        }

        const theme = getTheme();

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
                passage: theme.alexEmail,
                passageJa: theme.alexEmailJa,
                modelAnswer: theme.modelAnswer,
                gradeId: WRITEPASS_CONFIG.gradeId || 'grade_pre2',
                taskType: WRITEPASS_CONFIG.taskType || 'Email_Reply'
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
                const answeredText = result.ocrText || studentAnswer;
                if (result.ocrText) {
                    textarea.value = result.ocrText;
                    updateWordCounter(prefix);
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
            printGradeBtn.addEventListener('click', () => window.print());
        }
    }

    function buildHighlightedText(studentAnswer, cat) {
        const highlights = cat.highlightTexts || [];
        if (highlights.length === 0) {
            return `<div class="highlight-text-display">${escapeHtml(studentAnswer)}</div>`;
        }

        const parsed = highlights.map(h => {
            if (h.startsWith('+')) return { text: h.substring(1).trim(), type: 'good' };
            if (h.startsWith('-')) return { text: h.substring(1).trim(), type: 'bad' };
            return { text: h.trim(), type: 'neutral' };
        }).filter(h => h.text.length > 0);

        let html = escapeHtml(studentAnswer);
        const sorted = [...parsed].sort((a, b) => b.text.length - a.text.length);

        sorted.forEach(h => {
            const escaped = escapeHtml(h.text);
            const regex = new RegExp(escaped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            html = html.replace(regex, match =>
                `<mark class="hl-${h.type}">${match}</mark>`
            );
        });

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
        const checklist = $('step2Checklist');
        if (!checklist) return;
        checklist.querySelectorAll('.check-item').forEach(item => {
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
        const progressFill = $('timerProgressFill');
        if (progressFill) progressFill.style.width = pct + '%';

        // Warning states
        val.classList.remove('warning', 'danger');
        if (timerSeconds <= 60) val.classList.add('danger');
        else if (timerSeconds <= 180) val.classList.add('warning');
    }

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', () => {
        // URLパラメータからテーマを自動選択
        const params = new URLSearchParams(window.location.search);
        const themeParam = params.get('theme');
        if (themeParam) {
            const themeId = parseInt(themeParam);
            if (EMAIL_THEMES.some(t => t.id === themeId)) {
                currentThemeId = themeId;
            }
        }

        initThemeToggle();
        initJaToggle();
        initStepNav();
        renderThemeSelector();
        initWordCounters();
        initModelAnswerButtons();
        initImageInputs();
        initAiGrading();
        initChecklist();
        initTimer();
        renderCurrentStep();

        // GAS URL indicator
        if (GAS_URL || localStorage.getItem('writepass-gas-url')) {
            document.querySelectorAll('.ai-grade-btn').forEach(btn => {
                btn.title = 'AI採点 (接続済み)';
            });
        }
    });

})();
