/**
 * ComPass Pro AI Grader — Google Apps Script
 * 
 * ===== セットアップ手順 =====
 * 1. https://script.google.com/ で新しいプロジェクトを作成
 * 2. このコードをコード.gs に貼り付け
 * 3. プロジェクトの設定 → スクリプトプロパティに以下を追加:
 *    キー: GEMINI_API_KEY
 *    値: Google AI Studio で取得したAPIキー (https://aistudio.google.com/apikey)
 * 4. デプロイ → 新しいデプロイ → ウェブアプリ
 *    - 実行するユーザー: 自分
 *    - アクセスできるユーザー: 全員
 * 5. デプロイURLをコピーして ComPass Pro の app.js にセット
 */

// ===== 採点基準マスターデータ =====
const SCORING_CONFIG = {
    system_role: "あなたは英語資格検定（実用英語技能検定）のプロの採点官です。提供された受験者の解答を、2024年度からの新形式に基づき、極めて正確かつ公平に採点し、詳細なフィードバックを行ってください。",

    standard_rubric: {
        content: "課題で求められている内容（意見、理由、要点など）が過不足なく含まれているか。論点がトピックから逸れていないか。",
        structure: "英文の構成や流れが分かりやすく論理的か。接続詞やパラグラフ構成が適切か。",
        vocabulary: "級のレベルに相応しい語彙を正しく使用しているか。同じ語句の繰り返しを避け、言い換え（パラフレーズ）ができているか。",
        grammar: "文構造のバリエーション（複文、分詞、関係代名詞など）があり、それらを正しく使えているか。"
    },

    deduction_criteria: {
        word_count: "目安を大幅に（10語以上）超える、または下回る場合は「構成」や「内容」で減点。半分以下の場合は0点の可能性あり。",
        copy_paste: "要約問題において本文をそのまま（3語以上の連続一致が頻発）写している場合は「語彙」「構成」で大幅減点。",
        relevance: "トピックと無関係な内容、自分の経験のみで客観性のない理由（準1級・2級）は「内容」を0〜1点とする。",
        formatting: "ピリオドの欠如、文頭の小文字、不適切な改行などは「文法」で減点。"
    },

    grades: {
        grade_pre1: {
            label: "準1級",
            tasks: {
                Summary: {
                    word_count: "60-70",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "全3パラグラフの要点を網羅していること",
                        "本文の表現をそのままコピーせず、自分の言葉で言い換えていること",
                        "導入文→本論→結論の論理構成を維持していること"
                    ]
                },
                Opinion: {
                    word_count: "120-150",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "導入、本論（理由2つ）、結論の4パラグラフ構成であること",
                        "提示された4つのPOINTSから2つを選んで理由を構成していること",
                        "社会性の高い話題に対し、客観的かつ論理的な根拠を示していること"
                    ]
                }
            }
        },
        grade_2: {
            label: "2級",
            tasks: {
                Summary: {
                    word_count: "45-55",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "本文の論理展開（例：問題提起→解決策→結果）を正確に反映していること",
                        "不必要な詳細（固有名詞、具体的な数字など）を削ぎ落とし、抽象化できていること"
                    ]
                },
                Opinion: {
                    word_count: "80-100",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "理由を2つ書いていること",
                        "First, Secondなどの接続詞を用いて構成を明確にしていること"
                    ]
                }
            }
        },
        grade_pre2plus: {
            label: "準2級プラス",
            tasks: {
                Summary: {
                    word_count: "25-35",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "原文の3つの段落すべてのポイントを正確にカバーしていること",
                        "「導入→メリット(because)→デメリット(However)」の3文構成であること",
                        "本文の表現をそのまま使わず言い換えていること"
                    ]
                },
                Opinion: {
                    word_count: "50-60",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "トピックに対する自分の意見を明快に述べていること",
                        "理由を2つ書いていること",
                        "First, Secondなどの接続詞を用いて構成を明確にしていること"
                    ]
                }
            }
        },
        grade_pre2: {
            label: "準2級",
            tasks: {
                Email_Reply: {
                    word_count: "40-50",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "相手からのメールに含まれる下線部の内容に対し、具体的に質問を2つ行っているか",
                        "メールの返信として自然な文脈を維持しているか"
                    ]
                },
                Opinion: {
                    word_count: "50-60",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "トピックに対する自分の意見を明快に述べていること",
                        "理由を2つ書いていること"
                    ]
                }
            }
        },
        grade_3: {
            label: "3級",
            tasks: {
                Email_Reply: {
                    word_count: "15-25",
                    max_score_per_item: 3,
                    total_max_score: 9,
                    items: ["Content", "Vocabulary", "Grammar"],
                    specific_rules: [
                        "相手の2つの質問に対し、正確かつ簡潔に答えているか",
                        "挨拶（Hi / Hello）から始まり、文脈が繋がっているか"
                    ]
                },
                Opinion: {
                    word_count: "25-35",
                    max_score_per_item: 4,
                    total_max_score: 16,
                    specific_rules: [
                        "トピックへの回答と、その理由2つが含まれていること"
                    ]
                }
            }
        }
    }
};

