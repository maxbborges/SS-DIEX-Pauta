$(document).ready(function () {
    init();
    carregarOnchange()
    loadMasks();
    $('#div_01').hide()
});

function init(){
    if (ATIVIDADE==4||ATIVIDADE==0){
        // var mySimpleCalendar = FLUIGC.calendar('#ipDataPauta',{
        //     useCurrent: true,
        //     language: 'pt-br',
        //     pickDate: true,
        // });
        // dataAtual = new Date()
        // mySimpleCalendar.setDate(dataAtual);
        $('[name="ipDataPauta"]').val(new Date().toLocaleDateString())
        $('[name="ipCadastro"]').val(new Date().toLocaleDateString())
        $('#div_01').hide()
        $('#div_02').hide()
        $('#div_03').hide()
    }

    if (ATIVIDADE==5){
        var finalizar = $('[name="rdFinalizar"]:checked').val()
        if (finalizar==null || finalizar==undefined){
            $('#div_02').hide()
        }
        if (FORM_MODE=='VIEW'){
            $('#div_01').hide()
        }
        $('#div_03').hide()
    }

    if (ATIVIDADE==9){
    	// $('[data-field-name="rdFinalizar"]').hide()
        $('#div_03').hide()
    }

    if (ATIVIDADE==20){
        var finalizar = $('[name="rdFinalizar"]:checked').val()
        if (finalizar==null || finalizar==undefined){
            $('#div_02').hide()
        }
        $('#div_03').hide()
    }
    
    if (ATIVIDADE==23){
        if (FORM_MODE=='VIEW'){
        	$('#btnAbrirDespacho').hide()
        }
    }
}

function carregarOnchange(){
    $('[name="rd_despachar"]').on('change',function(){
        if($(this).filter(':checked').val()=='Nao-corrigir'){
            $('#atxtMotivo').addClass('required')
        } else {
            $('#atxtMotivo').removeClass('required')
        }
    })
    
    // $('[name="rdNecessarioDevolutiva"]').on('change',function(){
    //     if($(this).filter(':checked').val()=='sim'){
    //     	$('[data-field-name="rdFinalizar"]').hide()
    //     } else {
    //     	$('[data-field-name="rdFinalizar"]').show()
    //     }
    // })
}

function abrirDespacho(){
    link='https://fluig.sestsenat.org.br/portal/p/1/pageworkflowview?processID=SolicitacaoDeDevolutiva'
    window.open(link, '_blank');
}