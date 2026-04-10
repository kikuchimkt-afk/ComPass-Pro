// ComPass Pro — 英語資格検定準2級プラス 英文要約データ
// 過去問6テーマ（2025年度 第1回〜第3回、本会場＋土曜準会場）

const THEMES = [
    {
        id: 1,
        title: "グループプロジェクト",
        titleEn: "Group Projects",
        exam: "2025-3 本会場",
        passage: {
            intro: "Group projects are a common activity in many schools. Students often work together in groups to complete assignments and presentations at school or university.",
            merit: "Group projects are beneficial because they allow students to develop teamwork and cooperation skills. These are the abilities that can be valuable in future workplaces or social settings.",
            demerit: "However, there is a problem with group projects. Some team members do not complete their share of the tasks. Because of this, other members who have done theirs feel that it is unfair."
        },
        passageJa: {
            intro: "グループプロジェクトは多くの学校で一般的な活動です。生徒たちは学校や大学でグループで一緒に課題やプレゼンテーションに取り組みます。",
            merit: "グループプロジェクトはチームワークや協力のスキルを身につけられるので有益です。これらは将来の職場や社会生活で役立つ能力です。",
            demerit: "しかし、グループプロジェクトには問題があります。一部のメンバーが自分の分担を果たさないことがあります。そのため、自分の分をやった他のメンバーが不公平だと感じます。"
        },
        modelAnswer: "Group projects are a common activity in many schools. They are beneficial because students can develop teamwork and cooperation skills. However, if some members do not complete their share, others feel that it is unfair.",
        modelAnswerJa: "グループプロジェクトは多くの学校で一般的な活動です。チームワークや協力のスキルを身につけられるため有益です。しかし、一部のメンバーが分担を果たさないと、他のメンバーは不公平だと感じます。",
        fillBlanks: {
            template: "[_1_] are a common activity in many schools. They are [_2_] because students can develop [_3_] and cooperation skills. [_4_], if some members do not complete their share, others feel that it is [_5_].",
            blanks: [
                { id: 1, answer: "Group projects", options: ["Group projects", "School events", "Team sports", "Class meetings"] },
                { id: 2, answer: "beneficial", options: ["beneficial", "dangerous", "boring", "expensive"] },
                { id: 3, answer: "teamwork", options: ["teamwork", "reading", "cooking", "singing"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "unfair", options: ["unfair", "happy", "proud", "excited"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "グループプロジェクトは多くの学校で一般的な活動です。",
                literalJa: "グループプロジェクトは / 一般的な活動です / 多くの学校で",
                answer: "Group projects are a common activity in many schools.",
                pieces: ["Group projects", "are", "a common activity", "in many schools."]
            },
            {
                sentenceJa: "チームワークや協力のスキルを身につけられるため有益です。",
                literalJa: "それらは有益です / なぜなら / 生徒は身につけられるからです / チームワークと協力のスキルを",
                answer: "They are beneficial because students can develop teamwork and cooperation skills.",
                pieces: ["They are beneficial", "because", "students can develop", "teamwork and cooperation skills."]
            },
            {
                sentenceJa: "しかし、一部のメンバーが分担を果たさないと、他のメンバーは不公平だと感じます。",
                literalJa: "しかし / もし一部のメンバーが果たさないなら / 彼らの分担を / 他の人々は感じます / それは不公平だと",
                answer: "However, if some members do not complete their share, others feel that it is unfair.",
                pieces: ["However,", "if some members", "do not complete their share,", "others feel", "that it is unfair."]
            }
        ],
        paraphrases: [
            { original: "allow students to develop", summary: "students can develop" },
            { original: "Some team members do not complete their share of the tasks", summary: "if some members do not complete their share" },
            { original: "other members who have done theirs feel that it is unfair", summary: "others feel that it is unfair" }
        ]
    },

    {
        id: 2,
        title: "SNSと情報",
        titleEn: "Social Media",
        exam: "2025-3 土曜",
        passage: {
            intro: "Social media is very common among many people today. They read news stories as well as posts from others on various social media websites every day.",
            merit: "Social media enables people to learn about important events quickly because information travels very fast online. For example, they can even watch live videos of significant events that are happening far away.",
            demerit: "On the other hand, some information on social media is not true and can make people believe incorrect things. This is because anyone can post information without checking if it is right."
        },
        passageJa: {
            intro: "SNSは今日、多くの人々の間でとても一般的です。人々は毎日、様々なSNSサイトでニュースや他の人の投稿を読んでいます。",
            merit: "SNSのおかげで、情報がオンラインで非常に速く伝わるため、重要な出来事をすぐに知ることができます。例えば、遠くで起きている重大な出来事のライブ映像を見ることもできます。",
            demerit: "一方で、SNS上の情報の中には正しくないものもあり、人々に誤ったことを信じさせてしまうことがあります。これは誰でも正しいかどうか確認せずに情報を投稿できるからです。"
        },
        modelAnswer: "Social media is very common today. It enables people to learn about important events quickly because information travels fast online. However, people may believe incorrect things since anyone can post wrong information without checking it.",
        modelAnswerJa: "SNSは今日とても一般的です。情報がオンラインで速く伝わるので、重要な出来事をすぐに知ることができます。しかし、誰でも確認せずに誤った情報を投稿できるため、人々は間違ったことを信じてしまうかもしれません。",
        fillBlanks: {
            template: "Social media is very [_1_] today. It enables people to learn about important events [_2_] because information travels fast online. [_3_], people may believe [_4_] things since anyone can post wrong information without [_5_] it.",
            blanks: [
                { id: 1, answer: "common", options: ["common", "rare", "expensive", "difficult"] },
                { id: 2, answer: "quickly", options: ["quickly", "slowly", "quietly", "carefully"] },
                { id: 3, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 4, answer: "incorrect", options: ["incorrect", "wonderful", "interesting", "important"] },
                { id: 5, answer: "checking", options: ["checking", "reading", "posting", "deleting"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "SNSは今日とても一般的です。",
                literalJa: "SNSは / とても一般的です / 今日",
                answer: "Social media is very common today.",
                pieces: ["Social media", "is very common", "today."]
            },
            {
                sentenceJa: "情報がオンラインで速く伝わるので、重要な出来事をすぐに知ることができます。",
                literalJa: "それは可能にします / 人々が重要な出来事について学ぶことを / 素早く / なぜなら / 情報が伝わるからです / 速く / オンラインで",
                answer: "It enables people to learn about important events quickly because information travels fast online.",
                pieces: ["It enables people", "to learn about important events quickly", "because", "information travels fast online."]
            },
            {
                sentenceJa: "しかし、誰でも確認せずに誤った情報を投稿できるため、人々は間違ったことを信じてしまうかもしれません。",
                literalJa: "しかし / 人々は信じるかもしれません / 誤ったことを / なぜなら / 誰でも投稿できるからです / 誤った情報を / 確認せずに",
                answer: "However, people may believe incorrect things since anyone can post wrong information without checking it.",
                pieces: ["However,", "people may believe incorrect things", "since anyone can post", "wrong information", "without checking it."]
            }
        ],
        paraphrases: [
            { original: "very common among many people today", summary: "very common today" },
            { original: "On the other hand", summary: "However" },
            { original: "information on social media is not true", summary: "wrong information" },
            { original: "make people believe incorrect things", summary: "people may believe incorrect things" }
        ]
    },

    {
        id: 3,
        title: "キャンプ",
        titleEn: "Camping",
        exam: "2025-2 本会場",
        passage: {
            intro: "Camping has become very popular among people of all ages in recent years. People enjoy camping with family, friends, or school groups at rivers, mountains, and parks.",
            merit: "Camping is good for people because they can experience nature directly and take a break from their busy daily lives. For example, people can watch birds and beautiful stars at night when they camp in the mountains.",
            demerit: "However, people need to be careful of injuries. Most injuries happen when they are handling camping equipment such as knives or gas lanterns."
        },
        passageJa: {
            intro: "近年、キャンプはあらゆる年齢の人々の間でとても人気になっています。人々は川や山、公園で家族や友人、学校のグループとキャンプを楽しんでいます。",
            merit: "キャンプは自然を直接体験でき、忙しい日常生活から離れてリフレッシュできるので良いです。例えば、山でキャンプをすると鳥や美しい星空を見ることができます。",
            demerit: "しかし、けがに気をつける必要があります。ほとんどのけがはナイフやガスランタンなどのキャンプ用具を扱っているときに起こります。"
        },
        modelAnswer: "Camping has become very popular among people of all ages. It is good to experience nature and take a break from daily life. However, they need to be careful of injuries when handling camping equipment.",
        modelAnswerJa: "キャンプはあらゆる年齢の人々の間でとても人気になっています。自然を体験し、日常生活から離れてリフレッシュできるのは良いことです。しかし、キャンプ用具を扱うときにはけがに気をつける必要があります。",
        fillBlanks: {
            template: "Camping has become very [_1_] among people of all ages. It is good to [_2_] nature and take a break from daily life. [_3_], they need to be careful of [_4_] when handling camping [_5_].",
            blanks: [
                { id: 1, answer: "popular", options: ["popular", "dangerous", "expensive", "difficult"] },
                { id: 2, answer: "experience", options: ["experience", "destroy", "avoid", "forget"] },
                { id: 3, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 4, answer: "injuries", options: ["injuries", "animals", "weather", "prices"] },
                { id: 5, answer: "equipment", options: ["equipment", "food", "songs", "stories"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "キャンプはあらゆる年齢の人々の間でとても人気になっています。",
                literalJa: "キャンプは / とても人気になっています / 人々の間で / すべての年齢の",
                answer: "Camping has become very popular among people of all ages.",
                pieces: ["Camping", "has become very popular", "among people", "of all ages."]
            },
            {
                sentenceJa: "自然を体験し、日常生活から離れてリフレッシュできるのは良いことです。",
                literalJa: "それは良いことです / 体験することは / 自然を / そして / 離れて休むことは / 日常生活から",
                answer: "It is good to experience nature and take a break from daily life.",
                pieces: ["It is good", "to experience nature", "and take a break", "from daily life."]
            },
            {
                sentenceJa: "しかし、キャンプ用具を扱うときにはけがに気をつける必要があります。",
                literalJa: "しかし / 彼らは注意する必要があります / けがに / 扱うとき / キャンプ用具を",
                answer: "However, they need to be careful of injuries when handling camping equipment.",
                pieces: ["However,", "they need to be careful", "of injuries", "when handling", "camping equipment."]
            }
        ],
        paraphrases: [
            { original: "in recent years", summary: "(省略)" },
            { original: "Camping is good for people because they can experience nature directly and take a break from their busy daily lives", summary: "It is good to experience nature and take a break from daily life" },
            { original: "Most injuries happen when they are handling camping equipment such as knives or gas lanterns", summary: "they need to be careful of injuries when handling camping equipment" }
        ]
    },

    {
        id: 4,
        title: "学校での携帯電話",
        titleEn: "Mobile Phones at School",
        exam: "2025-2 土曜",
        passage: {
            intro: "People often discuss the use of mobile phones by students at school today. Many students carry phones in various situations, such as in classrooms, on playgrounds, or during school trips.",
            merit: "Mobile phones in schools can be useful because students can easily contact someone in an emergency. For example, students can quickly inform their families if they feel sick or get injured at school.",
            demerit: "However, there is a problem. Mobile phones may cause students to lose concentration. Students sometimes check messages or play games, and these activities can distract them during self-study or in class."
        },
        passageJa: {
            intro: "今日、学校での生徒による携帯電話の使用についてよく議論されています。多くの生徒が教室や校庭、修学旅行など様々な場面で携帯電話を持ち歩いています。",
            merit: "学校での携帯電話は、緊急時に誰かに簡単に連絡できるため便利です。例えば、学校で気分が悪くなったりけがをした場合、すぐに家族に知らせることができます。",
            demerit: "しかし、問題があります。携帯電話は生徒の集中力を低下させる可能性があります。生徒がメッセージを確認したりゲームをしたりすることがあり、自習中や授業中の妨げになります。"
        },
        modelAnswer: "People often discuss the use of mobile phones by students at school. Mobile phones are useful because students can easily contact someone in an emergency. However, students may lose focus during self-study or in class.",
        modelAnswerJa: "学校での生徒の携帯電話の使用についてよく議論されています。携帯電話は緊急時に簡単に連絡できるため便利です。しかし、生徒は自習中や授業中に集中力を失う可能性があります。",
        fillBlanks: {
            template: "People often discuss the use of [_1_] by students at school. Mobile phones are useful because students can easily [_2_] someone in an emergency. [_3_], students may lose [_4_] during self-study or in [_5_].",
            blanks: [
                { id: 1, answer: "mobile phones", options: ["mobile phones", "computers", "textbooks", "headphones"] },
                { id: 2, answer: "contact", options: ["contact", "teach", "visit", "follow"] },
                { id: 3, answer: "However", options: ["However", "Therefore", "Moreover", "For example"] },
                { id: 4, answer: "focus", options: ["focus", "money", "friends", "weight"] },
                { id: 5, answer: "class", options: ["class", "games", "sports", "cooking"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "学校での生徒の携帯電話の使用についてよく議論されています。",
                literalJa: "人々はよく議論します / 使用について / 携帯電話の / 生徒による / 学校での",
                answer: "People often discuss the use of mobile phones by students at school.",
                pieces: ["People often discuss", "the use of mobile phones", "by students", "at school."]
            },
            {
                sentenceJa: "携帯電話は緊急時に簡単に連絡できるため便利です。",
                literalJa: "携帯電話は / 便利です / なぜなら / 生徒は簡単に連絡できるからです / 誰かに / 緊急時に",
                answer: "Mobile phones are useful because students can easily contact someone in an emergency.",
                pieces: ["Mobile phones are useful", "because students can easily contact", "someone", "in an emergency."]
            },
            {
                sentenceJa: "しかし、生徒は自習中や授業中に集中力を失う可能性があります。",
                literalJa: "しかし / 生徒は失うかもしれません / 集中力を / 自習中や / 授業中に",
                answer: "However, students may lose focus during self-study or in class.",
                pieces: ["However,", "students may lose focus", "during self-study", "or in class."]
            }
        ],
        paraphrases: [
            { original: "Mobile phones in schools can be useful", summary: "Mobile phones are useful" },
            { original: "cause students to lose concentration", summary: "students may lose focus" },
            { original: "these activities can distract them during self-study or in class", summary: "during self-study or in class" }
        ]
    },

    {
        id: 5,
        title: "AI（人工知能）",
        titleEn: "AI",
        exam: "2025-1 本会場",
        passage: {
            intro: "More and more people are using AI in everyday life. We can ask it various questions at any time using a computer or a smartphone.",
            merit: "People find AI very helpful because it gives us quick answers or solutions. We do not have to look for the right person to ask or search online.",
            demerit: "However, there is a concern. We may lose the habit of thinking for ourselves. When we try to find solutions by ourselves, it helps us get better at thinking. If we always depend on AI, we lose those chances."
        },
        passageJa: {
            intro: "ますます多くの人々が日常生活でAIを使っています。パソコンやスマートフォンを使って、いつでも様々な質問をすることができます。",
            merit: "AIは素早い答えや解決策を教えてくれるのでとても役に立つと人々は感じています。適切な人を探したり、オンラインで検索したりする必要がありません。",
            demerit: "しかし、懸念があります。自分で考える習慣を失ってしまうかもしれません。自分で解決策を見つけようとすることは、思考力を高めるのに役立ちます。いつもAIに頼っていると、その機会を失ってしまいます。"
        },
        modelAnswer: "More people are using AI in everyday life. It is helpful because it gives us quick answers or solutions. However, we may lose the habit of thinking for ourselves if we always depend on it.",
        modelAnswerJa: "より多くの人々が日常生活でAIを使っています。素早い答えや解決策を教えてくれるので役に立ちます。しかし、いつもAIに頼っていると、自分で考える習慣を失ってしまうかもしれません。",
        fillBlanks: {
            template: "More people are using [_1_] in everyday life. It is [_2_] because it gives us quick answers or [_3_]. [_4_], we may lose the habit of thinking for [_5_] if we always depend on it.",
            blanks: [
                { id: 1, answer: "AI", options: ["AI", "books", "maps", "cameras"] },
                { id: 2, answer: "helpful", options: ["helpful", "harmful", "boring", "scary"] },
                { id: 3, answer: "solutions", options: ["solutions", "problems", "questions", "stories"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "In addition", "For example"] },
                { id: 5, answer: "ourselves", options: ["ourselves", "others", "teachers", "computers"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "より多くの人々が日常生活でAIを使っています。",
                literalJa: "より多くの人々が / 使っています / AIを / 日常生活で",
                answer: "More people are using AI in everyday life.",
                pieces: ["More people", "are using AI", "in everyday life."]
            },
            {
                sentenceJa: "素早い答えや解決策を教えてくれるので役に立ちます。",
                literalJa: "それは役に立ちます / なぜなら / それは与えてくれるからです / 私たちに / 素早い答えや解決策を",
                answer: "It is helpful because it gives us quick answers or solutions.",
                pieces: ["It is helpful", "because", "it gives us", "quick answers or solutions."]
            },
            {
                sentenceJa: "しかし、いつもAIに頼っていると自分で考える習慣を失ってしまうかもしれません。",
                literalJa: "しかし / 私たちは失うかもしれません / 習慣を / 自分で考えることの / もしいつもそれに頼っているなら",
                answer: "However, we may lose the habit of thinking for ourselves if we always depend on it.",
                pieces: ["However,", "we may lose the habit", "of thinking for ourselves", "if we always depend on it."]
            }
        ],
        paraphrases: [
            { original: "More and more people are using AI", summary: "More people are using AI" },
            { original: "People find AI very helpful", summary: "It is helpful" },
            { original: "there is a concern", summary: "(具体的内容に展開)" },
            { original: "If we always depend on AI, we lose those chances", summary: "if we always depend on it" }
        ]
    },

    {
        id: 6,
        title: "歴史的建造物",
        titleEn: "Historic Buildings",
        exam: "2025-1 土曜",
        passage: {
            intro: "In many countries, there are various historic buildings. Some of them are protected as cultural heritages or national treasures.",
            merit: "People believe that these buildings are very valuable because they develop the local economy. When more tourists visit, the surrounding stores and hotels can attract more customers.",
            demerit: "However, there is a problem. If they are protected too much, it may become difficult to adapt to the demands of modern life and technology. For example, some buildings where it is difficult to install new barrier-free facilities have been inconvenient places for some people."
        },
        passageJa: {
            intro: "多くの国には様々な歴史的建造物があります。その中には文化遺産や国宝として保護されているものもあります。",
            merit: "人々はこれらの建物が地域経済を発展させるのでとても価値があると考えています。より多くの観光客が訪れると、周辺の店やホテルがより多くの顧客を集めることができます。",
            demerit: "しかし、問題があります。過度に保護されると、現代生活やテクノロジーの要求に適応することが難しくなるかもしれません。例えば、新しいバリアフリー設備の設置が難しい建物は、一部の人にとって不便な場所になっています。"
        },
        modelAnswer: "Many countries have various historic buildings. They are valuable because they develop the local economy. However, it may become difficult to adapt to the demands of modern life and technology, such as installing barrier-free facilities.",
        modelAnswerJa: "多くの国には様々な歴史的建造物があります。地域経済を発展させるため価値があります。しかし、バリアフリー設備の設置など、現代生活やテクノロジーの要求に適応することが難しくなるかもしれません。",
        fillBlanks: {
            template: "Many countries have various [_1_] buildings. They are [_2_] because they develop the local [_3_]. [_4_], it may become difficult to adapt to the demands of modern life and [_5_], such as installing barrier-free facilities.",
            blanks: [
                { id: 1, answer: "historic", options: ["historic", "modern", "wooden", "small"] },
                { id: 2, answer: "valuable", options: ["valuable", "dangerous", "ugly", "cheap"] },
                { id: 3, answer: "economy", options: ["economy", "school", "park", "hospital"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "technology", options: ["technology", "nature", "history", "music"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "多くの国には様々な歴史的建造物があります。",
                answer: "Many countries have various historic buildings.",
                pieces: ["Many countries", "have various", "historic buildings."]
            },
            {
                sentenceJa: "地域経済を発展させるため価値があります。",
                answer: "They are valuable because they develop the local economy.",
                pieces: ["They are valuable", "because", "they develop", "the local economy."]
            },
            {
                sentenceJa: "しかし、バリアフリー設備の設置など、現代生活やテクノロジーの要求に適応することが難しくなるかもしれません。",
                answer: "However, it may become difficult to adapt to the demands of modern life and technology, such as installing barrier-free facilities.",
                pieces: ["However,", "it may become difficult", "to adapt to the demands", "of modern life and technology,", "such as installing", "barrier-free facilities."]
            }
        ],
        paraphrases: [
            { original: "In many countries, there are various historic buildings", summary: "Many countries have various historic buildings" },
            { original: "People believe that these buildings are very valuable", summary: "They are valuable" },
            { original: "If they are protected too much, it may become difficult to adapt", summary: "it may become difficult to adapt" },
            { original: "some buildings where it is difficult to install new barrier-free facilities", summary: "such as installing barrier-free facilities" }
        ]
    },

    // ===== 以下、オリジナル類題 =====

    {
        id: 7,
        title: "オンライン学習",
        titleEn: "Online Learning",
        exam: "類題",
        passage: {
            intro: "Online learning has grown rapidly in recent years. Many schools and universities now offer courses that students can take from home using computers or tablets.",
            merit: "Online learning is convenient because students can study at their own pace and review lessons as many times as they want. This is especially helpful for students who need extra time to understand difficult subjects.",
            demerit: "However, some students find it hard to stay motivated without a teacher nearby. They may get distracted by other things at home, such as TV or video games, and fall behind in their studies."
        },
        passageJa: {
            intro: "オンライン学習は近年急速に成長しています。多くの学校や大学が、パソコンやタブレットを使って自宅から受講できるコースを提供しています。",
            merit: "オンライン学習は、自分のペースで学習でき、何度でも授業を見直せるため便利です。これは特に難しい科目を理解するのに時間が必要な生徒にとって役立ちます。",
            demerit: "しかし、近くに先生がいないとやる気を保つのが難しいと感じる生徒もいます。テレビやゲームなど家にある他のものに気を取られ、学習が遅れてしまうことがあります。"
        },
        modelAnswer: "Online learning has grown rapidly in recent years. It is convenient because students can study at their own pace and review lessons many times. However, some students find it hard to stay motivated and may get distracted at home.",
        modelAnswerJa: "オンライン学習は近年急速に成長しています。自分のペースで学習でき、何度も授業を見直せるため便利です。しかし、やる気を保つのが難しく、家で気を取られてしまう生徒もいます。",
        fillBlanks: {
            template: "Online learning has [_1_] rapidly in recent years. It is [_2_] because students can study at their own pace and [_3_] lessons many times. [_4_], some students find it hard to stay [_5_] and may get distracted at home.",
            blanks: [
                { id: 1, answer: "grown", options: ["grown", "stopped", "changed", "failed"] },
                { id: 2, answer: "convenient", options: ["convenient", "dangerous", "expensive", "boring"] },
                { id: 3, answer: "review", options: ["review", "delete", "skip", "forget"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "motivated", options: ["motivated", "quiet", "awake", "seated"] }
            ]
        },
        chunks: [
            { sentenceJa: "オンライン学習は近年急速に成長しています。", answer: "Online learning has grown rapidly in recent years.", pieces: ["Online learning", "has grown rapidly", "in recent years."] },
            { sentenceJa: "自分のペースで学習でき、何度も授業を見直せるため便利です。", answer: "It is convenient because students can study at their own pace and review lessons many times.", pieces: ["It is convenient", "because students can study", "at their own pace", "and review lessons many times."] },
            { sentenceJa: "しかし、やる気を保つのが難しく、家で気を取られてしまう生徒もいます。", answer: "However, some students find it hard to stay motivated and may get distracted at home.", pieces: ["However,", "some students find it hard", "to stay motivated", "and may get distracted", "at home."] }
        ],
        paraphrases: [
            { original: "study at their own pace and review lessons as many times as they want", summary: "study at their own pace and review lessons many times" },
            { original: "get distracted by other things at home, such as TV or video games", summary: "get distracted at home" },
            { original: "fall behind in their studies", summary: "(省略)" }
        ]
    },

    {
        id: 8,
        title: "ペットを飼うこと",
        titleEn: "Keeping Pets",
        exam: "類題",
        passage: {
            intro: "Many families in Japan keep pets such as dogs, cats, or small animals. Pets are considered important members of the family by many people.",
            merit: "Having a pet is good because it can reduce stress and make people feel less lonely. Studies have shown that spending time with a pet can lower blood pressure and improve mental health.",
            demerit: "On the other hand, keeping a pet requires a lot of time and money. Owners need to feed their pets, take them to the vet, and clean up after them every day."
        },
        passageJa: {
            intro: "日本の多くの家庭で犬、猫、小動物などのペットを飼っています。ペットは多くの人にとって家族の大切な一員と考えられています。",
            merit: "ペットを飼うことはストレスを減らし、孤独感を和らげてくれるので良いです。ペットと過ごす時間が血圧を下げ、精神的な健康を改善することが研究で示されています。",
            demerit: "一方で、ペットを飼うには多くの時間とお金が必要です。飼い主は毎日ペットに餌をあげ、獣医に連れて行き、世話をしなければなりません。"
        },
        modelAnswer: "Many families in Japan keep pets. Having a pet is good because it can reduce stress and make people feel less lonely. However, keeping a pet requires a lot of time and money for daily care.",
        modelAnswerJa: "日本の多くの家庭でペットを飼っています。ペットを飼うことはストレスを減らし、孤独感を和らげてくれるので良いです。しかし、ペットを飼うには毎日の世話に多くの時間とお金が必要です。",
        fillBlanks: {
            template: "Many families in Japan keep [_1_]. Having a pet is good because it can [_2_] stress and make people feel less [_3_]. [_4_], keeping a pet requires a lot of [_5_] and money for daily care.",
            blanks: [
                { id: 1, answer: "pets", options: ["pets", "cars", "gardens", "books"] },
                { id: 2, answer: "reduce", options: ["reduce", "increase", "create", "ignore"] },
                { id: 3, answer: "lonely", options: ["lonely", "hungry", "tired", "angry"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "Moreover"] },
                { id: 5, answer: "time", options: ["time", "space", "courage", "knowledge"] }
            ]
        },
        chunks: [
            { sentenceJa: "日本の多くの家庭でペットを飼っています。", answer: "Many families in Japan keep pets.", pieces: ["Many families", "in Japan", "keep pets."] },
            { sentenceJa: "ストレスを減らし、孤独感を和らげてくれるので良いです。", answer: "Having a pet is good because it can reduce stress and make people feel less lonely.", pieces: ["Having a pet is good", "because it can reduce stress", "and make people feel", "less lonely."] },
            { sentenceJa: "しかし、毎日の世話に多くの時間とお金が必要です。", answer: "However, keeping a pet requires a lot of time and money for daily care.", pieces: ["However,", "keeping a pet requires", "a lot of time and money", "for daily care."] }
        ],
        paraphrases: [
            { original: "Pets are considered important members of the family", summary: "(省略)" },
            { original: "On the other hand", summary: "However" },
            { original: "Owners need to feed their pets, take them to the vet, and clean up after them every day", summary: "for daily care" }
        ]
    },

    {
        id: 9,
        title: "読書の習慣",
        titleEn: "Reading Habits",
        exam: "類題",
        passage: {
            intro: "Reading books is a popular hobby for people of all ages around the world. People enjoy reading various types of books, such as novels, comics, and non-fiction.",
            merit: "Reading is helpful because it can improve vocabulary and knowledge. People who read regularly tend to have better writing skills and can express their ideas more clearly.",
            demerit: "However, many young people today prefer watching videos or playing games on their smartphones to reading books. As a result, the number of people who read books regularly has been decreasing in many countries."
        },
        passageJa: {
            intro: "読書は世界中のあらゆる年齢の人々に人気のある趣味です。小説、漫画、ノンフィクションなど、さまざまな種類の本を楽しんでいます。",
            merit: "読書は語彙や知識を増やすのに役立ちます。定期的に読書する人はより良い文章力を持ち、自分の考えをより明確に表現できるようになります。",
            demerit: "しかし、今日の多くの若者は読書よりもスマートフォンで動画を見たりゲームをしたりすることを好みます。その結果、定期的に本を読む人の数は多くの国で減少しています。"
        },
        modelAnswer: "Reading books is a popular hobby for people of all ages. It is helpful because it can improve vocabulary and knowledge. However, many young people now prefer watching videos or playing games to reading books.",
        modelAnswerJa: "読書はあらゆる年齢の人々に人気のある趣味です。語彙や知識を増やすのに役立ちます。しかし、今日の多くの若者は読書よりも動画を見たりゲームをしたりすることを好みます。",
        fillBlanks: {
            template: "Reading books is a [_1_] hobby for people of all ages. It is [_2_] because it can improve [_3_] and knowledge. [_4_], many young people now prefer watching videos or playing games to [_5_] books.",
            blanks: [
                { id: 1, answer: "popular", options: ["popular", "unusual", "expensive", "difficult"] },
                { id: 2, answer: "helpful", options: ["helpful", "harmful", "boring", "tiring"] },
                { id: 3, answer: "vocabulary", options: ["vocabulary", "speed", "height", "appetite"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "reading", options: ["reading", "buying", "writing", "selling"] }
            ]
        },
        chunks: [
            { sentenceJa: "読書はあらゆる年齢の人々に人気のある趣味です。", answer: "Reading books is a popular hobby for people of all ages.", pieces: ["Reading books", "is a popular hobby", "for people", "of all ages."] },
            { sentenceJa: "語彙や知識を増やすのに役立ちます。", answer: "It is helpful because it can improve vocabulary and knowledge.", pieces: ["It is helpful", "because", "it can improve", "vocabulary and knowledge."] },
            { sentenceJa: "しかし、多くの若者は読書よりも動画を見たりゲームをしたりすることを好みます。", answer: "However, many young people now prefer watching videos or playing games to reading books.", pieces: ["However,", "many young people now prefer", "watching videos or playing games", "to reading books."] }
        ],
        paraphrases: [
            { original: "around the world", summary: "(省略)" },
            { original: "People who read regularly tend to have better writing skills", summary: "(省略)" },
            { original: "prefer watching videos or playing games on their smartphones to reading books", summary: "prefer watching videos or playing games to reading books" }
        ]
    },

    {
        id: 10,
        title: "制服の着用",
        titleEn: "School Uniforms",
        exam: "類題",
        passage: {
            intro: "School uniforms are worn by students in many countries around the world. In Japan, most junior high and high school students wear uniforms every day.",
            merit: "School uniforms are useful because students do not have to worry about what to wear each morning. This saves time and helps students focus on studying instead of fashion.",
            demerit: "However, some students feel that uniforms take away their freedom to express themselves. They want to choose their own clothes to show their personality and style."
        },
        passageJa: {
            intro: "制服は世界中の多くの国で生徒によって着用されています。日本では、ほとんどの中学生と高校生が毎日制服を着ています。",
            merit: "制服は便利です。なぜなら、毎朝何を着るか悩む必要がないからです。これにより時間が節約でき、ファッションではなく勉強に集中できます。",
            demerit: "しかし、制服は自分を表現する自由を奪うと感じる生徒もいます。彼らは自分の個性やスタイルを見せるために自分で服を選びたいと思っています。"
        },
        modelAnswer: "School uniforms are worn by students in many countries. They are useful because students do not have to worry about what to wear each morning. However, some students feel that uniforms take away their freedom to express themselves.",
        modelAnswerJa: "制服は多くの国で生徒によって着用されています。毎朝何を着るか悩む必要がないため便利です。しかし、制服は自分を表現する自由を奪うと感じる生徒もいます。",
        fillBlanks: {
            template: "School uniforms are [_1_] by students in many countries. They are useful because students do not have to [_2_] about what to wear each morning. [_3_], some students feel that uniforms take away their [_4_] to express [_5_].",
            blanks: [
                { id: 1, answer: "worn", options: ["worn", "designed", "sold", "washed"] },
                { id: 2, answer: "worry", options: ["worry", "talk", "dream", "laugh"] },
                { id: 3, answer: "However", options: ["However", "Therefore", "Moreover", "For example"] },
                { id: 4, answer: "freedom", options: ["freedom", "money", "time", "energy"] },
                { id: 5, answer: "themselves", options: ["themselves", "others", "teachers", "parents"] }
            ]
        },
        chunks: [
            { sentenceJa: "制服は多くの国で生徒によって着用されています。", answer: "School uniforms are worn by students in many countries.", pieces: ["School uniforms", "are worn", "by students", "in many countries."] },
            { sentenceJa: "毎朝何を着るか悩む必要がないため便利です。", answer: "They are useful because students do not have to worry about what to wear each morning.", pieces: ["They are useful", "because students do not have to worry", "about what to wear", "each morning."] },
            { sentenceJa: "しかし、制服は自分を表現する自由を奪うと感じる生徒もいます。", answer: "However, some students feel that uniforms take away their freedom to express themselves.", pieces: ["However,", "some students feel", "that uniforms take away", "their freedom", "to express themselves."] }
        ],
        paraphrases: [
            { original: "In Japan, most junior high and high school students wear uniforms every day", summary: "(省略)" },
            { original: "This saves time and helps students focus on studying instead of fashion", summary: "(省略)" },
            { original: "They want to choose their own clothes to show their personality and style", summary: "(具体例を省略)" }
        ]
    },

    {
        id: 11,
        title: "自動販売機",
        titleEn: "Vending Machines",
        exam: "類題",
        passage: {
            intro: "Japan is famous for having a large number of vending machines. People can buy drinks, snacks, and even hot food from these machines at any time of day.",
            merit: "Vending machines are useful because they allow people to buy things quickly without waiting in line. They are also available 24 hours a day, which is very helpful for people who work late at night.",
            demerit: "However, vending machines use a lot of electricity to keep drinks cold or hot all day. This means they can have a negative effect on the environment because of the energy they consume."
        },
        passageJa: {
            intro: "日本は自動販売機の数が多いことで有名です。人々はこれらの機械から飲み物、スナック、さらには温かい食べ物をいつでも買うことができます。",
            merit: "自動販売機は列に並ばずにすぐに物を買えるので便利です。また、24時間利用できるため、夜遅くまで働く人にとってとても役立ちます。",
            demerit: "しかし、自動販売機は一日中飲み物を冷たくしたり温かくしたりするために多くの電力を使います。そのため、消費するエネルギーにより環境に悪影響を与える可能性があります。"
        },
        modelAnswer: "Japan has a large number of vending machines. They are useful because people can buy things quickly and they are available 24 hours a day. However, they use a lot of electricity and may have a negative effect on the environment.",
        modelAnswerJa: "日本には多くの自動販売機があります。すぐに物を買うことができ、24時間利用できるため便利です。しかし、多くの電力を使うため、環境に悪影響を与える可能性があります。",
        fillBlanks: {
            template: "Japan has a large number of [_1_] machines. They are useful because people can buy things [_2_] and they are available 24 hours a day. [_3_], they use a lot of [_4_] and may have a negative effect on the [_5_].",
            blanks: [
                { id: 1, answer: "vending", options: ["vending", "washing", "sewing", "printing"] },
                { id: 2, answer: "quickly", options: ["quickly", "slowly", "cheaply", "carefully"] },
                { id: 3, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 4, answer: "electricity", options: ["electricity", "water", "paper", "space"] },
                { id: 5, answer: "environment", options: ["environment", "economy", "schedule", "fashion"] }
            ]
        },
        chunks: [
            { sentenceJa: "日本には多くの自動販売機があります。", answer: "Japan has a large number of vending machines.", pieces: ["Japan has", "a large number of", "vending machines."] },
            { sentenceJa: "すぐに物を買うことができ、24時間利用できるため便利です。", answer: "They are useful because people can buy things quickly and they are available 24 hours a day.", pieces: ["They are useful", "because people can buy things quickly", "and they are available", "24 hours a day."] },
            { sentenceJa: "しかし、多くの電力を使うため環境に悪影響を与える可能性があります。", answer: "However, they use a lot of electricity and may have a negative effect on the environment.", pieces: ["However,", "they use a lot of electricity", "and may have", "a negative effect", "on the environment."] }
        ],
        paraphrases: [
            { original: "Japan is famous for having a large number of", summary: "Japan has a large number of" },
            { original: "without waiting in line", summary: "(省略)" },
            { original: "This means they can have a negative effect on the environment because of the energy they consume", summary: "may have a negative effect on the environment" }
        ]
    },

    {
        id: 12,
        title: "フードロス",
        titleEn: "Food Waste",
        exam: "類題",
        passage: {
            intro: "Food waste is a serious problem in many countries today. Every year, a large amount of food is thrown away by supermarkets, restaurants, and households.",
            merit: "Some companies are trying to reduce food waste by selling products at lower prices before they expire. This is beneficial because it helps people save money and reduces the amount of food that goes to waste.",
            demerit: "However, it is difficult to completely solve this problem. Many people still buy more food than they need because of sales and large package sizes, and they end up throwing some of it away."
        },
        passageJa: {
            intro: "フードロスは今日、多くの国で深刻な問題です。毎年、大量の食品がスーパー、レストラン、家庭から捨てられています。",
            merit: "一部の企業は賞味期限が近い商品を安く売ることでフードロスを減らそうとしています。これにより人々はお金を節約でき、廃棄される食品の量も減るため有益です。",
            demerit: "しかし、この問題を完全に解決することは難しいです。多くの人がセールや大容量パッケージのために必要以上の食品を買ってしまい、一部を捨ててしまいます。"
        },
        modelAnswer: "Food waste is a serious problem in many countries. Some companies are trying to reduce it by selling products cheaply before they expire, which helps people save money. However, many people still buy more food than they need and throw some away.",
        modelAnswerJa: "フードロスは多くの国で深刻な問題です。一部の企業は賞味期限前に安く売ることで削減しようとしており、人々の節約にもなります。しかし、多くの人が必要以上に買ってしまい、一部を捨ててしまいます。",
        fillBlanks: {
            template: "Food waste is a [_1_] problem in many countries. Some companies are trying to [_2_] it by selling products cheaply before they expire, which helps people save [_3_]. [_4_], many people still buy more food than they [_5_] and throw some away.",
            blanks: [
                { id: 1, answer: "serious", options: ["serious", "small", "funny", "simple"] },
                { id: 2, answer: "reduce", options: ["reduce", "increase", "cause", "ignore"] },
                { id: 3, answer: "money", options: ["money", "time", "energy", "space"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "need", options: ["need", "cook", "like", "grow"] }
            ]
        },
        chunks: [
            { sentenceJa: "フードロスは多くの国で深刻な問題です。", answer: "Food waste is a serious problem in many countries.", pieces: ["Food waste", "is a serious problem", "in many countries."] },
            { sentenceJa: "一部の企業は賞味期限前に安く売ることで削減しようとしており、人々の節約にもなります。", answer: "Some companies are trying to reduce it by selling products cheaply before they expire, which helps people save money.", pieces: ["Some companies are trying", "to reduce it", "by selling products cheaply", "before they expire,", "which helps people save money."] },
            { sentenceJa: "しかし、多くの人が必要以上に買ってしまい一部を捨ててしまいます。", answer: "However, many people still buy more food than they need and throw some away.", pieces: ["However,", "many people still buy", "more food than they need", "and throw some away."] }
        ],
        paraphrases: [
            { original: "a large amount of food is thrown away by supermarkets, restaurants, and households", summary: "(省略)" },
            { original: "selling products at lower prices", summary: "selling products cheaply" },
            { original: "because of sales and large package sizes, and they end up throwing some of it away", summary: "throw some away" }
        ]
    },

    {
        id: 13,
        title: "ボランティア活動",
        titleEn: "Volunteer Activities",
        exam: "類題",
        passage: {
            intro: "Volunteer activities are done by many people in communities across the country. People of all ages participate in activities such as cleaning parks, helping at events, or visiting elderly people.",
            merit: "Volunteering is valuable because it helps people develop a sense of responsibility and learn new skills. Volunteers often say that they feel happy and satisfied after helping others.",
            demerit: "However, some volunteers feel too much pressure when they are asked to do things regularly. If volunteering becomes an obligation, people may lose their interest in it."
        },
        passageJa: {
            intro: "ボランティア活動は全国の地域社会で多くの人々によって行われています。公園の清掃、イベントの手伝い、お年寄りの訪問など、あらゆる年齢の人々が参加しています。",
            merit: "ボランティアは責任感を育み、新しいスキルを学べるため価値があります。ボランティアの人々は他の人を助けた後に幸せで満足感を感じると言います。",
            demerit: "しかし、定期的に活動を求められると、プレッシャーを感じるボランティアもいます。ボランティアが義務になると、興味を失ってしまうかもしれません。"
        },
        modelAnswer: "Volunteer activities are done by many people in communities. Volunteering is valuable because it helps people develop responsibility and learn new skills. However, if volunteering becomes an obligation, people may lose their interest in it.",
        modelAnswerJa: "ボランティア活動は地域社会で多くの人々によって行われています。責任感を育み新しいスキルを学べるため価値があります。しかし、ボランティアが義務になると、興味を失ってしまうかもしれません。",
        fillBlanks: {
            template: "Volunteer activities are done by many people in [_1_]. Volunteering is [_2_] because it helps people develop [_3_] and learn new skills. [_4_], if volunteering becomes an [_5_], people may lose their interest in it.",
            blanks: [
                { id: 1, answer: "communities", options: ["communities", "companies", "countries", "classrooms"] },
                { id: 2, answer: "valuable", options: ["valuable", "dangerous", "expensive", "boring"] },
                { id: 3, answer: "responsibility", options: ["responsibility", "muscles", "wealth", "appetite"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "obligation", options: ["obligation", "adventure", "opportunity", "entertainment"] }
            ]
        },
        chunks: [
            { sentenceJa: "ボランティア活動は地域社会で多くの人々によって行われています。", answer: "Volunteer activities are done by many people in communities.", pieces: ["Volunteer activities", "are done by many people", "in communities."] },
            { sentenceJa: "責任感を育み新しいスキルを学べるため価値があります。", answer: "Volunteering is valuable because it helps people develop responsibility and learn new skills.", pieces: ["Volunteering is valuable", "because it helps people", "develop responsibility", "and learn new skills."] },
            { sentenceJa: "しかし、ボランティアが義務になると興味を失ってしまうかもしれません。", answer: "However, if volunteering becomes an obligation, people may lose their interest in it.", pieces: ["However,", "if volunteering becomes", "an obligation,", "people may lose", "their interest in it."] }
        ],
        paraphrases: [
            { original: "across the country", summary: "(省略)" },
            { original: "a sense of responsibility", summary: "responsibility" },
            { original: "some volunteers feel too much pressure when they are asked to do things regularly", summary: "if volunteering becomes an obligation" }
        ]
    },

    {
        id: 14,
        title: "自転車通学",
        titleEn: "Cycling to School",
        exam: "類題",
        passage: {
            intro: "Many students in Japan ride bicycles to school every day. Cycling is one of the most common ways for students to get to school, especially in suburban areas.",
            merit: "Cycling to school is good for students because it gives them daily exercise and helps them stay healthy. It is also faster than walking and does not cost any money, unlike taking a bus or train.",
            demerit: "However, cycling can be dangerous in some situations. Students may have accidents if they ride too fast or do not follow traffic rules, especially on busy roads during rush hour."
        },
        passageJa: {
            intro: "日本の多くの生徒が毎日自転車で学校に通っています。特に郊外では、自転車通学は最も一般的な通学方法の一つです。",
            merit: "自転車通学は生徒にとって毎日の運動になり、健康を保つのに役立つので良いです。また、歩くより速く、バスや電車と違ってお金がかかりません。",
            demerit: "しかし、自転車は場合によっては危険なこともあります。スピードを出しすぎたり交通ルールを守らなかったりすると、特にラッシュアワーの混雑した道路で事故に遭う可能性があります。"
        },
        modelAnswer: "Many students in Japan cycle to school every day. It is good for them because it gives them daily exercise and does not cost any money. However, cycling can be dangerous if students do not follow traffic rules on busy roads.",
        modelAnswerJa: "日本の多くの生徒が毎日自転車で通学しています。毎日の運動になり、お金もかからないので良いです。しかし、混雑した道路で交通ルールを守らないと自転車は危険なこともあります。",
        fillBlanks: {
            template: "Many students in Japan [_1_] to school every day. It is good for them because it gives them daily [_2_] and does not cost any [_3_]. [_4_], cycling can be [_5_] if students do not follow traffic rules on busy roads.",
            blanks: [
                { id: 1, answer: "cycle", options: ["cycle", "drive", "fly", "swim"] },
                { id: 2, answer: "exercise", options: ["exercise", "homework", "sleep", "stress"] },
                { id: 3, answer: "money", options: ["money", "time", "effort", "food"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "dangerous", options: ["dangerous", "exciting", "easy", "boring"] }
            ]
        },
        chunks: [
            { sentenceJa: "日本の多くの生徒が毎日自転車で通学しています。", answer: "Many students in Japan cycle to school every day.", pieces: ["Many students in Japan", "cycle to school", "every day."] },
            { sentenceJa: "毎日の運動になり、お金もかからないので良いです。", answer: "It is good for them because it gives them daily exercise and does not cost any money.", pieces: ["It is good for them", "because it gives them daily exercise", "and does not cost", "any money."] },
            { sentenceJa: "しかし、混雑した道路で交通ルールを守らないと危険なこともあります。", answer: "However, cycling can be dangerous if students do not follow traffic rules on busy roads.", pieces: ["However,", "cycling can be dangerous", "if students do not follow", "traffic rules", "on busy roads."] }
        ],
        paraphrases: [
            { original: "ride bicycles to school", summary: "cycle to school" },
            { original: "unlike taking a bus or train", summary: "(省略)" },
            { original: "Students may have accidents if they ride too fast or do not follow traffic rules, especially on busy roads during rush hour", summary: "cycling can be dangerous if students do not follow traffic rules on busy roads" }
        ]
    },

    {
        id: 15,
        title: "学校給食",
        titleEn: "School Lunches",
        exam: "類題",
        passage: {
            intro: "School lunches are provided to students in many elementary and junior high schools in Japan. These meals are carefully planned by nutritionists to give children a balanced diet.",
            merit: "School lunches are beneficial because they teach children about healthy eating habits. Students learn to eat various types of food, including vegetables and fish, which they might not eat at home.",
            demerit: "However, some students do not enjoy school lunches because they cannot choose what to eat. Students who have food allergies also need special attention, and this can sometimes be difficult for schools to manage."
        },
        passageJa: {
            intro: "日本の多くの小中学校で生徒に給食が提供されています。これらの食事は栄養士によってバランスの取れた食事になるよう計画されています。",
            merit: "給食は健康的な食習慣を子どもたちに教えるため有益です。生徒は家では食べないかもしれない野菜や魚など、さまざまな種類の食べ物を食べることを学びます。",
            demerit: "しかし、何を食べるか選べないため給食を楽しめない生徒もいます。食物アレルギーのある生徒には特別な対応が必要であり、学校にとって管理が難しいこともあります。"
        },
        modelAnswer: "School lunches are provided in many schools in Japan. They are beneficial because they teach children about healthy eating habits and various types of food. However, some students cannot choose what to eat, and managing food allergies can be difficult.",
        modelAnswerJa: "給食は日本の多くの学校で提供されています。健康的な食習慣やさまざまな種類の食べ物について子どもたちに教えるため有益です。しかし、何を食べるか選べない生徒もおり、食物アレルギーの管理は難しいこともあります。",
        fillBlanks: {
            template: "School lunches are [_1_] in many schools in Japan. They are beneficial because they teach children about [_2_] eating habits and various types of food. [_3_], some students cannot [_4_] what to eat, and managing food [_5_] can be difficult.",
            blanks: [
                { id: 1, answer: "provided", options: ["provided", "forbidden", "sold", "delivered"] },
                { id: 2, answer: "healthy", options: ["healthy", "fast", "foreign", "sweet"] },
                { id: 3, answer: "However", options: ["However", "Therefore", "Moreover", "For example"] },
                { id: 4, answer: "choose", options: ["choose", "cook", "buy", "grow"] },
                { id: 5, answer: "allergies", options: ["allergies", "prices", "recipes", "colors"] }
            ]
        },
        chunks: [
            { sentenceJa: "給食は日本の多くの学校で提供されています。", answer: "School lunches are provided in many schools in Japan.", pieces: ["School lunches", "are provided", "in many schools", "in Japan."] },
            { sentenceJa: "健康的な食習慣やさまざまな食べ物について教えるため有益です。", answer: "They are beneficial because they teach children about healthy eating habits and various types of food.", pieces: ["They are beneficial", "because they teach children", "about healthy eating habits", "and various types of food."] },
            { sentenceJa: "しかし、何を食べるか選べず、食物アレルギーの管理は難しいこともあります。", answer: "However, some students cannot choose what to eat, and managing food allergies can be difficult.", pieces: ["However,", "some students cannot choose", "what to eat,", "and managing food allergies", "can be difficult."] }
        ],
        paraphrases: [
            { original: "elementary and junior high schools", summary: "many schools" },
            { original: "carefully planned by nutritionists to give children a balanced diet", summary: "(省略)" },
            { original: "Students who have food allergies also need special attention, and this can sometimes be difficult for schools to manage", summary: "managing food allergies can be difficult" }
        ]
    },

    {
        id: 16,
        title: "エコバッグ",
        titleEn: "Eco-Friendly Bags",
        exam: "類題",
        passage: {
            intro: "In Japan, plastic bags are no longer free at most stores since 2020. Many people now carry their own eco-friendly bags when they go shopping.",
            merit: "Using eco-friendly bags is good for the environment because it reduces the amount of plastic waste. When fewer plastic bags are used, less plastic ends up in the oceans and harms sea animals.",
            demerit: "However, some people find it inconvenient to always carry a bag with them. They sometimes forget to bring their bags and have to buy plastic ones at the store, which adds to their expenses."
        },
        passageJa: {
            intro: "日本では2020年からほとんどの店でレジ袋が有料になりました。多くの人が買い物に行くときにエコバッグを持参するようになっています。",
            merit: "エコバッグの使用はプラスチックゴミの量を減らすので環境に良いです。レジ袋の使用が減れば、海に流れ出るプラスチックが減り、海の動物を守ることにつながります。",
            demerit: "しかし、常にバッグを持ち歩くのは不便だと感じる人もいます。バッグを忘れてしまい、店でレジ袋を買わなければならないこともあり、出費が増えます。"
        },
        modelAnswer: "Plastic bags are no longer free at most stores in Japan. Using eco-friendly bags is good because it reduces plastic waste and helps protect sea animals. However, some people find it inconvenient to always carry a bag with them.",
        modelAnswerJa: "日本のほとんどの店でレジ袋は有料です。エコバッグの使用はプラスチックゴミを減らし、海の動物を守るのに役立つので良いです。しかし、常にバッグを持ち歩くのは不便だと感じる人もいます。",
        fillBlanks: {
            template: "Plastic bags are no longer [_1_] at most stores in Japan. Using eco-friendly bags is good because it reduces plastic [_2_] and helps protect sea [_3_]. [_4_], some people find it [_5_] to always carry a bag with them.",
            blanks: [
                { id: 1, answer: "free", options: ["free", "available", "popular", "useful"] },
                { id: 2, answer: "waste", options: ["waste", "bags", "cups", "food"] },
                { id: 3, answer: "animals", options: ["animals", "plants", "ships", "islands"] },
                { id: 4, answer: "However", options: ["However", "Therefore", "For example", "In addition"] },
                { id: 5, answer: "inconvenient", options: ["inconvenient", "exciting", "expensive", "dangerous"] }
            ]
        },
        chunks: [
            { sentenceJa: "日本のほとんどの店でレジ袋は有料です。", answer: "Plastic bags are no longer free at most stores in Japan.", pieces: ["Plastic bags", "are no longer free", "at most stores", "in Japan."] },
            { sentenceJa: "プラスチックゴミを減らし海の動物を守るのに役立つので良いです。", answer: "Using eco-friendly bags is good because it reduces plastic waste and helps protect sea animals.", pieces: ["Using eco-friendly bags is good", "because it reduces plastic waste", "and helps protect", "sea animals."] },
            { sentenceJa: "しかし、常にバッグを持ち歩くのは不便だと感じる人もいます。", answer: "However, some people find it inconvenient to always carry a bag with them.", pieces: ["However,", "some people find it inconvenient", "to always carry a bag", "with them."] }
        ],
        paraphrases: [
            { original: "since 2020", summary: "(省略)" },
            { original: "less plastic ends up in the oceans and harms sea animals", summary: "helps protect sea animals" },
            { original: "They sometimes forget to bring their bags and have to buy plastic ones", summary: "(省略)" }
        ]
    }
];

// 要約の3文構造テンプレート解説
const SUMMARY_STRUCTURE = {
    sentence1: {
        label: "第1文：導入",
        labelEn: "Sentence 1: Introduction",
        color: "#60a5fa",
        description: "テーマの紹介（何について話しているか）",
        template: "[テーマ] is/are [状況説明].",
        examples: [
            "Group projects are a common activity in many schools.",
            "Social media is very common today.",
            "Camping has become very popular among people of all ages.",
            "People often discuss the use of mobile phones by students at school.",
            "More people are using AI in everyday life.",
            "Many countries have various historic buildings."
        ]
    },
    sentence2: {
        label: "第2文：メリット",
        labelEn: "Sentence 2: Benefit",
        color: "#34d399",
        description: "良い点・利点（because で理由をつなげる）",
        template: "It/They is/are [good/helpful/valuable/beneficial] because [メリット].",
        examples: [
            "They are beneficial because students can develop teamwork and cooperation skills.",
            "It enables people to learn about important events quickly because information travels fast online.",
            "It is good to experience nature and take a break from daily life.",
            "Mobile phones are useful because students can easily contact someone in an emergency.",
            "It is helpful because it gives us quick answers or solutions.",
            "They are valuable because they develop the local economy."
        ]
    },
    sentence3: {
        label: "第3文：デメリット",
        labelEn: "Sentence 3: Problem",
        color: "#fb923c",
        description: "問題点・デメリット（However で転換）",
        template: "However, [問題点/懸念点].",
        examples: [
            "However, if some members do not complete their share, others feel that it is unfair.",
            "However, people may believe incorrect things since anyone can post wrong information without checking it.",
            "However, they need to be careful of injuries when handling camping equipment.",
            "However, students may lose focus during self-study or in class.",
            "However, we may lose the habit of thinking for ourselves if we always depend on it.",
            "However, it may become difficult to adapt to the demands of modern life and technology, such as installing barrier-free facilities."
        ]
    }
};
