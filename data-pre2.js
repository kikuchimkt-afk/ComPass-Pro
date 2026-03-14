// ComPass Pro — 準2級 意見文データ
// 語数設定: 50〜60語

const WRITEPASS_CONFIG = {
    minWords: 50,
    maxWords: 60,
    timerMinutes: 15,
    gradeLabel: '準2級',
    taskLabel: '英作文（意見文）',
    gradeId: 'grade_pre2',
    taskType: 'Opinion'
};

const THEMES = [
    // ===== 2024-1 =====
    {
        id: 1,
        title: "朝早起きして勉強",
        titleEn: "Studying Early in the Morning",
        exam: "2024-1",
        question: "Do you think it is a good idea for students to get up early to study in the morning?",
        questionJa: "朝早く起きて勉強することは学生にとって良い考えだと思いますか？",
        modelAnswer: "I think it is a good idea for students to get up early to study in the morning. I have two reasons. First, it is quiet in the morning, so students can focus better on their studies. Second, studying in the morning helps students remember things more easily because their brains are fresh after sleeping.",
        modelAnswerJa: "朝早く起きて勉強することは学生にとって良い考えだと思います。理由は2つあります。第一に、朝は静かなので、学生はより集中して勉強できます。第二に、睡眠後は脳がリフレッシュされているため、朝の勉強は物事をより簡単に記憶するのに役立ちます。",
        fillBlanks: {
            template: "I think it is a good idea for students to get up early to study in the morning. I have two [_1_]. First, it is [_2_] in the morning, so students can [_3_] better on their studies. Second, studying in the morning helps students [_4_] things more easily because their brains are [_5_] after sleeping.",
            blanks: [
                { id: 1, answer: "reasons", options: ["reasons", "problems", "stories", "questions"] },
                { id: 2, answer: "quiet", options: ["quiet", "loud", "dark", "cold"] },
                { id: 3, answer: "focus", options: ["focus", "give up", "complain", "forget"] },
                { id: 4, answer: "remember", options: ["remember", "ignore", "avoid", "lose"] },
                { id: 5, answer: "fresh", options: ["fresh", "tired", "empty", "weak"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "朝早く起きて勉強することは学生にとって良い考えだと思います。",
                answer: "I think it is a good idea for students to get up early to study in the morning.",
                pieces: ["I think", "it is a good idea", "for students", "to get up early", "to study", "in the morning."]
            },
            {
                sentenceJa: "朝は静かなので学生はより集中して勉強できる。",
                answer: "It is quiet in the morning, so students can focus better on their studies.",
                pieces: ["It is quiet", "in the morning,", "so students can", "focus better", "on their studies."]
            },
            {
                sentenceJa: "睡眠後は脳がリフレッシュされているので朝の勉強は記憶に役立つ。",
                answer: "Studying in the morning helps students remember things more easily because their brains are fresh after sleeping.",
                pieces: ["Studying in the morning", "helps students", "remember things", "more easily", "because their brains are", "fresh after sleeping."]
            }
        ],
        keyExpressions: [
            { en: "I think it is a good idea for ... to ~", ja: "…が〜するのは良い考えだと思う", note: "意見を述べる定番表現" },
            { en: "I have two reasons.", ja: "理由は2つあります。", note: "理由の導入" },
            { en: "First, ... Second, ...", ja: "第一に…。第二に…。", note: "理由を並べる" },
            { en: "so students can focus better", ja: "学生はより集中できる", note: "結果を述べる" },
            { en: "because their brains are fresh", ja: "脳がリフレッシュされているので", note: "原因を述べる" }
        ]
    },

    // ===== 2024-2 =====
    {
        id: 2,
        title: "タブレットPC所有",
        titleEn: "Owning a Tablet PC",
        exam: "2024-2",
        question: "Do you think it is a good idea for smartphone users to have a tablet PC?",
        questionJa: "スマートフォンユーザーがタブレットPCを持つことは良い考えだと思いますか？",
        modelAnswer: "I think it is a good idea for smartphone users to have a tablet PC. I have two reasons. First, tablet PCs have bigger screens than smartphones, so they are better for watching videos and reading. Second, people can use a tablet PC for work or school because it is easy to type and take notes on a larger screen.",
        modelAnswerJa: "スマートフォンユーザーがタブレットPCを持つことは良い考えだと思います。理由は2つあります。第一に、タブレットPCはスマートフォンより画面が大きいので、動画視聴や読書に適しています。第二に、大きな画面ではタイピングやメモが取りやすいため、仕事や学校に使えます。",
        fillBlanks: {
            template: "I think it is a good idea for smartphone users to have a tablet PC. I have two reasons. First, tablet PCs have [_1_] screens than smartphones, so they are better for watching videos and [_2_]. Second, people can use a tablet PC for work or school because it is easy to [_3_] and take [_4_] on a [_5_] screen.",
            blanks: [
                { id: 1, answer: "bigger", options: ["bigger", "smaller", "thinner", "darker"] },
                { id: 2, answer: "reading", options: ["reading", "cooking", "sleeping", "running"] },
                { id: 3, answer: "type", options: ["type", "swim", "drive", "paint"] },
                { id: 4, answer: "notes", options: ["notes", "photos", "breaks", "tests"] },
                { id: 5, answer: "larger", options: ["larger", "smaller", "broken", "curved"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "スマートフォンユーザーがタブレットPCを持つことは良い考えだと思います。",
                answer: "I think it is a good idea for smartphone users to have a tablet PC.",
                pieces: ["I think", "it is a good idea", "for smartphone users", "to have", "a tablet PC."]
            },
            {
                sentenceJa: "タブレットPCは画面が大きいので動画視聴や読書に適している。",
                answer: "Tablet PCs have bigger screens than smartphones, so they are better for watching videos and reading.",
                pieces: ["Tablet PCs have", "bigger screens", "than smartphones,", "so they are better", "for watching videos", "and reading."]
            },
            {
                sentenceJa: "大きな画面でタイピングやメモが取りやすいので仕事や学校に使える。",
                answer: "People can use a tablet PC for work or school because it is easy to type and take notes on a larger screen.",
                pieces: ["People can use", "a tablet PC", "for work or school", "because it is easy", "to type and take notes", "on a larger screen."]
            }
        ],
        keyExpressions: [
            { en: "bigger ... than ~", ja: "〜より大きい", note: "比較級の表現" },
            { en: "they are better for ~ing", ja: "〜するのにより適している", note: "利点を述べる" },
            { en: "it is easy to ~", ja: "〜するのが簡単だ", note: "使いやすさ" },
            { en: "for work or school", ja: "仕事や学校のために", note: "用途を述べる" }
        ]
    },

    // ===== 2024-3 =====
    {
        id: 3,
        title: "家族でスポーツ",
        titleEn: "Family Sports Time",
        exam: "2024-3",
        question: "Should families make time to play sports together?",
        questionJa: "家族は一緒にスポーツをする時間を作るべきですか？",
        modelAnswer: "I think families should make time to play sports together. I have two reasons. First, playing sports together is a good way for families to spend time and talk with each other. Second, it helps family members stay healthy because they can exercise regularly by playing sports together on weekends.",
        modelAnswerJa: "家族は一緒にスポーツをする時間を作るべきだと思います。理由は2つあります。第一に、一緒にスポーツをすることは、家族が時間を過ごし互いに会話する良い方法です。第二に、週末に一緒にスポーツをすることで定期的に運動できるため、家族の健康維持に役立ちます。",
        fillBlanks: {
            template: "I think families should make time to play sports together. I have two reasons. First, playing sports together is a good [_1_] for families to spend time and [_2_] with each other. Second, it helps family members stay [_3_] because they can [_4_] regularly by playing sports together on [_5_].",
            blanks: [
                { id: 1, answer: "way", options: ["way", "game", "problem", "rule"] },
                { id: 2, answer: "talk", options: ["talk", "fight", "compete", "argue"] },
                { id: 3, answer: "healthy", options: ["healthy", "busy", "famous", "quiet"] },
                { id: 4, answer: "exercise", options: ["exercise", "sleep", "study", "cook"] },
                { id: 5, answer: "weekends", options: ["weekends", "holidays", "weekdays", "mornings"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "家族は一緒にスポーツをする時間を作るべきだと思います。",
                answer: "I think families should make time to play sports together.",
                pieces: ["I think", "families should", "make time", "to play sports", "together."]
            },
            {
                sentenceJa: "一緒にスポーツをすることは家族が時間を過ごし会話する良い方法だ。",
                answer: "Playing sports together is a good way for families to spend time and talk with each other.",
                pieces: ["Playing sports together", "is a good way", "for families", "to spend time", "and talk with", "each other."]
            },
            {
                sentenceJa: "週末に一緒にスポーツをして定期的に運動できるので健康維持に役立つ。",
                answer: "It helps family members stay healthy because they can exercise regularly by playing sports together on weekends.",
                pieces: ["It helps", "family members", "stay healthy", "because they can", "exercise regularly", "by playing sports", "together on weekends."]
            }
        ],
        keyExpressions: [
            { en: "should make time to ~", ja: "〜する時間を作るべきだ", note: "提案の表現" },
            { en: "a good way for ... to ~", ja: "…が〜する良い方法", note: "方法を提案する" },
            { en: "it helps ... stay healthy", ja: "…の健康維持に役立つ", note: "健康の利点" },
            { en: "exercise regularly", ja: "定期的に運動する", note: "習慣を述べる" }
        ]
    },

    // ===== 2025-1 =====
    {
        id: 4,
        title: "子どもの就寝時間",
        titleEn: "Children Deciding Bedtime",
        exam: "2025-1",
        question: "Do you think it is good for children to decide what time they go to bed every day?",
        questionJa: "子どもが毎日何時に寝るか自分で決めるのは良いことだと思いますか？",
        modelAnswer: "I do not think it is good for children to decide what time they go to bed. I have two reasons. First, children need enough sleep to grow and stay healthy, but they may stay up too late if they choose their own bedtime. Second, parents know better about their children's health, so they should help children go to bed at the right time.",
        modelAnswerJa: "子どもが就寝時間を自分で決めるのは良くないと思います。理由は2つあります。第一に、子どもは成長と健康のために十分な睡眠が必要ですが、自分で決めると夜更かしする可能性があります。第二に、親は子どもの健康についてよく分かっているので、適切な時間に寝るよう手助けすべきです。",
        fillBlanks: {
            template: "I do not think it is good for children to decide what time they go to bed. I have two reasons. First, children need enough [_1_] to grow and stay healthy, but they may stay up too [_2_]. Second, parents know [_3_] about their children's health, so they should [_4_] children go to bed at the [_5_] time.",
            blanks: [
                { id: 1, answer: "sleep", options: ["sleep", "food", "money", "space"] },
                { id: 2, answer: "late", options: ["late", "early", "fast", "slow"] },
                { id: 3, answer: "better", options: ["better", "nothing", "less", "worse"] },
                { id: 4, answer: "help", options: ["help", "stop", "force", "leave"] },
                { id: 5, answer: "right", options: ["right", "wrong", "same", "last"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "子どもが就寝時間を自分で決めるのは良くないと思います。",
                answer: "I do not think it is good for children to decide what time they go to bed.",
                pieces: ["I do not think", "it is good", "for children", "to decide", "what time", "they go to bed."]
            },
            {
                sentenceJa: "十分な睡眠が必要だが自分で決めると夜更かしする可能性がある。",
                answer: "Children need enough sleep to grow and stay healthy, but they may stay up too late.",
                pieces: ["Children need", "enough sleep", "to grow and stay healthy,", "but they may", "stay up", "too late."]
            },
            {
                sentenceJa: "親は子どもの健康をよく分かっているので適切な時間に寝るよう手助けすべきだ。",
                answer: "Parents know better about their children's health, so they should help children go to bed at the right time.",
                pieces: ["Parents know better", "about their children's health,", "so they should", "help children", "go to bed", "at the right time."]
            }
        ],
        keyExpressions: [
            { en: "I do not think it is good for ... to ~", ja: "…が〜するのは良くないと思う", note: "反対意見の定番" },
            { en: "need enough sleep to ~", ja: "〜するのに十分な睡眠が必要", note: "必要性を述べる" },
            { en: "stay up too late", ja: "夜更かしする", note: "問題点を述べる" },
            { en: "know better about ~", ja: "〜についてよく分かっている", note: "知識の比較" }
        ]
    },

    // ===== 2025-2 =====
    {
        id: 5,
        title: "スマホでメモ",
        titleEn: "Taking Notes on Smartphones",
        exam: "2025-2",
        question: "Do you think it is a good idea for people to take notes on their smartphones?",
        questionJa: "人々がスマートフォンでメモを取ることは良い考えだと思いますか？",
        modelAnswer: "I think it is a good idea for people to take notes on their smartphones. I have two reasons. First, people always carry their smartphones, so they can write down important things anytime and anywhere. Second, it is easier to find old notes on a smartphone because people can search for them quickly using keywords.",
        modelAnswerJa: "スマートフォンでメモを取ることは良い考えだと思います。理由は2つあります。第一に、人はいつもスマホを持ち歩いているので、いつでもどこでも重要なことを書き留められます。第二に、キーワードを使って素早く検索できるので、スマホの方が古いメモを見つけやすいです。",
        fillBlanks: {
            template: "I think it is a good idea for people to take notes on their smartphones. I have two reasons. First, people always [_1_] their smartphones, so they can write down important things [_2_] and anywhere. Second, it is easier to [_3_] old notes on a smartphone because people can [_4_] for them quickly using [_5_].",
            blanks: [
                { id: 1, answer: "carry", options: ["carry", "sell", "break", "charge"] },
                { id: 2, answer: "anytime", options: ["anytime", "never", "rarely", "seldom"] },
                { id: 3, answer: "find", options: ["find", "lose", "delete", "hide"] },
                { id: 4, answer: "search", options: ["search", "wait", "ask", "pay"] },
                { id: 5, answer: "keywords", options: ["keywords", "cameras", "games", "stickers"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "スマートフォンでメモを取ることは良い考えだと思います。",
                answer: "I think it is a good idea for people to take notes on their smartphones.",
                pieces: ["I think", "it is a good idea", "for people", "to take notes", "on their smartphones."]
            },
            {
                sentenceJa: "いつもスマホを持ち歩いているのでいつでもどこでも書き留められる。",
                answer: "People always carry their smartphones, so they can write down important things anytime and anywhere.",
                pieces: ["People always carry", "their smartphones,", "so they can", "write down", "important things", "anytime and anywhere."]
            },
            {
                sentenceJa: "キーワードで素早く検索できるのでスマホの方が古いメモを見つけやすい。",
                answer: "It is easier to find old notes on a smartphone because people can search for them quickly using keywords.",
                pieces: ["It is easier", "to find old notes", "on a smartphone", "because people can", "search for them quickly", "using keywords."]
            }
        ],
        keyExpressions: [
            { en: "write down important things", ja: "重要なことを書き留める", note: "メモの行為" },
            { en: "anytime and anywhere", ja: "いつでもどこでも", note: "便利さを強調" },
            { en: "it is easier to ~", ja: "〜する方が簡単だ", note: "比較の利点" },
            { en: "search for them quickly", ja: "素早く検索する", note: "検索機能の利点" }
        ]
    },

    // ===== 2025-3 =====
    {
        id: 6,
        title: "本の意見共有",
        titleEn: "Sharing Opinions About Books",
        exam: "2025-3",
        question: "Do you think it is good for students to share their opinions about books with their friends?",
        questionJa: "学生が本についての意見を友達と共有することは良いことだと思いますか？",
        modelAnswer: "I think it is good for students to share their opinions about books with their friends. I have two reasons. First, students can learn different ways of thinking by listening to their friends' ideas about a book. Second, talking about books with friends makes reading more fun and encourages students to read more books.",
        modelAnswerJa: "学生が本についての意見を友達と共有することは良いことだと思います。理由は2つあります。第一に、友達の本についての考えを聞くことで、異なる考え方を学ぶことができます。第二に、友達と本について話すことで読書がより楽しくなり、もっと多くの本を読む動機付けになります。",
        fillBlanks: {
            template: "I think it is good for students to share their opinions about books with their friends. I have two reasons. First, students can learn different ways of [_1_] by listening to their friends' [_2_] about a book. Second, talking about books with friends makes reading more [_3_] and [_4_] students to read more [_5_].",
            blanks: [
                { id: 1, answer: "thinking", options: ["thinking", "cooking", "driving", "sleeping"] },
                { id: 2, answer: "ideas", options: ["ideas", "orders", "complaints", "secrets"] },
                { id: 3, answer: "fun", options: ["fun", "boring", "difficult", "expensive"] },
                { id: 4, answer: "encourages", options: ["encourages", "prevents", "forbids", "forces"] },
                { id: 5, answer: "books", options: ["books", "tests", "letters", "rules"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "学生が本についての意見を友達と共有することは良いことだと思います。",
                answer: "I think it is good for students to share their opinions about books with their friends.",
                pieces: ["I think", "it is good", "for students", "to share their opinions", "about books", "with their friends."]
            },
            {
                sentenceJa: "友達の考えを聞くことで異なる考え方を学べる。",
                answer: "Students can learn different ways of thinking by listening to their friends' ideas about a book.",
                pieces: ["Students can learn", "different ways", "of thinking", "by listening to", "their friends' ideas", "about a book."]
            },
            {
                sentenceJa: "友達と本について話すことで読書が楽しくなりもっと本を読む動機になる。",
                answer: "Talking about books with friends makes reading more fun and encourages students to read more books.",
                pieces: ["Talking about books", "with friends", "makes reading more fun", "and encourages students", "to read", "more books."]
            }
        ],
        keyExpressions: [
            { en: "share their opinions about ~", ja: "〜についての意見を共有する", note: "意見交換" },
            { en: "different ways of thinking", ja: "異なる考え方", note: "多様性の利点" },
            { en: "by listening to ~", ja: "〜を聞くことで", note: "方法を述べる" },
            { en: "makes ~ more fun", ja: "〜をより楽しくする", note: "楽しさを述べる" },
            { en: "encourages ... to ~", ja: "…に〜するよう促す", note: "動機付け" }
        ]
    }
];
