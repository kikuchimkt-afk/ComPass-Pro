// ComPass Pro — 3級 Eメール返信ロジック
// 3級専用: 受信メールの質問2つに回答する形式
// Step構成: 準2級プラス要約と同じ段階的学習（チャンク→日英変換→ガイド付き記述→本番）
(function () {
    'use strict';

    // ========== ユーティリティ ==========
    const $ = (id) => document.getElementById(id);
    const escapeHtml = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const countWords = (t) => t.trim().split(/\s+/).filter(w => w.length > 0).length;

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ========== 状態 ==========
    let currentThemeIndex = 0;
    let selectedQ1 = null;
    let selectedQ2 = null;
    let chunkIndex = 0;
    let transDrillIndex = 0;
    let transDrillChecked = false;
    let currentStep = 1;
    let timerInterval = null;
    let timerSeconds = 0;
    let timerRunning = false;
    let isGrading = false;

    // GAS URL（AI採点）
    const GAS_URL_KEY = 'writepass-gas-url';
    const getGasUrl = () => localStorage.getItem(GAS_URL_KEY) || 'https://script.google.com/macros/s/AKfycbxRyQIL6e1Tdg3aVWg10BoY5KGafKm1SYci8Voouxg9GEn7wnOGT0NUgxNr0sBUjXY0Tw/exec';
    const setGasUrl = (url) => localStorage.setItem(GAS_URL_KEY, url);

    const getTheme = () => EMAIL_THEMES[currentThemeIndex];

    // ========== テーマ切替（ダーク/ライト） ==========
    function initThemeToggle() {
        const btn = $('themeToggle');
        if (!btn) return;
        const saved = localStorage.getItem('writepass-theme') || 'dark';
        document.documentElement.dataset.theme = saved;
        btn.querySelector('.material-symbols-rounded').textContent =
            saved === 'dark' ? 'light_mode' : 'dark_mode';
        btn.addEventListener('click', () => {
            const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = next;
            localStorage.setItem('writepass-theme', next);
            btn.querySelector('.material-symbols-rounded').textContent =
                next === 'dark' ? 'light_mode' : 'dark_mode';
        });
    }

    // ========== 問題セレクター ==========
    function initThemeSelector() {
        const wrap = $('themeSelector');
        if (!wrap) return;

        const html = `
            <div class="theme-select-row">
                <select class="theme-select" id="themeSelect">
                    ${EMAIL_THEMES.map((t, i) =>
            `<option value="${i}"${i === currentThemeIndex ? ' selected' : ''}>${t.title}　${t.exam}</option>`
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
        wrap.innerHTML = html;

        $('themeSelect').addEventListener('change', () => {
            currentThemeIndex = parseInt($('themeSelect').value);
            resetAll();
            renderCurrentStep();
        });
        $('printBtn').addEventListener('click', () => printWorksheet());
        initJaToggle();
    }

    // ========== 日本語訳トグル ==========
    let showJa = false;
    function initJaToggle() {
        const btn = $('jaToggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
            showJa = !showJa;
            document.querySelectorAll('.email-ja').forEach(el => {
                el.classList.toggle('hidden', !showJa);
            });
            btn.querySelector('.material-symbols-rounded').textContent =
                showJa ? 'visibility_off' : 'translate';
        });
    }

    // ========== ステップナビゲーション ==========
    function initStepNav() {
        const nav = $('stepNav');
        if (!nav) return;
        nav.querySelectorAll('.step-btn').forEach(btn => {
            btn.addEventListener('click', () => switchStep(parseInt(btn.dataset.step)));
        });
    }

    function switchStep(step) {
        currentStep = step;
        document.querySelectorAll('.step-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.step) === step));
        document.querySelectorAll('.step-pane').forEach(p => p.classList.toggle('active', p.id === 'step' + step));
        renderCurrentStep();
    }

    // ========== リセット ==========
    function resetAll() {
        selectedQ1 = null;
        selectedQ2 = null;
        chunkIndex = 0;
        transDrillIndex = 0;
        transDrillChecked = false;
        ['step2', 'step3'].forEach(prefix => {
            const area = $(prefix + 'Writing');
            if (area) area.value = '';
            const model = $(prefix + 'ModelAnswer');
            if (model) model.style.display = 'none';
            const grade = $(prefix + 'GradeResult');
            if (grade) { grade.style.display = 'none'; grade.innerHTML = ''; }
            const img = $(prefix + 'ImagePreview');
            if (img) { img.style.display = 'none'; img.innerHTML = ''; }
        });
        const showBtn = $('step2ShowModel');
        if (showBtn) showBtn.style.display = '';
        const submitBtn = $('step3Submit');
        if (submitBtn) submitBtn.style.display = '';
        resetChecklist();
        resetTimer();
    }

    // ========== レンダリング ==========
    function renderCurrentStep() {
        if (currentStep === 1) renderStep1();
        else if (currentStep === 2) renderStep2();
        else if (currentStep === 3) renderStep3();
    }

    // ────── STEP 1: テンプレートを学ぶ ──────
    function renderStep1() {
        const theme = getTheme();
        renderEmailDisplay('emailDisplay', theme, true);
        renderTemplateGuide(theme);
        renderPartBuilder(theme);
        renderPreview(theme);
    }

    // メール表示
    function renderEmailDisplay(containerId, theme, withJa) {
        const el = $(containerId);
        if (!el) return;
        const emailHtml = theme.senderEmail.replace(/\n/g, '<br>');

        el.innerHTML = `
            <div class="email-card">
                <div class="email-header">
                    <span class="material-symbols-rounded" style="font-size:18px;color:var(--color-intro)">mail</span>
                    From: ${escapeHtml(theme.senderName)}
                </div>
                <div class="email-body">${emailHtml}</div>
            </div>
            ${withJa ? `<div class="email-ja ${showJa ? '' : 'hidden'}" style="margin-top:12px;padding:12px;background:rgba(var(--accent-rgb),0.05);border-radius:8px;font-size:0.82rem;line-height:1.7;color:var(--text-secondary)">${theme.senderEmailJa.replace(/\n/g, '<br>')}</div>` : ''}
        `;
    }

    // 返信テンプレート表示
    function renderTemplateGuide(theme) {
        const el = $('templateGuide');
        if (!el) return;

        el.innerHTML = `
            <div class="template-steps">
                <div class="template-step" style="border-color:#34d399">
                    <div class="template-step-label" style="color:#34d399">1. 挨拶</div>
                    <div class="template-step-text">Hi, ${escapeHtml(theme.senderName)}!</div>
                </div>
                <div class="template-step" style="border-color:#60a5fa">
                    <div class="template-step-label" style="color:#60a5fa">2. 書き出し（定型文）</div>
                    <div class="template-step-text">Thank you for your e-mail.</div>
                </div>
                <div class="template-step" style="border-color:#ef4444">
                    <div class="template-step-label" style="color:#ef4444">3. 質問への回答 ★ここが採点対象★</div>
                    <div class="template-step-text">
                        <span class="template-blank">[質問1への回答]</span>．
                        <span class="template-blank">[質問2への回答]</span>．
                        <span class="template-blank">[追加の一文（感想など）]</span>．
                    </div>
                </div>
                <div class="template-step" style="border-color:#a78bfa">
                    <div class="template-step-label" style="color:#a78bfa">4. 結び</div>
                    <div class="template-step-text">Best wishes,</div>
                </div>
            </div>
        `;
    }

    // パーツビルダー
    function renderPartBuilder(theme) {
        const el = $('partBuilder');
        if (!el) return;

        let html = '';

        // 質問1への回答
        html += `
            <div class="builder-section">
                <div class="builder-label" style="color:#ef4444">
                    <span class="material-symbols-rounded">question_answer</span>
                    質問1に答える（${escapeHtml(theme.question1Ja)}）
                </div>
                <div class="builder-options" id="q1Options">
        `;
        theme.answers1.forEach(a => {
            html += `
                <button class="part-option${selectedQ1 === a.id ? ' selected q1' : ''}" data-q="1" data-id="${a.id}">
                    <div class="part-option-ja">${escapeHtml(a.ja)}</div>
                    <div class="part-option-en">${escapeHtml(a.text)}</div>
                    <div class="part-option-ja-text email-ja ${showJa ? '' : 'hidden'}">${escapeHtml(a.jaText)}</div>
                </button>
            `;
        });
        html += '</div></div>';

        // 質問2への回答
        html += `
            <div class="builder-section">
                <div class="builder-label" style="color:#f59e0b">
                    <span class="material-symbols-rounded">question_answer</span>
                    質問2に答える（${escapeHtml(theme.question2Ja)}）
                </div>
                <div class="builder-options" id="q2Options">
        `;
        theme.answers2.forEach(a => {
            html += `
                <button class="part-option${selectedQ2 === a.id ? ' selected q2' : ''}" data-q="2" data-id="${a.id}">
                    <div class="part-option-ja">${escapeHtml(a.ja)}</div>
                    <div class="part-option-en">${escapeHtml(a.text)}</div>
                    <div class="part-option-ja-text email-ja ${showJa ? '' : 'hidden'}">${escapeHtml(a.jaText)}</div>
                </button>
            `;
        });
        html += '</div></div>';

        el.innerHTML = html;

        // クリックイベント
        el.querySelectorAll('.part-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const q = btn.dataset.q;
                const id = parseInt(btn.dataset.id);
                if (q === '1') selectedQ1 = id;
                else selectedQ2 = id;
                renderPartBuilder(theme);
                renderPreview(theme);
            });
        });
    }

    // 組み立てプレビュー
    function renderPreview(theme) {
        const el = $('emailPreview');
        if (!el) return;

        const q1Text = selectedQ1
            ? theme.answers1.find(a => a.id === selectedQ1)?.text || ''
            : '[質問1への回答を選択してください]';
        const q2Text = selectedQ2
            ? theme.answers2.find(a => a.id === selectedQ2)?.text || ''
            : '[質問2への回答を選択してください]';

        const q1Class = selectedQ1 ? 'preview-question' : 'preview-blank';
        const q2Class = selectedQ2 ? 'preview-reason' : 'preview-blank';

        const fullText = selectedQ1 && selectedQ2
            ? `Hi ${theme.senderName} Thank you for your e-mail. ${q1Text}. ${q2Text}.`
            : '';
        const wordCount = fullText ? countWords(fullText) : '—';

        el.innerHTML = `
            <div class="email-preview-content">
                <span class="preview-fixed">Hi, ${escapeHtml(theme.senderName)}!</span><br>
                <span class="preview-fixed">Thank you for your e-mail.</span>
                <span class="${q1Class}">${escapeHtml(q1Text)}.</span>
                <span class="${q2Class}">${escapeHtml(q2Text)}.</span><br>
                <span class="preview-fixed">Best wishes,</span>
            </div>
            <div style="margin-top:8px;font-size:0.78rem;color:var(--text-secondary)">
                語数: <strong>${wordCount}</strong> / 15〜25語
            </div>
        `;
    }

    // ────── STEP 2: 段階的練習 ──────
    function renderStep2() {
        const theme = getTheme();
        renderEmailDisplay('step2EmailDisplay', theme, false);
        renderChunkExercise(theme);
        renderTransDrill(theme);
        renderGuidedHints(theme);
        renderChecklist(theme);
        initWordCounter('step2');
    }

    // チャンク並べ替え
    function renderChunkExercise(theme) {
        const chunks = theme.chunks || [];
        if (chunks.length === 0) return;

        const pFill = $('step2Progress');
        const pText = $('step2ProgressText');
        if (pFill) pFill.style.width = `${(Math.min(chunkIndex + 1, chunks.length) / chunks.length) * 100}%`;
        if (pText) pText.textContent = `${Math.min(chunkIndex + 1, chunks.length)} / ${chunks.length}`;

        if (chunkIndex >= chunks.length) {
            const container = $('step2Chunks');
            container.innerHTML = `
                <div class="score-display">
                    <div class="score-num">${chunks.length} / ${chunks.length}</div>
                    <div class="score-label">チャンク並べ替え完了！</div>
                </div>
                <div class="btn-group" style="justify-content:center">
                    <button class="btn btn-secondary" id="step2ChunkReset">
                        <span class="material-symbols-rounded">refresh</span> もう一度
                    </button>
                </div>
            `;
            $('step2ChunkReset').addEventListener('click', () => {
                chunkIndex = 0;
                renderChunkExercise(theme);
            });
            if (pFill) pFill.style.width = '100%';
            if (pText) pText.textContent = `${chunks.length} / ${chunks.length}`;
            return;
        }

        const chunk = chunks[chunkIndex];
        const container = $('step2Chunks');
        if (!container) return;

        let placed = [];
        let checked = false;
        const shuffled = shuffleArray(chunk.pieces);

        container.innerHTML = `
            <div class="chunk-exercise fade-in">
                <div class="chunk-ja">${escapeHtml(chunk.sentenceJa)}</div>
                <div class="chunk-dropzone" id="chunkDropzone">
                    <span style="color:var(--text-secondary);font-size:0.78rem;opacity:0.5">ここにチャンクを並べましょう</span>
                </div>
                <div class="chunk-pool" id="chunkPool">
                    ${shuffled.map((p, i) => `<button class="chunk-piece" data-idx="${i}" data-text="${escapeHtml(p)}">${p}</button>`).join('')}
                </div>
                <div class="btn-group">
                    <button class="btn btn-primary" id="chunkCheckBtn" style="display:none">
                        <span class="material-symbols-rounded">check</span> 答え合わせ
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
                piece.style.display = 'none';
                updateDropzone();
            });
        });

        function updateDropzone() {
            if (placed.length === 0) {
                dropzone.innerHTML = '<span style="color:var(--text-secondary);font-size:0.78rem;opacity:0.5">ここにチャンクを並べましょう</span>';
            } else {
                dropzone.innerHTML = placed.map((t, i) =>
                    `<button class="chunk-piece placed" data-idx="${i}">${escapeHtml(t)}</button>`
                ).join('');
                dropzone.querySelectorAll('.chunk-piece').forEach(p => {
                    p.addEventListener('click', () => {
                        if (checked) return;
                        const idx = parseInt(p.dataset.idx);
                        const text = placed[idx];
                        placed.splice(idx, 1);
                        pool.querySelectorAll('.chunk-piece').forEach(pp => {
                            if (pp.dataset.text === text && pp.style.display === 'none') {
                                pp.style.display = '';
                            }
                        });
                        updateDropzone();
                    });
                });
            }
            dropzone.classList.toggle('active', placed.length > 0);
            checkBtn.style.display = placed.length === chunk.pieces.length ? '' : 'none';
        }

        checkBtn.addEventListener('click', () => {
            if (checked) return;
            checked = true;
            const userAnswer = placed.join(' ').replace(/ \./g, '.').replace(/ \?/g, '?').replace(/ ,/g, ',');
            const isCorrect = userAnswer.trim().toLowerCase() === chunk.answer.trim().toLowerCase();

            dropzone.classList.remove('active');
            dropzone.classList.add(isCorrect ? 'correct' : 'wrong');
            checkBtn.style.display = 'none';

            $('chunkResult').innerHTML = `
                <div class="result-banner ${isCorrect ? 'success' : 'error'} fade-in" style="margin-top:12px">
                    <span class="material-symbols-rounded">${isCorrect ? 'check_circle' : 'cancel'}</span>
                    ${isCorrect ? '正解！🎉' : '不正解'}
                </div>
                ${!isCorrect ? `<div class="model-answer"><div class="label">正解</div><div class="text-en">${escapeHtml(chunk.answer)}</div></div>` : ''}
                <div class="btn-group">
                    <button class="btn btn-primary" id="chunkNextBtn">
                        <span class="material-symbols-rounded">arrow_forward</span> 次へ
                    </button>
                </div>
            `;

            $('chunkNextBtn').addEventListener('click', () => {
                chunkIndex++;
                renderChunkExercise(theme);
            });
        });
    }

    // 日→英 変換ドリル
    function renderTransDrill(theme) {
        const chunks = theme.chunks || [];
        if (chunks.length === 0) return;

        const pFill = $('transDrillProgress');
        const pText = $('transDrillProgressText');
        if (pFill) pFill.style.width = `${(Math.min(transDrillIndex + 1, chunks.length) / chunks.length) * 100}%`;
        if (pText) pText.textContent = `${Math.min(transDrillIndex + 1, chunks.length)} / ${chunks.length}`;

        const chunk = chunks[transDrillIndex];
        const container = $('transDrill');
        if (!container) return;

        transDrillChecked = false;

        // ヒント: 最初の数語を表示
        const hintWords = chunk.answer.split(' ').slice(0, 2).join(' ') + '...';

        container.innerHTML = `
            <div class="trans-drill-item fade-in">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
                    <span style="background:var(--accent-primary);color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700">${transDrillIndex + 1}</span>
                    <span style="font-size:0.82rem;color:var(--text-secondary)">${chunks.length}文中 ${transDrillIndex + 1}文目</span>
                </div>
                <div style="margin-bottom:12px">
                    <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:2px">日本語</div>
                    <div style="font-size:1rem;font-weight:700;color:var(--accent-primary);border-left:3px solid var(--accent-primary);padding-left:12px">${escapeHtml(chunk.sentenceJa)}</div>
                </div>
                <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:8px">
                    <span class="material-symbols-rounded" style="font-size:16px;vertical-align:middle">translate</span>
                    ヒント（英語の語順）：${escapeHtml(chunk.literalJa)}
                </div>
                <textarea class="writing-area" id="transDrillInput" rows="2"
                    placeholder="上の日本語を英語で書いてみましょう..." style="margin-bottom:8px"></textarea>
                <button class="btn btn-outline" id="transDrillHintBtn" style="margin-bottom:8px;color:var(--warning)">
                    <span class="material-symbols-rounded" style="font-size:16px">lightbulb</span>
                    ヒントを見る（最初の数語）
                </button>
                <div class="btn-group">
                    <button class="btn btn-primary" id="transDrillCheck">
                        <span class="material-symbols-rounded">check</span> 確認
                    </button>
                </div>
                <div id="transDrillResult"></div>
            </div>
        `;

        // ヒントボタン
        $('transDrillHintBtn').addEventListener('click', () => {
            $('transDrillHintBtn').innerHTML = `<span class="material-symbols-rounded" style="font-size:16px">lightbulb</span> ${escapeHtml(hintWords)}`;
            $('transDrillHintBtn').disabled = true;
        });

        // 確認ボタン
        $('transDrillCheck').addEventListener('click', async () => {
            if (transDrillChecked) return;
            const userAnswer = $('transDrillInput').value.trim();
            if (!userAnswer) return;
            transDrillChecked = true;

            const checkBtn = $('transDrillCheck');
            checkBtn.disabled = true;
            checkBtn.innerHTML = '<span class="material-symbols-rounded spinner">progress_activity</span> 採点中...';

            const resultDiv = $('transDrillResult');

            const gasUrl = getGasUrl();
            if (gasUrl) {
                try {
                    const payload = {
                        action: 'grade_sentence',
                        sentenceJa: chunk.sentenceJa,
                        studentAnswer: userAnswer,
                        modelAnswer: chunk.answer,
                        gradeId: WRITEPASS_CONFIG.gradeId
                    };
                    const resp = await fetch(gasUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                        body: JSON.stringify(payload)
                    });
                    const result = await resp.json();
                    if (result.error) throw new Error(result.error);

                    const isCorrect = result.isCorrect;
                    let diffLabel = isCorrect ? 'correct' : 'wrong';
                    let diffIcon = isCorrect ? 'check_circle' : 'info';
                    let resultTitle = isCorrect ? '🎉 いいですね！' : '💪 もう一息です！';

                    resultDiv.innerHTML = `
                        <div class="trans-drill-diff fade-in" style="margin-top:12px">
                            <div class="trans-drill-diff-label ${diffLabel}">
                                <span class="material-symbols-rounded" style="font-size:18px">${diffIcon}</span>
                                ${resultTitle}（スコア: ${result.score}/100）
                            </div>

                            <!-- 先生のコメント -->
                            <div class="trans-drill-answer-row" style="margin-top:8px; margin-bottom:12px">
                                <div class="row-label">👩‍🏫 先生からのフィードバック</div>
                                <div class="row-text" style="background:rgba(108, 99, 255, 0.08); border-left:3px solid var(--accent-primary); line-height:1.6">
                                    ${escapeHtml(result.comment || '').replace(/\n/g, '<br>')}
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
                                    ${transDrillIndex + 1 < chunks.length ? '次の文へ' : '完了'}
                                </button>
                            </div>

                            <!-- 先生への質問コーナー -->
                            <div class="trans-drill-qa fade-in" style="margin-top:20px; padding-top:16px; border-top:1px dashed var(--border);">
                                <div class="row-label" style="margin-bottom:8px">🙋‍♀️ 先生への質問・疑問を解決しよう</div>
                                <div id="qaHistory" style="display:flex; flex-direction:column; gap:12px; margin-bottom:12px"></div>
                                <div style="display:flex; gap:8px">
                                    <input type="text" id="qaInput" style="flex:1; padding:8px 12px; font-size:0.9rem; border:1px solid var(--border); border-radius:8px; background:var(--bg-secondary); color:var(--text)" placeholder="先生に質問する... (例: stayedとwasの違いは？)">
                                    <button class="btn btn-secondary" id="qaSend" style="padding: 0 16px; border-radius:4px"><span class="material-symbols-rounded">send</span></button>
                                </div>
                            </div>
                        </div>
                    `;

                    $('transDrillInput').readOnly = true;
                    checkBtn.style.display = 'none';

                    // 次の文ボタン
                    $('transDrillNext').addEventListener('click', () => {
                        transDrillIndex++;
                        renderTransDrill(getTheme());
                    });

                    // Q&A logic
                    const qaInput = $('qaInput');
                    const qaSend = $('qaSend');
                    const qaHistory = $('qaHistory');

                    const handleQuestion = async () => {
                        const question = qaInput.value.trim();
                        if (!question) return;

                        qaInput.disabled = true;
                        qaSend.disabled = true;

                        const userMsg = document.createElement('div');
                        userMsg.style.cssText = "align-self: flex-end; background: var(--bg-card); border: 1px solid var(--border); padding: 8px 12px; border-radius: 12px 12px 0 12px; font-size:0.9rem; max-width:85%";
                        userMsg.innerHTML = `<strong style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:2px">あなた</strong>${escapeHtml(question)}`;
                        qaHistory.appendChild(userMsg);

                        const aiMsg = document.createElement('div');
                        aiMsg.style.cssText = "align-self: flex-start; background: rgba(108, 99, 255, 0.08); border: 1px solid rgba(108, 99, 255, 0.2); padding: 8px 12px; border-radius: 12px 12px 12px 0; font-size:0.9rem; max-width:85%";
                        aiMsg.innerHTML = `<strong style="font-size:0.75rem; color:var(--accent-primary); display:block; margin-bottom:2px">👩‍🏫 先生</strong><span class="material-symbols-rounded spinner" style="font-size:16px; vertical-align:middle">progress_activity</span> 入力中...`;
                        qaHistory.appendChild(aiMsg);

                        qaInput.value = '';

                        try {
                            const qaPayload = {
                                action: 'ask_teacher',
                                question: question,
                                sentenceJa: chunk.sentenceJa,
                                studentAnswer: userAnswer,
                                modelAnswer: chunk.answer,
                                teacherFeedback: result.comment,
                                gradeId: WRITEPASS_CONFIG.gradeId
                            };
                            const qaResp = await fetch(gasUrl, {
                                method: 'POST',
                                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                                body: JSON.stringify(qaPayload)
                            });
                            const qaResult = await qaResp.json();
                            if (qaResult.error) throw new Error(qaResult.error);
                            aiMsg.innerHTML = `<strong style="font-size:0.75rem; color:var(--accent-primary); display:block; margin-bottom:2px">👩‍🏫 先生</strong>${escapeHtml(qaResult.answer || '').replace(/\n/g, '<br>')}`;
                        } catch (qaErr) {
                            aiMsg.innerHTML = `<strong style="font-size:0.75rem; color:var(--accent-primary); display:block; margin-bottom:2px">👩‍🏫 先生</strong><span style="color:var(--error)">エラー: ${escapeHtml(qaErr.message)}</span>`;
                        }

                        qaInput.disabled = false;
                        qaSend.disabled = false;
                        qaInput.focus();
                    };

                    if (qaSend) qaSend.addEventListener('click', handleQuestion);
                    if (qaInput) qaInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') { e.preventDefault(); handleQuestion(); }
                    });

                } catch (err) {
                    resultDiv.innerHTML = `
                        <div style="margin-top:12px;padding:12px;background:rgba(248,113,113,0.1);border-left:3px solid var(--error);border-radius:4px;font-size:0.85rem">
                            <span class="material-symbols-rounded" style="vertical-align:middle;font-size:16px">error</span>
                            通信エラー: ${escapeHtml(err.message)}
                        </div>
                        <div style="padding:10px;background:rgba(var(--accent-rgb,108,99,255),0.06);border-radius:8px;font-size:0.85rem;margin-top:8px">
                            <div style="font-weight:700;margin-bottom:4px;color:var(--accent-primary)">模範解答</div>
                            ${escapeHtml(chunk.answer)}
                        </div>
                    `;
                    checkBtn.disabled = false;
                    checkBtn.innerHTML = '<span class="material-symbols-rounded">check</span> 確認';
                }
            } else {
                // GAS未設定時: ローカル比較
                const localScore = compareTranslation(userAnswer, chunk.answer);
                const scoreClass = localScore >= 80 ? 'success' : localScore >= 50 ? '' : 'error';
                resultDiv.innerHTML = `
                    <div class="result-banner ${scoreClass} fade-in" style="margin-top:12px">
                        <span class="material-symbols-rounded">${localScore >= 80 ? 'check_circle' : localScore >= 50 ? 'info' : 'cancel'}</span>
                        一致率: ${localScore}%
                    </div>
                    <div style="padding:10px;background:rgba(var(--accent-rgb,108,99,255),0.06);border-radius:8px;font-size:0.85rem;margin-top:8px">
                        <div style="font-weight:700;margin-bottom:4px;color:var(--accent-primary)">模範解答</div>
                        ${escapeHtml(chunk.answer)}
                    </div>
                    <div class="btn-group" style="margin-top:8px">
                        <button class="btn btn-primary" id="transDrillNext">
                            <span class="material-symbols-rounded">arrow_forward</span>
                            ${transDrillIndex + 1 < chunks.length ? '次の文へ' : '完了'}
                        </button>
                    </div>
                `;
                $('transDrillNext').addEventListener('click', () => {
                    transDrillIndex++;
                    renderTransDrill(getTheme());
                });
                checkBtn.disabled = false;
                checkBtn.innerHTML = '<span class="material-symbols-rounded">check</span> 確認';
            }
        });

        $('transDrillInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                $('transDrillCheck').click();
            }
        });
    }

    // ローカル一致率スコア
    function compareTranslation(userAnswer, modelAnswer) {
        const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 0);
        const userWords = normalize(userAnswer);
        const modelWords = normalize(modelAnswer);
        if (userWords.length === 0 || modelWords.length === 0) return 0;

        const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'it', 'to', 'of', 'in', 'for', 'and', 'or', 'but']);
        const meaningfulModel = modelWords.filter(w => !stopWords.has(w));
        const meaningfulUser = userWords.filter(w => !stopWords.has(w));

        let matchCount = 0;
        const usedIndices = new Set();
        meaningfulModel.forEach(mw => {
            const idx = meaningfulUser.findIndex((uw, i) => !usedIndices.has(i) && uw === mw);
            if (idx !== -1) { matchCount++; usedIndices.add(idx); }
        });
        const wordScore = meaningfulModel.length > 0 ? matchCount / meaningfulModel.length : 0;

        const getBigrams = (words) => {
            const bg = [];
            for (let i = 0; i < words.length - 1; i++) bg.push(words[i] + ' ' + words[i + 1]);
            return bg;
        };
        const modelBigrams = getBigrams(modelWords);
        const userBigrams = getBigrams(userWords);
        let bigramMatch = 0;
        modelBigrams.forEach(mb => { if (userBigrams.includes(mb)) bigramMatch++; });
        const bigramScore = modelBigrams.length > 0 ? bigramMatch / modelBigrams.length : 0;

        return Math.round((wordScore * 0.5 + bigramScore * 0.5) * 100);
    }

    // ガイド付き自由記述のヒント表示
    function renderGuidedHints(theme) {
        const el = $('step2Hints');
        if (!el) return;

        const hints = theme.guidedHints || [];
        if (hints.length === 0) { el.innerHTML = ''; return; }

        const colors = ['#ef4444', '#f59e0b', '#3b82f6'];
        el.innerHTML = hints.map((h, i) => `
            <div style="display:flex;gap:8px;margin-bottom:8px;align-items:flex-start">
                <div style="border-left:3px solid ${colors[i % colors.length]};padding-left:10px;flex:1">
                    <div style="font-size:0.72rem;font-weight:700;color:${colors[i % colors.length]};margin-bottom:2px">${escapeHtml(h.label)}</div>
                    <div style="font-size:0.85rem;color:var(--text-secondary)">${escapeHtml(h.hintJa)}</div>
                </div>
            </div>
        `).join('');
    }

    // チェックリストの動的生成
    function renderChecklist(theme) {
        const el = $('step2Checklist');
        if (!el) return;

        const items = theme.checklist || [
            '質問1に答えているか？',
            '質問2に答えているか？',
            '語数は15〜25語の範囲内か？'
        ];

        el.innerHTML = items.map((item, i) => `
            <div class="check-item" data-check="${i + 1}">
                <div class="check-box"><span class="material-symbols-rounded" style="font-size:14px;display:none">check</span></div>
                ${escapeHtml(item)}
            </div>
        `).join('');

        // クリックイベント設定
        el.querySelectorAll('.check-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('checked');
                const icon = item.querySelector('.material-symbols-rounded');
                if (icon) icon.style.display = item.classList.contains('checked') ? '' : 'none';
            });
        });
    }

    function resetChecklist() {
        document.querySelectorAll('.check-item').forEach(item => {
            item.classList.remove('checked');
            const icon = item.querySelector('.material-symbols-rounded');
            if (icon) icon.style.display = 'none';
        });
    }

    // ────── STEP 3: 本番力 ──────
    function renderStep3() {
        const theme = getTheme();
        renderEmailDisplay('step3EmailDisplay', theme, false);
        initWordCounter('step3');
    }

    // ========== 語数カウンター ==========
    function initWordCounter(prefix) {
        const area = $(prefix + 'Writing');
        if (!area) return;
        const update = () => {
            const wc = countWords(area.value);
            const numEl = $(prefix + 'WordNum');
            const barEl = $(prefix + 'WordBar');
            if (numEl) {
                numEl.textContent = wc;
                numEl.className = 'word-count-num ' +
                    (wc >= WRITEPASS_CONFIG.minWords && wc <= WRITEPASS_CONFIG.maxWords ? 'ok' :
                        wc > WRITEPASS_CONFIG.maxWords ? 'over' : 'under');
            }
            if (barEl) {
                const pct = Math.min(wc / WRITEPASS_CONFIG.maxWords * 100, 100);
                barEl.style.width = pct + '%';
                barEl.className = 'word-bar-fill ' +
                    (wc >= WRITEPASS_CONFIG.minWords && wc <= WRITEPASS_CONFIG.maxWords ? 'ok' :
                        wc > WRITEPASS_CONFIG.maxWords ? 'over' : 'under');
            }
        };
        area.addEventListener('input', update);
        update();
    }

    // ========== 模範解答ボタン ==========
    function initModelAnswerButtons() {
        const step2Btn = $('step2ShowModel');
        if (step2Btn) {
            step2Btn.addEventListener('click', () => {
                const theme = getTheme();
                const el = $('step2ModelAnswer');
                if (!el) return;
                el.style.display = '';
                el.innerHTML = `
                    <div class="model-answer fade-in">
                        <div class="label">📝 模範解答</div>
                        <div class="text-en" style="white-space:pre-line">${escapeHtml(theme.modelAnswer)}</div>
                        <div class="text-ja" style="white-space:pre-line">${escapeHtml(theme.modelAnswerJa)}</div>
                        <div style="margin-top:8px;font-size:0.75rem;color:var(--text-secondary)">語数: ${countWords(theme.modelAnswer)}語</div>
                    </div>
                `;
                step2Btn.style.display = 'none';
            });
        }

        const step3Btn = $('step3Submit');
        if (step3Btn) {
            step3Btn.addEventListener('click', () => {
                const theme = getTheme();
                if (timerRunning) pauseTimer();
                const el = $('step3ModelAnswer');
                if (!el) return;
                el.style.display = '';
                el.innerHTML = `
                    <div class="model-answer fade-in">
                        <div class="label">📝 模範解答</div>
                        <div class="text-en" style="white-space:pre-line">${escapeHtml(theme.modelAnswer)}</div>
                        <div class="text-ja" style="white-space:pre-line">${escapeHtml(theme.modelAnswerJa)}</div>
                        <div style="margin-top:8px;font-size:0.75rem;color:var(--text-secondary)">語数: ${countWords(theme.modelAnswer)}語</div>
                    </div>
                `;
                step3Btn.style.display = 'none';
            });
        }
    }

    // ========== 画像入力（撮影/ファイル/貼り付け） ==========
    function initImageInputs(prefix) {
        const cameraBtn = $(prefix + 'CameraBtn');
        const fileBtn = $(prefix + 'FileBtn');
        const pasteBtn = $(prefix + 'PasteBtn');
        const cameraInput = $(prefix + 'CameraInput');
        const fileInput = $(prefix + 'FileInput');

        if (cameraBtn && cameraInput) {
            cameraBtn.addEventListener('click', () => cameraInput.click());
            cameraInput.addEventListener('change', (e) => {
                if (e.target.files[0]) handleImageFile(e.target.files[0], prefix);
            });
        }
        if (fileBtn && fileInput) {
            fileBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                if (e.target.files[0]) handleImageFile(e.target.files[0], prefix);
            });
        }
        if (pasteBtn) {
            pasteBtn.addEventListener('click', async () => {
                try {
                    const items = await navigator.clipboard.read();
                    for (const item of items) {
                        const imgType = item.types.find(t => t.startsWith('image/'));
                        if (imgType) {
                            const blob = await item.getType(imgType);
                            handleImageFile(blob, prefix);
                            return;
                        }
                    }
                    alert('クリップボードに画像がありません。');
                } catch {
                    alert('クリップボード読み取りに失敗しました。');
                }
            });
        }
    }

    function handleImageFile(file, prefix) {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const base64 = ev.target.result;
            const area = $(prefix + 'Writing');
            if (area) area.dataset.imageBase64 = base64;
            if (area) area.dataset.imageMimeType = file.type || 'image/jpeg';

            const preview = $(prefix + 'ImagePreview');
            if (preview) {
                preview.style.display = '';
                preview.innerHTML = `
                    <div style="margin-top:8px;padding:8px;background:var(--bg-secondary);border-radius:8px;border:1px solid var(--border)">
                        <img src="${base64}" style="max-width:100%;border-radius:4px" alt="手書き画像">
                        <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px">📷 画像を読み込みました。AI採点ボタンで採点します。</div>
                    </div>
                `;
            }
        };
        if (file instanceof Blob) reader.readAsDataURL(file);
    }

    // ========== AI採点 ==========
    function initAiGrading(prefix) {
        const gradeBtn = $(prefix + 'AiGrade');
        if (!gradeBtn) return;

        gradeBtn.addEventListener('click', async () => {
            if (isGrading) return;
            const gasUrl = getGasUrl();
            if (!gasUrl) {
                showGasSetup(prefix);
                return;
            }

            const area = $(prefix + 'Writing');
            const text = area ? area.value.trim() : '';
            const imageBase64 = area ? area.dataset.imageBase64 : null;

            if (!text && !imageBase64) {
                alert('解答を入力するか、画像を添付してください。');
                return;
            }

            isGrading = true;
            gradeBtn.disabled = true;
            gradeBtn.innerHTML = '<span class="material-symbols-rounded spinner">progress_activity</span> 採点中...';

            try {
                const theme = getTheme();
                const payload = {
                    passage: theme.senderEmail,
                    passageJa: theme.senderEmailJa,
                    modelAnswer: theme.modelAnswer,
                    studentAnswer: text,
                    gradeId: WRITEPASS_CONFIG.gradeId,
                    taskType: WRITEPASS_CONFIG.taskType
                };

                if (imageBase64) {
                    payload.imageBase64 = imageBase64.split(',')[1] || imageBase64;
                    payload.imageMimeType = area.dataset.imageMimeType || 'image/jpeg';
                }

                const resp = await fetch(gasUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });
                const result = await resp.json();

                if (result.error) {
                    showGradeError(prefix, result.error);
                } else {
                    if (result.ocrText) {
                        if (area) area.value = result.ocrText;
                        initWordCounter(prefix);
                    }
                    renderGradeResult(prefix, result, text || result.ocrText);
                }
            } catch (err) {
                showGradeError(prefix, 'ネットワークエラー: ' + err.message);
            } finally {
                isGrading = false;
                gradeBtn.disabled = false;
                gradeBtn.innerHTML = '<span class="material-symbols-rounded">auto_awesome</span> AI採点';
            }
        });
    }

    function renderGradeResult(prefix, result) {
        const container = $(prefix + 'GradeResult');
        if (!container) return;
        container.style.display = '';

        const maxTotal = 9; // 3級Eメールは3観点×3点 = 9点
        const pct = Math.round((result.totalScore || 0) / maxTotal * 100);
        const grade = pct >= 80 ? 'excellent' : pct >= 60 ? 'good' : pct >= 40 ? 'fair' : 'poor';
        const gradeLabels = { excellent: '🌟 素晴らしい！', good: '👍 良い！', fair: '📝 惜しい！', poor: '💪 がんばろう！' };
        const gradeColors = { excellent: 'var(--success)', good: 'var(--color-merit)', fair: 'var(--warning)', poor: 'var(--error)' };

        container.innerHTML = `
            <div class="grade-card fade-in" style="margin-top:12px">
                <div class="grade-header">
                    <div class="grade-score-ring" style="--score-pct:${pct}%;--score-color:${gradeColors[grade]}">
                        <span class="grade-score-num">${result.totalScore || 0}</span>
                        <span class="grade-score-max">/ ${maxTotal}</span>
                    </div>
                    <div class="grade-label" style="color:${gradeColors[grade]}">${gradeLabels[grade]}</div>
                    <div class="grade-comment">${escapeHtml(result.overallComment || '').replace(/\n/g, '<br>')}</div>
                </div>
                ${result.categories ? `
                    <div class="grade-categories">
                        ${result.categories.map(cat => `
                            <div class="grade-cat">
                                <div class="grade-cat-header">
                                    <span class="grade-cat-name">${escapeHtml(cat.name)}</span>
                                    <span class="grade-cat-score">${cat.score} / ${cat.maxScore || 3}</span>
                                </div>
                                <div class="grade-cat-comment">${escapeHtml(cat.comment || '')}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    function showGradeError(prefix, message) {
        const container = $(prefix + 'GradeResult');
        if (!container) return;
        container.style.display = '';
        container.innerHTML = `
            <div class="result-banner error fade-in" style="margin-top:12px">
                <span class="material-symbols-rounded">error</span>
                ${escapeHtml(message)}
            </div>
        `;
    }

    function showGasSetup(prefix) {
        const container = $(prefix + 'GradeResult');
        if (!container) return;
        container.style.display = '';
        container.innerHTML = `
            <div class="grade-setup fade-in" style="margin-top:12px">
                <div class="card-title">
                    <span class="material-symbols-rounded">settings</span>
                    AI採点のセットアップ
                </div>
                <p class="section-desc" style="margin-bottom:12px">
                    AI採点を利用するには、Google Apps ScriptのデプロイURLを設定してください。
                    <a href="setup-guide.html" style="color:var(--accent-primary)">→ セットアップガイド</a>
                </p>
                <input type="url" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-secondary);color:var(--text-primary);font-size:0.85rem" id="${prefix}GasUrl" placeholder="https://script.google.com/macros/s/...../exec">
                <div class="btn-group" style="margin-top:8px">
                    <button class="btn btn-primary" id="${prefix}GasSave">
                        <span class="material-symbols-rounded">save</span> 保存
                    </button>
                </div>
            </div>
        `;
        $(`${prefix}GasSave`).addEventListener('click', () => {
            const url = $(`${prefix}GasUrl`).value.trim();
            if (url) {
                setGasUrl(url);
                container.innerHTML = `
                    <div class="result-banner success fade-in">
                        <span class="material-symbols-rounded">check_circle</span>
                        保存しました。もう一度AI採点ボタンを押してください。
                    </div>
                `;
            }
        });
    }

    // ========== タイマー ==========
    function initTimer() {
        const totalSec = (WRITEPASS_CONFIG.timerMinutes || 15) * 60;
        timerSeconds = totalSec;
        updateTimerDisplay();

        const startBtn = $('timerStart');
        const pauseBtn = $('timerPause');
        const resetBtn = $('timerReset');

        if (startBtn) startBtn.addEventListener('click', () => {
            if (timerRunning) return;
            timerRunning = true;
            startBtn.style.display = 'none';
            if (pauseBtn) pauseBtn.style.display = '';
            timerInterval = setInterval(() => {
                timerSeconds--;
                updateTimerDisplay();
                if (timerSeconds <= 0) {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    if (startBtn) startBtn.style.display = '';
                    if (pauseBtn) pauseBtn.style.display = 'none';
                }
            }, 1000);
        });

        if (pauseBtn) pauseBtn.addEventListener('click', () => pauseTimer());
        if (resetBtn) resetBtn.addEventListener('click', () => resetTimer());
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        const startBtn = $('timerStart');
        const pauseBtn = $('timerPause');
        if (startBtn) startBtn.style.display = '';
        if (pauseBtn) pauseBtn.style.display = 'none';
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerRunning = false;
        timerSeconds = (WRITEPASS_CONFIG.timerMinutes || 15) * 60;
        updateTimerDisplay();
        const startBtn = $('timerStart');
        const pauseBtn = $('timerPause');
        if (startBtn) startBtn.style.display = '';
        if (pauseBtn) pauseBtn.style.display = 'none';
    }

    function updateTimerDisplay() {
        const mm = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
        const ss = String(timerSeconds % 60).padStart(2, '0');
        const el = $('timerValue');
        if (el) el.textContent = `${mm}:${ss}`;

        const totalSec = (WRITEPASS_CONFIG.timerMinutes || 15) * 60;
        const fill = $('timerProgressFill');
        if (fill) fill.style.width = `${((totalSec - timerSeconds) / totalSec) * 100}%`;
    }

    // ========== 印刷 ==========
    function printWorksheet() {
        const theme = getTheme();
        const gradeLabel = WRITEPASS_CONFIG.gradeLabel;
        const taskLabel = WRITEPASS_CONFIG.taskLabel;
        const minWords = WRITEPASS_CONFIG.minWords;
        const maxWords = WRITEPASS_CONFIG.maxWords;
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

        const qrUrl = `https://com-pass-pro.vercel.app/grade3-email.html?theme=${currentThemeIndex}`;

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
.qr-section { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; padding: 8px 12px; border: 1px solid #ccc; background: #fafafa; }
.qr-container { flex-shrink: 0; width: 80px; height: 80px; }
.qr-container canvas, .qr-container img { width: 80px !important; height: 80px !important; }
.qr-text { font-size: 9pt; line-height: 1.5; color: #333; }
.email-box { font-size: 10.5pt; line-height: 1.8; border: 2px solid #000; padding: 14px 18px; margin-bottom: 12px; }
.email-box u { text-decoration: underline; font-weight: bold; }
.reply-template { margin-top: 10px; font-size: 10pt; line-height: 1.6; color: #666; }
.reply-template span { color: #000; font-weight: bold; }
.footer { position: absolute; bottom: 0; left: 0; right: 0; text-align: center; font-size: 8pt; color: #888; }
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
@media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
</head>
<body>
<div class="page">
    <div class="header">
        <span class="header-title">英語資格検定${gradeLabel} ${taskLabel}</span>
        <span class="header-meta">${theme.title}（${theme.exam}）</span>
    </div>
    <div class="qr-section">
        <div class="qr-container" id="qrCode" data-url="${qrUrl}"></div>
        <div class="qr-text">📱 QRコードをスマホ・タブレットで読み取って学習しましょう<br><strong>ComPass Pro</strong> でStep 1〜3の練習ができます</div>
    </div>
    <div class="email-box">
        ${theme.senderEmail.replace(/\n/g, '<br>')}
    </div>
    <div class="reply-template">
        <span>Hi, ${theme.senderName}!</span><br>
        Thank you for your e-mail.
    </div>
    <div class="footer">© ECCベストワン藍住：北島中央</div>
</div>
<div class="page">
    <div class="header">
        <span class="header-title">Answer Sheet — 解答用紙</span>
        <span class="header-meta">英語資格検定${gradeLabel} ${taskLabel}</span>
    </div>
    <div class="name-row">Name: <span class="name-field"></span></div>
    <div class="reply-template"><span>Hi, ${theme.senderName}!</span><br>Thank you for your e-mail.</div>
    <div class="answer-subtitle" style="margin-top:12px">E-mail Reply（目安: ${minWords}〜${maxWords}語）</div>
    <div class="answer-grid">${answerRows.join('\n')}</div>
    <div class="reply-template"><span>Best wishes,</span></div>
    <div class="word-count-guide"><span class="target-range">目安語数: ${minWords}–${maxWords} words</span></div>
    <div class="footer">© ECCベストワン藍住：北島中央</div>
</div>
</body>
</html>`;

        const printWin = window.open('', '_blank');
        printWin.document.write(printHtml);
        printWin.document.close();
        printWin.onload = () => {
            try {
                const qrContainers = printWin.document.querySelectorAll('.qr-container[data-url]');
                qrContainers.forEach(container => {
                    new printWin.QRCode(container, {
                        text: container.dataset.url,
                        width: 80, height: 80,
                        colorDark: '#1a1a1a', colorLight: '#ffffff',
                        correctLevel: printWin.QRCode.CorrectLevel.M
                    });
                });
            } catch (e) { console.error('QR generation error:', e); }
            setTimeout(() => printWin.print(), 500);
        };
    }

    // ========== URL パラメータ ==========
    function checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const themeParam = params.get('theme');
        if (themeParam !== null) {
            const idx = parseInt(themeParam);
            if (idx >= 0 && idx < EMAIL_THEMES.length) {
                currentThemeIndex = idx;
                const select = $('themeSelect');
                if (select) select.value = idx;
            }
        }
    }

    // ========== 初期化 ==========
    function init() {
        initThemeToggle();
        initThemeSelector();
        checkUrlParams();
        initStepNav();
        initTimer();
        initModelAnswerButtons();
        initImageInputs('step2');
        initImageInputs('step3');
        initAiGrading('step2');
        initAiGrading('step3');
        renderStep1();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
