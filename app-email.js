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

    // ===== HELPERS =====
    function getTheme() { return EMAIL_THEMES.find(t => t.id === currentThemeId) || EMAIL_THEMES[0]; }
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
        const sel = $('themeSelect');
        sel.innerHTML = EMAIL_THEMES.map(t =>
            `<option value="${t.id}" ${t.id === currentThemeId ? 'selected' : ''}>${t.title}　${t.exam}</option>`
        ).join('');
        sel.addEventListener('change', () => {
            currentThemeId = parseInt(sel.value);
            resetSelections();
            renderCurrentStep();
        });
    }

    function resetSelections() {
        selectedOpinion = null;
        selectedReason = null;
        selectedQ1 = null;
        selectedQ2 = null;
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
                    <span>From: Alex</span>
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
                    <div class="template-step-text">Hi, Alex!</div>
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

        parts.push('<span class="preview-fixed">Hi, Alex!</span>');
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
            'Hi, Alex!',
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
            const built = `Hi, Alex!\nThank you for your e-mail. I think ${theme.opinions[selectedOpinion].text}. ${reasonItems[selectedReason].text}. I have two questions about ${theme.underlinedTopic}. ${theme.questions[selectedQ1].text}? ${theme.questions[selectedQ2].text}?\nBest wishes,`;
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
                    <span>From: Alex</span>
                </div>
                <div class="email-body">${emailHtml}</div>
            </div>
        `;
    }

    function renderChunkExercise(theme) {
        const container = $('step2Chunks');
        if (!container) return;
        // Build chunk exercises from opinions and questions
        const exercises = [];

        // Opinion chunk
        const agreeOp = theme.opinions.agree;
        exercises.push({
            sentenceJa: agreeOp.jaText,
            answer: `I think ${agreeOp.text}.`,
            pieces: ['I think', ...agreeOp.chunks, '.']
        });

        // Reason chunk  
        if (theme.reasons.length > 0) {
            const r = theme.reasons[0];
            exercises.push({
                sentenceJa: r.jaText,
                answer: `${r.text}.`,
                pieces: [...r.chunks, '.']
            });
        }

        // Question chunk
        if (theme.questions.length > 0) {
            const q = theme.questions[0];
            exercises.push({
                sentenceJa: q.jaText,
                answer: `${q.text}?`,
                pieces: [...q.chunks, '?']
            });
        }

        let currentIdx = 0;

        function renderChunk(idx) {
            if (idx >= exercises.length) {
                container.innerHTML = '<div class="chunk-complete fade-in" style="text-align:center;padding:24px;color:var(--color-merit)"><span class="material-symbols-rounded" style="font-size:48px">check_circle</span><div style="margin-top:8px;font-weight:700">全チャンク完了！</div></div>';
                return;
            }
            const chunk = exercises[idx];
            const shuffled = shuffleArray(chunk.pieces);
            let placed = [];

            container.innerHTML = `
                <div class="chunk-counter" style="text-align:right;font-size:0.75rem;color:var(--text-secondary)">${idx + 1} / ${exercises.length}</div>
                <div class="chunk-sentence-ja" style="padding:10px 14px;border-left:3px solid var(--color-intro);margin-bottom:12px;font-size:0.88rem;color:var(--text-secondary);line-height:1.6">${chunk.sentenceJa}</div>
                <div class="chunk-dropzone" id="chunkDropzone" style="min-height:48px;border:2px dashed var(--border);border-radius:8px;padding:12px;margin-bottom:12px;display:flex;flex-wrap:wrap;gap:6px;cursor:pointer"></div>
                <div class="chunk-pieces" id="chunkPieces" style="display:flex;flex-wrap:wrap;gap:6px"></div>
                <div class="chunk-feedback" id="chunkFeedback" style="margin-top:12px"></div>
            `;

            const dropzone = $('chunkDropzone');
            const piecesContainer = $('chunkPieces');

            function render() {
                dropzone.innerHTML = placed.length === 0 ? '<span style="font-size:0.82rem;color:var(--text-secondary);opacity:0.5">ここにチャンクを並べる</span>' :
                    placed.map((p, i) => `<span class="chunk-piece placed" data-placed="${i}">${p}</span>`).join('');
                piecesContainer.innerHTML = shuffled.filter(p => !placed.includes(p)).map(p =>
                    `<span class="chunk-piece" data-piece="${p}">${p}</span>`
                ).join('');

                // Click to add
                piecesContainer.querySelectorAll('.chunk-piece').forEach(el => {
                    el.addEventListener('click', () => {
                        placed.push(el.dataset.piece);
                        render();
                        checkChunk(chunk, placed, idx);
                    });
                });

                // Click to remove from dropzone
                dropzone.querySelectorAll('.chunk-piece.placed').forEach(el => {
                    el.addEventListener('click', () => {
                        placed.splice(parseInt(el.dataset.placed), 1);
                        render();
                    });
                });
            }

            render();
        }

        function checkChunk(chunk, placed, idx) {
            const fb = $('chunkFeedback');
            const built = placed.join(' ').replace(/ \./g, '.').replace(/ \?/g, '?');
            const answer = chunk.answer;

            if (placed.length < chunk.pieces.length) return;

            if (built === answer) {
                fb.innerHTML = `<div class="chunk-result correct fade-in" style="padding:12px;background:rgba(34,197,94,0.1);border-radius:8px;border-left:3px solid #22c55e">
                    <span style="color:#22c55e;font-weight:700">✅ 正解！</span>
                    <div style="margin-top:4px;font-size:0.85rem;color:var(--text-secondary)">${chunk.answer}</div>
                </div>`;
                setTimeout(() => renderChunk(idx + 1), 1500);
            } else {
                fb.innerHTML = `<div class="chunk-result wrong fade-in" style="padding:12px;background:rgba(239,68,68,0.1);border-radius:8px;border-left:3px solid #ef4444">
                    <span style="color:#ef4444;font-weight:700">❌ もう一度</span>
                    <div style="margin-top:4px;font-size:0.85rem;color:var(--text-secondary)">正解: ${chunk.answer}</div>
                </div>`;
            }
        }

        renderChunk(0);
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
                    <span>From: Alex</span>
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
