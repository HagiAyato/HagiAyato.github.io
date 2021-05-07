// 母音変換プログラム

const jpToVovel = {
    'あ': 'あ', 'い': 'い', 'う': 'う', 'え': 'え', 'お': 'お',
    'か': 'あ', 'き': 'い', 'く': 'う', 'け': 'え', 'こ': 'お',
    'さ': 'あ', 'し': 'い', 'す': 'う', 'せ': 'え', 'そ': 'お',
    'た': 'あ', 'ち': 'い', 'つ': 'う', 'て': 'え', 'と': 'お',
    'な': 'あ', 'に': 'い', 'ぬ': 'う', 'ね': 'え', 'の': 'お',
    'は': 'あ', 'ひ': 'い', 'ふ': 'う', 'へ': 'え', 'ほ': 'お',
    'ま': 'あ', 'み': 'い', 'む': 'う', 'め': 'え', 'も': 'お',
    'や': 'あ', 'ゆ': 'う', 'よ': 'お',
    'ら': 'あ', 'り': 'い', 'る': 'う', 'れ': 'え', 'ろ': 'お',
    'わ': 'あ', 'ゐ': 'い', 'ゑ': 'え', 'を': 'お',
    'ん': 'ん',
    'ぅ': 'う', 'ゔ': 'う',
    'が': 'あ', 'ぎ': 'い', 'ぐ': 'う', 'げ': 'え', 'ご': 'お',
    'ざ': 'あ', 'じ': 'い', 'ず': 'う', 'ぜ': 'え', 'ぞ': 'お',
    'だ': 'あ', 'ぢ': 'い', 'づ': 'う', 'で': 'え', 'ど': 'お',
    'ば': 'あ', 'び': 'い', 'ぶ': 'う', 'べ': 'え', 'ぼ': 'お',
    'ぱ': 'あ', 'ぴ': 'い', 'ぷ': 'う', 'ぺ': 'え', 'ぽ': 'お'
}

const smallToLarge = {
    'ぁ': 'あ', 'ぃ': 'い', 'ぅ': 'う', 'ぇ': 'え', 'ぉ': 'お',
    'ゃ': 'あ', 'ゅ': 'う', 'ょ': 'お', 'ゎ': 'あ'
}

/**
 * 片仮名⇒平仮名変換
 * @param {string} str 変換したい文字列
 * @returns 変換後文字列
 */
function kanaToHira(str) {
    //"/[\u30a1-\u30f6]/g"：任意の片仮名　これを無名関数で平仮名化
    return str.replace(/[\u30a1-\u30f6]/g,
        /**
         * 片仮名⇒平仮名変換用無名関数
         * @param {string} match 変換対象の片仮名一文字
         * @returns 変換後の平仮名
         */
        function (match) {
            // 平仮名の文字コード = 片仮名の文字コード - 0x60
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
}

/**
 * 変換辞書に従って文字列を変換
 * @param {string} str 変換したい文字列
 * @param {dictionaly} dictionaly 変換辞書
 * @returns 変換後文字列
 */
function convertDict(str, dictionaly) {
    let convertedArray = new Array();
    for (let index in str.split('')) {
        let c = dictionaly[str[index]];
        convertedArray.push(c != undefined ? c : str[index]);
    }
    return convertedArray.join('');
}

/**
 * 日本語平仮名⇒母音
 */
function convertToVowel() {
    // 原文取得
    const jp = $('#input').val();
    // 変換後の文字・片仮名⇒平仮名変換
    let vowel = kanaToHira(jp);

    // と/ど+'ぅ'をうに変換
    vowel = vowel.replace(/[とど]ぅ/g, "う")
        // て/で+ぃ/ゅをい/うに変換
        .replace(/[てで]ぃ/g, "い").replace(/[てで]ゅ/g, "う");

    // 大文字+ぅを変換
    vowel = convertDict(vowel, jpToVovel);

    // うーをううに変換
    vowel = vowel.replace(/うー/g, "うう")
        // う+ゎ/ぁ/ぃ/ぇ/ぉを母音に変換
        .replace(/うゎ/g, "うあ").replace(/うぁ/g, "うあ").replace(/うぃ/g, "うい").replace(/うぇ/g, "うぇ").replace(/うぉ/g, "うお")
        // いー/ぃーをいい/ぃいに変換
        .replace(/いー/g, "いい").replace(/ぃー/g, "ぃい")
        // い/ぃ+ゃ/ゅ/ぇ/ょを母音に変換
        .replace(/[いぃ]ゃ/g, "あ").replace(/[いぃ]ゅ/g, "う").replace(/[いぃ]ぇ/g, "え").replace(/[いぃ]ょ/g, "お")

    // 小さい文字を大きい文字に変換
    vowel = convertDict(vowel, smallToLarge);

    // 伸ばし棒対応
    vowel = vowel.replace(/あー/g, "ああ").replace(/いー/g, "いい").replace(/うー/g, "うう").replace(/えー/g, "ええ").replace(/おー/g, "おお")
    // 変換後の文字を出力
    $('#output').val(vowel);
}