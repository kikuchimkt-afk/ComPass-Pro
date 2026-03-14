// ComPass Pro — 準1級 大問4（英文要約）データ
// 語数設定: 60〜70語

const WRITEPASS_CONFIG = {
    minWords: 60,
    maxWords: 70,
    timerMinutes: 20,
    gradeLabel: '準1級',
    taskLabel: '英文要約（大問4）',
    gradeId: 'grade_pre1',
    taskType: 'Summary'
};

const THEMES = [
    // ===== 2024-1 =====
    {
        id: 1,
        title: "無料給食プログラム",
        titleEn: "Free School Lunches",
        exam: "2024-1",
        passage: {
            intro: "Schools in some countries have often supplied free lunch to a limited number of their students. These meals tend to include a variety of foods, including salads and desserts. Nowadays, there are programs that provide such lunches to all students. Many in favor of the programs want them to continue.",
            merit: "Supporters point to the benefits. Studies show a relationship between nutrition and how well students do in school. Therefore, providing a healthy meal for all students is important. Doing this can improve their concentration levels, leading to better test scores. Additionally, free school meal programs have another advantage. Many parents today are often extremely busy, giving them little time to prepare lunches for their children. The programs, therefore, are a huge help. This is because parents of all students will be able to spend more time on work and other child-raising issues.",
            demerit: "Critics, on the other hand, say that providing school meals for everyone is problematic. Schools need to prepare enough meals every day for all students. However, some students do not completely eat the food that has been prepared. Consequently, a large amount is left over. The schools have no option but to throw it away."
        },
        passageJa: {
            intro: "いくつかの国の学校では、限られた数の生徒に無料の昼食を提供してきました。これらの食事にはサラダやデザートなど、さまざまな食品が含まれる傾向があります。現在では、すべての生徒にそのような昼食を提供するプログラムがあります。プログラム支持者の多くは、継続を望んでいます。",
            merit: "支持者は利点を指摘します。研究によると、栄養と生徒の学業成績には関連があります。したがって、すべての生徒に健康的な食事を提供することは重要です。そうすることで集中力が向上し、テストの成績が良くなります。さらに、無料給食プログラムにはもう一つの利点があります。今日の多くの保護者は非常に忙しく、子供のお弁当を準備する時間がほとんどありません。そのため、このプログラムは大きな助けになります。",
            demerit: "一方、批判者は全生徒への給食提供は問題があると述べています。学校は毎日全生徒分の食事を準備する必要があります。しかし、一部の生徒は用意された食事を完全には食べません。結果として、大量の食べ残しが出ます。学校はそれを捨てるしかありません。"
        },
        modelAnswer: "Some countries now offer free school lunches to all students, and many people support these programs. Proponents argue that nutritious meals help students concentrate better and achieve higher test scores. They also help busy parents by saving time spent on meal preparation. However, opponents point out that not all students finish their meals, resulting in significant food waste that schools must dispose of.",
        modelAnswerJa: "一部の国ではすべての生徒に無料給食を提供しており、多くの人がこのプログラムを支持しています。賛成派は、栄養のある食事が生徒の集中力向上と成績改善に役立つと主張しています。また、食事準備の時間を節約することで忙しい保護者を助けます。しかし、反対派は、すべての生徒が食事を完食するわけではなく、学校が処分しなければならない大量の食品廃棄につながると指摘しています。",
        fillBlanks: {
            template: "Some countries now [_1_] free school lunches to all students, and many people support these programs. Proponents argue that [_2_] meals help students [_3_] better and achieve higher test scores. They also help busy parents by saving time spent on meal [_4_]. [_5_], opponents point out that not all students finish their meals, resulting in significant food waste.",
            blanks: [
                { id: 1, answer: "offer", options: ["offer", "reject", "ban", "limit"] },
                { id: 2, answer: "nutritious", options: ["nutritious", "expensive", "frozen", "imported"] },
                { id: 3, answer: "concentrate", options: ["concentrate", "compete", "communicate", "cooperate"] },
                { id: 4, answer: "preparation", options: ["preparation", "production", "preservation", "protection"] },
                { id: 5, answer: "However", options: ["However", "Therefore", "For example", "In addition"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "一部の国はすべての生徒に無料給食を提供しており、多くの人がプログラムを支持している。",
                answer: "Some countries now offer free school lunches to all students, and many people support these programs.",
                pieces: ["Some countries", "now offer", "free school lunches", "to all students,", "and many people", "support these programs."]
            },
            {
                sentenceJa: "賛成派は、栄養のある食事が生徒の集中力向上と成績改善に役立つと主張している。",
                answer: "Proponents argue that nutritious meals help students concentrate better and achieve higher test scores.",
                pieces: ["Proponents argue that", "nutritious meals", "help students", "concentrate better", "and achieve", "higher test scores."]
            },
            {
                sentenceJa: "また忙しい保護者が食事準備の時間を節約するのにも役立つ。",
                answer: "They also help busy parents by saving time spent on meal preparation.",
                pieces: ["They also", "help busy parents", "by saving time", "spent on", "meal preparation."]
            },
            {
                sentenceJa: "しかし反対派は、すべての生徒が完食するわけではなく、大量の食品廃棄が生じると指摘する。",
                answer: "However, opponents point out that not all students finish their meals, resulting in significant food waste.",
                pieces: ["However,", "opponents point out that", "not all students", "finish their meals,", "resulting in", "significant food waste."]
            }
        ],
        paraphrases: [
            { original: "supplied free lunch", summary: "offer free school lunches" },
            { original: "how well students do in school", summary: "achieve higher test scores" },
            { original: "improve their concentration levels", summary: "help students concentrate better" },
            { original: "extremely busy, giving them little time to prepare lunches", summary: "help busy parents by saving time spent on meal preparation" },
            { original: "do not completely eat the food", summary: "not all students finish their meals" },
            { original: "throw it away", summary: "significant food waste" }
        ]
    },

    // ===== 2024-2 =====
    {
        id: 2,
        title: "民間宇宙開発への政府資金",
        titleEn: "Private Space Exploration",
        exam: "2024-2",
        passage: {
            intro: "Government agencies in the United States have long used public funds to explore space. This has led to projects being carried out in space that collect important scientific data. Some people, however, feel that private businesses should also explore space. To make this possible, they want the government to provide such companies with money.",
            merit: "Supporters claim this would benefit the public. With government funds, private companies can create new technology to explore space. This technology could then be used in other useful ways. For example, it could lead to high-quality goods that average people can buy. There is also another advantage. Government agencies are often slow at researching space technology. However, this could change if private companies were also given money to explore space. More scientists would be working together. This would mean discoveries being made faster.",
            demerit: "Despite this, critics are concerned. When space exploration first began, laws were created to make sure space and other planets stayed open to everyone. However, they have not been updated, and it is unclear if private companies must follow them. This could become a problem. For instance, a company could build a moon base and say the land is theirs."
        },
        passageJa: {
            intro: "アメリカの政府機関は長年、公的資金を使って宇宙探査を行ってきました。これにより、重要な科学データを収集する宇宙プロジェクトが実施されてきました。しかし、民間企業も宇宙探査を行うべきだと考える人もいます。これを可能にするため、政府がそのような企業に資金を提供することを望んでいます。",
            merit: "支持者は、これが公共の利益になると主張しています。政府の資金があれば、民間企業は宇宙探査のための新技術を開発できます。この技術は他の有益な方法にも使用できます。例えば、一般の人が購入できる高品質な製品につながる可能性があります。もう一つの利点もあります。政府機関は宇宙技術の研究において往々にして遅いです。しかし、民間企業にも宇宙探査の資金が与えられれば、より多くの科学者が協力し合い、発見がより速くなされます。",
            demerit: "それにもかかわらず、批判者は懸念しています。宇宙探査が始まった当初、宇宙が全員に開放されたままであることを確認するための法律が作られました。しかし、これらは更新されておらず、民間企業がこれに従わなければならないかは不明です。例えば、企業が月面基地を建設し、その土地は自分たちのものだと主張する可能性があります。"
        },
        modelAnswer: "The U.S. government has used public money for space exploration, but some believe private companies should also receive government funding for this purpose. Supporters say this could lead to new technologies that benefit everyday consumers and speed up scientific discoveries through increased collaboration. However, critics worry that existing space laws are outdated and may not apply to private companies, potentially allowing them to claim ownership of areas in space.",
        modelAnswerJa: "米国政府は公的資金を宇宙探査に使用してきましたが、民間企業もこの目的のために政府資金を受け取るべきだと考える人もいます。支持者は、日常の消費者に有益な新技術が生まれ、協力の増加により科学的発見が加速すると述べています。しかし、批判者は、既存の宇宙法が時代遅れであり民間企業に適用されない可能性があり、宇宙の所有権を主張できるようになることを懸念しています。",
        fillBlanks: {
            template: "The U.S. government has used public money for space [_1_], but some believe private companies should also receive funding. Supporters say this could lead to new [_2_] that benefit everyday consumers and [_3_] scientific discoveries. However, critics worry that existing space laws are [_4_] and may allow companies to claim [_5_] of areas in space.",
            blanks: [
                { id: 1, answer: "exploration", options: ["exploration", "education", "expansion", "evaluation"] },
                { id: 2, answer: "technologies", options: ["technologies", "industries", "resources", "policies"] },
                { id: 3, answer: "speed up", options: ["speed up", "slow down", "prevent", "limit"] },
                { id: 4, answer: "outdated", options: ["outdated", "unclear", "unfair", "unnecessary"] },
                { id: 5, answer: "ownership", options: ["ownership", "control", "access", "management"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "米国政府は宇宙探査に公的資金を使ってきたが、民間企業も資金を受け取るべきだと考える人がいる。",
                answer: "The U.S. government has used public money for space exploration, but some believe private companies should also receive government funding.",
                pieces: ["The U.S. government", "has used public money", "for space exploration,", "but some believe", "private companies", "should also receive", "government funding."]
            },
            {
                sentenceJa: "これにより日常の消費者に有益な新技術が生まれ、科学的発見が加速する。",
                answer: "Supporters say this could lead to new technologies that benefit everyday consumers and speed up scientific discoveries.",
                pieces: ["Supporters say", "this could lead to", "new technologies", "that benefit", "everyday consumers", "and speed up", "scientific discoveries."]
            },
            {
                sentenceJa: "しかし既存の宇宙法は時代遅れで、企業が宇宙の所有権を主張できるようになる恐れがある。",
                answer: "However, critics worry that existing space laws are outdated and may allow companies to claim ownership of areas in space.",
                pieces: ["However,", "critics worry that", "existing space laws", "are outdated", "and may allow", "companies to claim", "ownership of", "areas in space."]
            }
        ],
        paraphrases: [
            { original: "have long used public funds to explore space", summary: "has used public money for space exploration" },
            { original: "create new technology to explore space", summary: "lead to new technologies" },
            { original: "high-quality goods that average people can buy", summary: "benefit everyday consumers" },
            { original: "discoveries being made faster", summary: "speed up scientific discoveries" },
            { original: "laws ... have not been updated", summary: "existing space laws are outdated" },
            { original: "build a moon base and say the land is theirs", summary: "claim ownership of areas in space" }
        ]
    },

    // ===== 2024-3 =====
    {
        id: 3,
        title: "太陽放射管理（SRM）",
        titleEn: "Solar Radiation Modification",
        exam: "2024-3",
        passage: {
            intro: "Many scientists believe global warming could negatively impact ocean levels, agricultural production, and plant and animal species. Efforts to address global warming, such as promoting renewable energy, are ongoing, and people are often interested in new ways to achieve this goal. One such idea, called solar radiation modification (SRM), is attracting attention. It works by reflecting sunlight away from Earth.",
            merit: "Supporters believe the technique could be positive. A study has suggested that hot temperatures can harm the economic growth of warmer countries. In fact, industries such as agriculture and tourism in such countries are already being seriously affected. However, SRM could reduce temperatures quickly. This would provide necessary help to affected industries.",
            demerit: "Despite this, there are some issues around SRM. It often involves spraying chemicals into the atmosphere. There has been little research on its use. Some people worry that it could change weather patterns or harm plants and animals. Also, critics of SRM point out that it only lowers temperatures. Unfortunately, coal and oil continue to be used globally. In addition to being a major factor in increasing temperatures, CO2 emissions from these fuels also negatively affect the environment in other ways, including pollution. However, SRM cannot solve such problems."
        },
        passageJa: {
            intro: "多くの科学者は、地球温暖化が海面、農業生産、動植物に悪影響を及ぼす可能性があると考えています。再生可能エネルギーの促進など、地球温暖化に対処する取り組みは進行中であり、人々はこの目標を達成する新しい方法にしばしば関心を持っています。太陽放射管理（SRM）と呼ばれるアイデアが注目を集めています。太陽光を地球から反射させることで機能します。",
            merit: "支持者はこの技術がプラスになりうると考えています。ある研究は、高温が温暖な国の経済成長を損なう可能性があることを示唆しています。実際、そうした国の農業や観光業はすでに深刻な影響を受けています。しかし、SRMは気温を素早く下げることができます。これは影響を受けている産業に必要な支援を提供するでしょう。",
            demerit: "しかし、SRMにはいくつかの問題があります。大気中に化学物質を散布することが多く、その使用に関する研究はほとんどありません。気象パターンを変えたり、動植物に害を与える可能性が心配されています。また、SRMは気温を下げるだけだと批判者は指摘します。残念ながら、石炭と石油は世界的に使われ続けています。気温上昇の主要因であることに加え、これらの燃料からのCO2排出は汚染を含む他の方法でも環境に悪影響を及ぼします。しかし、SRMはそのような問題を解決できません。"
        },
        modelAnswer: "A technique called SRM, which works by blocking solar rays from reaching Earth, is drawing interest as a potential solution to climate change. Proponents claim it could rapidly cool down warmer nations, benefiting sectors such as farming and travel that are currently struggling. Nevertheless, opponents raise several issues: releasing substances into the sky may disrupt climate patterns and damage wildlife. Moreover, SRM merely tackles heat and fails to address broader ecological damage from burning coal and oil, including air contamination.",
        modelAnswerJa: "太陽の光線が地球に届くのを遮る技術であるSRMは、気候変動への潜在的解決策として関心を集めています。支持者は、温暖な国を急速に冷やし、現在苦しんでいる農業や旅行などの分野に恩恵をもたらすと主張しています。しかし反対派はいくつかの問題を提起しています。大気中に物質を放出すると気候パターンが乱れ、野生生物が損なわれる可能性があります。さらにSRMは熱に対処するだけで、石炭・石油の燃焼による大気汚染など広範な生態系への悪影響には対処できません。",
        fillBlanks: {
            template: "A technique called SRM, which works by [_1_] solar rays from reaching Earth, is drawing interest. Proponents claim it could rapidly [_2_] warmer nations, benefiting sectors such as farming. Nevertheless, opponents say releasing [_3_] into the sky may disrupt climate patterns. Moreover, SRM merely tackles heat and fails to address broader [_4_] damage from burning [_5_] and oil.",
            blanks: [
                { id: 1, answer: "blocking", options: ["blocking", "absorbing", "collecting", "measuring"] },
                { id: 2, answer: "cool down", options: ["cool down", "warm up", "clean up", "speed up"] },
                { id: 3, answer: "substances", options: ["substances", "satellites", "signals", "sensors"] },
                { id: 4, answer: "ecological", options: ["ecological", "economic", "political", "cultural"] },
                { id: 5, answer: "coal", options: ["coal", "wood", "solar", "wind"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "太陽の光線を遮る技術SRMは、気候変動への潜在的解決策として関心を集めている。",
                answer: "A technique called SRM, which works by blocking solar rays from reaching Earth, is drawing interest as a potential solution to climate change.",
                pieces: ["A technique called SRM,", "which works by", "blocking solar rays", "from reaching Earth,", "is drawing interest", "as a potential solution", "to climate change."]
            },
            {
                sentenceJa: "支持者は、温暖な国を急速に冷やし、現在苦しんでいる農業や旅行の分野に恩恵をもたらすと主張する。",
                answer: "Proponents claim it could rapidly cool down warmer nations, benefiting sectors such as farming and travel that are currently struggling.",
                pieces: ["Proponents claim", "it could rapidly", "cool down", "warmer nations,", "benefiting sectors", "such as farming and travel", "that are currently struggling."]
            },
            {
                sentenceJa: "しかし大気中に物質を放出すると気候パターンが乱れ、野生生物が損なわれる可能性がある。",
                answer: "Nevertheless, opponents raise issues: releasing substances into the sky may disrupt climate patterns and damage wildlife.",
                pieces: ["Nevertheless,", "opponents raise issues:", "releasing substances", "into the sky", "may disrupt", "climate patterns", "and damage wildlife."]
            },
            {
                sentenceJa: "さらにSRMは熱に対処するだけで、石炭・石油の燃焼による大気汚染など広範な被害には対処できない。",
                answer: "Moreover, SRM merely tackles heat and fails to address broader ecological damage from burning coal and oil, including air contamination.",
                pieces: ["Moreover,", "SRM merely tackles heat", "and fails to address", "broader ecological damage", "from burning", "coal and oil,", "including air contamination."]
            }
        ],
        paraphrases: [
            { original: "reflecting sunlight away from Earth", summary: "blocking solar rays from reaching Earth" },
            { original: "harm the economic growth of warmer countries", summary: "cool down warmer nations" },
            { original: "industries such as agriculture and tourism", summary: "sectors such as farming and travel" },
            { original: "are already being seriously affected", summary: "currently struggling" },
            { original: "spraying chemicals into the atmosphere", summary: "releasing substances into the sky" },
            { original: "change weather patterns or harm plants and animals", summary: "disrupt climate patterns and damage wildlife" },
            { original: "it only lowers temperatures", summary: "SRM merely tackles heat" },
            { original: "coal and oil continue to be used globally", summary: "burning coal and oil" },
            { original: "negatively affect the environment ... including pollution", summary: "broader ecological damage ... air contamination" }
        ]
    },

    // ===== 2025-1 =====
    {
        id: 4,
        title: "地域暖房",
        titleEn: "District Heating",
        exam: "2025-1",
        passage: {
            intro: "Most homes and businesses have their own individual heating systems. However, there are more and more communities using what is known as \"district heating.\" The special feature of this system is that a central energy source is connected to buildings around it using underground pipes. Those buildings can all be heated together at once using this system. Now, the use of this type of heating is increasing around the world.",
            merit: "District heating supporters say that it is a good thing. When many buildings share the same heat source, less heat is needed than when heating buildings separately. If less energy is used for heating, there will be less CO2 released into the air. This reduces global warming effects. There is another benefit of district heating. Heaters sometimes break down, which causes trouble for residents. However, district heating systems are regularly checked and kept in good condition. This makes them more reliable. They are unlikely to stop working suddenly.",
            demerit: "Despite this, critics point out a problem. Creating new district heating systems involves placing lots of underground pipes, which requires workers to dig deep into the ground. However, doing this in areas that already have buildings is a lot of work. Therefore, construction in such places needs a large amount of money."
        },
        passageJa: {
            intro: "ほとんどの家庭や企業には、独自の暖房システムがあります。しかし、「地域暖房」として知られるシステムを使用するコミュニティが増えています。このシステムの特徴は、中央エネルギー源が地下パイプを使って周辺の建物に接続されていることです。現在、この種の暖房の使用は世界中で増加しています。",
            merit: "支持者は良いことだと言います。多くの建物が同じ熱源を共有すると、個別に暖房する場合よりも少ない熱で済みます。暖房に使用するエネルギーが少なければ、CO2排出も少なくなります。地域暖房にはもう一つの利点があります。暖房器具は時に故障しますが、地域暖房システムは定期的に点検され、良好な状態に維持されています。突然動作を停止する可能性は低いです。",
            demerit: "しかし、批判者は問題を指摘しています。新しい地域暖房システムの構築には大量の地下パイプの敷設が必要で、地面を深く掘る必要があります。すでに建物がある地域でこれを行うのは大変な作業で、多額の費用が必要です。"
        },
        modelAnswer: "District heating, which connects multiple buildings to a central heat source through underground pipes, is becoming more popular worldwide. Supporters highlight two main benefits: it reduces CO2 emissions by using less energy than individual systems, and it is more reliable because the systems are regularly maintained. However, critics argue that installing underground pipes in existing urban areas requires extensive construction work and is extremely expensive.",
        modelAnswerJa: "地下パイプを通じて複数の建物を中央熱源に接続する地域暖房は、世界中で人気が高まっています。支持者は2つの主な利点を強調しています：個別のシステムよりも少ないエネルギーでCO2排出量を削減でき、定期的にメンテナンスされるため信頼性が高いことです。しかし、批判者は、既存の都市部に地下パイプを設置するには大規模な建設工事が必要で、非常に高額であると主張しています。",
        fillBlanks: {
            template: "District heating connects multiple buildings to a central heat source through underground [_1_]. Supporters say it [_2_] CO2 emissions by using less energy. It is also more [_3_] because the systems are regularly [_4_]. However, critics argue that installing pipes in existing areas is extremely [_5_].",
            blanks: [
                { id: 1, answer: "pipes", options: ["pipes", "wires", "cables", "tunnels"] },
                { id: 2, answer: "reduces", options: ["reduces", "increases", "measures", "produces"] },
                { id: 3, answer: "reliable", options: ["reliable", "expensive", "dangerous", "complex"] },
                { id: 4, answer: "maintained", options: ["maintained", "replaced", "upgraded", "ignored"] },
                { id: 5, answer: "expensive", options: ["expensive", "simple", "popular", "common"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "地域暖房は地下パイプで複数の建物を中央熱源に接続し、世界中で人気が高まっている。",
                answer: "District heating, which connects multiple buildings to a central heat source through underground pipes, is becoming more popular worldwide.",
                pieces: ["District heating,", "which connects", "multiple buildings", "to a central heat source", "through underground pipes,", "is becoming", "more popular worldwide."]
            },
            {
                sentenceJa: "支持者は、個別システムより少ないエネルギーでCO2排出を削減できると言う。",
                answer: "Supporters highlight that it reduces CO2 emissions by using less energy than individual systems.",
                pieces: ["Supporters highlight that", "it reduces", "CO2 emissions", "by using less energy", "than individual systems."]
            },
            {
                sentenceJa: "また定期的にメンテナンスされるため、より信頼性が高い。",
                answer: "It is also more reliable because the systems are regularly maintained.",
                pieces: ["It is also", "more reliable", "because the systems", "are regularly", "maintained."]
            },
            {
                sentenceJa: "しかし既存の都市部でのパイプ設置は大規模な工事が必要で非常に高額である。",
                answer: "However, critics argue that installing underground pipes in existing urban areas requires extensive construction and is extremely expensive.",
                pieces: ["However,", "critics argue that", "installing underground pipes", "in existing urban areas", "requires extensive construction", "and is extremely expensive."]
            }
        ],
        paraphrases: [
            { original: "a central energy source is connected to buildings", summary: "connects multiple buildings to a central heat source" },
            { original: "less heat is needed", summary: "using less energy" },
            { original: "less CO2 released into the air", summary: "reduces CO2 emissions" },
            { original: "regularly checked and kept in good condition", summary: "regularly maintained" },
            { original: "doing this in areas that already have buildings is a lot of work", summary: "requires extensive construction" },
            { original: "needs a large amount of money", summary: "extremely expensive" }
        ]
    },

    // ===== 2025-2 =====
    {
        id: 5,
        title: "焼畑禁止法",
        titleEn: "Stubble Burning Ban",
        exam: "2025-2",
        passage: {
            intro: "Some crops, such as rice and wheat, are harvested by cutting off the top of the plant. When farmers gather such crops, they leave the bottom part in the ground. This part is called stubble. Farmers need space to plant their next crops, so some of them burn the stubble. Now, some countries want to make a law that stops farmers from doing this.",
            merit: "Supporters of the law believe it is important. People's health will be protected. This is because when stubble is burned, smoke containing harmful chemicals is released. It can travel long distances, so the law would benefit the health of both rural and urban populations. There is another advantage to stopping stubble burning. The quality of soil on farms can be maintained. There are small organisms, such as bacteria, in the soil that make crops grow more easily. When stubble is burned, the ground becomes extremely hot, which kills these organisms. This will not happen if stubble burning is banned.",
            demerit: "However, opponents of the law are worried. Removing stubble from fields can be very difficult. Without fire, farmers need to buy specialized mechanical equipment to get rid of it. This equipment often costs a lot, so it is impossible for many farmers to afford."
        },
        passageJa: {
            intro: "米や小麦などの作物は、植物の上部を切り取って収穫されます。農家がそのような作物を収穫する際、下の部分を地面に残します。この部分は切り株（スタブル）と呼ばれます。農家は次の作物を植えるスペースが必要なため、一部の農家はスタブルを燃やします。現在、一部の国では農家がこれを禁止する法律を制定しようとしています。",
            merit: "法律の支持者は重要だと考えています。スタブルを燃やすと有害な化学物質を含む煙が放出されます。煙は長距離を移動するため、法律は農村部と都市部の両方の住民の健康に恩恵をもたらします。もう一つの利点は農地の土壌の質を維持できることです。土壌中には作物を成長させる細菌などの小さな生物がいますが、焼却すると地面が熱くなりこれらが死滅します。",
            demerit: "しかし反対派は心配しています。畑からスタブルを除去するのは非常に困難です。火を使わずに除去するには専門的な機械設備が必要ですが、これは高額で多くの農家には購入できません。"
        },
        modelAnswer: "After harvesting crops like rice and wheat, some farmers burn the remaining stubble to prepare for the next planting season. Some countries are considering banning this practice. Supporters say the law would protect people's health by reducing harmful smoke and preserve soil quality by preventing the destruction of beneficial organisms. However, opponents argue that farmers would need costly specialized equipment to remove stubble without burning, which many cannot afford.",
        modelAnswerJa: "米や小麦などの作物を収穫した後、一部の農家は次の植え付けに備えてスタブルを燃やします。一部の国ではこの禁止を検討しています。支持者は、有害な煙を減らし有益な生物の破壊を防ぐことで健康と土壌の質を守ると述べています。しかし反対派は、焼かずにスタブルを除去するには高価な専門機器が必要で多くの農家には購入できないと主張しています。",
        fillBlanks: {
            template: "After [_1_] crops like rice and wheat, some farmers burn the remaining stubble. Supporters say the law would protect people's health by reducing harmful [_2_] and preserve soil [_3_] by preventing the destruction of beneficial [_4_]. However, opponents argue that farmers would need costly [_5_] equipment to remove stubble.",
            blanks: [
                { id: 1, answer: "harvesting", options: ["harvesting", "planting", "watering", "selling"] },
                { id: 2, answer: "smoke", options: ["smoke", "noise", "waste", "dust"] },
                { id: 3, answer: "quality", options: ["quality", "color", "size", "price"] },
                { id: 4, answer: "organisms", options: ["organisms", "minerals", "chemicals", "structures"] },
                { id: 5, answer: "specialized", options: ["specialized", "traditional", "simple", "imported"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "米や小麦の収穫後、一部の農家は次の植え付けに備えてスタブルを燃やす。",
                answer: "After harvesting crops like rice and wheat, some farmers burn the remaining stubble to prepare for the next planting season.",
                pieces: ["After harvesting crops", "like rice and wheat,", "some farmers", "burn the remaining stubble", "to prepare for", "the next planting season."]
            },
            {
                sentenceJa: "支持者は有害な煙を減らし有益な生物の破壊を防ぐことで健康と土壌を守ると言う。",
                answer: "Supporters say the law would protect people's health by reducing harmful smoke and preserve soil quality by preventing the destruction of beneficial organisms.",
                pieces: ["Supporters say", "the law would", "protect people's health", "by reducing harmful smoke", "and preserve soil quality", "by preventing the destruction", "of beneficial organisms."]
            },
            {
                sentenceJa: "しかし反対派は、農家には高額な専門機器が必要で多くが購入できないと主張する。",
                answer: "However, opponents argue that farmers would need costly specialized equipment to remove stubble, which many cannot afford.",
                pieces: ["However,", "opponents argue that", "farmers would need", "costly specialized equipment", "to remove stubble,", "which many", "cannot afford."]
            }
        ],
        paraphrases: [
            { original: "cutting off the top of the plant", summary: "harvesting crops" },
            { original: "leave the bottom part in the ground", summary: "remaining stubble" },
            { original: "smoke containing harmful chemicals is released", summary: "reducing harmful smoke" },
            { original: "small organisms such as bacteria", summary: "beneficial organisms" },
            { original: "kills these organisms", summary: "destruction of beneficial organisms" },
            { original: "buy specialized mechanical equipment", summary: "costly specialized equipment" },
            { original: "impossible for many farmers to afford", summary: "many cannot afford" }
        ]
    },

    // ===== 2025-3 =====
    {
        id: 6,
        title: "バイオロガー",
        titleEn: "Biologgers",
        exam: "2025-3",
        passage: {
            intro: "There are many scientists around the world who study animals. One way that they do this is by attaching electronic devices called biologgers to animals. These help scientists gather a variety of data about the animals. Some of this data is related to the animals' body temperature or heart rate. Other important data includes the pollution levels and sounds of the animals' environments.",
            merit: "Supporters say biologgers are beneficial. This is because a wider range of animals can be studied. Some animals live in places that are hard for humans to work in. Other animals are scared of humans and may run away if humans come too close. Biologgers, however, can be used to get data about such animals.",
            demerit: "Nevertheless, critics have concerns. They believe that data from biologgers cannot always be trusted. For instance, if animals have something attached to them, they might feel stressed, which could change how they act. In such cases, the data may not be useful to scientists. There is a second problem with biologgers. Some researchers have found that the size and weight of devices can make it more difficult for animals to do important things. These include finding food or escaping from enemies. This difficulty could result in the animals' early deaths."
        },
        passageJa: {
            intro: "世界中に動物を研究する科学者が多くいます。その方法の一つは、バイオロガーと呼ばれる電子機器を動物に取り付けることです。これにより科学者は動物に関するさまざまなデータを収集できます。体温や心拍数に関するデータや、環境の汚染レベルや音のデータなどです。",
            merit: "支持者はバイオロガーが有益だと言います。より幅広い動物を研究できるからです。一部の動物は人間が作業するのが困難な場所に住んでいます。他の動物は人間を怖がり近づくと逃げます。しかしバイオロガーを使えばそのような動物のデータを取得できます。",
            demerit: "しかし批判者は懸念を抱いています。バイオロガーからのデータは常に信頼できるわけではないと考えています。動物にストレスを与え行動が変わり、データが有用でなくなる可能性があります。また機器のサイズと重量により食べ物を見つけたり敵から逃げたりが困難になり、早死にの原因になりえます。"
        },
        modelAnswer: "Scientists use electronic devices called biologgers to collect data about animals, such as body temperature and environmental conditions. Supporters say these devices are useful because they allow researchers to study animals that live in remote areas or are afraid of humans. However, critics raise two concerns: the devices may cause stress that alters animals' behavior, making the data unreliable, and their size and weight can hinder animals' ability to find food or avoid predators, potentially leading to premature death.",
        modelAnswerJa: "科学者はバイオロガーと呼ばれる電子機器を使用して、体温や環境条件などの動物に関するデータを収集しています。支持者は、遠隔地に住む動物や人間を恐れる動物を研究できるため有用だと言います。しかし批判者は2つの懸念を挙げています：ストレスにより行動が変わりデータが信頼できなくなること、サイズと重量が食料確保や捕食者からの逃避を妨げ早死にの原因となりうることです。",
        fillBlanks: {
            template: "Scientists use electronic [_1_] called biologgers to collect data about animals. Supporters say these are useful because they allow researchers to study animals in [_2_] areas or those afraid of humans. However, critics say the devices may cause [_3_] that alters behavior, and their size can [_4_] animals' ability to find food, potentially leading to [_5_] death.",
            blanks: [
                { id: 1, answer: "devices", options: ["devices", "systems", "methods", "signals"] },
                { id: 2, answer: "remote", options: ["remote", "tropical", "protected", "urban"] },
                { id: 3, answer: "stress", options: ["stress", "pain", "fear", "confusion"] },
                { id: 4, answer: "hinder", options: ["hinder", "improve", "change", "support"] },
                { id: 5, answer: "premature", options: ["premature", "sudden", "natural", "inevitable"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "科学者はバイオロガーという電子機器を使って体温や環境条件などの動物データを収集する。",
                answer: "Scientists use electronic devices called biologgers to collect data about animals, such as body temperature and environmental conditions.",
                pieces: ["Scientists use", "electronic devices", "called biologgers", "to collect data", "about animals,", "such as body temperature", "and environmental conditions."]
            },
            {
                sentenceJa: "これらの機器は遠隔地に住む動物や人間を恐れる動物を研究できるため有用である。",
                answer: "Supporters say these devices are useful because they allow researchers to study animals that live in remote areas or are afraid of humans.",
                pieces: ["Supporters say", "these devices are useful", "because they allow", "researchers to study", "animals that live", "in remote areas", "or are afraid of humans."]
            },
            {
                sentenceJa: "しかし機器がストレスを引き起こし動物の行動を変え、データが信頼できなくなりうる。",
                answer: "However, the devices may cause stress that alters animals' behavior, making the data unreliable.",
                pieces: ["However,", "the devices may", "cause stress", "that alters", "animals' behavior,", "making the data", "unreliable."]
            },
            {
                sentenceJa: "またサイズと重量が食料確保を妨げ、早死にの原因となりうる。",
                answer: "Their size and weight can hinder animals' ability to find food or avoid predators, potentially leading to premature death.",
                pieces: ["Their size and weight", "can hinder", "animals' ability", "to find food", "or avoid predators,", "potentially leading to", "premature death."]
            }
        ],
        paraphrases: [
            { original: "attaching electronic devices called biologgers to animals", summary: "use biologgers to collect data about animals" },
            { original: "places that are hard for humans to work in", summary: "remote areas" },
            { original: "scared of humans and may run away", summary: "afraid of humans" },
            { original: "might feel stressed, which could change how they act", summary: "cause stress that alters animals' behavior" },
            { original: "data may not be useful to scientists", summary: "making the data unreliable" },
            { original: "make it more difficult for animals to do important things", summary: "hinder animals' ability" },
            { original: "finding food or escaping from enemies", summary: "find food or avoid predators" },
            { original: "the animals' early deaths", summary: "premature death" }
        ]
    },

    // ========================================
    // オリジナル類題（5テーマ）
    // ========================================

    // ===== オリジナル 1 =====
    {
        id: 7,
        title: "リモートワークの普及",
        titleEn: "Remote Work Expansion",
        exam: "オリジナル",
        passage: {
            intro: "Advances in technology have changed how people work. In the past, most employees were expected to travel to an office every day. However, recent developments in communication tools and the internet have made it possible for many workers to do their jobs from home. This trend, known as remote work, has spread rapidly around the world.",
            merit: "Supporters of remote work say it has clear advantages. Workers save the time and money they would normally spend getting to and from the office. Without a long commute, employees feel less tired and can focus more on their tasks. Studies have also shown that many remote workers are actually more productive than those who work in a traditional office environment.",
            demerit: "On the other hand, critics point out several drawbacks. When employees work from home, they have fewer chances to interact with their colleagues face to face. This can lead to feelings of loneliness and make teamwork more difficult. Additionally, some workers find it hard to separate their personal life from their professional responsibilities, which may cause them to work longer hours and experience greater stress."
        },
        passageJa: {
            intro: "テクノロジーの進歩により、人々の働き方が変わりました。以前はほとんどの従業員が毎日オフィスに通勤することが求められていました。しかし、通信ツールやインターネットの発展により、多くの労働者が自宅で仕事をすることが可能になりました。リモートワークとして知られるこの傾向は、世界中で急速に広がっています。",
            merit: "支持者はリモートワークには明確な利点があると言います。通勤にかかる時間とお金を節約でき、長い通勤がないため疲れが少なく、仕事により集中できます。研究でも、多くのリモートワーカーは従来のオフィス環境で働く人よりも実際に生産性が高いことが示されています。",
            demerit: "一方、批判者はいくつかの欠点を指摘しています。自宅で働くと同僚と対面でやり取りする機会が減り、孤独感が生じチームワークが困難になる可能性があります。また、私生活と仕事の責任を分けるのが難しく、より長時間働いてストレスが増す可能性があります。"
        },
        modelAnswer: "Thanks to technological progress, an increasing number of professionals now perform their duties from home instead of commuting to a workplace. Advocates highlight that eliminating daily travel conserves both time and money, while enabling staff to concentrate better and boost their output. Nonetheless, opponents warn that reduced in-person contact with coworkers may foster isolation and complicate collaboration. They also note that blurring the boundary between domestic and occupational spheres can extend working hours and intensify pressure.",
        modelAnswerJa: "技術の進歩のおかげで、職場に通勤する代わりに自宅で業務を行う専門職が増えています。推進派は、毎日の移動をなくすことで時間とお金の両方を節約でき、スタッフの集中力と成果を高められると強調しています。それにもかかわらず、反対派は同僚との対面接触の減少が孤立を生み協力を複雑にする可能性があると警告しています。また、家庭と職業の領域の境界があいまいになると、労働時間が延び圧力が強まる可能性があるとも指摘しています。",
        fillBlanks: {
            template: "Thanks to technological progress, more professionals now perform their duties from [_1_] instead of commuting. Advocates highlight that eliminating daily [_2_] conserves time and money. Nonetheless, opponents warn that reduced in-person contact may foster [_3_]. They also note that blurring the boundary between domestic and [_4_] spheres can extend working hours and intensify [_5_].",
            blanks: [
                { id: 1, answer: "home", options: ["home", "abroad", "school", "hospital"] },
                { id: 2, answer: "travel", options: ["travel", "meetings", "exercise", "shopping"] },
                { id: 3, answer: "isolation", options: ["isolation", "competition", "innovation", "efficiency"] },
                { id: 4, answer: "occupational", options: ["occupational", "educational", "recreational", "cultural"] },
                { id: 5, answer: "pressure", options: ["pressure", "curiosity", "motivation", "creativity"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "技術の進歩のおかげで、通勤せず自宅で業務を行う専門職が増えている。",
                answer: "Thanks to technological progress, an increasing number of professionals now perform their duties from home instead of commuting.",
                pieces: ["Thanks to", "technological progress,", "an increasing number of", "professionals now", "perform their duties", "from home", "instead of commuting."]
            },
            {
                sentenceJa: "推進派は、毎日の移動をなくすことで時間とお金を節約し、集中力と成果を高めると強調する。",
                answer: "Advocates highlight that eliminating daily travel conserves both time and money, while enabling staff to concentrate better and boost their output.",
                pieces: ["Advocates highlight that", "eliminating daily travel", "conserves both", "time and money,", "while enabling staff", "to concentrate better", "and boost their output."]
            },
            {
                sentenceJa: "反対派は対面接触の減少が孤立を生み協力を複雑にすると警告する。",
                answer: "Nonetheless, opponents warn that reduced in-person contact with coworkers may foster isolation and complicate collaboration.",
                pieces: ["Nonetheless,", "opponents warn that", "reduced in-person contact", "with coworkers", "may foster isolation", "and complicate", "collaboration."]
            },
            {
                sentenceJa: "家庭と職業の境界があいまいになると、労働時間が延び圧力が強まる。",
                answer: "They also note that blurring the boundary between domestic and occupational spheres can extend working hours and intensify pressure.",
                pieces: ["They also note that", "blurring the boundary", "between domestic", "and occupational spheres", "can extend working hours", "and intensify", "pressure."]
            }
        ],
        paraphrases: [
            { original: "travel to an office every day", summary: "commuting to a workplace", originalJa: "毎日オフィスに通勤する", summaryJa: "職場への通勤" },
            { original: "save the time and money they would normally spend getting to and from the office", summary: "eliminating daily travel conserves both time and money", originalJa: "通勤にかかる時間とお金を節約する", summaryJa: "毎日の移動をなくすことで時間とお金の両方を節約" },
            { original: "more productive", summary: "boost their output", originalJa: "より生産的", summaryJa: "成果を高める" },
            { original: "fewer chances to interact with their colleagues face to face", summary: "reduced in-person contact with coworkers", originalJa: "同僚と対面でやり取りする機会が少ない", summaryJa: "同僚との対面接触の減少" },
            { original: "feelings of loneliness", summary: "foster isolation", originalJa: "孤独感", summaryJa: "孤立を助長する" },
            { original: "make teamwork more difficult", summary: "complicate collaboration", originalJa: "チームワークをより困難にする", summaryJa: "協力を複雑にする" },
            { original: "separate their personal life from their professional responsibilities", summary: "blurring the boundary between domestic and occupational spheres", originalJa: "私生活と仕事の責任を分ける", summaryJa: "家庭と職業の領域の境界をあいまいにする" },
            { original: "work longer hours and experience greater stress", summary: "extend working hours and intensify pressure", originalJa: "より長時間働きストレスが増す", summaryJa: "労働時間を延ばし圧力を強める" }
        ]
    },

    // ===== オリジナル 2 =====
    {
        id: 8,
        title: "教育におけるAIの活用",
        titleEn: "AI in Education",
        exam: "オリジナル",
        passage: {
            intro: "Artificial intelligence, or AI, is being used more and more in education. In the past, teachers were the only source of instruction for students. Now, however, AI-powered tools such as tutoring software and language learning apps are becoming common in classrooms. Many schools are considering how best to use this technology.",
            merit: "Supporters say AI offers significant benefits. AI tutoring programs can identify each student's weak areas and provide personalized exercises to help them improve. Unlike a human teacher who must divide attention among many students, AI can give one-on-one guidance to every learner at the same time. This means students who are struggling can get extra support without falling behind.",
            demerit: "However, there are concerns about relying too heavily on AI in education. Critics argue that machines cannot replace the emotional connection between a teacher and a student. Good teachers inspire and motivate young people in ways that technology cannot. Furthermore, if students spend too much time learning from screens, they may develop weaker social skills because they have fewer opportunities to communicate with classmates and teachers directly."
        },
        passageJa: {
            intro: "人工知能（AI）が教育でますます活用されています。以前は教師が生徒への指導の唯一の供給源でした。しかし現在では、個別指導ソフトウェアや語学学習アプリなどのAI搭載ツールが教室で一般的になりつつあります。多くの学校がこの技術の最善の活用方法を検討しています。",
            merit: "支持者はAIには大きな利点があると言います。AIの個別指導プログラムは各生徒の弱点を特定し、改善するためのパーソナライズされた演習を提供できます。多くの生徒に注意を分散させなければならない人間の教師とは異なり、AIは全ての学習者に同時に一対一の指導を提供できます。",
            demerit: "しかし、教育でAIに頼りすぎることへの懸念があります。批判者は、機械が教師と生徒の間の感情的なつながりに取って代わることはできないと主張しています。良い教師はテクノロジーにはできない方法で若者を鼓舞し動機づけます。さらに、画面からの学習に時間を費やしすぎると、クラスメートや教師と直接コミュニケーションする機会が減り、社会的スキルが弱まる可能性があります。"
        },
        modelAnswer: "AI-driven tools like tutoring software and language apps are increasingly integrated into schools. Proponents argue that such systems can pinpoint individual weaknesses and deliver tailored practice, offering simultaneous one-on-one attention that a single instructor cannot match. Critics counter that automated programs lack the capacity to form meaningful bonds with pupils or ignite their enthusiasm. Moreover, excessive screen-based learning may erode interpersonal abilities by limiting face-to-face interaction among peers.",
        modelAnswerJa: "個別指導ソフトウェアや語学アプリなどのAI駆動ツールが、学校にますます統合されています。賛成派は一人の教員では対応できない同時一対一の注意を提供し、個人の弱点を特定して調整された練習を届けられると主張しています。反対派は自動化されたプログラムには生徒と有意義な絆を形成したり熱意を点火する能力がないと反論しています。さらに、過度な画面ベースの学習は仲間同士の対面交流を制限し対人能力を損なう可能性があります。",
        fillBlanks: {
            template: "AI-driven tools are increasingly [_1_] into schools. Proponents argue such systems can pinpoint individual [_2_] and deliver tailored practice. Critics counter that automated programs lack the capacity to form meaningful [_3_] with pupils. Moreover, excessive screen-based learning may erode [_4_] abilities by limiting face-to-face [_5_] among peers.",
            blanks: [
                { id: 1, answer: "integrated", options: ["integrated", "eliminated", "restricted", "separated"] },
                { id: 2, answer: "weaknesses", options: ["weaknesses", "interests", "talents", "schedules"] },
                { id: 3, answer: "bonds", options: ["bonds", "contracts", "debates", "profits"] },
                { id: 4, answer: "interpersonal", options: ["interpersonal", "mathematical", "physical", "artistic"] },
                { id: 5, answer: "interaction", options: ["interaction", "competition", "examination", "decoration"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "AI駆動のツールが学校にますます統合され、個人の弱点を特定して調整された練習を提供できる。",
                answer: "AI-driven tools are increasingly integrated into schools, and such systems can pinpoint individual weaknesses and deliver tailored practice.",
                pieces: ["AI-driven tools", "are increasingly", "integrated into schools,", "and such systems can", "pinpoint individual weaknesses", "and deliver", "tailored practice."]
            },
            {
                sentenceJa: "一人の教員では対応できない同時一対一の注意を提供できる。",
                answer: "They offer simultaneous one-on-one attention that a single instructor cannot match.",
                pieces: ["They offer", "simultaneous", "one-on-one attention", "that a single instructor", "cannot match."]
            },
            {
                sentenceJa: "反対派は自動化プログラムには生徒との有意義な絆を形成する能力がないと反論する。",
                answer: "Critics counter that automated programs lack the capacity to form meaningful bonds with pupils or ignite their enthusiasm.",
                pieces: ["Critics counter that", "automated programs", "lack the capacity", "to form meaningful bonds", "with pupils", "or ignite", "their enthusiasm."]
            },
            {
                sentenceJa: "過度な画面学習は仲間同士の対面交流を制限し対人能力を損なう可能性がある。",
                answer: "Moreover, excessive screen-based learning may erode interpersonal abilities by limiting face-to-face interaction among peers.",
                pieces: ["Moreover,", "excessive screen-based learning", "may erode", "interpersonal abilities", "by limiting", "face-to-face interaction", "among peers."]
            }
        ],
        paraphrases: [
            { original: "AI-powered tools such as tutoring software and language learning apps", summary: "AI-driven tools like tutoring software and language apps", originalJa: "個別指導ソフトや語学学習アプリなどのAI搭載ツール", summaryJa: "個別指導ソフトや語学アプリなどのAI駆動ツール" },
            { original: "identify each student's weak areas", summary: "pinpoint individual weaknesses", originalJa: "各生徒の弱点を特定する", summaryJa: "個人の弱点を正確に指摘する" },
            { original: "provide personalized exercises", summary: "deliver tailored practice", originalJa: "パーソナライズされた演習を提供する", summaryJa: "調整された練習を届ける" },
            { original: "give one-on-one guidance to every learner at the same time", summary: "offer simultaneous one-on-one attention", originalJa: "全ての学習者に同時に一対一の指導を提供する", summaryJa: "同時一対一の注意を提供する" },
            { original: "the emotional connection between a teacher and a student", summary: "form meaningful bonds with pupils", originalJa: "教師と生徒の間の感情的なつながり", summaryJa: "生徒と有意義な絆を形成する" },
            { original: "inspire and motivate young people", summary: "ignite their enthusiasm", originalJa: "若者を鼓舞し動機づける", summaryJa: "熱意を点火する" },
            { original: "develop weaker social skills", summary: "erode interpersonal abilities", originalJa: "社会的スキルが弱まる", summaryJa: "対人能力を損なう" },
            { original: "fewer opportunities to communicate with classmates and teachers directly", summary: "limiting face-to-face interaction among peers", originalJa: "クラスメートや教師と直接コミュニケーションする機会が減る", summaryJa: "仲間同士の対面交流を制限する" }
        ]
    },

    // ===== オリジナル 3 =====
    {
        id: 9,
        title: "垂直農法の可能性",
        titleEn: "Vertical Farming",
        exam: "オリジナル",
        passage: {
            intro: "As the world's population continues to grow, finding new ways to produce food has become increasingly important. One solution that has attracted attention is vertical farming, which involves growing crops in tall, indoor buildings rather than on traditional outdoor fields. This method uses controlled environments with artificial lighting and carefully managed water systems.",
            merit: "Advocates of vertical farming highlight its environmental benefits. Because crops are grown indoors, farmers do not need to worry about weather conditions such as droughts or heavy rains. Vertical farms also use significantly less water than traditional agriculture because the water is recycled within the system. Moreover, since these farms can be located in cities, the food does not need to be transported over long distances, which reduces carbon emissions from delivery trucks.",
            demerit: "Despite these advantages, vertical farming faces serious challenges. Building and operating indoor farming facilities requires a very large amount of electricity, especially for lighting and temperature control. As a result, the cost of producing food in vertical farms is currently much higher than that of conventional farming. Critics also note that only certain types of crops, mainly leafy vegetables and herbs, can be grown efficiently in vertical farms, limiting the variety of food that can be produced."
        },
        passageJa: {
            intro: "世界の人口が増加し続ける中、新しい食料生産方法を見つけることがますます重要になっています。注目を集めている解決策の一つが垂直農法で、従来の屋外農地ではなく、高層の屋内施設で作物を栽培します。この方法は人工照明と管理された水システムを備えた制御環境を使用します。",
            merit: "推進派は環境面での利点を強調します。作物が屋内で栽培されるため、干ばつや大雨などの天候条件を心配する必要がありません。水がシステム内でリサイクルされるため、従来の農業よりも大幅に少ない水で済みます。さらに、都市部に設置できるため、食料を長距離輸送する必要がなく、配送トラックからの炭素排出を削減できます。",
            demerit: "しかし、垂直農法は深刻な課題に直面しています。屋内農業施設の建設と運営には、特に照明と温度管理のために非常に大量の電力が必要です。その結果、垂直農法での食料生産コストは従来の農業よりもはるかに高くなっています。また、葉物野菜やハーブなど特定の作物しか効率的に栽培できないため、生産できる食料の種類が限定されます。"
        },
        modelAnswer: "Vertical farming, a technique of cultivating plants inside multi-story structures using artificial light and recycled water, is gaining traction as a means of feeding a growing global populace. Proponents emphasize that indoor cultivation eliminates vulnerability to unfavorable climate conditions and drastically cuts water consumption. Urban placement of these facilities also minimizes transportation-related carbon output. However, detractors highlight that the enormous energy demands for illumination and climate regulation make this approach far costlier than conventional methods. They add that the range of suitable crops remains narrow, primarily limited to greens and seasoning plants.",
        modelAnswerJa: "人工光とリサイクル水を使って多階建て施設内で植物を栽培する垂直農法は、増大する世界人口を養う手段として注目を集めています。推進派は、屋内栽培が不利な気候条件への脆弱性を排除し、水の消費を大幅に削減すると強調しています。都市部への設置は輸送関連の炭素排出も最小化します。しかし反対派は、照明と気候調節のための莫大なエネルギー需要がこの方法を従来の手法よりはるかに高コストにすると指摘しています。適した作物の範囲も狭く、主に葉物と香草に限定されると付け加えています。",
        fillBlanks: {
            template: "Vertical farming cultivates plants inside multi-story [_1_] using artificial light. Proponents emphasize that indoor cultivation eliminates vulnerability to unfavorable [_2_] conditions and cuts water consumption. However, detractors highlight that enormous [_3_] demands make this approach far costlier. They add that the range of suitable [_4_] remains narrow, primarily limited to greens and [_5_] plants.",
            blanks: [
                { id: 1, answer: "structures", options: ["structures", "vehicles", "museums", "stadiums"] },
                { id: 2, answer: "climate", options: ["climate", "economic", "political", "social"] },
                { id: 3, answer: "energy", options: ["energy", "labor", "material", "space"] },
                { id: 4, answer: "crops", options: ["crops", "animals", "machines", "workers"] },
                { id: 5, answer: "seasoning", options: ["seasoning", "flowering", "tropical", "aquatic"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "多階建て施設内で植物を栽培する垂直農法は、増大する世界人口を養う手段として注目されている。",
                answer: "Vertical farming, a technique of cultivating plants inside multi-story structures, is gaining traction as a means of feeding a growing global populace.",
                pieces: ["Vertical farming,", "a technique of", "cultivating plants", "inside multi-story structures,", "is gaining traction", "as a means of feeding", "a growing global populace."]
            },
            {
                sentenceJa: "屋内栽培は不利な気候条件への脆弱性を排除し、水の消費を大幅に削減する。",
                answer: "Proponents emphasize that indoor cultivation eliminates vulnerability to unfavorable climate conditions and drastically cuts water consumption.",
                pieces: ["Proponents emphasize that", "indoor cultivation", "eliminates vulnerability", "to unfavorable climate conditions", "and drastically cuts", "water consumption."]
            },
            {
                sentenceJa: "照明と気候調節のための莫大なエネルギー需要がこの方法をはるかに高コストにする。",
                answer: "However, detractors highlight that the enormous energy demands for illumination and climate regulation make this approach far costlier than conventional methods.",
                pieces: ["However,", "detractors highlight that", "the enormous energy demands", "for illumination", "and climate regulation", "make this approach", "far costlier than", "conventional methods."]
            },
            {
                sentenceJa: "適した作物の範囲は狭く、主に葉物と香草に限定される。",
                answer: "They add that the range of suitable crops remains narrow, primarily limited to greens and seasoning plants.",
                pieces: ["They add that", "the range of", "suitable crops", "remains narrow,", "primarily limited to", "greens and", "seasoning plants."]
            }
        ],
        paraphrases: [
            { original: "growing crops in tall, indoor buildings", summary: "cultivating plants inside multi-story structures", originalJa: "高層の屋内施設で作物を栽培する", summaryJa: "多階建て施設内で植物を栽培する" },
            { original: "the world's population continues to grow", summary: "a growing global populace", originalJa: "世界の人口が増加し続ける", summaryJa: "増大する世界人口" },
            { original: "do not need to worry about weather conditions such as droughts or heavy rains", summary: "eliminates vulnerability to unfavorable climate conditions", originalJa: "干ばつや大雨などの天候を心配する必要がない", summaryJa: "不利な気候条件への脆弱性を排除する" },
            { original: "use significantly less water", summary: "drastically cuts water consumption", originalJa: "大幅に少ない水で済む", summaryJa: "水の消費を大幅に削減する" },
            { original: "reduces carbon emissions from delivery trucks", summary: "minimizes transportation-related carbon output", originalJa: "配送トラックからの炭素排出を削減する", summaryJa: "輸送関連の炭素排出を最小化する" },
            { original: "requires a very large amount of electricity, especially for lighting and temperature control", summary: "enormous energy demands for illumination and climate regulation", originalJa: "照明と温度管理に非常に大量の電力が必要", summaryJa: "照明と気候調節のための莫大なエネルギー需要" },
            { original: "cost of producing food ... is currently much higher", summary: "far costlier than conventional methods", originalJa: "食料生産コストがはるかに高い", summaryJa: "従来の手法よりはるかに高コスト" },
            { original: "only certain types of crops, mainly leafy vegetables and herbs", summary: "primarily limited to greens and seasoning plants", originalJa: "葉物野菜やハーブなど特定の作物のみ", summaryJa: "主に葉物と香草に限定される" }
        ]
    },

    // ===== オリジナル 4 =====
    {
        id: 10,
        title: "週4日勤務制の導入",
        titleEn: "Four-Day Workweek",
        exam: "オリジナル",
        passage: {
            intro: "The traditional five-day workweek has been the standard in most countries for decades. However, some companies and governments have recently begun experimenting with a four-day workweek. In this system, employees work the same total number of hours but spread over four days instead of five, giving them an extra day off each week.",
            merit: "Supporters of the four-day workweek argue that it can improve both employee well-being and company performance. Workers who have three days off per week report lower levels of stress and higher job satisfaction. Research has found that employees often accomplish just as much work in four longer days because they waste less time on unnecessary meetings and distractions. Some companies that have adopted this system have even seen an increase in overall profits.",
            demerit: "However, opponents raise practical concerns. Certain industries, such as healthcare and customer service, require staff to be available five or more days a week. Removing a working day could lead to delays in responding to clients and a reduction in the quality of service. Others worry that compressing the same workload into fewer days may actually increase stress for some employees, particularly those whose tasks cannot easily be completed in a shorter period."
        },
        passageJa: {
            intro: "従来の週5日勤務は数十年にわたりほとんどの国で標準でした。しかし最近、一部の企業や政府が週4日勤務の試験的導入を始めています。このシステムでは、従業員は同じ総労働時間を5日ではなく4日に分散し、毎週1日多く休みを取ります。",
            merit: "支持者は従業員の幸福度と企業業績の両方を改善できると主張しています。週3日休みの労働者はストレスレベルが低く、仕事の満足度が高いと報告しています。無駄な会議や気が散ることが減るため、4日の長い勤務日でも同じだけの仕事を達成することが研究で判明しています。このシステムを採用した企業の中には全体の利益が増加したところもあります。",
            demerit: "しかし反対派は実際的な懸念を提起しています。医療やカスタマーサービスなどの業界では、週5日以上スタッフが対応可能である必要があります。勤務日を減らすと顧客への対応の遅れやサービスの質の低下につながる可能性があります。同じ仕事量をより少ない日数に圧縮すると、特に短期間で完了できない仕事を抱える従業員にとってストレスが増す可能性もあります。"
        },
        modelAnswer: "Some organizations are trialing a compressed schedule where staff complete their hours across four days rather than the conventional five. Proponents contend this arrangement enhances worker satisfaction, lowers anxiety levels, and can even lift corporate earnings, since personnel tend to use their time more efficiently with fewer distractions. Opponents, however, caution that sectors demanding continuous availability—such as medical care and client support—could suffer from slower response times and diminished service standards. They further argue that condensing tasks into a shorter timeframe may heighten strain for certain roles.",
        modelAnswerJa: "一部の組織がスタッフが従来の5日ではなく4日で勤務時間を完了する圧縮スケジュールを試行しています。賛成派はこの取り決めが労働者の満足度を向上させ、不安を低下させ、気が散ることが減って効率的に時間を使えるため企業収益さえ押し上げると主張しています。しかし反対派は、医療やクライアントサポートなど常時対応が求められる分野ではレスポンスタイム低下やサービス基準の減退が生じる可能性があると警告しています。さらに、短い時間枠に業務を凝縮すると特定の職種では緊張が高まる可能性があると主張しています。",
        fillBlanks: {
            template: "Some organizations are trialing a compressed [_1_] where staff complete hours across four days. Proponents contend this enhances worker [_2_] and lowers anxiety levels. Opponents caution that sectors demanding continuous [_3_] could suffer from slower response times. They argue that condensing tasks into a shorter [_4_] may heighten [_5_] for certain roles.",
            blanks: [
                { id: 1, answer: "schedule", options: ["schedule", "budget", "policy", "project"] },
                { id: 2, answer: "satisfaction", options: ["satisfaction", "competition", "confusion", "absence"] },
                { id: 3, answer: "availability", options: ["availability", "creativity", "diversity", "flexibility"] },
                { id: 4, answer: "timeframe", options: ["timeframe", "curriculum", "contract", "distance"] },
                { id: 5, answer: "strain", options: ["strain", "income", "interest", "comfort"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "一部の組織が、スタッフが従来の5日ではなく4日で勤務時間を完了する圧縮スケジュールを試行している。",
                answer: "Some organizations are trialing a compressed schedule where staff complete their hours across four days rather than the conventional five.",
                pieces: ["Some organizations", "are trialing", "a compressed schedule", "where staff", "complete their hours", "across four days", "rather than the conventional five."]
            },
            {
                sentenceJa: "賛成派はこの取り決めが満足度を向上させ不安を低下させ、企業収益さえ押し上げると主張する。",
                answer: "Proponents contend this arrangement enhances worker satisfaction, lowers anxiety levels, and can even lift corporate earnings.",
                pieces: ["Proponents contend", "this arrangement", "enhances worker satisfaction,", "lowers anxiety levels,", "and can even lift", "corporate earnings."]
            },
            {
                sentenceJa: "医療やクライアントサポートなど常時対応が求められる分野ではレスポンスが遅れサービス基準も下がりうる。",
                answer: "Opponents caution that sectors demanding continuous availability could suffer from slower response times and diminished service standards.",
                pieces: ["Opponents caution that", "sectors demanding", "continuous availability", "could suffer from", "slower response times", "and diminished", "service standards."]
            },
            {
                sentenceJa: "短い時間枠に業務を凝縮すると特定の職種では緊張が高まる可能性がある。",
                answer: "They further argue that condensing tasks into a shorter timeframe may heighten strain for certain roles.",
                pieces: ["They further argue that", "condensing tasks", "into a shorter timeframe", "may heighten", "strain", "for certain roles."]
            }
        ],
        paraphrases: [
            { original: "experimenting with a four-day workweek", summary: "trialing a compressed schedule", originalJa: "週4日勤務を試験的に導入する", summaryJa: "圧縮スケジュールを試行する" },
            { original: "higher job satisfaction", summary: "enhances worker satisfaction", originalJa: "仕事の満足度が高い", summaryJa: "労働者の満足度を向上させる" },
            { original: "lower levels of stress", summary: "lowers anxiety levels", originalJa: "ストレスレベルが低い", summaryJa: "不安を低下させる" },
            { original: "increase in overall profits", summary: "lift corporate earnings", originalJa: "全体の利益が増加する", summaryJa: "企業収益を押し上げる" },
            { original: "waste less time on unnecessary meetings and distractions", summary: "use their time more efficiently with fewer distractions", originalJa: "無駄な会議や気が散ることに時間を浪費しない", summaryJa: "気が散ることが減り効率的に時間を使う" },
            { original: "require staff to be available five or more days a week", summary: "sectors demanding continuous availability", originalJa: "週5日以上スタッフが対応可能である必要がある", summaryJa: "常時対応が求められる分野" },
            { original: "delays in responding to clients and a reduction in the quality of service", summary: "slower response times and diminished service standards", originalJa: "顧客への対応の遅れやサービスの質の低下", summaryJa: "レスポンスタイム低下とサービス基準の減退" },
            { original: "compressing the same workload into fewer days may actually increase stress", summary: "condensing tasks into a shorter timeframe may heighten strain", originalJa: "同じ仕事量をより少ない日数に圧縮するとストレスが増す", summaryJa: "短い時間枠に業務を凝縮すると緊張が高まる" }
        ]
    },

    // ===== オリジナル 5 =====
    {
        id: 11,
        title: "プラスチック包装への課税",
        titleEn: "Plastic Packaging Tax",
        exam: "オリジナル",
        passage: {
            intro: "Plastic packaging is used widely in the food and retail industries because it is cheap, lightweight, and effective at protecting products. However, most plastic packaging is used only once and then thrown away, contributing to environmental pollution. To address this problem, some governments have introduced a tax on plastic packaging, hoping to encourage businesses to find alternatives.",
            merit: "Supporters of the tax believe it will bring about positive change. When companies have to pay extra for using plastic, they are more likely to switch to environmentally friendly materials such as paper or biodegradable packaging. This would significantly reduce the amount of plastic waste entering oceans and landfills. The tax revenue could also be used to fund recycling programs and research into new sustainable materials.",
            demerit: "Opponents, however, argue that the tax creates problems for businesses and consumers. Many companies, especially small ones, may struggle to find affordable alternatives to plastic packaging in a short time. The additional costs are often passed on to customers, making everyday products more expensive. Furthermore, some replacement materials may not protect food as effectively as plastic, potentially leading to increased food waste."
        },
        passageJa: {
            intro: "プラスチック包装は安価で軽量、製品保護に効果的なため、食品・小売業界で広く使用されています。しかし、ほとんどのプラスチック包装は一度しか使われず廃棄され、環境汚染の原因となっています。この問題に対処するため、一部の政府がプラスチック包装に課税を導入し、企業に代替品を見つけるよう促しています。",
            merit: "課税の支持者は前向きな変化をもたらすと信じています。プラスチック使用に追加料金を払う必要があるため、企業は紙や生分解性包装など環境に優しい素材に切り替える可能性が高くなります。これにより海洋や埋立地に流入するプラスチック廃棄物が大幅に削減されます。税収はリサイクルプログラムや新しい持続可能な素材の研究にも活用できます。",
            demerit: "一方、反対派は企業と消費者に問題を生じさせると主張しています。多くの企業、特に中小企業は短期間でプラスチック包装の手頃な代替品を見つけるのに苦労する可能性があります。追加コストは顧客に転嫁されることが多く、日常製品がより高価になります。さらに、代替素材はプラスチックほど効果的に食品を保護できず、食品廃棄の増加につながる可能性があります。"
        },
        modelAnswer: "Certain authorities have imposed a levy on single-use plastic wrapping to combat environmental contamination. Advocates maintain that the financial burden motivates manufacturers to adopt eco-friendly substitutes like paper or compostable materials, thereby curbing waste that pollutes waterways and disposal sites. Tax proceeds can additionally finance recycling initiatives and green material research. Detractors, however, object that smaller enterprises face difficulty sourcing affordable replacements quickly, and the extra expense is frequently transferred to shoppers. They further warn that alternative wrapping may be less effective at preserving perishables, paradoxically generating more discarded food.",
        modelAnswerJa: "一部の当局が環境汚染に対処するため、使い捨てプラスチック包装に課税を実施しています。推進派は、この経済的負担がメーカーに紙やコンポスト可能な素材などの環境配慮型代替品への切り替えを動機づけ、水路や処分場を汚染する廃棄物を抑制すると主張しています。税収はリサイクル事業やグリーン素材研究にも充当できます。しかし反対派は、小規模企業が手頃な代替品を迅速に調達するのが困難であり、追加費用が消費者に転嫁されることが多いと異議を唱えています。さらに、代替包装は生鮮食品の保存効果が低く、逆説的にさらなる食品廃棄を生む可能性があると警告しています。",
        fillBlanks: {
            template: "Certain authorities have imposed a [_1_] on single-use plastic wrapping. Advocates maintain that manufacturers will adopt eco-friendly [_2_] like paper, thereby curbing waste. Detractors object that smaller enterprises face difficulty sourcing affordable [_3_] quickly. They warn that alternative wrapping may be less effective at preserving [_4_], paradoxically generating more discarded [_5_].",
            blanks: [
                { id: 1, answer: "levy", options: ["levy", "ban", "reward", "subsidy"] },
                { id: 2, answer: "substitutes", options: ["substitutes", "regulations", "advertisements", "employees"] },
                { id: 3, answer: "replacements", options: ["replacements", "investments", "customers", "locations"] },
                { id: 4, answer: "perishables", options: ["perishables", "furniture", "electronics", "clothing"] },
                { id: 5, answer: "food", options: ["food", "plastic", "paper", "energy"] }
            ]
        },
        chunks: [
            {
                sentenceJa: "一部の当局が環境汚染に対処するため、使い捨てプラスチック包装に課税を実施している。",
                answer: "Certain authorities have imposed a levy on single-use plastic wrapping to combat environmental contamination.",
                pieces: ["Certain authorities", "have imposed a levy", "on single-use", "plastic wrapping", "to combat", "environmental contamination."]
            },
            {
                sentenceJa: "経済的負担がメーカーに環境配慮型代替品への切り替えを動機づけ、廃棄物を抑制する。",
                answer: "Advocates maintain that the financial burden motivates manufacturers to adopt eco-friendly substitutes, thereby curbing waste that pollutes waterways and disposal sites.",
                pieces: ["Advocates maintain that", "the financial burden", "motivates manufacturers", "to adopt eco-friendly substitutes,", "thereby curbing waste", "that pollutes waterways", "and disposal sites."]
            },
            {
                sentenceJa: "小規模企業が手頃な代替品を迅速に調達するのは困難で、追加費用は消費者に転嫁される。",
                answer: "Detractors object that smaller enterprises face difficulty sourcing affordable replacements quickly, and the extra expense is frequently transferred to shoppers.",
                pieces: ["Detractors object that", "smaller enterprises", "face difficulty", "sourcing affordable replacements", "quickly, and", "the extra expense", "is frequently transferred", "to shoppers."]
            },
            {
                sentenceJa: "代替包装は生鮮食品の保存効果が低く、さらなる食品廃棄を生む可能性がある。",
                answer: "They further warn that alternative wrapping may be less effective at preserving perishables, paradoxically generating more discarded food.",
                pieces: ["They further warn that", "alternative wrapping", "may be less effective", "at preserving perishables,", "paradoxically generating", "more discarded food."]
            }
        ],
        paraphrases: [
            { original: "introduced a tax on plastic packaging", summary: "imposed a levy on single-use plastic wrapping", originalJa: "プラスチック包装に課税を導入した", summaryJa: "使い捨てプラスチック包装に課税を実施した" },
            { original: "contributing to environmental pollution", summary: "combat environmental contamination", originalJa: "環境汚染の原因となる", summaryJa: "環境汚染に対処する" },
            { original: "switch to environmentally friendly materials such as paper or biodegradable packaging", summary: "adopt eco-friendly substitutes like paper or compostable materials", originalJa: "紙や生分解性包装など環境に優しい素材に切り替える", summaryJa: "紙やコンポスト可能な素材などの環境配慮型代替品を採用する" },
            { original: "reduce the amount of plastic waste entering oceans and landfills", summary: "curbing waste that pollutes waterways and disposal sites", originalJa: "海洋や埋立地に流入するプラスチック廃棄物を削減する", summaryJa: "水路や処分場を汚染する廃棄物を抑制する" },
            { original: "fund recycling programs and research into new sustainable materials", summary: "finance recycling initiatives and green material research", originalJa: "リサイクルプログラムや持続可能な素材の研究に資金を充てる", summaryJa: "リサイクル事業やグリーン素材研究に充当する" },
            { original: "small ones, may struggle to find affordable alternatives", summary: "smaller enterprises face difficulty sourcing affordable replacements", originalJa: "中小企業は手頃な代替品を見つけるのに苦労する", summaryJa: "小規模企業が手頃な代替品を調達するのが困難" },
            { original: "costs are often passed on to customers", summary: "extra expense is frequently transferred to shoppers", originalJa: "コストは顧客に転嫁されることが多い", summaryJa: "追加費用が消費者に転嫁される" },
            { original: "not protect food as effectively ... leading to increased food waste", summary: "less effective at preserving perishables ... generating more discarded food", originalJa: "食品を効果的に保護できず食品廃棄が増える", summaryJa: "生鮮食品の保存効果が低くさらなる食品廃棄を生む" }
        ]
    }
];
