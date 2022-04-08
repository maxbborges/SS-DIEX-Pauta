$(document).ready(function () {
    init();

    var mySimpleCalendar = FLUIGC.calendar('#ipDataPauta',{
        useCurrent: true,
        language: 'pt-br',
        pickDate: true,
    });
    dataAtual = new Date()
    mySimpleCalendar.setDate(dataAtual);
});

function init(){
    if (ATIVIDADE==4||ATIVIDADE==0){
        $('#div_01').hide()
        $('#div_02').hide()
        $('#div_03').hide()
    }

    if (ATIVIDADE==5){
        var finalizar = $('[name="rdFinalizar"]:checked').val()
        if (finalizar==null || finalizar==undefined){
            $('#div_02').hide()
        }
        $('#div_03').hide()
    }

    if (ATIVIDADE==9){
        $('#div_03').hide()
    }

    if (ATIVIDADE==20){
        var finalizar = $('[name="rdFinalizar"]:checked').val()
        if (finalizar==null || finalizar==undefined){
            $('#div_02').hide()
        }
        $('#div_03').hide()
    }
}