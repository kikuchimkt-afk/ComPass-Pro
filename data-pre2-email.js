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
        modelAnswer: "Hi, Alex!\nThank you for your e-mail. I think more cities will provide such a bus service in the future. Elderly people often cannot drive by themselves, so free buses are helpful. I have two questions about the city. How many people live in the city? Is the city a nice place to live?\nBest wishes,",
        modelAnswerJa: "アレックスへ\nメールありがとう。もっと多くの都市がそのようなバスサービスを提供すると思います。高齢者は自分で運転できないことが多いので、無料バスは役に立つからです。街について2つ質問があります。その街にはどのくらいの人が住んでいますか？その街は住みやすいですか？\n敬具"
    }
];
