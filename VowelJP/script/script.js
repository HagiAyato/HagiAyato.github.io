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
        // kuromoji を使って漢字の読み（カタカナ）を取得する
        // kuromoji.js を CDN から動的に読み込み、辞書は jsDelivr のパスを指定
        function buildTokenizerAndTokenize() {
            try {
                kuromoji.builder({ dicPath: 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/' }).build(function (err, tokenizer) {
                    if (err || !tokenizer) {
                        console.log('kuromoji build error', err);
                        resolve(str);
                        return;
                    }
                    try {
                        var tokens = tokenizer.tokenize(str);
                        // convert each token to reading; fall back to kana->hiragana if possible
                        var parts = tokens.map(function (t) {
                            if (t.reading && t.reading !== '*') return t.reading;
                            if (t.pronunciation && t.pronunciation !== '*') return t.pronunciation;
                            // try converting katakana to hiragana (surface form may be kana)
                            var hira = kanaToHira(t.surface_form);
                            if (hira !== t.surface_form) {
                                console.warn('kuromoji: missing reading, used kana->hira', t.surface_form, t);
                                return hira;
                            }
                            // still no reading (likely kanji or symbol)
                            console.warn('kuromoji: missing reading for token', t.surface_form, t);
                            return t.surface_form; // fallback
                        });
                        var reading = parts.join('');
                        resolve(reading);
                    } catch (e) {
                        console.log('tokenize error', e);
                        resolve(str);
                    }
                });
            } catch (e) {
                console.log('kuromoji unexpected error', e);
                resolve(str);
            }
        }

        if (typeof kuromoji === 'undefined') {
            // Patch XHR.open temporarily to fix kuromoji's dicPath join bug
            var _origXHROpen = XMLHttpRequest.prototype.open;
            var _patched = false;
            XMLHttpRequest.prototype.open = function (method, url) {
                try {
                    if (typeof url === 'string' && !/^https?:\/\//i.test(url)) {
                        // handle cases like 'cdn.jsdelivr.net/...' or '/cdn.jsdelivr.net/...'
                        var m = url.match(/^(\/)?(cdn\.jsdelivr\.net\/.*)/i);
                        if (m) {
                            url = 'https://' + m[2];
                        }
                    }
                } catch (e) {
                    // ignore
                }
                _patched = true;
                return _origXHROpen.apply(this, arguments);
            };

            var script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/build/kuromoji.js';
            script.onload = function () {
                console.log('kuromoji library loaded');
                buildTokenizerAndTokenize();
            };
            script.onerror = function () {
                console.log('Failed to load kuromoji.js from CDN');
                // restore original XHR.open
                if (_patched) XMLHttpRequest.prototype.open = _origXHROpen;
                resolve(str);
            };
            document.head.appendChild(script);

            // restore original once tokenizer built (inside buildTokenizerAndTokenize)
            var _originalResolve = resolve;
            resolve = function (val) {
                try { if (_patched) XMLHttpRequest.prototype.open = _origXHROpen; } catch (e) {}
                _originalResolve(val);
            };
        } else {
            console.log('kuromoji already present');
            buildTokenizerAndTokenize();
        }
    });
}