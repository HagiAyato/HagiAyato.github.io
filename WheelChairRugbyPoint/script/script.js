// 設定値
let pointArray = [0.5, 0.5, 0.5, 0.5];
let genderArray = [true, true, true, true];
// 計算値
let sum = 0.0;
let max = 8.0;

/**
 * ページ表示時処理
 */
window.onload = function () {
    // 最初の計算
    calcPoint();
    calcMax();
    excecuteDiff();
}

/**
 * ポイントを変更した際の処理
 */
function onChangePoint(num) {
    // ポイントを取り込む
    pointArray[num] = parseFloat($("[name=point" + num + "]").val());
    // ポイント再計算
    calcPoint();
    // 差分等表示
    excecuteDiff();
}

/**
 * ポイント計算
 */
function calcPoint() {
    sum = 0.0;
    pointArray.forEach(function (point) {
        sum += point;
    });
    $("#sum").text(sum);
}

/**
 * 性別を変更した際の処理
 */
function onChangeGender(num) {
    // 性別を取り込む
    genderArray[num] = $("[name=gender" + num + "]").val() == "male";
    // ポイント上限再計算
    calcMax();
    // 差分等表示
    excecuteDiff();
}

/**
 * ポイント上限計算
 */
function calcMax(){
    max = 8.0;
    genderArray.forEach(function (gender) {
        max += (gender ? 0.0 : 0.5);
    });
    $("#max").text(max);
}
/**
 * 差分等計算・表示
 */
function excecuteDiff() {
    let diff = max - sum;
    $("#remain").text(diff);
    if (0 <= diff) {
        $("#judge").text("ルール遵守");
    } else {
        $("#judge").text("ルール違反");
    }
}