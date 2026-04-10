// ComPass Pro — 3級 意見論述データ
// 語数設定: 25〜35語

const WRITEPASS_CONFIG = {
    minWords: 25,
    maxWords: 35,
    timerMinutes: 15,
    gradeLabel: '3級',
    taskLabel: '意見論述（大問5）',
    gradeId: 'grade_3',
    taskType: 'Opinion'
};

const THEMES = [
    // ===== 2024-1 =====
    {
        id: 1,
        title: "お気に入りの勉強場所",
        titleEn: "Favorite place to study",
        exam: "2024-1",
        question: "Where is your favorite place to do your homework?",
        questionJa: "あなたが宿題をするのにお気に入りの場所はどこですか？",
        modelAnswer: "My favorite place to do my homework is my room. First, I can use my dictionary there when I do my English homework. Second, I like doing my homework in a quiet place alone.",
        modelAnswerJa: "私が宿題をするのにお気に入りの場所は、自分の部屋です。第一に、英語の宿題をするときにそこで辞書を使うことができます。第二に、私は一人で静かな場所で宿題をするのが好きです。",
        fillBlanks: {
            template: "My [_1_] place to do my homework is my room. First, I can use my [_2_] there when I do my English homework. Second, I like [_3_] my homework in a quiet place [_4_].",
            blanks: [
                { id: 1, answer: "favorite", options: ["favorite", "important", "popular", "difficult"] },
                { id: 2, answer: "dictionary", options: ["dictionary", "notebook", "textbook", "calendar"] },
                { id: 3, answer: "doing", options: ["doing", "making", "taking", "getting"] },
                { id: 4, answer: "alone", options: ["alone", "along", "almost", "already"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "私が宿題をするのにお気に入りの場所は、自分の部屋です。",
                literalJa: "私のお気に入りの場所は / 宿題をするための / 自分の部屋です",
                answer: "My favorite place to do my homework is my room.",
                pieces: ["My favorite place", "to do my homework", "is my room."]
            },
            {
                sentenceJa: "第一に、英語の宿題をするときにそこで辞書を使うことができます。",
                literalJa: "第一に、 / 私はそこで辞書を使えます / 英語の宿題をするときに",
                answer: "First, I can use my dictionary there when I do my English homework.",
                pieces: ["First,", "I can use my dictionary there", "when I do", "my English homework."]
            },
            {
                sentenceJa: "第二に、私は一人で静かな場所で宿題をするのが好きです。",
                literalJa: "第二に、 / 私は宿題をするのが好きです / 静かな場所で / 一人で",
                answer: "Second, I like doing my homework in a quiet place alone.",
                pieces: ["Second,", "I like doing my homework", "in a quiet place", "alone."]
            }
        ],
        keyExpressions: [
            { en: "My favorite place to ... is ~", ja: "…するのにお気に入りの場所は〜です", note: "お気に入りを述べる定番表現" },
            { en: "First, ... Second, ...", ja: "第一に…。第二に…。", note: "理由を並べる" },
            { en: "I can use ... when ~", ja: "〜するとき…を使える", note: "具体例を述べる" },
            { en: "I like doing ... in ~", ja: "〜で…するのが好き", note: "好みを述べる" }
        ]
    }
];
