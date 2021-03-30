/**
 * 検索処理本体
 */
function search() {
    const word = $("#word").val();
    if (word.length < 1) return;
    window.open("https://www.google.com/search?q=" + word, "_blank"); // 新しいタブを開き、ページを表示
}