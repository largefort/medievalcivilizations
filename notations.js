function compactNumberFormat(num) {
    const scales = [
        { value: 1e3, symbol: "K" },        // Thousand
        { value: 1e6, symbol: "M" },        // Million
        { value: 1e9, symbol: "B" },        // Billion
        { value: 1e12, symbol: "T" },       // Trillion
        { value: 1e15, symbol: "Qa" },      // Quadrillion
        { value: 1e18, symbol: "Qi" },      // Quintillion
        { value: 1e21, symbol: "Sx" },      // Sextillion
        { value: 1e24, symbol: "Sp" },      // Septillion
        { value: 1e27, symbol: "Oc" },      // Octillion
        { value: 1e30, symbol: "No" },      // Nonillion
        { value: 1e33, symbol: "Dc" },      // Decillion
        { value: 1e36, symbol: "Ud" },      // Undecillion
        { value: 1e39, symbol: "Dd" },      // Duodecillion
        { value: 1e42, symbol: "Td" },      // Tredecillion
        { value: 1e45, symbol: "Qad" },     // Quattuordecillion
        { value: 1e48, symbol: "Qid" },     // Quindecillion
        { value: 1e51, symbol: "Sxd" },     // Sexdecillion
        { value: 1e54, symbol: "Spd" },     // Septendecillion
        { value: 1e57, symbol: "Ocd" },     // Octodecillion
        { value: 1e60, symbol: "Nod" },     // Novemdecillion
        { value: 1e63, symbol: "Vg" },      // Vigintillion
        { value: 1e66, symbol: "Uvg" },     // Unvigintillion
        { value: 1e69, symbol: "Dvg" },     // Duovigintillion
        { value: 1e72, symbol: "Tvg" },     // Trevigintillion
        { value: 1e75, symbol: "Qavg" },    // Quattuorvigintillion
        { value: 1e78, symbol: "Qivg" },    // Quinvigintillion
        { value: 1e81, symbol: "Sxvg" },    // Sexvigintillion
        { value: 1e84, symbol: "Spvg" },    // Septenvigintillion
        { value: 1e87, symbol: "Ocvg" },    // Octovigintillion
        { value: 1e90, symbol: "Novg" },    // Novemvigintillion
        { value: 1e93, symbol: "Tr" },      // Trigintillion
        { value: 1e96, symbol: "Utr" },     // Untrigintillion
        { value: 1e99, symbol: "Dtr" },     // Duotrigintillion
        { value: 1e102, symbol: "Ttr" },    // Tretrigintillion
        { value: 1e105, symbol: "Qatr" },   // Quattuortrigintillion
        { value: 1e108, symbol: "Qitr" },   // Quintrigintillion
        { value: 1e111, symbol: "Sxtr" },   // Sextrigintillion
        { value: 1e114, symbol: "Sptr" },   // Septentrigintillion
        { value: 1e117, symbol: "Octr" },   // Octotrigintillion
        { value: 1e120, symbol: "Notr" },   // Novemtrigintillion
        { value: 1e123, symbol: "Qtg" },    // Quattuordecillion
        { value: 1e126, symbol: "Uqtg" },   // Unquattuordecillion
        { value: 1e129, symbol: "Dqtg" },   // Duoquattuordecillion
        { value: 1e132, symbol: "Tqtg" },   // Trequattuordecillion
        { value: 1e135, symbol: "Qaqtg" },  // Quattuorquattuordecillion
        { value: 1e138, symbol: "Qiqtg" },  // Quinquaquattuordecillion
        { value: 1e141, symbol: "Sxqtg" },  // Sexquaquattuordecillion
        { value: 1e144, symbol: "Spqtg" },  // Septenquattuordecillion
        { value: 1e147, symbol: "Ocqtg" },  // Octoquattuordecillion
        { value: 1e150, symbol: "Noqtg" },  // Novemquattuordecillion
        { value: 1e153, symbol: "Qit" },    // Quinquadilllion
        { value: 1e156, symbol: "Uqit" },   // Unquinquadilllion
        { value: 1e159, symbol: "Dqit" },   // Duoquinquadilllion
        { value: 1e162, symbol: "Tqit" },   // Trequinquadilllion
        { value: 1e165, symbol: "Qaqit" },  // Quattuorquinquadilllion
        { value: 1e168, symbol: "Qiqit" },  // Quinquaquinquadilllion
        { value: 1e171, symbol: "Sxqit" },  // Sexquinquadilllion
        { value: 1e174, symbol: "Spqit" },  // Septenquinquadilllion
        { value: 1e177, symbol: "Ocqit" },  // Octoquinquadilllion
        { value: 1e180, symbol: "Noqit" },  // Novemquinquadilllion
        { value: 1e183, symbol: "Ct" },     // Centillion
        { value: 1e186, symbol: "Uct" },    // Uncentillion
        { value: 1e189, symbol: "Dct" },    // Duocentillion
        { value: 1e192, symbol: "Tct" },    // Trecentillion
        { value: 1e195, symbol: "Qact" },   // Quattuorcentillion
        { value: 1e198, symbol: "Qict" },   // Quinquacentillion
        { value: 1e201, symbol: "Sxct" },   // Sexcentillion
        { value: 1e204, symbol: "Spct" },   // Septencentillion
        { value: 1e207, symbol: "Occt" },   // Octocentillion
        { value: 1e210, symbol: "Noct" },   // Novemcentillion
        // You can continue to add more scales as needed
    ];

    for (let i = scales.length - 1; i >= 0; i--) {
        if (num >= scales[i].value) {
            return +(num / scales[i].value).toFixed(1) + scales[i].symbol;
        }
    }
    return num.toString(); // Return as string if no formatting is needed
}
