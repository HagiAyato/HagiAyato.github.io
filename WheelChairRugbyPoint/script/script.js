// 設定値
let pointArray = [0.5, 0.5, 0.5, 0.5];
let pointArrayB = [1.0, 1.0, 1.0, 1.0];
let genderArray = [true, true, true, true];
// 計算値
let sum = 0.0;
let max = 8.0;
let maxB = 14.0;

/**
 * ページ表示時処理
 */
window.onload = function () {
    // 最初の計算
    calcPoint();
    calcMax();
    excecuteDiff();
    // 最初の計算(バスケ用)
    calcPointB();
    $("#maxB").text(maxB);
    excecuteDiffB();
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
 * ポイントを変更した際の処理(バスケ用)
 */
 function onChangePointB(num) {
    // ポイントを取り込む
    pointArrayB[num] = parseFloat($("[name=point" + num + "B]").val());
    // ポイント再計算
    calcPointB();
    // 差分等表示
    excecuteDiffB();
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
 * ポイント計算(バスケ用)
 */
 function calcPointB() {
    sumB = 0.0;
    pointArrayB.forEach(function (point) {
        sumB += point;
    });
    $("#sumB").text(sumB);
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
        $("#judge").attr("class","ok");
    } else {
        $("#judge").text("ルール違反");
        $("#judge").attr("class","ng");
    }
}

/**
 * 差分等計算・表示
 */
function excecuteDiffB() {
    let diff = maxB - sumB;
    $("#remainB").text(diff);
    if (0 <= diff) {
        $("#judgeB").text("ルール遵守");
        $("#judgeB").attr("class","ok");
    } else {
        $("#judgeB").text("ルール違反");
        $("#judgeB").attr("class","ng");
    }
}