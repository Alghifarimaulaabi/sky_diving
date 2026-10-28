import { Product, Pack, Discipline, EventItem, FaqItem } from '@/types/catalog';

export const FUNDIVE_CONFIG = {
  wa: '+62 822-4955-1110',
  shop: 'everydive.id',
  instagram: 'https://instagram.com/everydive.id',
  tiktok: 'https://tiktok.com/@everydive.id',
  youtube: 'https://youtube.com/@BandungApneaCommunity',
};

export const PACKS: Pack[] = [
  {
    id: 'kolam',
    name: 'Paket kolam',
    desc: 'Masker, snorkel, dan long fins untuk mulai latihan di kolam.',
    items: ['masker-lv', 'snorkel', 'fins-long']
  },
  {
    id: 'laut',
    name: 'Paket laut',
    desc: 'Paket kolam plus wetsuit, sabuk pemberat, pelampung, dan lanyard. Beban pemberat dikonsultasikan dulu.',
    items: ['masker-lv', 'snorkel', 'fins-long', 'wetsuit', 'weight-belt', 'buoy', 'lanyard']
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'masker-lv',
    name: 'Masker low-volume',
    cat: 'Masker',
    level: 'Pemula',
    icon: 'mask',
    price: null,
    photo: null,
    short: 'Ruang udara kecil, lebih mudah di-equalize.',
    fn: 'Melihat jelas di bawah air dengan ruang udara kecil agar equalization masker lebih mudah.',
    tip: 'Tempel di wajah tanpa tali, tarik napas lewat hidung. Kalau menempel sendiri berarti pas.',
    options: [{ key: 'skirt', label: 'Warna skirt', choices: ['Hitam', 'Transparan'] }]
  },
  {
    id: 'snorkel',
    name: 'Snorkel simpel',
    cat: 'Snorkel',
    level: 'Pemula',
    icon: 'snorkel',
    price: null,
    photo: null,
    short: 'Tabung ringan untuk bernapas di permukaan.',
    fn: 'Bernapas di permukaan sebelum dan sesudah menyelam.',
    tip: 'Pilih yang ringan, tabung lurus, dan mouthpiece nyaman. Tidak perlu katup berlebihan.',
    options: []
  },
  {
    id: 'fins-long',
    name: 'Long fins',
    cat: 'Fins',
    level: 'Pemula',
    icon: 'fins',
    price: null,
    photo: null,
    short: 'Bilah panjang, tendangan lebih hemat tenaga.',
    fn: 'Menambah dorongan dengan tenaga lebih hemat sehingga oksigen lebih awet.',
    tip: 'Mulai dari bilah plastik atau fiber yang lentur. Foot pocket harus pas, tidak terlalu longgar.',
    options: [
      { key: 'ukuran', label: 'Ukuran kaki (EU)', choices: ['38-39', '40-41', '42-43', '44-45'] },
      { key: 'kaku', label: 'Kekakuan', choices: ['Lunak', 'Sedang', 'Keras'] }
    ]
  },
  {
    id: 'fins-fiber',
    name: 'Fiber / carbon fins',
    cat: 'Fins',
    level: 'Lanjut',
    icon: 'fins',
    price: null,
    photo: null,
    short: 'Bilah responsif untuk jarak dan kedalaman lebih jauh.',
    fn: 'Bilah lebih responsif untuk efisiensi saat kedalaman dan jarak bertambah.',
    tip: 'Pilih kekakuan sesuai kekuatan kaki. Terlalu kaku bikin cepat lelah.',
    options: [
      { key: 'ukuran', label: 'Ukuran kaki (EU)', choices: ['38-39', '40-41', '42-43', '44-45'] },
      { key: 'kaku', label: 'Kekakuan', choices: ['Lunak', 'Sedang', 'Keras'] }
    ]
  },
  {
    id: 'wetsuit',
    name: 'Wetsuit freedive',
    cat: 'Wetsuit',
    level: 'Pemula',
    icon: 'wetsuit',
    price: null,
    photo: null,
    short: 'Open-cell, hangat dan luwes saat bergerak.',
    fn: 'Menjaga suhu tubuh dan melindungi kulit. Bahan open-cell lebih hangat dan luwes.',
    tip: 'Harus pas ketat tapi tidak menghambat napas. Untuk air tropis, 1,5 sampai 3 mm biasanya cukup.',
    options: [
      { key: 'tebal', label: 'Ketebalan', choices: ['1,5 mm', '3 mm', '5 mm'] },
      { key: 'ukuran', label: 'Ukuran', choices: ['S', 'M', 'L', 'XL', 'XXL'] }
    ]
  },
  {
    id: 'weight-belt',
    name: 'Sabuk pemberat (karet)',
    cat: 'Pemberat',
    level: 'Pemula',
    icon: 'belt',
    price: null,
    photo: null,
    short: 'Sabuk karet dengan quick release.',
    fn: 'Mengatur daya apung agar mudah turun dan tetap netral di kedalaman latihan.',
    tip: 'Pakai sabuk karet dengan quick release di sisi kanan. Tambah beban sedikit demi sedikit lewat tes. Kalau belum tahu bebannya, kosongkan pilihan dan konsultasi dulu.',
    options: [{ key: 'beban', label: 'Beban timbal', choices: ['1 kg', '2 kg', '3 kg', '4 kg'] }]
  },
  {
    id: 'neck-weight',
    name: 'Neck weight',
    cat: 'Pemberat',
    level: 'Lanjut',
    icon: 'neck',
    price: null,
    photo: null,
    short: 'Beban di leher agar posisi tubuh lebih lurus.',
    fn: 'Menaruh beban di leher agar posisi tubuh lebih streamline untuk penyelaman dalam.',
    tip: 'Pakai setelah paham dasar. Pastikan mudah dilepas dan tidak mencekik.',
    options: [{ key: 'beban', label: 'Beban', choices: ['0,5 kg', '1 kg', '1,5 kg'] }]
  },
  {
    id: 'lanyard',
    name: 'Pisau dan lanyard',
    cat: 'Keselamatan',
    level: 'Pemula',
    icon: 'knife',
    price: null,
    photo: null,
    short: 'Pengaman saat tersangkut tali atau jaring.',
    fn: 'Lanyard mengikat badan ke tali. Pisau kecil untuk situasi tersangkut tali atau jaring.',
    tip: 'Pasang di tempat yang mudah dijangkau. Pastikan cara melepas sudah dilatih.',
    options: [{ key: 'jenis', label: 'Jenis', choices: ['Pisau dan sarung', 'Lanyard saja'] }]
  },
  {
    id: 'buoy',
    name: 'Pelampung / dive buoy',
    cat: 'Keselamatan',
    level: 'Pemula',
    icon: 'buoy',
    price: null,
    photo: null,
    short: 'Penanda posisi untuk kapal dan tempat tali.',
    fn: 'Menandai posisi penyelam ke kapal, tempat tali dan istirahat di permukaan.',
    tip: 'Pilih warna mencolok dan tali yang kuat. Wajib dipakai saat menyelam di laut.',
    options: [{ key: 'warna', label: 'Warna', choices: ['Oranye', 'Kuning'] }]
  },
  {
    id: 'dive-watch',
    name: 'Dive computer / watch',
    cat: 'Elektronik',
    level: 'Lanjut',
    icon: 'watch',
    price: null,
    photo: null,
    short: 'Catat kedalaman, waktu, dan interval permukaan.',
    fn: 'Mencatat kedalaman, waktu, dan interval permukaan untuk evaluasi latihan.',
    tip: 'Cari mode freedive khusus. Alat bantu, bukan pengganti penilaian diri dan buddy. Bingung memilih? Tanya admin lewat WhatsApp.',
    options: []
  }
];

