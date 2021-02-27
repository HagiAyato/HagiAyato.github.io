/**
 * 郵便番号から住所を自動入力
 */
function autoInputAddress() {
    // 正規表現パターン（郵便番号）
    var regex = new RegExp(/^\d{7}$/);;
    // 郵便番号
    var postalCode = $('#ad4_postalCode').val();
    // フォーマットチェック
    if (!regex.test(postalCode)) return;

    // ajaxで住所を調べる
    var param = { zipcode: postalCode }
    var send_url = "http://zipcloud.ibsnet.co.jp/api/search";
    $.ajax({
        type: "GET",
        cache: false,
        data: param,
        url: send_url,
        dataType: "jsonp"
    }).done(function (data, textStatus, jqXHR) {
        // 成功の場合の処理
        if (data.status != 200) {
            // status != 200⇒応答がエラーの場合
            console.warn(data.message);
            return;
        }
        // 応答が成功の場合
        // 郵便番号に対応する住所がない場合は処理打ち切り
        var results = data.results;
        if (results == null) return;
        if (results.length < 1) return;
        // 郵便番号に対応する住所がある場合はそれをフォームに入れる
        var result = results[0];
        $('#ad4_pref').val(result.address1);
        $('#ad4_muni').val(result.address2);
        $('#ad4_town').val(result.address3);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // エラーの場合処理
        console.error(data.message);
    });
}

/**
 * 英数字の全角⇒半角変換+ハイフン除去　※要素
 * @param {input}} elm - 変換したい要素
 */
function toHalfWidthElm(elm){
    // 空文字なら変換不要
    if(elm.value.length < 1)return;
    elm.value = removeBar(toHalfWidth(elm.value));
}

/**
 * 英数字カナの半角⇒全角変換　※要素
 * @param {input}} elm - 変換したい要素
 */
function toFullWidthElm(elm){
    // 空文字なら変換不要
    if(elm.value.length < 1)return;
    elm.value = toFullZenkana(toFullWidth(elm.value));
}

/**
 * 英数字の全角⇒半角変換
 * 参考：https://minory.org/js-full-half-width.html
 * @param {string} str - 変換したい文字
 */
function toHalfWidth(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９！-～]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}

/**
 * 英数字の半角⇒全角変換
 * 参考：https://minory.org/js-full-half-width.html
 * @param {string} str - 変換したい文字
 */
function toFullWidth(str) {
    return str.replace(/[A-Za-z0-9!-~]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
}

/**
 * 片仮名の半角⇒全角変換
 * 参考：https://minory.org/js-full-half-width.html
 * @param {string} str - 変換したい文字
 */
function toFullZenkana(str) {
    var beforeStr = new Array('ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', 'ｰ', 'ｳﾞ', 'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾋﾞ', 'ﾌﾞ', 'ﾍﾞ', 'ﾎﾞ', 'ﾊﾟ', 'ﾋﾟ', 'ﾌﾟ', 'ﾍﾟ', 'ﾎﾟ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ｦ', 'ﾝ');
    var afterStr = new Array('ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ッ', 'ー', 'ヴ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン');
    var fullStr = str;
    for (var i = 0; i < beforeStr.length; i++) {
        fullStr = fullStr.replace(new RegExp(beforeStr[i], 'g'), afterStr[i]);
    }
    return fullStr;
}

/**
 * ハイフン除去
 * @param {string} str - 変換したい文字
 */
function removeBar(str){
    return str.replace('-','');
}