// ===== 級・タスクタイプを判定するヘルパー =====
function resolveGradeAndTask(gradeId, taskType) {
    const grade = SCORING_CONFIG.grades[gradeId] || SCORING_CONFIG.grades.grade_pre2plus;
    const task = grade.tasks[taskType] || grade.tasks.Summary || Object.values(grade.tasks)[0];
    return { grade, task, gradeLabel: grade.label };
}

// ===== API エンドポイント =====
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const { action, passage, modelAnswer, studentAnswer, passageJa,
            sentenceJa, imageBase64, imageMimeType, gradeId, taskType } = data;

        // 1文ステップワイズ添削の場合 (アクション指定)
        if (action === 'grade_sentence') {
            if (!studentAnswer || studentAnswer.trim().length === 0) {
                return jsonResponse({ error: '解答が入力されていません。' });
            }
            const result = gradeSentenceWithGemini(sentenceJa, modelAnswer, studentAnswer, gradeId);
            return jsonResponse(result);
        }

        // 画像入力の場合: OCR → 採点
        if (imageBase64) {
            const ocrText = ocrWithGemini(imageBase64, imageMimeType || 'image/jpeg');
            if (ocrText.error) {
                return jsonResponse(ocrText);
            }
            const result = gradeWithGemini(passage, modelAnswer, ocrText.text, passageJa, gradeId, taskType);
            result.ocrText = ocrText.text;
            return jsonResponse(result);
        }

        // テキスト入力の場合: 通常の採点
        if (!studentAnswer || studentAnswer.trim().length === 0) {
            return jsonResponse({ error: '解答が入力されていません。' });
        }

        const result = gradeWithGemini(passage, modelAnswer, studentAnswer, passageJa, gradeId, taskType);
        return jsonResponse(result);
    } catch (err) {
        return jsonResponse({ error: 'エラーが発生しました: ' + err.message });
    }
}

function doGet(e) {
    return jsonResponse({ status: 'ok', message: 'ComPass Pro Grader API is running.' });
}

// ===== Gemini API 呼び出し =====
function gradeWithGemini(passage, modelAnswer, studentAnswer, passageJa, gradeId, taskType) {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) {
        return { error: 'APIキーが設定されていません。スクリプトプロパティにGEMINI_API_KEYを設定してください。' };
    }

    const { grade, task } = resolveGradeAndTask(gradeId, taskType);
    const prompt = buildPrompt(passage, modelAnswer, studentAnswer, passageJa, gradeId, taskType);
    const maxScore = task.max_score_per_item;
    const totalMax = task.total_max_score;

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' + apiKey;

    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'OBJECT',
                properties: {
                    totalScore: { type: 'INTEGER', description: '合計点（0〜' + totalMax + '点）' },
                    categories: {
                        type: 'ARRAY',
                        items: {
                            type: 'OBJECT',
                            properties: {
                                name: { type: 'STRING', description: '評価項目名' },
                                score: { type: 'INTEGER', description: 'この項目の得点（0〜' + maxScore + '）' },
                                maxScore: { type: 'INTEGER', description: 'この項目の満点' },
                                comment: { type: 'STRING', description: 'この項目のフィードバック（日本語）' },
                                highlightTexts: {
                                    type: 'ARRAY',
                                    items: { type: 'STRING' },
                                    description: '生徒の解答からこの観点に関連する部分を正確に引用した文字列の配列。良い点は+を、問題点は-を先頭につける。例: ["+Group projects are common", "-others feel unfair"]'
                                }
                            },
                            required: ['name', 'score', 'maxScore', 'comment', 'highlightTexts']
                        }
                    },
                    overallComment: { type: 'STRING', description: '総合コメント（日本語、50字以内）' },
                    improvedVersion: { type: 'STRING', description: '改善例（英語、' + task.word_count + '語）' },
                    errors: {
                        type: 'ARRAY',
                        items: {
                            type: 'OBJECT',
                            properties: {
                                original: { type: 'STRING', description: '生徒の解答中のミスのある部分（そのまま引用）' },
                                corrected: { type: 'STRING', description: '修正後の表現' },
                                type: { type: 'STRING', description: 'ミスの種類（spelling/grammar/vocabulary/punctuation）' },
                                explanation: { type: 'STRING', description: 'なぜ間違いかの説明（日本語）' }
                            },
                            required: ['original', 'corrected', 'type', 'explanation']
                        },
                        description: '生徒の解答に含まれるスペルミス、文法ミス、語法ミス、句読点ミスの一覧。ミスがない場合は空配列を返す。'
                    }
                },
                required: ['totalScore', 'categories', 'overallComment', 'improvedVersion', 'errors']
            }
        }
    };

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    if (json.error) {
        return { error: 'Gemini APIエラー: ' + json.error.message };
    }

    try {
        const text = json.candidates[0].content.parts[0].text;
        return JSON.parse(text);
    } catch (parseErr) {
        return { error: 'レスポンスの解析に失敗しました。' };
    }
}

