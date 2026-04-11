// ComPass Pro — 準2級 Eメール データ
// 語数設定: 40〜50語

const WRITEPASS_CONFIG = {
    minWords: 40,
    maxWords: 50,
    timerMinutes: 15,
    gradeLabel: '準2級',
    taskLabel: 'Eメール',
    gradeId: 'grade_pre2',
    taskType: 'Email_Reply'
};


const EMAIL_THEMES = [
    // ===== Theme 1: 2025-1 ボートと野鳥観察 =====
    {
        id: 1,
        title: "ボートと野鳥観察",
        exam: "2025-1",
        underlinedTopic: "a boat",
        alexEmail: "My family and I enjoyed riding a boat on the lake on Saturday. The boat was red, and it was big enough for six people. The boat had two powerful engines, and it could go as fast as a car. While on the boat, I saw something interesting. Some people were enjoying bird watching. Do you think more people will enjoy this activity in the future?",
        alexEmailJa: "土曜日に家族で湖でボートに乗りました。ボートは赤く、6人乗りでした。2つの強力なエンジンがあり、車と同じくらい速く走れました。ボートに乗っている間、面白いものを見ました。野鳥観察を楽しんでいる人がいたのです。将来もっと多くの人がこの活動を楽しむと思いますか？",
        opinionQuestion: "Do you think more people will enjoy this activity in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "将来もっと多くの人が野鳥観察を楽しむと思います",
                text: "more people will enjoy bird watching in the future",
                chunks: ["more people", "will enjoy", "bird watching", "in the future"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "多くの人がこの趣味を試すとは思いません",
                text: "not many people will try this hobby",
                chunks: ["not many people", "will try", "this hobby"]
            }
        },
        reasons: [
            { ja: "便利だから", jaText: "ウェブサイトやアプリで鳥について調べたり学んだりしやすくなっています", text: "Websites and apps make it easier to look for and learn about birds", chunks: ["Websites and apps", "make it easier", "to look for", "and learn about", "birds"] },
            { ja: "楽しいから", jaText: "自然を見るのはリラックスできて楽しいです", text: "It is relaxing and fun to watch nature", chunks: ["It is", "relaxing and fun", "to watch", "nature"] },
            { ja: "健康に良いから", jaText: "外にいることは健康に良いです", text: "Being outside is good for your health", chunks: ["Being outside", "is good for", "your health"] }
        ],
        negativeReasons: [
            { ja: "忙しいから", jaText: "多くの人は仕事や学校で忙しすぎて自然を楽しむ時間がありません", text: "Many people are too busy with work or school to enjoy nature", chunks: ["Many people", "are too busy", "with work or school", "to enjoy nature"] },
            { ja: "室内が好きだから", jaText: "若い人は外出するよりゲームやスマホを使う方が好きです", text: "Young people prefer playing games or using phones to going outside", chunks: ["Young people", "prefer playing games", "or using phones", "to going outside"] }
        ],
        questions: [
            { ja: "予約について", jaText: "乗るのに予約は必要ですか", text: "Do we need to make a reservation to ride it", chunks: ["Do we need", "to make", "a reservation", "to ride it"] },
            { ja: "料金について", jaText: "借りるのにいくらかかりますか", text: "How much does it cost to rent it", chunks: ["How much", "does it cost", "to rent it"] },
            { ja: "時間について", jaText: "どのくらいの時間使えますか", text: "How long can we use it", chunks: ["How long", "can we", "use it"] },
            { ja: "場所について", jaText: "家の近くでどこで見つけられますか", text: "Where can we find one near my house", chunks: ["Where", "can we find", "one", "near my house"] },
            { ja: "人数について", jaText: "何人乗れますか", text: "How many people can ride it", chunks: ["How many people", "can ride it"] },
            { ja: "持ち物について", jaText: "何を持っていくべきですか", text: "What should we bring with us", chunks: ["What", "should we bring", "with us"] }
        ],
        transDrillSentences: [
            { sentenceJa: "将来もっと多くの人が野鳥観察を楽しむと思います。", literalJa: "私は思います / もっと多くの人が / 楽しむと / 野鳥観察を / 将来", answer: "I think more people will enjoy bird watching in the future." },
            { sentenceJa: "自然を見るのはリラックスできて楽しいです。", literalJa: "それは〜です / リラックスできて楽しい / 見ること / 自然を", answer: "It is relaxing and fun to watch nature." },
            { sentenceJa: "借りるのにいくらかかりますか？", literalJa: "いくら / かかりますか / 借りるのに / それを", answer: "How much does it cost to rent it?" },
            { sentenceJa: "どのくらいの時間使えますか？", literalJa: "どのくらい / 使えますか / それを", answer: "How long can we use it?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "野鳥観察が将来もっと人気になるか、自分の意見を述べましょう。", modelSentence: "I think more people will enjoy bird watching in the future." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "It is relaxing and fun to watch nature." },
            { label: "質問1", hintJa: "ボートについて質問しましょう（料金、予約など）。", modelSentence: "How much does it cost to rent it?" },
            { label: "質問2", hintJa: "ボートについてもう1つ質問しましょう（時間、場所など）。", modelSentence: "How long can we use it?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think more people will enjoy bird watching in the future. It is relaxing and fun to watch nature. I have two questions about the boat. How much does it cost to rent it? How long can we use it?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。将来もっと多くの人が野鳥観察を楽しむと思います。自然を見るのはリラックスできて楽しいからです。ボートについて2つ質問があります。借りるのにいくらかかりますか？どのくらいの時間使えますか？\n敬具"
    },

    // ===== Theme 2: 2024-3 スペイン旅行と昼休み =====
    {
        id: 2,
        title: "スペイン旅行と昼休み",
        exam: "2024-3",
        underlinedTopic: "a tour",
        alexEmail: "This summer, I went on a tour to Spain with my friend. It was our first time there, and we stayed for one week. We enjoyed seeing many famous places. While we were walking around the city, we noticed something interesting. Some shops closed for a few hours in the afternoon. By doing so, staff members can have a long lunch break. Do you think such a break will become popular in Japan?",
        alexEmailJa: "この夏、友達とスペインへのツアーに行きました。初めての場所で、1週間滞在しました。有名な場所をたくさん見て楽しみました。街を歩いていると、面白いことに気づきました。午後に数時間閉まるお店があったのです。そうすることで、スタッフは長い昼休みが取れます。日本でもそのような休憩が一般的になると思いますか？",
        opinionQuestion: "Do you think such a break will become popular in Japan?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "長い昼休みは日本で人気になると思います",
                text: "a long lunch break will become popular in Japan",
                chunks: ["a long lunch break", "will become popular", "in Japan"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "日本の会社は働き方を変えないと思います",
                text: "Japanese companies will not change their work style",
                chunks: ["Japanese companies", "will not change", "their work style"]
            }
        },
        reasons: [
            { ja: "コミュニケーションに良い", jaText: "長い昼休みは友人との会話を楽しみやすくします", text: "A long lunch break makes it easier to enjoy conversation with friends", chunks: ["A long lunch break", "makes it easier", "to enjoy conversation", "with friends"] },
            { ja: "リフレッシュできる", jaText: "働く人は午後にリフレッシュしてもっと生産的になれます", text: "Workers can refresh and become more productive in the afternoon", chunks: ["Workers", "can refresh", "and become", "more productive", "in the afternoon"] },
            { ja: "健康に良い", jaText: "昼食後に休息を取ることは体に良いです", text: "Taking a rest after lunch is good for your body", chunks: ["Taking a rest", "after lunch", "is good for", "your body"] }
        ],
        negativeReasons: [
            { ja: "仕事が忙しい", jaText: "日本の会社は仕事量が多く、長い休憩を取る余裕がありません", text: "Japanese companies have too much work and cannot afford long breaks", chunks: ["Japanese companies", "have too much work", "and cannot afford", "long breaks"] },
            { ja: "顧客対応がある", jaText: "店やオフィスは顧客のために開いている必要があります", text: "Shops and offices need to stay open for customers", chunks: ["Shops and offices", "need to stay open", "for customers"] }
        ],
        questions: [
            { ja: "予約について", jaText: "ツアーを事前に予約する必要がありましたか", text: "Did you need to book the tour in advance", chunks: ["Did you need", "to book", "the tour", "in advance"] },
            { ja: "料金について", jaText: "ツアーの費用はいくらでしたか", text: "How much was the total cost of the tour per person", chunks: ["How much", "was the total cost", "of the tour", "per person"] },
            { ja: "期間について", jaText: "ツアーは何日間でしたか", text: "How many days was the tour", chunks: ["How many days", "was the tour"] },
            { ja: "場所について", jaText: "ツアー中にどんな場所を訪れましたか", text: "What places did you visit during the tour", chunks: ["What places", "did you visit", "during the tour"] },
            { ja: "食事について", jaText: "そこでどんな食べ物を食べましたか", text: "What kind of food did you eat there", chunks: ["What kind of food", "did you eat", "there"] }
        ],
        transDrillSentences: [
            { sentenceJa: "長い昼休みは日本で人気になると思います。", literalJa: "私は思います / 長い昼休みは / 人気になると / 日本で", answer: "I think a long lunch break will become popular in Japan." },
            { sentenceJa: "昼食後に休息を取ることは体に良いです。", literalJa: "休息を取ること / 昼食後に / は良いです / 体に", answer: "Taking a rest after lunch is good for your body." },
            { sentenceJa: "ツアーを事前に予約する必要がありましたか？", literalJa: "〜する必要がありましたか / 予約する / ツアーを / 事前に", answer: "Did you need to book the tour in advance?" },
            { sentenceJa: "ツアーの費用は1人いくらでしたか？", literalJa: "いくら / でしたか / 合計費用は / ツアーの / 1人あたり", answer: "How much was the total cost of the tour per person?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "長い昼休みが日本で人気になるか、自分の意見を述べましょう。", modelSentence: "I think a long lunch break will become popular in Japan." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Taking a rest after lunch is good for your body." },
            { label: "質問1", hintJa: "ツアーについて質問しましょう（予約、料金など）。", modelSentence: "Did you need to book the tour in advance?" },
            { label: "質問2", hintJa: "ツアーについてもう1つ質問しましょう（費用、期間など）。", modelSentence: "How much was the total cost of the tour per person?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think a long lunch break will become popular in Japan. Taking a rest after lunch is good for your body. I have two questions about the tour. Did you need to book the tour in advance? How much was the total cost of the tour per person?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。長い昼休みは日本で人気になると思います。昼食後に休息を取ることは体に良いからです。ツアーについて2つ質問があります。ツアーを事前に予約する必要がありましたか？ツアーの費用はいくらでしたか？\n敬具"
    },

    // ===== Theme 3: 2025-2 スポーツセンターと温水プール =====
    {
        id: 3,
        title: "スポーツセンターと温水プール",
        exam: "2025-2",
        underlinedTopic: "a sports center",
        alexEmail: "I went to a sports center near the city hall during summer vacation. The sports center opened last year and has three floors. It costs 500 yen per person for 2 hours. While I was there, I saw a notice. A warm water pool will open next week, and visitors can swim even in winter. Do you think the number of such pools will increase in the future?",
        alexEmailJa: "夏休みに市役所の近くにあるスポーツセンターに行きました。スポーツセンターは昨年オープンし、3階建てです。1人2時間500円です。そこにいた時、掲示を見ました。来週温水プールがオープンし、冬でも泳げるとのことです。将来そのようなプールの数は増えると思いますか？",
        opinionQuestion: "Do you think the number of such pools will increase in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "将来、温水プールの数は増えると思います",
                text: "the number of warm water pools will increase in the future",
                chunks: ["the number of", "warm water pools", "will increase", "in the future"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "そのようなプールを作るのは高すぎます",
                text: "it is too expensive to build such pools",
                chunks: ["it is", "too expensive", "to build", "such pools"]
            }
        },
        reasons: [
            { ja: "便利だから", jaText: "天気に関係なくいつでも運動できます", text: "People can exercise anytime regardless of the weather", chunks: ["People", "can exercise", "anytime", "regardless of", "the weather"] },
            { ja: "楽しいから", jaText: "水泳はあらゆる年齢の人にとって楽しい活動です", text: "Swimming is a fun activity for people of all ages", chunks: ["Swimming", "is a fun activity", "for people", "of all ages"] },
            { ja: "健康に良いから", jaText: "水泳は健康維持に良いです", text: "Swimming is good for staying healthy", chunks: ["Swimming", "is good for", "staying healthy"] }
        ],
        negativeReasons: [
            { ja: "お金がかかる", jaText: "温水プールは建設と維持に多くの費用がかかります", text: "Warm water pools cost a lot of money to build and maintain", chunks: ["Warm water pools", "cost a lot of money", "to build and maintain"] },
            { ja: "場所が遠い", jaText: "多くの人にとって近くにスポーツセンターがありません", text: "Many people do not have a sports center near their home", chunks: ["Many people", "do not have", "a sports center", "near their home"] }
        ],
        questions: [
            { ja: "予約について", jaText: "予約は必要ですか", text: "Do we need to make a reservation", chunks: ["Do we need", "to make", "a reservation"] },
            { ja: "料金について", jaText: "プールを使うのにいくらかかりますか", text: "How much does it cost to use the pool", chunks: ["How much", "does it cost", "to use", "the pool"] },
            { ja: "営業時間について", jaText: "何時に開いて何時に閉まりますか", text: "What time does it open and close", chunks: ["What time", "does it open", "and close"] },
            { ja: "場所について", jaText: "駅からどうやって行けますか", text: "How can I get there from the station", chunks: ["How can I", "get there", "from the station"] },
            { ja: "利用者について", jaText: "高校生もスポーツセンターを使えますか", text: "Can high school students use the sports center", chunks: ["Can high school students", "use", "the sports center"] }
        ],
        transDrillSentences: [
            { sentenceJa: "将来、温水プールの数は増えると思います。", literalJa: "私は思います / 温水プールの数は / 増えると / 将来", answer: "I think the number of warm water pools will increase in the future." },
            { sentenceJa: "水泳はあらゆる年齢の人にとって楽しい活動です。", literalJa: "水泳は / 楽しい活動です / 人々にとって / あらゆる年齢の", answer: "Swimming is a fun activity for people of all ages." },
            { sentenceJa: "プールを使うのにいくらかかりますか？", literalJa: "いくら / かかりますか / 使うのに / プールを", answer: "How much does it cost to use the pool?" },
            { sentenceJa: "何時に開いて何時に閉まりますか？", literalJa: "何時に / 開きますか / そして / 閉まりますか", answer: "What time does it open and close?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "温水プールが将来増えるか、自分の意見を述べましょう。", modelSentence: "I think the number of warm water pools will increase in the future." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Swimming is a fun activity for people of all ages." },
            { label: "質問1", hintJa: "スポーツセンターについて質問しましょう（料金、予約など）。", modelSentence: "How much does it cost to use the pool?" },
            { label: "質問2", hintJa: "スポーツセンターについてもう1つ質問しましょう（時間、場所など）。", modelSentence: "What time does it open and close?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think the number of warm water pools will increase in the future. Swimming is a fun activity for people of all ages. I have two questions about the sports center. How much does it cost to use the pool? What time does it open and close?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。将来温水プールの数は増えると思います。水泳はあらゆる年齢の人にとって楽しい活動だからです。スポーツセンターについて2つ質問があります。プールを使うのにいくらかかりますか？何時に開いて何時に閉まりますか？\n敬具"
    },

    // ===== Theme 4: 2024-2 新スタジアムとラグビー =====
    {
        id: 4,
        title: "新スタジアムとラグビー",
        exam: "2024-2",
        underlinedTopic: "a new stadium",
        alexEmail: "I want to tell you something. My dad and I went to a new stadium last Sunday. It opened two months ago. We watched a rugby game between two university teams there. My dad taught me some of the rules, too. It was my first time, so it was very exciting. I will continue to watch rugby. Do you think more people will watch this sport?",
        alexEmailJa: "伝えたいことがあります。先週の日曜日、お父さんと新しいスタジアムに行きました。2ヶ月前にオープンしました。大学チーム同士のラグビーの試合を見ました。お父さんがルールも教えてくれました。初めてだったのでとてもエキサイティングでした。これからもラグビーを見続けます。もっと多くの人がこのスポーツを見ると思いますか？",
        opinionQuestion: "Do you think more people will watch this sport?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "もっと多くの人がラグビーを見ると思います",
                text: "more people will watch rugby",
                chunks: ["more people", "will watch", "rugby"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "ラグビーは初心者には理解しにくいです",
                text: "rugby is difficult to understand for beginners",
                chunks: ["rugby", "is difficult", "to understand", "for beginners"]
            }
        },
        reasons: [
            { ja: "楽しいから", jaText: "ラグビーの試合は家族と見てエキサイティングで楽しいです", text: "Rugby games are exciting and fun to watch with family", chunks: ["Rugby games", "are exciting and fun", "to watch", "with family"] },
            { ja: "良い運動になる", jaText: "スポーツ観戦は人々をもっと運動したくさせます", text: "Watching sports makes people want to exercise more", chunks: ["Watching sports", "makes people", "want to exercise", "more"] }
        ],
        negativeReasons: [
            { ja: "ルールが難しい", jaText: "ラグビーのルールは複雑で初心者には理解しにくいです", text: "Rugby rules are complicated and hard for beginners to understand", chunks: ["Rugby rules", "are complicated", "and hard for beginners", "to understand"] },
            { ja: "他スポーツの方が人気", jaText: "日本では野球やサッカーの方がずっと人気があります", text: "Baseball and soccer are much more popular in Japan", chunks: ["Baseball and soccer", "are much more popular", "in Japan"] }
        ],
        questions: [
            { ja: "チケットについて", jaText: "試合のチケットはどうやって買えますか", text: "How can we buy tickets for the games", chunks: ["How can we", "buy tickets", "for the games"] },
            { ja: "料金について", jaText: "チケットはいくらですか", text: "How much do the tickets cost", chunks: ["How much", "do the tickets", "cost"] },
            { ja: "時間について", jaText: "ラグビーの試合はどのくらい続きますか", text: "How long does a rugby game usually last", chunks: ["How long", "does a rugby game", "usually last"] },
            { ja: "座席について", jaText: "スタジアムには何席ありますか", text: "How many seats does the stadium have", chunks: ["How many seats", "does the stadium", "have"] },
            { ja: "設備について", jaText: "スタジアムの中にレストランはありますか", text: "Are there any restaurants inside the stadium", chunks: ["Are there", "any restaurants", "inside the stadium"] }
        ],
        transDrillSentences: [
            { sentenceJa: "もっと多くの人がラグビーを見ると思います。", literalJa: "私は思います / もっと多くの人が / 見ると / ラグビーを", answer: "I think more people will watch rugby." },
            { sentenceJa: "ラグビーの試合は家族と見てエキサイティングで楽しいです。", literalJa: "ラグビーの試合は / エキサイティングで楽しいです / 見て / 家族と", answer: "Rugby games are exciting and fun to watch with family." },
            { sentenceJa: "チケットはいくらですか？", literalJa: "いくら / しますか / チケットは", answer: "How much do the tickets cost?" },
            { sentenceJa: "スタジアムには何席ありますか？", literalJa: "何席 / ありますか / スタジアムには", answer: "How many seats does the stadium have?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "ラグビーを見る人が増えるか、自分の意見を述べましょう。", modelSentence: "I think more people will watch rugby." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Rugby games are exciting and fun to watch with family." },
            { label: "質問1", hintJa: "スタジアムについて質問しましょう（チケット、座席数など）。", modelSentence: "How much do the tickets cost?" },
            { label: "質問2", hintJa: "スタジアムについてもう1つ質問しましょう（設備、時間など）。", modelSentence: "How many seats does the stadium have?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think more people will watch rugby. Rugby games are exciting and fun to watch with family. I have two questions about the new stadium. How much do the tickets cost? How many seats does the stadium have?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。もっと多くの人がラグビーを見ると思います。ラグビーの試合は家族と見てエキサイティングで楽しいからです。新しいスタジアムについて2つ質問があります。チケットはいくらですか？スタジアムには何席ありますか？\n敬具"
    },

    // ===== Theme 5: 2024-1 図書館のカフェ =====
    {
        id: 5,
        title: "図書館のカフェ",
        exam: "2024-1",
        underlinedTopic: "a library",
        alexEmail: "I have something to tell you about. I went to a library with my friends yesterday. I wanted to study at home, but my friends suggested studying at a quiet place. So, we went to the library near the station. It was very beautiful, and there was a surprise. There was a café in the library. Do you think such cafés will become popular in the future?",
        alexEmailJa: "話したいことがあります。昨日、友達と図書館に行きました。家で勉強したかったのですが、友達が静かな場所で勉強しようと提案しました。そこで、駅の近くの図書館に行きました。とても美しく、驚きがありました。図書館の中にカフェがあったのです。そのようなカフェは将来人気になると思いますか？",
        opinionQuestion: "Do you think such cafés will become popular in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "図書館のカフェは将来人気になると思います",
                text: "such cafés will become popular in the future",
                chunks: ["such cafés", "will become popular", "in the future"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "図書館のカフェは人気にならないと思います",
                text: "such cafés will not become popular",
                chunks: ["such cafés", "will not become", "popular"]
            }
        },
        reasons: [
            { ja: "便利だから", jaText: "図書館は無料で、選べる本がたくさんあります", text: "Libraries are free and have many books to choose from", chunks: ["Libraries", "are free", "and have", "many books", "to choose from"] },
            { ja: "快適だから", jaText: "図書館は静かで快適な勉強やリラックスの場所です", text: "Libraries are quiet and comfortable places to study or relax", chunks: ["Libraries", "are quiet and comfortable", "places", "to study or relax"] },
            { ja: "勉強に良いから", jaText: "本を読むことは新しいことを学ぶのに役立ちます", text: "Reading books helps people learn new things and improve their knowledge", chunks: ["Reading books", "helps people", "learn new things", "and improve", "their knowledge"] }
        ],
        negativeReasons: [
            { ja: "デジタルが便利", jaText: "インターネットで簡単に情報を見つけられます", text: "People can easily find information on the Internet so they do not need to go to libraries", chunks: ["People can easily", "find information", "on the Internet", "so they do not need", "to go to libraries"] },
            { ja: "電子書籍がある", jaText: "スマホやタブレットで本を読む方が便利だと思う人が多い", text: "Many people think it is more convenient to read books on smartphones or tablets", chunks: ["Many people think", "it is more convenient", "to read books", "on smartphones or tablets"] }
        ],
        questions: [
            { ja: "登録について", jaText: "図書館カードはどうやって作れますか", text: "How can we get a library card", chunks: ["How can we", "get", "a library card"] },
            { ja: "料金について", jaText: "本を借りるのは無料ですか", text: "Is it free to borrow books", chunks: ["Is it free", "to borrow", "books"] },
            { ja: "時間について", jaText: "開館時間は何時ですか", text: "What are the opening hours", chunks: ["What are", "the opening hours"] },
            { ja: "場所について", jaText: "図書館はどこにありますか", text: "Where is the library located", chunks: ["Where is", "the library", "located"] },
            { ja: "冊数について", jaText: "一度に何冊借りられますか", text: "How many books can we borrow at once", chunks: ["How many books", "can we borrow", "at once"] }
        ],
        transDrillSentences: [
            { sentenceJa: "そのようなカフェは将来人気になると思います。", literalJa: "私は思います / そのようなカフェは / 人気になると / 将来", answer: "I think such cafés will become popular in the future." },
            { sentenceJa: "図書館は静かで快適な勉強やリラックスの場所です。", literalJa: "図書館は / 静かで快適な場所です / 勉強やリラックスのための", answer: "Libraries are quiet and comfortable places to study or relax." },
            { sentenceJa: "開館時間は何時ですか？", literalJa: "何ですか / 開館時間は", answer: "What are the opening hours?" },
            { sentenceJa: "一度に何冊借りられますか？", literalJa: "何冊 / 借りられますか / 一度に", answer: "How many books can we borrow at once?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "図書館のカフェが将来人気になるか、自分の意見を述べましょう。", modelSentence: "I think such cafés will become popular in the future." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Libraries are quiet and comfortable places to study or relax." },
            { label: "質問1", hintJa: "図書館について質問しましょう（時間、利用方法など）。", modelSentence: "What are the opening hours?" },
            { label: "質問2", hintJa: "図書館についてもう1つ質問しましょう（冊数、場所など）。", modelSentence: "How many books can we borrow at once?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think such cafés will become popular in the future. Libraries are quiet and comfortable places to study or relax. I have two questions about the library. What are the opening hours? How many books can we borrow at once?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。そのようなカフェは将来人気になると思います。図書館は静かで快適な勉強やリラックスの場所だからです。図書館について2つ質問があります。開館時間は何時ですか？一度に何冊借りられますか？\n敬具"
    },

    // ===== Theme 6: 2025-3 新しい街と高齢者バス =====
    {
        id: 6,
        title: "新しい街と高齢者バス",
        exam: "2025-3",
        underlinedTopic: "a city",
        alexEmail: "Guess what! I moved to a city last month. The city is huge and has many shopping malls and train stations. Most of the buildings are new, and it seems that many families with children live there. While I was walking around, I noticed something interesting. There was a free bus service for elderly people. Do you think more cities will provide such a bus service in the future?",
        alexEmailJa: "聞いてよ！先月、ある街に引っ越しました。その街は巨大で、たくさんのショッピングモールや駅があります。建物はほとんど新しく、子供のいる家庭が多く住んでいるようです。歩き回っていると、面白いことに気づきました。高齢者向けの無料バスサービスがありました。将来もっと多くの都市がこのようなバスサービスを提供すると思いますか？",
        opinionQuestion: "Do you think more cities will provide such a bus service in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "もっと多くの都市がそのようなバスサービスを提供すると思います",
                text: "more cities will provide such a bus service in the future",
                chunks: ["more cities", "will provide", "such a bus service", "in the future"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "多くの都市はバスサービスを提供する余裕がないと思います",
                text: "many cities cannot afford to provide such a bus service",
                chunks: ["many cities", "cannot afford", "to provide", "such a bus service"]
            }
        },
        reasons: [
            { ja: "便利だから", jaText: "高齢者は自分で運転できないことが多いので、無料バスは役に立ちます", text: "Elderly people often cannot drive by themselves, so free buses are helpful", chunks: ["Elderly people", "often cannot drive", "by themselves,", "so free buses", "are helpful"] },
            { ja: "安全だから", jaText: "バスに乗ることは高齢者にとって車を運転するより安全です", text: "Riding a bus is safer than driving a car for elderly people", chunks: ["Riding a bus", "is safer", "than driving a car", "for elderly people"] },
            { ja: "社会に良い", jaText: "高齢者が外出しやすくなると地域社会が活発になります", text: "Making it easy for elderly people to go out makes communities more active", chunks: ["Making it easy", "for elderly people", "to go out", "makes communities", "more active"] }
        ],
        negativeReasons: [
            { ja: "お金がかかる", jaText: "無料バスの運営には多くのお金がかかります", text: "Operating free buses costs a lot of money", chunks: ["Operating free buses", "costs", "a lot of money"] },
            { ja: "利用者が少ない", jaText: "バスを使う人が少ないかもしれません", text: "Not many people might use the bus service", chunks: ["Not many people", "might use", "the bus service"] }
        ],
        questions: [
            { ja: "規模について", jaText: "その街にはどのくらいの人が住んでいますか", text: "How many people live in the city", chunks: ["How many people", "live in", "the city"] },
            { ja: "交通について", jaText: "一番近い駅までどのくらいかかりますか", text: "How long does it take to get to the nearest station", chunks: ["How long does it take", "to get to", "the nearest station"] },
            { ja: "お店について", jaText: "近くにお気に入りのお店はありますか", text: "Do you have a favorite shop near your home", chunks: ["Do you have", "a favorite shop", "near your home"] },
            { ja: "学校について", jaText: "近くに学校はありますか", text: "Are there any schools near your home", chunks: ["Are there", "any schools", "near your home"] },
            { ja: "環境について", jaText: "その街は住みやすいですか", text: "Is the city a nice place to live", chunks: ["Is the city", "a nice place", "to live"] }
        ],
        transDrillSentences: [
            { sentenceJa: "もっと多くの都市がそのようなバスサービスを提供すると思います。", literalJa: "私は思います / もっと多くの都市が / 提供すると / そのようなバスサービスを / 将来", answer: "I think more cities will provide such a bus service in the future." },
            { sentenceJa: "高齢者は自分で運転できないことが多いので、無料バスは役に立ちます。", literalJa: "高齢者は / しばしば運転できない / 自分で / だから / 無料バスは / 役に立つ", answer: "Elderly people often cannot drive by themselves, so free buses are helpful." },
            { sentenceJa: "その街にはどのくらいの人が住んでいますか？", literalJa: "何人が / 住んでいますか / その街に", answer: "How many people live in the city?" },
            { sentenceJa: "その街は住みやすいですか？", literalJa: "〜ですか / その街は / 良い場所 / 住むための", answer: "Is the city a nice place to live?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "高齢者バスが将来もっと多くの都市で提供されるか、自分の意見を述べましょう。", modelSentence: "I think more cities will provide such a bus service in the future." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Elderly people often cannot drive by themselves, so free buses are helpful." },
            { label: "質問1", hintJa: "街について質問しましょう（人口、交通など）。", modelSentence: "How many people live in the city?" },
            { label: "質問2", hintJa: "街についてもう1つ質問しましょう（環境、施設など）。", modelSentence: "Is the city a nice place to live?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think more cities will provide such a bus service in the future. Elderly people often cannot drive by themselves, so free buses are helpful. I have two questions about the city. How many people live in the city? Is the city a nice place to live?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。もっと多くの都市がそのようなバスサービスを提供すると思います。高齢者は自分で運転できないことが多いので、無料バスは役に立つからです。街について2つ質問があります。その街にはどのくらいの人が住んでいますか？その街は住みやすいですか？\n敬具"
    },

    // ===== 2024-1 土曜準会場 =====
    {
        id: 7,
        title: "ペンと紙に書く機会",
        exam: "2024-1土曜",
        underlinedTopic: "a pen",
        alexEmail: "I have something to tell you about. My grandfather bought me a pen yesterday. I wanted something as a gift for my graduation, and he bought it at the department store. The pen looks great. I want to use it often, but there is a problem. I have fewer chances to write something on paper now. Do you think such chances will continue to decrease in the future?",
        alexEmailJa: "伝えたいことがあります。昨日、祖父がペンを買ってくれました。卒業祝いに何かほしかったので、デパートで買ってくれました。ペンはとても素敵です。よく使いたいのですが、問題があります。今は紙に何かを書く機会が少なくなっています。そのような機会は将来も減り続けると思いますか？",
        opinionQuestion: "Do you think such chances will continue to decrease in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "紙に書く機会は将来も減り続けると思います",
                text: "such chances will continue to decrease in the future",
                chunks: ["such chances", "will continue", "to decrease", "in the future"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "紙に書く機会はなくならないと思います",
                text: "such chances will not disappear completely",
                chunks: ["such chances", "will not disappear", "completely"]
            }
        },
        reasons: [
            { ja: "デジタル化が進む", jaText: "多くの人がスマホやパソコンでメッセージを送るので紙に書く必要がありません", text: "Many people send messages on smartphones or computers, so they do not need to write on paper", chunks: ["Many people", "send messages", "on smartphones or computers,", "so they do not need", "to write on paper"] },
            { ja: "学校でもデジタル化", jaText: "学校でもタブレットを使う機会が増えています", text: "More schools are using tablets instead of notebooks", chunks: ["More schools", "are using tablets", "instead of", "notebooks"] },
            { ja: "環境に良い", jaText: "紙を使わないことは環境に良いです", text: "Not using paper is good for the environment", chunks: ["Not using paper", "is good for", "the environment"] }
        ],
        negativeReasons: [
            { ja: "手書きは大事", jaText: "手で書くことは記憶力を高めるのに良いです", text: "Writing by hand is good for improving memory", chunks: ["Writing by hand", "is good for", "improving memory"] },
            { ja: "手紙の価値", jaText: "手書きの手紙は特別な気持ちを伝えられます", text: "Handwritten letters can express special feelings", chunks: ["Handwritten letters", "can express", "special feelings"] }
        ],
        questions: [
            { ja: "場所について", jaText: "そのデパートはどこにありますか", text: "Where is the department store", chunks: ["Where is", "the department store"] },
            { ja: "値段について", jaText: "そのペンはいくらでしたか", text: "How much was the pen", chunks: ["How much", "was the pen"] },
            { ja: "色について", jaText: "そのペンは何色ですか", text: "What color is the pen", chunks: ["What color", "is the pen"] },
            { ja: "ブランドについて", jaText: "そのペンのブランドは何ですか", text: "What brand is the pen", chunks: ["What brand", "is the pen"] },
            { ja: "使い方について", jaText: "何を書くのに使いますか", text: "What will you use it to write", chunks: ["What", "will you use it", "to write"] }
        ],
        transDrillSentences: [
            { sentenceJa: "紙に書く機会は将来も減り続けると思います。", literalJa: "私は思います / そのような機会は / 減り続けると / 将来", answer: "I think such chances will continue to decrease in the future." },
            { sentenceJa: "多くの人がスマホやパソコンでメッセージを送るので紙に書く必要がありません。", literalJa: "多くの人が / メッセージを送る / スマホやパソコンで / だから / 書く必要がない / 紙に", answer: "Many people send messages on smartphones or computers, so they do not need to write on paper." },
            { sentenceJa: "そのペンはいくらでしたか？", literalJa: "いくら / でしたか / そのペンは", answer: "How much was the pen?" },
            { sentenceJa: "そのペンは何色ですか？", literalJa: "何色 / ですか / そのペンは", answer: "What color is the pen?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "紙に書く機会が減り続けるか、自分の意見を述べましょう。", modelSentence: "I think such chances will continue to decrease in the future." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Many people send messages on smartphones or computers, so they do not need to write on paper." },
            { label: "質問1", hintJa: "ペンについて質問しましょう（値段、色など）。", modelSentence: "How much was the pen?" },
            { label: "質問2", hintJa: "ペンについてもう1つ質問しましょう（ブランド、使い方など）。", modelSentence: "What color is the pen?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think such chances will continue to decrease in the future. Many people send messages on smartphones or computers, so they do not need to write on paper. I have two questions about the pen. How much was the pen? What color is the pen?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。紙に書く機会は将来も減り続けると思います。多くの人がスマホやパソコンでメッセージを送るので、紙に書く必要がないからです。ペンについて2つ質問があります。そのペンはいくらでしたか？何色ですか？\n敬具"
    },

    // ===== 2024-2 土曜準会場 =====
    {
        id: 8,
        title: "運動プログラムとヘッドフォン",
        exam: "2024-2土曜",
        underlinedTopic: "a new exercise program",
        alexEmail: "I want to tell you something. I started a new exercise program last month. Every morning, I run in the park for thirty minutes before I go to school. I want to be healthy, but I don't like to run. For this reason, I wear headphones and listen to music while I am running. Do you think people should wear such things when they are outside?",
        alexEmailJa: "伝えたいことがあります。先月、新しい運動プログラムを始めました。毎朝、学校に行く前に公園で30分走っています。健康でいたいのですが、走るのが好きではありません。そのため、走っている間ヘッドフォンをつけて音楽を聴いています。外にいるときにそのようなものをつけるべきだと思いますか？",
        opinionQuestion: "Do you think people should wear such things when they are outside?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "外でヘッドフォンをつけるのは良いと思います",
                text: "people should wear such things when they are outside",
                chunks: ["people", "should wear", "such things", "when they are outside"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "外でヘッドフォンをつけるべきではないと思います",
                text: "people should not wear such things when they are outside",
                chunks: ["people", "should not wear", "such things", "when they are outside"]
            }
        },
        reasons: [
            { ja: "楽しくなるから", jaText: "音楽を聴くと運動がもっと楽しくなります", text: "Listening to music makes exercise more enjoyable", chunks: ["Listening to music", "makes exercise", "more enjoyable"] },
            { ja: "集中できるから", jaText: "音楽は走ることに集中するのに役立ちます", text: "Music helps people focus on running", chunks: ["Music", "helps people", "focus on", "running"] },
            { ja: "モチベーションが上がる", jaText: "良い音楽を聴くとやる気が出ます", text: "Listening to good music gives people more motivation", chunks: ["Listening to", "good music", "gives people", "more motivation"] }
        ],
        negativeReasons: [
            { ja: "危険だから", jaText: "ヘッドフォンをしていると車の音が聞こえず危険です", text: "Wearing headphones outside is dangerous because people cannot hear cars", chunks: ["Wearing headphones outside", "is dangerous", "because people", "cannot hear cars"] },
            { ja: "周りに気づかない", jaText: "周りの人に気づかず事故につながる可能性があります", text: "People may not notice others around them and cause accidents", chunks: ["People", "may not notice", "others around them", "and cause accidents"] }
        ],
        questions: [
            { ja: "時間について", jaText: "毎日何時に走っていますか", text: "What time do you run every day", chunks: ["What time", "do you run", "every day"] },
            { ja: "場所について", jaText: "公園は学校の近くですか", text: "Is the park near your school", chunks: ["Is the park", "near your school"] },
            { ja: "音楽について", jaText: "どんな音楽を聴いていますか", text: "What kind of music do you listen to", chunks: ["What kind of music", "do you listen to"] },
            { ja: "ブランドについて", jaText: "どのヘッドフォンを使っていますか", text: "What headphones do you use", chunks: ["What headphones", "do you use"] },
            { ja: "費用について", jaText: "ヘッドフォンはいくらでしたか", text: "How much were the headphones", chunks: ["How much", "were the headphones"] }
        ],
        transDrillSentences: [
            { sentenceJa: "外にいるときにヘッドフォンをつけるべきだと思います。", literalJa: "私は思います / 人々は〜すべきだと / つける / そのようなもの / 外にいるとき", answer: "I think people should wear such things when they are outside." },
            { sentenceJa: "音楽を聴くと運動がもっと楽しくなります。", literalJa: "聴くこと / 音楽を / 運動を〜にする / もっと楽しく", answer: "Listening to music makes exercise more enjoyable." },
            { sentenceJa: "どんな音楽を聴いていますか？", literalJa: "どんな種類の音楽 / を聴いていますか", answer: "What kind of music do you listen to?" },
            { sentenceJa: "ヘッドフォンはいくらでしたか？", literalJa: "いくら / でしたか / ヘッドフォンは", answer: "How much were the headphones?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "外でヘッドフォンをつけることについて自分の意見を述べましょう。", modelSentence: "I think people should wear such things when they are outside." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Listening to music makes exercise more enjoyable." },
            { label: "質問1", hintJa: "運動プログラムについて質問しましょう（音楽、時間など）。", modelSentence: "What kind of music do you listen to?" },
            { label: "質問2", hintJa: "運動プログラムについてもう1つ質問しましょう（場所、費用など）。", modelSentence: "How much were the headphones?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think people should wear such things when they are outside. Listening to music makes exercise more enjoyable. I have two questions about the exercise program. What kind of music do you listen to? How much were the headphones?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。外にいるときにそのようなものをつけるべきだと思います。音楽を聴くと運動がもっと楽しくなるからです。運動プログラムについて2つ質問があります。どんな音楽を聴いていますか？ヘッドフォンはいくらでしたか？\n敬具"
    },

    // ===== 2024-3 土曜準会場 =====
    {
        id: 9,
        title: "絵画教室と自然スポット",
        exam: "2024-3土曜",
        underlinedTopic: "an art class",
        alexEmail: "Guess what! I started to take an art class with my mother. Every Sunday, the students meet the teacher in the park to make art. I wanted to take the class so I could spend time in nature. Now, I want to go to visit other natural places such as rivers and mountains. Do you think such places will become more popular for people to visit?",
        alexEmailJa: "聞いて！母と一緒に絵画教室に通い始めました。毎週日曜日、生徒たちは公園で先生と会って絵を描きます。自然の中で過ごしたくてこの教室に入りました。今は、川や山など他の自然の場所にも行きたいと思っています。そのような場所は訪れる人にとってもっと人気になると思いますか？",
        opinionQuestion: "Do you think such places will become more popular for people to visit?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "川や山のような場所は訪れる人にもっと人気になると思います",
                text: "places like rivers and mountains will become more popular for people to visit",
                chunks: ["places like", "rivers and mountains", "will become", "more popular", "for people to visit"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "多くの人は自然の場所を訪れることに興味がないと思います",
                text: "many people are not interested in visiting natural places",
                chunks: ["many people", "are not interested", "in visiting", "natural places"]
            }
        },
        reasons: [
            { ja: "リフレッシュできる", jaText: "自然の場所に行くとリラックスできます", text: "People can relax by going to natural places", chunks: ["People", "can relax", "by going to", "natural places"] },
            { ja: "健康に良い", jaText: "自然の中を歩くことは健康に良いです", text: "Walking in nature is good for your health", chunks: ["Walking", "in nature", "is good for", "your health"] },
            { ja: "写真が撮れる", jaText: "美しい風景はSNSに写真を投稿するのに最適です", text: "Beautiful scenery is perfect for posting photos on social media", chunks: ["Beautiful scenery", "is perfect", "for posting photos", "on social media"] }
        ],
        negativeReasons: [
            { ja: "アクセスが不便", jaText: "川や山は都市から遠く、行くのが大変です", text: "Rivers and mountains are far from cities and hard to get to", chunks: ["Rivers and mountains", "are far from cities", "and hard to get to"] },
            { ja: "天候に左右される", jaText: "自然の場所は天気が悪いと楽しめません", text: "Natural places are not enjoyable when the weather is bad", chunks: ["Natural places", "are not enjoyable", "when the weather is bad"] }
        ],
        questions: [
            { ja: "費用について", jaText: "絵画教室に通うのにいくらかかりますか", text: "How much does it cost to attend the art class", chunks: ["How much", "does it cost", "to attend", "the art class"] },
            { ja: "道具について", jaText: "絵画教室のために何の道具を用意しましたか", text: "What tools did you need to get for the art class", chunks: ["What tools", "did you need to get", "for the art class"] },
            { ja: "人数について", jaText: "教室には何人生徒がいますか", text: "How many students are in the class", chunks: ["How many students", "are in", "the class"] },
            { ja: "時間について", jaText: "教室は何時間ありますか", text: "How long is each class", chunks: ["How long is", "each class"] },
            { ja: "作品について", jaText: "何を描くのが好きですか", text: "What do you like to draw", chunks: ["What", "do you like", "to draw"] }
        ],
        transDrillSentences: [
            { sentenceJa: "川や山のような場所は訪れる人にもっと人気になると思います。", literalJa: "私は思います / 川や山のような場所は / もっと人気になると / 訪れる人に", answer: "I think places like rivers and mountains will become more popular for people to visit." },
            { sentenceJa: "自然の場所に行くとリラックスできます。", literalJa: "人々は / リラックスできます / 行くことで / 自然の場所に", answer: "People can relax by going to natural places." },
            { sentenceJa: "絵画教室に通うのにいくらかかりますか？", literalJa: "いくら / かかりますか / 通うのに / 絵画教室に", answer: "How much does it cost to attend the art class?" },
            { sentenceJa: "絵画教室のために何の道具を用意しましたか？", literalJa: "何の道具を / 用意する必要がありましたか / 絵画教室のために", answer: "What tools did you need to get for the art class?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "自然の場所がもっと人気になるか、自分の意見を述べましょう。", modelSentence: "I think places like rivers and mountains will become more popular for people to visit." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "People can relax by going to natural places." },
            { label: "質問1", hintJa: "絵画教室について質問しましょう（費用、道具など）。", modelSentence: "How much does it cost to attend the art class?" },
            { label: "質問2", hintJa: "絵画教室についてもう1つ質問しましょう（人数、時間など）。", modelSentence: "What tools did you need to get for the art class?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think places like rivers and mountains will become more popular for people to visit. People can relax by going to natural places. I have two questions about the art class. How much does it cost to attend the art class? What tools did you need to get for the art class?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。川や山のような場所は訪れる人にもっと人気になると思います。自然の場所に行くとリラックスできるからです。絵画教室について2つ質問があります。絵画教室に通うのにいくらかかりますか？何の道具を用意しましたか？\n敬具"
    },

    // ===== 2025-1 土曜準会場 =====
    {
        id: 10,
        title: "新聞と海外在住の日本人",
        exam: "2025-1土曜",
        underlinedTopic: "a newspaper",
        alexEmail: "Every day, I read a newspaper to study Japanese. I started in April, and I spend about 2,000 yen a month to buy it. It includes not only Japanese articles but also an explanation of the articles in English. While reading the newspaper, I read something interesting. There was a story about Japanese people living abroad. Do you think the number of such people will increase in the future?",
        alexEmailJa: "毎日、日本語を勉強するために新聞を読んでいます。4月に始めて、月に約2,000円かかります。日本語の記事だけでなく、英語での記事の説明も載っています。新聞を読んでいるとき、面白い記事を見つけました。海外に住む日本人についての話がありました。そのような人の数は将来増えると思いますか？",
        opinionQuestion: "Do you think the number of such people will increase in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "海外に住む日本人の数は将来増えると思います",
                text: "the number of Japanese people living abroad will increase in the future",
                chunks: ["the number of", "Japanese people", "living abroad", "will increase", "in the future"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "多くの日本人は海外に住むことを選ばないと思います",
                text: "many Japanese people will not choose to live abroad",
                chunks: ["many Japanese people", "will not choose", "to live abroad"]
            }
        },
        reasons: [
            { ja: "仕事の機会", jaText: "海外に住むことでより多くの仕事の機会を得られます", text: "They can have more job opportunities by living abroad", chunks: ["They", "can have", "more job opportunities", "by living abroad"] },
            { ja: "語学力向上", jaText: "海外に住むと外国語を上達させることができます", text: "Living abroad helps people improve their foreign language skills", chunks: ["Living abroad", "helps people", "improve", "their foreign language skills"] },
            { ja: "グローバル化", jaText: "世界はもっとグローバルになり海外で働きやすくなっています", text: "The world is becoming more global and it is easier to work overseas", chunks: ["The world", "is becoming", "more global", "and it is easier", "to work overseas"] }
        ],
        negativeReasons: [
            { ja: "家族と離れる", jaText: "海外に住むと家族や友達と離れなければなりません", text: "People have to be away from their family and friends", chunks: ["People", "have to be away", "from their family", "and friends"] },
            { ja: "文化の違い", jaText: "海外での生活は文化の違いがあり大変です", text: "Living abroad is difficult because of cultural differences", chunks: ["Living abroad", "is difficult", "because of", "cultural differences"] }
        ],
        questions: [
            { ja: "ページ数について", jaText: "新聞は普段何ページありますか", text: "How many pages does the newspaper usually have", chunks: ["How many pages", "does the newspaper", "usually have"] },
            { ja: "写真について", jaText: "記事に写真はたくさんありますか", text: "Are there many photographs in the articles", chunks: ["Are there", "many photographs", "in the articles"] },
            { ja: "配達について", jaText: "新聞はどうやって届きますか", text: "How is the newspaper delivered", chunks: ["How is", "the newspaper", "delivered"] },
            { ja: "内容について", jaText: "どんな種類の記事が好きですか", text: "What kind of articles do you like", chunks: ["What kind of articles", "do you like"] },
            { ja: "頻度について", jaText: "毎日どのくらい読みますか", text: "How long do you read it every day", chunks: ["How long", "do you read it", "every day"] }
        ],
        transDrillSentences: [
            { sentenceJa: "海外に住む日本人の数は将来増えると思います。", literalJa: "私は思います / 日本人の数は / 海外に住む / 増えると / 将来", answer: "I think the number of Japanese people living abroad will increase in the future." },
            { sentenceJa: "海外に住むことでより多くの仕事の機会を得られます。", literalJa: "彼らは / 得られます / より多くの仕事の機会を / 住むことで / 海外に", answer: "They can have more job opportunities by living abroad." },
            { sentenceJa: "新聞は普段何ページありますか？", literalJa: "何ページ / ありますか / 新聞は / 普段", answer: "How many pages does the newspaper usually have?" },
            { sentenceJa: "記事に写真はたくさんありますか？", literalJa: "ありますか / たくさんの写真が / 記事に", answer: "Are there many photographs in the articles?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "海外に住む日本人が増えるか、自分の意見を述べましょう。", modelSentence: "I think the number of Japanese people living abroad will increase in the future." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "They can have more job opportunities by living abroad." },
            { label: "質問1", hintJa: "新聞について質問しましょう（ページ数、写真など）。", modelSentence: "How many pages does the newspaper usually have?" },
            { label: "質問2", hintJa: "新聞についてもう1つ質問しましょう（内容、配達方法など）。", modelSentence: "Are there many photographs in the articles?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think the number of Japanese people living abroad will increase in the future. They can have more job opportunities by living abroad. I have two questions about the newspaper. How many pages does the newspaper usually have? Are there many photographs in the articles?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。海外に住む日本人の数は将来増えると思います。海外に住むことでより多くの仕事の機会を得られるからです。新聞について2つ質問があります。新聞は普段何ページありますか？記事に写真はたくさんありますか？\n敬具"
    },

    // ===== 2025-2 土曜準会場 =====
    {
        id: 11,
        title: "ファッション雑誌と試着アプリ",
        exam: "2025-2土曜",
        underlinedTopic: "a fashion magazine",
        alexEmail: "I have something to tell you. Yesterday, I read a fashion magazine. It sells about 200,000 copies every three months. It has been popular for ten years, but I bought it for the first time. While reading it, I learned something interesting. There are smartphone apps that use a phone's camera to see if clothes fit before people buy them. Do you think such apps will become more popular in the future?",
        alexEmailJa: "伝えたいことがあります。昨日、ファッション雑誌を読みました。3ヶ月ごとに約20万部売れています。10年間人気がありますが、初めて買いました。読んでいるとき、面白いことを知りました。スマホのカメラを使って、服が合うかどうか買う前に確認できるアプリがあるそうです。そのようなアプリは将来もっと人気になると思いますか？",
        opinionQuestion: "Do you think such apps will become more popular in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "スマホのカメラで試着できるアプリはもっと人気になると思います",
                text: "apps that use a phone's camera to see if clothes fit will become more popular",
                chunks: ["apps that use", "a phone's camera", "to see if clothes fit", "will become", "more popular"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "実際に試着する方が良いのでそのようなアプリは人気にならないと思います",
                text: "such apps will not become popular because people prefer to try on clothes in person",
                chunks: ["such apps", "will not become popular", "because people prefer", "to try on clothes", "in person"]
            }
        },
        reasons: [
            { ja: "時間の節約", jaText: "店に行かなくて済むので時間を節約できます", text: "People can save time by not going to the store", chunks: ["People", "can save time", "by not going", "to the store"] },
            { ja: "便利だから", jaText: "家にいながら色々な服を試すことができます", text: "People can try many clothes at home without going out", chunks: ["People", "can try", "many clothes", "at home", "without going out"] },
            { ja: "テクノロジーの進化", jaText: "テクノロジーはどんどん良くなっているのでアプリの精度も上がります", text: "Technology is getting better, so the apps will become more accurate", chunks: ["Technology", "is getting better,", "so the apps", "will become", "more accurate"] }
        ],
        negativeReasons: [
            { ja: "実物と違う", jaText: "画面上では実際の質感やサイズ感がわかりません", text: "People cannot feel the real texture or size on a screen", chunks: ["People", "cannot feel", "the real texture or size", "on a screen"] },
            { ja: "買い物の楽しみ", jaText: "店で実際に試着する方が楽しいです", text: "It is more fun to try on clothes at the store", chunks: ["It is", "more fun", "to try on clothes", "at the store"] }
        ],
        questions: [
            { ja: "値段について", jaText: "雑誌1冊いくらですか", text: "How much is one copy of the magazine", chunks: ["How much is", "one copy of", "the magazine"] },
            { ja: "年齢層について", jaText: "どの年齢層がその雑誌を一番買いますか", text: "Which age group buys that magazine the most", chunks: ["Which age group", "buys that magazine", "the most"] },
            { ja: "内容について", jaText: "雑誌にどんな記事がありますか", text: "What kind of articles are in the magazine", chunks: ["What kind of articles", "are in", "the magazine"] },
            { ja: "頻度について", jaText: "その雑誌はどのくらいの頻度で発行されますか", text: "How often is the magazine published", chunks: ["How often is", "the magazine", "published"] },
            { ja: "おすすめについて", jaText: "雑誌で一番好きなページは何ですか", text: "What is your favorite page in the magazine", chunks: ["What is", "your favorite page", "in the magazine"] }
        ],
        transDrillSentences: [
            { sentenceJa: "スマホのカメラで試着できるアプリはもっと人気になると思います。", literalJa: "私は思います / アプリは / 使う / スマホのカメラを / 確認するために / 服が合うか / もっと人気になると", answer: "I think apps that use a phone's camera to see if clothes fit will become more popular." },
            { sentenceJa: "店に行かなくて済むので時間を節約できます。", literalJa: "人々は / 時間を節約できます / 行かないことで / 店に", answer: "People can save time by not going to the store." },
            { sentenceJa: "雑誌1冊いくらですか？", literalJa: "いくら / ですか / 1冊 / 雑誌の", answer: "How much is one copy of the magazine?" },
            { sentenceJa: "どの年齢層がその雑誌を一番買いますか？", literalJa: "どの年齢層が / 買いますか / その雑誌を / 一番", answer: "Which age group buys that magazine the most?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "試着アプリが人気になるか、自分の意見を述べましょう。", modelSentence: "I think apps that use a phone's camera to see if clothes fit will become more popular." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "People can save time by not going to the store." },
            { label: "質問1", hintJa: "雑誌について質問しましょう（値段、年齢層など）。", modelSentence: "How much is one copy of the magazine?" },
            { label: "質問2", hintJa: "雑誌についてもう1つ質問しましょう（内容、発行頻度など）。", modelSentence: "Which age group buys that magazine the most?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think apps that use a phone's camera to see if clothes fit will become more popular. People can save time by not going to the store. I have two questions. How much is one copy of the magazine? Which age group buys that magazine the most?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。スマホのカメラで試着できるアプリはもっと人気になると思います。店に行かなくて済むので時間を節約できるからです。2つ質問があります。雑誌1冊いくらですか？どの年齢層がその雑誌を一番買いますか？\n敬具"
    },

    // ===== 2025-3 土曜準会場 =====
    {
        id: 12,
        title: "本棚とモールのイベントスペース",
        exam: "2025-3土曜",
        underlinedTopic: "a bookshelf",
        alexEmail: "I bought a bookshelf at the shopping mall near my house last Sunday. I bought it because it is white and the color matches my room very well. While I was walking around the mall, I saw something interesting. On the second floor, there was an area with a stage to hold events, such as a small concert. Do you think more shopping malls will have such an area in the future?",
        alexEmailJa: "先週の日曜日、家の近くのショッピングモールで本棚を買いました。白くて部屋の色にとても合っているので買いました。モールを歩いていると、面白いものを見ました。2階に、小さなコンサートなどのイベントを開くためのステージがあるエリアがありました。将来、もっと多くのショッピングモールにそのようなエリアができると思いますか？",
        opinionQuestion: "Do you think more shopping malls will have such an area in the future?",
        opinions: {
            agree: {
                ja: "そう思う",
                jaText: "もっと多くのショッピングモールにイベント用のステージがあるエリアができると思います",
                text: "more shopping malls will have an area with a stage to hold events",
                chunks: ["more shopping malls", "will have", "an area", "with a stage", "to hold events"]
            },
            disagree: {
                ja: "そう思わない",
                jaText: "ショッピングモールにそのようなスペースは必要ないと思います",
                text: "shopping malls do not need such spaces",
                chunks: ["shopping malls", "do not need", "such spaces"]
            }
        },
        reasons: [
            { ja: "集客効果", jaText: "イベントを開くことでモールはもっと多くの人を集められます", text: "Shopping malls can attract more people by holding events in such spaces", chunks: ["Shopping malls", "can attract", "more people", "by holding events", "in such spaces"] },
            { ja: "楽しい場所になる", jaText: "イベントがあるとモールがもっと楽しい場所になります", text: "Events make shopping malls more fun places to visit", chunks: ["Events", "make shopping malls", "more fun places", "to visit"] },
            { ja: "地域の交流", jaText: "イベントスペースは地域の人々の交流の場になります", text: "Event spaces help people in the community interact with each other", chunks: ["Event spaces", "help people", "in the community", "interact with each other"] }
        ],
        negativeReasons: [
            { ja: "スペースの無駄", jaText: "店のスペースが減ってしまいます", text: "There will be less space for stores", chunks: ["There will be", "less space", "for stores"] },
            { ja: "費用がかかる", jaText: "ステージやイベントの準備にお金がかかります", text: "It costs a lot of money to build a stage and prepare events", chunks: ["It costs", "a lot of money", "to build a stage", "and prepare events"] }
        ],
        questions: [
            { ja: "値段について", jaText: "本棚はいくらでしたか", text: "How much was the bookshelf", chunks: ["How much", "was the bookshelf"] },
            { ja: "サイズについて", jaText: "本棚は本を全部入れられるくらい大きいですか", text: "Is the bookshelf big enough to hold all of your books", chunks: ["Is the bookshelf", "big enough", "to hold all of", "your books"] },
            { ja: "場所について", jaText: "本棚を部屋のどこに置きましたか", text: "Where did you put the bookshelf in your room", chunks: ["Where", "did you put", "the bookshelf", "in your room"] },
            { ja: "モールについて", jaText: "モールにはどんな店がありますか", text: "What kind of stores are in the mall", chunks: ["What kind of stores", "are in", "the mall"] },
            { ja: "モールの距離", jaText: "モールは家からどのくらいですか", text: "How far is the mall from your house", chunks: ["How far is", "the mall", "from your house"] }
        ],
        transDrillSentences: [
            { sentenceJa: "もっと多くのショッピングモールにイベント用のステージがあるエリアができると思います。", literalJa: "私は思います / もっと多くのモールに / あるだろうと / エリアが / ステージがある / イベントを開くための", answer: "I think more shopping malls will have an area with a stage to hold events." },
            { sentenceJa: "イベントを開くことでモールはもっと多くの人を集められます。", literalJa: "モールは / 集められます / もっと多くの人を / 開くことで / イベントを / そのようなスペースで", answer: "Shopping malls can attract more people by holding events in such spaces." },
            { sentenceJa: "本棚はいくらでしたか？", literalJa: "いくら / でしたか / 本棚は", answer: "How much was the bookshelf?" },
            { sentenceJa: "本棚は本を全部入れられるくらい大きいですか？", literalJa: "本棚は / 十分大きいですか / 入れるのに / 全部の本を", answer: "Is the bookshelf big enough to hold all of your books?" }
        ],
        guidedHints: [
            { label: "意見", hintJa: "モールにイベントスペースが増えるか、自分の意見を述べましょう。", modelSentence: "I think more shopping malls will have an area with a stage to hold events." },
            { label: "理由", hintJa: "その意見の理由を1文で述べましょう。", modelSentence: "Shopping malls can attract more people by holding events in such spaces." },
            { label: "質問1", hintJa: "本棚について質問しましょう（値段、サイズなど）。", modelSentence: "How much was the bookshelf?" },
            { label: "質問2", hintJa: "本棚についてもう1つ質問しましょう（場所、容量など）。", modelSentence: "Is the bookshelf big enough to hold all of your books?" }
        ],
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think more shopping malls will have an area with a stage to hold events. Shopping malls can attract more people by holding events in such spaces. I have two questions about the bookshelf. How much was the bookshelf? Is the bookshelf big enough to hold all of your books?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。もっと多くのショッピングモールにイベント用のステージがあるエリアができると思います。イベントを開くことでモールはもっと多くの人を集められるからです。本棚について2つ質問があります。本棚はいくらでしたか？本棚は本を全部入れられるくらい大きいですか？\n敬具"
    }
];
