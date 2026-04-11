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
    },

    // ===== 2024-2 =====
    {
        id: 2,
        title: "スピーチコンテスト",
        exam: "2024-2",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. I heard that you won the first prize at the speech contest. I want to know more about the contest. <u>When was the contest? And how many people listened to your speech?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたがスピーチコンテストで1位になったと聞きました。そのコンテストについてもっと知りたいです。<u>コンテストはいつでしたか？そして何人があなたのスピーチを聞きましたか？</u>\n\nあなたの友人、\nジェームズ",

        // 質問1
        question1: "When was the contest?",
        question1Ja: "コンテストはいつでしたか？",
        answers1: [
            { id: 1, ja: "先月", text: "It was last month", jaText: "それは先月でした" },
            { id: 2, ja: "先週の土曜日", text: "It was last Saturday", jaText: "それは先週の土曜日でした" },
            { id: 3, ja: "2週間前", text: "It was two weeks ago", jaText: "それは2週間前でした" }
        ],

        // 質問2
        question2: "And how many people listened to your speech?",
        question2Ja: "何人があなたのスピーチを聞きましたか？",
        answers2: [
            { id: 1, ja: "約100人", text: "About one hundred people listened to my speech", jaText: "約100人が私のスピーチを聞きました" },
            { id: 2, ja: "約50人", text: "About fifty people listened to it", jaText: "約50人がそれを聞きました" },
            { id: 3, ja: "約200人", text: "About two hundred people came to listen", jaText: "約200人が聞きに来ました" }
        ],

        // ---- Step 2 練習素材 ----
        chunks: [
            {
                sentenceJa: "それは先月でした。",
                literalJa: "それは〜でした / 先月",
                answer: "It was last month.",
                pieces: ["It was", "last month."]
            },
            {
                sentenceJa: "約100人が私のスピーチを聞きました。",
                literalJa: "約100人が / 聞きました / 私のスピーチを",
                answer: "About one hundred people listened to my speech.",
                pieces: ["About one hundred people", "listened to", "my speech."]
            },
            {
                sentenceJa: "私はとても嬉しかったです。",
                literalJa: "私はとても嬉しかった",
                answer: "I was very happy.",
                pieces: ["I was", "very happy."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "コンテストがいつだったか答えましょう。", modelSentence: "It was last month." },
            { label: "質問2への回答", hintJa: "何人がスピーチを聞いたか答えましょう。", modelSentence: "About one hundred people listened to my speech." },
            { label: "追加の一文", hintJa: "コンテストの感想や気持ちを一文で書きましょう。", modelSentence: "I was very happy." }
        ],

        checklist: [
            "質問1（コンテストの時期）に答えているか？",
            "質問2（聞いていた人数）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. It was last month. About one hundred people listened to my speech. I was very happy.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。それは先月でした。約100人が私のスピーチを聞きました。私はとても嬉しかったです。\n敬具"
    },

    // ===== 2024-3 =====
    {
        id: 3,
        title: "夏祭り",
        exam: "2024-3",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. My mother says that you will go to a summer festival next week. I have some questions for you. <u>How will you go to the summer festival? And what time will it start?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたが来週夏祭りに行く予定だとお母さんが言っていました。いくつか質問があります。<u>夏祭りにはどうやって行きますか？そして何時に始まりますか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "How will you go to the summer festival?",
        question1Ja: "夏祭りにはどうやって行きますか？",
        answers1: [
            { id: 1, ja: "バスで", text: "I will go there by bus", jaText: "私はバスで行きます" },
            { id: 2, ja: "自転車で", text: "I will go there by bike", jaText: "私は自転車で行きます" },
            { id: 3, ja: "歩いて", text: "I will walk there", jaText: "私はそこまで歩いて行きます" }
        ],

        question2: "And what time will it start?",
        question2Ja: "何時に始まりますか？",
        answers2: [
            { id: 1, ja: "5時", text: "It will start at five o'clock", jaText: "それは5時に始まります" },
            { id: 2, ja: "6時", text: "It will start at six", jaText: "それは6時に始まります" },
            { id: 3, ja: "4時半", text: "It will start at four thirty", jaText: "それは4時半に始まります" }
        ],

        chunks: [
            {
                sentenceJa: "私はバスでそこに行きます。",
                literalJa: "私は行きます / そこに / バスで",
                answer: "I will go there by bus.",
                pieces: ["I will", "go there", "by bus."]
            },
            {
                sentenceJa: "それは5時に始まります。",
                literalJa: "それは始まります / 5時に",
                answer: "It will start at five o'clock.",
                pieces: ["It will", "start", "at five o'clock."]
            },
            {
                sentenceJa: "私はとても楽しみにしています。",
                literalJa: "私はとても楽しみにしている",
                answer: "I am very excited about it.",
                pieces: ["I am", "very excited", "about it."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "夏祭りへの交通手段を答えましょう。", modelSentence: "I will go there by bus." },
            { label: "質問2への回答", hintJa: "夏祭りが何時に始まるか答えましょう。", modelSentence: "It will start at five o'clock." },
            { label: "追加の一文", hintJa: "夏祭りへの期待や気持ちを一文で書きましょう。", modelSentence: "I am very excited about it." }
        ],

        checklist: [
            "質問1（交通手段）に答えているか？",
            "質問2（開始時間）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I will go there by bus. It will start at five o'clock. I am very excited about it.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。私はバスでそこに行きます。5時に始まります。とても楽しみにしています。\n敬具"
    },

    // ===== 2025-1 =====
    {
        id: 4,
        title: "家庭菜園",
        exam: "2025-1",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. Your friend tells me that you are growing potatoes and carrots in your garden at home. I have some questions for you. <u>When did you plant the potatoes? And how many carrots are you growing?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたの友達から、自宅の庭でジャガイモとニンジンを育てていると聞きました。いくつか質問があります。<u>ジャガイモはいつ植えましたか？そしてニンジンはいくつ育てていますか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "When did you plant the potatoes?",
        question1Ja: "ジャガイモはいつ植えましたか？",
        answers1: [
            { id: 1, ja: "3月に", text: "I planted them in March", jaText: "私は3月にそれらを植えました" },
            { id: 2, ja: "先月", text: "I planted them last month", jaText: "私は先月それらを植えました" },
            { id: 3, ja: "2か月前に", text: "I planted them two months ago", jaText: "私は2か月前にそれらを植えました" }
        ],

        question2: "And how many carrots are you growing?",
        question2Ja: "ニンジンはいくつ育てていますか？",
        answers2: [
            { id: 1, ja: "約10本", text: "I am growing about ten carrots", jaText: "私は約10本のニンジンを育てています" },
            { id: 2, ja: "約20本", text: "I am growing about twenty carrots", jaText: "私は約20本のニンジンを育てています" },
            { id: 3, ja: "たくさん", text: "I am growing a lot of carrots", jaText: "私はたくさんのニンジンを育てています" }
        ],

        chunks: [
            {
                sentenceJa: "私は3月にそれらを植えました。",
                literalJa: "私は植えました / それらを / 3月に",
                answer: "I planted them in March.",
                pieces: ["I planted", "them", "in March."]
            },
            {
                sentenceJa: "私は約10本のニンジンを育てています。",
                literalJa: "私は育てています / 約10本の / ニンジンを",
                answer: "I am growing about ten carrots.",
                pieces: ["I am growing", "about ten", "carrots."]
            },
            {
                sentenceJa: "私はそれをとても楽しんでいます。",
                literalJa: "私はとても楽しんでいる / それを",
                answer: "I enjoy it very much.",
                pieces: ["I enjoy", "it", "very much."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "ジャガイモをいつ植えたか答えましょう。", modelSentence: "I planted them in March." },
            { label: "質問2への回答", hintJa: "ニンジンをいくつ育てているか答えましょう。", modelSentence: "I am growing about ten carrots." },
            { label: "追加の一文", hintJa: "家庭菜園の感想を一文で書きましょう。", modelSentence: "I enjoy it very much." }
        ],

        checklist: [
            "質問1（植えた時期）に答えているか？",
            "質問2（ニンジンの数）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I planted them in March. I am growing about ten carrots. I enjoy it very much.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。私は3月にそれらを植えました。約10本のニンジンを育てています。とても楽しんでいます。\n敬具"
    },

    // ===== 2025-2 =====
    {
        id: 5,
        title: "誕生日プレゼント",
        exam: "2025-2",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. I heard that you bought a birthday present for your friend Paul. I have some questions for you. <u>Where did you buy the birthday present? And when will you give it to him?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたが友達のポールに誕生日プレゼントを買ったと聞きました。いくつか質問があります。<u>誕生日プレゼントはどこで買いましたか？そしていつ彼にあげますか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "Where did you buy the birthday present?",
        question1Ja: "誕生日プレゼントはどこで買いましたか？",
        answers1: [
            { id: 1, ja: "駅の近くのお店で", text: "I bought it at a shop near the station", jaText: "私は駅の近くのお店で買いました" },
            { id: 2, ja: "デパートで", text: "I bought it at a department store", jaText: "私はデパートで買いました" },
            { id: 3, ja: "オンラインで", text: "I bought it online", jaText: "私はオンラインで買いました" }
        ],

        question2: "And when will you give it to him?",
        question2Ja: "いつ彼にあげますか？",
        answers2: [
            { id: 1, ja: "来週の日曜日に", text: "I will give it to him next Sunday", jaText: "私は来週の日曜日に彼にあげます" },
            { id: 2, ja: "彼の誕生日に", text: "I will give it to him on his birthday", jaText: "私は彼の誕生日にあげます" },
            { id: 3, ja: "明日", text: "I will give it to him tomorrow", jaText: "私は明日彼にあげます" }
        ],

        chunks: [
            {
                sentenceJa: "私は駅の近くのお店で買いました。",
                literalJa: "私は買いました / それを / お店で / 駅の近くの",
                answer: "I bought it at a shop near the station.",
                pieces: ["I bought it", "at a shop", "near the station."]
            },
            {
                sentenceJa: "私は来週の日曜日に彼にあげます。",
                literalJa: "私はあげます / それを / 彼に / 来週の日曜日に",
                answer: "I will give it to him next Sunday.",
                pieces: ["I will give", "it to him", "next Sunday."]
            },
            {
                sentenceJa: "彼はきっと喜ぶでしょう。",
                literalJa: "私は思います / 彼は喜ぶと",
                answer: "I think he will like it.",
                pieces: ["I think", "he will", "like it."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "プレゼントをどこで買ったか答えましょう。", modelSentence: "I bought it at a shop near the station." },
            { label: "質問2への回答", hintJa: "いつ彼にプレゼントをあげるか答えましょう。", modelSentence: "I will give it to him next Sunday." },
            { label: "追加の一文", hintJa: "プレゼントや友達への気持ちを一文で書きましょう。", modelSentence: "I think he will like it." }
        ],

        checklist: [
            "質問1（購入場所）に答えているか？",
            "質問2（渡す時期）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I bought it at a shop near the station. I will give it to him next Sunday. I think he will like it.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。駅の近くのお店で買いました。来週の日曜日に彼にあげます。彼はきっと喜ぶと思います。\n敬具"
    },

    // ===== 2025-3 =====
    {
        id: 6,
        title: "姉妹の誕生日パーティー",
        exam: "2025-3",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. I hear that you are preparing for your sister's birthday party. I have some questions for you. <u>What will you give to your sister? And how many people will you invite to the party?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたが姉（妹）の誕生日パーティーの準備をしていると聞きました。いくつか質問があります。<u>姉（妹）に何をあげますか？そしてパーティーには何人招待しますか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "What will you give to your sister?",
        question1Ja: "姉（妹）に何をあげますか？",
        answers1: [
            { id: 1, ja: "本", text: "I will give her a book", jaText: "私は彼女に本をあげます" },
            { id: 2, ja: "花", text: "I will give her some flowers", jaText: "私は彼女に花をあげます" },
            { id: 3, ja: "ケーキ", text: "I will make a cake for her", jaText: "私は彼女にケーキを作ります" }
        ],

        question2: "And how many people will you invite to the party?",
        question2Ja: "パーティーには何人招待しますか？",
        answers2: [
            { id: 1, ja: "約10人", text: "I will invite about ten people", jaText: "私は約10人を招待します" },
            { id: 2, ja: "5人", text: "I will invite five friends", jaText: "私は友達を5人招待します" },
            { id: 3, ja: "約20人", text: "I will invite about twenty people", jaText: "私は約20人を招待します" }
        ],

        chunks: [
            {
                sentenceJa: "私は彼女に本をあげます。",
                literalJa: "私はあげます / 彼女に / 本を",
                answer: "I will give her a book.",
                pieces: ["I will give", "her", "a book."]
            },
            {
                sentenceJa: "私は約10人を招待します。",
                literalJa: "私は招待します / 約10人を",
                answer: "I will invite about ten people.",
                pieces: ["I will invite", "about ten", "people."]
            },
            {
                sentenceJa: "彼女はきっと喜ぶでしょう。",
                literalJa: "私は思います / 彼女は喜ぶと",
                answer: "I think she will be happy.",
                pieces: ["I think", "she will be", "happy."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "姉（妹）に何をプレゼントするか答えましょう。", modelSentence: "I will give her a book." },
            { label: "質問2への回答", hintJa: "パーティーに何人招待するか答えましょう。", modelSentence: "I will invite about ten people." },
            { label: "追加の一文", hintJa: "パーティーへの気持ちを一文で書きましょう。", modelSentence: "I think she will be happy." }
        ],

        checklist: [
            "質問1（プレゼント）に答えているか？",
            "質問2（招待人数）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I will give her a book. I will invite about ten people. I think she will be happy.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。彼女に本をあげます。約10人を招待します。彼女はきっと喜ぶと思います。\n敬具"
    },

    // ===== 2024-1 土曜準会場 =====
    {
        id: 7,
        title: "朝食のサンドイッチ",
        exam: "2024-1S",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. I hear that you usually eat sandwiches for breakfast. I have some questions for you. <u>How many sandwiches do you usually eat? And what kind of sandwiches do you like?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたがいつも朝食にサンドイッチを食べていると聞きました。いくつか質問があります。<u>いつもサンドイッチをいくつ食べますか？そしてどんな種類のサンドイッチが好きですか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "How many sandwiches do you usually eat?",
        question1Ja: "いつもサンドイッチをいくつ食べますか？",
        answers1: [
            { id: 1, ja: "2つ", text: "I usually eat two sandwiches", jaText: "私はいつも2つ食べます" },
            { id: 2, ja: "1つ", text: "I usually eat one sandwich", jaText: "私はいつも1つ食べます" },
            { id: 3, ja: "3つ", text: "I usually eat three sandwiches", jaText: "私はいつも3つ食べます" }
        ],

        question2: "And what kind of sandwiches do you like?",
        question2Ja: "どんな種類のサンドイッチが好きですか？",
        answers2: [
            { id: 1, ja: "たまごサンド", text: "I like egg sandwiches", jaText: "私はたまごサンドが好きです" },
            { id: 2, ja: "ハムサンド", text: "I like ham sandwiches", jaText: "私はハムサンドが好きです" },
            { id: 3, ja: "ツナサンド", text: "I like tuna sandwiches", jaText: "私はツナサンドが好きです" }
        ],

        chunks: [
            {
                sentenceJa: "私はいつも2つ食べます。",
                literalJa: "私はいつも食べます / 2つの / サンドイッチを",
                answer: "I usually eat two sandwiches.",
                pieces: ["I usually", "eat", "two sandwiches."]
            },
            {
                sentenceJa: "私はたまごサンドが好きです。",
                literalJa: "私は好きです / たまごサンドが",
                answer: "I like egg sandwiches.",
                pieces: ["I like", "egg", "sandwiches."]
            },
            {
                sentenceJa: "それらはとてもおいしいです。",
                literalJa: "それらはとてもおいしい",
                answer: "They are very delicious.",
                pieces: ["They are", "very", "delicious."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "いつもサンドイッチをいくつ食べるか答えましょう。", modelSentence: "I usually eat two sandwiches." },
            { label: "質問2への回答", hintJa: "どんな種類のサンドイッチが好きか答えましょう。", modelSentence: "I like egg sandwiches." },
            { label: "追加の一文", hintJa: "サンドイッチの感想を一文で書きましょう。", modelSentence: "They are very delicious." }
        ],

        checklist: [
            "質問1（サンドイッチの数）に答えているか？",
            "質問2（好きな種類）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I usually eat two sandwiches. I like egg sandwiches. They are very delicious.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。私はいつも2つ食べます。たまごサンドが好きです。とてもおいしいです。\n敬具"
    },

    // ===== 2024-2 土曜準会場 =====
    {
        id: 8,
        title: "新しい家",
        exam: "2024-2S",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. I heard that you started living in a new house. Please tell me about your new house. <u>What is your favorite place in your house? And what color is your house?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたが新しい家に住み始めたと聞きました。新しい家について教えてください。<u>家の中でお気に入りの場所はどこですか？そして家は何色ですか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "What is your favorite place in your house?",
        question1Ja: "家の中でお気に入りの場所はどこですか？",
        answers1: [
            { id: 1, ja: "自分の部屋", text: "My favorite place is my room", jaText: "お気に入りの場所は自分の部屋です" },
            { id: 2, ja: "リビング", text: "My favorite place is the living room", jaText: "お気に入りの場所はリビングです" },
            { id: 3, ja: "庭", text: "My favorite place is the garden", jaText: "お気に入りの場所は庭です" }
        ],

        question2: "And what color is your house?",
        question2Ja: "家は何色ですか？",
        answers2: [
            { id: 1, ja: "白", text: "It is white", jaText: "白色です" },
            { id: 2, ja: "茶色", text: "It is brown", jaText: "茶色です" },
            { id: 3, ja: "青", text: "It is blue", jaText: "青色です" }
        ],

        chunks: [
            {
                sentenceJa: "お気に入りの場所は自分の部屋です。",
                literalJa: "私のお気に入りの場所は / 自分の部屋です",
                answer: "My favorite place is my room.",
                pieces: ["My favorite place", "is", "my room."]
            },
            {
                sentenceJa: "白色です。",
                literalJa: "それは〜です / 白",
                answer: "It is white.",
                pieces: ["It is", "white."]
            },
            {
                sentenceJa: "私はこの家がとても好きです。",
                literalJa: "私はとても好きです / この家が",
                answer: "I like this house very much.",
                pieces: ["I like", "this house", "very much."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "家の中でお気に入りの場所を答えましょう。", modelSentence: "My favorite place is my room." },
            { label: "質問2への回答", hintJa: "家が何色か答えましょう。", modelSentence: "It is white." },
            { label: "追加の一文", hintJa: "新しい家の感想を一文で書きましょう。", modelSentence: "I like this house very much." }
        ],

        checklist: [
            "質問1（お気に入りの場所）に答えているか？",
            "質問2（家の色）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. My favorite place is my room. It is white. I like this house very much.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。お気に入りの場所は自分の部屋です。白色です。この家がとても好きです。\n敬具"
    },

    // ===== 2024-3 土曜準会場 =====
    {
        id: 9,
        title: "スマートフォン",
        exam: "2024-3S",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. Your brother said that you bought a smartphone. I have some questions about it. <u>What color is your new phone? And when do you usually use it?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたのお兄さん（弟）がスマートフォンを買ったと言っていました。いくつか質問があります。<u>新しいスマホは何色ですか？そしていつもいつ使いますか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "What color is your new phone?",
        question1Ja: "新しいスマホは何色ですか？",
        answers1: [
            { id: 1, ja: "黒", text: "It is black", jaText: "黒色です" },
            { id: 2, ja: "白", text: "It is white", jaText: "白色です" },
            { id: 3, ja: "青", text: "It is blue", jaText: "青色です" }
        ],

        question2: "And when do you usually use it?",
        question2Ja: "いつもいつ使いますか？",
        answers2: [
            { id: 1, ja: "放課後", text: "I usually use it after school", jaText: "私はいつも放課後に使います" },
            { id: 2, ja: "夜", text: "I usually use it at night", jaText: "私はいつも夜に使います" },
            { id: 3, ja: "週末", text: "I usually use it on weekends", jaText: "私はいつも週末に使います" }
        ],

        chunks: [
            {
                sentenceJa: "黒色です。",
                literalJa: "それは〜です / 黒",
                answer: "It is black.",
                pieces: ["It is", "black."]
            },
            {
                sentenceJa: "私はいつも放課後に使います。",
                literalJa: "私はいつも使います / それを / 放課後に",
                answer: "I usually use it after school.",
                pieces: ["I usually", "use it", "after school."]
            },
            {
                sentenceJa: "私はそれがとても気に入っています。",
                literalJa: "私はとても好きです / それが",
                answer: "I like it very much.",
                pieces: ["I like", "it", "very much."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "スマホの色を答えましょう。", modelSentence: "It is black." },
            { label: "質問2への回答", hintJa: "いつもいつスマホを使うか答えましょう。", modelSentence: "I usually use it after school." },
            { label: "追加の一文", hintJa: "スマホへの感想を一文で書きましょう。", modelSentence: "I like it very much." }
        ],

        checklist: [
            "質問1（スマホの色）に答えているか？",
            "質問2（使う時間帯）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. It is black. I usually use it after school. I like it very much.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。黒色です。いつも放課後に使います。とても気に入っています。\n敬具"
    },

    // ===== 2025-1 土曜準会場 =====
    {
        id: 10,
        title: "動物園",
        exam: "2025-1S",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. Your brother told me that you went to the zoo last weekend. I have some questions for you. <u>How did you go to the zoo? And what animal did you like the best there?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたのお兄さん（弟）から先週末に動物園に行ったと聞きました。いくつか質問があります。<u>動物園にはどうやって行きましたか？そしてそこで一番好きだった動物は何ですか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "How did you go to the zoo?",
        question1Ja: "動物園にはどうやって行きましたか？",
        answers1: [
            { id: 1, ja: "電車で", text: "I went there by train", jaText: "私は電車で行きました" },
            { id: 2, ja: "車で", text: "I went there by car", jaText: "私は車で行きました" },
            { id: 3, ja: "バスで", text: "I went there by bus", jaText: "私はバスで行きました" }
        ],

        question2: "And what animal did you like the best there?",
        question2Ja: "そこで一番好きだった動物は何ですか？",
        answers2: [
            { id: 1, ja: "パンダ", text: "I liked the pandas the best", jaText: "パンダが一番好きでした" },
            { id: 2, ja: "ライオン", text: "I liked the lions the best", jaText: "ライオンが一番好きでした" },
            { id: 3, ja: "ペンギン", text: "I liked the penguins the best", jaText: "ペンギンが一番好きでした" }
        ],

        chunks: [
            {
                sentenceJa: "私は電車で行きました。",
                literalJa: "私は行きました / そこに / 電車で",
                answer: "I went there by train.",
                pieces: ["I went", "there", "by train."]
            },
            {
                sentenceJa: "パンダが一番好きでした。",
                literalJa: "私は一番好きでした / パンダが",
                answer: "I liked the pandas the best.",
                pieces: ["I liked", "the pandas", "the best."]
            },
            {
                sentenceJa: "それらはとてもかわいかったです。",
                literalJa: "それらはとてもかわいかった",
                answer: "They were very cute.",
                pieces: ["They were", "very", "cute."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "動物園への交通手段を答えましょう。", modelSentence: "I went there by train." },
            { label: "質問2への回答", hintJa: "一番好きだった動物を答えましょう。", modelSentence: "I liked the pandas the best." },
            { label: "追加の一文", hintJa: "動物園の感想を一文で書きましょう。", modelSentence: "They were very cute." }
        ],

        checklist: [
            "質問1（交通手段）に答えているか？",
            "質問2（好きな動物）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I went there by train. I liked the pandas the best. They were very cute.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。電車で行きました。パンダが一番好きでした。とてもかわいかったです。\n敬具"
    },

    // ===== 2025-2 土曜準会場 =====
    {
        id: 11,
        title: "星の観察",
        exam: "2025-2S",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. My friend tells me that you like to watch the stars at night. I have some questions for you. <u>What time do you start watching the stars? And where is your favorite place to watch them?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたが夜に星を見るのが好きだと友達から聞きました。いくつか質問があります。<u>何時に星を見始めますか？そして星を見るお気に入りの場所はどこですか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "What time do you start watching the stars?",
        question1Ja: "何時に星を見始めますか？",
        answers1: [
            { id: 1, ja: "8時", text: "I start watching them at eight", jaText: "私は8時に見始めます" },
            { id: 2, ja: "9時", text: "I start watching them at nine", jaText: "私は9時に見始めます" },
            { id: 3, ja: "7時半", text: "I start watching them at seven thirty", jaText: "私は7時半に見始めます" }
        ],

        question2: "And where is your favorite place to watch them?",
        question2Ja: "星を見るお気に入りの場所はどこですか？",
        answers2: [
            { id: 1, ja: "公園", text: "My favorite place is the park near my house", jaText: "お気に入りの場所は家の近くの公園です" },
            { id: 2, ja: "屋上", text: "My favorite place is the rooftop", jaText: "お気に入りの場所は屋上です" },
            { id: 3, ja: "庭", text: "My favorite place is my garden", jaText: "お気に入りの場所は庭です" }
        ],

        chunks: [
            {
                sentenceJa: "私は8時に見始めます。",
                literalJa: "私は見始めます / それらを / 8時に",
                answer: "I start watching them at eight.",
                pieces: ["I start", "watching them", "at eight."]
            },
            {
                sentenceJa: "お気に入りの場所は家の近くの公園です。",
                literalJa: "私のお気に入りの場所は / 公園です / 家の近くの",
                answer: "My favorite place is the park near my house.",
                pieces: ["My favorite place", "is the park", "near my house."]
            },
            {
                sentenceJa: "星はとてもきれいです。",
                literalJa: "星はとてもきれいです",
                answer: "The stars are very beautiful.",
                pieces: ["The stars", "are very", "beautiful."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "何時に星を見始めるか答えましょう。", modelSentence: "I start watching them at eight." },
            { label: "質問2への回答", hintJa: "星を見るお気に入りの場所を答えましょう。", modelSentence: "My favorite place is the park near my house." },
            { label: "追加の一文", hintJa: "星についての感想を一文で書きましょう。", modelSentence: "The stars are very beautiful." }
        ],

        checklist: [
            "質問1（観察開始時間）に答えているか？",
            "質問2（お気に入りの場所）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. I start watching them at eight. My favorite place is the park near my house. The stars are very beautiful.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。8時に見始めます。お気に入りの場所は家の近くの公園です。星はとてもきれいです。\n敬具"
    },

    // ===== 2025-3 土曜準会場 =====
    {
        id: 12,
        title: "新しい博物館",
        exam: "2025-3S",
        senderName: "James",
        senderEmail: "Hi,\nThank you for your e-mail. Your mother tells me that a new museum will open in your hometown. I have some questions about the museum. <u>When will the museum open in your hometown? And how much is a ticket?</u>\n\nYour friend,\nJames",
        senderEmailJa: "こんにちは。\nメールをありがとう。あなたのお母さんから、あなたの町に新しい博物館がオープンすると聞きました。その博物館について質問があります。<u>博物館はいつオープンしますか？そしてチケットはいくらですか？</u>\n\nあなたの友人、\nジェームズ",

        question1: "When will the museum open in your hometown?",
        question1Ja: "博物館はいつオープンしますか？",
        answers1: [
            { id: 1, ja: "来月", text: "It will open next month", jaText: "来月オープンします" },
            { id: 2, ja: "来週", text: "It will open next week", jaText: "来週オープンします" },
            { id: 3, ja: "今年の夏", text: "It will open this summer", jaText: "今年の夏にオープンします" }
        ],

        question2: "And how much is a ticket?",
        question2Ja: "チケットはいくらですか？",
        answers2: [
            { id: 1, ja: "500円", text: "A ticket is five hundred yen", jaText: "チケットは500円です" },
            { id: 2, ja: "無料", text: "It is free for students", jaText: "学生は無料です" },
            { id: 3, ja: "1000円", text: "A ticket is one thousand yen", jaText: "チケットは1000円です" }
        ],

        chunks: [
            {
                sentenceJa: "来月オープンします。",
                literalJa: "それはオープンします / 来月",
                answer: "It will open next month.",
                pieces: ["It will", "open", "next month."]
            },
            {
                sentenceJa: "チケットは500円です。",
                literalJa: "チケットは〜です / 500円",
                answer: "A ticket is five hundred yen.",
                pieces: ["A ticket is", "five hundred", "yen."]
            },
            {
                sentenceJa: "私はそこに行きたいです。",
                literalJa: "私は〜したい / そこに行く",
                answer: "I want to go there.",
                pieces: ["I want", "to go", "there."]
            }
        ],

        guidedHints: [
            { label: "質問1への回答", hintJa: "博物館がいつオープンするか答えましょう。", modelSentence: "It will open next month." },
            { label: "質問2への回答", hintJa: "チケットの値段を答えましょう。", modelSentence: "A ticket is five hundred yen." },
            { label: "追加の一文", hintJa: "博物館への気持ちを一文で書きましょう。", modelSentence: "I want to go there." }
        ],

        checklist: [
            "質問1（オープン時期）に答えているか？",
            "質問2（チケットの値段）に答えているか？",
            "自然な英文になっているか？",
            "語数は15〜25語の範囲内か？",
            "ピリオドを忘れていないか？"
        ],

        modelAnswer: "Hi, James!\nThank you for your e-mail. It will open next month. A ticket is five hundred yen. I want to go there.\nBest wishes,",
        modelAnswerJa: "ジェームズへ\nメールをありがとう。来月オープンします。チケットは500円です。そこに行きたいです。\n敬具"
    }
];