// ===== 1文ステップワイズ添削用 Gemini API 呼び出し =====
function gradeSentenceWithGemini(sentenceJa, modelAnswer, studentAnswer, gradeId) {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) {
        return { error: 'APIキーが設定されていません。' };
    }

    const { gradeLabel } = resolveGradeAndTask(gradeId, 'Summary'); // ラベル取得用

    const prompt = `あなたは優しくて丁寧な英語教師です。（対象は英検${gradeLabel}レベル）
生徒が日本語の課題文を英語に翻訳（または作文）する練習をしています。
生徒が書いた1文を丁寧に添削し、フィードバックを返してください。

【重要方針】
英語学習において「主語(Subject)」と「述語動詞(Verb)」の関係を抽出して明確に理解させることが最も重要です。
必ず模範解答の文から主語と動詞を抽出し、生徒の解答の主語・動詞が適切だったか（単数複数の一致、時制など）を解説に含めてください。

課題文（日本語）: ${sentenceJa}
模範解答: ${modelAnswer}
生徒の解答: ${studentAnswer}

以下の要件に沿ってJSONフォーマットで出力してください:
1. "score": 0〜100のスコア。模範解答と一言一句同じでなくても、文法が正しく意味が通っていれば高得点をあげてください。
2. "isCorrect": 意味が通じ、深刻な文法ミスがなければ true。
3. "comment": 先生からの温かいコメント。主語(S)と述語動詞(V)の関係性に必ず触れつつ、間違えやすいポイントや気づきを解説してください。
4. "subjectVerb": 模範解答の正解となる主語(subject)と動詞(verb)の文字列。
5. "corrected": 文法ミスがあれば修正した文。もし生徒の文法が完璧なら生徒の解答をそのまま入れてください。
6. "betterExpression": ネイティブから見てさらに自然で美しい言い回しや、別の表現の提案（任意）`;

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' + apiKey;

    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            temperature: 0.2, // ブレを少なく
            responseMimeType: 'application/json',
            responseSchema: {
                type: 'OBJECT',
                properties: {
                    score: { type: 'INTEGER', description: '正確さと自然さに基づくスコア(0-100)' },
                    isCorrect: { type: 'BOOLEAN', description: '合格点(true/false)' },
                    comment: { type: 'STRING', description: '生徒への優しく丁寧な解説コメント。主語と動詞の関係性に言及すること。' },
                    subjectVerb: {
                        type: 'OBJECT',
                        properties: {
                            subject: { type: 'STRING', description: 'この文の主語(S)' },
                            verb: { type: 'STRING', description: 'この文の述語動詞(V)' }
                        },
                        required: ['subject', 'verb']
                    },
                    corrected: { type: 'STRING', description: '生徒の文の文法的修正。ミスがなければ生徒の文をそのまま返す。' },
                    betterExpression: { type: 'STRING', description: 'さらに洗練された別の言い方（提案）' }
                },
                required: ['score', 'isCorrect', 'comment', 'subjectVerb', 'corrected']
            }
        }
    };

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    if (json.error) {
        return { error: 'Gemini APIエラー: ' + json.error.message };
    }

    try {
        const text = json.candidates[0].content.parts[0].text;
        return JSON.parse(text);
    } catch (parseErr) {
        return { error: 'レスポンスの解析に失敗しました。' };
    }
}

