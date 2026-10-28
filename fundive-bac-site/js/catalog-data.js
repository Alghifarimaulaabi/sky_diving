/* ===== Data katalog gear everydive.id =====
   Semua yang perlu kamu ganti ada di file ini:
   - wa       : nomor WhatsApp admin
   - products : daftar gear (harga, varian, foto)
   - packs    : paket yang bisa ditambahkan sekaligus
   Tidak perlu mengubah file lain. */
window.FUNDIVE = {
  // GANTI: nomor WhatsApp admin. Boleh 0812xxxx atau 62812xxxx, tanpa spasi atau tanda +.
  wa: '+62 822-4955-1110',

  // Nama yang muncul di sapaan pesan WhatsApp
  shop: 'everydive.id',

  // Paket: beberapa produk yang ditambahkan sekaligus (isi dengan id produk)
  packs: [
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
  ],

  /* Produk
     id      : kode unik, huruf kecil tanpa spasi
     cat     : kategori (menentukan tab filter)
     level   : 'Pemula' atau 'Lanjut'
     price   : angka rupiah, misal 350000. Isi null jika harga dikonfirmasi lewat WhatsApp.
     photo   : path foto, misal 'assets/gear/masker.webp'. Isi null untuk memakai ikon.
     icon    : mask, snorkel, fins, wetsuit, belt, neck, knife, buoy, watch
     options : pilihan varian. Pengunjung boleh membiarkannya kosong, admin yang membantu memilih. */
  products: [
    {
      id: 'masker-lv', name: 'Masker low-volume', cat: 'Masker', level: 'Pemula', icon: 'mask',
      price: null, photo: null,
      short: 'Ruang udara kecil, lebih mudah di-equalize.',
      fn: 'Melihat jelas di bawah air dengan ruang udara kecil agar equalization masker lebih mudah.',
      tip: 'Tempel di wajah tanpa tali, tarik napas lewat hidung. Kalau menempel sendiri berarti pas.',
      options: [{ key: 'skirt', label: 'Warna skirt', choices: ['Hitam', 'Transparan'] }]
    },
    {
      id: 'snorkel', name: 'Snorkel simpel', cat: 'Snorkel', level: 'Pemula', icon: 'snorkel',
      price: null, photo: null,
      short: 'Tabung ringan untuk bernapas di permukaan.',
      fn: 'Bernapas di permukaan sebelum dan sesudah menyelam.',
      tip: 'Pilih yang ringan, tabung lurus, dan mouthpiece nyaman. Tidak perlu katup berlebihan.',
      options: []
    },
    {
      id: 'fins-long', name: 'Long fins', cat: 'Fins', level: 'Pemula', icon: 'fins',
      price: null, photo: null,
      short: 'Bilah panjang, tendangan lebih hemat tenaga.',
      fn: 'Menambah dorongan dengan tenaga lebih hemat sehingga oksigen lebih awet.',
      tip: 'Mulai dari bilah plastik atau fiber yang lentur. Foot pocket harus pas, tidak terlalu longgar.',
      options: [
        { key: 'ukuran', label: 'Ukuran kaki (EU)', choices: ['38-39', '40-41', '42-43', '44-45'] },
        { key: 'kaku', label: 'Kekakuan', choices: ['Lunak', 'Sedang', 'Keras'] }
      ]
    },
    {
      id: 'fins-fiber', name: 'Fiber / carbon fins', cat: 'Fins', level: 'Lanjut', icon: 'fins',
      price: null, photo: null,
      short: 'Bilah responsif untuk jarak dan kedalaman lebih jauh.',
      fn: 'Bilah lebih responsif untuk efisiensi saat kedalaman dan jarak bertambah.',
      tip: 'Pilih kekakuan sesuai kekuatan kaki. Terlalu kaku bikin cepat lelah.',
      options: [
        { key: 'ukuran', label: 'Ukuran kaki (EU)', choices: ['38-39', '40-41', '42-43', '44-45'] },
        { key: 'kaku', label: 'Kekakuan', choices: ['Lunak', 'Sedang', 'Keras'] }
      ]
    },
    {
      id: 'wetsuit', name: 'Wetsuit freedive', cat: 'Wetsuit', level: 'Pemula', icon: 'wetsuit',
      price: null, photo: null,
      short: 'Open-cell, hangat dan luwes saat bergerak.',
      fn: 'Menjaga suhu tubuh dan melindungi kulit. Bahan open-cell lebih hangat dan luwes.',
      tip: 'Harus pas ketat tapi tidak menghambat napas. Untuk air tropis, 1,5 sampai 3 mm biasanya cukup.',
      options: [
        { key: 'tebal', label: 'Ketebalan', choices: ['1,5 mm', '3 mm', '5 mm'] },
        { key: 'ukuran', label: 'Ukuran', choices: ['S', 'M', 'L', 'XL', 'XXL'] }
      ]
    },
    {
      id: 'weight-belt', name: 'Sabuk pemberat (karet)', cat: 'Pemberat', level: 'Pemula', icon: 'belt',
      price: null, photo: null,
      short: 'Sabuk karet dengan quick release.',
      fn: 'Mengatur daya apung agar mudah turun dan tetap netral di kedalaman latihan.',
      tip: 'Pakai sabuk karet dengan quick release di sisi kanan. Tambah beban sedikit demi sedikit lewat tes. Kalau belum tahu bebannya, kosongkan pilihan dan konsultasi dulu.',
      options: [{ key: 'beban', label: 'Beban timbal', choices: ['1 kg', '2 kg', '3 kg', '4 kg'] }]
    },
    {
      id: 'neck-weight', name: 'Neck weight', cat: 'Pemberat', level: 'Lanjut', icon: 'neck',
      price: null, photo: null,
      short: 'Beban di leher agar posisi tubuh lebih lurus.',
      fn: 'Menaruh beban di leher agar posisi tubuh lebih streamline untuk penyelaman dalam.',
      tip: 'Pakai setelah paham dasar. Pastikan mudah dilepas dan tidak mencekik.',
      options: [{ key: 'beban', label: 'Beban', choices: ['0,5 kg', '1 kg', '1,5 kg'] }]
    },
    {
      id: 'lanyard', name: 'Pisau dan lanyard', cat: 'Keselamatan', level: 'Pemula', icon: 'knife',
      price: null, photo: null,
      short: 'Pengaman saat tersangkut tali atau jaring.',
      fn: 'Lanyard mengikat badan ke tali. Pisau kecil untuk situasi tersangkut tali atau jaring.',
      tip: 'Pasang di tempat yang mudah dijangkau. Pastikan cara melepas sudah dilatih.',
      options: [{ key: 'jenis', label: 'Jenis', choices: ['Pisau dan sarung', 'Lanyard saja'] }]
    },
    {
      id: 'buoy', name: 'Pelampung / dive buoy', cat: 'Keselamatan', level: 'Pemula', icon: 'buoy',
      price: null, photo: null,
      short: 'Penanda posisi untuk kapal dan tempat tali.',
      fn: 'Menandai posisi penyelam ke kapal, tempat tali dan istirahat di permukaan.',
      tip: 'Pilih warna mencolok dan tali yang kuat. Wajib dipakai saat menyelam di laut.',
      options: [{ key: 'warna', label: 'Warna', choices: ['Oranye', 'Kuning'] }]
    },
    {
      id: 'dive-watch', name: 'Dive computer / watch', cat: 'Elektronik', level: 'Lanjut', icon: 'watch',
      price: null, photo: null,
      short: 'Catat kedalaman, waktu, dan interval permukaan.',
      fn: 'Mencatat kedalaman, waktu, dan interval permukaan untuk evaluasi latihan.',
      tip: 'Cari mode freedive khusus. Alat bantu, bukan pengganti penilaian diri dan buddy. Bingung memilih? Tanya admin lewat WhatsApp.',
      options: []
    }
  ]
};
