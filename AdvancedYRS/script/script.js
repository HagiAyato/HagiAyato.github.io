var showReadme_flg = false;
var showAbout_flg = false;

/**
 * 検索URLオブジェクト
 * 
 * 検索サイトにおける検索結果ページURLが"(URL+引数名=)検索ワード"の場合、
 * 「"検索サイト名": "(URL+引数名=)"」をオブジェクトに入れる。
 * 追加も可能。
 */
const urls = {
    "yahoo_realtime": "https://search.yahoo.co.jp/realtime/search?p=",
}

/**
 * ページ表示時処理
 */
window.onload = function () {
    // 日付入力
    const date = new Date();
    const formattedDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
    $("#before").val(formattedDate);
    $("#before").prop("disabled", true);
    $("#after").val(formattedDate);
    $("#after").prop("disabled", true);
}

/**
 * 説明表示非表示
 */
function dispReadme() {
    showReadme_flg = !showReadme_flg
    if (showReadme_flg) {
        // readme表示
        $('#BTNReadme').text('説明非表示△');
        $('#readme').attr('style', 'display:block');
    } else {
        // readme非表示
        $('#BTNReadme').text('説明表示▼');
        $('#readme').attr('style', 'display:none');
    }
}

/**
 * Yahoo!リアルタイム検索とは表示非表示
 */
function dispAbout() {
    showAbout_flg = !showAbout_flg
    if (showAbout_flg) {
        // readme表示
        $('#BTNAbout').text('Yahoo!リアルタイム検索とは△');
        $('#about').attr('style', 'display:block');
    } else {
        // readme非表示
        $('#BTNAbout').text('Yahoo!リアルタイム検索とは▼');
        $('#about').attr('style', 'display:none');
    }
}

/**
 * 検索欄に条件追加
 * @param {string} query 
 */
function addQuery(query) {
    $("#word").val($("#word").val() + query);
}

/**
 * 要素の有効無効切替
 * @param {boolean} isEnable 有効無効
 * @param  {...string} target 対象要素(複数指定可能)
 */
function changeEnable(isEnable, ...target) {
    target.forEach(
        function (item, index) {
            $("#" + item).prop("disabled", !isEnable);
        });
}

/**
 * 検索処理本体
 */
function search() {
    let query = $("#word").val();
    // ID指定(投稿者)
    const idPoster = $("#id_poster").val();
    if (0 < idPoster.length) {
        query += (" ID:" + idPoster);
    }

    // ID指定(宛先)
    const idAddressee = $("#id_addressee").val();
    if (0 < idAddressee.length) {
        query += (" @" + idAddressee);
    }
    // ハッシュタグ指定
    const hashtag = $("#hashtag").val();
    if (hashtag && hashtag.length > 0) {
        // 全角・半角のカンマで分割し、前後の余分な空白を削除
        const tags = hashtag.split(/[,、]/).map(tag => tag.trim());
        // 空文字を除外して、それぞれに「 #」を付与してクエリに追加
        tags.forEach(tag => {
            if (tag.length > 0) {
                query += (" #" + tag);
            }
        });
    }
    // URL/ドメイン指定
    const urlDomain = $("#url_domain").val();
    if (0 < urlDomain.length) {
        query += (" URL:" + urlDomain);
    }
    // 検索ワード空欄の場合は処理中止
    if (query.length < 1) return;
    // 新しいタブを開き、ページを表示
    window.open(urls["yahoo_realtime"] + encodeURIComponent(query), "_blank");
}