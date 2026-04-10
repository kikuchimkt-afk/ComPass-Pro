// ComPass Pro — 2級 大問4（英文要約）データ
// 語数設定: 45〜55語

const WRITEPASS_CONFIG = {
    minWords: 45,
    maxWords: 55,
    timerMinutes: 15,
    gradeLabel: '2級',
    taskLabel: '英文要約（大問4）',
    gradeId: 'grade_2',
    taskType: 'Summary'
};

const THEMES = [
    // ===== 2024-1 =====
    {
        id: 1,
        title: "オンライン授業",
        titleEn: "Online Classes",
        exam: "2024-1",
        passage: {
            intro: "When students go to university, they usually go to the campus and take classes in classrooms with other students. However, there are other types of classes for students to take. Some of them take online classes from home without going to the campus.",
            merit: "What are some benefits of this? Online classes are helpful for students living far away from the campus because they do not need to travel for long periods of time. Moreover, in the case of recorded online classes, students can watch recorded classes over and over again so that they can understand the classes better.",
            demerit: "However, some students may have problems with their computers or their Internet connection during online classes. This can make it difficult to take the classes smoothly. Also, if students do not go to the campus, they will have fewer chances to see each other face-to-face and talk to other students. Because of this, some students may feel lonely."
        },
        passageJa: {
            intro: "大学に通う学生は通常、キャンパスに行き、他の学生と一緒に教室で授業を受けます。しかし、他の種類の授業もあります。一部の学生はキャンパスに行かずに自宅からオンライン授業を受けています。",
            merit: "これにはどのような利点があるでしょうか？オンライン授業は、キャンパスから遠くに住む学生にとって、長時間通学する必要がないため便利です。さらに、録画されたオンライン授業の場合、学生は授業をより理解するために何度も見返すことができます。",
            demerit: "しかし、オンライン授業中にコンピューターやインターネット接続に問題が生じる学生もいます。これにより、スムーズに授業を受けることが難しくなることがあります。また、キャンパスに行かないと、学生同士が直接会って話す機会が減ります。このため、孤独を感じる学生もいるかもしれません。"
        },
        modelAnswer: "Some university students choose to take online classes instead of going to campus. This is beneficial because students far from campus can save travel time, and they can review recorded lectures repeatedly. However, technical problems may disrupt classes, and students who stay home may feel isolated due to fewer opportunities for face-to-face interaction.",
        modelAnswerJa: "一部の大学生はキャンパスに行く代わりにオンライン授業を選んでいます。キャンパスから遠い学生は通学時間を節約でき、録画された講義を繰り返し見返せるため有益です。しかし、技術的な問題が授業を妨げる可能性があり、自宅にいる学生は対面交流の機会が減るため孤立感を感じることがあります。",
        fillBlanks: {
            template: "Some university students [_1_] to take online classes instead of going to campus. This is [_2_] because students far from campus can save travel time, and they can [_3_] recorded lectures repeatedly. However, [_4_] problems may disrupt classes, and students may feel [_5_] due to fewer face-to-face interactions.",
            blanks: [
                { id: 1, answer: "choose", options: ["choose", "refuse", "forget", "promise"] },
                { id: 2, answer: "beneficial", options: ["beneficial", "dangerous", "unusual", "expensive"] },
                { id: 3, answer: "review", options: ["review", "ignore", "skip", "memorize"] },
                { id: 4, answer: "technical", options: ["technical", "financial", "social", "physical"] },
                { id: 5, answer: "isolated", options: ["isolated", "excited", "confused", "relaxed"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "一部の大学生はキャンパスに行く代わりにオンライン授業を選んでいる。",
                literalJa: "一部の大学生は / 選ぶ / オンライン授業を受けることを / 〜の代わりに / キャンパスに行くことの",
                answer: "Some university students choose to take online classes instead of going to campus.",
                pieces: ["Some university students", "choose to take", "online classes", "instead of", "going to campus."]
            },
            {
                sentenceJa: "キャンパスから遠い学生は通学時間を節約でき、録画講義を繰り返し見返せる。",
                literalJa: "学生たちは / キャンパスから遠い / 節約できる / 通学時間を / そして彼らは / 見直すことができる / 録画された講義を / 繰り返し",
                answer: "Students far from campus can save travel time, and they can review recorded lectures repeatedly.",
                pieces: ["Students far from campus", "can save travel time,", "and they can", "review recorded lectures", "repeatedly."]
            },
            {
                sentenceJa: "しかし技術的な問題が授業を妨げ、対面交流の減少で孤立を感じることがある。",
                literalJa: "しかしながら / 技術的な問題が / 妨げるかもしれない / 授業を / そして / 生徒たちは / 孤立を感じるかもしれない / ～のために / より少ない対面の交流の",
                answer: "However, technical problems may disrupt classes, and students may feel isolated due to fewer face-to-face interactions.",
                pieces: ["However,", "technical problems", "may disrupt classes,", "and students may feel", "isolated due to", "fewer face-to-face interactions."]
            }
        ],
        paraphrases: [
            { original: "take classes in classrooms", summary: "going to campus", originalJa: "教室で授業を受ける", summaryJa: "キャンパスに行く" },
            { original: "living far away from the campus", summary: "far from campus", originalJa: "キャンパスから遠くに住む", summaryJa: "キャンパスから遠い" },
            { original: "do not need to travel for long periods", summary: "save travel time", originalJa: "長時間通う必要がない", summaryJa: "通学時間を節約する" },
            { original: "watch recorded classes over and over again", summary: "review recorded lectures repeatedly", originalJa: "録画された授業を何度も見る", summaryJa: "録画講義を繰り返し見返す" },
            { original: "problems with their computers or their Internet connection", summary: "technical problems", originalJa: "コンピューターやネット接続の問題", summaryJa: "技術的な問題" },
            { original: "fewer chances to see each other face-to-face", summary: "fewer face-to-face interactions", originalJa: "直接会う機会が減る", summaryJa: "対面交流が少なくなる" },
            { original: "feel lonely", summary: "feel isolated", originalJa: "孤独を感じる", summaryJa: "孤立を感じる" }
        ]
    },

    // ===== 2024-2 =====
    {
        id: 2,
        title: "インターンシップ",
        titleEn: "Internships",
        exam: "2024-2",
        passage: {
            intro: "University students often plan for their future careers by attending job fairs or searching online for information about different kinds of work opportunities. There are other ways, too. Some of them choose to join short-term work programs at companies called internships.",
            merit: "These have some good points. Students will be able to know more about companies they are interested in, such as what kind of jobs there are and what kind of people are working there. Also, internships allow students to get to know other students. These students can encourage each other both during and after the internship.",
            demerit: "On the other hand, if students choose to join very short internships, they may not be able to understand the job they are doing before the internships end. Also, students who take part in internships may find it difficult to do well in their studies."
        },
        passageJa: {
            intro: "大学生は就職説明会に参加したり、さまざまな仕事の機会についてオンラインで情報を検索したりして、将来のキャリアを計画することがよくあります。他の方法もあります。一部の学生はインターンシップと呼ばれる企業での短期就業プログラムに参加することを選びます。",
            merit: "これにはいくつかの良い点があります。学生は関心のある企業について、どのような仕事があるか、どのような人が働いているかなどをより詳しく知ることができます。また、インターンシップにより他の学生と知り合うことができます。これらの学生はインターンシップ中もその後も互いに励まし合うことができます。",
            demerit: "一方で、非常に短期のインターンシップに参加すると、インターンシップが終わる前に仕事を理解できない可能性があります。また、インターンシップに参加する学生は学業で良い成績を収めることが難しくなるかもしれません。"
        },
        modelAnswer: "Some university students participate in internships to explore career options. These programs help students learn about companies and build connections with fellow interns who can support each other. However, short internships may not provide enough time to fully understand the work, and balancing internships with academic responsibilities can be challenging.",
        modelAnswerJa: "一部の大学生はキャリアの選択肢を探るためにインターンシップに参加しています。これらのプログラムは学生が企業について学び、互いに支え合える仲間とのつながりを築くのに役立ちます。しかし、短期インターンシップでは仕事を十分に理解する時間がなく、インターンシップと学業の両立が難しいこともあります。",
        fillBlanks: {
            template: "Some university students [_1_] in internships to explore career options. These programs help students learn about [_2_] and build connections with fellow interns. However, short internships may not provide enough time to fully [_3_] the work, and [_4_] internships with academic responsibilities can be [_5_].",
            blanks: [
                { id: 1, answer: "participate", options: ["participate", "invest", "compete", "interfere"] },
                { id: 2, answer: "companies", options: ["companies", "textbooks", "hobbies", "languages"] },
                { id: 3, answer: "understand", options: ["understand", "ignore", "avoid", "criticize"] },
                { id: 4, answer: "balancing", options: ["balancing", "replacing", "postponing", "canceling"] },
                { id: 5, answer: "challenging", options: ["challenging", "entertaining", "unnecessary", "simple"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "一部の大学生はキャリアの選択肢を探るためにインターンシップに参加している。",
                answer: "Some university students participate in internships to explore career options.",
                pieces: ["Some university students", "participate in internships", "to explore", "career options."]
            },
            {
                sentenceJa: "これらのプログラムは企業について学び、互いに支え合える仲間とつながりを築くのに役立つ。",
                answer: "These programs help students learn about companies and build connections with fellow interns who can support each other.",
                pieces: ["These programs", "help students learn", "about companies", "and build connections", "with fellow interns", "who can support each other."]
            },
            {
                sentenceJa: "しかし短期インターンシップでは仕事を十分に理解できず、学業との両立も難しい。",
                answer: "However, short internships may not provide enough time to fully understand the work, and balancing internships with studies can be challenging.",
                pieces: ["However,", "short internships", "may not provide enough time", "to fully understand the work,", "and balancing internships", "with studies can be challenging."]
            }
        ],
        paraphrases: [
            { original: "join short-term work programs", summary: "participate in internships", originalJa: "短期就業プログラムに参加する", summaryJa: "インターンシップに参加する" },
            { original: "plan for their future careers", summary: "explore career options", originalJa: "将来のキャリアを計画する", summaryJa: "キャリアの選択肢を探る" },
            { original: "know more about companies", summary: "learn about companies", originalJa: "企業についてもっと知る", summaryJa: "企業について学ぶ" },
            { original: "get to know other students", summary: "build connections with fellow interns", originalJa: "他の学生と知り合いになる", summaryJa: "仲間とのつながりを作る" },
            { original: "encourage each other", summary: "support each other", originalJa: "互いに励まし合う", summaryJa: "互いに支え合う" },
            { original: "not be able to understand the job", summary: "not provide enough time to fully understand", originalJa: "仕事を理解できない", summaryJa: "十分に理解する時間がない" },
            { original: "find it difficult to do well in their studies", summary: "balancing with studies can be challenging", originalJa: "学業で良い成績を取るのが難しい", summaryJa: "学業との両立が難しい" }
        ]
    },

    // ===== 2024-3 =====
    {
        id: 3,
        title: "海外就職",
        titleEn: "Working Abroad",
        exam: "2024-3",
        passage: {
            intro: "When people look for a job, some choose a workplace that is close to where they live, while others move to a new town or city in Japan. There are other choices, too. Some of them decide to go to other countries to work.",
            merit: "What are the reasons for this? They can have experiences that they cannot have in their own countries while working abroad. Also, they can learn a local language by using it not only at work but also at other times. This can help their future career as well.",
            demerit: "On the other hand, people have to face issues with differences in customs at work. It can take a long time to get used to the new work environment if things are very different from their own countries. Also, people cannot easily visit their family and friends back home. This can cause them to feel lonely."
        },
        passageJa: {
            intro: "仕事を探すとき、自宅近くの職場を選ぶ人もいれば、日本国内の別の町や都市に引っ越す人もいます。他の選択肢もあります。海外に行って働くことを決める人もいます。",
            merit: "その理由は何でしょうか？海外で働くことで、自国では得られない経験ができます。また、職場だけでなく日常生活でも現地の言語を使うことで、その言語を習得できます。これは将来のキャリアにも役立ちます。",
            demerit: "一方で、職場での習慣の違いに直面しなければなりません。自国と大きく異なる場合、新しい職場環境に慣れるのに時間がかかることがあります。また、母国の家族や友人を簡単に訪ねることができず、孤独を感じることがあります。"
        },
        modelAnswer: "Some people choose to work in foreign countries. This allows them to gain unique experiences and improve their language skills, which can benefit their careers. However, adapting to different workplace customs can take considerable time, and being far from family and friends may lead to feelings of loneliness.",
        modelAnswerJa: "海外で働くことを選ぶ人もいます。これにより独自の経験を積み、語学力を向上させることができ、キャリアにも有益です。しかし、異なる職場の習慣に適応するのにかなりの時間がかかることがあり、家族や友人から離れることで孤独を感じることもあります。",
        fillBlanks: {
            template: "Some people choose to work in [_1_] countries. This allows them to gain unique [_2_] and improve their language skills, which can benefit their [_3_]. However, [_4_] to different workplace customs can take considerable time, and being far from family may lead to [_5_].",
            blanks: [
                { id: 1, answer: "foreign", options: ["foreign", "neighboring", "domestic", "rural"] },
                { id: 2, answer: "experiences", options: ["experiences", "products", "problems", "textbooks"] },
                { id: 3, answer: "careers", options: ["careers", "hobbies", "vacations", "relationships"] },
                { id: 4, answer: "adapting", options: ["adapting", "contributing", "objecting", "returning"] },
                { id: 5, answer: "loneliness", options: ["loneliness", "excitement", "confidence", "satisfaction"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "海外で働くことを選ぶ人もいる。",
                answer: "Some people choose to work in foreign countries.",
                pieces: ["Some people", "choose to work", "in foreign countries."]
            },
            {
                sentenceJa: "独自の経験を積み語学力を向上させることができ、キャリアにも有益である。",
                answer: "This allows them to gain unique experiences and improve their language skills, which can benefit their careers.",
                pieces: ["This allows them", "to gain unique experiences", "and improve", "their language skills,", "which can benefit", "their careers."]
            },
            {
                sentenceJa: "しかし異なる職場習慣への適応に時間がかかり、家族から離れて孤独を感じることがある。",
                answer: "However, adapting to different workplace customs can take considerable time, and being far from family may lead to loneliness.",
                pieces: ["However,", "adapting to", "different workplace customs", "can take considerable time,", "and being far from family", "may lead to loneliness."]
            }
        ],
        paraphrases: [
            { original: "go to other countries to work", summary: "work in foreign countries", originalJa: "他の国に行って働く", summaryJa: "外国で働く" },
            { original: "have experiences that they cannot have in their own countries", summary: "gain unique experiences", originalJa: "自国では得られない経験をする", summaryJa: "独自の経験を積む" },
            { original: "learn a local language", summary: "improve their language skills", originalJa: "現地の言語を学ぶ", summaryJa: "語学力を向上させる" },
            { original: "help their future career", summary: "benefit their careers", originalJa: "将来のキャリアに役立つ", summaryJa: "キャリアに有益" },
            { original: "face issues with differences in customs", summary: "adapting to different workplace customs", originalJa: "習慣の違いに直面する", summaryJa: "異なる職場習慣に適応する" },
            { original: "take a long time to get used to", summary: "take considerable time", originalJa: "慣れるのに時間がかかる", summaryJa: "かなりの時間がかかる" },
            { original: "feel lonely", summary: "lead to loneliness", originalJa: "孤独を感じる", summaryJa: "孤独につながる" }
        ]
    },

    // ===== 2025-1 =====
    {
        id: 4,
        title: "若者のSNS利用",
        titleEn: "Social Media Communication",
        exam: "2025-1",
        passage: {
            intro: "As technology improves, ways to communicate have become more diverse. Nowadays, social media plays a significant role in our daily lives. Especially among young people, it has become a popular way to communicate with others.",
            merit: "Why do so many young people like it? One reason is that social media helps them feel connected to other people. They can chat with friends anytime, and share messages, pictures, or videos. Social media also helps them learn new things. They can find new ideas from people outside their local community.",
            demerit: "However, there are some problems. It can affect mental health. Some young people start to feel like they are not good enough when they compare themselves to others on social media. Moreover, if young people share too much personal information online or talk to strangers, they might end up in dangerous situations. They have to be aware of these risks when using social media."
        },
        passageJa: {
            intro: "技術の進歩に伴い、コミュニケーションの方法がより多様化しています。現在、SNSは私たちの日常生活で重要な役割を果たしています。特に若者の間では、他者とコミュニケーションをとる人気のある方法となっています。",
            merit: "なぜこれほど多くの若者がSNSを好むのでしょうか？一つの理由は、SNSが他の人とのつながりを感じさせてくれることです。いつでも友人とチャットでき、メッセージや写真、動画を共有できます。SNSは新しいことを学ぶのにも役立ちます。地元のコミュニティ以外の人から新しいアイデアを見つけることができます。",
            demerit: "しかし、いくつかの問題もあります。精神的な健康に影響を与える可能性があります。SNSで他の人と自分を比較し、自分は十分ではないと感じ始める若者もいます。さらに、個人情報を過度に公開したり見知らぬ人と話したりすると、危険な状況に陥る可能性があります。SNSを使用する際にはこれらのリスクに注意する必要があります。"
        },
        modelAnswer: "Social media has become a popular communication tool among young people. It helps them stay connected with friends and discover new ideas beyond their communities. However, comparing themselves to others online can negatively affect their mental health, and sharing personal information or interacting with strangers may put them at risk.",
        modelAnswerJa: "SNSは若者に人気のコミュニケーションツールとなっています。友人とつながりを保ち、コミュニティを超えた新しいアイデアを発見するのに役立ちます。しかし、オンラインで他者と自分を比較することは精神的健康に悪影響を及ぼす可能性があり、個人情報の共有や見知らぬ人とのやり取りはリスクを伴います。",
        fillBlanks: {
            template: "Social media has become a popular [_1_] tool among young people. It helps them stay [_2_] with friends and discover new ideas beyond their communities. However, [_3_] themselves to others online can negatively affect their mental health, and sharing [_4_] information may put them at [_5_].",
            blanks: [
                { id: 1, answer: "communication", options: ["communication", "transportation", "education", "construction"] },
                { id: 2, answer: "connected", options: ["connected", "separated", "confused", "bored"] },
                { id: 3, answer: "comparing", options: ["comparing", "introducing", "connecting", "helping"] },
                { id: 4, answer: "personal", options: ["personal", "scientific", "historical", "professional"] },
                { id: 5, answer: "risk", options: ["risk", "ease", "peace", "rest"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "SNSは若者に人気のコミュニケーションツールとなっている。",
                answer: "Social media has become a popular communication tool among young people.",
                pieces: ["Social media", "has become", "a popular communication tool", "among young people."]
            },
            {
                sentenceJa: "友人とつながりを保ち、コミュニティを超えた新しいアイデアを発見するのに役立つ。",
                answer: "It helps them stay connected with friends and discover new ideas beyond their communities.",
                pieces: ["It helps them", "stay connected with friends", "and discover new ideas", "beyond their communities."]
            },
            {
                sentenceJa: "しかし他者との比較は精神的健康に悪影響を与え、個人情報の共有はリスクを伴う。",
                answer: "However, comparing themselves to others can negatively affect their mental health, and sharing personal information may put them at risk.",
                pieces: ["However,", "comparing themselves to others", "can negatively affect", "their mental health,", "and sharing personal information", "may put them at risk."]
            }
        ],
        paraphrases: [
            { original: "a popular way to communicate", summary: "a popular communication tool", originalJa: "人気のあるコミュニケーション方法", summaryJa: "人気のコミュニケーションツール" },
            { original: "feel connected to other people", summary: "stay connected with friends", originalJa: "他の人とのつながりを感じる", summaryJa: "友人とつながりを保つ" },
            { original: "find new ideas from people outside their local community", summary: "discover new ideas beyond their communities", originalJa: "地元以外の人から新しいアイデアを見つける", summaryJa: "コミュニティを超えた新しいアイデアを発見する" },
            { original: "feel like they are not good enough when they compare themselves", summary: "comparing themselves to others can negatively affect mental health", originalJa: "他人と比べて自分は十分でないと感じる", summaryJa: "他者との比較が精神的健康に悪影響を与える" },
            { original: "share too much personal information", summary: "sharing personal information", originalJa: "個人情報を過度に公開する", summaryJa: "個人情報を共有する" },
            { original: "end up in dangerous situations", summary: "put them at risk", originalJa: "危険な状況に陥る", summaryJa: "リスクにさらす" }
        ]
    },

    // ===== 2025-2 =====
    {
        id: 5,
        title: "過剰包装の削減",
        titleEn: "Reducing Wrapping Materials",
        exam: "2025-2",
        passage: {
            intro: "Nowadays, consumers have become increasingly concerned about various environmental issues across different industries. Within these trends, reducing wrapping materials has attracted particular attention. Recently, more businesses have begun adopting this policy.",
            merit: "What are the benefits of this? Reducing wrapping materials significantly lowers the overall environmental impact. Fewer wrapping materials mean less waste is created and fewer natural resources are consumed. Additionally, decreasing wrapping materials can ease the financial burden on producers. It leads to lower production costs and allows companies to offer their products at more reasonable prices to consumers.",
            demerit: "However, reducing wrapping materials does have some drawbacks. Products could suffer quality issues because wrapping materials help protect them from damage during transportation. Moreover, reducing the amount of wrapping paper may result in consumers having to pay for wrapping when buying gifts and other items. Thus, some people find this annoying and inconvenient."
        },
        passageJa: {
            intro: "現在、消費者はさまざまな産業における環境問題にますます関心を持つようになっています。こうした動きの中で、包装材の削減が特に注目を集めています。最近では、この方針を採用する企業が増えています。",
            merit: "これにはどのような利点があるでしょうか？包装材を減らすことで環境への影響が大幅に低下します。包装材が少なければ廃棄物が減り、天然資源の消費も減ります。さらに、包装材を減らすことで生産者の経済的負担を軽減できます。生産コストの削減につながり、企業がより手頃な価格で製品を消費者に提供できるようになります。",
            demerit: "しかし、包装材の削減にはいくつかの欠点もあります。包装材は輸送中の損傷から製品を守る役割があるため、品質の問題が生じる可能性があります。さらに、包装紙の量を減らすと、贈り物などを購入する際に消費者が包装代を支払わなければならなくなることがあります。そのため、面倒で不便だと感じる人もいます。"
        },
        modelAnswer: "More businesses are reducing wrapping materials to address environmental concerns. This approach decreases waste and resource consumption while lowering production costs, enabling more affordable products. However, less packaging may lead to product damage during shipping, and consumers may face extra charges for gift wrapping, which some find inconvenient.",
        modelAnswerJa: "環境問題に対処するため、より多くの企業が包装材を削減しています。このアプローチは廃棄物と資源消費を減らし、生産コストを下げることで、より手頃な製品を可能にします。しかし、包装が少なくなると輸送中に製品が損傷する可能性があり、消費者はギフト包装の追加料金に直面し、不便と感じる人もいます。",
        fillBlanks: {
            template: "More businesses are [_1_] wrapping materials to address environmental concerns. This approach decreases waste and resource [_2_] while lowering production costs, enabling more [_3_] products. However, less packaging may lead to product [_4_] during shipping, and consumers may face extra charges for gift wrapping, which some find [_5_].",
            blanks: [
                { id: 1, answer: "reducing", options: ["reducing", "increasing", "importing", "recycling"] },
                { id: 2, answer: "consumption", options: ["consumption", "production", "transportation", "education"] },
                { id: 3, answer: "affordable", options: ["affordable", "expensive", "complicated", "fashionable"] },
                { id: 4, answer: "damage", options: ["damage", "growth", "improvement", "popularity"] },
                { id: 5, answer: "inconvenient", options: ["inconvenient", "interesting", "exciting", "impressive"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "より多くの企業が環境問題に対処するため包装材を削減している。",
                answer: "More businesses are reducing wrapping materials to address environmental concerns.",
                pieces: ["More businesses", "are reducing", "wrapping materials", "to address", "environmental concerns."]
            },
            {
                sentenceJa: "廃棄物と資源消費を減らし、生産コスト削減でより手頃な製品を可能にする。",
                answer: "This decreases waste and resource consumption while lowering production costs, enabling more affordable products.",
                pieces: ["This decreases waste", "and resource consumption", "while lowering", "production costs,", "enabling more", "affordable products."]
            },
            {
                sentenceJa: "しかし包装が少ないと輸送中に損傷の恐れがあり、ギフト包装の追加料金も不便である。",
                answer: "However, less packaging may lead to product damage during shipping, and extra charges for gift wrapping can be inconvenient.",
                pieces: ["However,", "less packaging", "may lead to product damage", "during shipping,", "and extra charges", "for gift wrapping", "can be inconvenient."]
            }
        ],
        paraphrases: [
            { original: "attracted particular attention", summary: "address environmental concerns", originalJa: "特に注目を集めた", summaryJa: "環境問題に対処する" },
            { original: "less waste is created and fewer natural resources are consumed", summary: "decreases waste and resource consumption", originalJa: "廃棄物が減り天然資源の消費も減る", summaryJa: "廃棄物と資源消費を減少させる" },
            { original: "ease the financial burden on producers", summary: "lowering production costs", originalJa: "生産者の経済的負担を軽減する", summaryJa: "生産コストを下げる" },
            { original: "offer their products at more reasonable prices", summary: "enabling more affordable products", originalJa: "より手頃な価格で製品を提供する", summaryJa: "より手頃な製品を可能にする" },
            { original: "suffer quality issues ... damage during transportation", summary: "product damage during shipping", originalJa: "品質の問題…輸送中の損傷", summaryJa: "輸送中の製品損傷" },
            { original: "having to pay for wrapping", summary: "extra charges for gift wrapping", originalJa: "包装代を支払わなければならない", summaryJa: "ギフト包装の追加料金" },
            { original: "annoying and inconvenient", summary: "inconvenient", originalJa: "面倒で不便", summaryJa: "不便" }
        ]
    },

    // ===== 2025-3 =====
    {
        id: 6,
        title: "カスタマーレビュー",
        titleEn: "Customer Reviews",
        exam: "2025-3",
        passage: {
            intro: "Many years ago, when people often wanted to buy a new product, they often asked their friends or family for personal advice. Nowadays, there are other sources of information available, such as customer reviews on the Internet. Many people choose to read such reviews before making a purchase.",
            merit: "What are some advantages of this? Customer reviews give people useful information to make better choices. For example, a review can tell a buyer if an item's size is not normal. Also, reviews offer companies chances to improve their products. Business owners can realize what customers expect by reading the feedback.",
            demerit: "On the other hand, there are some problems. Some customer reviews are not real. This makes it difficult for people to know which reviews to trust. Furthermore, negative comments can hurt businesses. This often happens especially when a small business receives too many of them. Unhappy people write such comments while happy people usually stay quiet."
        },
        passageJa: {
            intro: "昔は、新しい製品を購入したいとき、友人や家族に直接アドバイスを求めることが多くありました。現在では、インターネット上のカスタマーレビューなど、他の情報源も利用できます。多くの人が購入前にそのようなレビューを読むことを選んでいます。",
            merit: "これにはどのような利点があるでしょうか？カスタマーレビューはより良い選択をするための有用な情報を提供します。例えば、レビューにより商品のサイズが通常と異なることを知ることができます。また、レビューは企業に製品を改善する機会を与えます。経営者はフィードバックを読むことで顧客の期待を理解できます。",
            demerit: "一方で、いくつかの問題もあります。一部のカスタマーレビューは本物ではありません。そのため、どのレビューを信頼してよいか判断が難しくなります。さらに、否定的なコメントは企業に悪影響を与えることがあります。特に中小企業が多くの否定的コメントを受けた場合にこれが起こりやすいです。不満を持つ人はそのようなコメントを書く一方、満足している人は通常黙っています。"
        },
        modelAnswer: "Many people now rely on online customer reviews instead of asking friends for advice before purchasing products. These reviews provide valuable information for better buying decisions and help companies understand customer expectations. However, some reviews are unreliable, and excessive negative feedback can disproportionately harm small businesses since satisfied customers rarely leave comments.",
        modelAnswerJa: "現在、多くの人が購入前に友人にアドバイスを求める代わりに、オンラインのカスタマーレビューに頼っています。これらのレビューはより良い購入判断のための貴重な情報を提供し、企業が顧客の期待を理解するのに役立ちます。しかし、一部のレビューは信頼できず、過度な否定的フィードバックは中小企業に不釣り合いな損害を与えることがあります。満足している顧客はめったにコメントを残さないためです。",
        fillBlanks: {
            template: "Many people now [_1_] on online customer reviews instead of asking friends before purchasing. These reviews provide [_2_] information for better buying decisions and help companies [_3_] customer expectations. However, some reviews are [_4_], and excessive negative feedback can [_5_] harm small businesses.",
            blanks: [
                { id: 1, answer: "rely", options: ["rely", "give up", "complain", "hesitate"] },
                { id: 2, answer: "valuable", options: ["valuable", "incorrect", "outdated", "limited"] },
                { id: 3, answer: "understand", options: ["understand", "ignore", "lower", "restrict"] },
                { id: 4, answer: "unreliable", options: ["unreliable", "professional", "detailed", "expensive"] },
                { id: 5, answer: "disproportionately", options: ["disproportionately", "slightly", "rarely", "positively"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "多くの人が購入前に友人に聞く代わりにオンラインレビューに頼っている。",
                answer: "Many people now rely on online customer reviews instead of asking friends before purchasing products.",
                pieces: ["Many people now", "rely on", "online customer reviews", "instead of asking friends", "before purchasing products."]
            },
            {
                sentenceJa: "レビューはより良い購入判断のための情報を提供し、企業が顧客の期待を理解するのに役立つ。",
                answer: "These reviews provide valuable information for better buying decisions and help companies understand customer expectations.",
                pieces: ["These reviews provide", "valuable information", "for better buying decisions", "and help companies", "understand customer expectations."]
            },
            {
                sentenceJa: "しかし一部のレビューは信頼できず、過度な否定的フィードバックは中小企業に悪影響を与える。",
                answer: "However, some reviews are unreliable, and excessive negative feedback can disproportionately harm small businesses.",
                pieces: ["However,", "some reviews are unreliable,", "and excessive", "negative feedback", "can disproportionately harm", "small businesses."]
            }
        ],
        paraphrases: [
            { original: "asked their friends or family for personal advice", summary: "asking friends", originalJa: "友人や家族にアドバイスを求めた", summaryJa: "友人に聞く" },
            { original: "choose to read such reviews before making a purchase", summary: "rely on online customer reviews before purchasing", originalJa: "購入前にレビューを読むことを選ぶ", summaryJa: "購入前にオンラインレビューに頼る" },
            { original: "useful information to make better choices", summary: "valuable information for better buying decisions", originalJa: "より良い選択をするための有用な情報", summaryJa: "より良い購入判断のための貴重な情報" },
            { original: "realize what customers expect by reading the feedback", summary: "understand customer expectations", originalJa: "フィードバックを読んで顧客の期待を理解する", summaryJa: "顧客の期待を理解する" },
            { original: "not real", summary: "unreliable", originalJa: "本物ではない", summaryJa: "信頼できない" },
            { original: "negative comments can hurt businesses", summary: "negative feedback can disproportionately harm small businesses", originalJa: "否定的コメントが企業に悪影響を与える", summaryJa: "否定的フィードバックが中小企業に不釣り合いな損害を与える" },
            { original: "happy people usually stay quiet", summary: "satisfied customers rarely leave comments", originalJa: "満足した人は通常黙っている", summaryJa: "満足した顧客はめったにコメントしない" }
        ]
    }
];
