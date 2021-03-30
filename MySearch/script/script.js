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
    Object.keys(urls).forEach(function (key) {
        $("#site").append("<option value='" + key + "'>" + key + "</option>");
    });
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
 * 検索処理本体
 */
function search() {
    const word = $("#word").val();
    // 検索ワード空欄の場合は処理中止
    if (word.length < 1) return;
    // 新しいタブを開き、ページを表示
    window.open(urls[$("#site").val()] + word, "_blank");
}