// ===== 画像からOCR（手書き文字認識） =====
function ocrWithGemini(imageBase64, mimeType) {
    const apiKey = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) {
        return { error: 'APIキーが設定されていません。' };
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=' + apiKey;

    const payload = {
        contents: [{
            parts: [
                {
                    text: 'この画像に手書きまたは印刷された英語の文章が含まれています。文章を正確に読み取ってテキスト化してください。英語の文章のみを出力してください。改行やスペルミスがあればそのまま忠実に再現してください。英語の文章以外は出力しないでください。'
                },
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: imageBase64
                    }
                }
            ]
        }],
        generationConfig: {
            temperature: 0.1
        }
    };

    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(response.getContentText());

    if (json.error) {
        return { error: 'OCRエラー: ' + json.error.message };
    }

    try {
        const text = json.candidates[0].content.parts[0].text;
        return { text: text.trim() };
    } catch (parseErr) {
        return { error: '画像からテキストを読み取れませんでした。' };
    }
}

// ===== 採点プロンプト生成 =====
function buildPrompt(passage, modelAnswer, studentAnswer, passageJa, gradeId, taskType) {
    const { grade, task, gradeLabel } = resolveGradeAndTask(gradeId, taskType);
    const effectiveTaskType = taskType || 'Summary';
    const maxPts = task.max_score_per_item;
    const totalMax = task.total_max_score;
    const wordRange = task.word_count;
    // 3級Eメール返信は3観点（構成なし）
    const is3CriteriaMode = task.items && task.items.length === 3;

    // タスクタイプ日本語ラベル
    const taskLabels = {
        Summary: '英文要約',
        Opinion: '英作文（意見論述）',
        Email_Reply: 'Eメール返信'
    };
    const taskLabel = taskLabels[effectiveTaskType] || effectiveTaskType;

    // --- 共通の採点基準テキスト ---
    let rubricText = '';

    if (effectiveTaskType === 'Summary') {
        rubricText = `
### 1. 内容 (Content) — 0〜${maxPts}点
- ${maxPts}点: 原文の全パラグラフの要点を正確にカバーしている
- ${maxPts - 1}点: 概ねカバーしているが一部不足
- ${maxPts - 2}点: 主要なポイントが1つ以上欠けている
- 1点: 原文の内容をほとんどカバーできていない
- 0点: 課題に無関係

### 2. 構成 (Structure) — 0〜${maxPts}点
- ${maxPts}点: 導入→本論→結論の構成が明確で接続詞が適切
- ${maxPts - 1}点: 構成はあるが接続詞の使い方がやや不適切
- ${maxPts - 2}点: 構成が不明確
- 1点: 構成がほぼ崩れている
- 0点: 構成なし

### 3. 語彙・パラフレーズ (Vocabulary) — 0〜${maxPts}点
- ${maxPts}点: 原文の表現を適切に言い換え（パラフレーズ）している
- ${maxPts - 1}点: 概ね言い換えているが一部原文のまま
- ${maxPts - 2}点: 半分以上原文のまま
- 1点: ほぼ原文のコピー
- 0点: 語彙が不適切
**重要**: 3語以上の連続一致が頻発する場合は、「語彙」「構成」で大幅減点。

### 4. 文法 (Grammar) — 0〜${maxPts}点
- ${maxPts}点: 文法ミスなし
- ${maxPts - 1}点: 軽微なミスが1つ
- ${maxPts - 2}点: ミスが2〜3つ
- 1点: ミスが多く意味が取りにくい
- 0点: 意味不明`;

    } else if (effectiveTaskType === 'Opinion') {
        rubricText = `
### 1. 内容 (Content) — 0〜${maxPts}点
- ${maxPts}点: トピックに対する意見が明確で、根拠が十分かつ説得力がある
- ${maxPts - 1}点: 意見と理由はあるが、一部説明が不十分
- ${maxPts - 2}点: 理由が1つしかない、または根拠が曖昧
- 1点: トピックからずれている
- 0点: 課題に無関係

### 2. 構成 (Structure) — 0〜${maxPts}点
- ${maxPts}点: 序論→本論→結論が明確で、接続詞が効果的
- ${maxPts - 1}点: 構成はあるが流れがやや不自然
- ${maxPts - 2}点: 構成が不明確
- 1点: 構成がほぼ崩れている
- 0点: 構成なし

### 3. 語彙 (Vocabulary) — 0〜${maxPts}点
- ${maxPts}点: 級のレベルに相応しい語彙を正確かつ効果的に使用
- ${maxPts - 1}点: 概ね適切だが一部不自然な語句
- ${maxPts - 2}点: 語彙が限定的で同じ表現の繰り返し
- 1点: 語彙が不適切で意味が伝わりにくい
- 0点: 語彙が全く不適切

### 4. 文法 (Grammar) — 0〜${maxPts}点
- ${maxPts}点: 文法ミスなし、複文や分詞構文など多様な構文を使用
- ${maxPts - 1}点: 軽微なミスが1つ
- ${maxPts - 2}点: ミスが2〜3つ
- 1点: ミスが多く意味が取りにくい
- 0点: 意味不明`;

    } else if (effectiveTaskType === 'Email_Reply') {
        if (is3CriteriaMode) {
            // 3級: 3観点×各3点 = 9点満点（構成なし）
            rubricText = `
### 1. 内容 (Content) — 0〜${maxPts}点
- ${maxPts}点: 相手の2つの質問に正確かつ適切に答えている
- ${maxPts - 1}点: 概ね応答しているが一部不足
- 1点: 応答がほとんどできていない
- 0点: 課題に無関係

### 2. 語彙 (Vocabulary) — 0〜${maxPts}点
- ${maxPts}点: 級のレベルに相応しい語彙を正確に使用
- ${maxPts - 1}点: 概ね適切だが一部不自然
- 1点: 語彙が不適切
- 0点: 語彙が全く不適切

### 3. 文法 (Grammar) — 0〜${maxPts}点
- ${maxPts}点: 文法ミスなし
- ${maxPts - 1}点: 軽微なミスが1つ
- 1点: ミスが多く意味が取りにくい
- 0点: 意味不明

**注意**: この級のEメール返信は「構成(Structure)」の観点はありません。3観点のみで採点してください。`;
        } else {
            // 準2級以上: 4観点×各4点 = 16点満点
            rubricText = `
### 1. 内容 (Content) — 0〜${maxPts}点
- ${maxPts}点: 相手のメールに適切に応答し、必要な質問を行っている
- ${maxPts - 1}点: 概ね応答しているが一部不足
- ${maxPts - 2}点: 応答が不完全
- 1点: 応答がほぼできていない
- 0点: 課題に無関係

### 2. 構成 (Structure) — 0〜${maxPts}点
- ${maxPts}点: メール返信として自然な流れで構成されている
- ${maxPts - 1}点: 概ね自然だが一部不自然
- ${maxPts - 2}点: 流れが不自然
- 1点: 構成がほぼ崩れている
- 0点: 構成なし

### 3. 語彙 (Vocabulary) — 0〜${maxPts}点
- ${maxPts}点: 級のレベルに相応しい語彙を正確に使用
- ${maxPts - 1}点: 概ね適切
- ${maxPts - 2}点: 語彙が限定的
- 1点: 語彙が不適切
- 0点: 語彙が全く不適切

### 4. 文法 (Grammar) — 0〜${maxPts}点
- ${maxPts}点: 文法ミスなし
- ${maxPts - 1}点: 軽微なミスが1つ
- ${maxPts - 2}点: ミスが2〜3つ
- 1点: ミスが多い
- 0点: 意味不明`;
        }
    }

    // --- 級固有ルール ---
    const specificRulesText = task.specific_rules.map((r, i) => `${i + 1}. ${r}`).join('\n');

    // --- 減点基準 ---
    const deductionText = Object.entries(SCORING_CONFIG.deduction_criteria)
        .map(([key, val]) => `- **${key}**: ${val}`)
        .join('\n');

    // --- プロンプト組み立て ---
    return `${SCORING_CONFIG.system_role}

## 英語資格検定${gradeLabel} ${taskLabel} 採点基準

目安語数: ${wordRange}語 ｜ 各観点 0〜${maxPts}点 ｜ 合計${totalMax}点満点

${rubricText}

## ${gradeLabel}固有のルール
${specificRulesText}

## 減点基準
${deductionText}

## 採点対象

**原文:**
${passage}

${passageJa ? '**原文の日本語訳:**\n' + passageJa + '\n' : ''}
${modelAnswer ? '**模範解答（参考）:**\n' + modelAnswer + '\n' : ''}
**生徒の解答:**
${studentAnswer}

## 指示
- 上記${is3CriteriaMode ? '3つ' : '4つ'}の観点でそれぞれ0〜${maxPts}点で採点してください。
- 各観点に日本語で簡潔なフィードバックをつけてください（優しく励ましながらも具体的に）。
- 総合コメントは50字以内で日本語で書いてください。
- 生徒の解答をベースに改善例を1つ英語で提案してください（${wordRange}語）。
- categoriesの順番は: ${is3CriteriaMode ? '内容, 語彙, 文法' : '内容, 構成, 語彙, 文法'} としてください。
${is3CriteriaMode ? '- 「構成」の観点は含めないでください。3つの観点のみ出力してください。' : ''}
- 各categoriesのhighlightTextsには、生徒の解答から該当する部分を正確にそのまま引用してください。
  - 良い点は「+」を先頭につけ、問題点は「-」を先頭につけてください。
  - 例: ["+Group projects are common", "-others feel unfair"]
  - 必ず生徒の解答に実際に含まれている文字列を引用してください。
- errorsには、生徒の解答に含まれるミスを全て列挙してください。
  - original: ミスのある部分を生徒の解答からそのまま引用（1〜5語程度）
  - corrected: 正しい表現に修正した版
  - type: ミスの種類（spelling=スペルミス, grammar=文法ミス, vocabulary=語法ミス, punctuation=句読点ミス）
  - explanation: なぜ間違いかを日本語で簡潔に説明
  - 例: {"original": "peaples", "corrected": "people", "type": "spelling", "explanation": "peopleのスペルミスです"}
  - ミスがない場合は空配列[]を返してください
${effectiveTaskType === 'Summary' ? '- 語彙の採点では、本文のキーワードを類義語に適切に置き換えているかを重視してください（例: important→crucial, help→assist, problem→issue）。原文の表現がそのまま使われている箇所は具体的に指摘してください。' : ''}`;
}

