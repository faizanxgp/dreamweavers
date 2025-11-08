-- Seed data for Azkar (Islamic Supplications)
-- Night and Sleep Azkar

-- Night Azkar
INSERT INTO azkar (arabic_text, transliteration, translation, category, reference, display_order) VALUES
(
    'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    'A''ūdhu bi-kalimāti llāhi at-tāmmāti min sharri mā khalaq',
    'I seek refuge in the perfect words of Allah from the evil of what He has created',
    'night',
    'Muslim 2708',
    1
),
(
    'بِاسْمِكَ رَبِّـي وَضَعْـتُ جَنْـبي، وَبِكَ أَرْفَعُـه، فَإِن أَمْسَـكْتَ نَفْسـي فارْحَـمْها، وَإِنْ أَرْسَلْتَـها فاحْفَظْـها بِمـا تَحْفَـظُ بِه عِبـادَكَ الصّـالِحـين',
    'Bismika rabbī waḍa''tu janbī, wa-bika arfa''uh. Fa-in amsakta nafsī fa-rḥamhā, wa-in arsaltahā fa-ḥfaẓhā bimā taḥfaẓu bihi ''ibādaka aṣ-ṣāliḥīn',
    'In Your name my Lord, I lie down and in Your name I rise, so if You should take my soul then have mercy upon it, and if You should return my soul then protect it in the manner You do so with Your righteous servants',
    'sleep',
    'Bukhari 6320, Muslim 2714',
    2
),
(
    'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ',
    'Allāhumma innaka khalaqta nafsī wa-anta tawaffāhā, laka mamātuhā wa-maḥyāhā. In aḥyaytahā fa-ḥfaẓhā, wa-in amattahā fa-ghfir lahā. Allāhumma innī as''aluka al-''āfiyah',
    'O Allah, You created my soul and You take it back. Unto You is its death and its life. If You give it life then protect it, and if You cause it to die then forgive it. O Allah, I ask You for well-being',
    'sleep',
    'Muslim 2712',
    3
),
(
    'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
    'Allāhumma qinī ''adhābaka yawma tab''athu ''ibādak',
    'O Allah, protect me from Your punishment on the Day You resurrect Your servants',
    'sleep',
    'Abu Dawud 5045',
    4
),
(
    'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    'Bismika Allāhumma amūtu wa-aḥyā',
    'In Your name O Allah, I die and I live',
    'sleep',
    'Bukhari 6312',
    5
),
(
    'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ',
    'Al-ḥamdu lillāhi alladhī aṭ''amanā wa-saqānā, wa-kafānā, wa-āwānā, fa-kam mimman lā kāfiya lahu wa-lā mu''wī',
    'Praise is to Allah Who has provided us with food and drink, sufficed us and gave us shelter, for how many are there who have none to suffice them or shelter them',
    'night',
    'Muslim 2715',
    6
),
(
    'اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّماوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ، وَأَنْ أَقْتَرِفَ عَلَى نَفْسِي سُوءًا أَوْ أَجُرَّهُ إِلَى مُسْلِمٍ',
    'Allāhumma ''ālima al-ghaybi wa-ash-shahādah fāṭira as-samāwāti wa-al-arḍ, rabba kulli shay''in wa-malīkah, ashhadu an lā ilāha illā ant, a''ūdhu bika min sharri nafsī, wa-min sharri ash-shayṭāni wa-shirkih, wa-an aqtarifa ''alā nafsī sū''an aw ajurrahu ilā muslim',
    'O Allah, Knower of the unseen and the evident, Originator of the heavens and the earth, Lord of everything and its Master, I bear witness that there is no god but You. I seek refuge in You from the evil of my soul and from the evil of Satan and his helpers. (I seek refuge in You) from bringing evil upon my soul and from harming any Muslim',
    'sleep',
    'Abu Dawud 5067, At-Tirmidhi 3392',
    7
);

-- Sleep guidance content
INSERT INTO azkar (arabic_text, transliteration, translation, category, reference, display_order) VALUES
(
    'قُلْ هُوَ ٱللَّهُ أَحَدٌ ٱللَّهُ ٱلصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ',
    'Qul huwa Allāhu aḥad, Allāhu aṣ-ṣamad, lam yalid wa-lam yūlad, wa-lam yakun lahu kufuwan aḥad',
    'Say: He is Allah, the One and Only; Allah, the Eternal, Absolute; He begets not, nor is He begotten; And there is none like unto Him',
    'sleep',
    'Surah Al-Ikhlas (112)',
    8
),
(
    'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ مِن شَرِّ مَا خَلَقَ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    'Qul a''ūdhu bi-rabbi al-falaq, min sharri mā khalaq, wa-min sharri ghāsiqin idhā waqab, wa-min sharri an-naffāthāti fī al-''uqad, wa-min sharri ḥāsidin idhā ḥasad',
    'Say: I seek refuge with the Lord of the Dawn, from the evil of what He has created; and from the evil of darkness when it settles; and from the evil of those who blow on knots; and from the evil of an envier when he envies',
    'sleep',
    'Surah Al-Falaq (113)',
    9
),
(
    'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ مَلِكِ ٱلنَّاسِ إِلَٰهِ ٱلنَّاسِ مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ',
    'Qul a''ūdhu bi-rabbi an-nās, maliki an-nās, ilāhi an-nās, min sharri al-waswāsi al-khannās, alladhī yuwaswisu fī ṣudūri an-nās, mina al-jinnati wa-an-nās',
    'Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the sneaking whisperer, who whispers in the hearts of mankind, from among the jinn and mankind',
    'sleep',
    'Surah An-Nas (114)',
    10
);

COMMENT ON TABLE azkar IS 'Contains Islamic supplications and Quranic verses for various times, especially before sleep';
