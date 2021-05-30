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
 * @param {string} target 
 * @param {boolean} isChecked 
 */
function changeEnable(target, isChecked) {
    $("#" + target).prop("disabled", !isChecked);
}

/**
 * 検索処理本体
 */
function search() {
    const word = $("#word").val();
    // 検索ワード空欄の場合は処理中止
    if (word.length < 1) return;
    let query = urls["Google"] + word;
    // 日付指定
    const before = $("#before").val();
    if (0 < before.length && $("#chk_before").prop("checked")){
        query += (" before:" + before);
    }
    const after = $("#after").val();
    if (0 < after.length && $("#chk_after").prop("checked")){
        query += (" after:" + after);
    }
    // テキスト指定
    const url = $("#site").val();
    if (0 < url.length && $("#chk_site").prop("checked")){
        query += (" site:" + url);
    }
    // 新しいタブを開き、ページを表示
    window.open(query, "_blank");
}