// ===== ユーティリティ =====
function jsonResponse(data) {
    const output = ContentService.createTextOutput(JSON.stringify(data));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
}

// テスト用関数
function testGrade() {
    const testData = {
        passage: "Schools in some countries have often supplied free lunch to a limited number of their students. These meals tend to include a variety of foods, including salads and desserts. Nowadays, there are programs that provide such lunches to all students. Many in favor of the programs want them to continue.\n\nSupporters point to the benefits. Studies show a relationship between nutrition and how well students do in school. Therefore, providing a healthy meal for all students is important. Doing this can improve their concentration levels, leading to better test scores. Additionally, free school meal programs have another advantage. Many parents today are often extremely busy, giving them little time to prepare lunches for their children. The programs, therefore, are a huge help.\n\nCritics, on the other hand, say that providing school meals for everyone is problematic. Schools need to prepare enough meals every day for all students. However, some students do not completely eat the food that has been prepared. Consequently, a large amount is left over. The schools have no option but to throw it away.",
        modelAnswer: "Some countries now offer free school lunches to all students, and many people support these programs. Proponents argue that nutritious meals help students concentrate better and achieve higher test scores. They also help busy parents by saving time spent on meal preparation. However, opponents point out that not all students finish their meals, resulting in significant food waste.",
        studentAnswer: "Free school lunch programs are now available in some countries. Supporters say healthy meals improve students' focus and save time for parents. However, critics worry that uneaten food leads to waste, as schools must dispose of leftover meals.",
        passageJa: "いくつかの国の学校では、限られた数の生徒に無料の昼食を提供してきました。現在では、すべての生徒に昼食を提供するプログラムがあります。\n\n支持者は利点を指摘します。栄養と学業成績には関連があり、集中力向上やテスト成績改善につながります。また、忙しい保護者の助けにもなります。\n\n批判者は、全生徒分の食事を準備しても完食されず、食品廃棄が生じると述べています。",
        gradeId: "grade_pre1",
        taskType: "Summary"
    };

    const result = gradeWithGemini(
        testData.passage, testData.modelAnswer,
        testData.studentAnswer, testData.passageJa,
        testData.gradeId, testData.taskType
    );
    Logger.log(JSON.stringify(result, null, 2));
}
