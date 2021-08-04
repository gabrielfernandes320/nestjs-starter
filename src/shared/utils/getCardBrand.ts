export default function getCardBrand(number) {
    number = (number + '').replace(/\D/g, '');

    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
    let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

    let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');

    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    let jcb = new RegExp('^35[0-9]{14}[0-9]*$');

    let hypercard = new RegExp('^606282|^637095|^637599|^637568');

    let elo = new RegExp(
        '^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))',
    );

    if (visa.test(number)) {
        return 'VISA';
    }

    if (amex.test(number)) {
        return 'AMEX';
    }

    if (mastercard.test(number) || mastercard2.test(number)) {
        return 'MASTER';
    }

    if (elo.test(number)) {
        return 'ELO';
    }

    if (disco1.test(number) || disco2.test(number) || disco3.test(number)) {
        return 'DISCOVER';
    }

    if (diners.test(number)) {
        return 'DINERS';
    }

    if (jcb.test(number)) {
        return 'JCB';
    }

    if (cup1.test(number) || cup2.test(number)) {
        return 'CHINA_UNION_PAY';
    }

    if (hypercard.test(number)) {
        return 'HIPERCARD';
    }

    return undefined;
}
