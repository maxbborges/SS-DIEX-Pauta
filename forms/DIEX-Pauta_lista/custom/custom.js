$(document).ready(function () {
    init();
});

function init(){
    carregaTabelas()
    console.log("OK")

}

function carregaTabelas(){
    let dataset = (DatasetFactory.getDataset("DSFormulariodesolicitacao_pauta_diex", null, null, null)).values

    setTimeout(()=>{
        var linhasTabela = $('.table tbody tr');
        console.log(linhasTabela)

        for(i=0;i<dataset.length;i++){
            console.log(dataset[i].ipDataPauta)
            wdkAddChild('tbPautas')
            $('[name="column1_1___'+(i+1)+'"]').text(i+1)
            $('[name="column2_1___'+(i+1)+'"]').text(dataset[i].rdDiretoria)
            $('[name="column3_1___'+(i+1)+'"]').text(dataset[i].solicitante)
            $('[name="column4_1___'+(i+1)+'"]').text(dataset[i].taAssunto)
            $('[name="column5_1___'+(i+1)+'"]').text(dataset[i].rdPrioridade)
            $('[name="column6_1___'+(i+1)+'"]').text(dataset[i].ipDataPauta)
            $('[name="column7_1___'+(i+1)+'"]').text(dataset[i].ipCadastro)
            $('[name="column8_1___'+(i+1)+'"]').text(dataset[i].ipSituacao)
            $('#column9_1___'+(i+1)).prop('href','https://fluighom.sestsenat.org.br/portal/p/1/ecmnavigation?app_ecm_navigation_doc='+dataset[i].documentid)
            $('#column10_1___'+(i+1)).prop('href','https://fluighom.sestsenat.org.br/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID='+dataset[i].ipNumForm)
        }
    }, 500);

}