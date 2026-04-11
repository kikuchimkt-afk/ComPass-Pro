// ComPass Pro — 3級 Eメール返信データ
// ※3級: 受信メールの下線部質問2つに回答する形式
// 語数設定: 15〜25語（回答部分のみ）

const WRITEPASS_CONFIG = {
    minWords: 15,
    maxWords: 25,
    timerMinutes: 15,
    gradeLabel: '3級',
    taskLabel: 'Eメール（大問4）',
    gradeId: 'grade_3',
    taskType: 'Email_Reply'
};

const EMAIL_THEMES = [
    // ===== 2024-1 =====
    {
        id: 1,
        title: "美術展への訪問",
        exam: "2024-1",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. I heard that you went to the art museum in your town. I have some questions for you. <u>How many pictures did you see at the art museum? And how long did you stay there?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたが町の美術館に行ったと聞きました。いくつか質問があります。<u>美術館で何枚の絵を見ましたか？そしてそこにはどのくらいいましたか？</u>\n\nあなたの友人、\nジェームズ",

        // 質問1
        question1: "How many pictures did you see at the art museum?",
        question1Ja: "美術館で何枚の絵を見ましたか？",
        answers1: [
            { id: 1, ja: "約30枚", text: "I saw about thirty pictures", jaText: "私は約30枚の絵を見ました" },
            { id: 2, ja: "たくさん", text: "I saw a lot of pictures", jaText: "私はたくさんの絵を見ました" },
            { id: 3, ja: "約50枚", text: "I saw about fifty pictures", jaText: "私は約50枚の絵を見ました" }
        ],

        // 質問2
        question2: "And how long did you stay there?",
        question2Ja: "そこにはどのくらいいましたか？",
        answers2: [
            { id: 1, ja: "2時間", text: "I stayed there for two hours", jaText: "私はそこに2時間いました" },
            { id: 2, ja: "1時間半", text: "I stayed there for one and a half hours", jaText: "私はそこに1時間半いました" },
            { id: 3, ja: "30分", text: "I stayed there for about thirty minutes", jaText: "私はそこに約30分いました" }
        ],

        // ---- Step 2 練習素材 ----
        // チャンク並べ替え（模範解答の各文を分解）
        chunks: [
            {
                sentenceJa: "私はそこで約30枚の絵を見ました。",
                literalJa: "私は見ました / 約30枚の / 絵を / そこで",
                answer: "I saw about thirty pictures there.",
                pieces: ["I saw", "about thirty", "pictures", "there."]
            },
            {
                sentenceJa: "私はそこに2時間いました。",
                literalJa: "私はいました / そこに / 2時間",
                answer: "I stayed there for two hours.",
                pieces: ["I stayed", "there", "for two hours."]
            },
            {
                sentenceJa: "私はその美術館をとても楽しみました。",
                literalJa: "私は本当に楽しみました / その美術館を",
                answer: "I really enjoyed the art museum.",
                pieces: ["I really", "enjoyed", "the art museum."]
            }
        ],

        // ガイド付き自由記述のヒント（各文ごと）
        guidedHints: [
            { label: "質問1への回答", hintJa: "美術館で何枚の絵を見たか、数を答えましょう。", modelSentence: "I saw about thirty pictures there." },
            { label: "質問2への回答", hintJa: "そこにどのくらいの時間いたか、答えましょう。", modelSentence: "I stayed there for two hours." },
            { label: "追加の一文", hintJa: "美術館の感想を一文で書きましょう。", modelSentence: "I really enjoyed the art museum." }
        ],

        // チェックリスト（ガイド付き自由記述用）
        checklist: [
            "質問1（絵の枚数）に答えているか？",
            "質問2（滞在時間）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I saw about thirty pictures there. I stayed there for two hours. I really enjoyed the art museum.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。私はそこで約30枚の絵を見ました。私はそこに2時間いました。その美術館はとても楽しかったです。\n敬具"
    }
];
