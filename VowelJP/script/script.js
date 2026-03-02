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
    'ぱ': 'あ', 'ぴ': 'い', 'ぷ': 'う', 'ぺ': 'え', 'ぽ': 'お',
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
    // 空文字の場合は処理中止
    if (jp.length < 1) return;
    // 全文字平仮名化
    // 通信実行
    let str = "";
    promiseSparqlRequest(jp).then(converted => {
        // 通信成功
        // 戻り値をreturnに入れる
        str = converted;
    }).catch(error => {
        // 通信失敗
        alert('エラーが発生しました：' + error + '\n平仮名、片仮名以外の母音変換を省略します。');
        str = jp;
    }).finally(v => {
        // 変換後の文字・片仮名⇒平仮名変換
        let vowel = kanaToHira(str);

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
    });
}

/**
 * ツイート
 */
function tweet() {
    // 母音取得
    const vowel = $('#output').val() + ' #母音変換機';
    window.open('http://twitter.com/intent/tweet/?text=' + encodeURIComponent(vowel.substring(0, 600)) + '&url=' + encodeURIComponent("https://HagiAyato.github.io/VowelJP/"));
}

/**
 * 平仮名変換API呼び出し関数
 * @param {String} str 変換前文字列
 * @returns Promise 文字
 */
var promiseSparqlRequest = function (str) {
    return new Promise(function (resolve, reject) {
        // 引数JSONを作る
        // HTTPリクエスト
        const request = new XMLHttpRequest();
        request.open("POST", "https://labs.goo.ne.jp/api/hiragana");
        // 通信実行
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({ app_id: "0fa9354fce3e6c8275dcd069bb71493645d2a13d78c30acd275fe180e938ad26", sentence: str, output_type: "hiragana" }));
        // 通信成功
        request.addEventListener("load", (e) => {
            // サーバでの処理失敗判定
            if (e.target.status != 200) {
                console.log('[' + e.target.status + ']' + e.target.statusText);
                reject("平仮名変換に失敗しました。[" + e.target.status + '] Error');
                return null;
            }
            resolve(JSON.parse(e.target.responseText)["converted"]);
        });
        // 通信失敗
        request.addEventListener("error", () => {
            console.log("Http Request Error");
            reject("通信に失敗しました。");
            return null;
        });
        // 通信失敗
        request.addEventListener("timeout", () => {
            console.log("Http Request Timeout");
            reject("通信がタイムアウトしました。");
            return null;
        });
    });
}