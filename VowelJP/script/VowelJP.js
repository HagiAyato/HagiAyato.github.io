﻿// 母音変換プログラム

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
    'ぱ': 'あ', 'ぴ': 'い', 'ぷ': 'う', 'ぺ': 'え', 'ぽ': 'お'
}

/**
 * 日本語平仮名⇒母音
 */
function convertToVowel() {
    // 原文取得
    const jp = $('#input').val();
    // 変換後の文字
    let vowel = jp;
    
    // と/ど+'ぅ'をうに変換
    // て/で+ぃ/ゅをい/うに変換
    vowel = vowel.replace(/[とど]ぅ/g, "う").replace(/[てで]ぃ/g, "い").replace(/[てで]ゅ/g, "う");

    // 大文字+ぅを変換
    let convertedArray = new Array();
    for(let index in vowel.split('')){
        convertedArray.push(jpToVovel[vowel[index]]);
    }
    vowel = convertedArray.join('');

    // 変換後の文字を出力
    $('#output').val(vowel);
}