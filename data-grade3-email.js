// ComPass Pro — 3級 Eメール返信データ
// 語数設定: 15〜25語
// ※3級のEメールは準2級と異なり、受信メールの質問2つに回答する形式

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
        underlinedTopic: "the art museum",
        senderName: "James",
        // 3級特有: alexEmail → senderEmail として使うが app-email.js は alexEmail を参照するのでこちらに設定
        alexEmail: "Hi,\n\nThank you for your e-mail. I heard that you went to the art museum in your town. I have some questions for you. <u>How many pictures did you see at the art museum? And how long did you stay there?</u>\n\nYour friend,\nJames",
        alexEmailJa: "こんにちは。\nEメールをありがとう。あなたがあなたの町の美術館に行ったと聞きました。あなたにいくつか質問があります。美術館で何枚の絵を見ましたか？そしてそこにはどれくらい長く滞在しましたか？\n\nあなたの友人、\nジェームズより",
        // 3級は「意見質問」ではなく「情報質問への回答」形式
        // opinionQuestionは空（3級は意見を求められない）
        opinionQuestion: "",
        opinions: {
            agree: {
                ja: "回答例A",
                jaText: "私はそこで約30枚の絵を見ました。2時間滞在して本当に楽しみました。",
                text: "I saw about thirty pictures there. I stayed there for two hours. I really enjoyed the art museum",
                chunks: ["I saw", "about thirty pictures", "there"]
            },
            disagree: {
                ja: "回答例B",
                jaText: "私はそこで約20枚の絵を見ました。1時間半滞在しました。とても面白かったです。",
                text: "I saw about twenty pictures there. I stayed there for one and a half hours. It was very interesting",
                chunks: ["I saw", "about twenty pictures", "there"]
            }
        },
        reasons: [
            { ja: "滞在時間（2時間）", jaText: "私はそこに2時間滞在しました", text: "I stayed there for two hours", chunks: ["I stayed there", "for two hours"] },
            { ja: "滞在時間（1時間半）", jaText: "私はそこに1時間半滞在しました", text: "I stayed there for one and a half hours", chunks: ["I stayed there", "for one and a half hours"] },
            { ja: "感想（楽しんだ）", jaText: "私はその美術館を本当に楽しみました", text: "I really enjoyed the art museum", chunks: ["I really enjoyed", "the art museum"] }
        ],
        negativeReasons: [
            { ja: "滞在時間（30分）", jaText: "私はそこにたった30分だけ滞在しました", text: "I stayed there for only thirty minutes", chunks: ["I stayed there", "for only", "thirty minutes"] },
            { ja: "感想（難しかった）", jaText: "絵を理解するのが難しかったです", text: "It was difficult to understand the pictures", chunks: ["It was difficult", "to understand", "the pictures"] }
        ],
        questions: [
            { ja: "絵の枚数", jaText: "私はそこで約30枚の絵を見ました", text: "I saw about thirty pictures there", chunks: ["I saw", "about thirty pictures", "there"] },
            { ja: "滞在時間", jaText: "私はそこに2時間滞在しました", text: "I stayed there for two hours", chunks: ["I stayed there", "for two hours"] },
            { ja: "感想", jaText: "私はその美術館を本当に楽しみました", text: "I really enjoyed the art museum", chunks: ["I really enjoyed", "the art museum"] }
        ],
        modelAnswer: "Hi, James!\nThank you for your e-mail. I saw about thirty pictures there. I stayed there for two hours. I really enjoyed the art museum.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールありがとう。私はそこで約30枚の絵を見ました。私はそこに2時間滞在しました。私はその美術館を本当に楽しみました。\n敬具"
    }
];
