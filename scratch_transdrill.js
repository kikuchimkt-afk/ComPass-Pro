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
            // All done 窶・show score
            const correct = transDrillScores.filter(s => s >= 80).length;
            const partial = transDrillScores.filter(s => s >= 40 && s < 80).length;
            const emoji = correct === chunks.length ? '脂' : correct >= chunks.length / 2 ? '総' : '潮';
            container.innerHTML = `
                <div class="trans-drill-score fade-in">
                    <div class="score-circle">
                        <div class="score-num">${correct}</div>
                        <div class="score-max">/ ${chunks.length}</div>
                    </div>
                    <div class="score-label">${emoji} 譌･闍ｱ螟画鋤繝峨Μ繝ｫ螳御ｺ・ｼ・/div>
                    <div style="font-size:0.78rem;color:var(--text-secondary);margin-top:6px">
                        螳悟・荳閾ｴ: ${correct}譁・・・驛ｨ蛻・ｸ閾ｴ: ${partial}譁・
                    </div>
                    <div class="btn-group" style="justify-content:center;margin-top:14px">
                        <button class="btn btn-secondary" id="transDrillReset">
                            <span class="material-symbols-rounded">refresh</span> 繧ゅ≧荳蠎ｦ
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
                    ${chunks.length}譁・ｸｭ ${idx + 1}譁・岼
                </div>
                <div class="trans-drill-prompt">
                    <div class="trans-drill-prompt-label">譌･譛ｬ隱・/div>
                    <div class="trans-drill-prompt-text">${chunk.sentenceJa}</div>
                    ${chunk.literalJa ? `
                        <div class="trans-drill-ja-literal" style="margin-top: 8px; font-size: 0.85rem; color: var(--text-secondary); border-top: 1px dashed var(--border-color); padding-top: 8px;">
                            <span class="material-symbols-rounded" style="font-size:14px; vertical-align:middle; color:var(--accent-primary)">translate</span> 
                            <strong style="color:var(--text-secondary)">繝偵Φ繝茨ｼ郁恭隱槭・隱樣・ｼ・</strong> ${chunk.literalJa}
                        </div>
                    ` : ''}
                </div>
                <textarea class="trans-drill-input" id="transDrillInput" 
                    placeholder="荳翫・譌･譛ｬ隱槭ｒ闍ｱ隱槭〒譖ｸ縺・※縺ｿ縺ｾ縺励ｇ縺・.."></textarea>
                <div class="trans-drill-hint" id="transDrillHintBtn">
                    <span class="material-symbols-rounded" style="font-size:16px">lightbulb</span>
                    繝偵Φ繝医ｒ隕九ｋ・域怙蛻昴・謨ｰ隱橸ｼ・
                    <div class="trans-drill-hint-text" id="transDrillHintText">
                        ${chunk.answer.split(' ').slice(0, 3).join(' ')} ...
                    </div>
                </div>
                <div class="btn-group" style="margin-top:12px">
                    <button class="btn btn-primary" id="transDrillCheck">
                        <span class="material-symbols-rounded">check</span> 遒ｺ隱・
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
            checkBtn.innerHTML = '<span class="material-symbols-rounded spinner">progress_activity</span> 蜈育函縺梧ｷｻ蜑贋ｸｭ...';
            resultDiv.innerHTML = `<div class="grade-loading" style="margin-top:12px"><div class="grade-loading-dots"><span></span><span></span><span></span></div><div>譁・ｳ輔→閾ｪ辟ｶ縺輔ｒ荳∝ｯｧ縺ｫ繝√ぉ繝・け縺励※縺・∪縺・..</div></div>`;

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
                let resultTitle = isCorrect ? '脂 縺・＞縺ｧ縺吶・・・ : '潮 繧ゅ≧荳諱ｯ縺ｧ縺呻ｼ・;

                resultDiv.innerHTML = `
                    <div class="trans-drill-diff fade-in">
                        <div class="trans-drill-diff-label ${diffLabel}">
                            <span class="material-symbols-rounded" style="font-size:18px">${diffIcon}</span>
                            ${resultTitle}・医せ繧ｳ繧｢: ${result.score}/100・・
                        </div>
                        
                        <!-- 蜈育函縺ｮ繧ｳ繝｡繝ｳ繝・-->
                        <div class="trans-drill-answer-row" style="margin-top:8px; margin-bottom:12px">
                            <div class="row-label">束窶昨沛ｫ 蜈育函縺九ｉ縺ｮ繝輔ぅ繝ｼ繝峨ヰ繝・け</div>
                            <div class="row-text" style="background:rgba(108, 99, 255, 0.08); border-left:3px solid var(--accent-primary); line-height:1.6">
                                ${escapeHtml(result.comment).replace(/\n/g, '<br>')}
                            </div>
                        </div>

                        ${result.subjectVerb ? `
                            <!-- 荳ｻ隱槭→蜍戊ｩ槭・鬪ｨ譬ｼ -->
                            <div class="trans-drill-answer-row" style="margin-bottom:12px">
                                <div class="row-label">庁 縺薙・譁・・鬪ｨ譬ｼ・井ｸｻ隱槭→霑ｰ隱槭・髢｢菫ゑｼ・/div>
                                <div class="row-text" style="background:var(--bg-card); border: 1px dashed var(--accent-primary); display:flex; gap:16px; align-items:center">
                                    <div><strong style="color:var(--accent-primary)">荳ｻ隱・S):</strong> ${escapeHtml(result.subjectVerb.subject)}</div>
                                    <span class="material-symbols-rounded" style="color:var(--text-secondary); font-size:16px">arrow_right_alt</span>
                                    <div><strong style="color:var(--accent-secondary)">蜍戊ｩ・V):</strong> ${escapeHtml(result.subjectVerb.verb)}</div>
                                </div>
                            </div>
                        ` : ''}

                        ${(!isCorrect || result.corrected !== userAnswer) ? `
                            <div class="trans-drill-answer-row">
                                <div class="row-label">縺ゅ↑縺溘・隗｣遲・/div>
                                <div class="row-text user-text">${escapeHtml(userAnswer)}</div>
                            </div>
                            <div class="trans-drill-answer-row">
                                <div class="row-label">笨搾ｸ・菫ｮ豁｣譯茨ｼ域枚豕慕噪縺ｪ險よｭ｣・・/div>
                                <div class="row-text model-text">${escapeHtml(result.corrected)}</div>
                            </div>
                        ` : `
                            <div class="trans-drill-answer-row">
                                <div class="row-text correct-text">${escapeHtml(userAnswer)}</div>
                            </div>
                        `}

                        ${result.betterExpression ? `
                            <div class="trans-drill-answer-row" style="margin-top:8px">
                                <div class="row-label">庁 縺輔ｉ縺ｫ閾ｪ辟ｶ縺ｪ陦ｨ迴ｾ縺ｮ萓・/div>
                                <div class="row-text" style="background:var(--bg-card); border: 1px solid var(--accent-secondary); color:var(--text-primary)">
                                    ${escapeHtml(result.betterExpression)}
                                </div>
                            </div>
                        ` : ''}

                        <div class="btn-group" style="margin-top:16px">
                            <button class="btn btn-primary" id="transDrillNext">
                                <span class="material-symbols-rounded">arrow_forward</span>
                                ${idx + 1 < chunks.length ? '谺｡縺ｮ譁・∈' : '邨先棡繧定ｦ九ｋ'}
                            </button>
                        </div>

                        <!-- 蜈育函縺ｸ縺ｮ雉ｪ蝠上さ繝ｼ繝翫・ -->
                        <div class="trans-drill-qa fade-in" style="margin-top:20px; padding-top:16px; border-top:1px dashed var(--border-color);">
                            <div class="row-label" style="margin-bottom:8px">刹窶坂凰・・蜈育函縺ｸ縺ｮ雉ｪ蝠上・逍大撫繧定ｧ｣豎ｺ縺励ｈ縺・/div>
                            <div id="qaHistory" style="display:flex; flex-direction:column; gap:12px; margin-bottom:12px"></div>
                            <div style="display:flex; gap:8px">
                                <input type="text" id="qaInput" class="trans-drill-input" style="flex:1; margin:0; padding:8px 12px; font-size:0.9rem" placeholder="蜈育函縺ｫ雉ｪ蝠上☆繧・.. (萓・ general縺ｨcommon縺ｮ驕輔＞縺ｯ・・">
                                <button class="btn btn-secondary" id="qaSend" style="padding: 0 16px; border-radius:4px"><span class="material-symbols-rounded">send</span></button>
                            </div>
                        </div>
                    </div>
                `;

                $('transDrillInput').readOnly = true;
                checkBtn.style.display = 'none';

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

                    // Disable input
                    qaInput.disabled = true;
                    qaSend.disabled = true;
                    
                    // Add user message to UI
                    const userMsg = document.createElement('div');
                    userMsg.style.cssText = "align-self: flex-end; background: var(--bg-card); border: 1px solid var(--border-color); padding: 8px 12px; border-radius: 12px 12px 0 12px; font-size:0.9rem; max-width:85%";
                    userMsg.innerHTML = `<strong style="font-size:0.75rem; color:var(--text-secondary); display:block; margin-bottom:2px">縺ゅ↑縺・/strong>${escapeHtml(question)}`;
                    qaHistory.appendChild(userMsg);

                    // Add loading indicator
                    const aiMsg = document.createElement('div');
                    aiMsg.style.cssText = "align-self: flex-start; background: rgba(108, 99, 255, 0.08); border: 1px solid rgba(108, 99, 255, 0.2); padding: 8px 12px; border-radius: 12px 12px 12px 0; font-size:0.9rem; max-width:85%";
                    aiMsg.innerHTML = `<strong style="font-size:0.75rem; color:var(--accent-primary); display:block; margin-bottom:2px">束窶昨沛ｫ 蜈育函</strong><span class="material-symbols-rounded spinner" style="font-size:16px; vertical-align:middle">progress_activity</span> 蜈･蜉帑ｸｭ...`;
                    qaHistory.appendChild(aiMsg);

                    qaInput.value = '';

                    try {
                        const payload = {
                            action: 'ask_teacher',
                            question: question,
                            sentenceJa: chunk.sentenceJa,
                            studentAnswer: userAnswer,
                            modelAnswer: chunk.answer,
                            teacherFeedback: result.comment,
                            gradeId: (typeof WRITEPASS_CONFIG !== 'undefined' && WRITEPASS_CONFIG.gradeId) || 'grade_pre2plus'
                        };

                        const response = await fetch(gasUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                            body: JSON.stringify(payload)
                        });
                        const qaResult = await response.json();

                        if (qaResult.error) {
                            throw new Error(qaResult.error);
                        }

                        // Update UI with AI answer
                        aiMsg.innerHTML = `<strong style="font-size:0.75rem; color:var(--accent-primary); display:block; margin-bottom:2px">束窶昨沛ｫ 蜈育函</strong>${escapeHtml(qaResult.answer).replace(/\n/g, '<br>')}`;
                        
                    } catch (err) {
                        aiMsg.innerHTML = `<span style="color:var(--error)"><span class="material-symbols-rounded" style="font-size:16px; vertical-align:middle">error</span> 繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆縲よ凾髢薙ｒ鄂ｮ縺・※縺願ｩｦ縺励￥縺縺輔＞縲・/span>`;
                    }

                    qaInput.disabled = false;
                    qaSend.disabled = false;
                    qaInput.focus();
                };

                qaSend.addEventListener('click', handleQuestion);
                qaInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') handleQuestion();
                });

            } catch (err) {
                // Return generic error state
                transDrillChecked = false;
                checkBtn.disabled = false;
                checkBtn.innerHTML = originalBtnText;
                resultDiv.innerHTML = `
                    <div class="grade-error" style="margin-top:12px; padding:12px; background:rgba(248,113,113,0.1); border-left:3px solid var(--error); border-radius:4px; font-size:0.85rem">
                        <span class="material-symbols-rounded" style="vertical-align:middle; font-size:16px">error</span>
                        騾壻ｿ｡繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺ｾ縺励◆: ${escapeHtml(err.message)}<br>
                        繝阪ャ繝医Ρ繝ｼ繧ｯ險ｭ螳壹ｄAPI繧ｭ繝ｼ險ｭ螳壹ｒ遒ｺ隱阪＠縺ｦ繧ゅ≧荳蠎ｦ縺願ｩｦ縺励￥縺縺輔＞縲・
                    </div>
                `;
            }
        });

        // Enter key to submit
        $('transDrillInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
