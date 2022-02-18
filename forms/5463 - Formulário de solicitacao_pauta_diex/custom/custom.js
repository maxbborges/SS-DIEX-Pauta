$(document).ready(function () {
    init();
});

function init(){
    if (ATIVIDADE==4||ATIVIDADE==0){
        wdkAddChild('tbPauta')
        $('[name="column1_1___1"]').text($('[name="solicitante"]').val())
        $('[name="column2_1___1"]').text($('[name="ipCadastro"]').val())
        $('[name="column3_1___1"]').text($('[name="ipSituacao"]').val())
    }
    console.log("OK")
}