export const DISCIPLINES: Discipline[] = [
  {
    code: 'STA',
    name: 'Static Apnea',
    desc: 'Menahan napas selama mungkin dalam posisi diam, biasanya mengapung di kolam dengan wajah di air. Latihan paling dasar untuk relaksasi dan toleransi CO2. Wajib ada pengawas.'
  },
  {
    code: 'DYN',
    name: 'Dynamic with Fins',
    desc: 'Berenang horizontal sejauh mungkin di bawah air memakai fins (monofin atau bifins), dalam satu tarikan napas.'
  },
  {
    code: 'DNF',
    name: 'Dynamic No Fins',
    desc: 'Berenang horizontal tanpa fins, hanya dengan gaya dada khusus. Menuntut teknik dan efisiensi gerak.'
  },
  {
    code: 'CWT',
    name: 'Constant Weight',
    desc: 'Turun dan naik di sepanjang tali dengan tenaga sendiri memakai fins atau monofin, tanpa mengubah beban.'
  },
  {
    code: 'FIM',
    name: 'Free Immersion',
    desc: 'Turun dan naik dengan menarik tali tanpa fins. Cara bagus untuk melatih equalization dan relaksasi.'
  },
  {
    code: 'CNF',
    name: 'Constant No Fins',
    desc: 'Turun dan naik di sepanjang tali tanpa fins dan tanpa menarik tali. Salah satu disiplin tersulit.'
  },
  {
    code: 'VWT',
    name: 'Variable Weight',
    desc: 'Turun memakai pemberat (sled) dan naik dengan tenaga sendiri. Disiplin lanjutan yang butuh pengalaman dan tim pengawas.'
  },
  {
    code: 'NLT',
    name: 'No Limits',
    desc: 'Turun dengan sled dan naik dengan balon atau alat bantu. Disiplin ekstrem untuk atlet berpengalaman, bukan untuk pemula.'
  }
];

