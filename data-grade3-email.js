const WRITEPASS_CONFIG = {
    minWords: 15,
    maxWords: 25,
    timerMinutes: 15,
    gradeLabel: '3級',
    taskLabel: 'Eメール（大問4）',
    gradeId: 'grade_3',
    taskType: 'Email_Reply'
};

const THEMES = [
    {
        id: 1,
        title: "美術展への訪問",
        titleEn: "Visiting an art museum",
        exam: "2024-1",
        passage: {
            intro: "Hi,\n\nThank you for your e-mail.\nI heard that you went to the art museum in your town. I have some questions for you.\n\nHow many pictures did you see at the art museum? And how long did you stay there?\n\nYour friend,\nJames",
            merit: "",
            demerit: ""
        },
        passageJa: {
            intro: "こんにちは。\nEメールをありがとう。\nあなたがあなたの町の美術館に行ったと聞きました。あなたにいくつか質問があります。\n美術館で何枚の絵を見ましたか？そしてそこにはどれくらい長く滞在しましたか？\n\nあなたの友人、\nジェームズより",
            merit: "",
            demerit: ""
        },
        modelAnswer: "I saw about thirty pictures there. I stayed there for two hours. I really enjoyed the art museum.",
        modelAnswerJa: "私はそこで約30枚の絵を見ました。私はそこに2時間滞在しました。私はその美術館を本当に楽しみました。",
        fillBlanks: {
            template: "I saw [_1_] thirty pictures there. I [_2_] there for two hours. I really [_3_] the art [_4_].",
            blanks: [
                { id: 1, answer: "about", options: ["about", "above", "around", "along"] },
                { id: 2, answer: "stayed", options: ["stayed", "stood", "started", "stopped"] },
                { id: 3, answer: "enjoyed", options: ["enjoyed", "excited", "expected", "entered"] },
                { id: 4, answer: "museum", options: ["museum", "music", "movie", "mountain"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "私はそこで約30枚の絵を見ました。",
                literalJa: "私は見ました / そこで約30枚の絵を",
                answer: "I saw about thirty pictures there.",
                pieces: ["I saw", "about thirty pictures there."]
            },
            {
                sentenceJa: "私はそこに2時間滞在しました。",
                literalJa: "私はそこに滞在しました / 2時間",
                answer: "I stayed there for two hours.",
                pieces: ["I stayed there", "for two hours."]
            },
            {
                sentenceJa: "私はその美術館を本当に楽しみました。",
                literalJa: "私は本当に楽しみました / その美術館を",
                answer: "I really enjoyed the art museum.",
                pieces: ["I really enjoyed", "the art museum."]
            }
        ],
        paraphrases: []
    }
];
