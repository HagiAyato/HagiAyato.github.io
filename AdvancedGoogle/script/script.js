var showReadme_flg = false;

/**
 * 検索URLオブジェクト
 * 
 * 検索サイトにおける検索結果ページURLが"(URL+引数名=)検索ワード"の場合、
 * 「"検索サイト名": "(URL+引数名=)"」をオブジェクトに入れる。
 * 追加も可能。
 */
const urls = {
    "Google": "https://www.google.com/search?q=",
    "Yahoo": "https://search.yahoo.co.jp/search?p=",
    "bing": "https://www.bing.com/search?q=",
    "wikipedia": "https://ja.wikipedia.org/w/index.php?search=",
    "Youtube": "https://www.youtube.com/results?search_query=",
    "niconico": "https://www.nicovideo.jp/search/",
    "twitter": "https://twitter.com/search?q=",
    "facebook ※要事前ログイン": "https://www.facebook.com/search/top?q="
}

/**
 * ページ表示時処理
 */
window.onload = function () {
    // // 検索サイト　
    // Object.keys(urls).forEach(function (key) {
    //     $("#site").append("<option value='" + key + "'>" + key + "</option>");
    // });

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
 * 検索欄に条件追加
 * @param {string} query 
 */
function addQuery(query) {
    $("#word").val($("#word").val() + query);
}

/**
 * チェックボックスと対応する要素の有効無効切替
 * @param {boolean} isChecked 
 * @param  {...string} target 
 */
function changeEnable(isChecked, ...target) {
    target.forEach(
        function (item, index) {
            $("#" + item).prop("disabled", !isChecked);
        });
}

/**
 * 検索処理本体
 */
function search() {
    let query = $("#scope").val() + $("#word").val();
    // 日付指定
    const before = $("#before").val();
    if (0 < before.length && $("#chk_before").prop("checked")) {
        query += (" before:" + before);
    }
    const after = $("#after").val();
    if (0 < after.length && $("#chk_after").prop("checked")) {
        query += (" after:" + after);
    }
    // 数値範囲指定
    const from = $("#number_from").val();
    const to = $("#number_to").val();
    if (0 < from.length && 0 < to.length && $("#chk_number").prop("checked")) {
        query += (" " + from + ".." + to + " " + $("#unit").val());
    }
    // テキスト指定
    let text;
    text = $("#site").val();
    if (0 < text.length && $("#chk_site").prop("checked")) {
        query += (" site:" + text);
    }
    text = $("#sns").val();
    if (0 < text.length && $("#chk_sns").prop("checked")) {
        query += (" @" + text);
    }
    text = $("#location").val();
    if (0 < text.length && $("#chk_location").prop("checked")) {
        query += (" location:" + text);
    }
    text = $("#filetype").val();
    if (0 < text.length && $("#chk_filetype").prop("checked")) {
        query += (" filetype:" + text);
    }
    // 検索ワード空欄の場合は処理中止
    if (query.length < 1) return;
    // 新しいタブを開き、ページを表示
    window.open(urls["Google"] + query, "_blank");
}