export const TIMELINE_STEPS = [
  {
    num: 1,
    title: 'Ikut kelas bersertifikat',
    desc: 'Cari instruktur freedive yang diakui. Kamu akan belajar teori, keselamatan, dan teknik langsung di air.'
  },
  {
    num: 2,
    title: 'Latihan napas dan relaksasi',
    desc: 'Belajar napas diafragma dan rileks. Tubuh yang tenang pakai lebih sedikit oksigen. Latih di darat, dalam posisi duduk atau berbaring.'
  },
  {
    num: 3,
    title: 'Kuasai equalization',
    desc: 'Teknik menyamakan tekanan telinga saat turun, misalnya Frenzel. Jangan dipaksa. Kalau sakit, naik dan ulangi pelan-pelan.'
  },
  {
    num: 4,
    title: 'Dasar breath-hold di kolam',
    desc: 'Mulai dari statis dan dinamis di kolam bareng buddy dan pengawas. Naikkan target sedikit demi sedikit.'
  },
  {
    num: 5,
    title: 'Fun dive bareng komunitas',
    desc: 'Praktik di laut bareng buddy, tali kedalaman, dan pengawas. Nikmati prosesnya, jangan kejar angka.'
  }
];

export const SAFETY_RULES = [
  {
    icon: '🚫',
    title: 'Jangan pernah freedive sendirian',
    desc: 'Selalu bareng buddy yang terlatih dan siap bantu.'
  },
  {
    icon: '👥',
    title: 'Buddy system',
    desc: 'Satu menyelam, satu mengawasi. Gantian dan jangan lengah sampai buddy muncul dan memberi tanda OK.'
  },
  {
    icon: '💨',
    title: 'Jangan hiperventilasi berlebihan',
    desc: 'Napas cepat dan dalam menurunkan CO2 dan menipu sinyal tubuh. Itu bisa memicu blackout tanpa peringatan.'
  },
  {
    icon: '⚠️',
    title: 'Kenali tanda blackout dan samba',
    desc: 'Samba adalah kontraksi atau gerakan tak terkendali saat hampir pingsan. Blackout adalah hilang kesadaran. Keduanya darurat: buddy harus segera membantu menjaga jalan napas dan membawa ke permukaan.'
  }
];

export const EVENTS: EventItem[] = [
  {
    id: 'sesi-kolam',
    day: 'SAB & MIN',
    month: 'RUTIN',
    datetime: '2026-11-01',
    title: 'Latihan Kolam Rutin',
    desc: 'Statis, dinamis, dan latihan teknik bareng buddy & safety diver.',
    location: 'Kolam Sesko AD Bandung • 07.00 - 10.00 WIB'
  },
  {
    id: 'fun-dive',
    day: '15-17',
    month: 'NOV',
    datetime: '2026-11-15',
    title: 'Fun Dive & Open Water',
    desc: 'Trip laut bareng komunitas dengan tali kedalaman & safety standby.',
    location: 'Kepulauan Seribu • Open quota for members'
  },
  {
    id: 'workshop',
    day: '29',
    month: 'NOV',
    datetime: '2026-11-29',
    title: 'Workshop Pemula & Equalization',
    desc: 'Kupas tuntas teknik Frenzel, breathing table, dan protokol darurat.',
    location: 'Bandung Hub • Kuota terbatas 15 orang'
  }
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: 'Harus jago renang dulu?',
    answer: 'Kamu perlu nyaman di air dan bisa berenang dasar. Instruktur akan menilai kemampuanmu sebelum latihan lanjut.'
  },
  {
    question: 'Freedive itu bahaya nggak?',
    answer: 'Ada risikonya, terutama blackout. Risiko turun besar kalau kamu belajar dari instruktur, selalu bareng buddy, dan tidak memaksakan diri.'
  },
  {
    question: 'Aku pemula banget, mulai dari mana?',
    answer: 'Ikut kelas dasar bersertifikat, lalu latihan rutin di kolam. Lihat bagian Belajar dari Nol.'
  },
  {
    question: 'Perlu beli gear lengkap di awal?',
    answer: 'Tidak. Mulai dari masker, snorkel, dan fins yang pas. Sisanya menyusul sesuai kebutuhan. Lihat Gear Guide.'
  }
];

export const GALLERY_ITEMS = [
  { id: 1, cap: 'Sesi latihan dinamis di kolam Sesko AD', className: 'ph--a', label: 'Dynamic Apnea' },
  { id: 2, cap: 'Buddy system & safety check di permukaan', className: 'ph--b', label: 'Buddy System' },
  { id: 3, cap: 'Fun dive open water di kedalaman 15 meter', className: 'ph--c', label: 'Depth Training' },
  { id: 4, cap: 'Latihan relaksasi & pernapasan diafragma di darat', className: 'ph--b', label: 'Dry Breath-hold' },
  { id: 5, cap: 'Uji coba gear low-volume mask & carbon fins', className: 'ph--c', label: 'Gear Consultation' },
  { id: 6, cap: 'Kebersamaan komunitas Bandung Apnea Community', className: 'ph--a', label: 'Community Vibes' }
];
