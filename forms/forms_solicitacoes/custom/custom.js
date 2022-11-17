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
}

function abrirDespacho(){
    link='https://fluig.sestsenat.org.br/portal/p/1/pageworkflowview?processID=SolicitacaoDeDevolutiva'
    // link='https://fluighom.sestsenat.org.br/portal/p/1/pageworkflowview?processID=solicitacao_devolutiva_diex'
    window.open(link, '_blank');
}

function addParticipante(field){
    console.log(field)
    var num = wdkAddChild('tb_00_Participantes');

    $('[name="txt_00_nome1___'+num+'"]').val($('[name="txt_00_nome"]').val())
    $('[name="txt_00_email1___'+num+'"]').val($('[name="txt_00_email"]').val())

    window['zf_00_participantes'].clear();
    $('[name="txt_00_nome"]').val('')
    $('[name="txt_00_email"]').val('')
}


function setSelectedZoomItem(selectedItem) {
    $('[name="txt_00_nome"]').val(selectedItem['Nome'])
    $('[name="txt_00_email"]').val(selectedItem['Funcao'])
    console.log(selectedItem)
}

function removedZoomItem(removedItem) {
    $('[name="txt_00_nome"]').val('')
    $('[name="txt_00_email"]').val('')
    console.log(removedItem)
}